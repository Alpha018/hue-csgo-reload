import React, {FunctionComponent, ImgHTMLAttributes} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bridge from './bridgeV2.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bulb from './bulb.svg';

const images = {
  bridge: { alt: 'bridge', src: bridge },
}

const icons = {
  bulb: { alt: 'bulb', src: bulb },
}

export function Images(props: { type: keyof typeof images } & ImgHTMLAttributes<unknown>): JSX.Element {
  const { type, ...restProps } = props
  const { alt, src } = images[type]

  // eslint-disable-next-line react/react-in-jsx-scope,react/jsx-props-no-spreading
  return <img {...restProps} src={src} alt={alt} />
}

export function Icon(props: { type: keyof typeof icons } & ImgHTMLAttributes<unknown>): JSX.Element {
  const { type, ...restProps } = props
  const { alt, src } = icons[type]

  // eslint-disable-next-line react/react-in-jsx-scope,react/jsx-props-no-spreading
  return <img {...restProps} src={src} alt={alt} />
}
