export interface DocumentItem {
  id: string;
  title: string;
  documents: DocumentItem[];
}

export interface TitleWithIcon {
  icon: string;
  title: string;
}

export interface Emoji {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
}
