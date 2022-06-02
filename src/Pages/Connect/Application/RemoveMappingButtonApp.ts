import { useState } from "react";
import { useUpdate } from "react-admin";

export interface RemoveMappingButtonAppProps {}

export interface RemoveMappingButtonApp {
  handleRemove: () => void;
}

export const removeMappingButtonApp = ({}: RemoveMappingButtonAppProps): RemoveMappingButtonApp => {
  const handleRemove = () => {};

  return {
    handleRemove,
  };
};
