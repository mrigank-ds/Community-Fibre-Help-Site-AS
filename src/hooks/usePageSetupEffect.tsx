import { useLayoutEffect } from "react";
import { useAnswersActions, SearchIntent, UniversalLimit } from "@yext/answers-headless-react";
import { executeSearch, getSearchIntents, updateLocationIfNeeded } from "../utils/search-operations";
import { universallimit } from "../config/universalResultsConfig";
import { verticalLimit } from "../config/routeConfig";

/**
 * Sets up the state for a page
 * @param verticalKey - The verticalKey associated with the page, or undefined for universal pages
 */
export default function usePageSetupEffect(verticalKey?: string, limit?:any) {
  const answersActions = useAnswersActions();
  const searchActions = useAnswersActions();

  useLayoutEffect(() => {
    const stateToClear = {
      filters: {},
      universal: {},
      vertical: {}
    }
    const key:any = verticalKey;
    let universalverticalkey:any=[
        'product',
        'video',
        'help_articles',
        'provider_switching',
        'locations'
    ]
    const cardlimit : any =limit;
    answersActions.setState({
      ...answersActions.state,
      ...stateToClear
    });
    if(verticalKey){
       answersActions.setVertical(verticalKey)}
      else{answersActions.setUniversal();
     
      const universalLimit: any= {};
      universalverticalkey.map((res:any)=>{
        return  universalLimit[res] = universallimit || null;
      })
       
       const newuniversallimit: UniversalLimit =universalLimit;
      searchActions.setUniversalLimit(
        newuniversallimit);}

     
       if(verticalKey == key){        
        searchActions.setVerticalLimit(limit);
       }
      
       
 
    const executeQuery = async () => {
      let searchIntents: SearchIntent[] = [];
      if (!answersActions.state.location.userLocation) {
        searchIntents = await getSearchIntents(answersActions, !!verticalKey) || [];
        await updateLocationIfNeeded(answersActions, searchIntents);
      }
      executeSearch(answersActions, !!verticalKey);
    };
    executeQuery();
  }, [answersActions, verticalKey]);
}