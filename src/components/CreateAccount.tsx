import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateAccountProps {
    onLogin: (name: string) => void;
}

const CreateAccount = ({ onLogin }: CreateAccountProps) => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation des champs
        if (!username || !email || !password || !confirmPassword) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        const user = { username, email, password };
        localStorage.setItem("user", JSON.stringify(user));

        onLogin(username);

        navigate("/");
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Créer un compte</h1>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom d'utilisateur */}
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nom d'utilisateur"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
                    />
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
                    />
                </div>

                {/* Mot de passe */}
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
                    />
                </div>

                {/* Confirmer le mot de passe */}
                <div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmer le mot de passe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
                    />
                </div>

                {/* Bouton de soumission */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-violet-500 text-white font-semibold rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                    >
                        Créer le compte
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAccount;
