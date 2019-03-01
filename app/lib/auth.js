import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';

const getAccessToken = async () => {
    return RNSecureKeyStore.get('accessToken')
        .then((res) => {
            return res
        }, (err) => {
            return null
        });
};

const removeAccessToken = async () => {
    RNSecureKeyStore.remove('accessToken')
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
};

const storeAccessToken = async accessToken => {
    RNSecureKeyStore.set('accessToken', accessToken, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY }).then((res) => {
        console.log(res);
    }, (err) => {
        console.log(err);
    });
};

export { getAccessToken, storeAccessToken, removeAccessToken };
