import { createSlice } from "@reduxjs/toolkit";
import { fetchVacanciesList } from "./reducerThunk";
import type {
  OptionsType,
  VacanciesType,
  VacanciesItemsJson,
} from "../components/types";
import { cities } from "../components/Share/cityBase";
import { fetchTargetVacancy } from "./reducerThunkVacant";

type SlicerType = {
  vacancies: VacanciesType[] | null;
  targetVacancy: VacanciesType | null;
  options: OptionsType;
  loading: boolean;
  error?: string;
};
const initialState: SlicerType = {
  vacancies: null,
  targetVacancy: null,
  options: {
    page: 1,
    pages: 10,
    city: { id: "1", name: "moscow" },
    skills: [],
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
      state.options.page = 1;
    },
    activePage: (state, action) => {
      state.options.page = action.payload;
    },
    installFilter: (state, action) => {
      state.options.filter = action.payload;
      state.options.page = 1;
    },
    changeCity: (state, action) => {
      const city = Object.entries(cities).find((city) => {
        if (city[0] === action.payload) {
          return city;
        } else if (city[1].translated === action.payload) {
          return city;
        }
      });
      if (city) {
        state.options.city.id = city[0];
        state.options.city.name = city[1].translated;
      }
    },
    firstSkillsEntering: (state, action) => {
      if (action.payload !== "") {
        if (action.payload[0] === "%") {
          const allSkills = action.payload.slice(1).split(" ");
          state.options.skills = allSkills;
        } else {
          const allSkills = action.payload.split("%");
          state.options.filter = allSkills[0];
          state.options.skills = allSkills[1]?.split(" ") ?? [];
        }
      }
    },
    cleanUp: (state, action) => {
      switch (action.payload) {
        case "CleanSearchVac":
          state.vacancies = null;
          state.loading = true;
          state.error = undefined;
          break;
      }
    },
    errorClean: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacanciesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVacanciesList.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.items)) {
          state.options.pages = action.payload.pages - 1;
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
              employerId: vac.employer.id,
              workFormat: vac.work_format[0]?.id ?? null,
              urlVacant: vac.alternate_url,
            };
          });
          state.vacancies = data;
        }
        state.loading = false;
      })
      .addCase(fetchVacanciesList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(fetchTargetVacancy.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTargetVacancy.fulfilled, (state, action) => {
        const vacancyPage = action.payload.vacancy;
        const employerPage = action.payload.employer;
        const data = {
          id: vacancyPage.id,
          name: vacancyPage.name,
          city: vacancyPage.area.name,
          salary: vacancyPage.salary ?? null,
          experience: vacancyPage.experience.name,
          employerName: vacancyPage.employer.name,
          workFormat: vacancyPage.work_format[0]?.id ?? null,
          urlVacant: vacancyPage.alternate_url,
          employerDescription: employerPage.description,
          vacancyDescription: vacancyPage.description,
        };
        state.targetVacancy = data;
        state.loading = false;
      })
      .addCase(fetchTargetVacancy.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const {
  addRemoveSkill,
  activePage,
  installFilter,
  changeCity,
  firstSkillsEntering,
  cleanUp,
  errorClean,
} = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
