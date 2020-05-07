import React from 'react';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core'
import { grey, blue } from '@material-ui/core/colors';
import 'typeface-roboto'
import FormDialog from './Container/FormDialog'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey
  },
  status: {
    danger: 'red'
  }
})





class App extends React.Component {


  render() {

    return (
      <ThemeProvider theme={theme}>
        <FormDialog />
      </ThemeProvider>
    )
  }

}



export default App;
