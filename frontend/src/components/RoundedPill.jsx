const RoundedPill = ({ children, className, onClick }) => {
    return (
        <div 
            className={`rounded-pill d-flex align-items-center bg-secondary p-1 px-3 hover ${className}`} 
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default RoundedPill