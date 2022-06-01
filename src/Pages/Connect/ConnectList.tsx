import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { BindUserButton } from "../Agents/AgentOperation/BindUserButton";
import { MappingUserButton } from "./Operations/MappingUserButton";
import { RemoveMappingButton } from "./Operations/RemoveMappingButton";

const columns: GridColumns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "agentId", headerName: "Comm100 Agent Id", width: 250 },
  { field: "agentEmail", headerName: "Comm100 Agent Email", width: 250 },
  { field: "agentEmail", headerName: "Comm100 Agent Email", width: 250 },
  { field: "userAccount", headerName: "User Name", width: 250 },
  {
    field: "operations",
    headerName: "Operations",
    width: 250,
    renderCell: (params) => {
      console.log("params >>", params);
      return (
        <div>
          <MappingUserButton record={{}} />
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
    <div style={{ height: 400, width: "75%" }}>
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
