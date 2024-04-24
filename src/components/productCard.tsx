import Card from "@mui/material/Card";
import { styled } from '@mui/material/styles';
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Product from "../Interfaces/Product";
import { makeStyles, createStyles } from "@mui/material/styles";
import WarningIcon from "@mui/icons-material/Warning";
import React from "react";
import Grid from "@mui/material/Grid";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { mapCountryToCode } from "../helpers/countryUtils";
import Flag from "react-world-flags";
import Link from "@mui/material/Link";

const PREFIX = 'ProductCard';

const classes = {
  warning: `${PREFIX}-warning`,
  root: `${PREFIX}-root`,
  media: `${PREFIX}-media`,
  content: `${PREFIX}-content`,
  score: `${PREFIX}-score`
};

const StyledCard = styled(Card)((
  {
    theme
  }
) => ({
  [`& .${classes.warning}`]: {
    color: theme.palette.warning.main,
    fontSize: "inherit",
    verticalAlign: "middle",
  },

  [`&.${classes.root}`]: {
    flexGrow: 1,
    maxWidth: "600px",
  },

  [`& .${classes.media}`]: {
    height: "175px",
    objectFit: "contain",
  },

  [`& .${classes.content}`]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  [`& .${classes.score}`]: {
    display: "flex",
    alignItems: "center",
    paddingRight: "5px",
  }
}));

const vinmonopolet_url = "https://vinmonopolet.no";

const flagStyle = {
  position: "relative",
  top: "50%",
  transform: "translateY(-50%)",
};

const ProductCard = (props: { product: Product }) => {

  const image = props.product.images.find((img) => img.format === "product");
  const countryCode = mapCountryToCode(props.product.main_country.name);

  const renderNRatings = () => {
    const nRatings = props.product.n_ratings;
    const shouldDisplayWarning = nRatings < 500;
    return (
      <>
        <Typography variant="caption" display="inline">
          &nbsp;({nRatings}
          {shouldDisplayWarning && <WarningIcon className={classes.warning} />})
        </Typography>
      </>
    );
  };
  return (
    <StyledCard className={classes.root}>
      <CardActionArea
        href={vinmonopolet_url + props.product.url}
        target="_blank"
      >
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <CardMedia
              className={classes.media}
              component="img"
              src={image.url}
              title={props.product.name}
            />
          </Grid>
          <Grid
            item
            xs={9}
            className={classes.content}
            style={{ paddingTop: "1em", paddingRight: "2em" }}
          >
            <Grid item>
              <Typography>{props.product.name}</Typography>
            </Grid>
            <Grid>
              <Grid container justifyContent="flex-start">
                <Grid
                  item
                  style={{ paddingRight: "0.5em", marginLeft: "-2px" }}
                >
                  <StarsIcon />
                </Grid>
                <Grid item style={{ minWidth: "45%" }}>
                  <Link
                    href={props.product.vivino_url}
                    color="inherit"
                    target="_blank"
                  >
                    <Typography display="inline">
                      {props.product.score}
                    </Typography>
                    {renderNRatings()}
                  </Link>
                </Grid>
                <Grid>
                  <Typography>{props.product.price.formattedValue}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ paddingBottom: "16px" }}>
              <Grid container justifyContent="space-between">
                <Grid item xs={4}>
                  <Grid container>
                    <Grid item>
                      <ShoppingBasketOutlinedIcon fontSize="small" />
                    </Grid>
                    <Grid item style={{ paddingLeft: "0.5em" }}>
                      <Typography variant="caption" color="textSecondary">
                        {props.product.stock}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="textSecondary">
                    {props.product.volume.formattedValue}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Flag style={flagStyle} code={countryCode} height="16" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProductCard;
