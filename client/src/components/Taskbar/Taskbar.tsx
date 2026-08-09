import { useEffect, useState } from "react";

type TaskbarApp = {
  id: string;
  name: string;
  icon: string;
  isOpen: boolean;
  minimized: boolean;
};

type TaskbarProps = {
  apps: TaskbarApp[];
  onAppClick: (id: string) => void;
  onStartClick: () => void;
};

function Taskbar({
  apps,
  onAppClick,
  onStartClick,
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <footer className="taskbar">
      {/* Start Button */}
      <button
        className="start-button"
        aria-label="Open application menu"
        onClick={onStartClick}
      >
        <span className="start-dot"></span>
      </button>

      {/* Taskbar Applications */}
      <div className="taskbar-apps">
        {apps.map((app) => (
          <button
            key={app.id}
            className={`taskbar-app ${
              app.isOpen ? "active" : ""
            } ${app.minimized ? "minimized" : ""}`}
            onClick={() => onAppClick(app.id)}
            title={app.name}
          >
            <span>{app.icon}</span>

            {/* Running application indicator */}
            {app.isOpen && (
              <span className="running-indicator"></span>
            )}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="system-tray">
        <span>Wi-Fi</span>
        <span>{formattedTime}</span>
      </div>
    </footer>
  );
}

export default Taskbar;