import { FaExclamationTriangle, FaTrash, FaTimes } from "react-icons/fa";

function ConfirmPopup({ mesaj, onConfirm, onCancel }) {
    return (
        <div className="popup-overlay">
            <div className="popup-card">
                <div className="popup-icon">
                    <FaExclamationTriangle />
                </div>

                <h3>Silme Onayı</h3>

                <p>{mesaj}</p>

                <div className="popup-actions">
                    <button className="secondary-button" onClick={onCancel}>
                        <FaTimes />
                        Vazgeç
                    </button>

                    <button className="delete-button" onClick={onConfirm}>
                        <FaTrash />
                        Sil
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPopup;