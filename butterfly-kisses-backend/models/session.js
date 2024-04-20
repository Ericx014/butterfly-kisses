const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
	maxParticipants: {
		type: Number,
		required: true,
	},
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Participant"
		}
	]
});

sessionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Session", sessionSchema);
