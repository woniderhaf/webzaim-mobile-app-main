import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Analytics } from '../types';

class FirebaseAnalytics extends Analytics {
    isActive = false;

    init() {
        if (!this.isActive) {
            crashlytics().setCrashlyticsCollectionEnabled(true).then(() => {
                this.isActive = true;
            });
        }
    }

    trackScreen(screen: string) {
        if (this.isActive) {
            analytics().logScreenView({
                screen_class: screen,
                screen_name: screen
            });
        }
    }
}

export default FirebaseAnalytics;
