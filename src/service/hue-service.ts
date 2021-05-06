import {Hue, HueUPNPResponse} from 'hue-hacking-node';
import * as axios from 'axios';
import {AxiosInstance} from 'axios';
import {TokenRequest} from '../types/hueBridgeRequest';

const appName = 'CS-GO Hue'
let hueConnection: Hue;
let ip: string;
const http: AxiosInstance = axios.default.create({
  timeout: 4000,
});

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
