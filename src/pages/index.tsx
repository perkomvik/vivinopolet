import { styled } from "@mui/material/styles";

import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import SearchBar from "../components/searchBar";
import { getStores } from "../database/client";

const PREFIX = "Home";

const classes = {
  h4: `${PREFIX}-h4`,
  h6: `${PREFIX}-h6`,
  footer: `${PREFIX}-footer`,
  container: `${PREFIX}-container`,
  main: `${PREFIX}-main`,
};

const StyledContainer = styled(Container)(() => ({
  [`& .${classes.h4}`]: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },

  [`& .${classes.h6}`]: {
    paddingTop: "20px",
  },

  [`& .${classes.footer}`]: {
    width: "100%",
    height: "100px",
    borderTop: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  [`&.${classes.container}`]: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  [`& .${classes.main}`]: {
    padding: "5rem 0",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export async function getStaticProps() {
  const stores = await getStores();
  return {
    props: {
      stores,
    },
  };
}

const Home = ({ stores }) => {
  return (
    <StyledContainer className={classes.container}>
      <SearchBar stores={stores} currentStoreId={0} />
      <main className={classes.main}>
        <Typography variant="h6" className={classes.h6}>
          Søk etter vinmonopol
          <SubdirectoryArrowRightIcon style={{ transform: "rotate(-90deg)" }} />
        </Typography>

        <div className={classes.h4}>
          <Typography variant="h4">Velkommen til Vivinopolet!</Typography>
        </div>
      </main>

      <footer className={classes.footer}>
        <a
          href="https://github.com/perkomvik"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="h6">av per</Typography>
        </a>
      </footer>
    </StyledContainer>
  );
};

export default Home;
