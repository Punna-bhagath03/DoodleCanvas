'use client';

import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { serialize } from 'v8';

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState('');
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: 'join_room',
          roomId: id,
        })
      );
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === 'chat') {
          setChats((c) => [...c, { message: parsedData.message }]);
        }
      };
    }
    return () => {
      socket?.close();
    };
  }, [socket, loading, id]);
  return (
    <div>
      {chats.map((m) => (
        <div>{m.message}</div>
      ))}

      <input
        type="text"
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      ></input>

      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: 'chat',
              roomId: id,
              message: currentMessage,
            })
          );
          setCurrentMessage('');
        }}
      >
        send Message
      </button>
    </div>
  );
}
