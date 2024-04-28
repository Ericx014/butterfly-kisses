const makeupsessionRouter = require("express").Router();
const Makeupsession = require("../models/makeupsession");

makeupsessionRouter.get("/", async (request, response) => {
  try {
    const makeupsession = await Makeupsession.find({}).populate("participants");
    response.json(makeupsession);
  } catch (error) {
    response
      .status(500)
      .json({error: "An error occurred while fetching sessions"});
  }
});

makeupsessionRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const makeupsession = await Makeupsession.findById(id);
    if (makeupsession) {
      response.json(makeupsession);
      console.log(`Displayed session with id of ${id}`);
      console.log("Session", makeupsession);
    } else {
      response.status(404).json({error: `No session with id of ${id} found`});
    }
  } catch (error) {
    console.error("Error fetching session:", error.message);
    response.status(500).json({error: "Internal server error"});
  }
});

makeupsessionRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const makeupsession = new Makeupsession({
    day: body.day,
    time: body.time,
    session: body.session,
    maxParticipants: body.maxParticipants,
  });

  try {
    const savedSession = await makeupsession.save();
    response.json(savedSession);
  } catch (error) {
    next(error);
  }
});

makeupsessionRouter.delete("/:id", async (request, response, next) => {
  try {
    await Makeupsession.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

makeupsessionRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const session = new Makeupsession({
    day: body.day,
    session: body.session,
    maxParticipants: body.maxParticipants,
  });

  try {
    const updatedSession = await Makeupsession.findByIdAndUpdate(
      request.params.id,
      session,
      {new: true}
    );
    response.json(updatedSession);
  } catch (error) {
    next(error);
  }
});

module.exports = makeupsessionRouter;
