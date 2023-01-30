import * as React from "react";
import videoicon from "../icons/video.svg";
import helparticle from "../icons/Helparticles.svg"
import Provider from "../icons/Provider.svg"
import CollectionIcon  from '../icons/collection.svg';

interface SectionHeaderConfig{
verticalKey: string,

}

export default function Icons(props: SectionHeaderConfig): JSX.Element {
    const {  verticalKey} = props;
    console.log('helparticle', helparticle)
    
    const vidicon =()=>{
       
        if(verticalKey == 'help_articles'){
            return <img src={helparticle} />
        }
        if(verticalKey == 'videos'){
            return <img src={videoicon} />
        }
        if(verticalKey == 'provider_switching_'){
            return <img src={Provider} />
        }
        if(verticalKey == 'products'){
            return <img src={CollectionIcon} />
        }
        console.log(verticalKey,'verticalKey')
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
