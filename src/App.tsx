import { Admin, Resource, ListGuesser } from "react-admin";
import { AgentList } from "./Pages/Agents/AgentList";
import { Layout } from "./Layout/Layout";
import { lightTheme } from "./Layout/themes";
import { dataProviderFactory } from "./DataProvider";
import { Login } from "./Pages/Login/Login";
import { UserList } from "./Pages/UserManage/UserList";
import { CreateAgentForm } from "./Pages/Agents/CreateAgent/CreateAgentForm";

export const App = function () {
  return (
    <Admin
      title="Vin Call"
      dataProvider={dataProviderFactory("http://localhost:4000")}
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
    </Admin>
  );
};
