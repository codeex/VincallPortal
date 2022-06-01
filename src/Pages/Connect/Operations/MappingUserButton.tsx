import Button from "@mui/material/Button";
import { bindUserButtonApp } from "../../Agents/AgentOperation/Application/BindUserButtonApp";
import { DrawerPage } from "../../DrawerPage";
import { MappingUserForm } from "./MappingUserForm";

export interface MappingUserButtonProps {
  record: any;
}

export const MappingUserButton = ({ record }: MappingUserButtonProps) => {
  const { handleOpen, handleClose, handleSave, open } = bindUserButtonApp({
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
