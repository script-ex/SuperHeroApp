import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SuperheroState {
  superheroes: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SuperheroState = {
  superheroes: [],
  status: "idle",
  error: null,
};

export const superHerosSlice = createSlice({
  name: "questions",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuperheroes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSuperheroes.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = "succeeded";
          state.superheroes = action.payload;
        }
      )
      .addCase(fetchSuperheroes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "unknwon error";
      });
  },
});

interface Superhero {
  name: string;
}
export const fetchSuperheroes = createAsyncThunk<
  Superhero[],
  void,
  {
    rejectValue: string;
  }
>("superheroes/fetchSuperheroes", async (_, { rejectWithValue }) => {
  const ids = getRandomIds(0, 731, 3);

  try {
    const responses = await Promise.all(
      ids.map((id) =>
        axios
          .get(
            `${import.meta.env.VITE_PROXY}/${import.meta.env.VITE_BASE_URL}/${
              import.meta.env.VITE_API_KEY
            }/${id}`
          )
          .then((response) => response.data)
          .catch((_) => {
            throw new Error("Error fetching data");
          })
      )
    );

    return responses.filter((response) => response !== null) as Superhero[];
  } catch (error) {
    console.log(error);
    return rejectWithValue("Error fetching data");
  }
});

const getRandomIds = (min: number, max: number, count: number): number[] => {
  const ids = new Set<number>();
  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    ids.add(randomId);
  }
  return Array.from(ids);
};

export const {} = superHerosSlice.actions;
export default superHerosSlice.reducer;
