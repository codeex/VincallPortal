import { useMediaQuery } from "@mui/material";
import {
  SimpleList,
  List,
  Datagrid,
  TextField,
  CreateButton,
  TopToolbar,
  FunctionField,
  EditButton,
  CustomRoutes,
} from "react-admin";
import { BindUserButton } from "./AgentOperation/BindUserButton";
import { DeleteAgentButton } from "./AgentOperation/DeleteAgentButton";
import { TwoOperationsField } from "../TwoOperationsField";
import { Route } from "react-router-dom";
import { Drawer } from "@mui/material";

export const AgentList = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <List
      title="All Agents"
      actions={
        <TopToolbar>
          <CreateButton />
        </TopToolbar>
      }
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="deviceNumber" />
          <TextField source="userAccount" />
          <TextField source="remark" />
          <TextField source="createDate" />
          <FunctionField
            label="Operations"
            render={(record: any) => (
              <TwoOperationsField
                op1={<BindUserButton record={record} />}
                // op1={<EditButton label="Bind User" />}
                op2={<DeleteAgentButton />}
              />
            )}
          />
        </Datagrid>
      )}
    </List>
  );
};
