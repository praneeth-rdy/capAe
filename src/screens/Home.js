import React, { useEffect, useState, useRef } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Styles from '../styles/screens/Home';
import PastRecords from '../components/PastRecords';
import VideoSourceModal from '../components/VideoSourceModal';
import { uploadVideoRoute } from '../apiService';

function Home() {
    const [errText, setErrText] = useState('');
    const [isVideoSourceModalActive, setIsVideoSourceModalActive] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [video, setVideo] = useState(null); // object should have name and uri props

    const pastRecordsRef = useRef(null);

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
            selectionLimit: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled picking video');
            } else if (response.error) {
                console.log('Error picking video:', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            } else {
                // console.log('Video picked:', response.assets[0]);
                setVideo(() => ({
                    name: response.assets[0].fileName,
                    uri: response.assets[0].uri,
                }))
            }
        });
    }
    const recordVideoFromCamera = () => {
        closeVideoSourceModal();
        const options = {
            mediaType: 'video',
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled picking video');
            } else if (response.error) {
                console.log('Error picking video:', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button:', response.customButton);
            } else {
                // console.log('Video picked:', response.assets[0]);
                setVideo(() => ({
                    name: 'new_video.mp4',
                    uri: response.assets[0].uri,
                }))
                // Handle the selected video URI here
            }
        });
    }


    const handleSubmit = () => {
        console.log(video, projectName)
        setErrText('');
        if (!video || !projectName) {
            setErrText('Please enter a project name and select a video.');
            return;
        }
        if (!video.uri) {
            setErrText('Please select a video.');
            return;
        }

        const formData = new FormData();
        formData.append('name', projectName);
        formData.append('video_file', {
            uri: video.uri,
            type: 'video/mp4', // Adjust the type according to your video format
            name: video.name,
        });

        console.log('before axios')

        axios.post(uploadVideoRoute, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log('Response:', response.data);
            // Reset form fields and state
        }).catch(error => {
            console.error('Error:', error);
            setErrText('Failed to submit. Please try again.');
        });
        setProjectName('');
        setVideo(null);
        setErrText('');
        setTimeout(() => {
            if (pastRecordsRef.current) {
                pastRecordsRef.current.fetchRecords();
            }
        }, 500);
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
                            defaultValue={projectName}
                            onChangeText={(text) => (setProjectName(text))}
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
                <PastRecords ref={pastRecordsRef} />
            </ScrollView >
        </>
    )
}

export default Home;