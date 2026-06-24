import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <header className="navbar">
            <h1 className="navbar-title">Personel Takip Sistemi</h1>

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