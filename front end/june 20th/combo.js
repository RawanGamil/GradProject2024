let timerInterval; // Define timerInterval globally
let lastClickTime = null; // Initialize lastClickTime globally
let completedUrgentTasks = 0;
let completedMediumTasks = 0;
let completedLowTasks = 0;
let totalCompletedTasks = 0;
// Function to update the circular progress bar percentage
function updateProgress(progressElement, percentage) {
  const radius = progressElement.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  progressElement.style.strokeDasharray = circumference;
  progressElement.style.strokeDashoffset = offset;
}

// Function to update the circular progress bar in a task card
function updateProgressBar(taskCard, completedTasks, totalTasks) {
  const progressElement = taskCard.querySelector(".progress-ring__progress");
  const percentageElement = taskCard.querySelector(
    ".progress-ring__percentage"
  );

  const percentage = (completedTasks / totalTasks) * 100;
  console.log("Percentage:", percentage);
  updateProgress(progressElement, percentage);
  percentageElement.textContent = Math.round(percentage) + "%";
}

function handleTaskCompletion(taskCard, completedTasks, totalTasks) {
  // Update the circular progress bar with the updated percentage
  console.log("Completed tasks:", completedTasks);
  console.log("Total tasks:", totalTasks);
  updateProgressBar(taskCard, completedTasks, totalTasks);

  let totalCompletedTasksElement = document.querySelector("#completed-task-no");
  let tasksCompleted = parseInt(totalCompletedTasksElement.textContent);
  totalCompletedTasksElement.textContent = tasksCompleted + 1;

  // Reset the timer display to 0:0:0
  document.getElementById("elapsed-time").textContent = "0 : 0 : 0";
}

function handleTotalTaskCompletion(taskCard, completedTasks, totalTasks) {
  // Update the circular progress bar with the updated percentage
  updateProgressBar(taskCard, completedTasks, totalTasks);
}

