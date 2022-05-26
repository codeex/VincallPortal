import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export interface BindUserFormProps {
  onSubmit: (values: any) => void;
  record?: any;
  onCancel: () => void;
}

const validateSchema = Yup.object().shape({
  password: Yup.string().required("Password cannot be empty."),
});

export const UpdatePasswordForm = ({
  onSubmit,
  record,
  onCancel,
}: BindUserFormProps) => {
  return (
    <Formik
      initialValues={{
        password: "",
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validateSchema}
    >
      {({ errors, setFieldValue }) => {
        return (
          <Form>
            <TextField
              id="password"
              label="Password"
              variant="filled"
              sx={{ width: 300 }}
              onChange={(event) =>
                setFieldValue("password", event.target.value || "")
              }
              error={!!errors.password}
            />
            {errors.password ? (
              <div style={{ color: "red" }}>{`${errors.password}`}</div>
            ) : null}
            <div>
              <Button type="submit">Save</Button>
              <Button onClick={onCancel}>Cancel</Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
