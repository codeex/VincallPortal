import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useUpdate } from "react-admin";
import { DrawerPage } from "../../DrawerPage";
import { BindUserForm } from "./BindUserForm";

export const BindUserButton = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const [update] = useUpdate<any>();

  const ref = useRef<any>({
    label: props.record.userAccount,
    value: props.record.userAccount,
  });

  const handleClose = () => setOpen(false);
  const handleSave = (values: any) => {
    update("agents", {
      id: props.record.id,
      data: { account: values.userAccount },
    }).then(() => setOpen(false));
  };

  return (
    <>
      <Button variant="text" onClick={handleClick}>
        Bind User
      </Button>
      <DrawerPage
        open={open}
        title="Bind User"
        onClose={handleClose}
        children={
          <BindUserForm
            onSubmit={handleSave}
            record={props.record}
            onCancel={handleClose}
          />
        }
      />
    </>
  );
};
