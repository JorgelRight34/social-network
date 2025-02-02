const Dialog = ({ children, className, show }) => {
    return (
        <div className={`dialog-overlay rounded-3 ${show ? '' : 'd-none'}`}>
            <div className={`dialog bg-primary ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default Dialog