import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { MappingUserButton } from "./Operations/MappingUserButton";
import { RemoveMappingButton } from "./Operations/RemoveMappingButton";
import Divider from "@mui/material/Divider";

const columns: GridColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "agentId",
    headerName: "Comm100 Agent Id",
    flex: 2,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "agentEmail",
    headerName: "Comm100 Agent Email",
    flex: 2,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "userAccount",
    headerName: "User Account",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "userName",
    headerName: "User Name",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "operations",
    headerName: "Operations",
    width: 250,
    sortable: false,
    headerAlign: "center",
    renderCell: (params) => {
      // console.log("params >>", params);
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
