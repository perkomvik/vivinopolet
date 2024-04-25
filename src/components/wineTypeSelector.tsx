import { lightGreen, green, red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";

interface Props {
  wineType: string;
  wineTypes: string[];
  onChange: (wineType: string) => void;
}

const WineTypeSelector = (props: Props) => {
  const onChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
    if (newValue !== null) {
      props.onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={props.wineType}
      exclusive
      size="small"
      onChange={onChange}
      aria-label="velg vintype"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1em",
      }}
    >
      <ToggleButton
        value="rødvin"
        aria-label="rødvin"
        sx={{
          "&.Mui-selected": {
            backgroundColor: red[900],
            color: "white",
            "&:hover": {
              backgroundColor: red[900],
            },
          },
        }}
      >
        <Typography variant="subtitle2">Rødvin</Typography>
      </ToggleButton>
      <ToggleButton
        value="hvitvin"
        aria-label="hvitvin"
        sx={{
          "&.Mui-selected": {
            backgroundColor: lightGreen[300],
            color: "white",
            "&:hover": {
              backgroundColor: lightGreen[300],
            },
          },
        }}
      >
        <Typography variant="subtitle2">Hvitvin</Typography>
      </ToggleButton>
      <ToggleButton
        value="rosevin"
        aria-label="rosévin"
        sx={{
          "&.Mui-selected": {
            backgroundColor: red[300],
            color: "white",
            "&:hover": {
              backgroundColor: red[300],
            },
          },
        }}
      >
        <Typography variant="subtitle2">Rosévin</Typography>
      </ToggleButton>
      <ToggleButton
        value="musserende_vin"
        aria-label="musserende"
        sx={{
          "&.Mui-selected": {
            backgroundColor: green[800],
            color: "white",
            "&:hover": {
              backgroundColor: green[800],
            },
          },
        }}
      >
        <Typography variant="subtitle2">Musserende</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default WineTypeSelector;
