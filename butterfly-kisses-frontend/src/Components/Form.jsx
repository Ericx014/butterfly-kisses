import {useState, useEffect} from "react";
import sessionService from "../Services/sessions";
import participantService from "../Services/participants";

const Form = () => {
  const [clickedAnimation, setClickedAnimation] = useState(false);

  const [name, setName] = useState("");
	const [studentId, setStudentId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [day, setDay] = useState("");
  const [session, setSession] = useState("");
  const [remarks, setRemarks] = useState("");
  const [others, setOthers] = useState("");
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    sessionService.getAll().then((allSessions) => {
      setSessions(allSessions);
			console.log("Sessions", allSessions);
    });
  }, []);

	const uniqueDays = [
    ...new Set(sessions.map((singleSession) => singleSession.day)),
  ];

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const addParticipant = (event) => {
    event.preventDefault();
    setClickedAnimation(true);
    setTimeout(() => setClickedAnimation(false), 2000);

    const participantObject = {
      name: name,
			studentId: studentId,
      contactNo: contactNo,
      email: email,
      gender: gender,
      age: age,
      day: day,
      session: session,
      remarks: remarks,
      others: others,
    };

    participantService.create(participantObject).then(() => {
      setName("");
			setStudentId("");
      setContactNo("");
      setEmail("");
      setGender("");
      setAge("");
      setDay("");
      setSession("");
      setRemarks("");
      setOthers("");
    });
  };

  return (
    <form onSubmit={addParticipant}>
      <div className="container">
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ali bin Abu"
          />
        </div>
        <div className="input-container">
          <label htmlFor="name">Student ID</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="For TARUMT students only"
          />
        </div>
        <div className="input-container">
          <label htmlFor="contactNumber">Contact no.</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            placeholder="01144598329"
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alibinabu@gmail.com"
          />
        </div>
        <div className="input-container">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={remarks == "" ? "placeholder" : ""}
          >
            <option value="" className="placeholder">
              Select an option
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="21"
          />
        </div>
        <div className="input-container">
          <label htmlFor="day">Day</label>
          <select
            name="day"
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="" className="placeholder">
              Select an option
            </option>
            {uniqueDays.map((day) => {
              return (
                <option key={day} value={day}>
                  {day}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="session">Session</label>
          <select
            name="session"
            id="session"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          >
            <option value="" className="placeholder">
              Select an option
            </option>
            {sessions.map(
              (singleSession) =>
                singleSession.day == day && (
                  <option key={singleSession.id} value={singleSession.id}>
                    {singleSession.session}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="input-container">
          <label
            htmlFor="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          >
            Remarks
          </label>
          <select
            name="remarks"
            id="remarks"
            value={remarks}
            onChange={handleRemarksChange}
            className={remarks == "" ? "placeholder" : ""}
          >
            <option value="" className="placeholder">
              Select an option
            </option>
            <option value="option 1">Option 1</option>
            <option value="option 2">Option 2</option>
            <option value="others">Others</option>
          </select>
        </div>
        {remarks !== "others" && (
          <div className="input-container">
            <label htmlFor="others">Others</label>
            <textarea
              type="text"
              id="others"
              disabled
              placeholder="Select other remarks to enter"
            />
          </div>
        )}
        {remarks === "others" && (
          <div className="input-container">
            <label htmlFor="others">Others</label>
            <textarea
              type="text"
              id="others"
              value={others}
              onChange={(e) => setOthers(e.target.value)}
              placeholder="Enter other remarks here"
            />
          </div>
        )}
        <div className="button-container">
          <button
            className={clickedAnimation ? "form-btn button-bounce" : "form-btn"}
            type="submit"
            onClick={addParticipant}
            value="Submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
