import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchCharacterList, fetchCharacterDetails } from "./characterAPI";

interface Character {
  name: string;
  aliases: string[];
  gender: string;
  culture: string;
  born: string;
  died: string;
  books: string[];
  url: string;
}

interface CharacterState {
  characterList: Character[];
  selectedCharacter: Character | null;
  loading: boolean;
  books: string[];
  error: string | null;
}

const initialState: CharacterState = {
  characterList: [],
  selectedCharacter: null,
  loading: false,
  books: [],
  error: null,
};

export const fetchCharacterListAsync = createAsyncThunk(
  "characters/fetchCharacterList",
  async (pageNo: string) => {
    const response = await fetchCharacterList(pageNo);
    return response;
  }
);

export const fetchCharacterDetailsAsync = createAsyncThunk(
  "characters/fetchCharacterDetails",
  async (id: string) => {
    const response = await fetchCharacterDetails(id);
    return response;
  }
);

export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacterListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.characterList = action.payload;
      })
      .addCase(fetchCharacterListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred.";
      })
      .addCase(fetchCharacterDetailsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacterDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCharacter = action.payload;
        state.books = action.payload.books;
      })
      .addCase(fetchCharacterDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred.";
      });
  },
});


export const selectCharacterList = (state: RootState) =>
  state.characters.characterList;
export const selectSelectedCharacter = (state: RootState) =>
  state.characters.selectedCharacter;
export const selectLoading = (state: RootState) => state.characters.loading;
export const selectBooks = (state: RootState) => state.characters.books;
export const selectError = (state: RootState) => state.characters.error;

export const fetchCharacterDetailsById =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(fetchCharacterDetailsAsync(id));
  };

export default characterSlice.reducer;
