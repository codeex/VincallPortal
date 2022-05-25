import Button from "@mui/material/Button";
import { useMemo, useRef, useState } from "react";
import { useGetList, useUpdate } from "react-admin";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { DrawerPage } from "../../DrawerPage";
import { Formik, Form } from "formik";
import { BindUserForm } from "./BindUserForm";

export const BindUserButton = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  // const { data: userList = [], isLoading: isUserLoading } = useGetList<any>(
  //   "users",
  //   {},
  //   {
  //     refetchInterval: -1,
  //   }
  // );

  const [update] = useUpdate<any>();

  // const userOptions = useMemo(() => {
  //   return userList.map((user) => ({
  //     label: user.userName,
  //     value: user.userName,
  //   }));
  // }, [userList]);

  const ref = useRef<any>({
    label: props.record.userAccount,
    value: props.record.userAccount,
  });

  const handleClose = () => setOpen(false);
  const handleSave = (values: any) => {
    console.log("values >>", values);
    update("agents", {
      id: props.record.id,
      data: { account: values.userAccount },
    }).then(() => setOpen(false));
  };

  // console.log("ref >>", ref.current);

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
        // onSave={handleSave}
        // onCancel={handleClose}
      />
    </>
  );
};
