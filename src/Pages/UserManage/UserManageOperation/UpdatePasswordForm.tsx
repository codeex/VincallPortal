import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useMemo, useRef, useState } from "react";
import { useGetList, useUpdate } from "react-admin";

export interface BindUserFormProps {
  onSubmit: (values: any) => void;
  record?: any;
  onCancel: () => void;
}

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
    >
      {({ setFieldValue }) => {
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
            />
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
