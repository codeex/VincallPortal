import { useStore } from "react-admin";

export const enum PermissionEnums {
  canCreateAgent,
  canDeleteAgent,
  canSelectAgentWhenCall,
  canManageUsers,
}

export const getRole = (): "admin" | "user" => "user";

export const useCheckPermission = (permission: PermissionEnums) => {
  if (getRole() === "admin") {
    return roleAdmin[permission];
  } else {
    return roleUser[permission];
  }
};

export type RolePermission = {
  [key in PermissionEnums]: boolean;
};

const roleAdmin = {
  [PermissionEnums.canCreateAgent]: true,
  [PermissionEnums.canDeleteAgent]: true,
  [PermissionEnums.canSelectAgentWhenCall]: true,
  [PermissionEnums.canManageUsers]: true,
};

const roleUser = {
  [PermissionEnums.canCreateAgent]: false,
  [PermissionEnums.canDeleteAgent]: false,
  [PermissionEnums.canSelectAgentWhenCall]: false,
  [PermissionEnums.canManageUsers]: false,
};
