export const CancelableEvents = {
  cancelableCancel: 'cancelableCancel',
  cancelableCommit: 'cancelableCommit'
} as const;
export type CancelableEventsSignature = {
  [k in keyof typeof CancelableEvents]: null;
};
