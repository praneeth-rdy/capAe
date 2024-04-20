import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Styles from '../styles/screens/Home';
import PastRecords from '../components/PastRecords';
import VideoSourceModal from '../components/VideoSourceModal';

function Home({ navigation, route }) {
    const [errText, setErrText] = useState('');
    const [isVideoSourceModalActive, setIsVideoSourceModalActive] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [video, setVideo] = useState(null);

    const openVideoSourceModal = () => {
        if (video) {
            console.log('Video is already selected');
            return;
        }
        setIsVideoSourceModalActive(true);
    }

    const closeVideoSourceModal = () => {
        setIsVideoSourceModalActive(false);
    }

    const resetVideo = () => {
        setVideo(null);
    }

    const pickVideoFromGallery = () => {
        closeVideoSourceModal();
        const options = {
            mediaType: 'video',
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled picking video');
            } else if (response.error) {
                console.log('Error picking video:', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            } else {
                console.log('Video picked:', response.assets[0]);
                // Handle the selected video URI here
            }
        });
    }
    const recordVideoFromCamera = () => {
        closeVideoSourceModal();
        navigation.navigate('Recorder');
    }



    // console.log('route', route)
    if (route?.params?.video) {
        // set video uri
        console.log(route.params)
    }


    const handleSubmit = () => {
        if (!video || !projectName) {
            return;
        }
        if (!video.videoUri) {
            return;
        }
        console.log("Submitting your response");
    }

    return (
        <>
            <VideoSourceModal
                visible={isVideoSourceModalActive}
                closeModal={closeVideoSourceModal}
                pickVideoFromGallery={pickVideoFromGallery}
                recordVideoFromCamera={recordVideoFromCamera} />
            <ScrollView style={Styles.mainContainer}>
                <View style={Styles.uploadSection}>
                    <View style={Styles.topAction}>
                        <Text style={Styles.topActionText}>
                            Upload a new video
                        </Text>
                    </View>
                    <View style={Styles.newVideoForm}>
                        {
                            errText && (
                                <Text style={Styles.errText}>
                                    {errText}
                                </Text>
                            )
                        }
                        <TextInput
                            style={Styles.textInput}
                            placeholder='Project name'
                        />
                        <Pressable style={Styles.filePicker} onPress={openVideoSourceModal}>
                            {
                                video ? (
                                    <View style={Styles.selectedVideoNameContainer}>
                                        <Text style={Styles.selectedVideoName}>
                                            {video.name}
                                        </Text>
                                        <Text style={Styles.resetVideoIcon} onPress={resetVideo}>
                                            x
                                        </Text>
                                    </View>
                                ) : (
                                    <Text style={Styles.filePickerText}>
                                        Select a video
                                    </Text>
                                )
                            }
                        </Pressable>
                        <Pressable style={Styles.formSubmitButton} onPress={handleSubmit}>
                            <Text style={Styles.formSubmitText}>
                                Submit
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <PastRecords />
            </ScrollView >
        </>
    )
}

export default Home;