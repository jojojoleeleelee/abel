import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tithe from '@material-ui/icons/AttachMoneySharp';
import Members from '@material-ui/icons/Group';
import Create from '@material-ui/icons/WbSunny';
import MoreIcon from '@material-ui/icons/MoreVert';
import BubbleChart from '@material-ui/icons/BubbleChart';
import BarChart from '@material-ui/icons/BarChart';
import GroupAdd from '@material-ui/icons/GroupAdd';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Https from '@material-ui/icons/Https';
import BorderColor from '@material-ui/icons/BorderColor';
import ControlPoint from '@material-ui/icons/ControlPoint';
import TrendingUp from '@material-ui/icons/TrendingUp';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Home from '@material-ui/icons/Home';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: "scroll",
    overflowY: "scroll",
  },
  list: {
    width: 250,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'inline-block',
    overflowX: "scroll",
    overflowY: "scroll",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: (typeof window.orientation !== 'undefined') ? 'flex' : 'none',
    [theme.breakpoints.up('md')]: {
      display: (typeof window.orientation !== 'undefined') ? 'none': 'flex',
    },
  }
});

class NavBar extends React.Component {
  static defaultProps = {
    tithes: 0,
    members: 0
  }

  constructor(props) {
    super(props);
    this.state  = {
      anchorEl: false,
      menuEl: null,
      left: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleProfileMenuOpen = event => {
    this.setState({ menuEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuEl: null });
  };

  handleMobileMenuOpen = event => {
    this.setState({ menuEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ menuEl: null });
  };

  renderMenu = () =>  {
    const { menuEl } = this.state;
    const isMenuOpen = Boolean(menuEl);
    return (
      <Menu
        anchorEl={menuEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My Account</MenuItem>
      </Menu>
    );
  }
  
  handleListClick = (text) => {
    switch (text.toUpperCase()) {
      case 'ADD NEW MEMBER': {
        window.location.replace('/create/member');
        break;
      }
      case "ADD TITHES": {
        window.location.replace('/create/tithe');
        break;
      }
      case "CREATE DASHBOARD": {
        window.location.replace('/create/dashboard');
        break;
      }
      case "BULK CREATE TITHES": {
        window.location.replace('/create/bulk');
        break;
      }
      case "MEMBERS": {
        window.location.replace('/member');
        break;
      }
      case "TITHES": {
        window.location.replace('/tithe');
        break;
      }
      case "ANALYTICS DASHBOARD": {
        window.location.replace('/analytics');
        break;
      }
      case "TITHE ANALYTICS": {
        window.location.replace('/analytics/tithe');
        break;
      }
      case "MEMBER ANALYTICS": {
        window.location.replace('/analytics/member');
        break;
      }
      default: {
        return '/';
      }
    }
  }

  sideList = () => {
    return (
      <div style={{ width: 250 }}>
        <List style={{ marginTop: '1em' }}>
          {['Add New Member', 'Add Tithes'].map((text, index) => (
            <ListItem button onClick={() => this.handleListClick(text)} key={text}>
              <ListItemIcon>{index % 2 === 0 ? <PersonAdd />: <Https />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List style={{ marginTop: '1em' }}>
          {['Create Dashboard', 'Bulk Create Tithes'].map((text, index) => (
            <ListItem button onClick={() => this.handleListClick(text)} key={text}>
              <ListItemIcon>{index % 2 === 0 ? <GroupAdd/>:  <BorderColor /> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List style={{ marginTop: '1em' }}>
          {['Members', 'Tithes'].map((text, index) => (
            <ListItem button onClick={() => this.handleListClick(text)} key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Members />: <Tithe />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List style={{ marginTop: '1em' }}>
          {['Analytics Dashboard', 'Tithe Analytics', 'Member Analytics'].map((text, index) => (
            <ListItem button onClick={() => this.handleListClick(text)} key={text}>
              <ListItemIcon>{index === 0 ? <TrendingUp />: index === 1 ? <BarChart /> : <BubbleChart /> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }

  render() {
    const { left } = this.state;
    const { auth } = this.props;
    const { classes, tithes, members } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Drawer open={left} onClose={this.toggleDrawer('left', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              {this.sideList()}
            </div>
          </Drawer>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit">
              <MenuIcon />
            </IconButton>
             
            <a href='/' style={{ color: 'white'}}>
            <Typography className={classes.title} variant="h6" color="inherit">
            <Home style={{ verticalAlign: 'text-bottom' }} /> &nbsp;Yireh Church
            </Typography></a>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton onClick={() => this.handleListClick('create dashboard')} color="inherit">
                  <ControlPoint />
              </IconButton>
              <IconButton onClick={() => this.handleListClick('tithes')} color="inherit">
                <Badge badgeContent={tithes.length || 0} color="secondary">
                  <Tithe />
                </Badge>
              </IconButton>
              <IconButton onClick={() => this.handleListClick('members')} color="inherit">
                <Badge badgeContent={members.length || 0} color="secondary">
                  <Members />
                </Badge>
              </IconButton>
              <IconButton
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {this.renderMenu()}
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    members: state.firestore.ordered.members,
    tithes: state.firestore.ordered.tithes
  }
}

// export default compose(
//   withStyles(styles),
//   connect(mapStateToProps),
//   firestoreConnect([
//     { collection: 'members' },
//     { collection: 'tithes' }
//   ])
// )(NavBar);

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(NavBar);