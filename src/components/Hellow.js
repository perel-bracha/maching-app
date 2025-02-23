import UploadExcel from "./Excel";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
export default function Hellow() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* שורה של 6 כפתורים לניווט */}
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => navigate("/home")}
        >
          📺 למסכים
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={() => navigate("/donate")}
        >
          ➕ הוספת תרומה
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
          onClick={() => navigate("/topApartments")}
        >
          🏠 דירות מובילות
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded-lg"
          onClick={() => navigate("/apartments")}
        >
          🏢 כל הדירות
        </button>
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded-lg"
          onClick={() => navigate("/topGirls")}
        >
          👩‍🎓 בנות מובילות
        </button>
        <button
        //   className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={() => navigate("/amount")}
        >
          💰 סכום כללי
        </button>
      </div>

      <UploadExcel path={`users`} />
    </div>
  );
}
