import React, {FunctionComponent, useEffect, useState} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {getBridge, getBridgeToken} from '../service/hue-service';
import {Images} from '../img/asset';
import {Wrapper} from './template/wrapper';
import {ROUTER_PATH} from './router/routes';
import LoadingTemplate from './template/loading';

const DivShadow = styled.div`
  margin: 70px auto;
  width: 200px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 0 200px 100px #4389a6;
`

export const BridgeTokenComponent: FunctionComponent = () => {

  const [bridgeIp, setBridgeIp] = useState<string>();
  const [bridgeToken, setBridgeToken] = useState<string>();
  const [error, setError] = useState<string>();
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  
  useEffect(() => {
    getBridge().then(async (data) => {
      setLoading(false);
      if (!data) {
        setError('No existen Hue Bridge en tu red');
      } else {
        setBridgeIp(data);
      }
    })
      .catch(() => {
        setError('Error al buscar los bridge');
      });
  }, [])

  useEffect(() => {
    getToken();
  }, [bridgeIp, retry])

  function getToken() {
    setTimeout(async () => {
      if (bridgeIp) {
        try {
          const token = await getBridgeToken(bridgeIp)
          if (token[0].success.username) {
            setBridgeToken(token[0].success.username);
            localStorage.setItem('token', token[0].success.username);
            localStorage.setItem('bridgeIp', bridgeIp);
            history.push(ROUTER_PATH.INIT_LOADING);
          } else {
            setRetry(retry + 1);
          }
        } catch (e) {
          setRetry(retry + 1);
        }
      }
    }, 2000)
  }

  if (loading) {
    return <LoadingTemplate/>
  }

  return (
    <Wrapper>
      <div className="center-content">
        <h1>Para comenzar pulsa el botón del Bidge</h1>
        <DivShadow>
          <Images type="bridge" height="200" width="200" style={{margin: '-70px -70px'}}/>
        </DivShadow>
        {bridgeIp && (
          <h3>Conectado a: {bridgeIp}</h3>
        )}
        {error &&(
          <span>{error}</span>
        )}
      </div>
    </Wrapper>
  )
};
