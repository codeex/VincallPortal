import Button from "@mui/material/Button";
import { ReactNode } from "react";
import { Drawer } from "@mui/material";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface DrawerPageProps {
  open: boolean;
  anchor?: "left" | "right" | "bottom" | "top";
  title: string;
  onClose: () => void;
  children: ReactNode;
  // onSave: () => void;
  // saveText?: string;
  // onCancel: () => void;
  // cancelText?: string;
}
export const DrawerPage = ({
  open,
  anchor = "right",
  title,
  onClose,
  children,
}: // onSave,
// saveText = "Save",
// onCancel,
// cancelText = "Cancel",
DrawerPageProps) => {
  return (
    <Drawer open={open} anchor={anchor} title={title} onClose={onClose}>
      <Box style={{ padding: 24, paddingTop: 16 }}>
        <Button variant="text" onClick={onClose} startIcon={<CloseIcon />}>
          Close
        </Button>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {children}
        {/* <Button onClick={onSave}>{saveText}</Button>
        <Button onClick={onCancel}>{cancelText}</Button> */}
      </Box>
    </Drawer>
  );
};
