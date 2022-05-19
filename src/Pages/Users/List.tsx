import { useMediaQuery } from "@mui/material";
import { SimpleList, List, Datagrid, EmailField, TextField } from "react-admin";

export const UserList = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <List title="All users">
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="username" />
          <EmailField source="email" />
        </Datagrid>
      )}
    </List>
  );
};
