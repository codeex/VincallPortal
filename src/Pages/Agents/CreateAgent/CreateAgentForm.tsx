import { Create, SimpleForm, TextInput } from "react-admin";

export const CreateAgentForm = (props: any) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="extensionNumber" />
        <TextInput multiline source="Remark" />
      </SimpleForm>
    </Create>
  );
};
