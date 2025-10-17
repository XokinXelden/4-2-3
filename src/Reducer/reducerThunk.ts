import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OptionsType, VacanciesResponseJson } from "../components/types";

export const fetchVacanciesList = createAsyncThunk<
  VacanciesResponseJson,
  OptionsType,
  { rejectValue: string }
>("vacanciesList/fetch", async (options, { rejectWithValue }) => {
  try {
    const filter = options.filter !== "" ? `&text=${options.filter}` : "";
    const skillReplacer =
      options.skills.length !== 0
        ? options.skills.map((skill) => skill.replace(/\s/g, "%"))
        : [];
    const skill =
      options.filter !== ""
        ? options.skills.length !== 0
          ? `%20${skillReplacer.join(`%20`)}`
          : ""
        : options.skills.length !== 0
        ? `&text=${skillReplacer.join(`%20`)}`
        : "";
    const response = await fetch(
      `https://api.hh.ru/vacancies?area=${
        options.city
      }&industry=7&professional_role=96&per_page=10&page=${
        options.page - 1
      }${filter}${skill}`
    );

    console.log(
      `https://api.hh.ru/vacancies?area=${
        options.city
      }&industry=7&professional_role=96&per_page=10&page=${
        options.page - 1
      }${filter}${skill}`
    );

    if (!response.ok) {
      throw new Error("При запросе на сервер что то пошло не так");
    }
    const dataVac = await response.json();
    return dataVac;
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message);
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("что то не так с источником");
    }
  }
});
