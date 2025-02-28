
const GradientWrapper = ({
  graditientStyles,
  children,
}) => {
  // Build gradient style object dynamically
  

  return (
    <div className={`h-full overflow-y-auto  ${graditientStyles}`}>
      {children}
    </div>
  );
};

export default GradientWrapper;
