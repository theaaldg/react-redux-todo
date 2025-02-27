import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Shop, Tous droits réservés.</p>
                <div className="mt-4 space-x-4">
                    <a href="#" className="hover:text-gray-400">À propos</a>
                    <a href="#" className="hover:text-gray-400">Politique de confidentialité</a>
                    <a href="#" className="hover:text-gray-400">Conditions d'utilisation</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
