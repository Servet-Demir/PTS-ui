import { useEffect, useState } from "react";
import { getAllPersoneller } from "../api/personelApi";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaList } from "react-icons/fa";
import { hesaplaMaas, getMaasByDonem, deleteMaas } from "../api/maasApi";

function MaasPage() {
    const [personeller, setPersoneller] = useState([]);
    const [maaslar, setMaaslar] = useState([]);

    const [personelId, setPersonelId] = useState("");
    const [donem, setDonem] = useState("2026-06-01");

    const [hesaplananMaas, setHesaplananMaas] = useState(null);

    const fetchPersoneller = async () => {
        const response = await getAllPersoneller();
        setPersoneller(response.data);
    };

    const fetchMaaslar = async () => {
        if (!donem) {
            alert("Lütfen dönem seçiniz.");
            return;
        }

        const response = await getMaasByDonem(donem);

        const siraliMaaslar = [...response.data].sort(
            (a, b) => a.maasId - b.maasId
        );

        setMaaslar(siraliMaaslar);
    };

    const handleMaasHesapla = async () => {
        if (!personelId || !donem) {
            alert("Lütfen personel ve dönem seçiniz.");
            return;
        }

        const response = await hesaplaMaas(personelId, donem);

        setHesaplananMaas(response.data);

        fetchMaaslar();
    };

    const handleDelete = async (id) => {
        await deleteMaas(id);
        fetchMaaslar();
    };

    useEffect(() => {
        fetchPersoneller();
    }, []);

    return (
        <div>
            <div className="page-header">
                <h2>Maaş Yönetimi</h2>
            </div>

            <div className="form-section">
                <h3 className="section-title">Maaş Hesapla</h3>

                <div className="form-row">
                    <select
                        value={personelId}
                        onChange={(e) => setPersonelId(e.target.value)}
                    >
                        <option value="">Personel seçiniz</option>

                        {personeller.map((personel) => (
                            <option
                                key={personel.personelId}
                                value={personel.personelId}
                            >
                                {personel.ad} {personel.soyad}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={donem}
                        onChange={(e) => setDonem(e.target.value)}
                    />

                    <button onClick={handleMaasHesapla}>
                        <FaPlus />
                        Maaş Hesapla
                    </button>

                    <button onClick={fetchMaaslar}>
                        <FaList />
                        Dönemlik Maaşları Listele
                    </button>
                </div>
            </div>

            {hesaplananMaas && (
                <>
                    <h3>Son Hesaplanan Maaş</h3>

                    <div className="maas-summary-grid">
                        <div className="maas-card">
                            <p className="maas-card-title">Personel</p>
                            <p className="maas-card-value maas-card-small">
                                {hesaplananMaas.personel?.ad}{" "}
                                {hesaplananMaas.personel?.soyad}
                            </p>
                        </div>

                        <div className="maas-card">
                            <p className="maas-card-title">Brüt Maaş</p>
                            <p className="maas-card-value">
                                {hesaplananMaas.brutMaas} ₺
                            </p>
                        </div>

                        <div className="maas-card">
                            <p className="maas-card-title">Ceza</p>
                            <p className="maas-card-value">
                                {hesaplananMaas.ceza} ₺
                            </p>
                        </div>

                        <div className="maas-card">
                            <p className="maas-card-title">Net Maaş</p>
                            <p className="maas-card-value">
                                {hesaplananMaas.netMaas} ₺
                            </p>
                        </div>
                    </div>

                    <div className="maas-meta-row">
                        <span className="badge badge-blue">
                            Dönem: {hesaplananMaas.donem}
                        </span>

                        <span className="badge badge-red">
                            Geçersiz Gün: {hesaplananMaas.gecersizGun}
                        </span>
                    </div>
                </>
            )}

            <h3>Dönemlik Maaş Listesi</h3>

            {maaslar.length === 0 ? (
                <div className="empty-state">
                    Bu döneme ait maaş kaydı bulunmuyor.
                </div>
            ) : (
                maaslar.map((maas) => (
                    <div className="list-item" key={maas.maasId}>
                        <div className="maas-info">
                            <div className="maas-personel">
                                {maas.personel?.ad} {maas.personel?.soyad}
                            </div>

                            <div className="maas-detail">
                                Dönem: {maas.donem}
                            </div>

                            <div className="maas-meta">
                                <span className="badge badge-green">
                                    Net: {maas.netMaas} ₺
                                </span>

                                <span className="badge badge-blue">
                                    Brüt: {maas.brutMaas} ₺
                                </span>

                                <span className="badge badge-red">
                                    Ceza: {maas.ceza} ₺
                                </span>

                                <span className="maas-detail">
                                    Geçersiz Gün: {maas.gecersizGun}
                                </span>

                                <span className="maas-detail">
                                    ID: {maas.maasId}
                                </span>
                            </div>
                        </div>

                        <div className="list-actions">
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(maas.maasId)}
                            >
                                <FaTrash />
                                Sil
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MaasPage;