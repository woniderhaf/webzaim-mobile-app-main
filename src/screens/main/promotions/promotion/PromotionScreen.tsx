import React, { useCallback, useMemo, useState } from 'react';
import { Share, Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import MainLayout from '../../../../core/layouts/main-layout';
import ScrollViewLayout from '../../../../core/layouts/scroll-view-layout';
import { PromotionsStackScreenProps, ROUTES } from '../../../../navigation';
import { useCommonStore, useUIStore, useUserStore } from '../../../../store';
import { LoanRequestButton, PostImage } from '../../../../core/components';
import { Button, Icon, Input } from '../../../../core/ui';
import locale from './locale';
import styles from './styles';

/**
 * Специальная акция для которой дополнительно подгружается
 * referral ссылка и отображается input с возможностью скопировать в буфер
 * */
const SPECIAL_PROMO = 'privedi_druga';
const SHARE_MESSAGES = 'Займ 30 000 рублей по ставке 0%! Решение за 3 минуты. Заполни анкету по ссылке';

const PromotionScreen = () => {
    const route = useRoute<PromotionsStackScreenProps<ROUTES.PROMOTION>['route']>();
    const { id } = route.params;
    const { promotion, fetchPromotion, setPromotion } = useCommonStore();
    const { referralLink, fetchReferralLink } = useUserStore();
    const { loading } = useUIStore();
    const [copied, setCopied] = useState(false);

    const isSpecialPromo = useMemo(() => id === SPECIAL_PROMO, [id]);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                await fetchPromotion(id);

                if (isSpecialPromo && !referralLink) {
                    await fetchReferralLink();
                }
            })();

            return () => {
                setPromotion(null);
                setCopied(false);
            };
        }, [id, isSpecialPromo, referralLink])
    );

    const copyToClipboard = useCallback(() => {
        Clipboard.setString(referralLink);
        setCopied(!copied);
    }, [copied, referralLink]);

    const renderCopyButton = useMemo(() => {
        return (
            <TouchableOpacity
                disabled={copied}
                onPress={copyToClipboard}
                hitSlop={{ top: 6, left: 6, right: 6, bottom: 6 }}>
                <Icon name={copied ? 'check' : 'copy'} size={24} />
            </TouchableOpacity>
        );
    }, [copied, copyToClipboard]);

    const renderContent = useMemo(() => {
        if (!promotion) {
            return null;
        }

        return (
            <View style={styles.container}>
                {promotion.image && (
                    <PostImage
                        url={promotion.image.url}
                        height={promotion.image.height}
                        width={promotion.image.height}
                    />
                )}
                <Text style={styles.title}>{promotion.title}</Text>
                {Boolean(isSpecialPromo && referralLink) && (
                    <View style={styles.referralContainer}>
                        <Input
                            label={locale.referralLabel}
                            onChange={() => {}}
                            value={referralLink}
                            postfix={renderCopyButton}
                            readOnly
                        />
                        <Button
                            value="Поделиться"
                            onClick={async () => {
                                await Share.share({
                                    message: `${SHARE_MESSAGES} ${referralLink}`
                                });
                            }}
                        />
                    </View>
                )}
                <Text style={styles.text}>{promotion.teaser}</Text>
                {!isSpecialPromo && <LoanRequestButton />}
            </View>
        );
    }, [promotion, isSpecialPromo, referralLink, copied]);

    return (
        <MainLayout
            theme="gray"
            loading={loading}
            header={{
                title: locale.screenTitle,
                backButtonShow: true
            }}>
            <ScrollViewLayout hasTabbar>{!loading && renderContent}</ScrollViewLayout>
        </MainLayout>
    );
};

export default observer(PromotionScreen);
