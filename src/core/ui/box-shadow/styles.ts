import { StyleSheet } from 'react-native';
import { shadow } from '../../../styles/common';

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 14,
        ...shadow( '#B1B1B1', 0, 4, 0.25, 8)
    }
});
