import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../core/layouts/main-layout';
import { NAVIGATION_LOGIN, RootStackScreenProps, ROUTES } from '../../../navigation';
import { useUserStore } from '../../../store';
import { getUserProfile } from '../../../core/api';
import { BoxPreloader } from '../../../core/ui';
import { fadeIn } from '../../../core/utils';
import styles from './styles';

const welcome = require('./images/welcome.png');

const WelcomeScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.WELCOME>['navigation']>();
    const userStore = useUserStore();

    const imageOpacity = useRef(new Animated.Value(0.3)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await getUserProfile();

            if (data) {
                userStore.setUser(data);
            } else {
                //  navigation.replace(ROUTES.ERROR_500);
            }
        };

        fadeIn(imageOpacity, undefined, 1500);

        if (!userStore.user) {
            fetchUser();
        }
    }, []);

    useEffect(() => {
        if (userStore.user) {
            fadeIn(titleOpacity, () => {
                setTimeout(() => {
                    navigation.dispatch(NAVIGATION_LOGIN);
                }, 500);
            }, 1000);
        }
    }, [userStore.user]);

    return (
        <MainLayout
            theme="white"
            edges={['top']}
        >
            <View style={styles.screen}>
                <View style={styles.content}>
                    <View>
                        {userStore.user && (
                            <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
                                {`Доброго дня, ${userStore.user.name}!`}
                            </Animated.Text>
                        )}
                    </View>
                    <View style={styles.preloader}>
                        <BoxPreloader />
                    </View>
                </View>
                <Animated.View
                    style={[styles.image, {
                        opacity: imageOpacity,
                        transform: [{
                            translateY: imageOpacity.interpolate({
                                inputRange: [0.3, 1],
                                outputRange: [50, 0]
                            })
                        }]
                    }]}
                >
                    <Image source={welcome} />
                </Animated.View>
            </View>
        </MainLayout>
    );
};

export default observer(WelcomeScreen);
