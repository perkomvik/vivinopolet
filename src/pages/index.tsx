import React from "react";

import { makeStyles, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import SearchBar from "../components/searchBar";
import { getStores } from "../helpers/cloudStorageClient";
import Container from "@material-ui/core/Container";

export async function getStaticProps() {
  const stores = await getStores();
  return {
    props: {
      stores
    },
  }
}

const useStyles = makeStyles(() =>
  createStyles({
    h4: {
      display: "flex",
      flex: 1,
      alignItems: "center"
    },
    h6: {
      paddingTop: "20px"
    },
    footer: {
      width: "100%",
      height: "100px",
      borderTop: "1px solid #eaeaea",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    main: {
      padding: "5rem 0",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }
  })
);

const Home = ({ stores }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <SearchBar stores={stores} currentStoreId={0} />
      <main className={classes.main}>
        <Typography variant="h6" className={classes.h6}>
          Søk etter vinmonopol
          <SubdirectoryArrowRightIcon style={{ transform: "rotate(-90deg)" }} />
        </Typography>

        <div className={classes.h4}>
          <Typography variant="h4">
            Velkommen til Vivinopolet!
          </Typography>
        </div>
      </main>

      <footer className={classes.footer}>
        <a
          href="https://github.com/perkomvik"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="h6">
            av perkomvik
          </Typography>
        </a>
      </footer>
    </Container>
  )
};

export default Home;