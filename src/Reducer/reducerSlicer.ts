import { createSlice } from "@reduxjs/toolkit";
import { fetchVacanciesList } from "./reducerThunk";
import type {
  OptionsType,
  Vacancies,
  VacanciesItemsJson,
} from "../components/types";

type SlicerType = {
  vacancies: Vacancies[] | null;
  options: OptionsType;
  loading: boolean;
  error?: string;
};
const initialState: SlicerType = {
  vacancies: null,
  options: {
    page: 1,
    pages: 10,
    city: "113",
    skills: ["TypeScript", "React", "Redux"],
    filter: "",
  },
  loading: true,
  error: undefined,
};

export const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    addRemoveSkill: (state, action) => {
      switch (action.payload.type) {
        case "ADD":
          if (!state.options.skills.includes(action.payload.skill)) {
            state.options.skills.push(action.payload.skill);
          }
          break;
        case "REMOVE":
          state.options.skills = state.options.skills.filter((skill) => {
            if (skill !== action.payload.skill) return skill;
          });
          break;
      }
    },
    activePage: (state, action) => {
      state.options.page = action.payload;
    },
    installFilter: (state, action) => {
      state.options.filter = action.payload === "" ? null : action.payload;
    },
    changeCity: (state, action) => {
      switch (action.payload) {
        case "Все города":
          state.options.city = "113";
          break;
        case "Санкт-Петербург":
          state.options.city = "2";
          break;
        case "Москва":
          state.options.city = "1";
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacanciesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVacanciesList.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.items)) {
          state.options.pages = action.payload.pages;
          const data = action.payload.items.map((vac: VacanciesItemsJson) => {
            const salary = vac.salary
              ? {
                  from: vac.salary.from,
                  to: vac.salary.to,
                  currency: vac.salary.currency,
                }
              : null;
            return {
              id: vac.id,
              name: vac.name,
              city: vac.address?.city ?? null,
              salary: salary,
              experience: vac.experience.name,
              employerName: vac.employer.name,
              workFormat: vac.work_format[0]?.id ?? null,
              urlVacant: vac.alternate_url,
            };
          });
          state.vacancies = data;
        }
        state.loading = false;
      })
      .addCase(fetchVacanciesList.rejected, (state, action) => {
        console.log(1, action);
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { addRemoveSkill, activePage, installFilter, changeCity } =
  vacanciesSlice.actions;
export default vacanciesSlice.reducer;
