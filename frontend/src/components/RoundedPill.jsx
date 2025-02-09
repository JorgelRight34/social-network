const RoundedPill = ({ children, className, style, onClick }) => {
  return (
    <div
      className={`rounded-pill d-flex align-items-center bg-secondary p-1 px-3 hover-accent ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default RoundedPill;
