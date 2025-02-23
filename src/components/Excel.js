
import { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function UploadExcel({path}) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      uploadFile(selectedFile);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://localhost:8080/${path}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "שגיאה בשרת");
      }

      const data = await response.json();
      console.log("קובץ הועלה בהצלחה:", data);

      Swal.fire({
        icon: "success",
        title: "!הקובץ נטען בהצלחה",
        confirmButtonText: "אישור",
      });
    } catch (error) {
      console.error("שגיאה בהעלאת הקובץ:", error);
      Swal.fire({
        icon: "error",
        title: "!אירעה שגיאה",
        text: ".לא הצלחנו לטעון את הקובץ. נסה שוב",
        confirmButtonText: "אישור",
      });
    }
  };

  return (
    <div>
      {/* שדה קובץ מוסתר */}
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* כפתור לבחירת קובץ */}
      <button onClick={() => fileInputRef.current.click()}>
        📂 טעינת קובץ אקסל
      </button>
    </div>
  );
}
