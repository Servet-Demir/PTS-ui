import { useEffect, useRef } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

function SuccessToast({ mesaj, onClose, sure = 2500 }) {
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onCloseRef.current();
        }, sure);

        return () => clearTimeout(timer);
    }, [mesaj, sure]);

    return (
        <div className="toast-container">
            <div className="success-toast">
                <div className="toast-icon">
                    <FaCheckCircle />
                </div>

                <div className="toast-content">
                    <strong>İşlem Başarılı</strong>
                    <span>{mesaj}</span>
                </div>

                <button className="toast-close" onClick={onClose}>
                    <FaTimes />
                </button>

                <div
                    className="toast-progress"
                    style={{ animationDuration: `${sure}ms` }}
                ></div>
            </div>
        </div>
    );
}

export default SuccessToast;