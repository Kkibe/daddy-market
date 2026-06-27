import { useState } from 'react';

const PLACEHOLDER_URL = 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600';

export default function ProductImage({ src, alt, className, style }) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER_URL);
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    if (!errored) {
      setErrored(true);
      setImgSrc(PLACEHOLDER_URL);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || 'Product image'}
      className={className}
      style={style}
      loading="lazy"
      onError={handleError}
    />
  );
}
