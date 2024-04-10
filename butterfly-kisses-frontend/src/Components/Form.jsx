const Form = () => {
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
          <label htmlFor="remarks">Remarks</label>
          <input type="text" id="remarks" />
        </div>
        <div className="button-container">
          <button className="form-btn" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;