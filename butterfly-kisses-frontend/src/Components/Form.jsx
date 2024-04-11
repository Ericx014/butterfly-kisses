import { useState } from "react";

const Form = () => {
  const [remarks, setRemarks] = useState("");
	const [clickedAnimation, setClickedAnimation] = useState(false);

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

	const bounceAnimation = (e) => {
		e.preventDefault();
		setClickedAnimation(true);
		setTimeout(() => setClickedAnimation(false), 2000);
	}
	
	return (
    <form>
      <div className="container">
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div className="input-container">
          <label htmlFor="contactNumber">Contact Number</label>
          <input type="text" id="contactNumber" />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
        </div>
        <div className="input-container">
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" />
        </div>
        <div className="input-container">
          <label
            htmlFor="remarks"
            value={remarks}
            onChange={handleRemarksChange}
          >
            Remarks
          </label>
          <select
            name="remarks"
            id="remarks"
            value={remarks}
            onChange={handleRemarksChange}
          >
            <option value="remark1">Remarks 1</option>
            <option value="remark2">Remarks 2</option>
            <option value="others">Others</option>
          </select>
        </div>
        {remarks !== "others" && (
          <div className="input-container">
            <label htmlFor="others">Others</label>
            <textarea type="text" id="others" disabled/>
          </div>
        )}
        {remarks === "others" && (
          <div className="input-container">
            <label htmlFor="others">Others</label>
            <textarea type="text" id="others" />
          </div>
        )}
        <div className="button-container">
          <button className={clickedAnimation ? "form-btn button-bounce" : "form-btn"} type="submit" onClick={bounceAnimation}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
