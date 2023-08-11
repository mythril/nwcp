const focusableSelectors = ` 
  a[href]:not([tabindex='-1']),
  area[href]:not([tabindex='-1']),
  input:not([disabled]):not([tabindex='-1']),
  select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),
  iframe:not([tabindex='-1']),
  [tabindex]:not([tabindex='-1'])
`;

/** @type {import('svelte/action').Action<HTMLElement, string>}  */
export function grabFocus(
  node: HTMLElement,
  focusableSelector = focusableSelectors
) {
  const update = (selector: string) => {
    node.querySelector<HTMLElement>(selector)?.focus();
  };
  update(focusableSelector);
  return {
    update
  };
}
