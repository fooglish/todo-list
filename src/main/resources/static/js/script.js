const openModalBtn = document.querySelector("[data-modal-target]");
const closeModalBtn = document.querySelector("[data-modal-close]");
const overlay = document.getElementById("overlay");

//init
(() => {
  fetch("todo/")
    .then((response) => response.json())
    .then((data) => {
      let divAmount = document.querySelector(".main").children.length;

      if (divAmount < data.length) {
        for (let j = divAmount; j < data.length; j++) {
          createDiv(j);
        }
      }
      data.forEach((element, i) => {
        let div = document.querySelector(`.main-child-${i}`);

        div.innerHTML = `<p>${getStylePriority(element.priority)} ${element.title}</p>`;
        createDelButtons(i);
      });
    }).catch((error) => alert(`Initialization error: ${error.message}.`)
  );
})();
//fetch footer quote from a 3rd party API
(() => {
  fetch("https://favqs.com/api/qotd")
    .then((response) => response.json())
    .then((response) => {
      document.querySelector(".quoteBlock-body").innerHTML = response.quote.body;
      document.querySelector(".quoteBlock-footer").innerHTML = "&#169 " + response.quote.author;
    }
  );
})();

//POST button
postForm.onsubmit = async (e) => {
  e.preventDefault();
  let form = document.querySelector("#postForm");

  data = {
    title: form.querySelector('input[name="title"]').value,
    priority: form.querySelector('input[name="priority"]').value,
  };

  await fetch("todo/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  checker();
};

function checker() {
  //check and compare the amount of divs and DB elements
  let divAmount = document.querySelector(".main").children.length;

  fetch("todo/")
    .then((response) => response.json())
    .then((data) => {
      let amountDB = data.length;
      if (amountDB > divAmount) {
        //create missing divs and fill them with data from DB
        for (let j = divAmount; j < amountDB; j++) {
          createDiv(j);
          let div = document.querySelector(`.main-child-${j}`);

          div.innerHTML = `<p>${getStylePriority(data[j].priority)} ${data[j].title}</p>`;
          createDelButtons(j);
        }
      }
    }
  );
}

function createDiv(index) {
  let div = document.createElement("div");
  div.className = `main-child-${index}`;
  document.querySelector(".main").append(div);
}

function createDelButtons(index) {
  let delButton = document.createElement("button");
  let indexDB = index + 1;
  delButton.className = `btn-del-${index}`;

  document.querySelector(`.main-child-${index}`).append(delButton);
  //make each button delete the corresponding element in the DB
  document.querySelector(`.btn-del-${index}`).addEventListener("click", async () => {
    fetch(`/todo/delete/${indexDB}`, {
      method: "DELETE",
    });
    document.querySelector(`.btn-del-${index}`).closest("div").style.display = "none";
  });
}

function getStylePriority(priorityValue) {
  switch(priorityValue) {
    case 1:
      return "<span title='Priority: Low'>&#9898</span>";
    case 2:
      return "<span title='Priority: Medium'>&#128993</span>";
    case 3:
      return "<span title='Priority: High'>&#128308</span>";
    case 4:
      return "<span class ='asap' title='ASAP'>&#128293</span>";
  }
}

openModalBtn.addEventListener("click", () => {
  const modal = document.querySelector(openModalBtn.dataset.modalTarget);
  openModal(modal);
});

overlay.addEventListener("click", () => {
  const modal = document.querySelector(".modal.active");
  closeModal(modal);
});

closeModalBtn.addEventListener("click", () => {
  const modal = closeModalBtn.closest(".modal");
  closeModal(modal);
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
