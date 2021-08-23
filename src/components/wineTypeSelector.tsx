import { lightGreen, green } from "@material-ui/core/colors";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";


const useStyles = makeStyles(() =>
  createStyles({
    toggleButtons: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1em"
    },
  })
);

const useRedWineStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&$selected': {
        color: "white",
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        }
      },
    },
    selected: {},
  })
);

const useWhiteWineStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&$selected': {
        backgroundColor: lightGreen[300],
        '&:hover': {
          backgroundColor: lightGreen[300],
        }
      }
    },
    selected: {},
  })
);

const useBubbleStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&$selected': {
        color: "white",
        backgroundColor: green[800],
        '&:hover': {
          backgroundColor: green[800],
        }
      }
    },
    selected: {},
  })
);

interface Props {
  wineType: string,
  wineTypes: string[],
  onChange: (wineType: string) => void,
};

const WineTypeSelector = (props: Props) => {
  const classes = useStyles();
  const redWineClasses = useRedWineStyle();
  const whiteWineClasses = useWhiteWineStyle();
  const bubbleClasses = useBubbleStyle();

  const onChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, newValue: string) => {
    if (newValue !== null) {
      props.onChange(newValue);
    }
  }

  return (
    <div className={classes.toggleButtons}>
      <ToggleButtonGroup
        value={props.wineType}
        exclusive
        size="small"
        onChange={onChange}
        aria-label="velg vintype"
      >
        <ToggleButton classes={redWineClasses} value="rødvin" aria-label="rødvin">
          <Typography variant="subtitle2">
            Rødvin
          </Typography>
        </ToggleButton>
        <ToggleButton classes={whiteWineClasses} value="hvitvin" aria-label="rødvin">
          <Typography variant="subtitle2">
            Hvitvin
          </Typography>
        </ToggleButton>
        <ToggleButton classes={bubbleClasses} value="musserende_vin" aria-label="musserende">
          <Typography variant="subtitle2">
            Musserende
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default WineTypeSelector;