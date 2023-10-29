import appFuncs from './applogics';
import renderer from './renderDynamic';
import overlayedContentRenderer from './overlayedContentRenderer';

const formHandler = (() => {
  let funcToExecOnConsent;
  let params;
  function handleTaskForm(e) {
    const data = new FormData(e.currentTarget);
    appFuncs.createToDoTask(
      data.get('task-name'),
      data.get('task-des'),
      data.get('proj-name'),
      data.get('due-date'),
      data.get('priority'),
      data.get('done-status') === 'done',
    );
    overlayedContentRenderer.hideOverlayedContent();
    renderer.renderTaskList();
  }
  function fillTaskForm(formId) {
    const form = document.querySelector(formId);
    const task = appFuncs.getTask(params.projName, params.taskId);

    Array.from((new FormData(form)).keys()).slice(0, -1).forEach((key) => {
      form.querySelector(`#${key}`).value = task[key];
    });
    form.querySelector('#done-status').checked = task.doneStatus;
  }
  function handleEditForm(e) {
    const data = new FormData(e.currentTarget);
    if (data.get('proj-name') === params.projName) {
      const task = appFuncs.getTask(params.projName, params.taskId);
      Array.from(data.entries()).slice(0, -1).forEach(([key, value]) => {
        task[key] = value;
      });
      task.doneStatus = (data.get('done-status') === 'done');
    } else {
      appFuncs.deleteTask(params);
      appFuncs.createToDoTask(
        data.get('task-name'),
        data.get('task-des'),
        data.get('proj-name'),
        data.get('due-date'),
        data.get('priority'),
        data.get('done-status') === 'done',
      );
    }
    overlayedContentRenderer.hideOverlayedContent();
    renderer.renderTaskList();
  }
  function handleProjForm(e) {
    const data = new FormData(e.currentTarget);
    appFuncs.createProject(data.get('proj-name'));
    overlayedContentRenderer.hideOverlayedContent();
    renderer.renderTaskList();
  }
  function hadleConsentForm() {
    funcToExecOnConsent(params);
  }
  function setFuncToExecOnConsent(func, passedParams) {
    funcToExecOnConsent = func;
    params = { ...passedParams };
  }
  function setParams(passedParams) {
    params = { ...passedParams };
  }
  return {
    hadleConsentForm,
    setFuncToExecOnConsent,
    fillTaskForm,
    setParams,
    'task-form': handleTaskForm,
    'proj-form': handleProjForm,
    'edit-form': handleEditForm,
  };
})();

export default formHandler;
