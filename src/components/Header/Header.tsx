import { Box, Image, Button, Flex, Text } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";

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
          <Box style={{ justifyItems: "flex-start" }}>
            <Link to="/">
              <Image src="/Logo.png" h={30} w={116} />
            </Link>
          </Box>
          <Box mx="auto" pr={146}>
            <Flex align="center" gap="5">
              <Link to="/">
                <Text c={"#0F0F10"} size="md">
                  Вакансии FE
                </Text>
              </Link>
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#4263EB",
                }}
              />
              <Button
                leftSection={<Image src="/user-circle.png" h={24} w={24} />}
                variant="transparent"
                color="#00000073"
              >
                Обо мне
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}

export default HeaderVac;
