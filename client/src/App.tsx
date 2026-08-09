import { useState } from "react";

import "./App.css";

import DesktopIcon from "./components/DesktopIcon/DesktopIcon";
import Taskbar from "./components/Taskbar/Taskbar";
import Window from "./components/Window/Window";
import StartMenu from "./components/StartMenu/StartMenu";

type OpenWindow = {
  id: string;
  title: string;
  minimized: boolean;
  zIndex: number;
};

const applications = [
  {
    id: "projects",
    name: "Projects",
    icon: "📁",
  },
  {
    id: "about",
    name: "About",
    icon: "👤",
  },
  {
    id: "resume",
    name: "Resume",
    icon: "📄",
  },
  {
    id: "ai",
    name: "AbhiAI",
    icon: "🤖",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "💻",
  },
  {
    id: "achievements",
    name: "Achievements",
    icon: "🏆",
  },
];

function App() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);

  const [startMenuOpen, setStartMenuOpen] =
    useState(false);

  const openApplication = (
    id: string,
    name: string
  ) => {
    const existingWindow = windows.find(
      (window) => window.id === id
    );

    if (existingWindow) {
      focusWindow(id);
      return;
    }

    const highestZIndex = Math.max(
      0,
      ...windows.map((window) => window.zIndex)
    );

    const newWindow: OpenWindow = {
      id,
      title: name,
      minimized: false,
      zIndex: highestZIndex + 1,
    };

    setWindows((current) => [
      ...current,
      newWindow,
    ]);
  };

  const closeWindow = (id: string) => {
    setWindows((current) =>
      current.filter((window) => window.id !== id)
    );
  };

  const minimizeWindow = (id: string) => {
    setWindows((current) =>
      current.map((window) =>
        window.id === id
          ? {
              ...window,
              minimized: true,
            }
          : window
      )
    );
  };

  function focusWindow(id: string) {
    setWindows((current) => {
      const highestZIndex = Math.max(
        0,
        ...current.map((window) => window.zIndex)
      );

      return current.map((window) =>
        window.id === id
          ? {
              ...window,
              minimized: false,
              zIndex: highestZIndex + 1,
            }
          : window
      );
    });
  }

  const handleTaskbarAppClick = (id: string) => {
    const app = applications.find(
      (application) => application.id === id
    );

    if (!app) return;

    const window = windows.find(
      (window) => window.id === id
    );

    if (window) {
      focusWindow(id);
    } else {
      openApplication(id, app.name);
    }
  };

  return (
    <main className="desktop">
      <div className="desktop-brand">
        <h1>AbhishekOS</h1>
        <p>Personal workspace</p>
      </div>

      <div className="desktop-icons">
        {applications.map((app) => (
          <DesktopIcon
            key={app.id}
            name={app.name}
            icon={app.icon}
            onDoubleClick={() =>
              openApplication(app.id, app.name)
            }
          />
        ))}
      </div>

      {windows.map((window) => {
        if (window.minimized) {
          return null;
        }

        return (
          <Window
            key={window.id}
            title={window.title}
            zIndex={window.zIndex}
            onClose={() =>
              closeWindow(window.id)
            }
            onMinimize={() =>
              minimizeWindow(window.id)
            }
            onFocus={() =>
              focusWindow(window.id)
            }
          >
            <h2>{window.title}</h2>

            <p>
              This application is currently being
              built.
            </p>
          </Window>
        );
      })}

      {startMenuOpen && (
        <StartMenu
          applications={applications}
          onOpenApplication={(id) => {
            const app = applications.find(
              (application) =>
                application.id === id
            );

            if (app) {
              openApplication(
                app.id,
                app.name
              );
            }
          }}
          onClose={() =>
            setStartMenuOpen(false)
          }
        />
      )}

      <Taskbar
        apps={applications.map((app) => {
          const window = windows.find(
            (window) => window.id === app.id
          );

          return {
            id: app.id,
            name: app.name,
            icon: app.icon,
            isOpen: Boolean(window),
            minimized:
              window?.minimized ?? false,
          };
        })}
        onAppClick={handleTaskbarAppClick}
        onStartClick={() =>
          setStartMenuOpen(
            (current) => !current
          )
        }
      />
    </main>
  );
}

export default App;