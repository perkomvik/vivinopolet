import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from '@material-ui/icons/Search';

import Store from "../Interfaces/Store";
import { makeStyles, createStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Product from "../Interfaces/Product";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles(() =>
  createStyles({
    justifycenter: {
      justifyContent: "center",
    },
    grow: {
      flexGrow: 1
    },
    avatar: {
      width: "2.5em",
      height: "2.5em"
    },
    avatarButton: {
      borderRadius: "2.5em"
    }
  })
);

const useAutocompleteSyle = makeStyles(() =>
  createStyles({
    clearIndicator: {
      color: "white",
    },
    popupIndicator: {
      color: "white",
    }
  })
);

const useInputStyle = makeStyles(() =>
  createStyles({
    root: {
      color: "white",
      '&hover &$focused $notchedOutline': {
        borderColor: "white",
      }
    },

    focused: {
      borderColor: "white",
      color: "white",
    },

    notchedOutline: {
      borderWidth: '1px',
      borderColor: 'white !important'
    },
  }
  ));

const useLabelStyle = makeStyles(() =>
  createStyles({
    root: {
      color: "white",
      '&$focused': {
        color: "white"
      }
    },
    focused: {
      color: "white",
    }
  })
);

const SearchBar = (props: { stores: Store[] }) => {
  const classes = useStyles();
  const autocompleteClasses = useAutocompleteSyle();
  const inputClasses = useInputStyle();
  const labelClasses = useLabelStyle();

  const [store, setStore] = useState<Store | null>(null);
  const router = useRouter()
  const onStoreChange = (event: any, newValue: Store | null) => {
    setStore(newValue);
  }
  const onSearch = (event: any) => {
    if (store !== null) {
      router.push(`/stores/${encodeURIComponent(store?.id)}`)
    }
  }

  const onKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onSearch(event);
    }
  }


  const searchUrl = store ? `/stores/${encodeURIComponent(store?.id)}` : "#";
  return (
    <AppBar style={{ zIndex: 1501 }}>
      <Toolbar className={classes.justifycenter}>
        <div className={classes.grow}>
          <Link href="/">
            <Button className={classes.avatarButton}>
              <Avatar alt="V" src="/logo.png" className={classes.avatar} />
            </Button>
          </Link>
        </div>
        <Hidden smDown implementation="css">
          <Typography variant="h6">
            Velg vinmonopol:
          </Typography>
        </Hidden>
        <Autocomplete
          id="search-box"
          options={props.stores}
          getOptionLabel={(option) => option.name}
          classes={autocompleteClasses}
          style={{ width: "300px", margin: "1em" }}
          onChange={onStoreChange}
          renderInput={(params) =>
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, classes: inputClasses }}
              InputLabelProps={{ classes: labelClasses }}
              label="Vinmonopol"
              variant="outlined"
              onKeyDown={onKeyDown}
            />
          }
        />
        <Link href={searchUrl}>
          <IconButton onClick={onSearch}>
            <SearchIcon style={{ color: "white" }} fontSize="large" />
          </IconButton>
        </Link>
        <div className={classes.grow} />
      </Toolbar>
    </AppBar>
  )
}

export default SearchBar;