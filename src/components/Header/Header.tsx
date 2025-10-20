import { Box, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Logo from "../Share/Logo";
import { VacancyFE, AboutLink } from "./Panel";

function HeaderVac() {
  return (
    <>
      <Box
        w="100vw"
        pos="fixed"
        top={0}
        left={0}
        bg="white"
        p="8px 20px 8px 20px"
        style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", zIndex: 1000 }}
      >
        <Flex align="center" justify="center">
          <Logo />
          <Box mx="auto" pr={146}>
            <Flex align="center" gap="10">
              <VacancyFE />
              <AboutLink />
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}

export default HeaderVac;
