import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
//Root component is where you create a custom theme to by applied to all MUI components
//these must be named imports
import { createTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors"; //import colors right from MUI to your custom theme object --> lets us skip specifying light, main, dark, contrastText in the primary or secondary object and it applies those values for us
import Layout from "./components/Layout";
//Layout component wraps the switch but not the Router because we need to use the Router for the Layout

//createTheme takes an object as an argument representing the theme we want to create
//import from google fonts in index.css for use in theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

//Provide the application with the theme
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
