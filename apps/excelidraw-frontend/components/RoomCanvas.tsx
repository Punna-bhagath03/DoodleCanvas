'use client';

import { WS_URL } from '@/config';
import { initDraw } from '@/draw';
import { useEffect, useRef, useState } from 'react';
import { Canvas } from './Canvas';

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYjcwYjQzNS1mYmNjLTQ0ZjEtODk4Ny1mZTFiYmRhNWJjN2YiLCJpYXQiOjE3NDc3NTI2Mjd9.Sd8wHYM5MP03heuzUxceUiai57GKQwpo6s60P1pufvI`
    );

    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        type: 'join_room',
        roomId,
      });
      ws.send(data);
    };
  }, []);

  if (!socket) {
    return <div>Connecting to Server...</div>;
  }
  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
