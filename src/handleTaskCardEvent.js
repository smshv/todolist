import overlayedContentRenderer from './overlayedContentRenderer';
import formHandler from './formHandler';
import appFuncs from './applogics';

function showTaskDetails({ projName, taskId }) {
  document.querySelector('p#task-details').textContent = appFuncs.getTask(projName, taskId).taskDetails;
  overlayedContentRenderer.showOverlayedContent('div#task-details-container');
}

export default function handleClick(e) {
  const elemClass = e.target.classList[0];
  switch (elemClass) {
    case 'edit-button':
      formHandler.setParams({
        projName: e.target.parentElement.getAttribute('proj-name'),
        taskId: e.target.parentElement.getAttribute('id'),
      });
      formHandler.fillTaskForm('#edit-form');
      overlayedContentRenderer.showOverlayedContent('div#edit-form-wrapper');
      break;
    case 'delete-button':
      document.querySelector('p#consent-msg').textContent = 'Do you really want to delete the task?';
      overlayedContentRenderer.showOverlayedContent('div#ask-consent');
      formHandler.setFuncToExecOnConsent(appFuncs.deleteTask, {
        projName: e.target.parentElement.getAttribute('proj-name'),
        taskId: e.target.parentElement.getAttribute('id'),
      });
      break;
    case 'task-details':
      showTaskDetails({
        projName: e.target.parentElement.getAttribute('proj-name'),
        taskId: Number(e.target.parentElement.getAttribute('id')),
      });
      break;
    default:
      break;
  }
}
