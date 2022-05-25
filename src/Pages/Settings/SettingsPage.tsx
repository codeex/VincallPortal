import { Card, CardContent, Button, TextField } from "@mui/material";
import { Title, useGetList } from "react-admin";

export const SettingsPage = () => {
  const { data: settingsList = [], isLoading: isUserLoading } = useGetList<any>(
    "settings",
    {},
    {
      refetchInterval: -1,
    }
  );
  return (
    <Card>
      <Title title="Settings" />
      <CardContent>
        <TextField />
        <Button>Save</Button>
      </CardContent>
    </Card>
  );
};
