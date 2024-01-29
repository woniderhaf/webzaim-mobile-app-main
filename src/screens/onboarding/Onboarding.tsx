import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, ImageSourcePropType, Linking } from 'react-native';
import { observer } from 'mobx-react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import MainLayout from '../../core/layouts/main-layout';
import { RootStackScreenProps, ROUTES } from '../../navigation';
import { useRootStore } from '../../store';
import { Button } from '../../core/ui';
import locale from './locale';
import styles from './styles';

type OnboardingSlider = {
    title: string;
    subtitle: string;
    image: {
        source: ImageSourcePropType;
        width: number | string;
        height: number | string;
        name: string;
    };
};

const steps: Array<OnboardingSlider> = [
    {
        title: locale.firstSlide.title,
        subtitle: locale.firstSlide.subtitle,
        image: {
            source: require('./images/step_1.png'),
            width: 280,
            height: 280,
            name: 'step_1'
        }
    },
    {
        title: locale.secondSlide.title,
        subtitle: locale.secondSlide.subtitle,
        image: {
            source: require('./images/step_2.png'),
            width: 280,
            height: 280,
            name: 'step_2'
        }
    },
    {
        title: locale.thirdSlide.title,
        subtitle: locale.thirdSlide.subtitle,
        image: {
            source: require('./images/step_3.png'),
            width: 280,
            height: 280,
            name: 'step_3'
        }
    }
];

const OnboardingScreen = () => {
    const navigation = useNavigation<RootStackScreenProps<ROUTES.ONBOARDING>['navigation']>();
    const insets = useSafeAreaInsets();
    const { increaseStep, onboardingStep, changeOnboardingShown } = useRootStore();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const isLastStep = onboardingStep === steps.length - 1;

    useEffect(() => {
        fadeIn();
    }, [onboardingStep]);

    const fadeIn = (callback?: Animated.EndCallback | undefined) => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(callback);
    };

    const fadeOut = (callback?: Animated.EndCallback | undefined) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(callback);
    };

    const nextStep = async () => {
        if (isLastStep) {
            changeOnboardingShown(true);
            navigation.replace(ROUTES.CALCULATOR);

            return;
        }

        fadeOut(() => {
            increaseStep();
        });
    };

    const stepImage = () => {
        const image = steps[onboardingStep].image;
        // @ts-ignore
        const style = [styles.sliderImageImg, styles[image.name] || {}];

        return <Image source={image.source} resizeMode="contain" style={style} />;
    };

    return (
        <MainLayout>
            <View
                style={[
                    styles.slider,
                    {
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom
                    }
                ]}>
                <Animated.View style={[styles.animateView, { opacity: fadeAnim, height: '58%' }]}>
                    <View style={styles.sliderImage}>{stepImage()}</View>
                </Animated.View>
                <View style={styles.sliderContent}>
                    <Animated.View style={[styles.animateView, { opacity: fadeAnim, flex: 1 }]}>
                        <View style={styles.sliderBody}>
                            <Text style={styles.sliderTitle}>{steps[onboardingStep].title}</Text>
                            <Text style={styles.sliderSubitle}>{steps[onboardingStep].subtitle}</Text>
                        </View>
                    </Animated.View>
                    <View style={styles.dots}>
                        {steps.map((_, index) => (
                            <View key={String(index)} style={[styles.dot, onboardingStep === index && styles.active]} />
                        ))}
                    </View>
                    <View style={styles.actions}>
                        <Button
                            value={isLastStep ? locale.submitStart : locale.submitNext}
                            onClick={nextStep}
                            style={isLastStep ? {} : styles.btn}
                            secondary={!isLastStep}
                        />
                    </View>
                    <Text style={styles.privacyPoliceDescription}>
                        {`${locale.describePrivacyPolice} `}
                        <Text
                            style={styles.privacyPolice}
                            onPress={() => {
                                Config?.PRIVACY_POLICY && Linking.openURL(Config.PRIVACY_POLICY);
                            }}>
                            {locale.privacyPolice}
                        </Text>
                    </Text>
                </View>
            </View>
        </MainLayout>
    );
};

export default observer(OnboardingScreen);
