import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Product from "../Interfaces/Product";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import React from "react";
import Grid from "@material-ui/core/Grid";
import StarsIcon from '@material-ui/icons/Stars';

const vinmonopolet_url = "https://vinmonopolet.no"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: "400px"
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

const ProductCard = (props: { product: Product }) => {
  const classes = useStyles();
  const image = props.product.images.find(img => img.format === "product")
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
            <Grid item style={{ paddingTop: "16px" }}>
              <Typography>{props.product.name}</Typography>
            </Grid>
            <Grid item>
              <Grid container justifyContent="flex-start">
                <Grid item style={{ paddingRight: "5px", marginLeft: "-2px" }}>
                  <StarsIcon />
                </Grid>
                <Grid item>
                  <Typography>
                    {props.product.score}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ paddingBottom: "16px" }}>
              <Grid
                container
                justifyContent="space-between"
              >
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">{props.product.volume.formattedValue}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="textSecondary">{props.product.price.formattedValue}</Typography>
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