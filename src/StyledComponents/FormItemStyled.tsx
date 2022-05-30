import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "baseline",

      "& .MuiTypography-root": {
        width: 150,
      },

      "& span": {
        display: "none",
      },
    },
  })
);

export const FormItemStyled = (props: any) => {
  const classes = useStyles();
  return <div className={classes.root} {...props}></div>;
};
