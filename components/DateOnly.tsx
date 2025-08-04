import React from 'react';

type DateOnlyProps = {
  isoDate: string; // expects ISO datetime string like "2025-08-02T17:25:53.000000Z"
};

export function DateOnly({ isoDate }: DateOnlyProps) {
  // Convert to Date object and extract date string
  const justDate = new Date(isoDate).toISOString().split('T')[0];

  return <span>{justDate}</span>;
}
