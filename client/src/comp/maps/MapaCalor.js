import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import { connect } from "react-redux";
import {logoutUser} from "../../actions/authActions";

import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

function MapaCalor(props){
 const { classes } = props;

    return (
	    <div>
    <GridContainer>
	  <GridItem xs={12} sm={12} md={12}>
           <Card>
		      <div>
              <CardHeader color="rose" height="4000px">
                <ChartistGraph
                  className="ct-chart"
                  data={{
					labels: ['10:00','13:00','16:00','19:00','22:00'],
					series:  [[26, 44, 10, 22, 55],
							 [20, 29, 25, 21, 19],
							 [12, 15, 41, 32, 51],
							 [24, 14, 45, 45, 51],
							 [16, 26, 36, 22, 25],
							 [32, 30, 40, 19, 21]]
				  }}
                  type="Bar"
                  options={{low: 0, high: 60}}
                />
              </CardHeader>
			  </div>
              <CardBody>
				<h3 className={classes.cardTitle} align="center">Personas Totales</h3>	
              </CardBody>
            </Card>
	  </GridItem>
	  
	  <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
			 <ChartistGraph
                  className="ct-chart"
                  data={{
					labels: ['10:00','13:00','16:00','19:00','22:00'],
					series: [[126, 144, 210, 122, 255],
							 [120, 229, 225, 121, 219],
							 [112, 215, 141, 232, 151],
							 [124, 214, 145, 245, 251],
							 [116, 126, 136, 222, 225],
							 [132, 130, 240, 219, 121]							 
					],
				  }}
                  type="Bar"
                  options={{low: 0, high: 330}}
                />
          </CardHeader>
          <CardBody>
			<h3 className={classes.cardTitle} align="center">Incidencias</h3>
          </CardBody>
        </Card>
      </GridItem>	
	  
          <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
       <ChartistGraph
                  className="ct-chart"
                  data={{
          labels: ['10:00','13:00','16:00','19:00','22:00'],
          series: [[26, 44, 10, 22, 55],
                   [20, 29, 25, 21, 19],
                   [12, 15, 41, 32, 51],
                   [24, 14, 45, 45, 51],
                   [16, 26, 36, 22, 25],
                   [32, 30, 40, 19, 21]              
          ],
          }}
                  type="Bar"
                  options={{low: 0, high: 51}}
                />
          </CardHeader>
          <CardBody>
      <h3 className={classes.cardTitle} align="center">Casos sin Mascarilla</h3>
          </CardBody>
        </Card>
      </GridItem> 
    </GridContainer>
      </div>
    );
}

MapaCalor.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object
};
const mapStateToProps = state => ({
  auth: state.auth
});
//export default withStyles(dashboardStyle)(Dashboard);
export default connect(
  mapStateToProps,
  { logoutUser }
)( withStyles(dashboardStyle)(MapaCalor));
