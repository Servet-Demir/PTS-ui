import { FaExclamationCircle, FaCheck } from "react-icons/fa";

function InfoPopup({ mesaj, onClose }) {
    return (
        <div className="popup-overlay">
            <div className="popup-card">
                <div className="popup-icon warning-icon">
                    <FaExclamationCircle />
                </div>

                <h3>Uyarı</h3>

                <p>{mesaj}</p>

                <div className="popup-actions">
                    <button onClick={onClose}>
                        <FaCheck />
                        Tamam
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InfoPopup;