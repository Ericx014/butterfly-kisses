const makeupparticipantRouter = require("express").Router();
const Makeupparticipant = require("../models/makeupparticipant");
const Makeupsession = require("../models/makeupsession");

makeupparticipantRouter.get("/", async (request, response) => {
  try {
    const participants = await Makeupparticipant.find({}).populate("session");
    response.json(participants);
  } catch (error) {
    response.status(500).json({error: "Internal server error"});
  }
});

makeupparticipantRouter.get("/:id", async (request, response, next) => {
  try {
    const participants = await Makeupparticipant.findById(request.params.id);
    if (participants) {
      response.json(participants);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

makeupparticipantRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const {name, studentId, contactNo, email, gender, age, day} = request.body;

  try {
    const foundSession = await Makeupsession.findById(body.session);
    const newParticipant = new Makeupparticipant({
      name,
      studentId,
      contactNo,
      email,
      gender,
      age,
      day,
      session: foundSession._id,
    });
    const savedParticipant = await newParticipant.save();
    foundSession.participants.push(savedParticipant._id);
    await foundSession.save();
    response.json(savedParticipant);
  } catch (error) {
    next(error);
  }
});

makeupparticipantRouter.delete("/:id", async (request, response, next) => {
  try {
    await Makeupparticipant.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

makeupparticipantRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const participant = new Makeupparticipant({
    name: body.name,
    studentId: body.studentId,
    contactNo: body.contactNo,
    email: body.email,
    gender: body.gender,
    age: body.age,
    day: body.day,
    session: body.session,
  });

  try {
    const updatedParticipant = await Makeupparticipant.findByIdAndUpdate(
      request.params.id,
      participant,
      {new: true}
    );
    response.json(updatedParticipant);
  } catch (error) {
    next(error);
  }
});

module.exports = makeupparticipantRouter;
