const ErrorState = ({
  icon = "⚠",
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  retryLabel = "Try again",
}) => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-error/15 text-2xl text-error">
        {icon}
      </div>
      <h2 className="font-display text-xl font-semibold text-base-content">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-base-content/60">
          {description}
        </p>
      )}
      {onRetry && (
        <div className="mt-6">
          <button
            type="button"
            className="btn btn-outline btn-error btn-sm min-h-10 px-5"
            onClick={onRetry}
          >
            {retryLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorState;
