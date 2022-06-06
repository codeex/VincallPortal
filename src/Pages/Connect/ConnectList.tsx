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
export interface MappingData {
  id: number;
  userAccount: string;
  userName: string;
  comm100AgentId: string;
  comm100Email: string;
}
export interface ConnectListProps {
  connected: boolean;
  shouldPageRefresh: boolean;
  refresh: number;
  handleRefresh: () => void;
  connectInfo: any;
}
export const ConnectList = ({
  connected,
  shouldPageRefresh,
  refresh,
  handleRefresh,
  connectInfo,
}: ConnectListProps) => {
  const [mapping, setMapping] = useState<MappingData[] | undefined>(undefined);
  const { data: userList = [], isLoading: isUserLoading } = useGetList<any>(
    "users",
    {
      meta: "all",
    },
    {
      refetchInterval: -1,
    }
  );

  const handleLoad = () => {
    customHttpClient(
      `${getServerURL()}/usermapping/${localStorage.getItem("connectSiteId")}`,
      {
        method: "GET",
      }
    ).then((res) => {
      const mappingUserList: MappingData[] = userList.map(
        (user: any, index: number) => {
          return {
            id: index,
            userAccount: user.account,
            userName: user.userName,
            comm100AgentId: "",
            comm100Email: "",
          };
        }
      );

      for (const userData of mappingUserList) {
        for (const mappingInfo of res.json) {
          if (userData.userAccount === mappingInfo.userAccount) {
            userData["comm100AgentId"] = mappingInfo["comm100AgentId"];
            userData["comm100Email"] = mappingInfo["comm100Email"];
          }
        }
      }

      setMapping(mappingUserList);
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
                connectInfo={connectInfo}
              />
              <Divider orientation="vertical" flexItem />
              <RemoveMappingButton
                row={params.row}
                allData={mapping}
                onRefresh={handleRefresh}
                connectInfo={connectInfo}
              />
            </div>
          );
        },
      },
    ],
    [mapping, connectInfo]
  );

  return (
    <div style={{ height: 635, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={connected ? (mapping as any[]) : []}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableColumnMenu
      />
    </div>
  );
};
