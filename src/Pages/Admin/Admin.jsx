import * as React from "react";
import HeaderAdmin from "Sections/Admin/HeaderAdmin";
import { Outlet } from "react-router-dom";

import UserWallet from "Sections/User/UserWallet";
//import UserWallet from "Components/UserWallet";


export default function Admin() {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
      <div className="text-center">
        <h1>Hi there, please go to the tokens page to see the dashboard</h1>
        <p>
          Admin page content is not available for now, please come to see it
          later.
        </p>
      </div>
    </>
  )
}
