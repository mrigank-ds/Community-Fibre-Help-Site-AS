import { useEffect, useState } from "react";
import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import { CardProps } from '../../models/cardComponent';
import { TrainerCardConfig, TrainerCardCssClasses } from "./FaqCard";


type Article = {
  prop: any;
  faq_title: any;
  faq_description: any;
};
const builtInCssClasses: TrainerCardCssClasses = {
    container: 'flex flex-col p-4 shadow-sm my-2 align-items-center',
    descriptionContainer: 'w-full text-md font-heading ',
    name: 'text-lg font-medium text-purple1',
    ctaButton: 'flex rounded-md mt-4 justify-center',
    ctaButtonText: 'text-base px-3 py-3 sm:py-0',
   
  
  };
export interface TrainerCardProps extends CardProps {
    configuration: TrainerCardConfig
  }
export function ArticleCard(props: TrainerCardProps): JSX.Element {
    const { result } = props;
 
    const FaqVertical: any = result.rawData;
    const name = FaqVertical.name;
    const data = FaqVertical.c_descriptionArticles
    const FaqLandingPage = FaqVertical.landingPageUrl ? FaqVertical.landingPageUrl : '#';
  const [faq_Data, setFaq_Data] = useState([]);
  const [faqClass, setFaqClass] = useState("");
  const [selected, setselected] = useState(null);
  const isShowContent = (e: any, index: any) => {
    setselected(index);
    let parent = e.target.parentNode;
    let parent2 = e.target.parentNode.parentNode;
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
  const cssClasses = useComposedCssClasses(builtInCssClasses);

  function renderName(name?: string) {
    return <div className={cssClasses.name}>{name}</div>;
   
  }
  function limit1(string = '', limit = 0) {
    return string.substring(0, limit)
  }
  const greeting1 = limit1(data, 498);

  return (
    <>
      <div className={'faq-block md:col-span-3 ' + FaqVertical.id + ' ' + faqClass}>
        <div className='faq-title' onClick={(e) => isShowContent(e, FaqVertical.id)} >{renderName(FaqVertical.name)}
      
        </div>
        <div  className={cssClasses.ctaButton + ' faq-content'}>
          <div dangerouslySetInnerHTML={{ __html:(greeting1)}}></div>
          
          <a  className="readmore" href={FaqLandingPage}>
            <div >Read more</div>
          </a>
        </div>
        
      </div>
    </>
  );
};

