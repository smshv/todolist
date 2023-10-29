import './css/style.css';
import appFuncs from './applogics';
import renderer from './renderDynamic';
import handleClick from './handleTaskCardEvent';
import overlayedContentRenderer from './overlayedContentRenderer';
import formHandler from './formHandler';

const menuHandler = (() => {
  let event;
  const getterMap = {
    home: [appFuncs.getAllTasks, {}], // 0:method, 1:params
    today: [appFuncs.getAllTasks, {}],
    week: [appFuncs.getAllTasks, {}],
    'proj-list-item': [
      appFuncs.getTaskByProject,
      {
        get projName() {
          return event.target.getAttribute('proj-name');
        },
      },
    ],
  };
  const has = Object.prototype.hasOwnProperty;

  function handleMenuEvent(e) {
    const id = e.target.getAttribute('id');
    if (has.call(getterMap, id)) {
      event = e;
      const [getterMethod, params] = getterMap[id];
      renderer.params = { ...params };
      renderer.taskGetter = getterMethod;
      renderer.renderTaskList();
    }
  }
  return { handleMenuEvent };
})();

appFuncs.createProject('test1');
appFuncs.createProject('test2');
appFuncs.createToDoTask('task1', 'adas', 'test1', '5', 1, true);
appFuncs.createToDoTask('task2', 'adas', 'test1', '5', 2, true);
appFuncs.createToDoTask('task3', 'adas', 'test2', '5', 3, false);
document.querySelector('#proj').addEventListener('mouseover', (e) => {
  e.currentTarget.nextElementSibling.style.visibility = 'visible';
  renderer.renderProjList(appFuncs.getProjectList());
});
document
  .querySelector('#proj')
  .parentElement.addEventListener('mouseleave', (e) => {
    e.currentTarget.lastElementChild.style.visibility = 'hidden';
  });

document.querySelectorAll('.menu-item,.proj-list').forEach((element) => {
  element.addEventListener('click', (e) => {
    menuHandler.handleMenuEvent(e);
  });
});

document.querySelector('#sort').addEventListener('click', (e) => {
  if (renderer.params.isSorted) {
    e.currentTarget.classList.remove('sorted');
  } else {
    e.currentTarget.classList.add('sorted');
  }
  renderer.params.isSorted = !renderer.params.isSorted;
});
renderer.taskGetter = appFuncs.getAllTasks;
renderer.renderTaskList();

document.querySelectorAll('.form-menu-item').forEach((x) => {
  x.addEventListener('click', (e) => {
    overlayedContentRenderer.showOverlayedForm(e.currentTarget.getAttribute('id'));
  });
});

document.querySelector('#add-button').addEventListener('click', () => {
  overlayedContentRenderer.showOverlayedContent('#form-create');
  overlayedContentRenderer.showOverlayedForm();
});
document.querySelectorAll('#cancel, #no, #close').forEach((x) => {
  x.addEventListener('click', () => {
    overlayedContentRenderer.hideOverlayedContent();
  });
});

document.querySelector('#main-body').addEventListener('click', (e) => {
  handleClick(e);
});

document.querySelectorAll('form').forEach((form) => {
  const formId = form.getAttribute('id');
  if (Object.prototype.hasOwnProperty.call(formHandler, formId)) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formHandler[formId](e);
    });
  }
});

document.querySelector('button#yes').addEventListener('click', () => {
  formHandler.hadleConsentForm();
});
