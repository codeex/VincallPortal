import Box from "@mui/material/Box";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
PersonOutlineIcon;
import { MenuProps, useSidebarState } from "react-admin";
import { CMenuItem } from "./CMenuItem";
import { useCheckPermission, PermissionEnums } from "../Helpers/Permission";

const menuItems = [
  { name: "agents", text: "Agents", path: "/agents", icon: <PeopleAltIcon /> },
  {
    name: "callpanel",
    text: "Call Panel",
    path: "/callpanel",
    icon: <AddIcCallIcon />,
  },
  {
    name: "reports",
    text: "Report",
    path: "/reports",
    icon: <InsertChartIcon />,
  },
  {
    name: "settings",
    text: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
  {
    name: "users",
    text: "User Manage",
    path: "/users",
    icon: <PersonOutlineIcon />,
  },
];
const Menu = ({ dense = false }: MenuProps) => {
  const [open] = useSidebarState();
  const canManageUsers = useCheckPermission(PermissionEnums.canManageUsers);
  let menus = menuItems;
  if (!canManageUsers) {
    menus = menuItems.filter((item) => item.name !== "users");
  }
  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      {menus.map((m) => {
        return (
          <CMenuItem to={m.path} key={m.name} icon={m.icon} label={m.text} />
        );
      })}
    </Box>
  );
};

export default Menu;
