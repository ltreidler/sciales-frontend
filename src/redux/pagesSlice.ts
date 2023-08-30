import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import axios, { AxiosResponse } from "axios";
import {
  AllContentTypes,
  TabObject,
  PageCategory,
  ApiWorkCollection,
} from "../types/";

const contentTypes: AllContentTypes[] = ["groups", "singles", "novels"];

interface CurrentPage {
  index: number;
  category: PageCategory;
}

//Define a type for the page state
interface PagesState {
  comics: TabObject[];
  illustrations: TabObject[];
  error: string | null | undefined;
  status: "idle" | "loading";
  currentPage: CurrentPage | null;
}

//Define initial state of page slice
const initialState: PagesState = {
  comics: [],
  illustrations: [],
  error: "",
  status: "idle",
  currentPage: null,
};

export const fetchTabsAsyncThunk = createAsyncThunk<
  PagesState,
  void,
  { rejectValue: string }
>("tabs/fetchAll", async (_: void, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    }: AxiosResponse<ApiWorkCollection> = await axios.get(
      "/api/works?populate=deep,3"
    );

    if (data) {
      const comics: TabObject[] = [];
      const illustrations: TabObject[] = [];

      //go through each of the pages in the data array

      //create tab objects for each page

      for (let page of data) {
        const {
          tabName,
          pageData: { category },
          pageMedia,
        } = page.attributes;

        const type = (pageMedia[0].__component.split(".")[1] +
          "s") as AllContentTypes;

        if (category === "comic") comics.push({ tabName, type });
        else illustrations.push({ tabName, type });
      }

      return {
        comics,
        illustrations,
        error: null,
        status: "idle",
        currentPage: null,
      };
    } else {
      return rejectWithValue("No data found");
    }
  } catch (error) {
    return rejectWithValue("Error fetching tab info");
  }
});

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<CurrentPage | null>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTabsAsyncThunk.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(fetchTabsAsyncThunk.rejected, (state, action) => {
      if (action.payload) state.error = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchTabsAsyncThunk.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const selectComics = (state: RootState) => state.pages.comics;
export const selectIllustrations = (state: RootState) =>
  state.pages.illustrations;
export const selectPages = (state: RootState) => state.pages;
export const { setCurrentPage } = pagesSlice.actions;
export default pagesSlice.reducer;
