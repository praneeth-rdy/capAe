import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import axios from 'axios';
import Styles from '../styles/screens/Home';
import PastRecords from '../components/PastRecords';
import VideoSourceModal from '../components/VideoSourceModal';

function Home() {
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

    const handleSubmit = () => {
        if(!video || !projectName) {
            return;
        }
        if(!video.videoUri) {
            return;
        }
        console.log("Submitting your response");
    }

    return (
        <>
            <VideoSourceModal
                visible={isVideoSourceModalActive}
                closeModal={closeVideoSourceModal}
                setVideo={setVideo} />
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