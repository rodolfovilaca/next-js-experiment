import 'isomorphic-fetch';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SearchBar from '../components/AppBar.js';
import LabelBottomNavigation from '../components/BottomNavigation';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#372021'
      },
      secondary:{
        main: '#EE5622'
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    shape: {
        borderRadius: 5
    },
    props: {
        MuiWithWidth: {
          initialWidth: 'lg',
        },
    },
  });

  const styles = {
      root: {
          flexGrow: 1
      }
  }

class Index extends React.PureComponent {

    static async getInitialProps() {
        const response = await fetch('https://swapi.co/api/people/');
        const people = await response.json();
        return { people: people.results };
    }

    render() {
        const isMobile = isWidthDown('xs', this.props.width) || isWidthDown('sm', this.props.width);
        console.log(isMobile, this.props.width);
        const { people } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <SearchBar />
                <List>
                {
                    people && people.map(person => (
                        <ListItem key={person.name}>
                            <ListItemText primary={ person.name } />
                        </ListItem>
                    ))
                }
                {
                    people && people.map(person => (
                        <ListItem key={person.name}>
                            <ListItemText primary={ person.name } />
                        </ListItem>
                    ))
                }
                </List>
                {
                    isMobile &&
                    <LabelBottomNavigation />
                }
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(withWidth()(Index));