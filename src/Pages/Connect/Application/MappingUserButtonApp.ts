import { useState } from "react";
import { useDataProvider, useUpdate } from "react-admin";
import { getServerURL } from "../../../App";
import { customHttpClient } from "../../../DataProvider/customHttpClient";

export interface MappingUserButtonAppProps {
  row: any;
  allData: any;
  onRefresh: () => void;
}

export interface MappingUserButtonApp {
  handleOpen: () => void;
  handleClose: () => void;
  handleSave: (values: any) => void;
  open: boolean;
}

export const mappingUserButtonApp = ({
  row,
  allData,
  onRefresh,
}: MappingUserButtonAppProps): MappingUserButtonApp => {
  // console.log("allData >>", allData);
  // console.log("row >>", row);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const [update] = useUpdate();
  // const dataProvider = useDataProvider();

  const handleClose = () => setOpen(false);
  const handleSave = (values: any) => {
    const unchangedData = allData
      .filter((data: { id: any }) => {
        return data.id !== row.id;
      })
      .map((data: any) => ({
        comm100AgentId: data.comm100AgentId,
        userAccount: data.userAccount,
        comm100Email: data.comm100Email,
        userName: data.userName,
      }));
    const changedData = {
      comm100AgentId: row.comm100AgentId,
      userAccount: values.userAccount.value,
      comm100Email: row.comm100Email,
      userName: values.userAccount.label,
    };
    const newData = [...unchangedData, changedData];
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

  return {
    handleOpen,
    handleClose,
    handleSave,
    open,
  };
};
