import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { MappingUserButton } from "./Operations/MappingUserButton";
import { RemoveMappingButton } from "./Operations/RemoveMappingButton";
import Divider from "@mui/material/Divider";
import { useEffect, useState, useMemo, useCallback } from "react";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { getServerURL } from "../../App";
import { useGetList } from "react-admin";
import { connectListApp } from "./Application/ConnectListApp";

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
  const { isUserLoading, mapping, handleLoad } = connectListApp({});

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
              />
            </div>
          );
        },
      },
    ],
    [mapping, connectInfo]
  );

  console.log("mapping >>", mapping);
  return (
    <div style={{ height: 635, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={connected && !!mapping ? (mapping as any[]) : []}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableColumnMenu
      />
    </div>
  );
};
