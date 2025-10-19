import { Divider } from "@mantine/core";
import InputBlock from "../InputBlock/InputBlock";
import MainBlock from "./MainBlock";

function SearchVacanciesPage() {
  return (
    <>
      <InputBlock />
      <Divider w="100vw" my="lg"></Divider>
      <MainBlock />
    </>
  );
}

export default SearchVacanciesPage;
