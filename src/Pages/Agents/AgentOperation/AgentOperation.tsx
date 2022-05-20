import { BindUserButton } from "./BindUserButton";
import { DeleteAgentButton } from "./DeleteAgentButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export const AgentOperation = (props: any) => {
  return (
    <Box sx={{ display: "flex" }}>
      <BindUserButton />
      <Divider orientation="vertical" flexItem />
      <DeleteAgentButton />
    </Box>
  );
};
