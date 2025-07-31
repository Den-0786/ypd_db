export default function ModeToggle({ isBulkMode, setIsBulkMode }) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
        Mode:
      </span>
      <div className="flex bg-light-surface dark:bg-dark-surface rounded-lg p-1 neumorphic-light-inset dark:neumorphic-dark-inset">
        <button
          onClick={() => setIsBulkMode(true)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            isBulkMode
              ? "bg-light-accent dark:bg-dark-accent text-white shadow-md"
              : "text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text"
          }`}
        >
          <i className="fas fa-users mr-2"></i>
          Bulk Add
        </button>
        <button
          onClick={() => setIsBulkMode(false)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            !isBulkMode
              ? "bg-light-accent dark:bg-dark-accent text-white shadow-md"
              : "text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text"
          }`}
        >
          <i className="fas fa-user-plus mr-2"></i>
          Single Add
        </button>
      </div>
    </div>
  );
}
