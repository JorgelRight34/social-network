const Dialog = ({ children, className, show, style = {} }) => {
  return (
    <div className={`dialog-overlay rounded-3 ${show ? "" : "d-none"}`}>
      <div className={`dialog bg-primary ${className}`} style={{ ...style }}>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
