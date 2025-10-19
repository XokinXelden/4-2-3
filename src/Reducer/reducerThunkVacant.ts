import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TargetFetchOption, TargetJson } from "../components/types";

export const fetchTargetVacancy = createAsyncThunk<
  TargetJson,
  TargetFetchOption,
  { rejectValue: string }
>("vacancy/fetch", async (id, { rejectWithValue }) => {
  try {
    const [responseVacancy, responseEmployers] = await Promise.all([
      fetch(`https://api.hh.ru/vacancies/${id.vacancyId}?host=hh.ru`),
      fetch(`https://api.hh.ru/employers/${id.employerId}`),
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
