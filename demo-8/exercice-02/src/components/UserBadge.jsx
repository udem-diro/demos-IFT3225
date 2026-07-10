export default function UserBadge({ user }) {
  return (
    <span>
      {user.name} <em>({user.role})</em>
    </span>
  );
}