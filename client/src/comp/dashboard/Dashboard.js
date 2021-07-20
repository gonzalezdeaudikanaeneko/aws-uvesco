import PropTypes from "prop-types";

import React, {useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import withStyles from "@material-ui/core/styles/withStyles";

import Accessibility from "@material-ui/icons/ShoppingCart";
import DirectionsCar from "@material-ui/icons/Face";
import dashboardStyle from "../../assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import ShoppingCart from "@material-ui/icons/Timer";

import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function formatDate(date) {
  const month = date.getMonth() + 1
  const monthString = month >= 10 ? month : `0${month}`;
  const dateString = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  return `${dateString}-${monthString}-${date.getFullYear()}`;
}

function Dashboard (props){
	const { classes } = props;

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [hora, setHora] = useState([])
  const [horaM, setHoraM] = useState([])
  const [horaI, setHoraI] = useState([])
  const [totalPersonas, setTotalPersonas] = useState(1)
  const [listaPersonas, setListaPersonas] = useState([])
  const [totalIncidencias, setTotalIncidencias] = useState(2)
  const [listaIncidencias, setListaIncidencias] = useState([])
  const [totalMascarillas, setTotalMascarillas] = useState(3)
  const [listaMascarillas, setListaMascarillas] = useState([])

  const handleDateChange = date => {
    console.log(date)
    setSelectedDate(date);
    const egunaPersonas = "/apis/personas/" + formatDate(date)
    const egunaIncidencias = "/apis/incidencias/" +  formatDate(date)
    const egunaMascarillas = "/apis/mascarillas/" +  formatDate(date)

    fetch(egunaIncidencias).then(res => res.json()).then(data => {
      setTotalIncidencias(data.totalIncidencias)
      setListaIncidencias(data.listaIncidencias)
	    setHoraI(data.hora)
    })

    fetch(egunaPersonas).then(res => res.json()).then(data => {
      setTotalPersonas(data.totalPersonas)
      setListaPersonas(data.listaPersonas)
      setHora(data.hora)
    })

    fetch(egunaMascarillas).then(res => res.json()).then(data => {
      setTotalMascarillas(data.totalMascarillas)
      setListaMascarillas(data.listaMascarillas)
	    setHoraM(data.hora)
    })

  };

  useEffect(() => {

    const timer = setTimeout(() => {
      console.log(selectedDate)
      const egunaPersonas    = "/apis/personas/"    + formatDate(selectedDate)
      const egunaIncidencias = "/apis/incidencias/" + formatDate(selectedDate)
      const egunaMascarillas = "/apis/mascarillas/" + formatDate(selectedDate)
      fetch(egunaIncidencias).then(res => res.json()).then(data => {
        setTotalIncidencias(data.totalIncidencias)
        setListaIncidencias(data.listaIncidencias)
		    setHoraI(data.hora)
      })
      fetch(egunaPersonas).then(res => res.json()).then(data => {
        setTotalPersonas(data.totalPersonas)
        setListaPersonas(data.listaPersonas)
        setHora(data.hora)
      })
      fetch(egunaMascarillas).then(res => res.json()).then(data => {
        setTotalMascarillas(data.totalMascarillas)
        setListaMascarillas(data.listaMascarillas)
		setHoraM(data.hora)
      })
    }, 15000);
    return () => clearTimeout(timer);
  });

  useEffect(() =>{
    const egunaPersonas    = "/apis/personas/"    + formatDate(new Date())
    const egunaIncidencias = "/apis/incidencias/" + formatDate(new Date())
    const egunaMascarillas = "/apis/mascarillas/" + formatDate(new Date())    
    fetch(egunaIncidencias).then(res => res.json()).then(data => {
      setTotalIncidencias(data.totalIncidencias)
      setListaIncidencias(data.listaIncidencias)
	  setHoraI(data.hora)
    })
    fetch(egunaPersonas).then(res => res.json()).then(data => {
      setTotalPersonas(data.totalPersonas)
      setListaPersonas(data.listaPersonas)
      setHora(data.hora)
    })
    fetch(egunaMascarillas).then(res => res.json()).then(data => {
      setTotalMascarillas(data.totalMascarillas)
      setListaMascarillas(data.listaMascarillas)
	  setHoraM(data.hora)
    })
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
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader stats icon>
                <CardIcon color="success">
                  <Accessibility />
                </CardIcon>
        <p></p>
                <h5 className={classes.cardTitle}>Impactados</h5>
                <h3 className={classes.cardCategory}>27% personas</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader stats icon>
                <CardIcon color="primary">
                  <DirectionsCar />
                </CardIcon>
				<p></p>
                <h5 className={classes.cardTitle}>Detenidos</h5>
                <h3 className={classes.cardCategory}>14% personas</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader stats icon>
                <CardIcon color="warning" >
                  <ShoppingCart />
                </CardIcon>
        <p></p>
                <h5 className={classes.cardTitle}>Tiempo medio de mirado</h5>
                <h3 className={classes.cardCategory}>38 sugundos</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                </div>
              </CardFooter>
            </Card>
          </GridItem>          
        </GridContainer>

        <GridContainer>      
		  <GridItem xs={12} sm={12} md={12}>
            <Card chart style={{ marginBottom: 100}}>
              <CardHeader color="rose">
                <ChartistGraph
                  className="ct-chart-A-colors"
                  data={{
                    labels: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                    series: [[33, 28, 30, 18, 35, 26]]
				          }}
                  type="Bar"
                  options={{high: 35, low: 0 }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle} align='center'>Impactados</h4>
			  </CardBody>
              <CardFooter chart>
              </CardFooter>
            </Card>
          </GridItem>	

          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="rose">
                <ChartistGraph className="ct-chart-VU-colors"
                  data={{
                    labels:  ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                    series: [ [23, 18, 20, 10, 22, 14] ]
                  }}
                  type="Bar"
                  options={{low: 0, high: 25}}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle} align="center">Detenidos</h4>
			  </CardBody>
              <CardFooter chart>
              </CardFooter>
            </Card>
          </GridItem>
		  
		  <GridItem xs={12} sm={12} md={6}>
            <Card chart style={{ marginBottom: 100}}>
              <CardHeader color="rose">
                <ChartistGraph
                  className="ct-chart-TC-colors"
                  data={{
                    labels: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                    series: [[30, 28, 35, 40, 20, 31]]
                  }}
                  type="Bar"
                  options={{high: 45, low: 0 }}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle} align="center">Tiempo medio de mirado</h4>
              </CardBody>
              <CardFooter chart>
              </CardFooter>
            </Card>
          </GridItem>
       </GridContainer>  
	</div>
		);
	}

  Dashboard.propTypes = {
    classes: PropTypes.object
  };
  
  export default withStyles(dashboardStyle)(Dashboard);