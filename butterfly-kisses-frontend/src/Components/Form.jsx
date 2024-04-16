import { useState } from "react";

const Form = () => {
  const [remarks, setRemarks] = useState("");
	const [clickedAnimation, setClickedAnimation] = useState(false);
	const [value, setValue] = useState("");

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
          <input type="text" id="name" placeholder="Ali bin Abu" />
        </div>
        <div className="input-container">
          <label htmlFor="contactNumber">Contact no.</label>
          <input type="text" id="contactNumber" placeholder="01144598329" />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="alibinabu@gmail.com" />
        </div>
        <div className="input-container">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            className={remarks == "" ? "placeholder" : ""}
          >
            <option value="" className="placeholder">
              Select an option
            </option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" placeholder="21" />
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
            className={remarks == "" ? "placeholder" : ""}
          >
            <option value="" className="placeholder">
              Select an option
            </option>
            <option value="remark1">Option 1</option>
            <option value="remark2">Option 2</option>
            <option value="others">Others</option>
          </select>
        </div>
        {remarks !== "others" && (
          <div className="input-container">
            <label htmlFor="others">Others</label>
            <textarea type="text" id="others" disabled placeholder="Select other remarks to enter"/>
          </div>
        )}
        {remarks === "others" && (
          <div className="input-container">
            <label htmlFor="others">Others</label>
            <textarea type="text" id="others" placeholder="Enter other remarks here"/>
          </div>
        )}
        <div className="button-container">
          <button
            className={clickedAnimation ? "form-btn button-bounce" : "form-btn"}
            type="submit"
            onClick={bounceAnimation}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
