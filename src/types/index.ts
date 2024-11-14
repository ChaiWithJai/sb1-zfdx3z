export interface Document {
  id: string;
  file: File;
  status: 'analyzing' | 'complete' | 'error';
  analysis?: Analysis;
}

export interface Analysis {
  keyTopics: string[];
  mainPoints: string[];
  importantDetails: string[];
}

export interface Criteria {
  creditWorthy: string;
  technicallyViable: string;
  timeline: string;
  cashFlow: string;
}