/* eslint-disable @next/next/no-img-element */
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <img
        src="/images/portal.png"
        alt="Loading"
        className="w-32 h-32 animate-spin"
        style={{animation: "spin 1.5s linear infinite"}}
      />
    </div>
  );
}
