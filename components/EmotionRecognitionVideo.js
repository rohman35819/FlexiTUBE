import React, { useState } from 'react';

export default function EmotionRecognitionVideo() {
  const [detectedEmotion, setDetectedEmotion] = useState(null);

  // Dummy detection, nanti bisa diintegrasi AI model video processing
  const detectEmotion = () => {
    const emotions = ['Happy', 'Sad', 'Angry', 'Neutral', 'Surprised'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setDetectedEmotion(randomEmotion);
  };

  return (
    <section aria-label="Emotion Recognition from Video Call">
      <h2>Emotion Recognition Video</h2>
      <button onClick={detectEmotion}>Detect Emotion</button>
      {detectedEmotion && <p>Detected Emotion: {detectedEmotion}</p>}
    </section>
  );
}
