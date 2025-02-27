// Profile.tsx
import { useState, useEffect } from "react";

const Profile = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        setUser(storedUser);
    }, []);

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-32">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Mon Profil</h1>

            {user ? (
                <div className="space-y-4">
                    <div>
                        <strong>Nom d'utilisateur :</strong> {user.username}
                    </div>
                    <div>
                        <strong>Email :</strong> {user.email}
                    </div>
                    <div>
                        <strong>Mot de passe :</strong> {user.password ? "********" : "Non défini"}
                    </div>
                </div>
            ) : (
                <p className="text-center text-red-600">Aucune information disponible. Connectez-vous d'abord.</p>
            )}
        </div>
    );
};

export default Profile;
