const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
	studentId: {
		type: String,
		required: false
	},
  contactNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
  }
});

participantSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Participant", participantSchema);
