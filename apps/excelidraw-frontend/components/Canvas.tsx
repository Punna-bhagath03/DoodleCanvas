'use client';
import { initDraw } from '@/draw';
import { useEffect, useRef, useState } from 'react';
import { IconButton } from './IconButton';
import { Circle, Pencil, RectangleHorizontalIcon } from 'lucide-react';
import { Game } from '@/draw/Game';

export type Tool = 'circle' | 'rect' | 'pencil';
export function Canvas({
  socket,
  roomId,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>('circle');

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} width={3000} height={1500}></canvas>
      <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div style={{ position: 'fixed', top: 20, left: 40, color: 'white' }}>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <IconButton
          activated={selectedTool === 'pencil'}
          icon={<Pencil />}
          onClick={() => {
            {
              setSelectedTool('pencil');
            }
          }}
        ></IconButton>
        <IconButton
          activated={selectedTool === 'rect'}
          icon={<RectangleHorizontalIcon />}
          onClick={() => {
            {
              setSelectedTool('rect');
            }
          }}
        ></IconButton>
        <IconButton
          onClick={() => {
            {
              setSelectedTool('circle');
            }
          }}
          activated={selectedTool === 'circle'}
          icon={<Circle />}
        ></IconButton>
      </div>
    </div>
  );
}
