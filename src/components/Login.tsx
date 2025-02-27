import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    onLogin: (name: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.username === username && user.password === password) {
            onLogin(username);
            navigate("/");
        } else {
            setError("Nom d'utilisateur ou mot de passe incorrect.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-32">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Se connecter</h1>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nom d'utilisateur"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-violet-500 text-white font-semibold rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    >
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
