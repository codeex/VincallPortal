import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { FormButtonStyled } from "../../StyledComponents/FormButtonStyled";
import { BindUserButton } from "../Agents/AgentOperation/BindUserButton";
import { MappingUserButton } from "./Operations/MappingUserButton";
import { RemoveMappingButton } from "./Operations/RemoveMappingButton";
import Divider from "@mui/material/Divider";

const columns: GridColumns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "agentId", headerName: "Comm100 Agent Id", width: 250 },
  { field: "agentEmail", headerName: "Comm100 Agent Email", width: 250 },
  { field: "agentEmail", headerName: "Comm100 Agent Email", width: 250 },
  { field: "userAccount", headerName: "User Name", width: 250 },
  {
    field: "operations",
    headerName: "Operations",
    width: 300,
    renderCell: (params) => {
      console.log("params >>", params);
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <MappingUserButton record={{}} />
          <Divider orientation="vertical" flexItem />
          <RemoveMappingButton />
        </div>
      );
    },
  },
];

const rows = [
  { id: 1, firstName: "001" },
  { id: 2, firstName: "002" },
];

export const ConnectList = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableColumnMenu
      />
    </div>
  );
};
