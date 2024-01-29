import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../navigation';

const CONFIRM = 0;

const IS_PRODUCTION = Config.ENV === 'production';

const useLog = () => {
    const navigation = useNavigation();
    const [secret, setSecret] = useState(0);
    const [secretConfirm, setSecretConfirm] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setSecretConfirm(false);
                setSecret(0);
            };
        }, [])
    );

    useEffect(() => {
        if (secretConfirm && !IS_PRODUCTION) {
            navigation.navigate(ROUTES.LOG);
        }
    }, [secret, secretConfirm]);

    const onPress = () => {
        if (IS_PRODUCTION) {
            return;
        }

        setSecret(secret + 1);
    };

    const onLongPress = () => {
        if (IS_PRODUCTION) {
            return;
        }

        if (secret === CONFIRM) {
            setSecretConfirm(true);
        }
    };

    return [onPress, onLongPress, IS_PRODUCTION] as const;
};

export default useLog;
