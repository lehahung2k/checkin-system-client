import React from "react";
import checkRole from "../../services/checkRole";
import AdminDashboard from "../admin/AdminDashboard";
import TenantDashboard from "../tenant/TenantDashboard";
import PocDashboard from "../poc/PocDashboard";

const Dashboard = () => {
  const role = checkRole.getRole();

  let dashboardComponent = null;

  // if role is admin, show admin dashboard
  // if role is tenant, show tenant dashboard
  // if role is poc, show poc dashboard

  switch (role) {
    case "admin":
      dashboardComponent = <AdminDashboard />;
      break;
    case "tenant":
      dashboardComponent = <TenantDashboard />;
      break;
    case "poc":
      dashboardComponent = <PocDashboard />;
      break;
    default:
      dashboardComponent = null;
  }

  return <>{dashboardComponent}</>;
};

export default Dashboard;
