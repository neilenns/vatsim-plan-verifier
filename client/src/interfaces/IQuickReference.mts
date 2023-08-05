export interface IQuickReference {
  key: string;
  label: string;
  markdown: string;
}

export interface IQuickReferenceListItem {
  key: string;
  label: string;
}

export interface IQuickReferenceLoaderResult {
  entries: IQuickReferenceListItem[];
  markdown: string;
}
