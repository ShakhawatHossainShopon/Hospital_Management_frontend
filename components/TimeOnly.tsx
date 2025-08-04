import React from 'react';

type Time12HourProps = {
  isoDate: string;
};

export function Time12Hour({ isoDate }: Time12HourProps) {
  const date = new Date(isoDate);

  const hours24 = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;

  const pad = (n: number) => n.toString().padStart(2, '0');

  const time12h = `${hours12}:${pad(minutes)} ${ampm}`;

  return <span>{time12h}</span>;
}
