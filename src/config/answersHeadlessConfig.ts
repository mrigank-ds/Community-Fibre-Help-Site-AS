import { AnswersHeadlessProvider } from '@yext/answers-headless-react';

type HeadlessProviderProps = Parameters<typeof AnswersHeadlessProvider>[0];

export const answersHeadlessConfig: HeadlessProviderProps = {
  apiKey: '644ed913e3b822ad4c901a5e8a8593aa',
  experienceKey: 'fibre',
  locale: 'en_GB',
  sessionTrackingEnabled: true,
 
};
