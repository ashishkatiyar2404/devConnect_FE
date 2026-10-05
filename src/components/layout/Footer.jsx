const Footer = () => {
  return (
    <footer className="mt-auto border-t border-base-content/10 bg-neutral text-neutral-content">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
        <p className="font-display text-sm font-medium">DevConnect</p>
        <p className="text-xs text-neutral-content/60 sm:text-sm">
          © {new Date().getFullYear()} · Build with people who ship
        </p>
      </div>
    </footer>
  );
};

export default Footer;
