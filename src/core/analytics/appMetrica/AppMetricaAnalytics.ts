import Config from 'react-native-config';
import { Analytics, IEventOptionalParams } from '../types';
import AppMetricaCore from './AppMetricaCore';

class AppMetricaAnalytics extends Analytics {
    init() {
        if (!this.isActive && Config.APP_METRICA_KEY) {
            AppMetricaCore.activate(Config.APP_METRICA_KEY);
            this.isActive = true;
        }
    }

    sendEvent(message: string, params?: IEventOptionalParams) {
        if (this.isActive) {
            AppMetricaCore.reportEvent(message, params || null);
        }
    }
}

export default AppMetricaAnalytics;
