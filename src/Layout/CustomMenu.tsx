import { MenuItemLink } from "react-admin";

const menuItems = [
  { name: "agents", text: "Agents", path: "/agents" },
  // Previous it called callPanel, now called Agentconsole
  { name: "agentConsole", text: "Agent Console", path: "/agentConsole" },
  { name: "report", text: "Report", path: "/report" },
  { name: "settings", text: "Settings", path: "/settings" },
  { name: "users", text: "User Manage", path: "/users" },
];

export const CustomMenu = ({ onMenuClick }: any) => {
  return (
    <>
      {menuItems.map((item) => (
        <MenuItemLink
          key={item.name}
          to={item.path}
          primaryText={item.text}
          onClick={onMenuClick}
        />
      ))}
    </>
  );
};
