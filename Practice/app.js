// 1. DOM Element Selectors
const counterDisplay = document.getElementById("counter-text");
const allButtons = document.getElementById("all-buttons");
const logList = document.getElementById("log-list");

// 2. Persistent State Variables (Loading on startup)
let currentCount = JSON.parse(localStorage.getItem("count")) || 0;
let changeHistory = JSON.parse(localStorage.getItem("history")) || [];

// 3. UI Sync & Local Storage Save Functions
function updateUI() {
    counterDisplay.textContent = `Counter: ${currentCount}`;
    
    // Sync memory to local storage locker
    localStorage.setItem("count", JSON.stringify(currentCount));
    localStorage.setItem("history", JSON.stringify(changeHistory));
    
    pushLi();
}

function pushLi() {
    logList.innerHTML = ""; // Prevent ghost duplicates

    changeHistory.forEach(function(singleLog) {
        let newLi = document.createElement("li");
        newLi.textContent = singleLog;

        newLi.classList.add("bg-gray-800/50", "px-3", "py-1.5", "rounded-lg", "border-l-2", "text-gray-300");

        // Strict evaluation of log types for dynamic borders
        if (singleLog === "Subtracted 1") {
            newLi.classList.add("border-rose-500");
        } else {
            newLi.classList.add("border-emerald-500");
        }

        logList.appendChild(newLi);
    });
}

// 4. Action Handlers (State Modifications)
function handleIncrement() {
    currentCount += 1;
    changeHistory.push("Added 1");
    updateUI();
}

function handleDecrement() {
    if (currentCount <= 0) {
        alert("Cannot go below 0");
        return; 
    }
    currentCount -= 1;
    changeHistory.push("Subtracted 1");
    updateUI();
}

function handleReset() {
    currentCount = 0;
    changeHistory = [];
    updateUI();
}

// 5. Event Delegator
allButtons.addEventListener("click", function(event) {
    switch(event.target.id) {
        case "btn-add": 
            handleIncrement();
            break;
        case "btn-sub": 
            handleDecrement();
            break;
        case "btn-reset": 
            handleReset();
            break;
        default: 
            break;
    }
});

// 6. Startup Kickstart (Synchronizes the view with stored memory immediately)
updateUI();