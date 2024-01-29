import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useScreenContentHeight = (hasTabbar?: boolean) => {
    const insets = useSafeAreaInsets();
    const tabbarHeight = hasTabbar ? useBottomTabBarHeight() : 28;
    const headerHeight = 56;
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        const windowHeight = Dimensions.get('window').height;
        let other = headerHeight + tabbarHeight + insets.top + insets.bottom - 16;

        setContentHeight(windowHeight - other);
    }, []);

    return contentHeight;
};

export default useScreenContentHeight;
