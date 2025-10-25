import { Box, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { errorClean } from "../../Reducer/reducerSlicer";

function Logo() {
  const dispatch = useAppDispatch();
  return (
    <Box style={{ justifyItems: "flex-start" }}>
      <Link to="/" onClick={() => dispatch(errorClean())}>
        <Image src="/Logo.png" h={30} w={116} />
      </Link>
    </Box>
  );
}
export default Logo;
