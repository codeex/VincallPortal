import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useUpdate } from "react-admin";
import { customHttpClient } from "../../../DataProvider/customHttpClient";
import { DrawerPage } from "../../DrawerPage";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export const UpdatePasswordButton = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  const handleClose = () => setOpen(false);
  const handleSave = (values: any) => {
    customHttpClient(`/user/${props.record.id}`, {
      method: "PATCH",
      body: JSON.stringify({ password: values.password }),
    }).then(() => setOpen(false));
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
      />
    </>
  );
};
