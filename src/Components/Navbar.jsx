import { NavLink } from "react-router-dom";
import { FaBuilding, FaUsers, FaClock, FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa";

function Navbar({ kullanici, onLogout }) {
    return (
        <header className="navbar">
            <div className="navbar-brand">
                <h1 className="navbar-title">Personel Takip Sistemi</h1>
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
                    <span>
                        {kullanici.ad} {kullanici.soyad}
                    </span>

                    <button className="logout-button" onClick={onLogout}>
                        <FaSignOutAlt />
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;