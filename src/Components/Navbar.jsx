import { NavLink } from "react-router-dom";
import {
    FaBuilding,
    FaUsers,
    FaClock,
    FaMoneyBillWave,
    FaSignOutAlt,
    FaUserCircle,
    FaLayerGroup,
    FaShieldAlt,
} from "react-icons/fa";

function Navbar({ kullanici, onLogout }) {
    return (
        <header className="navbar premium-navbar">
            <div className="navbar-brand">
                <div className="navbar-logo">
                    <FaLayerGroup />
                </div>

                <div className="navbar-brand-text">
                    <div className="navbar-kicker">
                        <FaShieldAlt />
                        Yönetim Paneli
                    </div>

                    <h1 className="navbar-title">
                        Personel Takip Sistemi
                    </h1>
                </div>
            </div>

            <div className="navbar-right">
                <nav className="navbar-links">
                    <NavLink to="/birim">
                        <FaBuilding />
                        Birim
                    </NavLink>

                    <NavLink to="/personel">
                        <FaUsers />
                        Personel
                    </NavLink>

                    <NavLink to="/mesai">
                        <FaClock />
                        Mesai
                    </NavLink>

                    <NavLink to="/maas">
                        <FaMoneyBillWave />
                        Maaş
                    </NavLink>
                </nav>

                <div className="navbar-user">
                    <div className="user-avatar">
                        <FaUserCircle />
                    </div>

                    <div className="user-info">
                        <span>
                            {kullanici?.ad} {kullanici?.soyad}
                        </span>
                        <small>Aktif kullanıcı</small>
                    </div>

                    <button className="logout-button" onClick={onLogout}>
                        <FaSignOutAlt />
                        Çıkış
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;