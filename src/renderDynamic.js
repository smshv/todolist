function createDomElem(
  type,
  classList = [],
  attributes = [],
  innerHTML = null,
  textContent = null,
) {
  const element = document.createElement(type);

  attributes.forEach((attr) => {
    element.setAttribute(attr[0], attr[1]);
  });

  classList.forEach((className) => {
    element.classList.add(className);
  });
  if (innerHTML) {
    element.innerHTML = innerHTML;
  } else if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

const renderer = (() => {
  function renderProjCard(task, id, parent, currentCard = null) {
    const card =
      currentCard ||
      createDomElem(
        "div",
        ["task-card"],
        [
          ["proj-name", task.projName],
          ["id", id],
        ],
        null,
        null,
      );
    card.classList.add(`priority_${task.priority.toString()}`);

    if (task.doneStatus) {
      card.classList.add("done");
    }
    card.appendChild(
      createDomElem(
        "div",
        ["status", task.doneStatus ? "done" : "not-done"],
        [],
        "<span>√</span>",
        null,
      ),
    );
    card.appendChild(
      createDomElem("span", ["task-header"], [], null, task.title),
    );
    card.appendChild(
      createDomElem(
        "span",
        ["proj-name"],
        [],
        null,
        `Project: ${task.projName}`,
      ),
    );
    card.appendChild(
      createDomElem("button", ["task-details"], [], null, "Details"),
    );
    card.appendChild(createDomElem("p", ["due-date"], [], null, task.dueDate));
    card.appendChild(
      createDomElem(
        "img",
        ["edit-button"],
        [["src", "Images/edit.svg"]],
        null,
        null,
      ),
    );
    card.appendChild(
      createDomElem(
        "img",
        ["delete-button"],
        [["src", "Images/delete.svg"]],
        null,
        null,
      ),
    );
    parent.appendChild(card);
  }

  function renderTaskList(params) {
    const mainBody = document.querySelector("#task-card-container");
    while (mainBody.lastElementChild) {
      mainBody.removeChild(mainBody.lastElementChild);
    }
    this.taskGetter({ ...this.params, ...params }).forEach((task) => {
      renderProjCard(task[0], task[1], mainBody);
    });
  }

  function renderProjList(projNames) {
    const projList = document.querySelector(".proj-list");
    while (projList.lastElementChild) {
      projList.removeChild(projList.lastElementChild);
    }
    projNames.forEach((projName) => {
      projList.appendChild(
        createDomElem(
          "li",
          ["menu-item"],
          [
            ["id", "proj-list-item"],
            ["proj-name", projName],
          ],
          null,
          projName,
        ),
      );
    });
  }

  return {
    taskGetter: null,
    params: { isSorted: false },
    renderProjCard,
    renderTaskList,
    renderProjList,
  };
})();

export default renderer;
