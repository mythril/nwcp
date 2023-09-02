export const DataEvents = {
  dataCancel: 'dataCancel',
  dataCommit: 'dataCommit'
} as const;
export type DataEventsSignature = {
  [k in keyof typeof DataEvents]: null;
};
