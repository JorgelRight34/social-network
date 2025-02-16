import RoundedPill from "./RoundedPill";

const DialogBody = ({ children, title, onHide }) => {
  return (
    <>
      <div className="d-flex align-items-center p-3 border-bottom mb-3">
        <h3 className="mb-0">{title}</h3>
        <RoundedPill className="ms-auto bg-secondary border" onClick={onHide}>
          Close
        </RoundedPill>
      </div>
      {children}
    </>
  );
};

export default DialogBody;
