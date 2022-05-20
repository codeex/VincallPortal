import { Layout as AdminLayout, LayoutProps } from "react-admin";
import AppBar from "./AppBar";
import { CustomMenu } from "./CustomMenu";

export const Layout = (props: LayoutProps) => {
  return <AdminLayout {...props} appBar={AppBar} menu={CustomMenu} />;
};
