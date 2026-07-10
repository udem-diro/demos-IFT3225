import { useEffect, useState } from "react";

// À REFACTORER.
export function LignesList() {
    const [lignes, setLignes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtre, setFiltre] = useState("");

    useEffect(() => {
        let annule = false;
        setLoading(true);

        fetch("/lignes.json")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (!annule) {
                    setLignes(data);
                    setError(null);
                }
            })
            .catch((err) => {
                if (!annule) setError(err.message);
            })
            .finally(() => {
                if (!annule) setLoading(false);
            });

        return () => {
            annule = true;
        };
    }, []);

    if (loading) return <p>Chargement…</p>;
    if (error) return <p>Erreur : {error}</p>;

    const visibles = lignes.filter((ligne) =>
        ligne.nom.toLowerCase().includes(filtre.toLowerCase())
    );

    return (
        <section>
            <input placeholder="Filtrer une ligne" value={filtre} onChange={(event) => setFiltre(event.target.value)} />
            <ul className="lignes">
                {visibles.map((ligne) => (
                    <li key={ligne.id}>
                        <strong>{ligne.numero}</strong> {ligne.nom} ({ligne.arrets} arrêts)
                    </li>
                ))}
            </ul>
        </section>
    );
}
