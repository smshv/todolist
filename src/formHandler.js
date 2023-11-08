import appFuncs from './applogics';
import renderer from './renderDynamic';
import overlayedContentRenderer from './overlayedContentRenderer';

const formHandler = (() => {
  let funcToExecOnConsent;
  let params;
  function handleTaskForm(e) {
    const formData = new FormData(e.currentTarget);
    appFuncs.createToDoTask( formData);
    overlayedContentRenderer.hideOverlayedContent();
    renderer.renderTaskList();
  }
  function fillTaskForm(formId) {
    const form = document.querySelector(formId);
    const task = appFuncs.getTask(params.projName, params.taskName);
    Array.from((new FormData(form)).keys()).slice(0, 6).forEach((key) => {
      form.querySelector(`#${key}`).value = task[key];
    });
    form.querySelector('#done-status').checked = task.doneStatus;
  }
  function handleEditForm(e) {
    const formData = new FormData(e.currentTarget);
    appFuncs.editToDoTask(formData, params.projName, params.taskName);
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
    renderer.renderTaskList();
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
