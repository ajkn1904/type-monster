const histories = document.getElementById("histories");

function addHistory(questionText, timeTaken, errorCount, date, minutes, seconds) {
  const newRow = document.createElement("div");
  newRow.classList.add("card");

  newRow.innerHTML = `
  <h3>${questionText}</h3>
  <div>
  <p>You took: <span class="bold">${timeTaken} seconds</span></p>
  <p>You made <span class="bold red">${errorCount}</span> mistakes</p>
  <p><span class="bold">${date}</span></p>
  </div>
  `;

  histories.appendChild(newRow);

  let previousTests = JSON.parse(localStorage.getItem("testHistory")) || [];
  previousTests.push({ questionText, timeTaken, errorCount, date, minutes, seconds});
  localStorage.setItem("testHistory", JSON.stringify(previousTests));

  displayHistory();
}

function displayHistory() {
  histories.innerHTML = "";
  const previousTests = JSON.parse(localStorage.getItem("testHistory")) || [];

  previousTests.forEach((test) => {
    const newRow = document.createElement("div");
    newRow.classList.add("card");

    newRow.innerHTML = `
  <h3>${test.questionText}</h3>


  <p>You took: <span class="bold">${test?.minutes ? test.minutes +"</span> minutes<span class='bold'>"  : 0 +"</span> minute"} </span> <span class="bold">${test?.seconds ? test.seconds +"</span> seconds<span class='bold'>"  : 0 +"</span> second"}</p>

  <p>You made <span class="bold red">${(test.errorCount != 0) ? test.errorCount +"</span> mistakes <span class='bold'>"  : test.errorCount +"</span> mistake"}</p>
  <p><span class="bold">${test.date}</span></p>
  `;

    histories.appendChild(newRow);
  });
}

//Clear history
const clearHistorey = () => {
  const confirmation =  confirm("Your history will be permanently deleted.")
  if(confirmation){
    localStorage.clear();
    histories.innerHTML = "";
  }
  return;
}
