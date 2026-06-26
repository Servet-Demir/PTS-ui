import { useState } from "react";
import InfoPopup from "../components/InfoPopup";
import SuccessToast from "../components/SuccessToast";
import {
    FaList,
    FaMoneyBillWave,
    FaCalculator,
    FaCoins,
    FaCalendarAlt,
    FaUserCheck,
} from "react-icons/fa";
import { getMaasDonemOzeti } from "../api/maasApi";

function MaasPage() {
    const [donem, setDonem] = useState("2026-06-01");
    const [maasOzetleri, setMaasOzetleri] = useState([]);

    const [uyariMesaji, setUyariMesaji] = useState("");
    const [basariMesaji, setBasariMesaji] = useState(null);

    const toplamNetMaas = maasOzetleri.reduce(
        (toplam, maas) => toplam + Number(maas.netMaas || 0),
        0
    );

    const toplamCeza = maasOzetleri.reduce(
        (toplam, maas) => toplam + Number(maas.ceza || 0),
        0
    );

    const toplamGecersizGun = maasOzetleri.reduce(
        (toplam, maas) => toplam + Number(maas.gecersizGun || 0),
        0
    );

    const showSuccess = (mesaj) => {
        setBasariMesaji({
            id: Date.now() + Math.random(),
            mesaj: mesaj,
        });
    };

    const fetchDonemMaasOzeti = async () => {
        if (!donem) {
            setUyariMesaji("Lütfen dönem seçiniz.");
            return;
        }

        try {
            const response = await getMaasDonemOzeti(donem);

            setMaasOzetleri(response.data);

            if (response.data.length === 0) {
                setUyariMesaji(
                    "Seçili dönemde mesai kaydı bulunan personel olmadığı için maaş özeti oluşturulamadı."
                );
                return;
            }

            showSuccess("Dönem maaş özeti başarıyla getirildi.");
        } catch (error) {
            console.log(error);

            setMaasOzetleri([]);

            setUyariMesaji("Dönem maaş özeti getirilirken bir hata oluştu.");
        }
    };

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
                        <FaUserCheck />
                    </div>

                    <div>
                        <span>Dönemdeki Personel</span>
                        <strong>{maasOzetleri.length}</strong>
                    </div>
                </div>

                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaCoins />
                    </div>

                    <div>
                        <span>Toplam Net Maaş</span>
                        <strong>{toplamNetMaas.toLocaleString("tr-TR")} ₺</strong>
                    </div>
                </div>

                <div className="premium-stat-card">
                    <div className="premium-stat-icon">
                        <FaCalculator />
                    </div>

                    <div>
                        <span>Toplam Ceza</span>
                        <strong>{toplamCeza.toLocaleString("tr-TR")} ₺</strong>
                    </div>
                </div>
            </div>

            <div className="premium-panel">
                <div className="premium-panel-header">
                    <h3>Dönem Maaş Özeti</h3>

                    <div className="premium-panel-icon">
                        <FaCalendarAlt />
                    </div>
                </div>

                <div className="form-row premium-form-row">
                    <input
                        type="date"
                        value={donem}
                        onChange={(e) => setDonem(e.target.value)}
                    />

                    <button onClick={fetchDonemMaasOzeti}>
                        <FaList />
                        Dönem Maaş Özetini Göster
                    </button>
                </div>
            </div>

            <div className="premium-panel">
                <div className="premium-section-header">
                    <div className="premium-title-row">
                        <div className="premium-title-icon">
                            <FaMoneyBillWave />
                        </div>

                        <h3>Maaş Özeti Listesi</h3>
                    </div>

                    <div className="premium-count">
                        {maasOzetleri.length} kayıt
                    </div>
                </div>

                {maasOzetleri.length === 0 ? (
                    <div className="empty-state premium-empty-state">
                        Maaş özeti görüntülemek için dönem seçiniz.
                    </div>
                ) : (
                    <div className="premium-list">
                        {maasOzetleri.map((maas) => (
                            <div
                                className="list-item maas-list-item premium-list-item"
                                key={maas.personelId}
                            >
                                <div className="premium-list-left">
                                    <div className="premium-mini-icon">
                                        <FaMoneyBillWave />
                                    </div>

                                    <div className="maas-info">
                                        <div className="maas-personel">
                                            {maas.ad} {maas.soyad}
                                        </div>

                                        <div className="maas-detail">
                                            Dönem: {maas.donem}
                                        </div>

                                        <div className="maas-meta">
                                            <span
                                                className={
                                                    maas.yonetici
                                                        ? "badge badge-blue"
                                                        : "badge badge-gray"
                                                }
                                            >
                                                {maas.yonetici
                                                    ? "Yönetici"
                                                    : "Personel"}
                                            </span>

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
                                                Mesai Kaydı: {maas.toplamMesaiKaydi}
                                            </span>

                                            <span className="maas-detail">
                                                Geçersiz Gün: {maas.gecersizGun}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {maasOzetleri.length > 0 && (
                    <div className="maas-meta-row">
                        <span className="badge badge-blue">
                            Toplam Personel: {maasOzetleri.length}
                        </span>

                        <span className="badge badge-red">
                            Toplam Geçersiz Gün: {toplamGecersizGun}
                        </span>

                        <span className="badge badge-green">
                            Toplam Net: {toplamNetMaas.toLocaleString("tr-TR")} ₺
                        </span>
                    </div>
                )}
            </div>

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