import { useState } from "react";
import { login } from "../api/kullaniciApi";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [sifre, setSifre] = useState("");
    const [hata, setHata] = useState("");
    const [yukleniyor, setYukleniyor] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !sifre) {
            setHata("Lütfen email ve şifre alanlarını doldurunuz.");
            return;
        }

        const kullanici = {
            email: email,
            sifre: sifre,
        };

        try {
            setYukleniyor(true);
            setHata("");

            const response = await login(kullanici);

            onLogin(response.data);
        } catch (error) {
            console.log(error);
            console.log(error.response);

            setHata("Email veya şifre hatalı.");
        } finally {
            setYukleniyor(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Personel Takip Sistemi</h1>
                    <p>Yönetim paneline giriş yap</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email adresiniz"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="login-field">
                        <label>Şifre</label>
                        <input
                            type="password"
                            placeholder="Şifreniz"
                            value={sifre}
                            onChange={(e) => setSifre(e.target.value)}
                        />
                    </div>

                    {hata && (
                        <div className="login-error">
                            {hata}
                        </div>
                    )}

                    <button type="submit" disabled={yukleniyor}>
                        {yukleniyor ? "Giriş yapılıyor..." : "Giriş Yap"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;