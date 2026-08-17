const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/topics", (req, res) => {
  res.json([
    { id: "arrays", name: "Arrays", level: "Beginner" },
    { id: "searching", name: "Searching", level: "Beginner" },
    { id: "sorting", name: "Sorting", level: "Intermediate" },
    { id: "stack", name: "Stack", level: "Beginner" },
    { id: "linked-list", name: "Linked List", level: "Intermediate" }
  ]);
});

app.get("/api/problems", (req, res) => {
  res.json([
    { id: 1, title: "Find Largest Element", topic: "Arrays", difficulty: "Easy" },
    { id: 2, title: "Binary Search", topic: "Searching", difficulty: "Easy" },
    { id: 3, title: "Bubble Sort", topic: "Sorting", difficulty: "Easy" }
  ]);
});

app.post("/api/progress", (req, res) => {
  const { problemId } = req.body;
  res.json({ success: true, message: `Problem ${problemId} marked as solved.` });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Algo Vortex running at http://localhost:${PORT}`);
});
