import React, { useEffect } from "react";

type NotificationProps = {
  message: string;
  onClose: () => void;
  duration?: number; // ms, default 3000
};

const Notification: React.FC<NotificationProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className="fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded shadow-lg animate-fadeInOut"
      style={{ animationDuration: `${duration}ms` }}
    >
      {message}
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
        .animate-fadeInOut {
          animation-name: fadeInOut;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default Notification;
