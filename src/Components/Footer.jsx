import { FaCode, FaUserGraduate } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <FaCode />
                    <span>Personel Takip Sistemi</span>
                </div>

                <div className="footer-right">
                    <FaUserGraduate />
                    <span>Staj Projesi - Servet Demir</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;