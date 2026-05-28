const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

beforeEach(() => {
  app.resetNotes();
});

test("GET /api/notes liefert alle Notizen als JSON", async () => {
  const response = await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(3);
});

test("GET /api/notes/:id liefert eine einzelne Notiz", async () => {
  const response = await api.get("/api/notes/1").expect(200);

  expect(response.body.content).toBe("HTML is easy");
});

test("GET /api/notes/:id liefert 404 bei unbekannter ID", async () => {
  await api.get("/api/notes/9999").expect(404);
});

test("POST /api/notes legt eine neue Notiz an", async () => {
  const newNote = { content: "Test-Notiz", important: true };

  const response = await api.post("/api/notes").send(newNote).expect(200);

  expect(response.body.content).toBe("Test-Notiz");

  const allNotes = await api.get("/api/notes");
  expect(allNotes.body).toHaveLength(4);
});

test("POST /api/notes ohne content liefert 400", async () => {
  await api.post("/api/notes").send({ important: true }).expect(400);
});

test("DELETE /api/notes/:id entfernt eine Notiz", async () => {
  await api.delete("/api/notes/1").expect(204);

  const allNotes = await api.get("/api/notes");
  expect(allNotes.body).toHaveLength(2);
});
