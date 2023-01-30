import { Wrapper } from "@googlemaps/react-wrapper";
// import { useSearchState, Result } from "@yext/search-headless-react";
import * as React from "react";
import { useRef, useEffect, useState, useContext } from 'react';
import {/*twMerge,*/ useComposedCssClasses} from "..//../hooks/useComposedCssClasses";
import Mapicon from "../../icons/map-pin.svg";
import MapiconHover from "../../icons/map-pin-hover.svg";
// import UserMarker from "../../icons/map-center.png";
// import Address from "../Address";
// import Hours from "../hours";
import { renderToString } from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { LocationContext } from '../LocationContext';
// import { LocationData } from '../cards/LocationCard';
// import { Matcher, useAnswersActions, useAnswersState } from '@yext/answers-headless-react';

/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string;
}

/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsProps {
  apiKey: string;
  centerLatitude: number;
  centerLongitude: number;
  defaultZoom: number;
  showEmptyMap: boolean;
  providerOptions?: google.maps.MapOptions;
  customCssClasses?: GoogleMapsCssClasses;
  refLcation: any;
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, "apiKey" | "locale">;

let mapMarkerClusterer: { clearMarkers: () => void } | null = null;
let infoWindow:any = null;
let openMapCenter:any = "";
let openMapZoom:any = "";
let openInfoWindow:any = false;
let searchCenter:any = null;
let searchZoom:any = null;
let stopAnimation = false;
let currentMapZoom:number = 0;


const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer:
    "w-full  h-48 md:h-96 lg:h-[calc(100vh_-_0px)] xl:h-[calc(100vh_-_0px)]  top-0   2xl:h-[calc(100vh_-_0px)] order-1 lg:order-none z-[99]",
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */
export function GoogleMaps(props: GoogleMapsProps) {
  return (
    <div>
      <Wrapper apiKey={props.apiKey}>
        <UnwrappedGoogleMaps {...props} />
      </Wrapper>
    </div>
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  showEmptyMap,
  providerOptions,
  customCssClasses,
  refLcation,
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [center] = useState<google.maps.LatLngLiteral>({
    lat: centerLatitude,
    lng: centerLongitude,
  });
  const { state, dispatch } = useContext(LocationContext);

  // console.log([centerLatitude,centerLongitude]);
  const locationResults = state.mapLocations || [];
  // const userlat = useSearchState(s => s.location.locationBias) || [];
  //  console.log(userlat)
  // console.log('state.mapLocations', state.mapLocations); 

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  let containerCssClass = cssClasses.googleMapsContainer;
  /*if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, "hidden");
  }*/
  let pinStyles = {
    fill: "#4e9c34", //default google red
    stroke: "#4e9c34",
    text: "white",
    fill_selected: "#2c702e",
    stroke_selected: "#4e9c34",
    text_selected: "white",
  };

  let marker_icon = {
    url: Mapicon,
    fillColor: pinStyles.fill,
    scale: 1.1,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };

  let marker_hover_icon = {
    url: MapiconHover,
    fillColor: pinStyles.fill,
    scale: 1.1,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };


  if(!infoWindow){infoWindow = new google.maps.InfoWindow();}
  

  function zoomMapTo(map:any, zoomTo:any, centerToSet:any = false) {
    currentMapZoom = (typeof map?.getZoom() != "undefined") ? map?.getZoom() : 6;
    let newZoom =
    currentMapZoom > zoomTo ? currentMapZoom - 1 : currentMapZoom + 1;      

    map?.setZoom(newZoom);
    if (newZoom != zoomTo && !stopAnimation)
      sleep(30).then(() => {
        zoomMapTo(map, zoomTo, centerToSet);
      });
    if (newZoom == zoomTo) {
      stopAnimation = false;
      if (centerToSet) {
        if (typeof map?.panTo != "undefined") {
          map.panTo(centerToSet);
        } else {
          map?.setCenter(centerToSet);
        }
      }
    }
  }

  function sleep(ms:any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const bounds = new google.maps.LatLngBounds();
  const markerPins = useRef<google.maps.Marker[]>([]);
  const usermarker = useRef<google.maps.Marker[]>([]);
  deleteMarkers();
  
  
  /**
   * user marker for use my location and define center points.
   * 
   * 
   */ 
  
 /* 
 userdeleteMarkers();
 const userlat = useSearchState((s) => s.location.locationBias) || [];
  const iplat = userlat.latitude;
  const iplong = userlat.longitude;
  const position = {
    lat: iplat,
    lng: iplong,
  };
  const Usermarker1 = new google.maps.Marker({
    position,
    map,
    icon: UserMarker,
  });
  usermarker.current.push(Usermarker1);
*/

  try {
    if (mapMarkerClusterer) {
      mapMarkerClusterer.clearMarkers();
    }
  } catch (e) {}
  let index = 0;
  for (const result of locationResults) {
    // console.log('state.result', result.yextDisplayCoordinate); 
    const position = getPosition(result);
    let markerLabel = Number(index + 1);
    const marker = new google.maps.Marker({
      position,
      map,
      icon: marker_icon,
      label: {
        text: String(markerLabel),
        color: "#fff",
      },
    });

    const location = new google.maps.LatLng(position.lat, position.lng);
    bounds.extend(location);
    markerPins.current.push(marker);
    index++;
  }

  if (markerPins.current.length > 0) {
    let markers = markerPins.current;
    mapMarkerClusterer = new MarkerClusterer({ map, markers });
    //console.log(mapMarkerClusterer);
  }

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          ...providerOptions,
        })
      );
    }
  }, [center, map, providerOptions, zoom]);

  useEffect(() => {
    if (markerPins.current.length > 0 && map) {
      map.fitBounds(bounds);
      map.panToBounds(bounds);
      /*const zoom = map.getZoom() ?? 0;
      if (zoom > 15) {
        map.setZoom(15);
      } */
      searchCenter = bounds.getCenter();
      searchZoom = map.getZoom();
    
    
      let elements = refLcation.current.querySelectorAll(".result");
      for (let index = 0; index < elements.length; index++) {
        /* Checking for the event binded or not if not then binding event */
        if(!elements[index]?.classList.contains("markerEventBinded")){
          elements[index].classList.add("markerEventBinded");
          elements[index].addEventListener("click", () => { 
                
            if (!openInfoWindow) {
              openMapZoom = map?.getZoom();
              openMapCenter = map?.getCenter();
            }else{
              openInfoWindow = false;
              infoWindow.close();
            }
            InfowindowContents(index, locationResults[index]);
            addActiveGrid(index);
            addClickGrid(index);
            let position = getPosition(locationResults[index]);
            let latLng  = new google.maps.LatLng(position.lat, position.lng);          
            map.panTo(latLng);            
            zoomMapTo(map, 20, latLng);
            infoWindow.open(map, markerPins.current[index]);
            openInfoWindow = true;
          });

          elements[index].addEventListener("mouseover", () => {
            markerPins.current[index]?.setIcon(marker_hover_icon);
            addActiveGrid(index);
          });

          elements[index].addEventListener("mouseout", () => {
            markerPins.current[index]?.setIcon(marker_icon);
          });
        }
      }
  }
  });

  for (let i = 0; i < markerPins.current.length; i++) {
    markerPins.current[i]?.addListener("click", () => {      
      
      if (!openInfoWindow) {
        openMapZoom = map?.getZoom();
        openMapCenter = map?.getCenter();
      }else{
        openInfoWindow = false;
        infoWindow.close();
      }
      scrollToRow(i);
      addActiveGrid(i);
      addClickGrid(i);
      InfowindowContents(i, locationResults[i]);
      let position = getPosition(locationResults[i]);
      let latLng  = new google.maps.LatLng(position.lat, position.lng);      
      map?.panTo(latLng);
      zoomMapTo(map, 20, latLng);
      infoWindow.open(map, markerPins.current[i]);
      openInfoWindow = true;
    });

    markerPins.current[i]?.addListener("mouseover", () => {
      markerPins.current[i].setIcon(marker_hover_icon);
      addActiveGrid(i);
    });

    markerPins.current[i]?.addListener("mouseout", () => {
      markerPins.current[i].setIcon(marker_icon);
      let markerLabel = Number(i + 1).toString();

      markerPins.current[i].setLabel({
        text: markerLabel,
        color: "#fff",
      });
    });
  }

  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  };

  infoWindow.addListener("closeclick", () => {
    infoWindow.close();
    removeActiveGrid();
    if(searchZoom < 13){
      searchZoom = 13
    }
    zoomMapTo(map, searchZoom, false);
    openInfoWindow = false;
  });

  const hours = (result: any) => {
    // return <Hours hours={result} />;
  };

  function InfowindowContents(i: Number, result: any): void {
    const MarkerContent = (
      <div className="markerContent w-48 md:w-[350px] font-universpro font-normal text-darkgrey text-xs md:text-sm leading-6">
        <div className="nameData font-bold text-sm md:text-base">
          {result.name}
        </div>
        <div className="addressData">
          <div className='address'>
            <div>{result.address?.line1}</div>
              <div>{`${result.address?.city}, ${result.address?.region} `}</div>
              <div>{result.address?.postalCode}</div>
            </div>
        </div>
        <div>{hours(result.hours)} </div>
      </div>
    );
    let string = renderToString(MarkerContent);
    infoWindow.setContent(string);
  }

  function deleteMarkers(): void {
    for (let i = 0; i < markerPins.current.length; i++) {
      markerPins.current[i].setMap(null);
    }
    markerPins.current = [];
  }

  /*function userdeleteMarkers(): void {
    for (let i = 0; i < usermarker.current.length; i++) {
      usermarker.current[i].setMap(null);
    }
    usermarker.current = [];
  }*/

  return <div className={containerCssClass} ref={ref} />;
}

// TEMPORARY FIX
/* eslint-disable @typescript-eslint/no-explicit-any */
function getPosition(result:any) {  
  const lat = (result as any).yextDisplayCoordinate.latitude;
  const lng = (result as any).yextDisplayCoordinate.longitude;
  return { lat, lng };
}

function removeActiveGrid() {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove("active");
    elements[index].classList.remove("click-active");
  }
}

function addActiveGrid(index: any) {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove("active");
  }
  document.querySelectorAll(".result")[index]?.classList.add("active");
}

function addClickGrid(index: any) {
  let elements = document.querySelectorAll(".result");
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove("click-active");
  }
  document.querySelectorAll(".result")[index]?.classList.add("click-active");
}

function scrollToRow(index: any) {
  /*let result = [].slice.call(document.querySelectorAll(".result") || [])[0];
  let offset = 0;
  if (
    typeof [].slice.call(document.querySelectorAll(".result") || [])[index] !=
    "undefined"
  ) {
    offset =
      [].slice.call(document.querySelectorAll(".result") || [])[index]
        .offsetTop - result.offsetTop;
    [].slice
      .call(document.querySelectorAll(".result-list") || [])
      .forEach(function (el) {
        el.scrollTop = offset;
      });
  }*/
}
