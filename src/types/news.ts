export interface CoverImage {
  id: number;
  caption?: string;
  source?: string;
}

export interface Story {
  id: number;
  hline: string;
  intro: string;
  source: string;
  context: string;
  storyType: string;
  pubTime: number;
  coverImage?: CoverImage;
}

export interface NewsStoryItem {
  story: Story;
}

export interface AppIndex {
  seoAppIndex?: string;
  webAppIndex?: string;
}

export interface NewsListResponse {
  storyList: NewsStoryItem[];
  appIndex?: AppIndex;
}