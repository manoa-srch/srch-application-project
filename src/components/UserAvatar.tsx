type UserAvatarProps = {
  imageUrl?: string | null;
  name: string;
  size?: 'sm' | 'lg';
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const UserAvatar = ({ imageUrl, name, size = 'lg' }: UserAvatarProps) => {
  const initials = getInitials(name) || 'U';

  if (imageUrl) {
    return (
      <div className={`user-avatar user-avatar-${size}`}>
        {/* Standard img supports stored data URLs without additional Next image config. */}
        <img src={imageUrl} alt={`${name} profile`} className="user-avatar__image" />
      </div>
    );
  }

  return (
    <div className={`user-avatar user-avatar-${size} user-avatar-fallback`} aria-label={`${name} initials`}>
      <span>{initials}</span>
    </div>
  );
};

export default UserAvatar;
