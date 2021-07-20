// Iconos proporcionados por el paquete @material-ui
import Dashboard from "@material-ui/icons/Dashboard";
import Dashboard2 from "@material-ui/icons/Dashboard";
import LocationOn from "@material-ui/icons/LocationOn";

// Vistas para el layout del Administrador
import DashboardPage from "./comp/dashboard/Dashboard.js";
import DashboardPage2 from "./comp/dashboard/Dashboard2.js";
import TableList from "./comp/table/TableList2.js";

const dashboardRoutes = [{
    path: "/dashboard",
    name: "Stand Publicitario",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/dashboard2",
    name: "Zona Carnes",
    rtlName: "لوحة القيادة",
    icon: Dashboard2,
    component: DashboardPage2,
    layout: "/admin"
  },
  {
    path: "/traffic",
    name: "Historico",
    rtlName: "خرائط",
    icon: LocationOn,
    component: TableList,
    layout: "/admin"
  }];
  
export default dashboardRoutes;

