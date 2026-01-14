
import React, { useState, useCallback } from 'react';
import { SECTION_3_QUESTIONS, AUDIO_URL } from './constants';
import { UserAnswers, Feedback } from './types';

const App: React.FC = () => {
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({});
  const [score, setScore] = useState<number | null>(null);

  const handleInputChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleMultiChoiceChange = (id: string, option: string) => {
    setAnswers(prev => {
      const current = (prev[id] as string[]) || [];
      if (current.includes(option)) {
        return { ...prev, [id]: current.filter(o => o !== option) };
      }
      if (current.length < 3) {
        return { ...prev, [id]: [...current, option] };
      }
      return prev;
    });
  };

  const checkAnswers = useCallback(() => {
    let correctCount = 0;
    const newFeedback: Feedback = {};

    SECTION_3_QUESTIONS.forEach(q => {
      if (q.type === 'TEXT') {
        const userValue = (answers[q.id] as string || '').trim().toLowerCase();
        const isCorrect = q.correctAnswers.some(ans => ans.toLowerCase() === userValue);
        newFeedback[q.id] = isCorrect ? 'correct' : 'incorrect';
        if (isCorrect) correctCount++;
      } else if (q.type === 'MULTIPLE_CHOICE_TRIO') {
        const userChoices = (answers[q.id] as string[] || []);
        // The user answers for 28-30 are 3 separate points.
        // For simplicity, we check if the selected letters match the target letters
        const targetLetters = q.correctAnswers;
        let setCorrect = 0;
        targetLetters.forEach(letter => {
          if (userChoices.includes(letter)) {
            setCorrect++;
          }
        });
        
        // In IELTS, each correct letter is 1 mark.
        // We'll treat q28, q29, q30 as individual marks in the final score.
        // But for visual feedback on the block:
        newFeedback[q.id] = setCorrect === 3 ? 'correct' : 'pending'; // visually highlight the block
        correctCount += setCorrect;
      }
    });

    const totalQuestions = 10; // 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    const calculatedScore = (10 * correctCount) / totalQuestions;

    setFeedback(newFeedback);
    setScore(calculatedScore);
    setSubmitted(true);
  }, [answers]);

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setFeedback({});
    setScore(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 pb-20">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-2">IELTS Listening Practice</h1>
        <p className="text-slate-600">SECTION 3: Shopping Habits (Questions 21-30)</p>
      </header>

      {/* Audio Section */}
      <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-slate-200">
        <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
          <i className="fas fa-headphones-simple mr-2 text-indigo-600"></i>
          Listening Material
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <p className="text-sm text-slate-600 italic">Download the audio file to start your practice session:</p>
          <a 
            href={AUDIO_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md active:scale-95"
          >
            <i className="fas fa-download"></i>
            Download Audio
          </a>
        </div>
      </section>

      {/* Instructions */}
      <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-8 text-sm text-indigo-800">
        <p><strong>General Instructions:</strong> Listen to the audio and answer questions 21-30. Click the "Submit" button at the bottom to check your results. Correct answers will be highlighted without revealing the expected text.</p>
      </div>

      {/* Quiz Sections */}
      <div className="space-y-12">
        {/* Section 1: 21-24 */}
        <section>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 underline decoration-indigo-300 decoration-4 underline-offset-4">Questions 21-24</h3>
            <p className="text-sm text-slate-500 mt-2 font-medium">Complete the sentences below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.</p>
          </div>
          <div className="space-y-6">
            {SECTION_3_QUESTIONS.filter(q => q.number >= 21 && q.number <= 24).map(q => (
              <QuestionItem 
                key={q.id}
                question={q}
                value={answers[q.id] as string || ''}
                feedback={feedback[q.id]}
                onChange={(val) => handleInputChange(q.id, val)}
                disabled={submitted}
              />
            ))}
          </div>
        </section>

        {/* Section 2: 25-27 */}
        <section>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 underline decoration-indigo-300 decoration-4 underline-offset-4">Questions 25-27</h3>
            <p className="text-sm text-slate-500 mt-2 font-medium">Fill in the blanks with ONE WORD AND/OR A NUMBER for each answer.</p>
          </div>
          <div className="space-y-6">
            {SECTION_3_QUESTIONS.filter(q => q.number >= 25 && q.number <= 27).map(q => (
              <QuestionItem 
                key={q.id}
                question={q}
                value={answers[q.id] as string || ''}
                feedback={feedback[q.id]}
                onChange={(val) => handleInputChange(q.id, val)}
                disabled={submitted}
              />
            ))}
          </div>
        </section>

        {/* Section 3: 28-30 */}
        <section>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 underline decoration-indigo-300 decoration-4 underline-offset-4">Questions 28-30</h3>
            <p className="text-sm text-slate-500 mt-2 font-medium">Mark THREE letters that represent the correct answer.</p>
          </div>
          {SECTION_3_QUESTIONS.filter(q => q.type === 'MULTIPLE_CHOICE_TRIO').map(q => (
            <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="font-semibold text-slate-700 mb-4">{q.prompt}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {q.options?.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const isChecked = (answers[q.id] as string[] || []).includes(letter);
                  return (
                    <label 
                      key={letter}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        isChecked 
                          ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300'
                      } ${submitted ? 'opacity-70 pointer-events-none' : ''}`}
                    >
                      <input 
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 mr-3"
                        checked={isChecked}
                        onChange={() => handleMultiChoiceChange(q.id, letter)}
                        disabled={submitted}
                      />
                      <span className="font-bold text-slate-800 mr-2">{letter}.</span>
                      <span className="text-slate-700">{option}</span>
                    </label>
                  );
                })}
              </div>
              {submitted && (
                <div className={`text-sm font-bold flex items-center gap-2 mt-2 ${
                  feedback[q.id] === 'correct' ? 'text-green-600' : 'text-orange-500'
                }`}>
                  <i className={feedback[q.id] === 'correct' ? 'fas fa-check-circle' : 'fas fa-circle-info'}></i>
                  {feedback[q.id] === 'correct' 
                    ? 'Excellent! You selected all 3 correct options.' 
                    : `You selected some correct options. Marks were awarded per correct letter.`}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      {/* Footer / Submit */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-10 flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto px-8 rounded-t-2xl">
        <div className="mb-4 sm:mb-0">
          {score !== null && (
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 text-white rounded-lg px-4 py-2 flex flex-col items-center">
                <span className="text-xs uppercase font-bold tracking-wider opacity-80">Score</span>
                <span className="text-xl font-black">{score.toFixed(1)}/10</span>
              </div>
              <p className="text-sm font-medium text-slate-600">
                {score >= 8 ? 'Outstanding! 🎉' : score >= 5 ? 'Good job! 👍' : 'Keep practicing! 💪'}
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={resetQuiz}
            className="px-6 py-2.5 rounded-lg font-bold border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
          {!submitted ? (
            <button 
              onClick={checkAnswers}
              className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md active:scale-95"
            >
              Submit Answers
            </button>
          ) : (
             <div className="text-indigo-600 font-bold px-4 py-2 flex items-center gap-2">
               <i className="fas fa-check-double"></i>
               Completed
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface QuestionItemProps {
  question: any;
  value: string;
  feedback?: 'correct' | 'incorrect' | 'pending';
  onChange: (val: string) => void;
  disabled: boolean;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, value, feedback, onChange, disabled }) => {
  const parts = question.prompt.split(' ');
  const inputIndex = parts.indexOf(''); // This is a rough marker for the input

  // Just render as a sentence with input
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
          {question.number}
        </div>
        <div className="flex-grow">
          <p className="text-slate-700 leading-relaxed mb-3">
            {question.prompt.split(' ').map((word: string, i: number) => {
              // Check if we should insert the input here or at the end
              // Simple heuristic: if the prompt is short and has no empty space, add at end.
              return <span key={i}>{word} </span>;
            })}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
             <input 
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              placeholder="Your answer..."
              className={`flex-grow sm:max-w-md px-4 py-2 border-2 rounded-lg outline-none transition-all ${
                feedback === 'correct' 
                  ? 'border-green-500 bg-green-50' 
                  : feedback === 'incorrect'
                  ? 'border-red-500 bg-red-50'
                  : 'border-slate-100 focus:border-indigo-400 focus:bg-white bg-slate-50'
              }`}
            />
            {feedback && (
              <span className={`text-sm font-bold flex items-center gap-1.5 ${
                feedback === 'correct' ? 'text-green-600' : 'text-red-600'
              }`}>
                {feedback === 'correct' ? (
                  <><i className="fas fa-check-circle"></i> Correct</>
                ) : (
                  <><i className="fas fa-times-circle"></i> Incorrect</>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
