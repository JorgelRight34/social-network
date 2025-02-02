const DialogBody = ({ children, title, onHide }) => {
    return (
        <>
            <div className="d-flex align-items-center p-3 border-bottom mb-3">
                <h2>{title}</h2>
                <span 
                    className="ms-auto hover" 
                    onClick={onHide}
                >
                    Close
                </span>
            </div>
            {children}
        </>
    )
}

export default DialogBody