const sessionRouter = require("express").Router();
const Session = require("../models/session");

sessionRouter.get("/", async (request, response) => {
  try {
    const sessions = await Session.find({}).populate("participants");
    response.json(sessions);
  } catch (error) {
    response
      .status(500)
      .json({error: "An error occurred while fetching sessions"});
  }
});

sessionRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const session = await Session.findById(id);
    if (session) {
      response.json(session);
      console.log(`Displayed session with id of ${id}`);
      console.log("Session", session);
    } else {
      response.status(404).json({error: `No session with id of ${id} found`});
    }
  } catch (error) {
    console.error("Error fetching session:", error.message);
    response.status(500).json({error: "Internal server error"});
  }
});


sessionRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const session = new Session({
    day: body.day,
    session: body.session,
		maxParticipants: body.maxParticipants
  });

  try {
    const savedSession = await session.save();
    response.json(savedSession);
  } catch (error) {
    next(error);
  }
});

sessionRouter.delete("/:id", async (request, response, next) => {
  try {
    await Session.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

sessionRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const session = new Session({
    day: body.day,
    session: body.session,
		maxParticipants: body.maxParticipants
  });

  try {
    const updatedSession = await Session.findByIdAndUpdate(
      request.params.id,
      session,
      {new: true}
    );
    response.json(updatedSession);
  } catch (error) {
    next(error);
  }
});


module.exports = sessionRouter;
