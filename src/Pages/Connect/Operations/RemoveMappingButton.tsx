import Button from "@mui/material/Button";
import { removeMappingButtonApp } from "../Application/RemoveMappingButtonApp";

export interface RemoveMappingButtonProps {
  allData: any;
}

export const RemoveMappingButton = ({ allData }: RemoveMappingButtonProps) => {
  const { handleRemove } = removeMappingButtonApp({ allData });
  return (
    <Button onClick={handleRemove} color="error">
      Delete
    </Button>
  );
};
