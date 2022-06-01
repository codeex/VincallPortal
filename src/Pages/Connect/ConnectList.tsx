import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const columns: GridColumns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "Comm100 Agent Id", width: 150 },
];

const rows = [
  { id: 1, firstName: "001" },
  { id: 2, firstName: "002" },
];

export const ConnectList = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridToolbar />
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

const DataGridToolbar = () => {
  return (
    <Toolbar>
      <Typography>test</Typography>
    </Toolbar>
  );
};
