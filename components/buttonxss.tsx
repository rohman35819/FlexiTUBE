'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import { FaRadiationAlt } from 'react-icons/fa';

const Buttonxss: React.FC = () => {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [moved, setMoved] = useState(false);

  const handleMouseDown = () => {
    setDragging(true);
    setMoved(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setMoved(true);
      setPosition({
        x: e.clientX - 75,
        y: e.clientY - 40,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleClick = () => {
    if (!moved) {
      router.push('/xss/page');
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: dragging ? 'grabbing' : 'grab',
        zIndex: 9999,
        userSelect: 'none',
        backgroundColor: '#DC2626', // merah solid
        color: "white",
        padding: '18px',
        borderRadius: '14px',
      }}
    >
      <div className="text-white font-semibold px-6 py-2 rounded flex items-center gap-2 text-lg">
        <FaRadiationAlt className="text-white text-xl" />
        <span>Eksploitasi XSS</span>
      </div>
    </div>
  );
};

export default Buttonxss;
