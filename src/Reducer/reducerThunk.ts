import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OptionsType, VacanciesResponseJson } from "../components/types";

export const fetchVacanciesList = createAsyncThunk<
  VacanciesResponseJson,
  OptionsType,
  { rejectValue: string }
>("vacanciesList/fetch", async (options, { rejectWithValue }) => {
  try {
    const { city, textFilter } = options;

    const response = await fetch(
      `https://api.hh.ru/vacancies?area=${
        city.id
      }&industry=7&professional_role=96&per_page=10&page=${options.page - 1}${
        textFilter !== "" ? `&text=${textFilter}` : ""
      }`
    );
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
