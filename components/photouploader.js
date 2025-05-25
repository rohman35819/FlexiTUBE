import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/imageWithPlaceholder.css';

export default function ImageWithPlaceholder({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {!loaded && !error && <div className="image-placeholder" aria-label="Loading image" />}
      {error && <div className="image-error" aria-label="Image failed to load">Image not available</div>}
      <img
        src={src}
        alt={alt}
        className={`lazy-image ${loaded ? 'loaded' : 'hidden'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
    </>
  );
}

ImageWithPlaceholder.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
