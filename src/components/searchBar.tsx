import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Out from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

import Store from "../Interfaces/Store";
import { makeStyles, createStyles, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Product from "../Interfaces/Product";
import Hidden from "@mui/material/Hidden";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& label": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
  },
  "& .Mui-focused": {
    borderColor: "white",
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px",
      borderColor: "white !important",
    },
  },
});

const SearchBar = (props: { stores: Store[]; currentStoreId }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onStoreChange = (event: any, store: Store | null) => {
    if (store !== null && store.id !== props.currentStoreId) {
      setLoading(true);
      router.push(`/stores/${encodeURIComponent(store?.id)}`);
    }
  };
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/">
            <Button sx={{ borderRadius: "2.5em" }}>
              <Avatar
                alt="V"
                src="/logo.png"
                sx={{ width: "2.5em", height: "2.5em" }}
              />
            </Button>
          </Link>
        </Box>
        <Hidden smDown implementation="css">
          <Typography variant="h6">Velg vinmonopol:</Typography>
        </Hidden>
        <Autocomplete
          id="search-box"
          options={props.stores}
          getOptionLabel={(option: Store) => option.name}
          sx={{
            width: "300px",
            margin: "1em",
            "& .MuiAutocomplete-popupIndicator": { color: "white" },
            "& .MuiAutocomplete-clearIndicator": { color: "white" },
          }}
          onChange={onStoreChange}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              label="Vinmonopol"
              variant="outlined"
            />
          )}
        />
        <div style={{ minWidth: "35px" }}>
          {isLoading ? (
            <CircularProgress size={"2em"} color="inherit" />
          ) : (
            <SearchIcon style={{ color: "white" }} fontSize="large" />
          )}
        </div>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
