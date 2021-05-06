import React, {FunctionComponent, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Hue} from 'hue-hacking-node';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row, FormCheckbox} from 'shards-react';
import {Lamp} from 'hue-hacking-node/src/hue-interfaces';
import styled from 'styled-components';
import {ROUTER_PATH} from './router/routes';
import {Loading} from '../animations/loading';
import {connectBridge} from '../service/hue-service';
import {Wrapper} from './template/wrapper';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'shards-ui/dist/css/shards.min.css';
import {LampHue} from '../types/lampHue';
import {Icon} from '../img/asset';

const Div = styled.div`
  display: grid;
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
    if (bridgeApi) {
      bridgeApi.getLamps().then((lampsApi) => {
        setLamps(lampsApi as LampHue[]);
        console.log(lampsApi);
      });
    }
  }, [bridgeApi])

  useEffect(() => {
    console.log(selectedLamps);
  }, [selectedLamps])

  function selectedLamp(lamp: LampHue) {
    const search = selectedLamps.find((data) => data.uniqueid === lamp.uniqueid);
    if (search) {
      const index = selectedLamps.indexOf(lamp);
      setSelectedLamps(selectedLamps.splice(index, 1));
    } else {
      setSelectedLamps(selectedLamps.concat(lamp));
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

  function LoadingPage() {
    return (
      <Loading>
        <div className="loading">
          <div className="loading-text">
            <span className="loading-text-words">L</span>
            <span className="loading-text-words">O</span>
            <span className="loading-text-words">A</span>
            <span className="loading-text-words">D</span>
            <span className="loading-text-words">I</span>
            <span className="loading-text-words">N</span>
            <span className="loading-text-words">G</span>
          </div>
        </div>
      </Loading>
    )
  }

  if (loading) {
    return <LoadingPage/>
  }

  return (
    <Wrapper>
      <div className="center-upper">
        <Container>
          {LampsComponent()}
        </Container>
      </div>
    </Wrapper>
  )
};
