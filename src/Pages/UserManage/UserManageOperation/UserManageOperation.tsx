import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { UpdatePasswordButton } from "./UpdatePasswordButton";
import { DeleteUserButton } from "./DeleteUserButton";

export const UserManageOperation = (props: any) => {
  return (
    <Box sx={{ display: "flex" }}>
      <UpdatePasswordButton />
      <Divider orientation="vertical" flexItem />
      <DeleteUserButton />
    </Box>
  );
};
