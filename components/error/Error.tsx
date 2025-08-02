'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset?: () => void }) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-gray-50">
      <svg
        className="w-16 h-16 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>

      <h2 className="text-2xl font-semibold text-red-600 mb-2">Oops! Something went wrong.</h2>
      <p className="text-gray-600 mb-6">{error.message || 'Unknown error occurred.'}</p>

      {reset && (
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Try again
        </button>
      )}
    </div>
  );
}
