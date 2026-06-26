import { useState } from "react";
import { login } from "../api/kullaniciApi";
import {
    FaUserShield,
    FaLock,
    FaEnvelope,
    FaArrowRight,
    FaUsers,
    FaClock,
    FaMoneyBillWave,
} from "react-icons/fa";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [sifre, setSifre] = useState("");
    const [hata, setHata] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login({
                email: email,
                sifre: sifre,
            });

            onLogin(response.data);
        } catch (error) {
            console.log(error);
            setHata("Email veya şifre hatalı.");
        }
    };

    return (
        <div className="login-page premium-login-page">
            <div className="login-bg-shape login-shape-one"></div>
            <div className="login-bg-shape login-shape-two"></div>
            <div className="login-bg-shape login-shape-three"></div>

            <div className="login-shell">
                <div className="login-showcase">
                    <div className="login-brand-icon">
                        <FaUserShield />
                    </div>

                    <div className="login-brand-badge">
                        Yönetim Paneli
                    </div>

                    <h1>Personel Takip Sistemi</h1>

                    <div className="login-feature-grid">
                        <div className="login-feature-card">
                            <FaUsers />
                            <span>Personel Yönetimi</span>
                        </div>

                        <div className="login-feature-card">
                            <FaClock />
                            <span>Mesai Takibi</span>
                        </div>

                        <div className="login-feature-card">
                            <FaMoneyBillWave />
                            <span>Maaş Hesaplama</span>
                        </div>
                    </div>
                </div>

                <div className="login-card premium-login-card">
                    <div className="login-header">
                        <div className="login-card-icon">
                            <FaLock />
                        </div>

                        <h2>Giriş Yap</h2>
                        <p>Yönetim paneline erişmek için bilgilerinizi giriniz.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label>Email</label>

                            <div className="login-input-wrapper">
                                <FaEnvelope />
                                <input
                                    type="email"
                                    placeholder="Email adresiniz"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label>Şifre</label>

                            <div className="login-input-wrapper">
                                <FaLock />
                                <input
                                    type="password"
                                    placeholder="Şifreniz"
                                    value={sifre}
                                    onChange={(e) => setSifre(e.target.value)}
                                />
                            </div>
                        </div>

                        {hata && <div className="login-error">{hata}</div>}

                        <button type="submit" className="login-submit-button">
                            Giriş Yap
                            <FaArrowRight />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;