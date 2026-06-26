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
    FaList,
} from "react-icons/fa";
import { getAllPersoneller, getPersonelDonemOzeti } from "../api/personelApi";
import { saveMesai, updateMesai, deleteMesai } from "../api/mesaiApi";

function MesaiPage() {
    const [personeller, setPersoneller] = useState([]);
    const [mesailer, setMesailer] = useState([]);

    const [personelId, setPersonelId] = useState("");
    const [donem, setDonem] = useState("2026-06-01");

    const [personelDonemOzeti, setPersonelDonemOzeti] = useState(null);

    const [tarih, setTarih] = useState("");
    const [girisSaati, setGirisSaati] = useState("");
    const [cikisSaati, setCikisSaati] = useState("");

    const [uyariMesaji, setUyariMesaji] = useState("");
    const [basariMesaji, setBasariMesaji] = useState(null);

    const [duzenlenenMesaiId, setDuzenlenenMesaiId] = useState(null);
    const [duzenlenenTarih, setDuzenlenenTarih] = useState("");
    const [duzenlenenGirisSaati, setDuzenlenenGirisSaati] = useState("");
    const [duzenlenenCikisSaati, setDuzenlenenCikisSaati] = useState("");

    const [silinecekMesaiId, setSilinecekMesaiId] = useState(null);

    const showSuccess = (mesaj) => {
        setBasariMesaji({
            id: Date.now() + Math.random(),
            mesaj: mesaj,
        });
    };

    const fetchPersoneller = async () => {
        const response = await getAllPersoneller();
        setPersoneller(response.data);
    };

    const fetchMesailer = async () => {
        if (!personelId || !donem) {
            setUyariMesaji("Lütfen personel ve dönem seçiniz.");
            return;
        }

        try {
            const response = await getPersonelDonemOzeti(personelId, donem);

            setPersonelDonemOzeti(response.data);

            const siraliMesailer = [...response.data.mesaiKayitlari].sort(
                (a, b) => a.mesaiId - b.mesaiId
            );

            setMesailer(siraliMesailer);
        } catch (error) {
            console.log(error);
            console.log(error.response);

            setUyariMesaji("Personel dönem özeti getirilirken hata oluştu.");
        }
    };

    const handleSave = async () => {
        if (!personelId || !tarih || !girisSaati || !cikisSaati) {
            setUyariMesaji("Lütfen mesai eklemek için tüm alanları doldurunuz.");
            return;
        }

        try {
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

            await fetchMesailer();

            showSuccess("Mesai kaydı başarıyla eklendi.");
        } catch (error) {
            console.log(error);
            setUyariMesaji("Mesai kaydı eklenirken bir hata oluştu.");
        }
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
            setUyariMesaji("Lütfen güncelleme için tüm alanları doldurunuz.");
            return;
        }

        try {
            const guncelMesai = {
                tarih: duzenlenenTarih,
                girisSaati: duzenlenenGirisSaati,
                cikisSaati: duzenlenenCikisSaati,
            };

            await updateMesai(id, guncelMesai);

            handleCancelEdit();
            await fetchMesailer();

            showSuccess("Mesai kaydı başarıyla güncellendi.");
        } catch (error) {
            console.log(error);
            setUyariMesaji("Mesai kaydı güncellenirken bir hata oluştu.");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMesai(silinecekMesaiId);

            setSilinecekMesaiId(null);
            await fetchMesailer();

            showSuccess("Mesai kaydı başarıyla silindi.");
        } catch (error) {
            console.log(error);

            setSilinecekMesaiId(null);
            setUyariMesaji("Mesai kaydı silinirken bir hata oluştu.");
        }
    };

    useEffect(() => {
        fetchPersoneller();
    }, []);

    const maasHesabi = personelDonemOzeti?.maasHesabi;

    return (
        <div>
            <div className="page-header">
                <h2>Mesai Yönetimi</h2>
            </div>

            <div className="form-section">
                <h3 className="section-title">Personel ve Dönem Seç</h3>

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

                    <button onClick={fetchMesailer}>
                        <FaList />
                        Mesaileri Listele
                    </button>
                </div>
            </div>

            {personelDonemOzeti && (
                <div className="period-summary">
                    <div className="period-summary-header">
                        <div>
                            <h3>Dönem Özeti</h3>
                            <p>
                                {personelDonemOzeti.personel?.ad}{" "}
                                {personelDonemOzeti.personel?.soyad}
                            </p>
                        </div>

                        <span className="badge badge-blue">{donem}</span>
                    </div>

                    <div className="period-summary-grid">
                        <div className="period-summary-card">
                            <span>Personel</span>
                            <strong>
                                {personelDonemOzeti.personel?.ad}{" "}
                                {personelDonemOzeti.personel?.soyad}
                            </strong>
                        </div>

                        <div className="period-summary-card">
                            <span>Mesai Kaydı</span>
                            <strong>{mesailer.length}</strong>
                        </div>

                        <div className="period-summary-card">
                            <span>Maaş Durumu</span>
                            <strong>
                                {maasHesabi && maasHesabi.netMaas !== undefined
                                    ? "Hesaplandı"
                                    : "Bulunamadı"}
                            </strong>
                        </div>

                        <div className="period-summary-card">
                            <span>Net Maaş</span>
                            <strong>
                                {maasHesabi && maasHesabi.netMaas !== undefined
                                    ? `${maasHesabi.netMaas} ₺`
                                    : "-"}
                            </strong>
                        </div>
                    </div>
                </div>
            )}

            <div className="form-section">
                <h3 className="section-title">Yeni Mesai Kaydı Ekle</h3>

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

                    <button onClick={handleSave}>
                        <FaPlus />
                        Mesai Ekle
                    </button>
                </div>
            </div>

            <h3>Mesai Listesi</h3>

            {mesailer.length === 0 ? (
                <div className="empty-state">
                    Mesai kaydı bulunamadı.
                </div>
            ) : (
                mesailer.map((mesai) => (
                    <div
                        className={`list-card ${duzenlenenMesaiId === mesai.mesaiId
                                ? "list-card-open"
                                : ""
                            }`}
                        key={mesai.mesaiId}
                    >
                        <div className="list-item">
                            <div className="mesai-info">
                                <div className="mesai-date">{mesai.tarih}</div>

                                <div className="mesai-detail">
                                    Giriş: {mesai.girisSaati} - Çıkış:{" "}
                                    {mesai.cikisSaati}
                                </div>

                                <div className="mesai-meta">
                                    <span
                                        className={
                                            mesai.mesaiGecerli
                                                ? "badge badge-green"
                                                : "badge badge-red"
                                        }
                                    >
                                        {mesai.mesaiGecerli
                                            ? "Geçerli"
                                            : "Geçersiz"}
                                    </span>

                                    <span className="mesai-detail">
                                        ID: {mesai.mesaiId}
                                    </span>
                                </div>
                            </div>

                            <div className="list-actions">
                                <button onClick={() => handleEditClick(mesai)}>
                                    <FaEdit />
                                    Düzenle
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => setSilinecekMesaiId(mesai.mesaiId)}
                                >
                                    <FaTrash />
                                    Sil
                                </button>
                            </div>
                        </div>

                        {duzenlenenMesaiId === mesai.mesaiId && (
                            <div className="edit-panel mesai-edit-panel">
                                <input
                                    type="date"
                                    value={duzenlenenTarih}
                                    onChange={(e) =>
                                        setDuzenlenenTarih(e.target.value)
                                    }
                                />

                                <input
                                    type="time"
                                    value={duzenlenenGirisSaati}
                                    onChange={(e) =>
                                        setDuzenlenenGirisSaati(e.target.value)
                                    }
                                />

                                <input
                                    type="time"
                                    value={duzenlenenCikisSaati}
                                    onChange={(e) =>
                                        setDuzenlenenCikisSaati(e.target.value)
                                    }
                                />

                                <button onClick={() => handleUpdate(mesai.mesaiId)}>
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

            {silinecekMesaiId !== null && (
                <ConfirmPopup
                    mesaj="Bu mesai kaydını silmek istediğinize emin misiniz?"
                    onConfirm={handleDelete}
                    onCancel={() => setSilinecekMesaiId(null)}
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

export default MesaiPage;