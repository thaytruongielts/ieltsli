
export type QuestionType = 'TEXT' | 'MULTIPLE_CHOICE_TRIO';

export interface QuizQuestion {
  id: string;
  number: number;
  type: QuestionType;
  prompt: string;
  correctAnswers: string[]; // Can have multiple valid variations
  instruction?: string;
  options?: string[]; // Only for multiple choice
}

export interface UserAnswers {
  [key: string]: string | string[];
}

export interface Feedback {
  [key: string]: 'correct' | 'incorrect' | 'pending';
}
