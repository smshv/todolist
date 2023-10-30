const overlayedContentRenderer = (() => {
  // let currentParent;
  let lastAlteredElement = null;
  const titleMap = {
    'task-form': '// Create Task',
    'proj-form': '// Create Project',
  };
  function showOverlayedContent(id) {
    const container = document.querySelector('#container-overlayed');
    if (lastAlteredElement) {
      lastAlteredElement.classList.remove('active');
      const { children } = lastAlteredElement;
      for (let i = 0; i < children.length; i += 1) {
        children[i].classList.remove('active');
      }
    }
    container.style.visibility = 'visible';
    const overlayedContent = container.querySelector(id);
    lastAlteredElement = overlayedContent;
    overlayedContent.classList.add('active');
    // document
    //  .querySelector('#mini-window-container')
    //  .appendChild(overlayedContent);
  }
  function showOverlayedForm(formId = 'task-form') {
    document.querySelector('#form-title').textContent = titleMap[formId];
    document.querySelectorAll('.create-form').forEach((x) => {
      x.classList.remove('active');
    });
    document.querySelector(`form#${formId}`).classList.add('active');
    document.querySelectorAll('.form-menu-item').forEach((x) => {
      x.classList.remove('selected');
    });
    document.querySelector(`[formId=${formId}]`).classList.add('selected');
  }
  function hideOverlayedContent() {
    const container = document.querySelector('#container-overlayed');
    container.style.visibility = 'hidden';
    if (lastAlteredElement) {
      lastAlteredElement.classList.remove('active');
      lastAlteredElement = null;
    }
    container.classList.remove('active');
    // currentParent.appendChild(overlayedContent);
  }
  return { showOverlayedContent, hideOverlayedContent, showOverlayedForm };
})();

export default overlayedContentRenderer;
