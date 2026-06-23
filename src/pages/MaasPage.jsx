import { useEffect, useState } from "react";
import { getAllPersoneller } from "../api/personelApi";
import { hesaplaMaas, getMaasByDonem, deleteMaas } from "../api/maasApi";

function MaasPage() {
    const [personeller, setPersoneller] = useState([]);
    const [maaslar, setMaaslar] = useState([]);

    const [personelId, setPersonelId] = useState("");
    const [donem, setDonem] = useState("2026-06-01");

    const [hesaplananMaas, setHesaplananMaas] = useState(null);

    const fetchPersoneller = async () => {
        const response = await getAllPersoneller();
        setPersoneller(response.data);
    };

    const fetchMaaslar = async () => {
        if (!donem) {
            alert("Lütfen dönem seçiniz.");
            return;
        }

        const response = await getMaasByDonem(donem);

        const siraliMaaslar = [...response.data].sort(
            (a, b) => a.maasId - b.maasId
        );

        setMaaslar(siraliMaaslar);
    };

    const handleMaasHesapla = async () => {
        if (!personelId || !donem) {
            alert("Lütfen personel ve dönem seçiniz.");
            return;
        }

        const response = await hesaplaMaas(personelId, donem);

        setHesaplananMaas(response.data);

        fetchMaaslar();
    };

    const handleDelete = async (id) => {
        await deleteMaas(id);
        fetchMaaslar();
    };

    useEffect(() => {
        fetchPersoneller();
    }, []);

    return (
        <div>
            <h2>Maaş Sayfası</h2>

            <div>
                <h3>Maaş Hesapla</h3>

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

                <button onClick={handleMaasHesapla}>Maaş Hesapla</button>

                <button onClick={fetchMaaslar}>Dönemlik Maaşları Listele</button>
            </div>

            <hr />

            {hesaplananMaas && (
                <div>
                    <h3>Son Hesaplanan Maaş</h3>

                    <p>
                        Personel: {hesaplananMaas.personel?.ad}{" "}
                        {hesaplananMaas.personel?.soyad}
                    </p>

                    <p>Dönem: {hesaplananMaas.donem}</p>
                    <p>Brüt Maaş: {hesaplananMaas.brutMaas}</p>
                    <p>Geçersiz Gün: {hesaplananMaas.gecersizGun}</p>
                    <p>Ceza: {hesaplananMaas.ceza}</p>
                    <p>Net Maaş: {hesaplananMaas.netMaas}</p>
                </div>
            )}

            <hr />

            <h3>Dönemlik Maaş Listesi</h3>

            {maaslar.length === 0 ? (
                <p>Bu döneme ait maaş kaydı yok.</p>
            ) : (
                maaslar.map((maas) => (
                    <div key={maas.maasId}>
                        <p>
                            ID: {maas.maasId} - Personel: {maas.personel?.ad}{" "}
                            {maas.personel?.soyad} - Dönem: {maas.donem} - Brüt:{" "}
                            {maas.brutMaas} - Geçersiz Gün: {maas.gecersizGun} - Ceza:{" "}
                            {maas.ceza} - Net: {maas.netMaas}
                        </p>

                        <button onClick={() => handleDelete(maas.maasId)}>
                            Sil
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default MaasPage;