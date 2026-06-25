import { NavLink } from "react-router-dom";

function Navbar({ kullanici, onLogout }) {
    return (
        <header className="navbar">
            <div className="navbar-brand">
                <h1 className="navbar-title">Personel Takip Sistemi</h1>
                <span className="navbar-subtitle">Yönetim Paneli</span>
            </div>

            <div className="navbar-right">
                <nav className="navbar-links">
                    <NavLink to="/birim">Birim</NavLink>
                    <NavLink to="/personel">Personel</NavLink>
                    <NavLink to="/mesai">Mesai</NavLink>
                    <NavLink to="/maas">Maaş</NavLink>
                </nav>

                <div className="navbar-user">
                    <span>
                        {kullanici.ad} {kullanici.soyad}
                    </span>

                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;