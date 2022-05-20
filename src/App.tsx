import { Admin, Resource } from "react-admin";
import { AgentList } from "./Pages/Agents/AgentList";
import { Layout } from "./Layout/Layout";
import { lightTheme } from "./Layout/themes";
import { dataProviderFactory } from "./DataProvider";
import { Login } from "./Pages/Login/Login";

export const App = function () {
  return (
    <Admin
      title="Vin Call"
      dataProvider={dataProviderFactory("http://localhost:4000")}
      loginPage={Login}
      layout={Layout}
      theme={lightTheme}
    >
      <Resource name="agents" list={AgentList} />
    </Admin>
  );
};
