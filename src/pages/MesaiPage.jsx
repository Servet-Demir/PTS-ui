import { useEffect, useState } from "react";
import { getAllPersoneller } from "../api/personelApi";
import {
    getMesaiByPersonelAndDonem,
    saveMesai,
    updateMesai,
    deleteMesai,
} from "../api/mesaiApi";

function MesaiPage() {
    const [personeller, setPersoneller] = useState([]);
    const [mesailer, setMesailer] = useState([]);

    const [personelId, setPersonelId] = useState("");
    const [donem, setDonem] = useState("2026-06-01");

    const [tarih, setTarih] = useState("");
    const [girisSaati, setGirisSaati] = useState("");
    const [cikisSaati, setCikisSaati] = useState("");
    const [duzenlenenMesaiId, setDuzenlenenMesaiId] = useState(null);
    const [duzenlenenTarih, setDuzenlenenTarih] = useState("");
    const [duzenlenenGirisSaati, setDuzenlenenGirisSaati] = useState("");
    const [duzenlenenCikisSaati, setDuzenlenenCikisSaati] = useState("");

    const fetchPersoneller = async () => {
        const response = await getAllPersoneller();
        setPersoneller(response.data);
    };

    const fetchMesailer = async () => {
        if (!personelId || !donem) {
            alert("Lütfen personel ve dönem seçiniz.");
            return;
        }

        const response = await getMesaiByPersonelAndDonem(personelId, donem);

        const siraliMesailer = [...response.data].sort(
            (a, b) => a.mesaiId - b.mesaiId
        );

        setMesailer(siraliMesailer);
    };

    const handleSave = async () => {
        if (!personelId || !tarih || !girisSaati || !cikisSaati) {
            alert("Lütfen tüm alanları doldurunuz.");
            return;
        }

        const yeniMesai = {
            personel: {
                personelId: Number(personelId),
            },
            tarih: tarih,
            girisSaati: girisSaati,
            cikisSaati: cikisSaati,
        };

        await saveMesai(yeniMesai);

        setTarih("");
        setGirisSaati("");
        setCikisSaati("");

        fetchMesailer();
    };

    const handleEditClick = (mesai) => {
        setDuzenlenenMesaiId(mesai.mesaiId);
        setDuzenlenenTarih(mesai.tarih);
        setDuzenlenenGirisSaati(mesai.girisSaati);
        setDuzenlenenCikisSaati(mesai.cikisSaati);
    };

    const handleCancelEdit = () => {
        setDuzenlenenMesaiId(null);
        setDuzenlenenTarih("");
        setDuzenlenenGirisSaati("");
        setDuzenlenenCikisSaati("");
    };

    const handleUpdate = async (id) => {
        if (!duzenlenenTarih || !duzenlenenGirisSaati || !duzenlenenCikisSaati) {
            alert("Lütfen tüm alanları doldurunuz.");
            return;
        }

        const guncelMesai = {
            tarih: duzenlenenTarih,
            girisSaati: duzenlenenGirisSaati,
            cikisSaati: duzenlenenCikisSaati,
        };

        await updateMesai(id, guncelMesai);

        handleCancelEdit();
        fetchMesailer();
    };

    const handleDelete = async (id) => {
        await deleteMesai(id);
        fetchMesailer();
    };

    useEffect(() => {
        fetchPersoneller();
    }, []);

    return (
        <div>
            <h2>Mesai Sayfası</h2>

            <div className="form-section">
                <h3>Personel ve Dönem Seç</h3>

                <div className="form-row">
                    <select value={personelId} onChange={(e) => setPersonelId(e.target.value)}>
                        <option value="">Personel seçiniz</option>

                        {personeller.map((personel) => (
                            <option key={personel.personelId} value={personel.personelId}>
                                {personel.ad} {personel.soyad}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={donem}
                        onChange={(e) => setDonem(e.target.value)}
                    />

                    <button onClick={fetchMesailer}>Mesaileri Listele</button>
                </div>
            </div>

            <hr />

            <div className="form-section">
                <h3>Mesai Kaydı Ekle / Güncelle</h3>

                <div className="form-row">
                    <input
                        type="date"
                        value={tarih}
                        onChange={(e) => setTarih(e.target.value)}
                    />

                    <input
                        type="time"
                        value={girisSaati}
                        onChange={(e) => setGirisSaati(e.target.value)}
                    />

                    <input
                        type="time"
                        value={cikisSaati}
                        onChange={(e) => setCikisSaati(e.target.value)}
                    />

                    <button onClick={handleSave}>Mesai Ekle</button>
                </div>
            </div>

            <hr />

            <h3>Mesai Listesi</h3>

            {mesailer.length === 0 ? (
                <div className="empty-state">
                    Mesai kaydı bulunamadı.
                </div>
            ) : (
                mesailer.map((mesai) => (
                    <div className="list-card" key={mesai.mesaiId}>
                        <div className="list-item">
                            <div className="mesai-info">
                                <div className="mesai-date">
                                    {mesai.tarih}
                                </div>

                                <div className="mesai-detail">
                                    Giriş: {mesai.girisSaati} - Çıkış: {mesai.cikisSaati}
                                </div>

                                <div className="mesai-meta">
                                    <span
                                        className={
                                            mesai.mesaiGecerli
                                                ? "badge badge-green"
                                                : "badge badge-red"
                                        }
                                    >
                                        {mesai.mesaiGecerli ? "Geçerli" : "Geçersiz"}
                                    </span>

                                    <span className="mesai-detail">
                                        ID: {mesai.mesaiId}
                                    </span>
                                </div>
                            </div>

                            <div className="list-actions">
                                <button onClick={() => handleEditClick(mesai)}>
                                    Düzenle
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(mesai.mesaiId)}
                                >
                                    Sil
                                </button>
                            </div>
                        </div>

                        {duzenlenenMesaiId === mesai.mesaiId && (
                            <div className="edit-panel mesai-edit-panel">
                                <input
                                    type="date"
                                    value={duzenlenenTarih}
                                    onChange={(e) => setDuzenlenenTarih(e.target.value)}
                                />

                                <input
                                    type="time"
                                    value={duzenlenenGirisSaati}
                                    onChange={(e) => setDuzenlenenGirisSaati(e.target.value)}
                                />

                                <input
                                    type="time"
                                    value={duzenlenenCikisSaati}
                                    onChange={(e) => setDuzenlenenCikisSaati(e.target.value)}
                                />

                                <button onClick={() => handleUpdate(mesai.mesaiId)}>
                                    Güncelle
                                </button>

                                <button
                                    className="secondary-button"
                                    onClick={handleCancelEdit}
                                >
                                    Vazgeç
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
export default MesaiPage;