import { Admin, Resource, CustomRoutes } from "react-admin";
import { AgentList } from "./Pages/Agents/AgentList";
import { Layout } from "./Layout/Layout";
// import { dataProviderFactory } from "./DataProvider";
import { Login } from "./Pages/Login/Login";
import { UserList } from "./Pages/UserManage/UserList";
import { CreateAgentForm } from "./Pages/Agents/CreateAgent/CreateAgentForm";
import { SettingsPage } from "./Pages/Settings/SettingsPage";
import { Route } from "react-router-dom";
import { ReportPage } from "./Pages/Report/ReportPage";
import { CallPanelPage } from "./Pages/CallPanel/CallPanelPage";
import { EnvConfig } from "./EnvConfig";
import { dataProviderFactory } from "./DataProvider";
import { PermissionEnums, useCheckPermission } from "./Helpers/Permission";
import { lightTheme } from "./Layout/Theme/Index";
import { authProvider } from "./AuthProvider/authProvider";

export const getServerURL = () => {
  if (process.env.NODE_ENV === "development") {
    // append /api from proxy.
    return `http://${location.host}/api`;
  }
  return EnvConfig.serverUrl;
};

export const App = function () {
  const canCreateAgent = useCheckPermission(PermissionEnums.canCreateAgent);
  const canManageUsers = useCheckPermission(PermissionEnums.canManageUsers);
  return (
    <Admin
      title="Vin Call"
      dataProvider={dataProviderFactory(getServerURL())}
      loginPage={Login}
      layout={Layout}
      theme={lightTheme}
      authProvider={authProvider}
    >
      <Resource
        name="agents"
        options={{ label: "Agents" }}
        list={AgentList}
        create={canCreateAgent ? CreateAgentForm : undefined}
      />
      <CustomRoutes>
        <Route path="/agentConsole" element={<CallPanelPage />} />
      </CustomRoutes>

      <Resource
        name="reports"
        options={{ label: "Report" }}
        list={ReportPage}
      />
      {canManageUsers ? (
        <Resource
          name="users"
          options={{ label: "User Manage" }}
          list={UserList}
        />
      ) : null}
      <CustomRoutes>
        <Route path="/settings" element={<SettingsPage />} />
      </CustomRoutes>
    </Admin>
  );
};
