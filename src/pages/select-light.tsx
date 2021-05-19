import React, {FunctionComponent, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Hue} from 'hue-hacking-node';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Card, CardBody, CardTitle, Col, Container, Row, FormCheckbox} from 'shards-react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import LoadingTemplate from './template/loading';
import {ROUTER_PATH} from './router/routes';
import {connectBridge, changeGameState} from '../service/hue-service';
import {Wrapper} from './template/wrapper';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'shards-ui/dist/css/shards.min.css';
import {LampHue} from '../types/lampHue';
import {Icon} from '../img/asset';

const Div = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 0.4fr 1fr 1fr;
  
  .align-left {
    justify-self: start;
  }
  
  .align-right {
    justify-self: end;
  }
`;

export const SelectLightComponent: FunctionComponent = () => {

  const token = localStorage.getItem('token');
  const bridgeIp = localStorage.getItem('bridgeIp');
  const [bridgeApi, setBridgeApi] = useState<Hue>(null);
  const [lamps, setLamps] = useState<LampHue[]>([]);
  const [selectedLamps, setSelectedLamps] = useState<LampHue[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const {status} = useSelector((storeTypes: any) => storeTypes.game);

  useEffect(() => {
    if (!token || !bridgeIp) {
      history.push(ROUTER_PATH.BRIDGE_PAGE);
    } else {
      const hue = connectBridge(token, bridgeIp);
      setBridgeApi(hue);
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (status?.round?.phase) {
      changeGameState(status, selectedLamps)
    }
  }, [status])

  useEffect(() => {
    if (bridgeApi) {
      bridgeApi.getLamps().then((lampsApi) => {
        setLamps(lampsApi as LampHue[]);
      });
    }
  }, [bridgeApi])

  function selectedLamp(lamp: LampHue) {
    const search = selectedLamps.find((data) => data.uniqueid === lamp.uniqueid);
    if (search) {
      setSelectedLamps(selectedLamps.filter(item => item.uniqueid !== lamp.uniqueid));
    } else {
      setSelectedLamps(oldArray => [...oldArray, lamp]);
    }
  }

  const LampsComponent = () => {
    const filter = 'Extended color light';
    const finalLight = lamps.filter((data) => data.type === filter);
    const rows = [...Array(Math.ceil(finalLight.length / 2))];
    const productRows = rows.map((row, idx) => finalLight.slice(idx * 2, idx * 2 + 2));
    return productRows.map((row, idx) => (
      // eslint-disable-next-line react/no-array-index-key
        <Row key={idx}>
          {row.filter((data) => data).map((lamp) => (
            <Col style={{'padding': '20px'}} key={lamp.uniqueid}>
              <Card style={{
                height: '100px',
                backgroundColor: selectedLamps.find((data) => data.uniqueid === lamp.uniqueid) ? '#4389a6' : '#272727'
              }}>
                <CardBody>
                  <Div>
                    <Icon type="bulb" className="align-left"/>
                    <CardTitle className="align-left">{lamp.name}</CardTitle>
                    <FormCheckbox
                      className="align-right"
                      toggle
                      checked={!!selectedLamps.find((data) => data.uniqueid === lamp.uniqueid)}
                      onChange={() => selectedLamp(lamp)}/>
                  </Div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )
    );
  }

  if (loading) {
    return <LoadingTemplate/>
  }

  return (
    <Wrapper>
      <div className="center-upper">
        <h1>Selecciona las luces que quieras conectar</h1>
        <h2>y comienza a jugar Counter Strike</h2>
        <Container>
          {LampsComponent()}
        </Container>
      </div>
    </Wrapper>
  )
};
