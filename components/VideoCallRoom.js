import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import '../styles/videoCall.css';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export default function VideoCallRoom({ roomId, userName }) {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const s = io(SOCKET_SERVER_URL);
    setSocket(s);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        setPeerConnection(pc);

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.onicecandidate = event => {
          if (event.candidate) {
            s.emit('ice-candidate', { candidate: event.candidate, roomId });
          }
        };

        pc.ontrack = event => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        s.emit('join-room', { roomId, userName });

        s.on('offer', async ({ sdp }) => {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          s.emit('answer', { sdp: answer, roomId });
        });

        s.on('answer', async ({ sdp }) => {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        });

        s.on('ice-candidate', async ({ candidate }) => {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        });
      })
      .catch(err => console.error('Error accessing media devices.', err));

    return () => {
      if (socket) socket.disconnect();
      if (peerConnection) peerConnection.close();
    };
  }, [roomId, userName]);

  const startCall = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', { sdp: offer, roomId });
  };

  return (
    <div className="video-call-room">
      <div className="videos">
        <video ref={localVideoRef} autoPlay muted className="local-video" />
        <video ref={remoteVideoRef} autoPlay className="remote-video" />
      </div>
      <Button type="primary" onClick={startCall}>Start Call</Button>
    </div>
  );
}
