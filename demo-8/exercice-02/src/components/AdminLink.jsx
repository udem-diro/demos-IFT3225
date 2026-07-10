// Affiche le lien seulement pour un utilisateur administrateur.
export default function AdminLink({ user }) {
  if (user.role !== "admin") return null;
  return <a href="#admin">Administration</a>;
}