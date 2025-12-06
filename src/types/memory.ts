export interface Memory {
  id: string;
  title: string;
  createdAt: string;
  content: MemoryContent[];
}

export interface MemoryContent {
  id: string;
  type: 'text' | 'image' | 'video' | 'audio';
  data: string; // Base64 for media, plain text for text
  caption?: string;
}

export interface UserProfile {
  name: string;
  setupComplete: boolean;
}
