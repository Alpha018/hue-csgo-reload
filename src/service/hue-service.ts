import { Hue, HueUPNPResponse } from 'hue-hacking-node';
import * as axios from 'axios';
import {AxiosInstance} from 'axios';
import {TokenRequest} from '../types/hueBridgeRequest';

const appName = 'CS-GO Hue'
const http: AxiosInstance = axios.default.create({
  timeout: 4000,
});

export async function getBridge(): Promise<string[]> {
  const foundBridges: HueUPNPResponse[] = await Hue.search();
  const validBridgeIPs: string[] = [];
  foundBridges.forEach((data) => {
    validBridgeIPs.push(data.internalipaddress);
  })
  return validBridgeIPs;
}

export function connectBridge(ip: string): Hue {
  return new Hue({
    ip,
    key: appName,
    numberOfLamps: 3,
    retrieveInitialState: false
  });
}

export async function getBridgeToken(ip: string): Promise<TokenRequest[]> {
  const request = await http.post(`http://${ip}/api`, {
    devicetype: appName
  })
  return request.data;
}
