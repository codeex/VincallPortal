import { useState } from "react";
import { useUpdate } from "react-admin";

export interface MappingUserButtonAppProps {
  record: any;
}

export interface MappingUserButtonApp {
  handleOpen: () => void;
  handleClose: () => void;
  handleSave: (values: any) => void;
  open: boolean;
}

export const mappingUserButtonApp = ({
  record,
}: MappingUserButtonAppProps): MappingUserButtonApp => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [update] = useUpdate();

  const handleClose = () => setOpen(false);
  const handleSave = (values: any) => {
    update("agents", {
      id: record.id,
      data: { ...record, userAccount: values.userAccount },
    }).then(() => setOpen(false));
  };

  return {
    handleOpen,
    handleClose,
    handleSave,
    open,
  };
};
