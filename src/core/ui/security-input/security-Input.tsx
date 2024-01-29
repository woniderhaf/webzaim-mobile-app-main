import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '../icons';
import Input, { InputProps } from '../input/Input';

interface SecurityInputProps extends InputProps {
    isHidePassword: boolean;
}

const SecurityInput = React.forwardRef((props: SecurityInputProps, ref) => {
    const { isHidePassword = true, ...otherProps } = props;
    const [passSecurity, setPassSecurity] = useState(isHidePassword);

    const renderPasswordPostfix = () => {
        return (
            <TouchableOpacity
                onPress={() => setPassSecurity(!passSecurity)}
                hitSlop={{ top: 6, left: 6, right: 6, bottom: 6 }}
            >
                <Icon name={passSecurity ? 'eye' : 'eyeBlue'} size={24} />
            </TouchableOpacity>
        );
    };

    return <Input ref={ref} {...otherProps} security={passSecurity} postfix={renderPasswordPostfix()} />;
});

export default SecurityInput;
