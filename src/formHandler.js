import appFuncs from "./applogics";
import renderer from "./renderDynamic";
import overlayedContentRenderer from "./overlayedContentRenderer";

const formHandler = (() => {
  function handleTaskForm(e) {
    const data = new FormData(e.currentTarget);
    appFuncs.createToDoTask(
      data.get("task-name"),
      data.get("task-des"),
      data.get("proj-name"),
      data.get("due-date"),
      data.get("priority"),
      data.get("done-status") === "done",
    );
    renderer.renderTaskList();
    overlayedContentRenderer.hideOverlayedContent();
  }
  function handleProjForm(e) {
    const data = new FormData(e.currentTarget);
    appFuncs.createProject(data.get("proj-name"));
    renderer.renderTaskList();
    overlayedContentRenderer.hideOverlayedContent();
  }
  return { "task-form": handleTaskForm, "proj-form": handleProjForm };
})();

export default formHandler;
