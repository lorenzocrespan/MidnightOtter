export function CubeSpinner() {
  return (
    <span className="flex h-screen w-full items-center justify-center">
      <span className="relative flex h-10 w-10 animate-spin rounded-sm bg-blue-600 opacity-75"></span>
    </span>
  );
}

export function AbsoluteSpinner() {
  return (
    <div className="absolute inset-0 z-50 flex items-center bg-black">
      {CubeSpinner()}
    </div>
  );
}
