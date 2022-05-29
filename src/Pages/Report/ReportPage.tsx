import { Box, Card, Paper } from "@mui/material";
import { List, Datagrid, ListBase, TextField } from "react-admin";
import { CPagination } from "../../Components/CPagination";
import { ReportChart } from "./ReportChart";

export const ReportPage = () => {
  return (
    <ReportList
      pagination={<CPagination />}
      perPage={10}
      debounce={-1}
      exporter={false}
    >
      <Datagrid bulkActionButtons={false} size="medium">
        <TextField source="agentId" label="Agent Id" />
        <TextField source="userName" label="Agent User" />
        <TextField source="incomingCall" label="Incoming Call" />
        <TextField source="outboundCall" label="Outbound Call" />
        <TextField source="callTime" label="Call Time" />
      </Datagrid>
    </ReportList>
  );
};

export const ReportList = ({ children, ...others }: any) => {
  return (
    <ListBase {...others}>
      <Paper sx={{ p: 3, marginTop: 5 }}>
        <ReportChart />
        <Card sx={{ marginTop: 2 }}>{children}</Card>
      </Paper>
    </ListBase>
  );
};

export interface ReportItemBo {
  id: number;
  agentId: number;
  userName: string;
  incomingCall: number;
  outboundCall: number;
  callTime: number;
}
