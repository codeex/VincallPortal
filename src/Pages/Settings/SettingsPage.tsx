import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Title, useDataProvider } from "react-admin";
import { SettingsForm } from "./SettingsForm";
import Alert from "@mui/material/Alert";

export const SettingsPage = () => {
  const [settingsList, setSettings] = useState([]);
  const [error, setError] = useState<boolean | undefined>(undefined);
  const dataProvider = useDataProvider();
  const handleLoad = async () => {
    await dataProvider
      .httpGet("settings", {})
      .then((res: any) => setSettings(res.data));
  };

  const handleSave = (values: any, settings: any) => {
    settings.map(async (s: any) => {
      await dataProvider
        .updatePatch("setting", {
          id: s.id,
          data: { ...s, optionValue: values[s.optionKey.split(" ").join("")] },
        })
        .catch(() => setError(true));
    });
    setError(false);
  };

  useEffect(() => {
    setError(undefined);
    handleLoad();
  }, []);

  return (
    <Card>
      <Title title="Settings" />
      <CardContent>
        <SettingsForm settings={settingsList} onSubmit={handleSave} />
      </CardContent>
      {error && <Alert severity="error">Settings failed to save!</Alert>}
      {error === false && (
        <Alert severity="success">Settings saved successfully!</Alert>
      )}
    </Card>
  );
};
