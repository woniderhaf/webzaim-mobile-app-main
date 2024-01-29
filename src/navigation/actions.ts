import { CommonActions } from '@react-navigation/native';
import { ROUTES } from './routes';

export const NAVIGATION_LOGOUT_ACTION = CommonActions.reset({
    index: 1,
    routes: [
        { name: ROUTES.CALCULATOR },
        {
            name: ROUTES.LOGIN
        }
    ]
});

export const NAVIGATION_LOGIN = CommonActions.reset({
    index: 0,
    routes: [
        { name: ROUTES.MAIN }
    ]
});

export const NAVIGATION_USER_LOANS = CommonActions.reset({
    index: 0,
    routes: [
        { name: ROUTES.MAIN, params: { screen: ROUTES.LOANS_STACK, params: { screen: ROUTES.USER_LOANS } } }
    ]
});
