import React from 'react';
import PropTypes from 'prop-types';
import '../styles/avatar.css';

export default function Avatar({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="avatar-image"
      loading="lazy"
      width="120"
      height="120"
      style={{ borderRadius: '50%', objectFit: 'cover' }}
    />
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
