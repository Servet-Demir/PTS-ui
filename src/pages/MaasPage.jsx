import { useEffect, useState } from "react";
import ConfirmPopup from "../components/ConfirmPopup";
import InfoPopup from "../components/InfoPopup";
import SuccessToast from "../components/SuccessToast";
import { getAllPersoneller } from "../api/personelApi";
import {
    FaPlus,
    FaTrash,
    FaList,
    FaMoneyBillWave,
    FaCalculator,
    FaCoins,
} from "react-icons/fa";
import { hesaplaMaas, getMaasByDonem, deleteMaas } from "../api/maasApi";

function MaasPage() {
    const [personeller, setPersoneller] = useState([]);
    const [maaslar, setMaaslar] = useState([]);

    const [uyariMesaji, setUyariMesaji] = useState("");
    const [basariMesaji, setBasariMesaji] = useState(null);

    const [personelId, setPersonelId] = useState("");
    const [donem, setDonem] = useState("2026-06-01");

    const [hesaplananMaas, setHesaplananMaas] = useState(null);
    const [silinecekMaasId, setSilinecekMaasId] = useState(null);

    const toplamNetMaas = maaslar.reduce(
        (toplam, maas) => toplam + Number(maas.netMaas || 0),
        0
    );

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

    const fetchMaaslar = async () => {
        if (!donem) {
            setUyariMesaji("Lütfen dönem seçiniz.");
            return;
        }

        try {
            const response = await getMaasByDonem(donem);

            const siraliMaaslar = [...response.data].sort(
                (a, b) => a.maasId - b.maasId
            );

            setMaaslar(siraliMaaslar);
        } catch (error) {
            console.log(error);

            setUyariMesaji("Maaş listesi getirilirken hata oluştu.");
        }
    };

    const handleMaasHesapla = async () => {
        if (!personelId || !donem) {
            setUyariMesaji("Lütfen personel ve dönem seçiniz.");
            return;
        }

        try {
            const response = await hesaplaMaas(personelId, donem);

            setHesaplananMaas(response.data);

            await fetchMaaslar();

            showSuccess("Maaş işlemi başarıyla tamamlandı.");
        } catch (error) {
            console.log(error);

            setHesaplananMaas(null);

            setUyariMesaji(
                error.response?.data ||
                "Bu işlem gerçekleştirilemez. Lütfen bilgileri kontrol ediniz."
            );
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMaas(silinecekMaasId);

            setSilinecekMaasId(null);
            await fetchMaaslar();

            showSuccess("Maaş kaydı başarıyla silindi.");
        } catch (error) {
            console.log(error);

            setSilinecekMaasId(null);
            setUyariMesaji("Maaş kaydı silinirken bir hata oluştu.");
        }
    };

    useEffect(() => {
        fetchPersoneller();
    }, []);

    return (
        <div className="premium-page">
            <div className="premium-hero">
                <div className="premium-hero-content">
                    <h2>Maaş Yönetimi</h2>
                </div>

                <div className="premium-hero-icon">
                    <FaMoneyBillWave />
                </div>
            </div>

            <div className="premium-stat-grid">
                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaList />
                    </div>

                    <div>
                        <span>Maaş Kaydı</span>
                        <strong>{maaslar.length}</strong>
                    </div>
                </div>

                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaCoins />
                    </div>

                    <div>
                        <span>Toplam Net</span>
                        <strong>{toplamNetMaas.toLocaleString("tr-TR")} ₺</strong>
                    </div>
                </div>

                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaCalculator />
                    </div>

                    <div>
                        <span>Son İşlem</span>
                        <strong>{hesaplananMaas ? "Hazır" : "Yok"}</strong>
                    </div>
                </div>
            </div>

            <div className="premium-panel">
                <div className="premium-panel-header">
                    <h3>Maaş Hesapla</h3>

                    <div className="premium-panel-icon">
                        <FaCalculator />
                    </div>
                </div>

                <div className="form-row premium-form-row">
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
                <div className="premium-panel">
                    <div className="premium-section-header">
                        <div className="premium-title-row">
                            <div className="premium-title-icon">
                                <FaMoneyBillWave />
                            </div>

                            <h3>Son Hesaplanan Maaş</h3>
                        </div>

                        <div className="premium-count">
                            {hesaplananMaas.donem}
                        </div>
                    </div>

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
                        <span className="badge badge-red">
                            Geçersiz Gün: {hesaplananMaas.gecersizGun}
                        </span>
                    </div>
                </div>
            )}

            <div className="premium-panel">
                <div className="premium-section-header">
                    <div className="premium-title-row">
                        <div className="premium-title-icon">
                            <FaMoneyBillWave />
                        </div>

                        <h3>Dönemlik Maaş Listesi</h3>
                    </div>

                    <div className="premium-count">
                        {maaslar.length} kayıt
                    </div>
                </div>

                {maaslar.length === 0 ? (
                    <div className="empty-state premium-empty-state">
                        Bu döneme ait maaş kaydı bulunmuyor.
                    </div>
                ) : (
                    <div className="premium-list">
                        {maaslar.map((maas) => (
                            <div
                                className="list-item maas-list-item premium-list-item"
                                key={maas.maasId}
                            >
                                <div className="premium-list-left">
                                    <div className="premium-mini-icon">
                                        <FaMoneyBillWave />
                                    </div>

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
                                        </div>
                                    </div>
                                </div>

                                <div className="list-actions">
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            setSilinecekMaasId(maas.maasId)
                                        }
                                    >
                                        <FaTrash />
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {silinecekMaasId !== null && (
                <ConfirmPopup
                    mesaj="Bu maaş kaydını silmek istediğinize emin misiniz?"
                    onConfirm={handleDelete}
                    onCancel={() => setSilinecekMaasId(null)}
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

export default MaasPage;