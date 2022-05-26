import { Card, CardContent, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Title, useDataProvider, useGetList } from "react-admin";
import { customHttpClient } from "../../DataProvider/customHttpClient";
import { SettingsForm } from "./SettingsForm";

export const SettingsPage = () => {
  const [settingsList, setSettings] = useState([]);
  const dataProvider = useDataProvider();
  const handleLoad = async () => {
    const res = await dataProvider
      .httpGet("settings", {})
      .then((res: any) => setSettings(res.data));
  };

  const handleSave = (values: any) => {
    console.log("values >>", values);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  console.log("settingsList >>", settingsList);

  return (
    <Card>
      <Title title="Settings" />
      <CardContent>
        <SettingsForm settings={settingsList} onSubmit={handleSave} />
      </CardContent>
    </Card>
  );
};
