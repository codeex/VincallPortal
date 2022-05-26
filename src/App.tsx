import { Admin, Resource, ListGuesser, CustomRoutes } from "react-admin";
import { AgentList } from "./Pages/Agents/AgentList";
import { Layout } from "./Layout/Layout";
import { lightTheme } from "./Layout/themes";
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
import { authProvider } from "./AuthProvider/authProvider";

const getServerURL = () => {
  if (process.env.NODE_ENV === "development") {
    // append /api from proxy.
    return `http://${location.host}/api`;
  }
  return EnvConfig.serverUrl;
};

export const App = function () {
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
        create={CreateAgentForm}
      />
      <CustomRoutes>
        <Route path="/agentConsole" element={<CallPanelPage />} />
      </CustomRoutes>
      <Resource
        name="users"
        options={{ label: "User Manage" }}
        list={UserList}
      />
      <Resource
        name="reports"
        options={{ label: "Report" }}
        list={ReportPage}
      />
      <CustomRoutes>
        <Route path="/settings" element={<SettingsPage />} />
      </CustomRoutes>
    </Admin>
  );
};
