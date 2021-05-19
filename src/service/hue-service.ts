import {Hue, HueUPNPResponse, XYPoint} from 'hue-hacking-node';
import * as axios from 'axios';
import {AxiosInstance} from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ColorConverter from 'cie-rgb-color-converter';
import {TokenRequest} from '../types/hueBridgeRequest';
import {GameState} from '../types/gameStatus';
import {LampHue} from '../types/lampHue';

const appName = 'CS-GO Hue'
let hueConnection: Hue;
let ip: string;
const http: AxiosInstance = axios.default.create({
  timeout: 4000,
});

export const convertXY = (hex: string): XYPoint => {
  const rgb = hexToRgb(hex);
  const color = (ColorConverter.rgbToXy(rgb.r, rgb.g, rgb.b) as XYPoint)
  return new XYPoint(color.x, color.y)
}

export const hexToRgb = (hex: string): {r: number, g: number, b: number} | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

const colors = {
  terrorist: convertXY('#DE9B35'),
  counterT: convertXY('#5D79AE'),
  bombPlanted: convertXY('#FF0000'),
  roundWin: convertXY('#6CFF1D'),
  roundLose: convertXY('#FF7D1D'),
  freezeTime: convertXY('#00FFFF'),
  dead: convertXY('#9B9B9B')
}

export async function getBridge(): Promise<string> {
  const foundBridges: HueUPNPResponse[] = await Hue.search();
  const validBridgeIPs: string[] = [];
  foundBridges.forEach((data) => {
    validBridgeIPs.push(data.internalipaddress);
  })
  const [ipBridge] = validBridgeIPs;
  ip = ipBridge;
  return ip;
}

export function connectBridge(key?: string, forceIp?: string): Hue {
  if (hueConnection) {
    return hueConnection;
  }
  hueConnection = new Hue({
    key,
    ip: ip || forceIp,
    numberOfLamps: 3,
    retrieveInitialState: false
  });
  return hueConnection
}

export async function getBridgeToken(ipBridge: string): Promise<TokenRequest[]> {
  const request = await http.post(`http://${ipBridge}/api`, {
    devicetype: appName
  })
  return request.data;
}

export function getPhase(state: GameState): string {
  if (state.round.phase === 'live') {
    if (state.round.bomb) {
      return 'Bomb'
    }
    if (state.player.team === 'CT') {
      return 'CT'
    }
    return 'T'
  }
  return state.round.phase;
}

export async function changeGameState(state: GameState, lights: LampHue[]): Promise<void> {
  const lastState = JSON.parse(localStorage.getItem('lastState') || null);
  if (state.round.phase) {
    const phase = getPhase(state);
    if (!lastState) {
      localStorage.setItem('lastState', JSON.stringify(phase));
      await this.switchColor(state, lights);
    } else if (lastState.phase !== state.round.phase) {
      localStorage.setItem('lastState', JSON.stringify(phase));
      await this.switchColor(state, lights);
    }
  }
}

export async function switchColor(state: GameState, lights: LampHue[]): Promise<void> {
  const promises = []
  if (lights.length > 0) {
    const phase = getPhase(state);
    switch (phase) {
      case 'over': {
        if (state.round.win_team === 'CT') {
          for (const data of lights) {
            promises.push(hueConnection.setColor(data.lampIndex, colors.counterT));
          }
        } else {
          for (const data of lights) {
            promises.push(hueConnection.setColor(data.lampIndex, colors.terrorist));
          }
        }
        break;
      }
      case 'Bomb': {
        for (const data of lights) {
          promises.push(hueConnection.setColor(data.lampIndex, colors.bombPlanted));
        }
        break;
      }
      case 'freezetime': {
        for (const data of lights) {
          promises.push(hueConnection.setColor(data.lampIndex, colors.freezeTime));
        }
        break;
      }
      case 'CT': {
        for (const data of lights) {
          promises.push(hueConnection.setColor(data.lampIndex, colors.counterT));
        }
        break;
      }
      case 'T': {
        for (const data of lights) {
          promises.push(hueConnection.setColor(data.lampIndex, colors.terrorist));
        }
        break;
      }
      default: {
        return;
      }
    }
    await Promise.all(promises);
  }
}
