/** @type {import('svelte/action').Action<HTMLElement, HTMLElement>}  */
export function anchor(node: HTMLElement, target: HTMLElement) {
  node.setAttribute('data-anchor', 'true');
  const setAnchorProps = () => {
    if (!target) {
      return;
    }
    const rect = node.getBoundingClientRect();
    target.style.setProperty(
      '--anchor-left',
      `${window.scrollX + rect.left}px`
    );
    target.style.setProperty('--anchor-top', `${window.scrollY + rect.top}px`);
  };
  window.addEventListener('resize', setAnchorProps);
  return {
    update(newTarget: HTMLElement) {
      target = newTarget;
      setAnchorProps();
    },
    destroy() {
      window.removeEventListener('resize', setAnchorProps);
    }
  };
}
