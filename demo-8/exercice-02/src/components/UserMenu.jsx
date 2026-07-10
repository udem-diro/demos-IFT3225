import UserBadge from "./UserBadge.jsx";
import AdminLink from "./AdminLink.jsx";

// UserMenu transmet encore `user` à deux enfants qui, eux, l'utilisent vraiment.
export default function UserMenu({ user }) {
  return (
    <nav className="menu">
      <AdminLink user={user} />
      <UserBadge user={user} />
    </nav>
  );
}