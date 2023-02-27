import ResultsCount from "../components/ResultsCount";
import DirectAnswer from "../components/DirectAnswer";
import SpellCheck from "../components/SpellCheck";
import LocationBias from "../components/LocationBias";
import usePageSetupEffect from "../hooks/usePageSetupEffect";
import { LocationCard } from "../components/cards/LocationCard";
import { LocationProvider } from "../components/LocationContext";
// import { useContext } from 'react';
import {
  LocationBiasMethod,
  SearchTypeEnum,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import LocationResults from "../components/LocationResults";
import MapToggleButton from "../components/MapToggleButton";
import SearchBar from "../components/SearchBar";
import SampleVisualSearchBar from "../components/VisualAutocomplete/SampleVisualSearchBar";
import Navigation from "../components/Navigation";
import { universalResultsConfig } from "../config/universalResultsConfig";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../hooks/useComposedCssClasses";
import { executeSearch, getUserLocation } from "../utils/search-operations";
import VerticalResults from "../components/VerticalResults";
import { SetStateAction, useEffect, useState } from "react";
import AlternativeVerticals from "../components/AlternativeVerticals";

export const builtInCssClasses: SearchBarCssClasses = {
  button: "text-blue-600 cursor-pointer hover:underline focus:underline",
};
export interface SearchBarCssClasses extends InputDropdownCssClasses {
  button?: string;
  source?: string;
}
export interface InputDropdownCssClasses {
  inputDropdownContainer?: string;
  inputDropdownContainer___active?: string;
  dropdownContainer?: string;
  inputElement?: string;
  inputContainer?: string;
  divider?: string;
  logoContainer?: string;
  searchButtonContainer?: string;
}
interface Props {
  verticalKey?: any;
  geolocationOptions?: PositionOptions;
}
const navLinks = [
  {
    to: "/",
    label: "All",
  },
  ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
    to: verticalKey,
    label: config.label || verticalKey,
  })),
];

export default function LocationsPage(
  { verticalKey, geolocationOptions }: Props,
) {

   // Getting URL code starts here
   let SearchQuery :any  = useAnswersState(state => state.query.input);
   // console.log(SearchQuery,"SearchQuery");
   const queryString : any = window.location.search;
   let  urlParams : any = new URLSearchParams(queryString);
   
   const product = urlParams.get('query');
     console.log(product,"product");
   
   // console.log(params,"params");
    useEffect(()=>{
     if(!SearchQuery){
     updateParam(SearchQuery)
     }else{
       updateParam('')
     }
   },[SearchQuery])
   function updateParam(latestUserInput:any) {
     var paramValue = SearchQuery; // Replace with your updated value
     console.log(paramValue,"paramValue");
     var searchParams = new URLSearchParams(window.location.search);
     searchParams.set('query', paramValue);
     var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
     window.history.replaceState({}, '', newUrl);
   }
   // Getting URL code ends here

  usePageSetupEffect(verticalKey);
  const screenSize = "sm";
  const results = useAnswersState((state) => state.vertical.results) || [];
  {/*const latestQuery = useAnswersState((state) => state.query.mostRecentSearch); */ }
  const isVertical =
    useAnswersState((s) => s.meta.searchType) === SearchTypeEnum.Vertical;
  const answersActions = useAnswersActions();

  const locationBias = useAnswersState((s) => s.location.locationBias);
  const cssClasses = useComposedCssClasses(builtInCssClasses);
  const verticalResults = useAnswersState((state) => state.vertical.results) ||
    [];
  const [text, setText] = useState("");
  if (!locationBias?.displayName) return null;
  const location = locationBias.displayName;

  const attributionMessage = locationBias?.method === LocationBiasMethod.Ip
    ? " (based on your internet address) - "
    : locationBias?.method === LocationBiasMethod.Device
      ? " (based on your device) - "
      : " - ";

  async function handleGeolocationClick() {
    try {
      const position = await getUserLocation(geolocationOptions);
      answersActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (e) {
      console.error(e);
    }
    executeSearch(answersActions, isVertical);
  }
  // console.log(verticalResults.length, "verticalResults");
  const changeText = (text: any) => setText(text);
  return (
    <>
      {isVertical
        ? <SearchBar placeholder="Locations" />
        : <SampleVisualSearchBar />}
      <Navigation links={navLinks} />
      <span className="locationName" onClick={() => changeText(location)}>


        {text}
      </span>
      <LocationProvider>
        <div className="flex location-page">
          <div className="flex-grow">
            <DirectAnswer />
            <SpellCheck
              cssCompositionMethod="assign"
              customCssClasses={{
                container: "font-body text-xl",
                helpText: "",
                link:
                  "text-gold font-bold cursor-pointer hover:underline focus:underline",
              }}
            />
            <ResultsCount
              cssCompositionMethod="assign"
              customCssClasses={{ text: "text-sm font-body" }}
            />

            
                <LocationResults
                  results={results}
                  verticalKey={verticalKey}
                  cardConfig={{ CardComponent: LocationCard }}
                />
                  <LocationBias />

          </div>
        </div>
      </LocationProvider>
    </>
  );
}
