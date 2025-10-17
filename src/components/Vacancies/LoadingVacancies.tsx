import { Flex, Skeleton, Stack } from "@mantine/core";
import Base from "../Share/Base";

function LoadingVacancies() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <Base key={i} data-testid="LoadingCard">
            <Stack gap={5}>
              <Skeleton h={24} />
              <Skeleton h={24} />
              <Skeleton h={24} />
              <Skeleton h={24} />
            </Stack>
            <Flex gap={10} mt={5}>
              <Skeleton w={170} h={36} />
              <Skeleton w={170} h={36} />
            </Flex>
          </Base>
        );
      })}
    </>
  );
}
export default LoadingVacancies;
