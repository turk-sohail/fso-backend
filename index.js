const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-1-17T17:30:31.098Z",
    important: false,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2022-1-17T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-1-17T19:20:14.298Z",
    important: false,
  },
  {
    content: " good ",
    date: "2022-10-25T02:58:07.599Z",
    important: true,
    id: 4,
  },
  {
    content: " good content",
    date: "2022-10-25T03:02:23.229Z",
    important: false,
    id: 5,
  },
  {
    content: " bullshit",
    date: "2022-10-25T03:03:04.387Z",
    important: false,
    id: 6,
  },
  {
    content: " learning react",
    date: "2022-10-25T03:05:12.164Z",
    important: false,
    id: 7,
  },
  {
    content: " fullstack react",
    date: "2022-10-25T03:09:26.619Z",
    important: false,
    id: 8,
  },
  {
    content: "add note",
    date: "2022-10-25T03:09:33.146Z",
    important: false,
    id: 9,
  },
  {
    content: " gfdgfdgdf",
    date: "2022-10-25T03:10:07.102Z",
    important: true,
    id: 10,
  },
  {
    content: "add note",
    date: "2022-10-25T16:24:05.931Z",
    important: false,
    id: 11,
  },
  {
    content: " dassdasdasdas",
    date: "2022-10-25T16:24:38.913Z",
    important: false,
    id: 12,
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (!note) {
    res.status(404).end();
  }
  res.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  const note = request.body;
  note.id = maxId + 1;

  notes = notes.concat(note);

  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
