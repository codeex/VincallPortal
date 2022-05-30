import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useRedirect,
} from "react-admin";
import Button from "@mui/material/Button";
import { FormItemStyled } from "../../../StyledComponents/FormItemStyled";
import Typography from "@mui/material/Typography";

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
        <FormItemStyled>
          <Typography variant="subtitle1" gutterBottom component="div">
            {`Extension Number: `}
          </Typography>
          <TextInput
            source="extensionNumber"
            variant="outlined"
            label={false}
          />
        </FormItemStyled>
        <FormItemStyled>
          <Typography variant="subtitle1" gutterBottom component="div">
            {`Remark: `}
          </Typography>
          <TextInput
            multiline
            source="Remark"
            label={undefined}
            variant="outlined"
          />
        </FormItemStyled>
      </SimpleForm>
    </Create>
  );
};
