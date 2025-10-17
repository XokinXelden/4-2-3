import { Button, Flex, Input, Stack, Text } from "@mantine/core";
import Base from "../../Share/Base";
import { IconPlus } from "@tabler/icons-react";
import SkillsList from "./SkillsList";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { addRemoveSkill } from "../../../Reducer/reducerSlicer";

function SkillsOption() {
  const dispatch = useAppDispatch();
  const [SkillName, setSkillName] = useState<string>("");
  return (
    <Base>
      <Stack>
        <Text>Ключевые навыки</Text>
        <Flex>
          <Input
            data-testid="skill-input"
            placeholder="Навык"
            mr={5}
            size="xs"
            radius={8}
            miw={243}
            value={SkillName}
            onChange={(e) => {
              setSkillName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(addRemoveSkill({ type: "ADD", skill: SkillName }));
                setSkillName("");
              }
            }}
          ></Input>
          <Button
            w={32}
            h={30}
            p={0}
            radius={8}
            onClick={() => {
              dispatch(addRemoveSkill({ type: "ADD", skill: SkillName }));
              setSkillName("");
            }}
          >
            <IconPlus size={28} />
          </Button>
        </Flex>
        <SkillsList />
      </Stack>
    </Base>
  );
}
export default SkillsOption;
