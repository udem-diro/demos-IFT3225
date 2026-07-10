export default function LignesList({ lignes }) {
  if (lignes.length === 0) {
    return <p>Aucune ligne ne correspond.</p>;
  }

  return (
    <ul className="lignes">
      {lignes.map((ligne) => (
        <li key={ligne.id}>
          <strong>{ligne.numero}</strong> {ligne.nom} ({ligne.arrets} arrêts)
        </li>
      ))}
    </ul>
  );
}