const barsContainer = document.getElementById("bars");
const statusText = document.getElementById("status");
let values = [];

function createArray() {
  values = Array.from(
    { length: 22 },
    () => Math.floor(Math.random() * 90) + 10
  );
  renderBars();
  statusText.textContent = "New array generated.";
}

function renderBars(active = []) {
  barsContainer.innerHTML = "";
  values.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.className = "bar-item";
    if (active.includes(index)) bar.classList.add("active");
    bar.style.height = `${value * 2.5}px`;
    bar.title = value;
    barsContainer.appendChild(bar);
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function bubbleSort() {
  const button = document.getElementById("start-sort");
  button.disabled = true;
  statusText.textContent = "Sorting...";

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length - i - 1; j++) {
      renderBars([j, j + 1]);
      await sleep(180);

      if (values[j] > values[j + 1]) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        renderBars([j, j + 1]);
        await sleep(180);
      }
    }
  }

  renderBars();
  statusText.textContent = "Sorted! Time Complexity: O(n²)";
  button.disabled = false;
}

async function loadTopics() {
  const response = await fetch("/api/topics");
  const topics = await response.json();

  document.getElementById("topic-list").innerHTML = topics
    .map(
      (topic) => ` <div class="topic-card"> <h3>${topic.name}</h3> <p>${topic.level} • Learn & Practice</p> </div> `
    )
    .join("");
}

async function loadProblems() {
  const response = await fetch("/api/problems");
  const problems = await response.json();

  document.getElementById("problem-list").innerHTML = problems
    .map(
      (problem) => ` <div class="problem"> <div> <h3>${problem.title}</h3> <p>${problem.topic}</p> </div> <div> <span class="difficulty">${problem.difficulty}</span> <button onclick="solveProblem(${problem.id})">Mark Solved</button> </div> </div> `
    )
    .join("");
}

async function solveProblem(id) {
  const response = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ problemId: id }),
  });
  const result = await response.json();
  alert(result.message);
}

document.getElementById("new-array").addEventListener("click", createArray);
document.getElementById("start-sort").addEventListener("click", bubbleSort);

createArray();
loadTopics();
loadProblems();
