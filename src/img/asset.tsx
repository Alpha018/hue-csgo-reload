import React, {FunctionComponent, ImgHTMLAttributes} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bridge from './bridgeV2.png';

const images = {
  bridge: { alt: 'bridge', src: bridge },
}

export function Images(props: { type: keyof typeof images } & ImgHTMLAttributes<unknown>): JSX.Element {
  const { type, ...restProps } = props
  const { alt, src } = images[type]

  // eslint-disable-next-line react/react-in-jsx-scope,react/jsx-props-no-spreading
  return <img {...restProps} src={src} alt={alt} />
}