document.addEventListener("DOMContentLoaded", function () {
  // Function to check if all tasks in a list are finished
  function areAllTasksFinished(taskListSelector) {
    const allTasks = document.querySelectorAll(taskListSelector + " li");
    return Array.from(allTasks).every((task) =>
      task.classList.contains("finished")
    );
  }

  let lastClickTime = null;

  const tasks = document.querySelectorAll(".task-list li");
  const urgentTaskCard = document.querySelector(".task-card.urgent");
  const mediumTaskCard = document.querySelector(".task-card.medium");
  const lowTaskCard = document.querySelector(".task-card.low");
  const totalTasksCard = document.querySelector(".task-card.total-progress");
  const urgentTaskList = document.querySelectorAll(".task-list.urgent li");
  const mediumTaskList = document.querySelectorAll(".task-list.medium li");
  const lowTaskList = document.querySelectorAll(".task-list.low li");
  const currentTask = document.getElementById("current-task-name");
  const finishTaskButton = document.getElementById("finish-task-btn");
  const completedTextUrgent = document.querySelectorAll(".completed")[0];
  const completedTextMedium = document.querySelectorAll(".completed")[1];
  const completedTextLow = document.querySelectorAll(".completed")[2];
  const hideTasksButtons = document.querySelectorAll(".hide-tasks-button");
  const pauseResumeBtn = document.getElementById("pause-task-btn");

  hideTasksButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetList = button.parentNode.querySelector("ul");

      if (targetList.style.display === "none") {
        targetList.style.display = "block";
        button.innerText = "Hide Tasks";
      } else {
        targetList.style.display = "none";
        button.innerText = "Show Tasks";
      }
    });
  });

  tasks.forEach((task) => {
    if (task.classList.contains("finished")) {
      // If it's finished, return early and don't make any changes
      return;
    }

    task.addEventListener("click", () => {
      tasks.forEach((item) => {
        item.classList.remove("active");
      });

      if (task.classList.contains("finished") == false) {
        task.classList.add("active");
        currentTask.innerText = task.innerHTML;
        start();
      }

      // Update last click time with current time immediately
      lastClickTime = new Date();

      // Get previous click time from data attribute
      const lastClickTimeString = task.getAttribute("data-last-click-time");
      const previousClickTime = lastClickTimeString
        ? new Date(lastClickTimeString)
        : null;

      // Update data attribute with current click time
      task.setAttribute("data-last-click-time", lastClickTime);

      // Calculate elapsed time in milliseconds
      const elapsedTime = previousClickTime
        ? lastClickTime - previousClickTime
        : 0;

      // Convert elapsed time to hours, minutes, and seconds

      startTimer();

      function startTimer() {
        clearInterval(timerInterval); // Clear any existing interval to avoid multiple intervals running simultaneously

        timerInterval = setInterval(() => {
          const currentTime = new Date();
          const elapsedTime = currentTime - lastClickTime;
          const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
          const minutes = Math.floor(
            (elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
          const elapsedTimeMessage = `${hours} : ${minutes} : ${seconds}`;
          document.getElementById("elapsed-time").textContent =
            elapsedTimeMessage;
        }, 1000); // Update elapsed time every second
      }
    });
  });

  // Add event listener to the "Finish Task" button
  finishTaskButton.addEventListener("click", () => {
    // Find the currently active task
    const activeTask = document.querySelector(".task-list li.active");
    if (activeTask) {
      // Add the "finished" class to the active task
      activeTask.classList.remove("active");
      activeTask.classList.add("finished");

      clearInterval(timerInterval); // Stop the timer

      // Determine the type of task card and call the corresponding completion handler
      if (activeTask.parentNode.classList.contains("urgent")) {
        handleUrgentTaskCompletion();
      } else if (activeTask.parentNode.classList.contains("medium")) {
        handleMediumTaskCompletion();
      } else if (activeTask.parentNode.classList.contains("low")) {
        handleLowTaskCompletion();
      }

      // Check if all tasks in each type of task list are finished
      if (areAllTasksFinished(".task-list.urgent")) {
        const children = urgentTaskCard.querySelectorAll("*");
        children.forEach((child) => {
          child.classList.add("hidden");
        });

        // Show the #completed element
        completedTextUrgent.classList.remove("hidden");
      }

      if (areAllTasksFinished(".task-list.medium")) {
        const children = mediumTaskCard.querySelectorAll("*");
        children.forEach((child) => {
          child.classList.add("hidden");
        });

        // Show the #completed element
        completedTextMedium.classList.remove("hidden");
      }

      if (areAllTasksFinished(".task-list.low")) {
        const children = lowTaskCard.querySelectorAll("*");
        children.forEach((child) => {
          child.classList.add("hidden");
        });

        // Show the #completed element
        completedTextLow.classList.remove("hidden");
      }
    }
  });

  // Initial number of tasks
  const totalUrgentTasks = urgentTaskList.length;
  console.log("Total urgent tasks:", totalUrgentTasks);
  const totalMediumTasks = mediumTaskList.length;
  console.log("Total medium tasks:", totalMediumTasks);
  const totalLowTasks = lowTaskList.length;
  console.log("Total low tasks:", totalLowTasks);
  const totalTaskNumber = totalUrgentTasks + totalMediumTasks + totalLowTasks;
  console.log(totalTaskNumber);

  document.querySelector("#total-task-no").innerHTML = totalTaskNumber;

  let totalProgressBarElement = document.querySelector("#total-progress");
  updateProgress(totalProgressBarElement, 0);
  let totalPercentage = (totalCompletedTasks / totalTaskNumber) * 100;

  // Example: Handle completion of an urgent task
  function handleUrgentTaskCompletion() {
    completedUrgentTasks++;
    console.log("Completed urgent tasks:", completedUrgentTasks);
    handleTaskCompletion(
      urgentTaskCard,
      completedUrgentTasks,
      totalUrgentTasks
    );

    totalCompletedTasks++;
    handleTotalTaskCompletion(
      totalTasksCard,
      totalCompletedTasks,
      totalTaskNumber
    );
  }

  // Example: Handle completion of a medium task
  function handleMediumTaskCompletion() {
    completedMediumTasks++;
    console.log("Completed medium tasks:", completedMediumTasks);
    handleTaskCompletion(
      mediumTaskCard,
      completedMediumTasks,
      totalMediumTasks
    );

    totalCompletedTasks++;
    handleTotalTaskCompletion(
      totalTasksCard,
      totalCompletedTasks,
      totalTaskNumber
    );
  }

  // Example: Handle completion of a low task
  function handleLowTaskCompletion() {
    completedLowTasks++;
    console.log("Completed low tasks:", completedLowTasks);
    handleTaskCompletion(lowTaskCard, completedLowTasks, totalLowTasks);

    totalCompletedTasks++;
    handleTotalTaskCompletion(
      totalTasksCard,
      totalCompletedTasks,
      totalTaskNumber
    );
  }
});
