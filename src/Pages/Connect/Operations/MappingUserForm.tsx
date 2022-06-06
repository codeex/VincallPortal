import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormErrorMessageStyled } from "../../../StyledComponents/FormErrorMessageStyled";
import { FormButtonStyled } from "../../../StyledComponents/FormButtonStyled";
import {
  mappingUserFormApp,
  SelectOption,
} from "../Application/MappingUserFormApp";
import { customHttpClient } from "../../../DataProvider/customHttpClient";
import { useEffect, useState } from "react";
import { truncateSync } from "fs";

export interface MappingUserFormProps {
  onSubmit: (values: any) => void;
  row: any;
  onCancel: () => void;
  connectInfo: any;
}

const validateSchema = Yup.object().shape({
  comm100Agent: Yup.string().required("Comm100 Agent cannot be empty."),
});

export const MappingUserForm = ({
  onSubmit,
  row,
  onCancel,
  connectInfo,
}: MappingUserFormProps) => {
  const { userOptions, isUserLoading } = mappingUserFormApp({
    connectInfo,
  });

  const [agentOptions, setOptions] = useState<SelectOption[]>([]);
  const [isAgentLoading, setLoading] = useState<boolean>(true);
  const handleLoad = () => {
    setLoading(true);
    customHttpClient(
      `${connectInfo.domain}/api/global/agents?siteId=${localStorage.getItem(
        "connectSiteId"
      )}`,
      {
        method: "GET",
      }
    ).then((res) => {
      setOptions(res.json.map((j: any) => ({ label: j.email, value: j.id })));
      setLoading(false);
    });
  };

  console.log("agentOptions >>", agentOptions);

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <Formik
      initialValues={{
        comm100Agent: { label: row.comm100Email, value: row.comm100AgentId },
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validateSchema}
    >
      {({ handleChange, values, setFieldValue, errors }) => {
        return (
          <Form>
            <Autocomplete
              id="comm100Agent"
              options={agentOptions}
              sx={{ width: 300 }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Agents"
                  onChange={handleChange}
                  error={errors.comm100Agent}
                  variant="outlined"
                />
              )}
              loading={isAgentLoading}
              onChange={(_, value) => {
                setFieldValue("comm100Agent", value || "");
              }}
              defaultValue={values.comm100Agent}
              disableClearable
            />
            {errors.comm100Agent ? (
              <FormErrorMessageStyled>{`${errors.comm100Agent}`}</FormErrorMessageStyled>
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
