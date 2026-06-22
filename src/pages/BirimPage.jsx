import { useEffect, useState } from "react";
import { getAllBirimler, saveBirim, deleteBirim } from "../api/birimApi";

function BirimPage() {
    const [birimler, setBirimler] = useState([]);
    const [ad, setAd] = useState("");

    const fetchBirimler = async () => {
        const response = await getAllBirimler();
        setBirimler(response.data);
    };

    const handleSave = async () => {
        const yeniBirim = {
            ad: ad,
        };
        await saveBirim(yeniBirim);
        setAd("");
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
            <h2>Birim Sayfası</h2>

            <input
                type="text"
                placeholder="Birim adı"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
            />
            <button onClick={handleSave}>Birim Ekle</button>

            <h3>Birim Listesi</h3>

            {birimler.map((birim) => (
                <div key={birim.birimId}>
                    <p>
                        {birim.birimId} - {birim.ad}
                    </p>
                    <button onClick={() => handleDelete(birim.birimId)}>
                        Sil
                    </button>
                </div>
            ))}
        </div>
    );
}

export default BirimPage;