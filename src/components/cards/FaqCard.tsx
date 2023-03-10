import { useAnswersState } from '@yext/answers-headless-react';
import { useContext } from 'react';
import { useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';
import { useEffect, useState } from "react";
import '../../sass/style.css'
import { eventClickAnalytics } from '../../config/analyticsConfig';


//prettier-ignore
export interface TrainerCardConfig {
  showOrdinal?: boolean
}

//prettier-ignore
export interface TrainerCardProps extends CardProps {
  configuration: TrainerCardConfig
}

//prettier-ignore
export interface SimpleImage {
  url: string,
  width: number,
  height: number
}

//prettier-ignore
export interface Image extends SimpleImage {
  sourceUrl: string,
  thumbnails: SimpleImage[]
}

//prettier-ignore
interface PrimaryPhoto {
  image?: Image
}

//prettier-ignore
export interface TrainerData {
  body: any;
  id: any | null | undefined;
  answer: string | undefined;
  name?: string,
  c_inspirationalQuote?: string,
  primaryPhoto?: PrimaryPhoto
}

//prettier-ignore
export interface TrainerCardCssClasses {
  container?: string,
  descriptionContainer?: string,
  name?: string,
  // TODO: why can't I use the tailwind pixels here
  trainerPhoto?: string,
  ctaButton?: string,
  ctaButtonText?: string
}

//prettier-ignore
const builtInCssClasses: TrainerCardCssClasses = {
  container: 'flex flex-col p-4 shadow-sm my-2 align-items-center',
  descriptionContainer: 'w-full text-md font-heading ',
  name: 'text-lg font-medium text-purple1',
  ctaButton: 'flex rounded-md mt-4 justify-center',
  ctaButtonText: 'text-base px-3 py-3 sm:py-0',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function FaqCard(props: TrainerCardProps): JSX.Element {
  const { result } = props;
  const trainer = result.rawData as unknown as TrainerData;
  const FaqVertical: any = result.rawData;
  const Ans = FaqVertical.body;
  const data = FaqVertical.c_descriptionArticles
  const FaqLandingPage = FaqVertical.landingPageUrl ? FaqVertical.landingPageUrl : '#';
  //   const screenSize = useContext(ResponsiveContext);/

   function limit(string = '', limit = 0) {
     return string.substring(0, limit)
   }
   const greeting = limit(Ans, 500);
  //  console.log(greeting.length, "greeting");
   //const regex = /[`!@#$%^&*()_+\=\[\]{};':"\\|,\/?~]/g;
   //const articles1 = greeting.replace(regex," ")

   //const articles = articles1.replace('httpwwwcommunityfibrecoukcontact-ushttpwwwcommunityfibrecouk', "").replace('undefined', "");

  const [faqClass, setFaqClass] = useState("");

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.name}>{name}</div>;
   
  }
  // console.log(renderName)
  function renderQuote(quote?: string) {
    return <div className={cssClasses.descriptionContainer}>{quote}</div>;
  }

  const isVertical = useAnswersState((s) => s.meta.searchType) === 'vertical';

// console.log(isVertical,'isVertical')
  /**
   * This function helps FAQ accordion to open ones at a time
   * @param e - Elements of the Div
   * @param index - Ordinal of the elements
   */
  const isShowContent = (e: any, index: any) => { // alert('Hello');

    let parent = e.target.parentNode.parentNode;
    // console.log(parent, "parent");
    if (parent.classList.contains("opened")) {
      setFaqClass("");
      // console.log(e.target.parentNode.parentNode.classList); 
    } else {
      var acc = document.getElementsByClassName("faq-block"); // alert(acc.length);
      for (let s = 0; s < acc.length; s++) {
        acc[s].classList.remove("opened");
      }
      // console.log(e.target.parentNode.parentNode.classList);  
      setFaqClass("opened");
      parent.classList.add("opened");
    }
  };
  const queryId = useAnswersState(state => state.query.queryId) || ""; 
  const verticalKey = useAnswersState(state => state.vertical.verticalKey) || "";
  let searcher = verticalKey ? 'VERTICAL' : 'UNIVERSAL';   
  
  const knowmoreEventClick = () => {           
    eventClickAnalytics( 'CTA_CLICK', trainer.id , "faqs", queryId, searcher );
    
  };
  function limit1(string = '', limit = 0) {
    return string.substring(0, limit)
  }
  const greeting1 = limit1(data, 500);

  
  return (
    <>
       <div className={'faq-block md:col-span-3 ' + trainer.id + ' ' + faqClass} >
        <div className='faq-title' onClick={(e) => isShowContent(e, trainer.id)} >{renderName(trainer.name)}</div>
        <div  className={cssClasses.ctaButton + ' faq-content'}>
          <div dangerouslySetInnerHTML={{ __html: (greeting1)}}/><span>......</span>
          <a  onClick={knowmoreEventClick} className="readmore" href={FaqLandingPage}>
            <div className={cssClasses.ctaButtonText}>Read more</div>
          </a>
        </div>
      </div>
    </>

  );
}
