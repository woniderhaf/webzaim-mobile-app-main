import React from 'react';
import { observer } from 'mobx-react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OtherStackParamList, ROUTES } from '../../../navigation';
import OtherScreen from './other';
import AboutScreen from './about';
import FAQScreen from './faq';
import FAQAnswerScreen from './faq-answer';
import AppDocumentsListScreen from './app-documents-list';
import AppDocument from './app-document';
import NewsScreen from './news';
import PostScreen from './post';

const OtherStack = createNativeStackNavigator<OtherStackParamList>();

const OtherStackScreen = () => {
    return (
        <OtherStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={ROUTES.OTHER}>
            <OtherStack.Screen name={ROUTES.OTHER} component={OtherScreen} />
            <OtherStack.Screen name={ROUTES.ABOUT} component={AboutScreen} />
            <OtherStack.Screen name={ROUTES.FAQ} component={FAQScreen} />
            <OtherStack.Screen name={ROUTES.FAQ_ANSWER} component={FAQAnswerScreen} />
            <OtherStack.Screen name={ROUTES.APP_DOCUMENTS_LIST} component={AppDocumentsListScreen} />
            <OtherStack.Screen name={ROUTES.APP_DOCUMENT} component={AppDocument} />
            <OtherStack.Screen name={ROUTES.NEWS} component={NewsScreen} />
            <OtherStack.Screen name={ROUTES.POST} component={PostScreen} />
        </OtherStack.Navigator>
    );
};

export default observer(OtherStackScreen);
