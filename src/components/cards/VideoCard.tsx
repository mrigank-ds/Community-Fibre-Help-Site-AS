import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';
import '../../sass/style.css';
import { useAnswersState } from '@yext/answers-headless-react';
import { eventClickAnalytics } from '../../config/analyticsConfig';


export interface StandardCardConfig {
    showOrdinal?: boolean
  }
  
  export interface StandardCardProps extends CardProps {
    configuration: StandardCardConfig,
    customCssClasses?: StandardCardCssClasses,
    cssCompositionMethod?: CompositionMethod
  }
  
  export interface StandardCardCssClasses {
    container?: string,
    header?: string,
    body?: string,
    descriptionContainer?: string,
    ctaContainer?: string,
    cta1?: string,
    cta2?: string,
    ordinal?: string,
    title?: string,
    ctaButton?: string,
    imageContainer?: string,
    image?: string,
    ProductPriceClass ?: string
  
  }
  
  
  const builtInCssClasses: StandardCardCssClasses = {
  container: 'border border-blackLight border-opacity-10 rounded-lg mb-4 p-4 pb-8 shadow-sm ProductVerticalContainer videoVertical relative',
  header: 'text-grey-800 ProductHeaderClass',
  body: 'flex justify-end pt-2.5',
  imageContainer: 'relative h-0 inline-block w-full mb-5 imageContainer',
  image: 'absolute top-0 left-0 w-full h-full object-cover border-0 border-none',
  descriptionContainer: 'w-full text-base',
  ctaContainer: 'flex flex-col justify-end ml-4',
  cta1: 'min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow',
  cta2: 'min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow',
  ordinal: 'mr-1.5 text-lg font-medium',
  title: 'text-lg font-bold text-purple1',
  ctaButton: 'ctaBtn',
  ProductPriceClass : 'ProductPrice flex flex-row'
  }
  
  
  
  /**
   * This Component renders the base result card.
   * 
   * @param props - An object containing the result itself.
   */
  export function VideoCard(props: StandardCardProps): JSX.Element {
    const { configuration, result, customCssClasses, cssCompositionMethod } = props;
    const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  
    const VideoCard : any  = result.rawData;
    const Videosdec = VideoCard.richTextDescription ;
    const Videodate = VideoCard.c_video_published_date ;
 
    const videoImageUrl = VideoCard.c_thumbnail_photo ? VideoCard.c_thumbnail_photo.url : null ;
    const videoLandingPage = VideoCard.c_video_url;
  

    //console.log(Videos);
    /**
     * This function limits the words
     * @param string 
     * @param limit 
     * @returns The variable containing the truncated Description.
     */
    // function limit(string = '', limit = 0) {
    //   return string.substring(0, limit)
    // }
    // const greeting = limit(videoDescription, 100);
    // console.log(greeting, "greeting");
  
    // TODO (cea2aj) Update this to render the ordinal once we get mocks from UX
    function renderOrdinal(index: number) {
      // return (
      //   <div className={cssClasses.ordinal}>{index}</div>
      // );
      return null;
    }
  
    
  
    function renderTitle(title: string) {
      return <div className={cssClasses.title}>{title}</div>;
    }
    const queryId = useAnswersState(state => state.query.queryId) || ""; 
    const verticalKey = useAnswersState(state => state.vertical.verticalKey) || "";
    let searcher = verticalKey ? 'VERTICAL' : 'UNIVERSAL';   
    
    const knowmoreEventClick = () => {           
      eventClickAnalytics( 'CTA_CLICK', VideoCard.id , "video", queryId, searcher );
      
    };
  
    return (
      <div className={cssClasses.container}>
        <div className={cssClasses.imageContainer}>
            <img className={cssClasses.image} src={videoImageUrl}></img>
            <div>
              </div>
            <div className={cssClasses.header}>
        <div className='ProductTitle mb-2.5'>
          {configuration.showOrdinal && result.index && renderOrdinal(result.index)}
          {result.name && renderTitle(result.name)}
        </div>
        </div>
        <p className='mb-2.5 text-primary'>{Videodate}</p>
        </div>
        <div className='videosDescription mt-2'>
         <p>{Videosdec}</p>
          
        </div>

        <div>
            <a target="_blank" onClick={knowmoreEventClick} href={videoLandingPage} className='ctaBtn'><p  className=''><button>Watch video</button></p></a>
        </div>
      </div>
    );
    
  }