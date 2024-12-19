import questionsReducer, {
  setInitialData,
  setAnswers,
  setBestMatchClear,
  calculateFinalCracteristics,
} from "./QuestionsSlice";

const initialState = {
  initialData: [],
  questions: [],
  bestMatch: null,
};

describe("questionsSlice", () => {
  it("should handle initial state", () => {
    expect(questionsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setInitialData", () => {
    const actual = questionsReducer(
      initialState,
      setInitialData([{ name: "Superman" }])
    );
    expect(actual.initialData).toEqual([{ name: "Superman" }]);
  });

  it("should handle setAnswers", () => {
    const actual = questionsReducer(
      initialState,
      setAnswers({ index: "1", answer: "50" })
    );
    expect(actual.questions).toEqual([{ index: "1", answer: "50" }]);
  });

  it("should handle setBestMatchClear", () => {
    const state = { ...initialState, bestMatch: { name: "Superman" } };
    const actual = questionsReducer(state, setBestMatchClear());
    expect(actual.bestMatch).toBeNull();
  });

  it("should calculate final characteristics and set best match", () => {
    const state = {
      initialData: [
        {
          name: "Superman",
          powerstats: { intelligence: "100", strength: "100" },
        },
        { name: "Batman", powerstats: { intelligence: "90", strength: "85" } },
      ],
      questions: [
        { index: "intelligence", answer: "100" },
        { index: "strength", answer: "100" },
      ],
      bestMatch: null,
    };

    const actual = questionsReducer(state, calculateFinalCracteristics());
    expect(actual.bestMatch.name).toEqual("Superman");
  });
});
