import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { svgIcons } from "../components/iconheader"


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
    
      <div>
        <div className="container-custom-before">

          <div className="w-full top-strip">

            <div className="header-before">
              <div className="trust-bx">
              <nav className="navbar">
        <div className={`nav-elements `}>
                  <ul className="menu font-semibold menu-left">
                    {/* <li className="hover:text-[#9c9090]"><Link href="#" rel="noopener noreferrer"  >

            </Link>  */}

                    <li className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} > Residential</Link>
                    </li>

                  
                    <li className="hover:text-[#9c9090]"><Link href="#" rel="noopener noreferrer" to={""}  >Business</Link></li>
                    <li className="hover:text-[#9c9090]"> <Link href="#" rel="noopener noreferrer" to={""}  >Landlord</Link></li>


                  </ul>
                  </div>
                </nav>
              </div>
              <div>

                <nav>
                  <ul className="menu menu-right">
                    <li className="hover:text-[#9c9090]"><Link href="#" rel="noopener noreferrer" to={""}  >Community Connect</Link> <span>|</span></li>
                    <li className="hover:text-[#9c9090]"><Link href="#" rel="noopener noreferrer" to={""}  >Blog</Link> <span>|</span></li>
                    <li className="hover:text-[#9c9090]"> <Link href="#" rel="noopener noreferrer" to={""}  >Covid-19 <span>|</span></Link></li>


                    <li className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""}>Help </Link>
                      <span>|</span>
                    </li>

                  </ul>
                </nav></div>
            </div>

          </div>
       
        </div>
      </div>
      <br></br>
      <div className="centered-container" >
        <nav className=" ">
          <div>
            <Link href="#" rel="noopener noreferrer" to={""}>
              <img
                src="https://communityfibre.co.uk/_next/static/images/logoDesktop-9bf97008bd5975f83100ccfb417dfa14.svg"
                width="full" alt="logo"
                height="50" ></img></Link>
          </div>
          <div>
          <button type="button" className="menu-toggle w-8 h-6 flex flex-col justify-between lg:hidden hello" onClick={toggle}>
          <span></span>
              </button>
          </div>
          <ul className="submenu flex  gap-x-10 text-2xl font-normal ">

            <div className="trust-bx">
              <nav className="navbar">
              
        <div className={`nav-elements `}>
                  <ul className="menu font-semibold menu-left">
                    {/* <li className="hover:text-[#9c9090]"><Link href="#" rel="noopener noreferrer"  >

            </Link>  */}

                    <li className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} > Residential</Link>
                    </li>

                  
                    <li className="hover:text-[#9c9090]"><Link href="#" rel="noopener noreferrer" to={""}  >Business</Link></li>
                    <li className="hover:text-[#9c9090]"> <Link href="#" rel="noopener noreferrer" to={""}  >Landlord</Link></li>


                  </ul>
                  </div>
                </nav>
              </div>
           
            <li className="nav-dropdown-main hover:text-[#9c9090]">
           {svgIcons.Broadband}
               <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Broadband</Link>

            </li><li className="nav-dropdown-main hover:text-[#9c9090]">
            {svgIcons.TV}

              
               <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >TV</Link>

            </li><li className="nav-dropdown-main hover:text-[#9c9090]">
          
            {svgIcons.Call}
              
               <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Calls</Link>

            </li>
            <li className="nav-dropdown-main hover:text-[#9c9090]">
       
            {svgIcons.Deals}
               <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Deals</Link>

            </li>
            <li className="nav-dropdown-main hover:text-[#9c9090]"> 
          
            {svgIcons.CHOOSE}
            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Why choose us</Link>

            </li>
            <li className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} ><button className="ctaBtn">Get Started</button></Link>

            </li>
          </ul>


        </nav>
       
      </div>

    </>
  );
};
