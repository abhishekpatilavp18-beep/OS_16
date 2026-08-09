import { useState } from "react";

type Application = {
  id: string;
  name: string;
  icon: string;
};

type StartMenuProps = {
  applications: Application[];
  onOpenApplication: (id: string) => void;
  onClose: () => void;
};

function StartMenu({
  applications,
  onOpenApplication,
  onClose,
}: StartMenuProps) {
  const [search, setSearch] = useState("");

  const filteredApplications = applications.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" &&
      filteredApplications.length > 0
    ) {
      onOpenApplication(filteredApplications[0].id);
      onClose();
    }
  };

  return (
    <section className="start-menu">
      <div className="start-menu-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search applications..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>

      <div className="start-menu-title">
        {search ? "Search results" : "Applications"}
      </div>

      <div className="start-menu-apps">
        {filteredApplications.map((app) => (
          <button
            key={app.id}
            className="start-menu-app"
            onClick={() => {
              onOpenApplication(app.id);
              onClose();
            }}
          >
            <span className="start-menu-icon">
              {app.icon}
            </span>

            <span>{app.name}</span>
          </button>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="no-search-results">
          No applications found
        </div>
      )}
    </section>
  );
}

export default StartMenu;