import * as React from "react";
import { Link } from "react-router-dom";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
var currentTime = new Date()
var year = currentTime.getFullYear()

type props = {
    data: any;
};

// const links: Link[] = [
//    {
//       label: "Privacy Policy",
//       url: "/",
//    },
//    {
//       label: "Copyright/Legal Info",
//       url: "/copyright"
//    },
// ];

const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };
const Footeraccordian = () => {
    // let MainMenus = SectionFooter.data.headerLinksHeading ; 
    // console.log(SectionFooter.data.c_company_links.links, "SectionFooter");
  
    return (
        <>
        
            <footer className="py-12">
                <div className="container">
                <div className="backto-top">
<button type="button" onClick={scrollToTop}>
<svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-10 h-5 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z"></path></svg>

    
     <span>Back to Top</span></button> 
                </div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="column mt-3 lg:mt-0 order-4">
                            <a className="logo " href="/">
                                <img src='https://theme.zdassets.com/theme_assets/829305/0b9386bf81d85a61c5f7d9c66f3df045c9ea964b.svg' alt="Logo" className="fadein imgFinal" />
                            </a>
                            <p>Community Fibre Ltd </p>
                     <p>Level 3, 83 Baker Street, London W1U 6AG </p>
                     <p><a href="tel:0800 082 0770">0800 082 0770</a></p>
                    
                     <p className="mt-2.5">© Copyright Community Fibre Ltd. All Rights Reserved</p>
                        </div>
                        <Accordion allowZeroExpanded>
                            <div className="column">
                                <AccordionItem >
                                    <div className="footer-link">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                <h5 className="text-lg text-purple1 font-bold leading-relaxed p-2 pb-0 pl-0">Company</h5>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                             <ul>
                        <li>
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Legal Stuff </Link>
                        </li>
                        <li>
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Careers
                            </Link>
                        </li>
                        <li>
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Media Centre </Link>
                        </li>
                        <li>
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Community Connect Blog </Link>
                        </li>
                        <li>
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >
                                Contact Us </Link>
                        </li>
                    </ul>
                                        </AccordionItemPanel>
                                    </div>
                                </AccordionItem>
                            </div>
                            <div className="column">
                                <AccordionItem >
                                    <div className="footer-link">
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                <h5 className="text-lg text-purple1 font-bold  leading-relaxed p-2 pb-0 pl-0">Useful links</h5>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                        <ul>

                        <li key="" className="nav-dropdown-main">
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Site Map </Link>

                        </li>
                        <li key="" className="nav-dropdown-main">
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Student Discount </Link>
                        </li>
                        <li key="" className="nav-dropdown-main">
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Refer a Friend </Link>
                        </li>
                        <li key="" className="nav-dropdown-main">
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >FAQs </Link>

                        </li>
                        
                        <li key="" className="nav-dropdown-main">
                            <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >All our products</Link>
                        </li>
                    </ul>
                                        </AccordionItemPanel>
                                    </div>
                                </AccordionItem>
                            </div>
                        </Accordion>
                        <div className="column">
                            <h5 className="text-lg text-purple1 font-bold leading-relaxed p-2 pb-0 pl-0">Connect</h5>
                            <div className="social-media flex items-center p-2 pl-0">
                                <a className="mr-6" href="#" target="_blank" title="Facebook" rel="noreferrer">
                                    <img src="https://cdn.buttercms.com/8JYcEJbtSvS1YPOASYrM" alt="" />
                                </a>
                                <a className="mr-6" href="#" target="_blank" title="Instagram" rel="noreferrer">
                                    <img src="https://cdn.buttercms.com/mFQC6pvGSlyZAAB1zkN2" alt="" />
                                </a>
                                <a className="mr-6" href="#" target="_blank" title="Twitter" rel="noreferrer">
                                    <img src="https://cdn.buttercms.com/6rzZHRkToOEbGHVd83z2" alt="" />
                                </a>
                                <a href="#" className="mr-6">
                                    <img src="https://communityfibre.co.uk/_next/image?url=https%3A%2F%2Fcdn.buttercms.com%2FcNBUqv3VRJEGmRdUbgG7&w=1920&q=75" alt="footericon"></img></a>

                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footeraccordian;