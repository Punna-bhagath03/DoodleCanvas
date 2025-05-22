import { ReactNode } from 'react';

export function IconButton({
  icon,
  onClick,
  activated,
}: {
  icon: ReactNode;
  onClick: () => void;
  activated: boolean;
}) {
  return (
    <div
      style={{
        margin: '0.5rem',
        cursor: 'pointer',
        borderRadius: '9999px',
        border: '1px solid #e5e7eb',
        padding: '0.5rem',
        backgroundColor: 'black',
        color: activated ? 'red' : 'white',
      }}
      onClick={onClick}
    >
      {icon}
    </div>
  );
}
