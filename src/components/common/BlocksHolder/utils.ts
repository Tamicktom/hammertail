export const getCaretCoordinates = () => {
  let x, y;
  const selection = window.getSelection();
  if (selection != null)
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      range.collapse(false);
      const rect = range.getClientRects()[0];
      if (rect) {
        x = rect.left;
        y = rect.top;
      }
    }
  if (x == undefined || y == undefined) return false;
  return { x, y };
};