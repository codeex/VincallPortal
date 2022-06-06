import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { MappingUserButton } from "./Operations/MappingUserButton";
import { RemoveMappingButton } from "./Operations/RemoveMappingButton";
import Divider from "@mui/material/Divider";
import { useEffect, useState, useMemo, useCallback } from "react";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { getServerURL } from "../../App";
import { useGetList } from "react-admin";

const rows = [
  { id: 1, userAccount: "Dahan", userName: "Admin" },
  { id: 2, userAccount: "admin44", userName: "Admin44" },
];

export interface ConnectListProps {
  connected: boolean;
  shouldPageRefresh: boolean;
  refresh: number;
  handleRefresh: () => void;
}
export const ConnectList = ({
  connected,
  shouldPageRefresh,
  refresh,
  handleRefresh,
}: ConnectListProps) => {
  const [mapping, setMapping] = useState([]);
  // const [refresh, setRefresh] = useState<number>(0);

  // const handleRefresh = useCallback(() => {
  //   setRefresh(refresh === 0 ? 1 : 0);
  // }, []);
  const { data: userList = [], isLoading: isUserLoading } = useGetList<any>(
    "users",
    {
      meta: "all",
    },
    {
      refetchInterval: -1,
    }
  );

  // console.log("refresh >>", refresh, connected);
  const handleLoad = () => {
    console.log("userList >>", userList);
    customHttpClient(
      `${getServerURL()}/usermapping/${localStorage.getItem("connectSiteId")}`,
      {
        method: "GET",
      }
    ).then((res) => {
      userList.map(() => {
        return {};
      });
      setMapping(
        res.json.map((j: any, index: number) => Object.assign({ id: index }, j))
      );
    });
  };

  useEffect(() => {
    handleLoad();
  }, [refresh, shouldPageRefresh, isUserLoading]);

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
        rows={connected ? mapping : []}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableColumnMenu
      />
    </div>
  );
};
