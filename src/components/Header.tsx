import * as React from "react";
import { useState } from "react";
import { svgIcons } from "../components/iconheader";


/**
* Component for Header
* @param headerItem 
* @returns HTML element
*/
export default function Header() {
  
 
  React.useEffect(() => {
     document.body.setAttribute("id", "body");
  });
  const toggle = () => { 
    (document.getElementById("body") as HTMLInputElement).classList.toggle("menu-opened");
  };

  return (
    <>
<div className="header-main" >

      <div>
        <div className="container-custom-before">

          <div className="w-full top-strip">


            <div className="header-before mx-auto max-w-7xl  !px-8 ">

              <div className="trust-bx">
              <nav className="navbar ">
        <div className={`nav-elements `}>
                  <ul className="menu font-semibold menu-left">
                    {/* <li className="hover:text-[#9c9090]"><Link href="#" rel="noopener noreferrer"  >

            </Link>  */}

                    <li className="nav-dropdown-main hover:text-[#9c9090]"> <a className="course-accordion" href="/#"  > Residential</a>
                    </li>

                  
                    <li className="hover:text-[#9c9090]"><a href="#">Business</a></li>
                    <li className="hover:text-[#9c9090]"> <a href="#" rel="noopener noreferrer"    >Landlord</a></li>


                  </ul>
                  </div>
                </nav>
              </div>
              <div>

                <nav>
                  <ul className="menu menu-right">
                    <li className="hover:text-[#9c9090]"><a href="#" rel="noopener noreferrer"   >Community Connect</a> <span>|</span></li>
                    <li className="hover:text-[#9c9090]"><a href="#" rel="noopener noreferrer"   >Blog</a> <span>|</span></li>

                    <li className="nav-dropdown-main hover:text-[#9c9090]"> <a className="course-accordion" href="#" rel="noopener noreferrer" >Help </a></li>


                  </ul>
                </nav></div>
            </div>

          </div>
       
        </div>
      </div>
       <div className="centered-container logo-hdr" >
        <nav className=" ">
          <div>
            <a href="#" rel="noopener noreferrer" >
              <img
                src="https://communityfibre.co.uk/_next/static/images/logoDesktop-9bf97008bd5975f83100ccfb417dfa14.svg"
                width="full" alt="logo"
                height="50" ></img></a>
          </div>
          <div>
          <button type="button" className="menu-toggle w-8 h-6 flex flex-col justify-between  hello" onClick={toggle}>
          <span></span>
              </button>
          </div>
          <ul className="submenu flex  gap-x-10 text-2xl font-normal ">

            <div className="trust-bx">
              <nav className="navbar">
              
        <div className={`nav-elements `}>
                  <ul className="menu font-semibold menu-left">
                    {/* <li className="hover:text-[#9c9090]"><a href="#" rel="noopener noreferrer"  >

            </a>  */}

                    <li className="nav-dropdown-main hover:text-[#9c9090]"> <a className="course-accordion" href="#" rel="noopener noreferrer"  > Residential</a>
                    </li>

                  
                    <li className="hover:text-[#9c9090]"><a href="#" rel="noopener noreferrer"   >Business</a></li>
                    <li className="hover:text-[#9c9090]"> <a href="#" rel="noopener noreferrer"   >Landlord</a></li>


                  </ul>
                  </div>
                </nav>
              </div>
           
            <li className="nav-dropdown-main hover:text-[#9c9090]">
           {svgIcons.Broadband}
               <a className="course-accordion" href="#" rel="noopener noreferrer" >Broadband</a>

            </li><li className="nav-dropdown-main hover:text-[#9c9090]"> {svgIcons.TV} <a className="course-accordion" href="#" rel="noopener noreferrer"  >TV</a>

            </li><li className="nav-dropdown-main hover:text-[#9c9090]">
          
            {svgIcons.Call}
              
               <a className="course-accordion" href="#" rel="noopener noreferrer"  >Calls</a>

            </li>
            <li className="nav-dropdown-main hover:text-[#9c9090]">
       
            {svgIcons.Deals}
               <a className="course-accordion" href="#" rel="noopener noreferrer"  >Deals</a>

            </li>
            <li className="nav-dropdown-main hover:text-[#9c9090]"> 
          
            {svgIcons.CHOOSE}
            <a className="course-accordion" href="#" rel="noopener noreferrer"  >Why choose us</a> </li>
            <li className="nav-dropdown-main sepate-links mt-6 hover:text-[#9c9090]"><a href="#" rel="noopener noreferrer"   >Community Connect</a></li>
            <li className="nav-dropdown-main hover:text-[#9c9090]  sepate-links"><a href="#" rel="noopener noreferrer"   >Blog</a> </li>
            <li className="nav-dropdown-main hover:text-[#9c9090]  sepate-links"> <a href="#" rel="noopener noreferrer"   >Help</a></li>

            <li className="nav-dropdown-main hover:text-[#9c9090]"> <a className="course-accordion" href="#" rel="noopener noreferrer"  ><button className="ctaBtn">Get Started</button></a>

            </li>
          </ul>


        </nav>
       
      </div>
      </div>
    </>
  );
};
