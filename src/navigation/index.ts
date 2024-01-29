import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: any, params: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function dispatch(action: CommonActions.Action) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(action);
    }
}

export * from './types';
export * from './routes';
export * from './actions';
