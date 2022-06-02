import Button from "@mui/material/Button";
import { removeMappingButtonApp } from "../Application/RemoveMappingButtonApp";

export const RemoveMappingButton = () => {
  const { handleRemove } = removeMappingButtonApp({});
  return (
    <Button onClick={handleRemove} color="error">
      Delete
    </Button>
  );
};
