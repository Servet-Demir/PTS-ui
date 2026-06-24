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

    const [guncellenecekMesaiId, setGuncellenecekMesaiId] = useState(null);

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
        setGuncellenecekMesaiId(mesai.mesaiId);
        setTarih(mesai.tarih);
        setGirisSaati(mesai.girisSaati);
        setCikisSaati(mesai.cikisSaati);
    };

    const handleUpdate = async () => {
        if (guncellenecekMesaiId === null) {
            alert("Lütfen güncellenecek mesai kaydını seçiniz.");
            return;
        }

        if (!girisSaati || !cikisSaati) {
            alert("Lütfen giriş ve çıkış saatini giriniz.");
            return;
        }

        const guncelMesai = {
            tarih: tarih,
            girisSaati: girisSaati,
            cikisSaati: cikisSaati,
        };

        await updateMesai(guncellenecekMesaiId, guncelMesai);

        setGuncellenecekMesaiId(null);
        setTarih("");
        setGirisSaati("");
        setCikisSaati("");

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
                    <button onClick={handleUpdate}>Mesai Güncelle</button>
                </div>
            </div>

            <hr />

            <h3>Mesai Listesi</h3>

            {mesailer.length === 0 ? (
                <p>Mesai kaydı bulunamadı.</p>
            ) : (
                mesailer.map((mesai) => (
                    <div className="list-item" key={mesai.mesaiId}>
                        <p>
                            ID: {mesai.mesaiId} - Tarih: {mesai.tarih} - Giriş:{" "}
                            {mesai.girisSaati} - Çıkış: {mesai.cikisSaati} - Durum:{" "}
                            {mesai.mesaiGecerli ? "Geçerli" : "Geçersiz"}
                        </p>

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
                ))
            )}
        </div>
    );
}
export default MesaiPage;