import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaSignInAlt } from "react-icons/fa";
import { login } from "../api/kullaniciApi";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [sifre, setSifre] = useState("");
    const [hata, setHata] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); //sayfanın yenilenmesini engellemek için

        try {
            const response = await login({
                email: email,
                sifre: sifre
            });

            onLogin(response.data);
        } catch (error) {
            console.log(error);
            setHata("Email veya şifre hatalı.");
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

                    {hata && <div className="login-error">{hata}</div>}

                    <button type="submit">
                        <FaSignInAlt />
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;