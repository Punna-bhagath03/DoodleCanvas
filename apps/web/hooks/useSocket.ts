import { useEffect, useState } from 'react';
import { WS_URL } from '../app/config';

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YjM5NzQzNC0xYjVjLTQwN2EtODk4NC1kM2FlM2Q4MGUwODYiLCJpYXQiOjE3NDY5NTY5Nzd9.YNn7X6_MMHS5_EgBgOczfp27IYigMKJz5_63qScK9h0`
    );
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
