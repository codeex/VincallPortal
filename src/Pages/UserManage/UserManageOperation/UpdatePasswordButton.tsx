import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useUpdate } from "react-admin";
import { TextField } from "@mui/material";
import { DrawerPage } from "../../DrawerPage";

export const UpdatePasswordButton = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  const [update] = useUpdate<any>();

  const ref = useRef(null as any);

  const handleClose = () => setOpen(false);
  const handleSave = () => {
    update("agents", {
      id: props.record.id,
      data: { account: ref.current.value },
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
          <TextField label="Password" variant="filled" sx={{ width: 300 }} />
        }
        // onSave={handleSave}
        // onCancel={handleClose}
      />
    </>
  );
};
