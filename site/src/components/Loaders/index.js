export function LoaderSlim({ height, width }) {
  return (
    <div className={`animate-pulse flex w-${width}`}>
      <div className="flex-1 space-y-4 py-1">
        <div className={`h-${height} bg-white rounded`}></div>
      </div>
    </div>
  );
}
