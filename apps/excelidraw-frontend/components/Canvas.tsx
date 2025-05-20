'use client';
import { initDraw } from '@/draw';
import { useEffect, useRef } from 'react';

export function Canvas({
  socket,
  roomId,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);
  return (
    <div>
      {' '}
      <canvas ref={canvasRef} width={3000} height={1500}></canvas>
    </div>
  );
}
