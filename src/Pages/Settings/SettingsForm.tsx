import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useMemo, useRef, useState } from "react";
import { useGetList, useUpdate } from "react-admin";

export interface BindUserFormProps {
  onSubmit: (values: any, settings: any) => void;
  record?: any;
  settings: any[];
}

export const SettingsForm = ({
  onSubmit,
  record,
  settings,
}: BindUserFormProps) => {
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
                <div>
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
                </div>
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
    <></>
  );
};
