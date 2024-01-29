import FirebaseAnalytics from './firebase';
import AppMetricaAnalytics from './appMetrica';
import { Analytics, IEventOptionalParams } from './types';

const SDKList: Analytics[] = [];

SDKList.push(new FirebaseAnalytics());
SDKList.push(new AppMetricaAnalytics());

export const init = () => {
    SDKList.forEach(SDK => SDK.init());
};

export const trackScreen = (screen: string) => {
    SDKList.forEach(SDK => SDK.trackScreen(screen));
};

export const sendEvent = (messages: string, params?: IEventOptionalParams) => {
    SDKList.forEach(SDK => SDK.sendEvent(messages, params));
};
