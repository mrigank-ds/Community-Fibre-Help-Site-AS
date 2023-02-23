import { useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';
import { useContext, useState } from 'react';
import { LocationContext } from '../LocationContext';
import { LocationActionTypes } from '../locationReducers';
import { eventClickAnalytics } from '../../config/analyticsConfig';
import { useAnswersState } from '@yext/answers-headless-react';
import locationpin from '../../icons/location-pin.svg';
import callicon from '../../icons/icon-call.svg';
import React from 'react';
import Hours from "../hours"
import OpenClose from '../OpenClose';
import hoursicon from '../../icons/hours-icn.svg'

//prettier-ignore

// const metersToMiles = (meters: number) => {
//   const miles = meters * 0.0006213712;
//   return miles.toFixed(2);
// }
export interface LocationCardConfig {
  showOrdinal?: boolean
}

//prettier-ignore
export interface LocationCardProps extends CardProps {
  configuration: LocationCardConfig
}

//prettier-ignore
interface Address {
  line1: string,
  city: string,
  countryCode: string,
  postalCode: string,
  region: string
}

//prettier-ignore
export interface Interval {
  start: string,
  end: string
}

//prettier-ignore
interface DayHours {
  isClosed: boolean,
  // TODO: change to optional field
  openIntervals: Interval[]
}



//prettier-ignore
export interface LocationData {
  id: string,
  address?: Address,
  name?: string,
  hours?: Hours,
  photoGallery?: any
}

const builtInCssClasses = {
  container: 'location-result result',
  header: 'flex text-base',
  body: 'text-md all-location-phn',
  descriptionContainer: 'text-md relative pl-8',
  ctaContainer: 'flex flex-col justify-between ml-4',
  cta1: 'min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow',
  cta2: 'min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow',
  ordinal: 'mr-1.5 text-lg font-medium',
  title: 'text-lg font-medium font-body font-bold title-location',
  ctaButton: 'ctaBtn',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function LocationCard(props: LocationCardProps): JSX.Element {
  const { result } = props;
  const location = result.rawData as unknown as LocationData;
  const load: any = result.rawData;
  const addressLine1: any = load.address.line1;
  const AddressCity: any = load.address.city;
  
const CtaAddress = (addressLine1+','+AddressCity);
  const PhoneNumber = load.mainPhone?  load.mainPhone : null;
  const LandingPage = load.landingPageUrl? load.landingPageUrl : null;
  const hours1 = load.hours ? load.hours : 'close';

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  const screenSize = 'sm';
  const { state, dispatch } = useContext(LocationContext);
  
  function renderTitle(title: string) {
    return <div className={cssClasses.title}>{title}</div>;
  }

  function renderAddress(address?: Address) {
    if (!address) return;
    return (
      <div className={cssClasses.descriptionContainer}>
        <img className="addressLogo absolute top-0 left-0 w-5" src= {locationpin} width="28" height="28"
          alt="logo" />
        <div>{location.address?.line1}</div>
        <div>{`${location.address?.city}, ${location.address?.region} `}</div>
        <div>{location.address?.postalCode}</div>
      </div>
    );
  }

  /* hover effect on card */
  const [isHover, setIsHover] = useState(false);

 const handleMouseEnter = () => {
  setIsHover(true);
};
const handleMouseLeave = () => {
  setIsHover(false);
};
   
  
  function info(index:any){
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {

  
}
  }
  
 
  
  const queryId = useAnswersState(state => state.query.queryId) || ""; 
  const verticalKey = useAnswersState(state => state.vertical.verticalKey) || "";
  let searcher = verticalKey ? 'VERTICAL' : 'UNIVERSAL';   
  
  const getDirectionEventClick = () => {           
    eventClickAnalytics( 'DRIVING_DIRECTIONS', location.id , "locations", queryId, searcher );
  };

  const getPhoneEventClick = () => {      
    eventClickAnalytics( 'TAP_TO_CALL', location.id , "locations", queryId, searcher );
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }
  
  return (
    <div
      id={"result-" + location.id}
      className={cssClasses.container}
>
      <div className='flex flex-wrap flex-col'>
        <div className={cssClasses.header}>
          {renderTitle(location.name || '')}
        </div>
        <div className={cssClasses.body + ' my-2.5'}>
          {renderAddress(location.address)}
        </div>
        
        { PhoneNumber ?
        <div className="flex flex-row relative pl-8 single-line">
          <div className="absolute  top-0 left-0">
          { PhoneNumber ?<img className=" " src={callicon} width="28" height="28" alt="" />:""} 
           
          </div>
         <a className={cssClasses.body} target="_blank" href={`tel:${PhoneNumber}`}  onClick={getPhoneEventClick} >
              {PhoneNumber}
          </a>
        </div>:""} 
        <div> 
          {/* {metersToMiles(result.distance ?? 0)} mi */}
        </div> 
         
      </div>
      <div className='buttons'>
        <div>
        <a className={cssClasses.ctaButton} target="_blank" onClick={getDirectionEventClick} href={`https://www.google.com/maps/dir/?api=1&destination=${CtaAddress}`}>
            Get Direction
        </a>
        </div>
        <div className='mt-2'>
        <a className={cssClasses.ctaButton} onClick={getDirectionEventClick} href='#'>
            See More
        </a>
        </div>
       
      </div>

    </div>
  );
}

