import { useAnswersState } from '@yext/answers-headless-react';
import { useContext } from 'react';
import { useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';
import { useEffect, useState } from "react";
import '../../sass/style.css';
// import RtfConverter from "@yext/rtf-converter";



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
  descriptionContainer: 'w-full text-sm font-heading ',
  name: 'text-xl font-bold',
  ctaButton: 'flex rounded-md mt-4 justify-center',
  ctaButtonText: 'text-base px-3 py-3 sm:py-0',
};

// TODO: format hours, hours to middle, fake CTAs on the right, hours to show current status and then can be expanded, limit to 3 results for now, margin between map
export function FaqCard(props: TrainerCardProps): JSX.Element {
  const { result } = props;
  const trainer = result.rawData as unknown as TrainerData;
  const FaqVertical: any = result.rawData;
  const FaqLandingPage = FaqVertical.landingPageUrl ? FaqVertical.landingPageUrl : '#';

  const pricing  = FaqVertical.c_pricing;
  // console.log(pricing,"pricing");


  //   const screenSize = useContext(ResponsiveContext);/
  const [faqClass, setFaqClass] = useState("");

  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.name}>{name}</div>;
  }

  

  const isVertical = useAnswersState((s) => s.meta.searchType) === 'vertical';


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


  /**
 * 
 * @param string 
 * @param limit 
 * @returns Limited number of words
 */
function limit(string?: string, limit = 0) {
  return string?.substring(0, limit)
}
  return (
    <>
      <div className={'faq-block md:col-span-3 ' + trainer.id + ' ' + faqClass} >
        <div className='faq-title' onClick={(e) => isShowContent(e, trainer.id)} >{renderName(trainer.name)}</div>
        <div className={cssClasses.ctaButton + ' faq-content'}>
          {/* <div dangerouslySetInnerHTML={{ __html: RtfConverter.toHTML(trainer.answer) }} /> */}
          <div className='FaqAnswers'>
            {limit(trainer.answer,100)}
          </div>
          <a href={FaqLandingPage} className='FaqCtaButton'>
            <div className={cssClasses.ctaButtonText}>Read more</div>
          </a>
        </div>
      </div>
    </>

  );
}
