import Button from "@mui/material/Button";
import { TextField, Skeleton } from "@mui/material";
import { Formik, Form } from "formik";
import { FormItemStyled } from "../../StyledComponents/FormItemStyled";
import Typography from "@mui/material/Typography";

export interface BindUserFormProps {
  onSubmit: (values: any, settings: any) => void;
  record?: any;
  settings: any[];
}

export const SettingsForm = ({ onSubmit, settings }: BindUserFormProps) => {
  const init = settings.map((setting) => {
    let init: { [key: string]: string } = {};
    init[setting.optionKey.split(" ").join("")] = setting.optionValue;
    return init;
  });
  const initialValues = Object.assign({}, ...init);

  return Object.keys(initialValues).length > 0 ? (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values, settings)}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form>
            {settings.map((setting) => {
              const key = setting.optionKey.split(" ").join("");
              return (
                <FormItemStyled>
                  <Typography variant="h6" gutterBottom component="div">
                    {`${setting.optionKey}: `}
                  </Typography>
                  <TextField
                    id={key}
                    label={setting.optionKey}
                    variant="filled"
                    sx={{ width: 300 }}
                    onChange={(event) => {
                      setFieldValue(key, event.target.value || "");
                    }}
                    value={values[key]}
                  />
                </FormItemStyled>
              );
            })}
            <div>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  ) : (
    <Skeleton variant="rectangular" />
  );
};
