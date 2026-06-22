import { Link, Route, Routes, Navigate } from "react-router-dom";

import BirimPage from "./pages/BirimPage";
import PersonelPage from "./pages/PersonelPage";
import MesaiPage from "./pages/MesaiPage";
import MaasPage from "./pages/MaasPage";

function App() {
  return (
    <div>
      <h1>Personel Takip Sistemi</h1>

      <nav>
        <Link to="/birim">Birim</Link> |{" "}
        <Link to="/personel">Personel</Link> |{" "}
        <Link to="/mesai">Mesai</Link> |{" "}
        <Link to="/maas">Maaş</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Navigate to="/birim" />} />
        <Route path="/birim" element={<BirimPage />} />
        <Route path="/personel" element={<PersonelPage />} />
        <Route path="/mesai" element={<MesaiPage />} />
        <Route path="/maas" element={<MaasPage />} />
      </Routes>
    </div>
  );
}

export default App;