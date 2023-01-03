import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="footer-sec ">
  
                <div className="container-custom py-3 mr-5 text-bold">
                   
                            <h4 className="nav-dropdown-main hover:text-[#9c9090]">Company</h4>
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

                        </div>

                        <div className="footer-bx footer-link py-3 mr-5">
                            <h4>Useful links</h4>
                            <ul>
                                
                          <li key="" className="nav-dropdown-main">
                              <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >COVID-19 </Link>

                          </li>
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
                              <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >Existing Customers </Link>

                          </li>
                          <li key="" className="nav-dropdown-main">
                              <Link className="course-accordion" href="#" rel="noopener noreferrer" to={""} >All our products</Link>

                          </li>
                          
                                          
                            </ul>
                        </div>
                        <div className="footer-bx footer-link py-3 mr-5 connect-img">
                            <h4>Connect</h4>
                            <ul>

                                <div className="">
                                    <h6 className="uppercase font-semibold mb-4 flex justify-center md:justify-start">

                                    </h6>
                                    <p className="flex justify-right items-right   border-gray-300">


                                        <a href="#" ><img src="https://communityfibre.co.uk/_next/image?url=https%3A%2F%2Fcdn.buttercms.com%2F8JYcEJbtSvS1YPOASYrM&w=1920&q=75" alt="footericon"></img></a>

                                        <a href="#" className="ml-2 mr-4 text-gray-600">

                                            <img src="https://communityfibre.co.uk/_next/image?url=https%3A%2F%2Fcdn.buttercms.com%2FmFQC6pvGSlyZAAB1zkN2&w=1920&q=75" alt="footericon"></img></a>

                                        <a href="#" className=" text-gray-600">

                                            <img src="https://communityfibre.co.uk/_next/image?url=https%3A%2F%2Fcdn.buttercms.com%2F6rzZHRkToOEbGHVd83z2&w=1920&h=1&q=75" alt="footericon"></img></a>

                                        <a href="#" className="ml-2 mr-4 text-gray-600">

                                            <img src="https://communityfibre.co.uk/_next/image?url=https%3A%2F%2Fcdn.buttercms.com%2FcNBUqv3VRJEGmRdUbgG7&w=1920&q=75" alt="footericon"></img></a>

                                    </p>
                                </div>
                            </ul>
                        </div>
                        <div className="footer-bx footer-link">
                            <ul>

                                <li>
                                    <div className="">

                                        <div className="flex items-right justify-end  mb-4">
                                            <Link href="#" rel="noopener noreferrer" to={""} >
                                                <img
                                                    src="https://communityfibre.co.uk/_next/static/images/logoDesktop-9bf97008bd5975f83100ccfb417dfa14.svg"
                                                    width="full"
                                                    height="50" ></img></Link> </div>
                                        <br></br>
                                        <h5 className="text-right">Community Fibre Ltd</h5>
                                        <h5 className="text-right">

                                            Fox Court, 14 Grays Inn Road, London, WC1X 8HN

                                        </h5>
                                        <h5 className="text-right">

                                            <Link className="text-right"
                                                href={`tel:0800 082 0770`}
                                                rel="noopener noreferrer" to={""}
                                            // conversionDetails={conversionDetails_phone}
                                            >
                                                08000820770
                                            </Link>
                                        </h5>

                                    </div>
                                </li>

                            </ul>

                        </div>



            </footer>
        </>
    )

}