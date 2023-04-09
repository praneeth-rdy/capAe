import React from 'react';
import { View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

function Recorder() {
    const devices = useCameraDevices();
    const device = devices.back;

    if (device == null) return <View />
    return (
        <Camera
            // style={StyleSheet.absoluteFill}
            style={{ width: '100%', height: '100%' }}
            device={device}
            isActive={true}
        />
    )
}

export default Recorder;