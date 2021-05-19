import React, {ImgHTMLAttributes} from 'react';

const images = {
  bridge: { alt: 'bridge', src: 'static://static/bridgeV2.png' },
}

const icons = {
  bulb: { alt: 'bulb', src: 'static://static/bulb.svg' },
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
