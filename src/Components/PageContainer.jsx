const PageContainer = ({ children, narrow = false }) => {
  return (
    <div
      className={`mx-auto w-full px-4 py-6 sm:px-6 sm:py-10 lg:px-8 ${
        narrow ? "max-w-3xl" : "max-w-6xl"
      }`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
