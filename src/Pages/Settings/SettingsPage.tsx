import { Card, CardContent, Button, TextField } from "@mui/material";
import { Title } from "react-admin";

export const SettingsPage = () => {
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
