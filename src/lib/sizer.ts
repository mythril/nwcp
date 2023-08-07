type SizerParams = {
  width: string;
  height: string;
  color?: string;
};

let colorOffset = 0;

/** @type {import('svelte/action').Action<HTMLElement, string>}  */
export function sizer(node: HTMLElement, params: SizerParams) {
  if (!import.meta.env.DEV) {
    return;
  }
  const div = document.createElement('div');
  const anchor = document.createElement('div');
  anchor.style.cssText = `position: absolute;`;
  let color: string;
  if (params.color) {
    color = params.color;
  } else {
    color = `hsl(${colorOffset}deg, 100%, 50%)`;
    colorOffset = (colorOffset + 30) % 360;
  }
  div.style.cssText = ` 
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      outline: 1px solid ${color};
      width: ${params.width};
      height: ${params.height};
    `;
  anchor.appendChild(div);
  node.insertBefore(anchor, node.firstChild);
  return {
    destroy: () => {
      anchor.removeChild(div);
      node.removeChild(anchor);
    }
  };
}
