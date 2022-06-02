import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormErrorMessageStyled } from "../../../StyledComponents/FormErrorMessageStyled";
import { FormButtonStyled } from "../../../StyledComponents/FormButtonStyled";
import { mappingUserFormApp } from "../Application/MappingUserFormApp";

export interface MappingUserFormProps {
  onSubmit: (values: any) => void;
  row: any;
  onCancel: () => void;
}

const validateSchema = Yup.object().shape({
  userAccount: Yup.string().required("User cannot be empty."),
});

export const MappingUserForm = ({
  onSubmit,
  row,
  onCancel,
}: MappingUserFormProps) => {
  const { userOptions, isUserLoading } = mappingUserFormApp({});

  return (
    <Formik
      initialValues={{
        userAccount: row.userName,
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
                  variant="outlined"
                />
              )}
              loading={isUserLoading}
              onChange={(_, value) => setFieldValue("userAccount", value || "")}
              defaultValue={values.userAccount}
              disableClearable
            />
            {errors.userAccount ? (
              <FormErrorMessageStyled>{`${errors.userAccount}`}</FormErrorMessageStyled>
            ) : null}
            <FormButtonStyled>
              <Button type="submit" variant="contained">
                Save
              </Button>
              <Button onClick={onCancel} variant="outlined">
                Cancel
              </Button>
            </FormButtonStyled>
          </Form>
        );
      }}
    </Formik>
  );
};
