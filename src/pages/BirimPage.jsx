import { useEffect, useState } from "react";
import {
    getAllBirimler,
    saveBirim,
    updateBirim,
    deleteBirim,
} from "../api/birimApi";

function BirimPage() {
    const [birimler, setBirimler] = useState([]);
    const [ad, setAd] = useState("");

    const [duzenlenenBirimId, setDuzenlenenBirimId] = useState(null);
    const [duzenlenenAd, setDuzenlenenAd] = useState("");

    const fetchBirimler = async () => {
        const response = await getAllBirimler();

        const siraliBirimler = [...response.data].sort(
            (a, b) => a.birimId - b.birimId
        );

        setBirimler(siraliBirimler);
    };

    const handleSave = async () => {
        const yeniBirim = {
            ad: ad,
        };

        await saveBirim(yeniBirim);

        setAd("");
        fetchBirimler();
    };

    const handleEditClick = (birim) => {
        setDuzenlenenBirimId(birim.birimId);
        setDuzenlenenAd(birim.ad);
    };

    const handleCancelEdit = () => {
        setDuzenlenenBirimId(null);
        setDuzenlenenAd("");
    };

    const handleUpdate = async (id) => {
        const guncelBirim = {
            ad: duzenlenenAd,
        };

        await updateBirim(id, guncelBirim);

        setDuzenlenenBirimId(null);
        setDuzenlenenAd("");
        fetchBirimler();
    };

    const handleDelete = async (id) => {
        await deleteBirim(id);
        fetchBirimler();
    };

    useEffect(() => {
        fetchBirimler();
    }, []);

    return (
        <div>
            <div className="page-header">
                <h2>Birim Yönetimi</h2>
                <p className="page-subtitle">
                    Şirket içerisindeki birimleri buradan ekleyebilir, düzenleyebilir ve silebilirsin.
                </p>
            </div>

            <div className="form-section">
                <h3 className="section-title">Yeni Birim Ekle</h3>

                <div className="form-row">
                    <input
                        type="text"
                        placeholder="Birim adı"
                        value={ad}
                        onChange={(e) => setAd(e.target.value)}
                    />

                    <button onClick={handleSave}>
                        Birim Ekle
                    </button>
                </div>
            </div>

            <h3>Birim Listesi</h3>

            {birimler.length === 0 ? (
                <div className="empty-state">
                    Henüz birim kaydı bulunmuyor.
                </div>
            ) : (
                birimler.map((birim) => (
                    <div
                        className={`list-card ${duzenlenenBirimId === birim.birimId ? "list-card-open" : ""}`}
                        key={birim.birimId}
                    >
                        <div className="list-item">
                            <div className="list-content">
                                <strong>{birim.ad}</strong>
                                <br />
                                <span>Birim ID: {birim.birimId}</span>
                            </div>

                            <div className="list-actions">
                                <button onClick={() => handleEditClick(birim)}>
                                    Düzenle
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(birim.birimId)}
                                >
                                    Sil
                                </button>
                            </div>
                        </div>

                        {duzenlenenBirimId === birim.birimId && (
                            <div className="edit-panel">
                                <input
                                    type="text"
                                    value={duzenlenenAd}
                                    onChange={(e) => setDuzenlenenAd(e.target.value)}
                                />

                                <button onClick={() => handleUpdate(birim.birimId)}>
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

export default BirimPage;