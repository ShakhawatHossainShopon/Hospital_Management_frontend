// PositiveStat.jsx
import React from 'react';

const StatBlock = ({
  title,
  count,
  positive,
  anything,
}: {
  title: string;
  count: number;
  positive?: boolean;
  anything?: string;
}) => {
  return (
    <div>
      <div
        id="jh-stats-positive"
        className="flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded min-w-[150px] mx-auto"
      >
        <div>
          <div>
            <p
              className={`flex items-center justify-end text-md ${positive ? 'text-green-500' : 'text-red-500'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path
                  className="heroicon-ui"
                  d={
                    positive
                      ? 'M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z'
                      : 'M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z'
                  }
                />
              </svg>
            </p>
          </div>
          <p className="text-2xl font-semibold text-center text-gray-800">
            {count} {anything && anything}
          </p>
          <p className="text-xs text-center text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default StatBlock;
