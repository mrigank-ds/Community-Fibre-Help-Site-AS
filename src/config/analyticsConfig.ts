import { AnalyticsConfig } from '@yext/analytics';
import { provideSearchAnalytics } from '@yext/analytics'; // can also be imported as provideAnalytics

export const analyticsConfig: AnalyticsConfig = {
  experienceKey: 'fiber',
  experienceVersion: 'STAGING',
  businessId: 3190650,
  debug:true
};


export const eventClickAnalytics = (type:any, entityId:any,verticalKey:any, queryId:any, searcher:any) => {
  const searchAnalytics = provideSearchAnalytics(analyticsConfig);
  searchAnalytics.report({
    type: type ? type : 'CTA_CLICK',
    entityId: entityId,
    verticalKey: verticalKey ? verticalKey : "",
    searcher: searcher ? searcher : 'UNIVERSAL', // 'UNIVERSAL' | 'VERTICAL';
    queryId: queryId ? queryId : ""
  });
};