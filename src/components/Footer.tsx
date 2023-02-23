import React from "react";
import Footeraccordian from "./Footeraccordian";
// import Scroll from "./Scroll"


export default function Footer() {

    const [isSmallScreen, setIsSmallScreen] = React.useState(false);
    React.useEffect(() => {
       const mediaQuery = window.matchMedia("(max-width:1023px)");
       mediaQuery.addListener(handleMediaQueryChange);
       handleMediaQueryChange(mediaQuery);
   
       return () => {
         mediaQuery.removeListener(handleMediaQueryChange);
       };
     }, []);
     
   const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };
    return (
        <>
      

        {!isSmallScreen ?
            <footer className="footer-sec ">

            <div className="footer-sec-inner ">

                <div className="container-custom py-3 mr-5 text-bold">
                    <h4 className="nav-dropdown-main hover:text-[#9c9090]">Company</h4>
                    <ul>
                        <li>
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >Legal Stuff </a>
                        </li>
                        <li>
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >Careers
                            </a>
                        </li>
                        <li>
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >Media Centre </a>
                        </li>
                        <li>
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >Community Connect Blog </a>
                        </li>
                        <li>
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >
                                Contact Us </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-bx footer-a py-3 mr-5">
                    <h4>Useful as</h4>
                    <ul>
                        
                        <li key="" className="nav-dropdown-main">
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >Site Map </a>

                        </li>
                        <li key="" className="nav-dropdown-main">
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >Student Discount </a>
                        </li>
                        <li key="" className="nav-dropdown-main">
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >Refer a Friend </a>
                        </li>
                        <li key="" className="nav-dropdown-main">
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >FAQs </a>

                        </li>
                        <li key="" className="nav-dropdown-main">
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >Existing Customers </a>

                        </li>
                        <li key="" className="nav-dropdown-main">
                            <a className="course-accordion" href="#" rel="noopener noreferrer" >All our products</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-bx footer-a py-3 mr-5 connect-img">
                    <h4>Connect</h4>
                    <ul>
                        <div className="">
                            <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">

                            </h6>
                            <p className="flex justify-right items-right   border-gray-300">
                                <a target='_blank' href="#" ><img src="https://communityfibre.co.uk/_next/image?url=https%3A%2F%2Fcdn.buttercms.com%2F8JYcEJbtSvS1YPOASYrM&w=1920&q=75" alt="footericon"></img></a>

                                <a target='_blank' href="#" className="ml-2 mr-4 text-gray-600">

                                    <img src="https://communityfibre.co.uk/_next/image?url=https%3A%2F%2Fcdn.buttercms.com%2FmFQC6pvGSlyZAAB1zkN2&w=1920&q=75" alt="footericon"></img></a>

                                <a target='_blank' href="#" className=" text-gray-600">
                                    <img src="https://communityfibre.co.uk/_next/image?url=https%3A%2F%2Fcdn.buttercms.com%2F6rzZHRkToOEbGHVd83z2&w=1920&h=1&q=75" alt="footericon"></img></a>
                                <a target='_blank' href="#" className="ml-2 mr-4 text-gray-600">
                                    <img src="https://communityfibre.co.uk/_next/image?url=https%3A%2F%2Fcdn.buttercms.com%2FcNBUqv3VRJEGmRdUbgG7&w=1920&q=75" alt="footericon"></img></a>
                            </p>
                        </div>
                    </ul>
                </div>
                <div className="footer-bx footer-a footer-a1">
                  
                <div className="backto-top">
<button type="button" onClick={scrollToTop}>
<svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-10 h-5 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"></path></svg>

    
     <span>Back to Top</span></button> 
                </div>
                  
                    <ul>
                        <li>
                            <div className="">

                                <div className="flex items-right justify-end  mb-4">
                                    <a href="#" rel="noopener noreferrer" >
                                        <img
                                            src="https://communityfibre.co.uk/_next/static/images/logoDesktop-9bf97008bd5975f83100ccfb417dfa14.svg"
                                            width="full"
                                            height="50" alt="icon" ></img></a> </div>
                                <br></br>
                                <h5 className="text-right">Community Fibre Ltd</h5>
                                <h5 className="text-right">
                                    Fox Court, 14 Grays Inn Road, London, WC1X 8H
                                </h5>
                                <h5 className="text-right">

                                    <a className="text-right"
                                        href={`tel:0800 082 0770`}
                                        rel="noopener noreferrer"
                                    // conversionDetails={conversionDetails_phone}
                                    >
                                        08000820770
                                    </a>
                                </h5>
                               
                            </div>
                            <br></br>
                           
                            <h5 className="text-right">© Copyright Community Fibre Ltd. All Rights</h5>
                            <h5 className="text-right"> Reserved</h5>    
                        </li>
                    </ul>
                </div>



                </div>
            </footer>: <Footeraccordian></Footeraccordian>}


        </>
    )

}