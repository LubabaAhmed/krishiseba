
export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface AnalysisResult {
  problemName: string;
  description: string;
  solution: string;
  urgency: 'Low' | 'Medium' | 'High';
}

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  imageUrl?: string;
  timestamp: Date;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

export interface Contact {
  name: string;
  number: string;
  designation: string;
  location: string;
}
