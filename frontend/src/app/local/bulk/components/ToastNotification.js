export default function ToastNotification({ toast }) {
  if (!toast.show) return null;

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white text-sm font-semibold transition-all duration-300
      ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
    >
      {toast.message}
    </div>
  );
}
