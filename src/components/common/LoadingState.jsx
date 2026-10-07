const LoadingState = ({ label = "Loading…", className = "min-h-[40vh]" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 px-4 ${className}`}
    >
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm text-base-content/60">{label}</p>
    </div>
  );
};

export default LoadingState;
