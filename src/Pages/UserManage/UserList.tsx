import { useMediaQuery } from "@mui/material";
import { SimpleList, List, Datagrid, TextField, TopToolbar } from "react-admin";
import { UserManageOperation } from "./UserManageOperation/UserManageOperation";

export const UserList = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <List title="All Users" actions={<TopToolbar />}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="userAccount" />
          <TextField source="name" />
          <TextField source="remark" />
          <TextField source="createDate" />
          <UserManageOperation />
        </Datagrid>
      )}
    </List>
  );
};
