import React from 'react';
import { observer } from 'mobx-react';
import { Text, TouchableOpacity, View } from 'react-native';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import { ILoan } from '../..';
import useTimer from '../../hooks/useTimer';
import { amountFormat, dateFormat, daysFormat } from '../../utils';
import { LoanRequestStatus } from '../../enums';
import { Button, Icon } from '../../ui';
import LenderLogo from '../lender-logo';
import styles from './styles';

export type LoanPreviewProps = {
    loan: ILoan;
    onPress?: () => any;
    onPayPress?: () => any;
};

const LoanPreview = ({ loan, onPayPress, onPress }: LoanPreviewProps) => {
    const timer = useTimer(10);
    const isFail =
        loan.request.status === LoanRequestStatus.APPROVED && Number(loan?.paymentInfo?.daysUntilRepayment) < 0;
    const isPressable = Boolean(onPress);

    const getLoanStatus = (status: string) => {
        let title;
        //@ts-ignore
        let style = styles[status];

        switch (status) {
            case LoanRequestStatus.REJECTED:
                title = 'Не одобрено';
                break;
            case LoanRequestStatus.APPROVED:
                title = 'Активный займ';
                break;
            case LoanRequestStatus.PENDING_APPROVAL:
                title = 'На рассмотрении';
                break;
            case LoanRequestStatus.WAITING:
                title = 'Ожидает подтверждения';
                break;
        }

        if (isFail) {
            title = 'Просрочено';
            style = styles.rejected;
        }

        if (!title) {
            return null;
        }

        return (
            <View style={[styles.loanStatusContainer, style]}>
                <Text style={[styles.loanStatus, style]}>{title}</Text>
            </View>
        );
    };

    const getLoanSubtitle = (loan: ILoan) => {
        const {
            request: { status },
            cession
        } = loan;
        let subtitle;
        let info;
        let warning = false;
        let alert = false;

        if (cession && !isPressable) {
            subtitle = 'Уважаемый заемщик!';
            info = `Ваш долг был продан по договору цессии. В настоящий момент он принадлежит ${cession.assigneeName}. Вы можете оплатить свою задолженность в приложении.`;
            alert = true;
        } else if (isFail) {
            subtitle = `Просрочка ${daysFormat(Math.abs(Number(loan?.paymentInfo?.daysUntilRepayment)))}`;
            alert = true;
        } else {
            switch (status) {
                case LoanRequestStatus.WAITING:
                    subtitle = 'Ваша заявка не была подтверждена по SMS';
                    warning = true;
                    break;
                case LoanRequestStatus.REJECTED:
                    const nextDay = addDays(new Date().getTime(), loan.request.daysUntilNextRequest);
                    const nextDays = daysFormat(loan.request.daysUntilNextRequest);

                    subtitle = `Оформить новую заявку на получение займа Вы сможете ${format(
                        nextDay,
                        'dd.MM.yyyy'
                    )} (через ${nextDays})`;
                    break;
                case LoanRequestStatus.APPROVED:
                    const endDate = dateFormat(Number(loan.paymentInfo.maturityDate));

                    subtitle = `Займ требуется погасить до ${endDate}`;
                    break;
                case LoanRequestStatus.PENDING_APPROVAL:
                    subtitle = `Будет рассмотрена в течение ${timer}`;
                    break;
                default:
                    break;
            }
        }

        if (!subtitle) {
            return null;
        }

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flex: 1
                    // maxWidth: '80%'
                }}
            >
                {(warning || alert) && (
                    <View style={{ marginRight: 4, marginTop: 4 }}>
                        <Icon name={alert ? 'alert' : 'warningOrange'} size={20} />
                    </View>
                )}
                <View style={{ flex: 1 }}>
                    <Text style={[styles.subtitle, alert && styles.subtitleError, warning && styles.subtitleWarning]}>
                        {subtitle}
                    </Text>
                    {info && <Text style={[styles.subtitle]}>{info}</Text>}
                </View>
            </View>
        );
    };

    const renderFooter = () => {
        const { loanSize, totalPayableToday, maturityDate, requestedLoanSize } = loan.paymentInfo;
        const { status } = loan.request;
        const content = [];
        let label;
        let value;

        switch (status) {
            case LoanRequestStatus.APPROVED:
                label = 'Всего к оплате';
                value = amountFormat(totalPayableToday, true);

                content.push({ label, value });

                break;
            case LoanRequestStatus.PENDING_APPROVAL:
                label = 'Вы запрашиваете';
                value = amountFormat(loanSize || requestedLoanSize, true);

                content.push({ label, value });

                content.push({
                    label: 'Вернуть до',
                    value: `${dateFormat(Number(maturityDate))}`
                });

                break;
            case LoanRequestStatus.REJECTED:
            default:
                break;
        }

        if (content.length === 0) {
            return null;
        }

        return (
            <View style={styles.previewFooterContainer}>
                {content.map(({ label, value }, index) => {
                    return (
                        <View style={[styles.previewFooterRow, index > 0 && styles.previewFooterRowN]} key={label}>
                            <View>
                                <Text style={styles.subtitle}>{label}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>{value}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    };

    const renderPreview = () => {
        const content = (
            <>
                <View style={styles.previewHead}>
                    <View style={styles.loanInfo}>
                        <LenderLogo lender={loan.lender} />
                        {getLoanStatus(loan.request.status)}
                    </View>
                    <View>{isPressable && <Icon name="angleRight" size={24} />}</View>
                </View>
                <View style={[styles.previewBody, !renderFooter() && styles.previewBodyWithoutFooter]}>
                    <Text style={styles.title}>
                        {`Займ № ${loan.documentNumber} от ${dateFormat(Number(loan.documentDate))}`}
                    </Text>
                    {getLoanSubtitle(loan)}
                </View>
            </>
        );

        return isPressable ? <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity> : content;
    };

    return (
        <View style={styles.preview}>
            {renderPreview()}
            <View style={styles.previewFooter}>
                {renderFooter()}
                {onPayPress && (
                    <Button
                        value="Перейти к оплате"
                        onClick={onPayPress}
                        style={[styles.previewFooterBtn, (isFail && styles.previewFooterBtnError) || {}]}
                    />
                )}
            </View>
        </View>
    );
};

export default observer(LoanPreview);
