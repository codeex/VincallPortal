import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

export const CircularProgressStyled = (props: any) => {
  const classes = useStyles();
  return <div className={classes.root} {...props}></div>;
};
