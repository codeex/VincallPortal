import {
  Datagrid,
  FunctionField,
  List,
  TextField,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import { CListPagination } from "../../Components/CPagination";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { CallTimeField } from "../Report/CallTimeField";

export const CallList = () => {
  return (
    <List
      resource="calllistsForToday"
      actions={<></>}
      empty={
        <Box sx={{ textAlign: "center", p: 4, width: "100%" }}>
          <Typography>No call record.</Typography>
        </Box>
      }
      pagination={<CListPagination rowsPerPageOptions={[20, 35, 50]} />}
      perPage={20}
    >
      <Datagrid size="medium" bulkActionButtons={false}>
        <CallNumberField
          source="extensionNumber"
          label="Number"
          sortable={false}
        />
        <CallTimeField source="callTime" label="Duration" sortable={false} />
        <TextField source="createDate" label="Time" sortable={false} />
        <FunctionField
          label="Operations"
          render={(record: any) => <span>operation</span>}
        />
      </Datagrid>
    </List>
  );
};

const CallNumberField = ({}: any) => {
  const record = useRecordContext();
  const isIncomingCall = record.extensionNumber === record.to;
  return isIncomingCall ? (
    <Box component="span" sx={style}>
      <CallReceivedIcon /> {record.from}
    </Box>
  ) : (
    <Box component="span" sx={style}>
      <CallMadeIcon /> {record.to}
    </Box>
  );
};

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
