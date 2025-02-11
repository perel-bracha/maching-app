export function mysave() {
    let donates = JSON.parse(localStorage.getItem("donates")) || [];

    // המרת המערך לנתוני JSON
    let jsonData = JSON.stringify(donates);

    // יצירת אובייקט Blob המכיל את נתוני הJSON
    let blob = new Blob([jsonData], { type: "application/json" });

    // יצירת קובץ חדש
    let fileName = "donates.json";

    // יצירת קישור להורדת הקובץ
    let downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;

    // הוספת הקישור לדף וביצוע לחיצה עליו כדי להוריד את הקובץ
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}