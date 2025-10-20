import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  URLOptionsType,
  VacanciesResponseJson,
} from "../components/types";

export const fetchVacanciesList = createAsyncThunk<
  VacanciesResponseJson,
  URLOptionsType,
  { rejectValue: string }
>("vacanciesList/fetch", async (options, { rejectWithValue }) => {
  try {
    const searchParam = new URLSearchParams(options);
    if (options.text.length === 0) {
      searchParam.delete("text");
    }
    const API_URL = import.meta.env.VITE_VACANCIES_API_URL;
    const fullUrl =
      `${API_URL}?industry=7&professional_role=96&per_page=10` +
      `&${searchParam.toString()}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error("При запросе на сервер что то пошло не так");
    }
    const dataVac = await response.json();
    return dataVac;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("что то не так с источником");
    }
  }
});
