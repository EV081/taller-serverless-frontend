import './Loading.css';

const Loading = ({ message = 'Cargando...' }) => {
    return (
        <div className="loading-container">
            <div className="burger-loading">
                <div className="burger-top">🍔</div>
                <div className="burger-bottom">🍔</div>
            </div>
            <p className="loading-text">{message}</p>
        </div>
    );
};

export default Loading;
