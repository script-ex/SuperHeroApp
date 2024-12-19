import { configureStore } from "@reduxjs/toolkit";
import superHerosReducer, { fetchSuperheroes } from "./SuperHerosSlice";
import axios from "axios";

jest.mock("axios");

const initialState = {
  superheroes: [],
  status: "idle",
  error: null,
};

describe("superHerosSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        superHeros: superHerosReducer,
      },
    });
  });

  it("should handle initial state", () => {
    expect(store.getState().superHeros).toEqual(initialState);
  });

  it("should handle fetchSuperheroes pending", () => {
    store.dispatch(fetchSuperheroes.pending());
    expect(store.getState().superHeros.status).toEqual("loading");
  });

  it("should handle fetchSuperheroes fulfilled", async () => {
    const mockData = [{ name: "Batman" }];
    axios.get.mockResolvedValue({ data: mockData });

    await store.dispatch(fetchSuperheroes());
    expect(store.getState().superHeros.status).toEqual("succeeded");
    expect(store.getState().superHeros.superheroes).toEqual(mockData);
  });

  it("should handle fetchSuperheroes rejected", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    await store.dispatch(fetchSuperheroes());
    expect(store.getState().superHeros.status).toEqual("failed");
    expect(store.getState().superHeros.error).toEqual("Error fetching data");
  });
});
