import LaunchIcon from "@mui/icons-material/Launch";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import WarningIcon from "@mui/icons-material/Warning";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Flag from "react-world-flags";
import Wine from "../Interfaces/Wine";
import { mapCountryToCode } from "../helpers/countryUtils";
import { getWineUrl } from "../helpers/vivino";

const PREFIX = "ProductCard";

const classes = {
  warning: `${PREFIX}-warning`,
  root: `${PREFIX}-root`,
  media: `${PREFIX}-media`,
  content: `${PREFIX}-content`,
  score: `${PREFIX}-score`,
};

const StyledCard = styled(Card)(({ theme }) => ({
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
  },
}));

const vinmonopolet_url = "https://vinmonopolet.no";

const flagStyle = {
  position: "relative",
  top: "50%",
  transform: "translateY(-50%)",
};
interface Props {
  product: Wine;
  stock: number;
}

const formatPrice = (price: number) => {
  let formatted = price.toFixed(2);
  formatted = formatted.replace(".", ",");
  // Add space as thousand separator
  formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `kr ${formatted}`;
};

const ProductCard = (props: Props) => {
  const { product, stock } = props;
  const countryCode = mapCountryToCode(product.country);

  const renderNRatings = () => {
    const nRatings = product.rating_count;
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
      <CardActionArea onClick={() => window.open(product.url, "_blank")}>
        <Grid container>
          <Grid item xs={3} sx={{ position: "relative", height: "175px" }}>
            <Image
              style={{ objectFit: "contain", padding: "4px" }}
              src={product.image_url}
              alt="Product image"
              title={product.name}
              fill
            />
          </Grid>
          <Grid
            item
            xs={9}
            className={classes.content}
            style={{ paddingTop: "0.5em", paddingRight: "1em" }}
          >
            <Grid item>
              <Stack direction="row" justifyContent="space-between">
                <Typography>{product.name}</Typography>

                <LaunchIcon
                  fontSize="small"
                  sx={{ opacity: 0.33, marginRight: "-0.35em" }}
                />
              </Stack>
            </Grid>
            <Grid>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <StarOutlineIcon />
                  <a
                    href={getWineUrl(product.name)}
                    color="inherit"
                    target="_blank"
                  >
                    <Typography display="inline">{product.rating}</Typography>
                    {renderNRatings()}
                  </a>
                </Stack>
                <Typography>{formatPrice(product.price)}</Typography>
              </Stack>
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
                        {stock}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="textSecondary">
                    {product.volume.toString() + " cl"}
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
