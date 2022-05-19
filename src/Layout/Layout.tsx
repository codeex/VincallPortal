import { Layout as AdminLayout, LayoutProps } from "react-admin";
import AppBar from "./AppBar";

export const Layout = (props: LayoutProps) => {
  return <AdminLayout {...props} appBar={AppBar} />;
};
