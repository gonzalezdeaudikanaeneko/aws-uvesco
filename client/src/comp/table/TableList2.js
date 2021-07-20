import React, {useState, useEffect}  from "react";

import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import ChartistGraph from "react-chartist";

import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  // Return array of year and week number
  //return [d.getUTCFullYear(), weekNo];
  return [weekNo];
}

function TableList(props) {

  const { classes } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [totalPersonas, setTotalPersonas] = useState([])
  const [fecha, setFecha] = useState([])
  const [totalIncidencias, setTotalIncidencias] = useState([])
  const [totalMascarillas, setTotalMascarillas] = useState([])


  //const gradient = { 0.4: 'blue', 0.8: 'green', 1.0: 'red' }

  const handleDateChange = date => {
    setSelectedDate(date)
    const semanaPersonas = "/apis/personas/historic/" + getWeekNumber(date)

    fetch(semanaPersonas).then(res => res.json()).then(data => {
      setTotalPersonas(data.listaPersonas)
      setFecha(data.listaPersonasFecha)
      setTotalMascarillas(data.listaIncidencias)
      setTotalIncidencias(data.listaIncidencias)
    })
  };

  useEffect(() =>{
	setFecha(["01/01","02/01","03/01","04/01","05/01","06/01","07/01"])
    setTotalPersonas([120, 200, 210, 122, 155, 199, 174])
    setTotalIncidencias([30, 28, 36, 20, 19, 10, 14])
    setTotalMascarillas([30, 28, 36, 20, 19, 10, 14])
  }, []);

  return (
    <div>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid align="right" style={{ marginTop: -82}}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="date-picker-inline"
              label="Elegir Fecha"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <p/><p/><p/>
    <GridContainer>
	  <GridItem xs={12} sm={12} md={12}>
           <Card>
              <CardHeader color="rose" height="4000px">
                <ChartistGraph
                  className="ct-chart-A-colors"
                  data={{
                    labels: fecha,
                    series: [totalPersonas],
                  }}
                  type="Bar"
                  options={{low: 0, high: 300}}
                />
              </CardHeader>
              <CardBody>
				<h3 className={classes.cardTitle} align="center">Stand Publicitario</h3>
              </CardBody>
            </Card>
	  </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
			 <ChartistGraph
                  className="ct-chart-VU-colors"
                  data={{
					labels: ['10/07', '11/07', '12/07', '13/07', '14/07', '15/07', '16/07'],
					series: [totalIncidencias],
				  }}
                  type="Bar"
                  options={{low: 0, high: 51}}
                />
          </CardHeader>
          <CardBody>
			<h3 className={classes.cardTitle} align="center">Zona Carnes</h3>
          </CardBody>
        </Card>
      </GridItem>	
	  <p/><p/><p/>

    </GridContainer>

	</div>
  );
}

TableList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(dashboardStyle)(TableList);
