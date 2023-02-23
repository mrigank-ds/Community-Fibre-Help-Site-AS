import * as React from "react";
import videoicon from "../icons/video.svg";
import helparticle from "../icons/Helparticles.svg"
import Provider from "../icons/Provider.svg"
import icons from '../icons/product-icon.svg'
import Location from '../icons/Location.svg'


interface SectionHeaderConfig{
verticalKey: string,

}

export default function Icons(props: SectionHeaderConfig): JSX.Element {
    const {  verticalKey} = props;
  
    const vidicon =()=>{
       
        if(verticalKey == 'help_articles'){
            return <img src={helparticle}  alt="icon" />
        }
        if(verticalKey == 'videos'){
            return <img src={videoicon}  alt="icon"  />
        }
        if(verticalKey == 'provider_switching'){
            return <img src={Provider}  alt="icon"  />
        }
        if(verticalKey == 'product'){
            return <img src={icons}  alt="icon" />
        }
        if(verticalKey == 'locations'){
            return <img src={Location}  alt="icon" />
        }
       
        return null;
    }
  

    return(
        <>
        {
          vidicon()
         
        }
        </>
    )

}
