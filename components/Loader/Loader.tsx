// app/components/Loader.tsx
export default function Loader() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen gap-4 text-blue-600"
      role="status"
      aria-label="Loading"
    >
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-400 border-t-transparent"></div>
      <p className="text-sm font-medium">Loading, please wait...</p>
    </div>
  );
}
