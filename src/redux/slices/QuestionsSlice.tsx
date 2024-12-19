import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  initialData: any[];
  questions: any[];
  bestMatch: any;
}

interface Question {
  index: string;
  answer: string;
}

const initialState: InitialStateType = {
  initialData: [],
  questions: [],
  bestMatch: null,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {
    setInitialData: (state, action: PayloadAction<any[]>) => {
      state.initialData = action.payload;
    },
    setAnswers: (state, action: PayloadAction<Question>) => {
      const { index, answer } = action.payload;
      const existingQuestion = state.questions.find((q) => q.index === index);

      if (existingQuestion) {
        existingQuestion.answer = answer;
      } else {
        state.questions.push({ index, answer });
      }
    },
    setBestMatchClear: (state) => {
      state.bestMatch = null;
    },
    calculateFinalCracteristics: (state) => {
      let bestMatch = null;
      let lowestScore = Infinity;

      state.initialData.forEach((character) => {
        const similarityScore = calculateSimilarity(
          state.questions,
          character.powerstats
        );
        if (similarityScore < lowestScore) {
          lowestScore = similarityScore;
          bestMatch = character;
        }
      });
      state.bestMatch = bestMatch;
    },
  },
});

function calculateSimilarity(userAnswers: any[], characterStats: any[]) {
  let score = 0;

  userAnswers.forEach((answer) => {
    const userValue = parseInt(answer.answer);
    const charValue = parseInt(characterStats[answer.index]);
    score += Math.abs(userValue - charValue);
  });

  return score;
}

export const {
  setInitialData,
  setAnswers,
  calculateFinalCracteristics,
  setBestMatchClear,
} = questionsSlice.actions;

export default questionsSlice.reducer;
