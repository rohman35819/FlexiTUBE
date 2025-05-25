import React from 'react';

export default function VideoPlayer({ src, title }) {
  return (
    <section aria-label={title || "Video Player"}>
      <video controls width="100%" src={src}>
        Sorry, your browser does not support embedded videos.
      </video>
    </section>
  );
}
