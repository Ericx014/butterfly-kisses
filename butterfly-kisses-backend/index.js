const express = require("express");
const app = express();
require("dotenv").config();

// const Note = require("./models/note");
const Participant = require("./models/participant");

app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({error: "malformatted id"});
  } else if (error.name === "ValidationError") {
    return response.status(400).json({error: error.message});
  }
  next(error);
};

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: "unknown endpoint"});
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/participants", (request, response) => {
  Participant.find({}).then((participants) => {
    response.json(participants);
  });
});

app.post("/api/participants", (request, response, next) => {
  const body = request.body;

  const participant = new Participant({
    name: body.name,
    contactNo: body.contactNo,
    email: body.email,
    gender: body.gender,
    age: body.age,
    remarks: body.remarks,
    others: body.others,
  });

  participant
    .save()
    .then((savedParticipant) => {
      response.json(savedParticipant);
    })
    .catch((error) => next(error));
});

app.get("/api/participants/:id", (request, response, next) => {
  Participant.findById(request.params.id)
    .then((participant) => {
      if (participant) {
        response.json(participant);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/participants/:id", (request, response, next) => {
  Participant.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/participants/:id", (request, response, next) => {
  const {content, important} = request.body;

  Participant.findByIdAndUpdate(
    request.params.id,
    {content, important},
    {new: true, runValidators: true, context: "query"}
  )
    .then((updatedParticipant) => {
      response.json(updatedParticipant);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
