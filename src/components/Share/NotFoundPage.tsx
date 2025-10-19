import { IconMoodSmileDizzy } from "@tabler/icons-react";
import Base from "./Base";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Stack, Text, Title } from "@mantine/core";

function NotFoundPage() {
  const localError = useLocation();
  const navigate = useNavigate();
  return (
    <Container maw={500}>
      <Base>
        <Stack align="center">
          <IconMoodSmileDizzy size={150} />
          <Title order={2}>{localError.state?.status ?? "404"}</Title>
          <Text size="lg" ta="center">
            {localError.state?.text ?? "Похоже такой страницы нет"}
          </Text>
          <Button onClick={() => navigate(-1)}>Вернуться назад</Button>
        </Stack>
      </Base>
    </Container>
  );
}

export default NotFoundPage;
