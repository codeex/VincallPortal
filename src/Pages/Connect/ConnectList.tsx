import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { MappingUserButton } from "./Operations/MappingUserButton";
import { RemoveMappingButton } from "./Operations/RemoveMappingButton";
import Divider from "@mui/material/Divider";
import { useEffect, useState, useMemo, useCallback } from "react";
import { customHttpClient } from "../../DataProvider/customHttpClient";

const rows = [
  { id: 1, userAccount: "Dahan", userName: "Admin" },
  { id: 2, userAccount: "admin44", userName: "Admin44" },
];

export interface ConnectListProps {
  connected: boolean;
}
export const ConnectList = ({ connected }: ConnectListProps) => {
  const [mapping, setMapping] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleRefresh = useCallback(() => {
    setRefresh(!refresh);
  }, []);
  const handleLoad = () => {
    customHttpClient(
      `https://apivincall.comm100dev.io/api/usermapping/${localStorage.getItem(
        "connectSiteId"
      )}`,
      {
        method: "GET",
      }
    ).then((res) =>
      setMapping(
        res.json.map((j: any, index: number) => Object.assign({ id: index }, j))
      )
    );
  };

  useEffect(() => {
    handleLoad();
  }, [refresh]);
  // console.log("mapping >>", mapping);

  const columns: GridColumns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
        sortable: false,
        headerAlign: "center",
        align: "center",
        hide: true,
      },
      {
        field: "comm100AgentId",
        headerName: "Comm100 Agent Id",
        flex: 2,
        sortable: false,
        headerAlign: "center",
      },
      {
        field: "comm100Email",
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
        width: 350,
        sortable: false,
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <MappingUserButton
                row={params.row}
                allData={mapping}
                onRefresh={handleRefresh}
              />
              <Divider orientation="vertical" flexItem />
              <RemoveMappingButton
                row={params.row}
                allData={mapping}
                onRefresh={handleRefresh}
              />
            </div>
          );
        },
      },
    ],
    [mapping]
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={!connected ? mapping : []}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableColumnMenu
      />
    </div>
  );
};
