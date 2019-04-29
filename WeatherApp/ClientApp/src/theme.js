import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    overrides: {
      MuiInputBase: {
        root: {
          "&$disabled": {
            color: 'rgba(0,0,0,0.75)'
          }
  
        }
      },
      MuiFormLabel: {
        root: {
          "&$disabled": {
            color: 'rgba(0,0,0,0.5)'
          },
          color: 'rgba(0,0,0,0.6)'
        }
      },
	  MuiFormControlLabel: {
		label: {
          "&$disabled": {
            color: 'rgba(0,0,0,0.8)'
          },
        }
      },
      typography: {
        useNextVariants: true,
      },
    }
  });

export default theme;
