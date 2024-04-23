const participantRouter = require("express").Router();
const Participant = require("../models/participant");
const Session = require("../models/session");
const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
  const authorization = request.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({error: "Token missing or invalid"});
  }

  request.userId = decodedToken.id;
  next();
};

participantRouter.get("/", verifyToken, async (request, response) => {
	try {
    const participants = await Participant.find({}).populate("session");
    response.json(participants);
  } catch (error) {
    response.status(500).json({error: "Internal server error"});
  }
});

participantRouter.get("/:id", async (request, response, next) => {
  try {
    const participants = await Participant.findById(request.params.id);
    if (participants) {
      response.json(participants);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

participantRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const {name, studentId, contactNo, email, gender, age, day} =
    request.body;

  try {
    const foundSession = await Session.findById(body.session);
    const newParticipant = new Participant({
      name,
      studentId,
      contactNo,
      email,
      gender,
      age,
      day,
      session: foundSession._id
    });
			const savedParticipant = await newParticipant.save();
			foundSession.participants.push(savedParticipant._id);
			await foundSession.save();
			response.json(savedParticipant);
  } catch (error) {
    next(error);
  }
});


participantRouter.delete("/:id", async (request, response, next) => {
  try {
    await Participant.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

participantRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const participant = new Participant({
    name: body.name,
		studentId: body.studentId,
    contactNo: body.contactNo,
    email: body.email,
    gender: body.gender,
    age: body.age,
    day: body.day,
    session: body.session
  });

  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(
      request.params.id,
      participant,
      {new: true}
    );
    response.json(updatedParticipant);
  } catch (error) {
    next(error);
  }
});

module.exports = participantRouter;
