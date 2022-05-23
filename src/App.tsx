import { Admin, Resource, ListGuesser, CustomRoutes } from "react-admin";
import { AgentList } from "./Pages/Agents/AgentList";
import { Layout } from "./Layout/Layout";
import { lightTheme } from "./Layout/themes";
import { dataProviderFactory } from "./DataProvider";
import { Login } from "./Pages/Login/Login";
import { UserList } from "./Pages/UserManage/UserList";
import { CreateAgentForm } from "./Pages/Agents/CreateAgent/CreateAgentForm";
import { SettingsPage } from "./Pages/Settings/SettingsPage";
import { Route } from "react-router-dom";
import { ReportPage } from "./Pages/Report/ReportPage";

export const App = function () {
  return (
    <Admin
      title="Vin Call"
      dataProvider={dataProviderFactory("https://voipapi.comm100dev.io")}
      loginPage={Login}
      layout={Layout}
      theme={lightTheme}
    >
      <Resource
        name="agents"
        options={{ label: "Agents" }}
        list={AgentList}
        create={CreateAgentForm}
      />
      <Resource
        name="users"
        options={{ label: "User Manage" }}
        list={UserList}
      />
      <CustomRoutes>
        <Route path="/report" element={<ReportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </CustomRoutes>
    </Admin>
  );
};
