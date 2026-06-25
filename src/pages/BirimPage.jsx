import { useEffect, useState } from "react";
import ConfirmPopup from "../components/ConfirmPopup";
import InfoPopup from "../components/InfoPopup";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import {
    getAllBirimler,
    saveBirim,
    updateBirim,
    deleteBirim,
} from "../api/birimApi";

function BirimPage() {
    const [birimler, setBirimler] = useState([]);
    const [ad, setAd] = useState("");
    const [silinecekBirimId, setSilinecekBirimId] = useState(null);
    const [uyariMesaji, setUyariMesaji] = useState("");
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

    const handleDelete = async () => {
        try {
            await deleteBirim(silinecekBirimId);

            setSilinecekBirimId(null);
            fetchBirimler();
        } catch (error) {
            console.log(error);

            setSilinecekBirimId(null);
            setUyariMesaji(
                "Bu birim içerisinde personel bulunduğu için silinemez. Önce bu birime bağlı personelleri silmeniz veya başka bir birime taşımanız gerekir."
            );
        }
    };

    useEffect(() => {
        fetchBirimler();
    }, []);

    return (
        <div>
            <div className="page-header">
                <h2>Birim Yönetimi</h2>
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
                        <FaPlus />
                        Ekle
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
                                    <FaEdit />
                                    Düzenle
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => setSilinecekBirimId(birim.birimId)}
                                >
                                    <FaTrash />
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
                                    <FaCheck />
                                    Güncelle
                                </button>

                                <button
                                    className="secondary-button"
                                    onClick={handleCancelEdit}
                                >
                                    <FaTimes />
                                    Vazgeç
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
            {silinecekBirimId !== null && (
                <ConfirmPopup
                    mesaj="Bu birimi silmek istediğinize emin misiniz?"
                    onConfirm={handleDelete}
                    onCancel={() => setSilinecekBirimId(null)}
                />
            )}
            {uyariMesaji && (
                <InfoPopup
                    mesaj={uyariMesaji}
                    onClose={() => setUyariMesaji("")}
                />
            )}
        </div>
    );
}

export default BirimPage;