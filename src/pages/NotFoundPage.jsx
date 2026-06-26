import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome, FaExclamationTriangle } from "react-icons/fa";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="notfound-page">
            <div className="notfound-background-shape shape-one"></div>
            <div className="notfound-background-shape shape-two"></div>

            <div className="notfound-card">
                <div className="notfound-icon">
                    <FaExclamationTriangle />
                </div>

                <p className="notfound-code">404</p>

                <h1 className="notfound-title">Sayfa Bulunamadı</h1>

                <p className="notfound-text">
                    Aradığınız sayfa bulunamadı, kaldırılmış olabilir
                    ya da yanlış bir adrese gitmiş olabilirsiniz.
                </p>

                <div className="notfound-actions">
                    <Link to="/birim" className="notfound-home-button">
                        <FaHome />
                        Ana Sayfaya Dön
                    </Link>

                    <button
                        className="notfound-back-button"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />
                        Geri Git
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;