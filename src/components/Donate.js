import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import UploadExcel from "./Excel";

export function Donate() {
  const { donateId } = useParams();
  const [donateToUpdate, setDonateToUpdate] = useState({});
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/donations/${donateId}`)
      .then((response) => response.json())
      .then((data) => {
        setDonateToUpdate(donateId ? data : null);
      })
      .catch((error) => console.log(error));
  }, [donateId]);
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [girls, setGirls] = useState([]);
  const [filteredGirls, setFilteredGirls] = useState([]);
  const [apartment, setApartment] = useState({});
  const [girl, setGirl] = useState({});
  const [showApartmentDropdown, setShowApartmentDropdown] = useState(false);
  const [showGirlDropdown, setShowGirlDropdown] = useState(false);
  const [showHowDropdown, setShowHowDropdown] = useState(false);

  const [donate, setDonate] = useState({
    user_id: null,
    donor_name: "",
    amount: 0,
    how: "",
    donation_date: new Date().toISOString().slice(0, 19).replace("T", " "),
    remark: "",
    verified: true,
  });
  useEffect(() => {
    console.log(`in copy`);

    if (donateToUpdate) {
      setDonate({
        user_id: donateToUpdate.user_id || null,
        donor_name: donateToUpdate.donor_name || "",
        amount: donateToUpdate.amount || 0,
        how: donateToUpdate.how || "",
        donation_date:
          donateToUpdate.donation_date ||
          new Date().toISOString().slice(0, 19).replace("T", " "),
        remark: donateToUpdate.remark || "",
        verified:
          donateToUpdate.verified !== undefined
            ? donateToUpdate.verified
            : true,
      });
      fetch(`${process.env.REACT_APP_URL}/users/${donateToUpdate.user_id}`)
        .then((response) => response.json())
        .then((data) => {
          setGirl(data);
          fetch(`${process.env.REACT_APP_URL}/apartments/${data.apartment_id}`)
            .then((response) => response.json())
            .then((data1) => setApartment(data1))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  }, [donateToUpdate]);
  const howArray = ["מזומן", "אשראי", "העברה בנקאית", "ביט"];
  const handleAddDonation = (event) => {
    event.preventDefault();
    if (
      donate.user_id !== null &&
      donate.donor_name !== "" &&
      donate.amount !== 0.0 &&
      donate.how !== ""
    ) {
      donate.amount = parseInt(donate.amount);
      donate.verified = donate.verified ? 1 : 0;
      console.log(JSON.stringify(donate));

      fetch(`${process.env.REACT_APP_URL}/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donate),
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "!התרומה נוספה בהצלחה",
              text: ".תודה על תרומתך",
              confirmButtonText: "אישור",
            }).then(() => {
              setDonate({
                user_id: null,
                donor_name: "",
                amount: 0,
                how: "",
                donation_date: new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " "),
                remark: "",
                verified: true,
              });
              setApartment({});
              setGirl({});
            });
          } else
            return response.json().then((err) => {
              throw new Error(err.message || "שגיאה בשרת");
            });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "!אירעה שגיאה",
            text: ".לא הצלחנו להוסיף את התרומה. נסה שוב",
            confirmButtonText: "אישור",
          });
        });
    } else
      Swal.fire({
        icon: "warning",
        title: "!שדה חסר",
        text: ".אנא מלא את כל השדות לפני השליחה",
        confirmButtonText: "אישור",
      });
  };

  const handleUpdateDonation = (event) => {
    event.preventDefault();
    if (
      donate.user_id != null &&
      donate.donor_name !== "" &&
      donate.amount !== 0.0 &&
      donate.how !== ""
    ) {
      donate.amount = parseInt(donate.amount);
      donate.verified = donate.verified ? 1 : 0;
      donate.donation_date = formatDate(donate.donation_date);
      console.log(JSON.stringify(donate));

      fetch(`${process.env.REACT_APP_URL}/donations/${donateToUpdate.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donate),
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "!התרומה עודכנה בהצלחה",
              text: ".תודה על תרומתך",
              confirmButtonText: "אישור",
            }).then(() => {
              navigate(-1); // חוזר לדף הקודם
            });
          } else
            return response.json().then((err) => {
              throw new Error(err.message || "שגיאה בשרת");
            });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "!אירעה שגיאה",
            text: ".לא הצלחנו לעדכן את התרומה. נסה שוב",
            confirmButtonText: "אישור",
          });
        });
    } else
      Swal.fire({
        icon: "warning",
        title: "!שדה חסר",
        text: ".אנא מלא את כל השדות לפני השליחה",
        confirmButtonText: "אישור",
      });
  };

  useEffect(() => {
    let query = `${process.env.REACT_APP_URL}/apartments`;
    query += girl.apartment_id !== undefined ? `/${girl.apartment_id}` : ``;
    console.log(query);

    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        setApartments(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let query = `${process.env.REACT_APP_URL}/users`;
    query +=
      apartment.apartment_id !== undefined
        ? `/?apartmentId=${apartment.apartment_id}`
        : ``;
    console.log(query);

    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        setGirls(data);
      })
      .catch((error) => console.log(error));
  }, [apartment]);
  const navigate = useNavigate();
  return (
    <>
      <div className="button-container">
        <UploadExcel path={`donations`} />
        <button onClick={() => navigate("/donations/notVerified")}>
          תרומות לא מאומתות
        </button>
      </div>
      <form
        onSubmit={donateToUpdate.id ? handleUpdateDonation : handleAddDonation}
      >
        <h3>הוספת תרומה</h3>
        <div className="input-container">
          <input
            id="amount"
            type="number"
            placeholder="סכום התרומה"
            value={donate.amount || ""}
            onChange={(e) => setDonate({ ...donate, amount: e.target.value })}
          />
        </div>
        <div className="input-container">
          <input
            id="name"
            type="text"
            placeholder="שם התורם"
            value={donate.donor_name}
            onChange={(e) =>
              setDonate({ ...donate, donor_name: e.target.value })
            }
          />
        </div>
        <div className="input-container">
          <input
            id="how"
            type="text"
            placeholder="אופן התרומה"
            value={donate.how}
            readOnly
            onFocus={() => {
              setShowHowDropdown(true);
            }}
            onBlur={() => setTimeout(() => setShowHowDropdown(false), 100)}
          />
          {showHowDropdown && (
            <ul className="dropdown">
              {howArray.map((way, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    setDonate({ ...donate, how: way });
                    setShowHowDropdown(false);
                  }}
                >
                  {way}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="input-container">
          <input
            id="apartment"
            type="text"
            placeholder="דירה"
            value={apartment.apart_name || ""}
            readOnly
            onFocus={() => {
              setShowApartmentDropdown(true);
              setFilteredApartments(apartments);
            }}
            onBlur={() =>
              setTimeout(() => setShowApartmentDropdown(false), 100)
            }
          />
          {showApartmentDropdown && filteredApartments.length > 0 && (
            <ul className="dropdown">
              {filteredApartments.map((apartment, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    console.log(`in clickapart`);
                    setApartment(apartment);
                    if (
                      girl &&
                      girl.apartment_id &&
                      girl.apartment_id !== apartment.apartment_id
                    )
                      setGirl({});
                    setShowApartmentDropdown(false);
                  }}
                >
                  {apartment.apart_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="input-container">
          <input
            id="girl"
            type="text"
            placeholder="מתרימה"
            value={girl.name || ""}
            readOnly
            onFocus={() => {
              setShowGirlDropdown(true);
              setFilteredGirls(girls);
            }}
            onBlur={() => setTimeout(() => setShowGirlDropdown(false), 100)}
          />
          {showGirlDropdown && filteredGirls.length > 0 && (
            <ul className="dropdown">
              {filteredGirls.map((girl, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    setGirl(girl);
                    setApartment(
                      apartments.find(
                        (apart) => apart.apartment_id === girl.apartment_id
                      )
                    );
                    setDonate({ ...donate, user_id: girl.user_id });
                    setShowGirlDropdown(false);
                  }}
                  // onClick={() => {
                  //   setGirl(girl);
                  //   setApartment(
                  //     apartments.find(
                  //       (apart) => apart.apartment_id === girl.apartment_id
                  //     )
                  //   );
                  //   setDonate({ ...donate, user_id: girl.user_id });
                  //   setShowGirlDropdown(false);
                  // }}
                >
                  {girl.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <label className="checkbox-container">
          התשלום הועבר
          <input
            type="checkbox"
            checked={donate.verified}
            onChange={(e) =>
              setDonate({ ...donate, verified: e.target.checked })
            }
          />
          <span className="checkmark"></span>
        </label>
        {donateToUpdate.id && (
          <div className="input-container">
            <button
              type="button"
              onMouseDown={() =>
                alert(
                  donate.remark && donate.remark !== ""
                    ? donate.remark
                    : "אין הערות"
                )
              }
            >
              הצג הערות
            </button>
          </div>
        )}
        <button type="submit" value="הוספת תרומה">
          {donateToUpdate.id ? "עדכון" : "שמור"}
        </button>
      </form>
    </>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);

  // קבלת רכיבי התאריך והשעה
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // חודשים ב-JavaScript מתחילים מ-0
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// const handleApartmentChange = (e) => {
//   const value = e.target.value;
//   setFilteredApartments(
//     apartments.filter((apartment) =>
//       apartment.toLowerCase().includes(value.toLowerCase())
//     )
//   );
//   setShowApartmentDropdown(true);
// };

// const handleGirlChange = (e) => {
//   const value = e.target.value;
//   setFilteredGirls(
//     girls.filter((g) => g.name.toLowerCase().includes(value.toLowerCase()))
//   );
//   setShowGirlDropdown(true);
// };
