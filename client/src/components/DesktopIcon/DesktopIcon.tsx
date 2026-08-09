type DesktopIconProps = {
  name: string;
  icon: string;
  onDoubleClick: () => void;
};

function DesktopIcon({ name, icon, onDoubleClick }: DesktopIconProps) {
  return (
    <button className="desktop-icon" onDoubleClick={onDoubleClick}>
      <span className="desktop-icon-image">{icon}</span>
      <span className="desktop-icon-name">{name}</span>
    </button>
  );
}

export default DesktopIcon;