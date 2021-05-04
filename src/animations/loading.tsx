import styled, { css } from 'styled-components';

export const Loading = styled.div`
  @import url(https://fonts.googleapis.com/css?family=Prompt);

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #141615;
    z-index: 9999;
  }

  .loading-text {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    width: 100%;
    height: 100px;
    line-height: 100px;

    span {
      display: inline-block;
      margin: 0 5px;
      color: #fff;
      font-family: 'Prompt', sans-serif;
      ${createCSS()};
    }
  }

  @keyframes blur-text {
    0% {
      filter: blur(0px);
    }
    100% {
      filter: blur(4px);
    }
  }
`
function createCSS() {
  let styles = '';

  for (let i = 0; i <= 6; i += 1) {
    styles += `
       &:nth-child(${i + 1}) {
          filter: blur(0px);
          animation: blur-text 1.5s ${i/5}s infinite linear alternate;
        }
     `
  }

  return css`${styles}`;
}
