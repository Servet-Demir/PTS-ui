import { useEffect, useState } from "react";
import ConfirmPopup from "../components/ConfirmPopup";
import InfoPopup from "../components/InfoPopup";
import SuccessToast from "../components/SuccessToast";
import { getAllBirimler } from "../api/birimApi";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaCheck,
    FaTimes,
    FaUsers,
    FaUserTie,
    FaBuilding,
} from "react-icons/fa";
import {
    getAllPersoneller,
    savePersonel,
    deletePersonel,
    updatePersonel,
} from "../api/personelApi";

function PersonelPage() {
    const [personeller, setPersoneller] = useState([]);
    const [birimler, setBirimler] = useState([]);

    const [ad, setAd] = useState("");
    const [soyad, setSoyad] = useState("");
    const [email, setEmail] = useState("");
    const [yonetici, setYonetici] = useState(false);
    const [birimId, setBirimId] = useState("");

    const [uyariMesaji, setUyariMesaji] = useState("");
    const [basariMesaji, setBasariMesaji] = useState(null);
    const [silinecekPersonelId, setSilinecekPersonelId] = useState(null);

    const [duzenlenenPersonelId, setDuzenlenenPersonelId] = useState(null);
    const [duzenlenenAd, setDuzenlenenAd] = useState("");
    const [duzenlenenSoyad, setDuzenlenenSoyad] = useState("");
    const [duzenlenenEmail, setDuzenlenenEmail] = useState("");
    const [duzenlenenBirimId, setDuzenlenenBirimId] = useState("");
    const [duzenlenenYonetici, setDuzenlenenYonetici] = useState(false);

    const yoneticiSayisi = personeller.filter((personel) => personel.yonetici).length;

    const showSuccess = (mesaj) => {
        setBasariMesaji({
            id: Date.now() + Math.random(),
            mesaj: mesaj,
        });
    };

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
        if (!ad || !soyad || !email || !birimId) {
            setUyariMesaji("Lütfen personel eklemek için tüm alanları doldurunuz.");
            return;
        }

        try {
            const yeniPersonel = {
                ad: ad,
                soyad: soyad,
                email: email,
                yonetici: yonetici,
                birim: {
                    birimId: Number(birimId),
                },
            };

            await savePersonel(yeniPersonel);

            setAd("");
            setSoyad("");
            setEmail("");
            setYonetici(false);
            setBirimId("");

            await fetchPersoneller();

            showSuccess("Personel başarıyla eklendi.");
        } catch (error) {
            console.log(error);
            setUyariMesaji("Personel eklenirken bir hata oluştu.");
        }
    };

    const handleDelete = async () => {
        try {
            await deletePersonel(silinecekPersonelId);

            setSilinecekPersonelId(null);
            await fetchPersoneller();

            showSuccess("Personel başarıyla silindi.");
        } catch (error) {
            console.log(error);

            setSilinecekPersonelId(null);
            setUyariMesaji(
                "Bu personel başka kayıtlarla ilişkili olduğu için silinemeyebilir. Önce bu personele ait mesai veya maaş kayıtlarını kontrol ediniz."
            );
        }
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

    const handleUpdate = async (id) => {
        if (!duzenlenenAd || !duzenlenenSoyad || !duzenlenenEmail || !duzenlenenBirimId) {
            setUyariMesaji("Lütfen güncelleme için tüm alanları doldurunuz.");
            return;
        }

        try {
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
            await fetchPersoneller();

            showSuccess("Personel başarıyla güncellendi.");
        } catch (error) {
            console.log(error);
            setUyariMesaji("Personel güncellenirken bir hata oluştu.");
        }
    };

    useEffect(() => {
        fetchPersoneller();
        fetchBirimler();
    }, []);

    return (
        <div className="premium-page">
            <div className="premium-hero">
                <div className="premium-hero-content">
                    <h2>Personel Yönetimi</h2>
                </div>

                <div className="premium-hero-icon">
                    <FaUsers />
                </div>
            </div>

            <div className="premium-stat-grid">
                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaUsers />
                    </div>

                    <div>
                        <span>Toplam Personel</span>
                        <strong>{personeller.length}</strong>
                    </div>
                </div>

                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaUserTie />
                    </div>

                    <div>
                        <span>Yönetici</span>
                        <strong>{yoneticiSayisi}</strong>
                    </div>
                </div>

                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaBuilding />
                    </div>

                    <div>
                        <span>Birim Sayısı</span>
                        <strong>{birimler.length}</strong>
                    </div>
                </div>
            </div>

            <div className="premium-panel">
                <div className="premium-panel-header">
                    <h3>Personel Ekle</h3>
                </div>

                <div className="personel-add-form">
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

                    <select
                        value={birimId}
                        onChange={(e) => setBirimId(e.target.value)}
                    >
                        <option value="">Birim seçiniz</option>

                        {birimler.map((birim) => (
                            <option key={birim.birimId} value={birim.birimId}>
                                {birim.ad}
                            </option>
                        ))}
                    </select>

                    <label className="personel-checkbox">
                        <input
                            type="checkbox"
                            checked={yonetici}
                            onChange={(e) => setYonetici(e.target.checked)}
                        />
                        <span>Yönetici mi?</span>
                    </label>

                    <button className="personel-add-button" onClick={handleSave}>
                        <FaPlus />
                        Personel Ekle
                    </button>
                </div>
            </div>

            <div className="premium-panel">
                <div className="premium-section-header">
                    <div className="premium-title-row">
                        <div className="premium-title-icon">
                            <FaUsers />
                        </div>

                        <h3>Personel Listesi</h3>
                    </div>

                    <div className="premium-count">
                        {personeller.length} kayıt
                    </div>
                </div>

                {personeller.length === 0 ? (
                    <div className="empty-state premium-empty-state">
                        Henüz personel kaydı bulunmuyor.
                    </div>
                ) : (
                    <div className="premium-list">
                        {personeller.map((personel) => (
                            <div
                                className={`list-card premium-list-card ${duzenlenenPersonelId === personel.personelId
                                        ? "list-card-open"
                                        : ""
                                    }`}
                                key={personel.personelId}
                            >
                                <div className="list-item premium-list-item">
                                    <div className="premium-list-left">
                                        <div className="premium-mini-icon">
                                            <FaUsers />
                                        </div>

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
                                                    {personel.yonetici
                                                        ? "Yönetici"
                                                        : "Personel"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-actions">
                                        <button onClick={() => handleEditClick(personel)}>
                                            <FaEdit />
                                            Düzenle
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                setSilinecekPersonelId(
                                                    personel.personelId
                                                )
                                            }
                                        >
                                            <FaTrash />
                                            Sil
                                        </button>
                                    </div>
                                </div>

                                {duzenlenenPersonelId === personel.personelId && (
                                    <div className="edit-panel personel-edit-panel premium-edit-panel">
                                        <input
                                            type="text"
                                            placeholder="Ad"
                                            value={duzenlenenAd}
                                            onChange={(e) =>
                                                setDuzenlenenAd(e.target.value)
                                            }
                                        />

                                        <input
                                            type="text"
                                            placeholder="Soyad"
                                            value={duzenlenenSoyad}
                                            onChange={(e) =>
                                                setDuzenlenenSoyad(e.target.value)
                                            }
                                        />

                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={duzenlenenEmail}
                                            onChange={(e) =>
                                                setDuzenlenenEmail(e.target.value)
                                            }
                                        />

                                        <select
                                            value={duzenlenenBirimId}
                                            onChange={(e) =>
                                                setDuzenlenenBirimId(e.target.value)
                                            }
                                        >
                                            <option value="">Birim seçiniz</option>

                                            {birimler.map((birim) => (
                                                <option
                                                    key={birim.birimId}
                                                    value={birim.birimId}
                                                >
                                                    {birim.ad}
                                                </option>
                                            ))}
                                        </select>

                                        <label className="personel-checkbox edit-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={duzenlenenYonetici}
                                                onChange={(e) =>
                                                    setDuzenlenenYonetici(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span>Yönetici mi?</span>
                                        </label>

                                        <button
                                            onClick={() =>
                                                handleUpdate(personel.personelId)
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

            {silinecekPersonelId !== null && (
                <ConfirmPopup
                    mesaj="Bu personeli silmek istediğinize emin misiniz?"
                    onConfirm={handleDelete}
                    onCancel={() => setSilinecekPersonelId(null)}
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

export default PersonelPage;