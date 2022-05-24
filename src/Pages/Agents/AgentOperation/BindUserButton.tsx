import Button from "@mui/material/Button";
import { useMemo, useRef, useState } from "react";
import { Drawer } from "@mui/material";
import { useGetList, useUpdate } from "react-admin";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, TextField, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const BindUserButton = (props: any) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  const { data: userList = [], isLoading: isUserLoading } = useGetList<any>(
    "users",
    {},
    {
      refetchInterval: -1,
    }
  );

  const [update] = useUpdate<any>();

  const userOptions = useMemo(() => {
    return userList.map((user) => ({
      label: user.userName,
      value: user.userName,
    }));
  }, [userList]);

  const ref = useRef(null as any);

  const handleClose = () => setOpen(false);
  const handleSave = () => {
    update("agents", {
      id: props.record.id,
      data: { account: ref.current.value },
    });
  };

  return (
    <>
      <Button variant="text" onClick={handleClick}>
        Bind User
      </Button>
      <Drawer open={open} anchor="right" title="Bind User">
        <Box style={{ padding: 24, paddingTop: 16 }}>
          <Button
            variant="text"
            onClick={handleClose}
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
          <Typography variant="h6" gutterBottom>
            Bind User
          </Typography>
          <Autocomplete
            id="user"
            options={userOptions}
            sx={{ width: 300 }}
            renderInput={(params: any) => (
              <TextField {...params} label="Users" />
            )}
            loading={isUserLoading}
            onChange={(event, value) => (ref.current = value)}
          />
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Drawer>
    </>
  );
};
