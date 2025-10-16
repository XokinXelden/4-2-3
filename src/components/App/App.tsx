import { Divider } from "@mantine/core";
import HeaderVac from "../Header/Header";
import InputBlock from "../InputBlock/InputBlock";
import MainBlock from "../MainBlock/MainBlock";

function App() {
  return (
    <>
      <HeaderVac />
      <InputBlock />
      <Divider w="100vw" my="lg"></Divider>
      <MainBlock />
    </>
  );
}

export default App;
