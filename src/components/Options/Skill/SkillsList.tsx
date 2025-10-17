import { Flex, Pill } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addRemoveSkill } from "../../../Reducer/reducerSlicer";

function SkillsList() {
  const dispatch = useAppDispatch();
  const PreSkills = useAppSelector(
    (state) => state.rootReducer.vacanciesReducer.options.skills
  );

  return (
    <Flex wrap="wrap" maw={280}>
      <Pill.Group data-testid="skill-list">
        {PreSkills.map((skill, i) => {
          return (
            <Pill
              key={i}
              onRemove={() => {
                dispatch(addRemoveSkill({ type: "REMOVE", skill: skill }));
              }}
              withRemoveButton
            >
              {skill}
            </Pill>
          );
        })}
      </Pill.Group>
    </Flex>
  );
}

export default SkillsList;
