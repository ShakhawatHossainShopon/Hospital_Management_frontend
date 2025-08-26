'use client';
import Error from '@/components/error/Error';

export default function ErrorBoundary({ error }: { error: Error }) {
  return <Error error={error} />;
}
