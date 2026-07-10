import Header from "./Header.jsx";

// Layout ne se sert pas de `user`, mais doit le transmettre à Header.
export default function Layout({ user, children }) {
  return (
    <div className="app">
      <Header user={user} />
      <main>{children}</main>
    </div>
  );
}