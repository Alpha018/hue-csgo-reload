import styled from 'styled-components';

export const Wrapper = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Prompt);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #141615;
  z-index: 9999;

  h1, h2, h3, h4, h5, h6, p {
    font-family: 'Prompt', sans-serif;
    color: white;
  }

  .center-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    width: 100%;
    height: 50%;
    line-height: 100px;
  }
`
