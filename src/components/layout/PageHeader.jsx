const PageHeader = ({ kicker, title, description, actions }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {kicker && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {kicker}
          </p>
        )}
        <h1 className="font-display text-2xl font-semibold tracking-tight text-base-content sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-base-content/60 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
};

export default PageHeader;
