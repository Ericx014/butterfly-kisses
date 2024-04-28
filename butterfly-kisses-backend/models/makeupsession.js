const mongoose = require("mongoose");

const makeupsessionSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
	time: {
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
			ref: "Makeup Participant"
		}
	]
});

makeupsessionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Makeup Session", makeupsessionSchema);
