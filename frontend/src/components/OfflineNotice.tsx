import { useEffect, useState } from "react";

export default function OfflineNotice() {
  const [toast, setToast] = useState<null | string>(null);

  useEffect(() => {
    const handleOnline = () => {
      console.log("Status: online ✅");
      setToast("✅ Back online - Connection restored");
      setTimeout(() => setToast(null), 3000); // the effect will hide after 3 seconds
    };

    const handleOffline = () => {
      console.log("Status: offline 🔴");
      setToast("🔴 You are offline - Some features may not work");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <div
        className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg"
        style={{
          animation: "fadeInUp 0.3s ease-out",
        }}
      >
        {toast}
      </div>

      {/* Inline animation keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
