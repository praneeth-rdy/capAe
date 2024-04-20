import { StyleSheet } from 'react-native';
import DesignParams from '../DesignParams';

const Styles = StyleSheet.create({
    modal: {
        width: '100%',
        height: '100%',
    },
    modalBackground: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        minWidth: 260,
        maxWidth: '100%',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    modalHeader: {
        fontSize: 16,
        fontWeight: 600,
        color: '#333D47'
    },
    modalBody: {
        padding: 5,
    },
    videoSourceItem: {
        paddingVertical: 6,
    },

});

export default Styles;
