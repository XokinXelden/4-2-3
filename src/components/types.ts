export type SalaryType = { from: number; to: number; currency: string };

export type VacanciesType = {
  id: string;
  name: string;
  city: string | null;
  salary: SalaryType | null;
  experience: string;
  employerName: string;
  employerId?: string;
  workFormat: string | null;
  urlVacant: string;
  employerDescription?: string;
  vacancyDescription?: string;
};
export type OptionsType = {
  page: number;
  pages: number;
  skills: string[];
  city: { id: string; name: string };
  filter: string;
};
export type URLOptionsType = { page: string; area: string; text: string };
export type VacanciesResponseJson = {
  items: VacanciesItemsJson[];
  pages: number;
};
export type VacanciesItemsJson = {
  id: string;
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
    id: string;
    name: string;
  };
  work_format: [
    {
      id: string;
    }
  ];
};
type VacancyJson = {
  id: string;
  name: string;
  area: { name: string };
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
  alternate_url: string;
  description: string;
};
type EmployerJson = {
  description: string;
};
export type TargetJson = {
  vacancy: VacancyJson;
  employer: EmployerJson;
};
export type TargetFetchOption = { employerId: string; vacancyId: string };
