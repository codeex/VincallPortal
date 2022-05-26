import Button from "@mui/material/Button";
import { DrawerPage } from "../../DrawerPage";
import { bindUserButtonApp } from "./Application/BindUserButtonApp";
import { BindUserForm } from "./BindUserForm";

export interface BindUserButtonProps {
  record: any;
}

export const BindUserButton = ({ record }: BindUserButtonProps) => {
  // const [open, setOpen] = useState(false);
  // const handleClick = () => setOpen(true);
  // const [update] = useUpdate<any>();

  // const handleClose = () => setOpen(false);
  // const handleSave = (values: any) => {
  //   update("agents", {
  //     id: props.record.id,
  //     data: { account: values.userAccount },
  //   }).then(() => setOpen(false));
  // };

  const { handleOpen, handleClose, handleSave, open } = bindUserButtonApp({
    record,
  });
  return (
    <>
      <Button variant="text" onClick={handleOpen}>
        Bind User
      </Button>
      <DrawerPage
        open={open}
        title="Bind User"
        onClose={handleClose}
        children={
          <BindUserForm
            onSubmit={handleSave}
            record={record}
            onCancel={handleClose}
          />
        }
      />
    </>
  );
};
