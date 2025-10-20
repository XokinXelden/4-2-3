import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TargetFetchOption, TargetJson } from "../components/types";

export const fetchTargetVacancy = createAsyncThunk<
  TargetJson,
  TargetFetchOption,
  { rejectValue: string }
>("vacancy/fetch", async (id, { rejectWithValue }) => {
  try {
    const API_URL_VAC = import.meta.env.VITE_VACANCIES_API_URL;
    const API_URL_EMP = import.meta.env.VITE_EMPLOYER_API_URL;
    const [responseVacancy, responseEmployers] = await Promise.all([
      fetch(`${API_URL_VAC}${id.vacancyId}?host=hh.ru`),
      fetch(`${API_URL_EMP}${id.employerId}`),
    ]);
    if (!responseVacancy.ok) {
      throw new Error("Вакансия не найдена");
    }
    if (!responseEmployers.ok) {
      throw new Error("Работодатель не найден");
    }

    const vacancy = await responseVacancy.json();
    const employer = await responseEmployers.json();
    return { vacancy: vacancy, employer: employer };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("что то не так с источником");
    }
  }
});
