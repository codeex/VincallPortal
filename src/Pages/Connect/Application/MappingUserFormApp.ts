import { useMemo } from "react";
import { useGetList } from "react-admin";

export interface MappingUserFormAppProps {}

export interface SelectOption {
  label: string;
  value: string;
}

export interface MappingUserFormApp {
  userOptions: SelectOption[];
  isUserLoading: boolean;
}

export const mappingUserFormApp = ({}: MappingUserFormAppProps): MappingUserFormApp => {
  const { data: userList = [], isLoading: isUserLoading } = useGetList<any>(
    "users",
    {
      meta: "all",
    },
    {
      refetchInterval: -1,
    }
  );
  const userOptions = useMemo(() => {
    return userList.map((user) => ({
      label: user.userName,
      value: user.account,
    }));
  }, [userList]);

  return {
    userOptions,
    isUserLoading,
  };
};
