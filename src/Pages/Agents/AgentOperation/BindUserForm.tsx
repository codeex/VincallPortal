import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { bindUserFormApp } from "./Application/BindUserFormApp";
import * as Yup from "yup";

export interface BindUserFormProps {
  onSubmit: (values: any) => void;
  record: any;
  onCancel: () => void;
}

const validateSchema = Yup.object().shape({
  userAccount: Yup.string().required("User cannot be empty."),
});

export const BindUserForm = ({
  onSubmit,
  record,
  onCancel,
}: BindUserFormProps) => {
  const { userOptions, isUserLoading } = bindUserFormApp({});

  return (
    <Formik
      initialValues={{
        userAccount: record.userAccount,
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validateSchema}
    >
      {({ handleChange, values, setFieldValue, errors }) => {
        return (
          <Form>
            <Autocomplete
              id="userAccount"
              options={userOptions}
              sx={{ width: 300 }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Users"
                  onChange={handleChange}
                  error={errors.userAccount}
                />
              )}
              loading={isUserLoading}
              onChange={(_, value) =>
                setFieldValue("userAccount", value?.value || "")
              }
              defaultValue={values.userAccount}
            />
            {errors.userAccount ? (
              <div style={{ color: "red" }}>{`${errors.userAccount}`}</div>
            ) : null}
            <Button type="submit">Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Form>
        );
      }}
    </Formik>
  );
};
