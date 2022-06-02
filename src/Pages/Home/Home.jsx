import React from "react";
import Header from "Sections/Home/Header";
import HeaderNavigation from 'Sections/Home/HeaderNavigation';
import Sidebar from 'Components/Sidebar';


export default function Home() {

const [open, setOpen] = React.useState(true);


  return (
    <div>
      <Header onOpenSideBar={() => setOpen(true)} />
      <Sidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        navigation={<HeaderNavigation />}
      />
      <div className="text-center">
        <h1>Hi there, please go to the tokens page to see the dashboard</h1>
        <p>
          Home page content is not available for now, please come to see it
          later.
        </p>
      </div>{' '}
    </div>
  )
};


