let list = JSON.parse(window.localStorage.getItem("todoList"))
  || [{ done: false, data: "content1" }];
// {done：true,data:"content"}

const body = document.querySelector(".todo .body");
const foot = document.querySelector(".todo .foot");
const optionRadios = document.querySelector(".todo .foot .option");
const clearButton = document.querySelector(".todo .foot .clear");
const markAllRadio = document.querySelector(".todo .head #markAll");
const inputText = document.querySelector(".todo .head #input");
let option = 1
// option 1: all 2： active 3： complete
function updateBody() {
  body.innerHTML = ""
  let test = (item) => {
    if (option == "2") {
      return !item.done;
    } else if (option == "3") {
      return item.done;
    }
    return true;
  }
  list.forEach((item, idx) => {
    if (test(item)) {
      addItemToBody(item, idx);
    }
  });

}


function addItemToBody(item, idx) {
  const itembox = document.createElement("div");
  body.appendChild(itembox);
  itembox.dataset["index"] = idx;
  const inputDone = document.createElement("input");
  inputDone.type = "checkbox";
  const divContent = document.createElement("div");
  const inputDel = document.createElement("input");
  inputDel.type = "checkbox";
  itembox.appendChild(inputDone);
  itembox.appendChild(divContent);
  itembox.appendChild(inputDel);

  itembox.classList.add("item");
  inputDone.classList.add("done");
  divContent.classList.add("content");
  inputDel.classList.add("del");

  if (item.done) {
    divContent.classList.add("delContent");
    inputDone.checked = true;
  }
  divContent.textContent = item.data;

  addClickEvent(itembox);
}

function updateFoot() {
  if (list.length == 0) {
    foot.style.display = "none";
  } else {
    foot.style.display = "block";
  }
  let count = 0;
  list.forEach(it => {
    if (!it.done) {
      count++;
    }
  })
  const stateBox = foot.querySelector(".state");
  stateBox.textContent = `${count} item left`
}


function addClickEvent(itembox) {
  itembox.addEventListener("click", (e) => {
    console.log(e);
    let index = e.target.parentElement.dataset.index;
    if (e.target.matches(".done")) {
      list[index].done = !list[index].done;
      stateChange();
    }
    if (e.target.matches(".del")) {
      list.splice(index, 1);
      stateChange();
    }
  })
}

optionRadios.addEventListener("change", (e) => {
  option = e.target.value;
  stateChange();
})
clearButton.addEventListener("click", (e) => {
  list = list.filter(it => !it.done);
  stateChange();
})
markAllRadio.addEventListener("change", e => {
  list.forEach(it => {
    it.done = (e.target.checked == true);
  })
  stateChange();
})

function checkAllDone() {
  if (list.length == 0) {
    markAllRadio.style.display = "none";
  } else { 
    markAllRadio.style.display = "block";
  }
  let isAllDone = list.every(it => it.done);
  if (isAllDone) {
    markAllRadio.checked = true;
  } else {
    markAllRadio.checked = false;
  }
}

function storeList() {
  window.localStorage.setItem("todoList", JSON.stringify(list));
}

inputText.addEventListener("keypress", e => {
  if (e.key == "Enter") {
    list.unshift(
      {
        done: false,
        data: inputText.value
      });
    inputText.value = "";
    stateChange();
  }
})

function stateChange() {
  updateFoot();
  storeList();
  updateBody();
  checkAllDone();
}
stateChange()

