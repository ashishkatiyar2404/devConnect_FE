const BrandMark = ({ className = "h-8 w-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" className="fill-primary/15" />
      <circle cx="11" cy="16" r="3.2" className="fill-primary" />
      <circle cx="21" cy="10.5" r="2.4" className="fill-primary/80" />
      <circle cx="21" cy="21.5" r="2.4" className="fill-primary/80" />
      <path
        d="M13.8 14.6L18.6 11.4M13.8 17.4L18.6 20.6"
        className="stroke-primary"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BrandMark;
