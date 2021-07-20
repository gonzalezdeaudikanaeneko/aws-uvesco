import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

import { connect } from "react-redux";
import {logoutUser} from "../../actions/authActions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
//import MoreVert from "@material-ui/icons/MoreVert";
//import ViewList from "@material-ui/icons/ViewList";

// core components
//import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "../CustomButtons/Button.jsx";

import styles from "../../assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.jsx";

//import { connect } from "react-redux";
//import {logoutUser} from "../../actions/authActions";

const useStyles = makeStyles(styles);

function AdminNavbar(props) {
//function AdminNavbar(props) {
//  const onLogoutClick = (e) => {
//		e.preventDefault();
//		props.logoutUser();
//  };

  	const onLogoutClick = (e) => {
		e.preventDefault();
		props.logoutUser();
	};
	
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
	  <button
		  style={{
			width: "120px",
			height: "50px",
			borderRadius: "3px",
			marginRight: "30px",
			marginTop: "-45px",
			float: 'right'
		  }}
		  onClick={onLogoutClick}
		  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
	  >
		  Logout
	  </button>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AdminNavbar);
