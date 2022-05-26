import { useMediaQuery } from "@mui/material";
import {
  SimpleList,
  List,
  Datagrid,
  TextField,
  CreateButton,
  TopToolbar,
  FunctionField,
} from "react-admin";
import { BindUserButton } from "./AgentOperation/BindUserButton";
import { DeleteAgentButton } from "./AgentOperation/DeleteAgentButton";
import { TwoOperationsField } from "../TwoOperationsField";
import { PermissionEnums, useCheckPermission } from "../../Helpers/Permission";

export const AgentList = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const canCreateAgent = useCheckPermission(PermissionEnums.canCreateAgent);
  const canDeleteAgent = useCheckPermission(PermissionEnums.canDeleteAgent);
  return (
    <List
      title="All Agents"
      actions={
        canCreateAgent ? (
          <TopToolbar>
            <CreateButton />
          </TopToolbar>
        ) : (
          <></>
        )
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
                op2={canDeleteAgent ? <DeleteAgentButton /> : null}
              />
            )}
          />
        </Datagrid>
      )}
    </List>
  );
};
