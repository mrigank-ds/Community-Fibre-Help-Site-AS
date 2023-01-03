

import * as React from "react";
import { Link } from "react-router-dom";



/**
* Component for Header
* @param headerItem 
* @returns HTML element
*/
export default function Header(){
    document.body.setAttribute("id", "body");
  

  return (
    <>
       <div>
       <div className="container-custom-before">

<div className="w-full top-strip">

    <div className="header-before">
      <div className="trust-bx">
        <nav>
          <ul className="menu font-semibold ">
            {/* <li className="hover:text-[#9c9090]"><Link href="#" rel="noopener noreferrer"  >

            </Link>  */}
            
            <li  className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} > Residential</Link>
            </li>
         
            {/* </li> */}
            <li className="hover:text-[#9c9090]"><Link href="#" rel="noopener noreferrer" to={""}  >Business</Link></li>
            <li className="hover:text-[#9c9090]"> <Link href="#" rel="noopener noreferrer" to={""}  >Landlord</Link></li>


          </ul>
        </nav>
      </div>
<div>

      <nav>
        <ul className="menu">
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
  {/* <br></br> */}
</div>
       </div>
      <br></br>
      <div className="centered-container">
        <nav className=" ">
       <div>
       <Link href="#" rel="noopener noreferrer" to={""}>
                <img
                  src="https://communityfibre.co.uk/_next/static/images/logoDesktop-9bf97008bd5975f83100ccfb417dfa14.svg"
                  width="full" alt="logo"
                  height="50" ></img></Link>
       </div>
        
          <ul className="submenu flex  gap-x-10 text-2xl font-normal ">
           
             

                  <li  className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Broadband</Link>
             
</li><li  className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >TV</Link>
             
             </li><li  className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Calls</Link>
             
             </li>
             <li  className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Deals</Link>
             
             </li>
             <li  className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Why choose us</Link>
             
             </li>
             <li  className="nav-dropdown-main hover:text-[#9c9090]"> <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} ><button className="ctaBtn">Get Started</button></Link>
             
             </li>
          </ul>


        </nav>
      </div>

    </>
  );
};

