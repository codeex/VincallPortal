import Button from "@mui/material/Button";
import { useState } from "react";
import { useDataProvider } from "react-admin";
import { DrawerPage } from "../../DrawerPage";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export const UpdatePasswordButton = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const dataProvider = useDataProvider();

  const handleClose = () => setOpen(false);
  const handleSave = async (values: any) => {
    await dataProvider
      .updatePassword("user", {
        id: props.record.id,
        data: { password: values.password },
      })
      .then(() => setOpen(false));
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
