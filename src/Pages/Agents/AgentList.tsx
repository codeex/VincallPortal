import { useMediaQuery } from "@mui/material";
import { SimpleList, List, Datagrid, TextField } from "react-admin";
import { AgentOperation } from "./AgentOperation/AgentOperation";

export const AgentList = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <List title="All Agents">
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="extensionNumber" />
          <TextField source="userAccount" />
          <TextField source="remark" />
          <TextField source="createDate" />
          <AgentOperation />
        </Datagrid>
      )}
    </List>
  );
};
