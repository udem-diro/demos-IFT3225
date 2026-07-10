import UserMenu from "./UserMenu.jsx";

// Header non plus n'utilise pas `user` ; il ne fait que le transmettre.
export default function Header({ user }) {
  return (
    <header className="header">
      <strong>Bus en vue</strong>
      <UserMenu user={user} />
    </header>
  );
}