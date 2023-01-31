import UniversalResults from '../components/UniversalResults';
import DirectAnswer from '../components/DirectAnswer';
import { universalResultsConfig, UniversalResultsConfig } from '../config/universalResultsConfig';
import SpellCheck from '../components/SpellCheck';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import locationpin from '../icons/location-pin.svg';
import callicon from '../icons/icon-call.svg';


const navLinks = [
  {
    to: '/',
    label: 'All'
  },
  ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
    to: verticalKey,
    label: config.label || verticalKey
  }))
]

const universalResultsFilterConfig = {
  show: true
};

export default function UniversalSearchPage(props: { universalResultsConfig: UniversalResultsConfig }) {
  const { universalResultsConfig } = props;
  usePageSetupEffect();
  let PathUrl = window.location.pathname + "?&query=Help+Articles";
  let wwNewVar = window.location.search;
  let wwNewBar = wwNewVar.split("=");
 console.log(wwNewBar,"Varnew")
  
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;
  return (
    <>
      <div>
        {isVertical
          ? <SearchBar
            placeholder='Search your Query....'
          />
          : <SampleVisualSearchBar />
        }
        <Navigation links={navLinks} />
        <SpellCheck />
        <DirectAnswer />

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 top-1">
         
        <div className="border border-blackLight border-opacity-10 rounded-lg mb-4 p-4 pb-8 shadow-sm ProductVerticalContainer relative"><div className="ProductHeaderClass">
            <div className="ProductTitle">
              <div className="text-xl font-bold truncate text-purple1">Community Fibre Ltd</div>
            </div>
           
            <div className="text-md my-2.5"><div className="text-md relative pl-8"><img className="addressLogo absolute top-0 left-0 w-5" src={locationpin} width="28" height="28" alt=""></img>
            <div>Fox Court, 14 Grays Inn Road</div><div>London, United Kingdom</div><div>WC1X 8HN</div></div></div>
            <div className="flex flex-row relative pl-8 single-line"><div className="absolute top-0 left-0"><img className="call" src={callicon} width="28" height="28" alt=""></img></div>
            <a className="text-md" target="_blank" href="tel:+448000820770">+448000820770</a></div><div className="Productdec"></div><div className="ProductPrice flex flex-row mb-2.5"><p></p></div>
            <div className="ProductCta"><a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=32 Page Street,London">
              <div className="ctaBtn">
                <div className="sm:text-body align-middle font-heading  font-medium sm:text-base">Get Direction</div>
            </div></a></div></div></div>
        
       
          <div className="border border-blackLight border-opacity-10 rounded-lg mb-4 p-4 pb-8 shadow-sm ProductVerticalContainer relative"><div className="ProductHeaderClass">
            <div className="ProductTitle">
              <div className="text-xl font-bold truncate text-purple1">Community</div>
            </div>
           
            <div className="text-md my-2.5"><div className="text-md relative pl-8"><img className="addressLogo absolute top-0 left-0 w-5" src={locationpin} width="28" height="28" alt=""></img>
            <div>32 Page Street</div><div>London, London</div><div>SW1P 4EN</div></div></div>
            <div className="flex flex-row relative pl-8 single-line"><div className="absolute top-0 left-0"><img className="call" src={callicon} width="28" height="28" alt=""></img></div>
            <a className="text-md" target="_blank" href="tel:+448000836160">+448000836160</a></div><div className="Productdec"></div><div className="ProductPrice flex flex-row mb-2.5"><p></p></div>
            <div className="ProductCta"><a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=32 Page Street,London">
              <div className="ctaBtn">
                <div className="sm:text-body align-middle font-heading  font-medium sm:text-base">Get Direction</div>
            </div></a></div></div></div>
        </div>
        <UniversalResults
          appliedFiltersConfig={universalResultsFilterConfig}
          verticalConfigs={universalResultsConfig}
        />
      </div>
    </>
  );
}