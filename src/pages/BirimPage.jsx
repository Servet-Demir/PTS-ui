import { useEffect, useState } from "react";
import ConfirmPopup from "../components/ConfirmPopup";
import InfoPopup from "../components/InfoPopup";
import SuccessToast from "../components/SuccessToast";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaCheck,
    FaTimes,
    FaBuilding,
    FaList,
} from "react-icons/fa";
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
    const [basariMesaji, setBasariMesaji] = useState(null);

    const [duzenlenenBirimId, setDuzenlenenBirimId] = useState(null);
    const [duzenlenenAd, setDuzenlenenAd] = useState("");

    const showSuccess = (mesaj) => {
        setBasariMesaji({
            id: Date.now() + Math.random(),
            mesaj: mesaj,
        });
    };

    const fetchBirimler = async () => {
        const response = await getAllBirimler();

        const siraliBirimler = [...response.data].sort(
            (a, b) => a.birimId - b.birimId
        );

        setBirimler(siraliBirimler);
    };

    const handleSave = async () => {
        if (!ad.trim()) {
            setUyariMesaji("Lütfen birim adı giriniz.");
            return;
        }

        try {
            const yeniBirim = {
                ad: ad,
            };

            await saveBirim(yeniBirim);

            setAd("");
            await fetchBirimler();

            showSuccess("Birim başarıyla eklendi.");
        } catch (error) {
            console.log(error);
            setUyariMesaji("Birim eklenirken bir hata oluştu.");
        }
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
        if (!duzenlenenAd.trim()) {
            setUyariMesaji("Lütfen güncellenecek birim adını giriniz.");
            return;
        }

        try {
            const guncelBirim = {
                ad: duzenlenenAd,
            };

            await updateBirim(id, guncelBirim);

            setDuzenlenenBirimId(null);
            setDuzenlenenAd("");

            await fetchBirimler();

            showSuccess("Birim başarıyla güncellendi.");
        } catch (error) {
            console.log(error);
            setUyariMesaji("Birim güncellenirken bir hata oluştu.");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBirim(silinecekBirimId);

            setSilinecekBirimId(null);
            await fetchBirimler();

            showSuccess("Birim başarıyla silindi.");
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
        <div className="premium-page">
            <div className="premium-hero">
                <div className="premium-hero-content">
                    <h2>Birim Yönetimi</h2>
                </div>

                <div className="premium-hero-icon">
                    <FaBuilding />
                </div>
            </div>

            <div className="premium-stat-grid">
                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaBuilding />
                    </div>

                    <div>
                        <span>Toplam Birim</span>
                        <strong>{birimler.length}</strong>
                    </div>
                </div>

                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaEdit />
                    </div>

                    <div>
                        <span>Düzenleme Durumu</span>
                        <strong>{duzenlenenBirimId ? "Açık" : "Kapalı"}</strong>
                    </div>
                </div>

                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaList />
                    </div>

                    <div>
                        <span>Son Eklenen Birim</span>
                        <strong>
                            {birimler.length > 0
                                ? birimler[birimler.length - 1].ad
                                : "-"}
                        </strong>
                    </div>
                </div>
            </div>

            <div className="premium-panel">
                <div className="premium-panel-header">
                    <h3>Birim Ekle</h3>

                    <div className="premium-panel-icon">
                        <FaPlus />
                    </div>
                </div>

                <div className="form-row premium-form-row">
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

            <div className="premium-panel">
                <div className="premium-section-header">
                    <div className="premium-title-row">
                        <div className="premium-title-icon">
                            <FaBuilding />
                        </div>

                        <h3>Birim Listesi</h3>
                    </div>

                    <div className="premium-count">
                        {birimler.length} kayıt
                    </div>
                </div>

                {birimler.length === 0 ? (
                    <div className="empty-state premium-empty-state">
                        Henüz birim kaydı bulunmuyor.
                    </div>
                ) : (
                    <div className="premium-list">
                        {birimler.map((birim) => (
                            <div
                                className={`list-card premium-list-card ${duzenlenenBirimId === birim.birimId
                                    ? "list-card-open"
                                    : ""
                                    }`}
                                key={birim.birimId}
                            >
                                <div className="list-item premium-list-item">
                                    <div className="premium-list-left">
                                        <div className="premium-mini-icon">
                                            <FaBuilding />
                                        </div>

                                        <div className="list-content">
                                            <strong>{birim.ad}</strong>
                                        </div>
                                    </div>

                                    <div className="list-actions">
                                        <button onClick={() => handleEditClick(birim)}>
                                            <FaEdit />
                                            Düzenle
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                setSilinecekBirimId(birim.birimId)
                                            }
                                        >
                                            <FaTrash />
                                            Sil
                                        </button>
                                    </div>
                                </div>

                                {duzenlenenBirimId === birim.birimId && (
                                    <div className="edit-panel premium-edit-panel">
                                        <input
                                            type="text"
                                            value={duzenlenenAd}
                                            onChange={(e) =>
                                                setDuzenlenenAd(e.target.value)
                                            }
                                        />

                                        <button
                                            onClick={() =>
                                                handleUpdate(birim.birimId)
                                            }
                                        >
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
                        ))}
                    </div>
                )}
            </div>

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

            {basariMesaji && (
                <SuccessToast
                    key={basariMesaji.id}
                    mesaj={basariMesaji.mesaj}
                    onClose={() => setBasariMesaji(null)}
                />
            )}
        </div>
    );
}

export default BirimPage;