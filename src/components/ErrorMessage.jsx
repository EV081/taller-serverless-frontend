import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="error-message-container">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Algo salió mal</h3>
            <p className="error-text">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn btn-primary">
                    Intentar de nuevo
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
