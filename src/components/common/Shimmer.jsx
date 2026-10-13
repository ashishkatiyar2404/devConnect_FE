/**
 * Shimmer / Skeleton loading placeholders matching exact DevConnect layouts.
 * Ensures zero Cumulative Layout Shift (CLS) and smooth visual transitions.
 */

export const ConnectionCardShimmer = ({
  count = 4,
  variant = "connection",
}) => {
  const items = Array.from({ length: count }, (_, idx) => idx);

  return (
    <ul
      className="space-y-4"
      role="status"
      aria-busy="true"
      aria-label={
        variant === "request"
          ? "Loading connection requests"
          : "Loading connections"
      }
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex flex-col gap-4 rounded-2xl border border-base-content/10 bg-base-300 p-4 sm:flex-row sm:items-center sm:p-5"
        >
          <div className="shimmer h-16 w-16 shrink-0 rounded-full ring-1 ring-base-content/10 sm:h-20 sm:w-20" />

          <div className="min-w-0 flex-1 space-y-2 text-left">
            <div className="shimmer h-5 w-40 rounded-md" />
            <div className="shimmer h-3.5 w-24 rounded-md" />
            <div className="space-y-1.5 pt-0.5">
              <div className="shimmer h-3.5 w-full max-w-md rounded-md" />
              <div className="shimmer h-3.5 w-2/3 max-w-xs rounded-md" />
            </div>
          </div>

          {variant === "request" ? (
            <div className="flex w-full gap-2 sm:w-auto sm:shrink-0">
              <div className="shimmer h-10 flex-1 rounded-lg sm:w-20 sm:flex-none" />
              <div className="shimmer h-10 flex-1 rounded-lg sm:w-20 sm:flex-none" />
            </div>
          ) : (
            <div className="shrink-0 sm:self-center">
              <div className="shimmer h-10 w-full rounded-lg sm:w-20" />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export const UserCardShimmer = ({ showActions = true }) => {
  return (
    <div
      className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-base-content/10 bg-base-300 shadow-xl"
      role="status"
      aria-busy="true"
      aria-label="Loading developer profile card"
    >
      <div className="relative h-72 overflow-hidden sm:h-80">
        <div className="shimmer h-full w-full" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-base-300 to-transparent" />
      </div>

      <div className="space-y-2.5 px-5 pb-5 pt-2">
        <div className="shimmer h-6 w-48 rounded-md" />
        <div className="shimmer h-4 w-24 rounded-md" />
        <div className="space-y-1.5 pt-1">
          <div className="shimmer h-3.5 w-full rounded-md" />
          <div className="shimmer h-3.5 w-4/5 rounded-md" />
        </div>

        {showActions && (
          <div className="flex gap-3 pt-3">
            <div className="shimmer h-11 flex-1 rounded-lg" />
            <div className="shimmer h-11 flex-1 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export const ProfileShimmer = () => {
  return (
    <div
      className="flex flex-col items-stretch justify-center gap-8 lg:flex-row lg:items-start"
      role="status"
      aria-busy="true"
      aria-label="Loading profile editor"
    >
      <div className="card w-full max-w-md border border-base-content/10 bg-base-300 shadow-xl">
        <div className="card-body gap-4">
          <div className="space-y-1.5">
            <div className="shimmer h-3 w-20 rounded" />
            <div className="shimmer h-7 w-40 rounded-md" />
            <div className="shimmer h-4 w-64 rounded-md" />
          </div>

          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <div className="shimmer h-3.5 w-20 rounded" />
                <div className="shimmer h-11 w-full rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <div className="shimmer h-3.5 w-20 rounded" />
                <div className="shimmer h-11 w-full rounded-lg" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="shimmer h-3.5 w-24 rounded" />
              <div className="shimmer h-11 w-full rounded-lg" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <div className="shimmer h-3.5 w-14 rounded" />
                <div className="shimmer h-11 w-full rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <div className="shimmer h-3.5 w-16 rounded" />
                <div className="shimmer h-11 w-full rounded-lg" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="shimmer h-3.5 w-16 rounded" />
              <div className="shimmer h-24 w-full rounded-lg" />
            </div>
          </div>

          <div className="pt-2">
            <div className="shimmer h-11 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm self-center lg:self-start">
        <div className="mb-2 flex justify-center lg:justify-start">
          <div className="shimmer h-3 w-24 rounded" />
        </div>
        <UserCardShimmer showActions={false} />
      </div>
    </div>
  );
};

export const ChatShimmer = () => {
  const bubbles = [
    { align: "chat-start", width: "w-48" },
    { align: "chat-end", width: "w-56" },
    { align: "chat-start", width: "w-64" },
    { align: "chat-end", width: "w-40" },
    { align: "chat-start", width: "w-52" },
  ];

  return (
    <div
      className="space-y-3 py-2"
      role="status"
      aria-busy="true"
      aria-label="Loading conversation messages"
    >
      {bubbles.map((bubble, idx) => (
        <div key={idx} className={`chat ${bubble.align}`}>
          <div className="chat-header mb-1">
            <div className="shimmer h-3 w-20 rounded" />
          </div>
          <div className={`shimmer h-10 ${bubble.width} rounded-2xl`} />
        </div>
      ))}
    </div>
  );
};
