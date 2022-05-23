import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useRedirect,
} from "react-admin";
import Button from "@mui/material/Button";

export const CreateAgentForm = (props: any) => {
  const redirect = useRedirect();
  const handleClick = () => {
    redirect("/agents");
  };

  return (
    <Create {...props}>
      <SimpleForm
        toolbar={
          <Toolbar>
            <SaveButton icon={<></>} />
            <div style={{ marginLeft: 12 }}>
              <Button variant="outlined" onClick={handleClick}>
                Cancel
              </Button>
            </div>
          </Toolbar>
        }
      >
        <TextInput source="extensionNumber" />
        <TextInput multiline source="Remark" />
      </SimpleForm>
    </Create>
  );
};
