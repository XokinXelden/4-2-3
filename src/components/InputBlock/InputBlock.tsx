import { Button, Flex, Input, Stack, Text, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { installFilter } from "../../Reducer/reducerSlicer";

function InputBlock() {
  const filter = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer.options.filter
  );
  useEffect(() => {
    setInputValue(filter);
  }, [filter]);
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();
  return (
    <Flex align="center" justify="center" gap={80}>
      <Stack align="start" gap={5}>
        <Title order={2}>Список вакансий</Title>
        <Text size="lg" color="gray">
          по профессии Frontend-разработчик
        </Text>
      </Stack>
      <Flex align="center" gap={5}>
        <Input
          data-testid="input-emp"
          miw={300}
          h={40}
          pt={2}
          leftSection={<IconSearch size={16} />}
          placeholder="Должность или название компании"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(installFilter({ type: "Filter", filter: inputValue }));
            }
          }}
        ></Input>
        <Button
          onClick={() => {
            dispatch(installFilter({ type: "Filter", filter: inputValue }));
          }}
        >
          Найти
        </Button>
      </Flex>
    </Flex>
  );
}

export default InputBlock;
