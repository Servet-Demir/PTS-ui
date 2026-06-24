import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-brand">
                <h1 className="navbar-title">Personel Takip Sistemi</h1>
                <span className="navbar-subtitle">Yönetim Paneli</span>
            </div>

            <nav className="navbar-links">
                <NavLink to="/birim">Birim</NavLink>
                <NavLink to="/personel">Personel</NavLink>
                <NavLink to="/mesai">Mesai</NavLink>
                <NavLink to="/maas">Maaş</NavLink>
            </nav>
        </header>
    );
}

export default Navbar;