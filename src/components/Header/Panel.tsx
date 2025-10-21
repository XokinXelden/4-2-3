import { Flex, Image, Text } from "@mantine/core";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";

function VacancyFE() {
  return (
    <Flex gap={5} align="center">
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
    </Flex>
  );
}
function AboutLink() {
  const match = useMatch("/about");
  const navigate = useNavigate();
  return (
    <Flex align="center" gap={5} variant="transparent" color="#00000073">
      <Image src="/user-circle.png" h={24} w={24} />
      <NavLink
        to={match ? "#" : "/about"}
        onClick={() => {
          if (match) navigate(-1);
        }}
        style={({ isActive }) => ({
          color: isActive ? "#4263EB" : "black",
          fontWeight: "normal",
        })}
      >
        Обо мне
      </NavLink>
    </Flex>
  );
}

export { VacancyFE, AboutLink };
