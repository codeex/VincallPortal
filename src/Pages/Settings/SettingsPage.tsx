import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Title, useDataProvider } from "react-admin";
import { SettingsForm } from "./SettingsForm";

export const SettingsPage = () => {
  const [settingsList, setSettings] = useState([]);
  const dataProvider = useDataProvider();
  const handleLoad = async () => {
    await dataProvider
      .httpGet("settings", {})
      .then((res: any) => setSettings(res.data));
  };

  const handleSave = (values: any, settings: any) => {
    settings.map(async (s: any) => {
      await dataProvider.updatePatch("setting", {
        id: s.id,
        data: { ...s, optionValue: values[s.optionKey.split(" ").join("")] },
      });
    });
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Card>
      <Title title="Settings" />
      <CardContent>
        <SettingsForm settings={settingsList} onSubmit={handleSave} />
      </CardContent>
    </Card>
  );
};
