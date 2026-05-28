const { generateId, isValidNote } = require("../utils");

describe("generateId", () => {
  test("gibt 1 zurueck, wenn die Liste leer ist", () => {
    expect(generateId([])).toBe(1);
  });

  test("gibt maxId + 1 bei aufeinanderfolgenden IDs zurueck", () => {
    const notes = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(generateId(notes)).toBe(4);
  });

  test("beruecksichtigt die hoechste ID unabhaengig von der Reihenfolge", () => {
    const notes = [{ id: 5 }, { id: 2 }, { id: 9 }, { id: 1 }];
    expect(generateId(notes)).toBe(10);
  });
});

describe("isValidNote", () => {
  test("true, wenn content vorhanden ist", () => {
    expect(isValidNote({ content: "eine Notiz" })).toBe(true);
  });

  test("false, wenn content fehlt", () => {
    expect(isValidNote({ important: true })).toBe(false);
  });
});
