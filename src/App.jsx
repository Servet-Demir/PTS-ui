import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LoginPage from "./pages/LoginPage";
import BirimPage from "./pages/BirimPage";
import PersonelPage from "./pages/PersonelPage";
import MesaiPage from "./pages/MesaiPage";
import MaasPage from "./pages/MaasPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function App() {
  const [girisYapanKullanici, setGirisYapanKullanici] = useState(null);

  const handleLogin = (kullanici) => {
    setGirisYapanKullanici(kullanici);
  };

  const handleLogout = () => {
    setGirisYapanKullanici(null);
  };

  if (!girisYapanKullanici) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Navbar
        kullanici={girisYapanKullanici}
        onLogout={handleLogout}
      />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Navigate to="/birim" />} />
          <Route path="/birim" element={<BirimPage />} />
          <Route path="/personel" element={<PersonelPage />} />
          <Route path="/mesai" element={<MesaiPage />} />
          <Route path="/maas" element={<MaasPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;