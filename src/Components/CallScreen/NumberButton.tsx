import Button from "@mui/material/Button";

export interface NumberButtonProps {
  onClick: (character?: number | string) => void;
  character?: number | string;
  children: any;
  active?: boolean;
}

export const NumberButton = ({
  character,
  children,
  active,
  onClick,
}: NumberButtonProps) => {
  return (
    <Button
      sx={NumberButtonStyle}
      onClick={() => {
        onClick(character);
      }}
      variant={active ? "contained" : "outlined"}
    >
      {children}
    </Button>
  );
};

const NumberButtonStyle = {
  width: 56,
  height: 56,
  minWidth: 56,
  border: "1px solid #DDD",
  borderRadius: "100%",
  padding: 0,
  "&:focus": {
    "&:after": {
      backgroundColor: "transparent",
    },
  },
};
