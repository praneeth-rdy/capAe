import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNFS from 'react-native-fs';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

import Styles from '../styles/screens/Recorder';

function Recorder() {
    const camera = useRef(null);
    const [isRecording, setIsRecording] = useState(false);

    // const pictureDirectory = 'CapAe';

    const devices = useCameraDevices();
    const device = devices.back;

    const onInitialized = () => {
        console.log("Initialised");
    }

    const onError = (e) => {
        console.log("Error", e);
    }
    const onRecordingFinished = async (video) => {
        try {
            // await RNFS.mkdir(pictureDirectory);
            const filename = video.path.split('/').pop();
            console.log(`${RNFS.DownloadDirectoryPath}/${filename}`);
            await RNFS.moveFile(video.path, `${RNFS.DownloadDirectoryPath}/${filename}`);
            // console.log(video);
            console.log("Video Saved");
        } catch (error) {
            console.log(error);
        }
    }
    const toggleVideoRecording = () => {
        console.log('toggle');
        if (isRecording) {
            camera.current.stopRecording();
            setIsRecording(false);
        } else {
            camera.current.startRecording({
                // flash: 'on',
                onRecordingFinished,
                onRecordingError: onError,
            });
            setIsRecording(true);
        }
    }

    if (device == null) return <View />
    return (
        <View style={Styles.container}>
            <Camera
                ref={camera}
                // style={StyleSheet.absoluteFill}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                video={true}
                // audio={true}
                onInitialized={onInitialized}
                onError={onError}
            />
            <Pressable onPress={toggleVideoRecording} style={[Styles.captureButton, Styles[`captureButton${isRecording?'Active':'Inactive'}`]]} />
        </View>
    )
}

export default Recorder;