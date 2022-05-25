import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { useMemo, useRef, useState } from "react";
import { useGetList, useUpdate } from "react-admin";

export const BindUserForm = (props: any) => {
  const { data: userList = [], isLoading: isUserLoading } = useGetList<any>(
    "users",
    {},
    {
      refetchInterval: -1,
    }
  );
  const userOptions = useMemo(() => {
    return userList.map((user) => ({
      label: user.userName,
      value: user.userName,
    }));
  }, [userList]);

  return (
    <Formik
      initialValues={{
        userAccount: props.record.userAccount,
      }}
      onSubmit={(values) => props.onSubmit(values)}
    >
      {({ handleChange, values, setFieldValue }) => {
        return (
          <Form>
            <Autocomplete
              id="userAccount"
              options={userOptions}
              sx={{ width: 300 }}
              renderInput={(params: any) => (
                <TextField {...params} label="Users" onChange={handleChange} />
              )}
              loading={isUserLoading}
              onChange={(event, value) =>
                setFieldValue("userAccount", value?.value || "")
              }
              defaultValue={values.userAccount}
            />
            <Button type="submit">Save</Button>
          </Form>
        );
      }}
    </Formik>
  );
};