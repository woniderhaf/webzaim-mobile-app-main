import React from 'react';
import { Image } from 'react-native';
import { LoanLender } from '../../enums';
import styles from './styles';

const logoWebZaim = require('../../../../assets/images/logo-full.png');
const logoBeeon = require('../../../../assets/images/logo-beeon.png');

type LenderLogoProps = {
    lender: LoanLender;
};

const LenderLogo = ({ lender = LoanLender.WEBZAIM }: LenderLogoProps) => {
    const isBeeon = lender === LoanLender.BEEON;
    const logo = isBeeon ? logoBeeon : logoWebZaim;

    return (
        <Image
            source={logo}
            resizeMode="contain"
            style={[styles.logo, styles[lender]]}
        />
    );
};

export default LenderLogo;
