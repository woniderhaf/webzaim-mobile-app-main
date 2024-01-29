import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import MainLayout from '../../../../core/layouts/main-layout';
import { LoansScreenProps, ROUTES } from '../../../../navigation';
import { useLoanStore } from '../../../../store';
import { Button, Checkbox } from '../../../../core/ui';
import { amountFormat, dateFormat } from '../../../../core/utils';
import locale from './locale';
import styles from './styles';

type InfoGroupItem = {
    label: string;
    value: string;
    subtitle?: string;
};

type InfoGroup = {
    title: string;
    items: Array<InfoGroupItem>;
    footer?: boolean;
    checkbox?: {
        value: boolean;
        disabled?: boolean;
        onChange?: any;
    };
};

type InfoGroupList = Record<string, InfoGroup>;

const LoanInfoScreen = () => {
    const navigation = useNavigation<LoansScreenProps<ROUTES.LOAN_INFO>['navigation']>();
    const { activeLoan } = useLoanStore();
    const [groups, setGroups] = useState<InfoGroupList>();
    const [hasAddons, setHasAddons] = useState(false);
    const [selectedAddons, setSelectedAddons] = useState(true);

    useEffect(() => {
        if (activeLoan) {
            const { paymentInfo, loyaltyProgram } = activeLoan;
            const { addons, loanSize, interest, penalty, totalPayableToday, totalPayableOnMaturity, maturityDate } =
                paymentInfo;
            const $hasAddons = addons.length > 0;

            const $groups: InfoGroupList = {
                main: {
                    title: locale.mainGroupTitle,
                    items: [],
                    footer: true
                }
            };

            if (loyaltyProgram) {
                $groups.main.items = [
                    { label: locale.loanSize, value: amountFormat(loanSize, true) },
                    { label: locale.interest, value: amountFormat(interest, true) },
                    { label: locale.penalty, value: amountFormat(penalty, true) }
                ];

                if ($hasAddons) {
                    $groups.main.footer = false;
                    $groups.main.checkbox = {
                        value: true,
                        disabled: true
                    };

                    $groups.addons = {
                        title: locale.addonsGroupTitle,
                        items: addons.map(({ displayName, cost }) => ({
                            label: displayName,
                            value: amountFormat(cost, true)
                        })),
                        checkbox: {
                            value: selectedAddons,
                            onChange: setSelectedAddons
                        }
                    };
                }
            } else {
                $groups.main.items = [
                    {
                        label: locale.totalPayableToday,
                        value: amountFormat(totalPayableToday, true),
                        subtitle: dateFormat(Date.now(), true)
                    },
                    {
                        label: locale.totalPayableOnMaturity,
                        value: amountFormat(totalPayableOnMaturity, true),
                        subtitle: dateFormat(Number(maturityDate))
                    }
                ];
            }

            setHasAddons($hasAddons);
            setGroups($groups);
        }
    }, [activeLoan]);

    const getTotalSum = () => {
        if (activeLoan) {
            const {
                paymentInfo: { totalPayableToday, totalPayableTodayNoAddons },
                loyaltyProgram
            } = activeLoan;

            const sum =
                loyaltyProgram && hasAddons
                    ? selectedAddons
                        ? totalPayableToday
                        : totalPayableTodayNoAddons
                    : totalPayableToday;
            const includeAddons = loyaltyProgram && hasAddons && selectedAddons;

            return { sum: +sum, includeAddons: includeAddons };
        }

        return { sum: 0, includeAddons: false };
    };

    const onPayPress = () => {
        if (activeLoan) {
            navigation.navigate(ROUTES.LOAN_PAYMENT_METHOD, { ...getTotalSum() });
        }
    };

    const renderInfoRow = (item: InfoGroupItem, isOutline?: boolean) => {
        return (
            <View style={styles.previewRow} key={JSON.stringify(item)}>
                <View style={styles.previewLabelContainer}>
                    <Text style={styles.previewLabel} numberOfLines={2}>
                        {item.label}
                    </Text>
                    {item.subtitle && (
                        <Text style={[styles.previewLabel, isOutline && styles.previewLabelOutline]}>
                            {item.subtitle}
                        </Text>
                    )}
                </View>
                <View>
                    <Text style={[styles.previewValue, isOutline && styles.previewValueOutline]}>{item.value}</Text>
                </View>
            </View>
        );
    };

    const renderRowFooter = (isOutline?: boolean) => {
        const totalSum = getTotalSum().sum || 0;

        const footer: InfoGroupItem = {
            label: locale.totalSum,
            value: amountFormat(totalSum, true)
        };

        return renderInfoRow(footer, isOutline);
    };

    return (
        <MainLayout
            theme="gray"
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}
        >
            <ScrollViewLayout hasTabbar>
                {groups && (
                    <View>
                        {Object.values(groups).map(group => {
                            return (
                                <View style={styles.preview} key={group.title}>
                                    <View style={styles.previewRow}>
                                        <View style={styles.previewTitleContainer}>
                                            <Text style={styles.previewTitle} numberOfLines={2}>
                                                {group.title}
                                            </Text>
                                            {group.checkbox && (
                                                <Checkbox
                                                    value={group.checkbox.value}
                                                    disabled={group.checkbox.disabled}
                                                    onChange={group.checkbox.onChange}
                                                />
                                            )}
                                        </View>
                                    </View>
                                    {group.items.map(item => renderInfoRow(item))}
                                    {group.footer && <View style={styles.previewFooter}>{renderRowFooter()}</View>}
                                </View>
                            );
                        })}
                        {Boolean(hasAddons && activeLoan?.loyaltyProgram) && (
                            <View style={styles.previewFooterWithAddons}>{renderRowFooter(true)}</View>
                        )}
                    </View>
                )}
                <View>
                    <Button value={locale.payment} onClick={onPayPress} />
                </View>
            </ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(LoanInfoScreen);
