import overlayedContentRenderer from "./overlayedContentRenderer";

export default function handleClick(e) {
  const elemClass = e.target.classList[0];
  switch (elemClass) {
    case "edit-button":
      overlayedContentRenderer.showOverlayedContent("div#task-form");
      break;
    default:
      break;
  }
}
