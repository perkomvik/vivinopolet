import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Product from "../Interfaces/Product";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import React from "react";
import Grid from "@material-ui/core/Grid";
import StarsIcon from '@material-ui/icons/Stars';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { mapCountryToCode } from "../helpers/countryUtils";
import Flag from 'react-world-flags'
import Link from "@material-ui/core/Link";

const vinmonopolet_url = "https://vinmonopolet.no"

const useStyles = makeStyles((theme) =>
  createStyles({
    warning: {
      color: theme.palette.warning.main,
      fontSize: "inherit",
      verticalAlign: "middle",
    },
    root: {
      flexGrow: 1,
      maxWidth: "600px"
    },
    media: {
      height: "175px",
      objectFit: "contain"
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    score: {
      display: "flex",
      alignItems: "center",
      paddingRight: "5px"
    },
  })
);

const flagStyle = {
  position: "relative",
  top: "50%",
  transform: "translateY(-50%)",
}

const ProductCard = (props: { product: Product }) => {
  const classes = useStyles();
  const image = props.product.images.find(img => img.format === "product")
  const countryCode = mapCountryToCode(props.product.main_country.name);

  const renderNRatings = () => {
    const nRatings = props.product.n_ratings;
    const shouldDisplayWarning = nRatings < 500;
    return (
      <>
        <Typography variant="caption" display="inline">
          &nbsp;({nRatings}{shouldDisplayWarning && <WarningIcon className={classes.warning} />})
        </Typography>
      </>
    );
  };
  return (
    <Card className={classes.root}>
      <CardActionArea href={vinmonopolet_url + props.product.url} target="_blank"
      >
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <CardMedia
              className={classes.media}
              component="img"
              src={image.url}
              title={props.product.name} />
          </Grid>
          <Grid
            item
            xs={9}
            className={classes.content}
          >
            <Grid item style={{ paddingTop: "1em", paddingRight: "1em" }}>
              <Typography>{props.product.name}</Typography>
            </Grid>
            <Grid item>
              <Grid container justifyContent="flex-start">
                <Grid item style={{ paddingRight: "0.5em", marginLeft: "-2px" }}>
                  <StarsIcon />
                </Grid>
                <Grid item style={{ minWidth: "50%" }}>
                  <Link href={props.product.vivino_url} color="inherit" target="_blank">
                    <Typography display="inline">
                      {props.product.score}
                    </Typography>
                    {renderNRatings()}
                  </Link>
                </Grid>
                <Grid item style={{ marginRight: "0.5em" }}>
                  <ShoppingBasketIcon />
                </Grid>
                <Grid item>
                  <Typography>
                    {props.product.stock}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ paddingBottom: "16px" }}>
              <Grid
                container
                justifyContent="space-between"
              >
                <Grid item xs={3}>
                  <Typography variant="caption" color="textSecondary">{props.product.volume.formattedValue}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="caption" color="textSecondary">{props.product.price.formattedValue}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Flag style={flagStyle} code={countryCode} height="16" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;