import { useEffect, useState } from "react";
import { getAllBirimler } from "../api/birimApi";
import { getAllPersoneller, savePersonel, deletePersonel, updatePersonel } from "../api/personelApi";

function PersonelPage() {
    const [personeller, setPersoneller] = useState([]);
    const [birimler, setBirimler] = useState([]);
    const [ad, setAd] = useState("");
    const [soyad, setSoyad] = useState("");
    const [email, setEmail] = useState("");
    const [yonetici, setYonetici] = useState(false);
    const [birimId, setBirimId] = useState("");

    const [duzenlenenPersonelId, setDuzenlenenPersonelId] = useState(null);
    const [duzenlenenAd, setDuzenlenenAd] = useState("");
    const [duzenlenenSoyad, setDuzenlenenSoyad] = useState("");
    const [duzenlenenEmail, setDuzenlenenEmail] = useState("");
    const [duzenlenenBirimId, setDuzenlenenBirimId] = useState("");
    const [duzenlenenYonetici, setDuzenlenenYonetici] = useState(false);

    const fetchPersoneller = async () => {
        const response = await getAllPersoneller();

        const siraliPersoneller = [...response.data].sort(
            (a, b) => a.personelId - b.personelId
        );

        setPersoneller(siraliPersoneller);
    };

    const fetchBirimler = async () => {
        const response = await getAllBirimler();
        setBirimler(response.data);
    };

    const handleSave = async () => {
        const yeniPersonel = {
            ad: ad,
            soyad: soyad,
            email: email,
            yonetici: yonetici,
            birim: {
                birimId: Number(birimId), // API'ye uygun şekilde birimId'yi sayıya çeviriyoruz
            },
        };
        await savePersonel(yeniPersonel);
        setAd("");
        setSoyad("");
        setEmail("");
        setYonetici(false);
        setBirimId("");
        fetchPersoneller();
    };

    const handleDelete = async (id) => {
        await deletePersonel(id);
        fetchPersoneller();
    };

    const handleUpdate = async (id) => {
        if (!duzenlenenAd || !duzenlenenSoyad || !duzenlenenEmail || !duzenlenenBirimId) {
            alert("Lütfen tüm alanları doldurunuz.");
            return;
        }

        const guncelPersonel = {
            ad: duzenlenenAd,
            soyad: duzenlenenSoyad,
            email: duzenlenenEmail,
            yonetici: duzenlenenYonetici,
            birim: {
                birimId: Number(duzenlenenBirimId),
            },
        };

        await updatePersonel(id, guncelPersonel);

        handleCancelEdit();
        fetchPersoneller();
    };

    const handleEditClick = (personel) => {
        setDuzenlenenPersonelId(personel.personelId);
        setDuzenlenenAd(personel.ad);
        setDuzenlenenSoyad(personel.soyad);
        setDuzenlenenEmail(personel.email);
        setDuzenlenenBirimId(personel.birim?.birimId || "");
        setDuzenlenenYonetici(personel.yonetici);
    };

    const handleCancelEdit = () => {
        setDuzenlenenPersonelId(null);
        setDuzenlenenAd("");
        setDuzenlenenSoyad("");
        setDuzenlenenEmail("");
        setDuzenlenenBirimId("");
        setDuzenlenenYonetici(false);
    };

    useEffect(() => {
        fetchPersoneller();
        fetchBirimler();
    }, []);

    return (
        <div>
            <div className="page-header">
                <h2>Personel Yönetimi</h2>
                <p className="page-subtitle">
                    Personelleri ekleyebilir, birim bilgilerini düzenleyebilir ve görev durumlarını yönetebilirsin.
                </p>
            </div>

            <div className="form-section">
                <h3 className="section-title">Yeni Personel Ekle</h3>

                <div className="form-row">
                    <input
                        type="text"
                        placeholder="Ad"
                        value={ad}
                        onChange={(e) => setAd(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Soyad"
                        value={soyad}
                        onChange={(e) => setSoyad(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <select value={birimId} onChange={(e) => setBirimId(e.target.value)}>
                        <option value="">Birim seçiniz</option>

                        {birimler.map((birim) => (
                            <option key={birim.birimId} value={birim.birimId}>
                                {birim.ad}
                            </option>
                        ))}
                    </select>

                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={yonetici}
                            onChange={(e) => setYonetici(e.target.checked)}
                        />
                        Yönetici mi?
                    </label>

                    <button onClick={handleSave}>Personel Ekle</button>
                </div>
            </div>

            <hr />

            <h3>Personel Listesi</h3>

            {personeller.length === 0 ? (
                <div className="empty-state">
                    Henüz personel kaydı bulunmuyor.
                </div>
            ) : (
                personeller.map((personel) => (
                    <div
                        className={`list-card ${duzenlenenPersonelId === personel.personelId ? "list-card-open" : ""}`}
                        key={personel.personelId}
                    >
                        <div className="list-item">
                            <div className="personel-info">
                                <div className="personel-name">
                                    {personel.ad} {personel.soyad}
                                </div>

                                <div className="personel-detail">
                                    {personel.email}
                                </div>

                                <div className="personel-meta">
                                    <span className="badge badge-green">
                                        {personel.birim?.ad}
                                    </span>

                                    <span
                                        className={
                                            personel.yonetici
                                                ? "badge badge-blue"
                                                : "badge badge-gray"
                                        }
                                    >
                                        {personel.yonetici ? "Yönetici" : "Personel"}
                                    </span>

                                    <span className="personel-detail">
                                        ID: {personel.personelId}
                                    </span>
                                </div>
                            </div>

                            <div className="list-actions">
                                <button onClick={() => handleEditClick(personel)}>
                                    Düzenle
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(personel.personelId)}
                                >
                                    Sil
                                </button>
                            </div>
                        </div>

                        {duzenlenenPersonelId === personel.personelId && (
                            <div className="edit-panel personel-edit-panel">
                                <input
                                    type="text"
                                    placeholder="Ad"
                                    value={duzenlenenAd}
                                    onChange={(e) => setDuzenlenenAd(e.target.value)}
                                />

                                <input
                                    type="text"
                                    placeholder="Soyad"
                                    value={duzenlenenSoyad}
                                    onChange={(e) => setDuzenlenenSoyad(e.target.value)}
                                />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={duzenlenenEmail}
                                    onChange={(e) => setDuzenlenenEmail(e.target.value)}
                                />

                                <select
                                    value={duzenlenenBirimId}
                                    onChange={(e) => setDuzenlenenBirimId(e.target.value)}
                                >
                                    <option value="">Birim seçiniz</option>

                                    {birimler.map((birim) => (
                                        <option key={birim.birimId} value={birim.birimId}>
                                            {birim.ad}
                                        </option>
                                    ))}
                                </select>

                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={duzenlenenYonetici}
                                        onChange={(e) => setDuzenlenenYonetici(e.target.checked)}
                                    />
                                    Yönetici mi?
                                </label>

                                <button onClick={() => handleUpdate(personel.personelId)}>
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

export default PersonelPage;