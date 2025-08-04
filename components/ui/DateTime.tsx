import React from 'react';

type DateTimeProps = {
  isoDate: string;
};

export function DateTime({ isoDate }: DateTimeProps) {
  const date = new Date(isoDate);

  // Date part YYYY-MM-DD
  const dateString = date.toISOString().split('T')[0];

  // Time part in 12-hour format without seconds
  const hours24 = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  const pad = (n: number) => n.toString().padStart(2, '0');

  const timeString = `${hours12}:${pad(minutes)} ${ampm}`;

  return (
    <span>
      {dateString} {timeString}
    </span>
  );
}
