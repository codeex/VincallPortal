import { useState } from "react";
import { useUpdate } from "react-admin";

export interface BindUserButtonAppProps {
  record: any;
}

export interface BindUserButtonApp {
  handleOpen: () => void;
  handleClose: () => void;
  handleSave: (values: any) => void;
  open: boolean;
}

export const bindUserButtonApp = ({
  record,
}: BindUserButtonAppProps): BindUserButtonApp => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [update] = useUpdate<any>();

  const handleClose = () => setOpen(false);
  const handleSave = (values: any) => {
    update("agents", {
      id: record.id,
      data: { account: values.userAccount },
    }).then(() => setOpen(false));
  };

  return {
    handleOpen,
    handleClose,
    handleSave,
    open,
  };
};
