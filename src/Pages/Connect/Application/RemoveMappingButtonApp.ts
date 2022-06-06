import { useState } from "react";
import { getServerURL } from "../../../App";
import { customHttpClient } from "../../../DataProvider/customHttpClient";

export interface RemoveMappingButtonAppProps {
  row: any;
  allData: any;
  onRefresh: () => void;
}

export interface RemoveMappingButtonApp {
  handleRemove: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

export const removeMappingButtonApp = ({
  row,
  allData,
  onRefresh,
}: RemoveMappingButtonAppProps): RemoveMappingButtonApp => {
  const [open, setOpen] = useState<boolean>(false);
  const handleRemove = () => {
    const newData = allData
      .filter((data: { id: any }) => {
        return data.id !== row.id;
      })
      .map((data: any) => ({
        comm100AgentId: data.comm100AgentId,
        userAccount: data.userAccount,
        comm100Email: data.comm100Email,
        userName: data.userName,
      }));

    customHttpClient(
      `${getServerURL()}/usermapping/${localStorage.getItem("connectSiteId")}`,
      {
        method: "PUT",
        body: JSON.stringify(newData),
      }
    ).then(() => {
      setOpen(false);
      onRefresh();
    });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    handleRemove,
    handleOpen,
    handleClose,
    open,
  };
};
