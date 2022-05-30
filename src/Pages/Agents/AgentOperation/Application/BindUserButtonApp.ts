import { useState } from "react";
import { useDataProvider, useUpdate } from "react-admin";

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
  const dataProvider = useDataProvider();

  const handleClose = () => setOpen(false);
  const handleSave = (values: any) => {
    dataProvider
      .updatePatch("agent", {
        id: record.id,
        data: { ...record, account: values.userAccount },
      })
      .then(() => setOpen(false));
  };

  return {
    handleOpen,
    handleClose,
    handleSave,
    open,
  };
};
