import { Container, Stack, Text, Title } from "@mantine/core";
import Base from "../Share/Base";

function AboutMe() {
  return (
    <Container maw={700} mb={50}>
      <Base>
        <Stack>
          <Title order={2}>Какой-то там чел в белоснежных трико</Title>
          <Text>
            Я супергерой в белоснежных трико — моя суперспособность в том, что я
            ничего не боюсь. И чтобы доказать это, я и ношу эти трико!
          </Text>
        </Stack>
      </Base>
    </Container>
  );
}

export default AboutMe;
