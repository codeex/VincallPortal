import { useMediaQuery } from "@mui/material";
import {
  SimpleList,
  List,
  Datagrid,
  TextField,
  CreateButton,
  TopToolbar,
} from "react-admin";
import { BindUserButton } from "./AgentOperation/BindUserButton";
import { DeleteAgentButton } from "./AgentOperation/DeleteAgentButton";
import { TwoOperationsField } from "../TwoOperationsField";

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
          <TextField source="extensionNumber" />
          <TextField source="userAccount" />
          <TextField source="remark" />
          <TextField source="createDate" />
          <TwoOperationsField
            label="Operations"
            op1={<BindUserButton />}
            op2={<DeleteAgentButton />}
          />
        </Datagrid>
      )}
    </List>
  );
};
