import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        width: '100%'
    },
    show: {
        transform: 'translate(0, 0)',
        transition: 'transform .5s',
    },
    hide: {
        transform: 'translate(0, -70px)',
        transition: 'transform .5s',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

class SearchBar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            shouldShow: null,
        };
        this.lastScroll = null;
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, {
            passive: true
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const lastScroll = window.scrollY;

        if (lastScroll === this.state.lastScroll) {
            return;
        }

        const shouldShow = this.lastScroll !== null ? lastScroll < this.lastScroll : null;

        if (shouldShow !== this.state.shouldShow) {
            this.setState(prevState => ({
                ...prevState,
                shouldShow,
            }));
        }

        this.lastScroll = lastScroll;
    }

    getScrollClassName() {
        if (this.state.shouldShow === null) {
            return '';
        }

        return this.state.shouldShow ?
            this.props.classes.show :
            this.props.classes.hide;
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
              <AppBar position="fixed" className={`${classes.grow} ${this.getScrollClassName()}`}>
                <Toolbar>
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                  </IconButton>
                  <Typography className={classes.title} variant="title" color="inherit" noWrap>
                    Rodolfo Vilaça
                  </Typography>
                  <div className={classes.grow} />
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <Input
                      placeholder="Busca"
                      disableUnderline
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  </div>
                </Toolbar>
              </AppBar>
            </div>
        );
    }
}
  
export default withStyles(styles)(SearchBar);