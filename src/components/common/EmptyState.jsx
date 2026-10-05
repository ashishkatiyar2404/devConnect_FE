const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
          {icon}
        </div>
      )}
      <h2 className="font-display text-xl font-semibold text-base-content">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-base-content/60">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
