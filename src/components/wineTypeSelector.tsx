import { lightGreen, green, red } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { makeStyles, createStyles } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";

const PREFIX = 'WineTypeSelector';

const classes = {
  root: `${PREFIX}-root`,
  selected: `${PREFIX}-selected`
};

const StyledRoot = styled(Root)((
  {
    theme: Theme
  }
) => ({
  [`& .${classes.root}`]: {
    "&$selected": {
      color: "white",
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },

  [`& .${classes.selected}`]: {}
}));

const PREFIX = 'WineTypeSelector';

const classes = {
  toggleButtons: `${PREFIX}-toggleButtons`
};

const Root = styled('div')(() =>
  ({
    [`&.${classes.toggleButtons}`]: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1em",
    }
  }));

const useRedWineStyle = makeStyles((
  {
    theme: Theme
  }
) => ({
  [`& .${classes.root}`]: {
    "&$selected": {
      color: "white",
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },

  [`& .${classes.selected}`]: {}
})
);

const useWhiteWineStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&$selected": {
        color: "white",
        backgroundColor: lightGreen[300],
        "&:hover": {
          backgroundColor: lightGreen[300],
        },
      },
    },
    selected: {},
  })
);

const useRoseStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&$selected": {
        color: "white",
        backgroundColor: red[300],
        "&:hover": {
          backgroundColor: red[300],
        },
      },
    },
    selected: {},
  })
);

const useBubbleStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&$selected": {
        color: "white",
        backgroundColor: green[800],
        "&:hover": {
          backgroundColor: green[800],
        },
      },
    },
    selected: {},
  })
);

interface Props {
  wineType: string;
  wineTypes: string[];
  onChange: (wineType: string) => void;
}

const WineTypeSelector = (props: Props) => {

  const redWineClasses = useRedWineStyle();
  const whiteWineClasses = useWhiteWineStyle();
  const roseClasses = useRoseStyle();
  const bubbleClasses = useBubbleStyle();

  const onChange = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: string
  ) => {
    if (newValue !== null) {
      props.onChange(newValue);
    }
  };

  return (
    <StyledRoot className={classes.toggleButtons}>
      <ToggleButtonGroup
        value={props.wineType}
        exclusive
        size="small"
        onChange={onChange}
        aria-label="velg vintype"
      >
        <ToggleButton
          classes={redWineClasses}
          value="rødvin"
          aria-label="rødvin"
        >
          <Typography variant="subtitle2">Rødvin</Typography>
        </ToggleButton>
        <ToggleButton
          classes={whiteWineClasses}
          value="hvitvin"
          aria-label="rødvin"
        >
          <Typography variant="subtitle2">Hvitvin</Typography>
        </ToggleButton>
        <ToggleButton
          classes={roseClasses}
          value="rosevin"
          aria-label="rosévin"
        >
          <Typography variant="subtitle2">Rosévin</Typography>
        </ToggleButton>
        <ToggleButton
          classes={bubbleClasses}
          value="musserende_vin"
          aria-label="musserende"
        >
          <Typography variant="subtitle2">Musserende</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </StyledRoot>
  );
};

export default WineTypeSelector;
