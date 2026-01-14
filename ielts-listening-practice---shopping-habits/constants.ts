
import { QuizQuestion } from './types';

export const AUDIO_URL = "https://tinyurl.com/ieltslist3";

export const SECTION_3_QUESTIONS: QuizQuestion[] = [
  // Questions 21-24
  {
    id: 'q21',
    number: 21,
    type: 'TEXT',
    prompt: 'The woman being interviewed is now working in the bank. Her occupation is .',
    correctAnswers: ['cashier'],
    instruction: 'Write NO MORE THAN THREE WORDS AND/OR A NUMBER'
  },
  {
    id: 'q22',
    number: 22,
    type: 'TEXT',
    prompt: 'The woman usually spends about when she goes shopping.',
    correctAnswers: ['50 pounds', '£50', 'fifty pounds'],
    instruction: 'Write NO MORE THAN THREE WORDS AND/OR A NUMBER'
  },
  {
    id: 'q23',
    number: 23,
    type: 'TEXT',
    prompt: 'The woman often goes to because she finds them convenient.',
    correctAnswers: ['big department stores', 'department stores'],
    instruction: 'Write NO MORE THAN THREE WORDS AND/OR A NUMBER'
  },
  {
    id: 'q24',
    number: 24,
    type: 'TEXT',
    prompt: 'According to the woman, is/are her most difficult thing(s) to buy.',
    correctAnswers: ['jeans'],
    instruction: 'Write NO MORE THAN THREE WORDS AND/OR A NUMBER'
  },
  // Questions 25-27
  {
    id: 'q25',
    number: 25,
    type: 'TEXT',
    prompt: '50% of the people being interviewed spend a month.',
    correctAnswers: ['45 pounds', '£45', 'forty-five pounds'],
    instruction: 'ONE WORD AND/OR A NUMBER'
  },
  {
    id: 'q26',
    number: 26,
    type: 'TEXT',
    prompt: '15% of the people being interviewed spend a month.',
    correctAnswers: ['75 pounds', '£75', 'seventy-five pounds'],
    instruction: 'ONE WORD AND/OR A NUMBER'
  },
  {
    id: 'q27',
    number: 27,
    type: 'TEXT',
    prompt: '35% of the people being interviewed spend a month.',
    correctAnswers: ['20 pounds', '£20', 'twenty pounds'],
    instruction: 'ONE WORD AND/OR A NUMBER'
  },
  // Questions 28-30 (Multiple selection trio)
  {
    id: 'q28-30',
    number: 28, // Using a range logic in UI
    type: 'MULTIPLE_CHOICE_TRIO',
    prompt: 'Most of the people being interviewed think that _________ is/are most difficult to buy. (Choose THREE)',
    options: ['Books', 'Study materials', 'Foods', 'Trousers', 'Shoes', 'Sportswear'],
    correctAnswers: ['D', 'E', 'F'], // These correspond to index 3, 4, 5 but stored as letters as per user instructions
    instruction: 'Mark THREE letters that represent the correct answer.'
  }
];
