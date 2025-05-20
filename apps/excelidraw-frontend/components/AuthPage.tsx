'use client';

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 rounded-xl bg-white shadow-md w-96 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isSignin ? 'Sign In' : 'Sign Up'}
        </h2>
        <input
          type="text"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400  text-black "
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          onClick={() => {}}
          className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200"
        >
          {isSignin ? 'Sign in' : 'Sign up'}
        </button>
      </div>
    </div>
  );
}
