import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useUpdate } from "react-admin";
import { TextField } from "@mui/material";
import { DrawerPage } from "../../DrawerPage";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export const UpdatePasswordButton = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  const [update] = useUpdate<any>();

  const ref = useRef(null as any);

  const handleClose = () => setOpen(false);
  const handleSave = (values: any) => {
    console.log("values >>", values);
  };
  return (
    <>
      <Button variant="text" onClick={handleClick}>
        Update Password
      </Button>
      <DrawerPage
        open={open}
        title="Update Password"
        onClose={handleClose}
        children={
          <UpdatePasswordForm onSubmit={handleSave} onCancel={handleClose} />
        }
        // onSave={handleSave}
        // onCancel={handleClose}
      />
    </>
  );
};
