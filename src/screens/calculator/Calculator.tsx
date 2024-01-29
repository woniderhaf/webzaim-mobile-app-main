import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import addMinutes from 'date-fns/addMinutes';
import { Slider } from '@miblanchard/react-native-slider';
import MainLayout from '../../core/layouts/main-layout';
import { useRootStore } from '../../store';
import { RootStackScreenProps, ROUTES } from '../../navigation';
import { Button, Icon } from '../../core/ui';
import { amountFormat, daysFormat } from '../../core/utils';
import locale from './locale';
import styles from './styles';

const slide = require('../../core/ui/icons/images/arrows-horisontal.png');

// https://board.mheads.ru/browse/WZ-80
// ¯\_(ツ)_/¯ Попросили захардкодить максимальное количество дней
const LOAN_MAX_DAYS = 62;

// https://board.mheads.ru/browse/WZ-124
// ¯\_(ツ)_/¯ Хардкод ссылки на документ по акции 0%
const PERCENT_URL: string = 'https://web-zaim.ru/filedata/web-zaim/fileadmin/docs/akcia_nol_procentov_na_pervy_zaim.pdf';

const defaultZaim = {
    min: 3000,
    max: 30000,
    days: LOAN_MAX_DAYS,
    endTime: addDays(new Date(), LOAN_MAX_DAYS)
};

const CalculatorScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<RootStackScreenProps<ROUTES.CALCULATOR>['navigation']>();
    const { calculator } = useRootStore();
    const [sum, setSum] = useState(16000);
    const [zaim, setZaim] = useState(defaultZaim);
    const [loanTime, setLoanTime] = useState(addMinutes(Date.now(), 15));

    useEffect(() => {
        let $zaim = defaultZaim;

        if (calculator) {
            $zaim = {
                min: calculator.loanSize.min,
                max: calculator.loanSize.max,
                days: LOAN_MAX_DAYS,
                endTime: addDays(Date.now(), LOAN_MAX_DAYS)
            };

            setSum(calculator.loanSize.initial);
        }

        setZaim($zaim);

        const timeout = setInterval(updateTime, 5 * 1000);

        return () => {
            clearInterval(timeout);
        };
    }, []);

    const goToRegistration = () => {
        navigation.navigate(ROUTES.REGISTRATION_VARIANTS);
    };

    const goToLogin = () => {
        navigation.navigate(ROUTES.LOGIN);
    };

    const onPercentHelp = () => {
        navigation.navigate(ROUTES.DOCUMENT, {
            url: PERCENT_URL
        });
    };

    const renderThumbComponent = () => {
        return (
            <View style={styles.sliderThumb}>
                <Image source={slide} />
            </View>
        );
    };

    const updateTime = () => {
        let nextTime = addMinutes(Date.now(), 15);

        setLoanTime(nextTime);
    };

    return (
        <MainLayout
            contrast
            theme="blue"
            header={{
                title: locale.screenTitle
            }}
        >
            <View style={[styles.container, { paddingBottom: insets.bottom + 28 }]}>
                <View>
                    <View  style={styles.pseudoHead} />
                    <View style={styles.sumSlider}>
                        <View style={styles.sumSliderShadow}>
                            <View style={styles.sumSliderShadowLeft} />
                            <View style={styles.sumSliderShadowRight} />
                        </View>
                        <View style={styles.sumSliderBody}>
                            <View style={styles.sumSliderTitle}>
                                <Text style={styles.sumSliderLabel}>{locale.slider.title}</Text>
                            </View>
                            <View style={styles.sumSliderAmount}>
                                <Text style={styles.amount}>{`${amountFormat(zaim.min)} `}</Text>
                                <Text style={styles.currentSum}>{amountFormat(sum, true)}</Text>
                                <Text style={styles.amount}>{amountFormat(zaim.max)}</Text>
                            </View>
                            <View style={styles.sumSliderContainer}>
                                <Slider
                                    value={sum}
                                    minimumValue={zaim.min}
                                    maximumValue={zaim.max}
                                    renderThumbComponent={renderThumbComponent}
                                    maximumTrackTintColor="none"
                                    minimumTrackTintColor="#00E5B9"
                                    step={calculator?.loanSize.step || 1000}
                                    trackStyle={{ height: 4, borderRadius: 0 }}
                                    onValueChange={(value) => { setSum(Number(value)); }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.zaim}>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>{locale.slider.sum}</Text>
                            </View>
                            <View>
                                <Text style={styles.value}>{amountFormat(sum, true)}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>{locale.slider.period}</Text>
                            </View>
                            <View>
                                <Text style={styles.value}>{daysFormat(zaim.days)}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.label}>{locale.slider.endDate}</Text>
                            </View>
                            <View>
                                <Text style={styles.value}>{format(zaim.endTime, 'dd.MM.yyyy')}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{locale.slider.percent}</Text>
                                <TouchableOpacity onPress={onPercentHelp}>
                                    <Icon name="question" size={18} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.value}>{locale.slider.percentValue}</Text>
                            </View>
                        </View>
                        <View style={styles.rightNow}>
                            <Icon name="clock" size={16} />
                            <Text style={styles.rightNowText}>
                                {`${locale.slider.startDate} ${format(loanTime, 'HH:mm')}`}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.actions}>
                    <Button value={locale.submit} onClick={goToRegistration} />
                    <Button value={locale.login} onClick={goToLogin} secondary style={styles.button} />
                </View>
            </View>
        </MainLayout>
    );
};

export default observer(CalculatorScreen);
