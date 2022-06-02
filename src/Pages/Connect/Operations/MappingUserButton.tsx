import Button from "@mui/material/Button";
import { DrawerPage } from "../../DrawerPage";
import { mappingUserButtonApp } from "../Application/MappingUserButtonApp";
import { MappingUserForm } from "./MappingUserForm";

export interface MappingUserButtonProps {
  record: any;
}

export const MappingUserButton = ({ record }: MappingUserButtonProps) => {
  const { handleOpen, handleClose, handleSave, open } = mappingUserButtonApp({
    record,
  });
  return (
    <>
      <Button variant="text" onClick={handleOpen}>
        Mapping User
      </Button>
      <DrawerPage
        open={open}
        title="Mapping User"
        onClose={handleClose}
        children={
          <MappingUserForm
            onSubmit={handleSave}
            record={record}
            onCancel={handleClose}
          />
        }
      />
    </>
  );
};
