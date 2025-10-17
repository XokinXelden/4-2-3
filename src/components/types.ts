type SalaryType = { from: number; to: number; currency: string };

export type Vacancies = {
  id: number;
  name: string;
  city: string | null;
  salary: SalaryType | null;
  experience: string;
  employerName: string;
  workFormat: string | null;
  urlVacant: string;
};
export type OptionsType = {
  page: number;
  pages: number;
  skills: string[];
  city: string;
  filter: string;
};
export type VacanciesResponseJson = {
  items: VacanciesItemsJson[];
  pages: number;
};
export type VacanciesItemsJson = {
  id: number;
  name: string;
  alternate_url: string;
  address: {
    city: string | null;
  };
  salary: SalaryType | null;
  experience: {
    name: string;
  };
  employer: {
    name: string;
  };
  work_format: [
    {
      id: string;
    }
  ];
};
