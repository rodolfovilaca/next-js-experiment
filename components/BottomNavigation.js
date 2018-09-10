import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
    root: {
        width: '100%',
        bottom: 0,
        position: 'fixed',
        left: 0
    },
    show: {
        transform: 'translate(0, 0)',
        transition: 'transform .5s',
    },
    hide: {
        transform: 'translate(0, 70px)',
        transition: 'transform .5s',
    },
};

class LabelBottomNavigation extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            shouldShow: null,
            value: 'recents'
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

    handleChange = (event, value) => {
        this.setState({
            value
        });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
        <BottomNavigation value={value} onChange={this.handleChange} className={`${classes.root} ${this.getScrollClassName()}`}>
            <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
        );
    }
}

export default withStyles(styles)(LabelBottomNavigation);