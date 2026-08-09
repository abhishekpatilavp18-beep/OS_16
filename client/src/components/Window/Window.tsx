import { useState } from "react";

type WindowProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
};

function Window({
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
}: WindowProps) {
  const [position, setPosition] = useState({
    x: 280,
    y: 120,
  });

  const [maximized, setMaximized] = useState(false);

  const [dragging, setDragging] = useState(false);

  const [dragOffset, setDragOffset] = useState({
    x: 0,
    y: 0,
  });

  const startDragging = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (maximized) return;

    setDragging(true);

    setDragOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });

    onFocus();
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!dragging || maximized) return;

    setPosition({
      x: event.clientX - dragOffset.x,
      y: event.clientY - dragOffset.y,
    });
  };

  const stopDragging = () => {
    setDragging(false);
  };

  return (
    <section
      className={`os-window ${
        maximized ? "maximized" : ""
      }`}
      style={
        maximized
          ? { zIndex }
          : {
              zIndex,
              left: position.x,
              top: position.y,
            }
      }
      onMouseDown={onFocus}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <header
        className="window-titlebar"
        onMouseDown={startDragging}
      >
        <span className="window-title">{title}</span>

        <div
          className="window-controls"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <button
            className="window-control"
            onClick={onMinimize}
            aria-label="Minimize window"
          >
            −
          </button>

          <button
            className="window-control"
            onClick={() =>
              setMaximized((current) => !current)
            }
            aria-label="Maximize window"
          >
            □
          </button>

          <button
            className="window-control close"
            onClick={onClose}
            aria-label="Close window"
          >
            ×
          </button>
        </div>
      </header>

      <div className="window-content">
        {children}
      </div>
    </section>
  );
}

export default Window;