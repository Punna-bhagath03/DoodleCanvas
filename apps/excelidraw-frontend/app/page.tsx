import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href={'/signin'}>
        <button>Sign in</button>
      </Link>

      <Link href={'/signup'}>
        <button>Sign up</button>
      </Link>
    </div>
  );
}
