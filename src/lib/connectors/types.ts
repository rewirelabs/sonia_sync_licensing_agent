export interface Track {
  isrc: string;
  title: string;
  artist: string;
  lang: string;
  durationMs: number;
  hasRichSync?: boolean;
  isExplicit?: boolean;
}

export interface RichSyncLine {
  startMs: number;
  endMs: number;
  text: string;
  words?: {
    startMs: number;
    endMs: number;
    text: string;
  }[];
}

export interface LyricDoc {
  isrc: string;
  lines: RichSyncLine[];
  translation?: {
    lang: string;
    lines: {
      original: string;
      translated: string;
    }[];
  };
  mood?: {
    valence: number; // -1 to 1
    energy: number;  // 0 to 1
  };
}
