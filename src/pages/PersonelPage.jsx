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
    const [guncellenecekPersonelId, setGuncellenecekPersonelId] = useState(null);

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

    const handleUpdate = async () => {
        if (guncellenecekPersonelId === null) {
            alert("Lütfen güncellenecek personeli seçiniz.");
            return;
        }

        if (!birimId) {
            alert("Lütfen birim seçiniz.");
            return;
        }

        const guncelPersonel = {
            ad: ad,
            soyad: soyad,
            email: email,
            yonetici: yonetici,
            birim: {
                birimId: Number(birimId),
            },
        };

        await updatePersonel(guncellenecekPersonelId, guncelPersonel);

        setAd("");
        setSoyad("");
        setEmail("");
        setYonetici(false);
        setBirimId("");
        setGuncellenecekPersonelId(null);

        fetchPersoneller();
    };

    const handleEditClick = (personel) => {
        setGuncellenecekPersonelId(personel.personelId);
        setAd(personel.ad);
        setSoyad(personel.soyad);
        setEmail(personel.email);
        setYonetici(personel.yonetici);
        setBirimId(personel.birim.birimId);
    };

    useEffect(() => {
        fetchPersoneller();
        fetchBirimler();
    }, []);

    return (
        <div>
            <h2>Personel Sayfası</h2>

            <div className="form-section">
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
                    <button onClick={handleUpdate}>Personel Güncelle</button>
                </div>
            </div>

            <hr />

            <h3>Personel Listesi</h3>

            {personeller.map((personel) => (
                <div className="list-item" key={personel.personelId}>
                    <p>
                        {personel.personelId} - {personel.ad} {personel.soyad} - {personel.email} -{" "}
                        {personel.birim?.ad} - {personel.yonetici ? "Yönetici" : "Personel"}
                    </p>

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
            ))}
        </div>
    );
}

export default PersonelPage;