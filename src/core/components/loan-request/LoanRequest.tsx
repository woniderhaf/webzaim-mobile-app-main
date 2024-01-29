import React, { useMemo, useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { observer } from 'mobx-react';
import { Slider } from '@miblanchard/react-native-slider';
import addDays from 'date-fns/addDays';
import { amountFormat, dateFormat, daysFormat } from '../../utils';
import { Button, Icon, SlideDown } from '../../ui';
import { IAddon, ILoanRequestConfig, ILoanRequestParams } from '../..';
import Addon from '../addon';
import { PromoCode } from '../../components';
import styles from './styles';

const CongratulationsBg = require('./images/congratulations-bg.png');

export type LoanRequestProps = {
    config: ILoanRequestConfig;
    onRequest: (data: ILoanRequestParams) => void;
    onOpenDescription: (name: string, text: string, docUrl?: string, docTitle?: string) => void;
    onOpenDocument: (url: string) => void;
    congratulations?: boolean;
};

export type AddonView = {
    extended: boolean;
    title: string;
    description: string;
    selected: boolean;
    onSelect: (value: boolean) => any;
    onPress?: () => any;
    icon: string;
    isGrace?: boolean;
};

const renderThumbComponent = () => {
    return <View style={styles.sliderThumb} />;
};

const LoanRequest = ({ config, onRequest, onOpenDescription, onOpenDocument, congratulations }: LoanRequestProps) => {
    const SumSlider = config.calculatorSettings.loanSize;
    const DaysSlider = config.calculatorSettings.loanTerm;
    const defaultSelectedAddons = config.addons.filter(addon => !config.loyaltyProgram && addon.isApplied);

    const [sum, setSum] = useState(SumSlider.initial);
    const [days, setDays] = useState(DaysSlider.initial);
    const [selectedAddons, setSelectedAddons] = useState(defaultSelectedAddons);
    const [graceSelected, setGraceSelected] = useState(defaultSelectedAddons.length > 0);
    const [promoCode, setPromoCode] = useState<string>();

    const percent = config.calculatorSettings.commissionTable[sum][days];

    const onSubmit = () => {
        onRequest({
            sum,
            days,
            grace: graceSelected,
            addons: selectedAddons.map(addon => addon.id),
            promoCode: promoCode
        });
    };

    const toggleSlectedAddons = (addon: IAddon) => {
        const selected = selectedAddons.find(({ id }) => id === addon.id);

        let next;

        if (selected) {
            next = selectedAddons.filter(item => item.id !== addon.id);
        } else {
            next = [...selectedAddons, addon];
        }

        setSelectedAddons(next);
    };

    const onAddonPress = (addon: IAddon) => {
        // @TODO
        // addon.documents[0] ¯\_(ツ)_/¯
        // и по дизайну одна кнопка
        // и по api то ли прозапас массив то ли скоро будет deprecated
        if (addon.hiddenDescription) {
            onOpenDescription(
                addon.displayName,
                addon.hiddenDescription,
                addon.documents[0].href,
                addon.documents[0].title
            );
        } else if (addon.documents[0].href) {
            onOpenDocument(addon.documents[0].href);
        }
    };

    const renderAddon = (addon: AddonView, index: number) => (
        <View key={JSON.stringify(addon)} style={[styles.addon, index === 0 && styles.first]}>
            <Addon {...addon} />
        </View>
    );

    const renderAddons = () => {
        const { addons = [], grace, loyaltyProgram } = config;

        if (!addons.length && !grace.enabled) {
            return null;
        }

        const $addons: Array<AddonView> = [];
        const $hiddenAddons: Array<AddonView> = [];

        if (grace?.enabled) {
            $addons.push({
                extended: !loyaltyProgram,
                title: `Первые ${daysFormat(grace.periodDays)} под 0%`,
                description: `0% за первые ${daysFormat(grace.periodDays)} пользования займом`,
                selected: graceSelected,
                onSelect: (value: boolean) => setGraceSelected(value),
                icon: 'giftcard',
                isGrace: true
            });
        }

        addons.forEach(addon => {
            const $addon = {
                extended: !loyaltyProgram,
                title: addon.displayName,
                description: addon.description,
                selected: selectedAddons.includes(addon),
                onSelect: () => toggleSlectedAddons(addon),
                onPress: () => onAddonPress(addon),
                icon: addon.id
            };

            if (addon.isHidden) {
                $hiddenAddons.push($addon);
            } else {
                $addons.push($addon);
            }
        });

        return (
            <View style={styles.addons}>
                <Text style={styles.addonsTitle}>{'Дополнительные услуги'}</Text>
                <View>
                    {$addons.map(renderAddon)}
                    {$hiddenAddons.length > 0 && (
                        <SlideDown label="Дополнительные услуги">{$hiddenAddons.map(renderAddon)}</SlideDown>
                    )}
                </View>
            </View>
        );
    };

    const renderCongratulations = useMemo(() => {
        /**
         * На регистрации выводим блок с поздравлениями
         * */
        if (!congratulations) {
            return null;
        }

        return (
            <View style={styles.congratulationsBlock}>
                <ImageBackground source={CongratulationsBg} resizeMode={'stretch'}>
                    <View style={styles.congratulationsBlockContent}>
                        <View style={styles.congratulationsIcon}>
                            <Icon name={'like'} size={16} />
                        </View>
                        <View>
                            <View>
                                <Text style={styles.congratulationsTitle}>{'Поздравляем, Ваша анкета одобрена'}</Text>
                            </View>
                            <View>
                                <Text style={styles.congratulationsSubtitle}>
                                    {'Подтвердите заявку и получите деньги!'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }, [congratulations]);

    const onAddPromoCode = (promo: string) => {
        setPromoCode(promo);
    };

    return (
        <View style={styles.loanRequest}>
            <View style={styles.slider}>
                {renderCongratulations}
                <View style={styles.sliderRow}>
                    <View>
                        <Text style={styles.label}>{'Требуемая сумма'}</Text>
                    </View>
                    <View>
                        <Text style={styles.value}>{amountFormat(sum, true)}</Text>
                    </View>
                </View>
                <View>
                    <Slider
                        value={sum}
                        minimumValue={SumSlider.min}
                        maximumValue={SumSlider.max}
                        renderThumbComponent={renderThumbComponent}
                        maximumTrackTintColor="#F3F4F8"
                        minimumTrackTintColor="#00E5B9"
                        step={SumSlider.step || 1000}
                        trackStyle={{ height: 5, borderRadius: 3 }}
                        onValueChange={value => {
                            setSum(Number(value));
                        }}
                    />
                </View>
                <View style={styles.sliderRow}>
                    <View>
                        <Text style={styles.hint}>{amountFormat(SumSlider.min)}</Text>
                    </View>
                    <View>
                        <Text style={styles.hint}>{amountFormat(SumSlider.max)}</Text>
                    </View>
                </View>
                <View style={[styles.sliderRow, { marginTop: 34 }]}>
                    <View>
                        <Text style={styles.label}>{'На срок'}</Text>
                    </View>
                    <View>
                        <Text style={styles.value}>{daysFormat(days)}</Text>
                    </View>
                </View>
                <View>
                    <Slider
                        value={days}
                        minimumValue={DaysSlider.min}
                        maximumValue={DaysSlider.max}
                        renderThumbComponent={renderThumbComponent}
                        maximumTrackTintColor="#F3F4F8"
                        minimumTrackTintColor="#00E5B9"
                        step={DaysSlider.step || 1}
                        trackStyle={{ height: 5, borderRadius: 3 }}
                        onValueChange={value => {
                            setDays(Number(value));
                        }}
                    />
                </View>
                <View style={styles.sliderRow}>
                    <View>
                        <Text style={styles.hint}>{DaysSlider.min}</Text>
                    </View>
                    <View>
                        <Text style={styles.hint}>{DaysSlider.max}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.total}>
                <View style={styles.totalRow}>
                    <View>
                        <Text style={styles.label}>{'Сумма займа:'}</Text>
                    </View>
                    <View>
                        <Text style={styles.totalValue}>{amountFormat(sum, true)}</Text>
                    </View>
                </View>
                <View style={styles.totalRow}>
                    <View>
                        <Text style={styles.label}>{'Срок займа:'}</Text>
                    </View>
                    <View>
                        <Text style={styles.totalValue}>{daysFormat(days)}</Text>
                    </View>
                </View>
                <View style={styles.totalRow}>
                    <View>
                        <Text style={styles.label}>{'Дата возврата:'}</Text>
                    </View>
                    <View>
                        <Text style={styles.totalValue}>{dateFormat(Number(addDays(Date.now(), days)), true)}</Text>
                    </View>
                </View>
                <View style={[styles.totalRow, styles.noM]}>
                    <View>
                        <Text style={styles.label}>{'Проценты:'}</Text>
                    </View>
                    <View>
                        <Text style={styles.totalValue}>{amountFormat(percent, true)}</Text>
                    </View>
                </View>
            </View>
            <PromoCode onSuccess={onAddPromoCode} />
            {renderAddons()}
            <Button value="Получить деньги" onClick={onSubmit} />
        </View>
    );
};

export default observer(LoanRequest);
