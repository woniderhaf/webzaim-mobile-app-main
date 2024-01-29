import React from 'react';
import { observer } from 'mobx-react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoansStackParamList, ROUTES } from '../../../navigation';
import UserLoansScreen from './user-loans';
import LoanScreen from './loan';
import LoanInfoScreen from './loan-info';
import LoanDocumentsScreen from './loan-documents';
import LoanProlongationScreen from './loan-prolongation';
import LoanPaymentMethodScreen from './loan-payment-method';
import LoanPaymentSumScreen from './loan-payment-sum';
import LoanRequestDocumentsScreen from './loan-request-documents';
import LoanRequestMoneyTransferScreen from './loan-request-money-transfer';
import LoanRequestMoneyTransferAddScreen from './loan-request-money-transfer-add';
import LoanRequestAddBankScreen from './loan-request-add-bank';
import PassportScanScreen from './passport-scan';

const LoansStack = createNativeStackNavigator<LoansStackParamList>();

const LoansScreen = () => {
    return (
        <LoansStack.Navigator screenOptions={{ headerShown: false }}>
            <LoansStack.Screen name={ROUTES.USER_LOANS} component={UserLoansScreen} />
            <LoansStack.Screen name={ROUTES.LOAN} component={LoanScreen} />
            <LoansStack.Screen name={ROUTES.LOAN_DOCUMENTS} component={LoanDocumentsScreen} />
            <LoansStack.Screen name={ROUTES.LOAN_INFO} component={LoanInfoScreen} />
            <LoansStack.Screen name={ROUTES.LOAN_PROLONGATION} component={LoanProlongationScreen} />
            <LoansStack.Screen name={ROUTES.LOAN_PAYMENT_METHOD} component={LoanPaymentMethodScreen} />
            <LoansStack.Screen name={ROUTES.LOAN_PAYMENT_SUM} component={LoanPaymentSumScreen} />
            <LoansStack.Screen name={ROUTES.LOAN_REQUEST_MONEY_TRANSFER} component={LoanRequestMoneyTransferScreen} />
            <LoansStack.Screen
                name={ROUTES.LOAN_REQUEST_MONEY_TRANSFER_ADD}
                component={LoanRequestMoneyTransferAddScreen}
           />
            <LoansStack.Screen name={ROUTES.LOAN_REQUEST_ADD_BANK} component={LoanRequestAddBankScreen} />
            <LoansStack.Screen name={ROUTES.LOAN_REQUEST_DOCUMENTS} component={LoanRequestDocumentsScreen} />
            <LoansStack.Screen name={ROUTES.PASSPORT_SCAN} component={PassportScanScreen} />
        </LoansStack.Navigator>
    );
};

export default observer(LoansScreen);
