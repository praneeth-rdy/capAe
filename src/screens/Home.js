import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView, Linking, TextInput } from 'react-native';
import axios from 'axios';
import Styles from '../styles/screens/Home';
import { allRecordsRoute, getMediaRoutesById } from '../apiService';

function Home() {
    const [previousRecords, setPreviousRecords] = useState([
        {
            '_id': '661fb1d7f18f3fd54bc065cd',
            name: 'Flying wing',
            status: 'in-process',
            runtime: '6 minutes 30 seconds',
            createdAt: '2024-04-17T11:26:15.851000',
        },
        {
            '_id': '661fb1d7f18f3fd54bc065cd',
            name: 'Labelled papers 1',
            status: 'done',
            runtime: '5 minutes 10 seconds',
            createdAt: '2024-04-12T11:26:15.851000',
        },
        {
            '_id': '661fb1d7f18f3fd54bc065cd',
            name: 'labelled papers 2',
            status: 'error',
            runtime: '2 minutes 12 seconds',
            createdAt: '2024-04-10T11:26:15.851000',
        },
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecords();
    }, [])

    const fetchRecords = () => {
        setLoading(true);
        // console.log(`${baseUrl}/api/v1/parsed-videos`)
        axios.get(allRecordsRoute)
            .then(({ data: response }) => {
                console.log(response);
                setPreviousRecords(response.data);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }

    const getStatusText = (item) => {
        switch (item.status) {
            case 'in-process':
                return 'In process';
            case 'done':
                return 'Done';
            default:
                return 'Error';
        }
    }

    const formatTimeInstance = (dateString) => {
        const date = new Date(dateString);

        const options = {
            // weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata' // Indian Standard Time
        };

        // Format the date string
        const formattedDateTime = date.toLocaleString('en-IN', options);

        return formattedDateTime;
    }

    const pickVideoFile = () => {
        console.log("Picking a new file");
    }

    const handleSubmit = () => {
        console.log("Submitting your response");
    }

    return (
        <ScrollView style={Styles.mainContainer}>
            <View style={Styles.topActionContainer}>
                <View style={Styles.topAction}>
                    <Text style={Styles.topActionText}>
                        Upload a new video
                    </Text>
                </View>
                <View style={Styles.newVideoForm}>
                    <TextInput
                        style={Styles.textInput}
                        placeholder='Project name'
                    />
                    <Pressable style={Styles.filePicker} onPress={pickVideoFile}>
                        <Text style={Styles.filePickerText}>
                            Select a video
                        </Text>
                    </Pressable>
                    <Pressable style={Styles.formSubmitButton} onPress={handleSubmit}>
                        <Text style={Styles.formSubmitText}>
                            Submit
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View style={Styles.recordsContainer}>
                <View style={Styles.recordsHeadingContainer}>
                    <Text style={Styles.recordsHeadingText}>
                        Past uploads
                    </Text>
                </View>
                {
                    previousRecords.map((item, index) => {
                        let statusContainerStyle = null;
                        let statusTextStyle = null;
                        if (item.status === 'in-process') {
                            statusContainerStyle = Styles.inProcessState
                            statusTextStyle = Styles.inProcessStatusText
                        } else if (item.status === 'done') {
                            statusContainerStyle = Styles.doneState
                            statusTextStyle = Styles.doneStatusText
                        } else {
                            statusContainerStyle = Styles.errorState
                            statusTextStyle = Styles.errorStatusText
                        }

                        let mediaRoutes = getMediaRoutesById(item['_id']);
                        return (
                            <View key={index} style={Styles.record}>
                                <View style={Styles.recordHeader}>
                                    <Text style={Styles.recordTitle}>
                                        {item.name}
                                    </Text>
                                    <View style={[Styles.statusContainer, statusContainerStyle]}>
                                        <Text style={[Styles.statusText, statusTextStyle]}>
                                            {getStatusText(item)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={Styles.recordRuntimeContainer}>
                                    <Text style={Styles.recordRuntime}>
                                        Execution time: {item.runtime}
                                    </Text>
                                </View>
                                <View style={Styles.createdAtContainer}>
                                    <Text style={Styles.createdAtText}>
                                        Created on {formatTimeInstance(item.createdAt)}
                                    </Text>
                                </View>
                                <View style={Styles.bottomActionContainer}>
                                    <Pressable style={Styles.viewInputButton} onPress={() => (Linking.openURL(mediaRoutes.inputVideoRoute))}>
                                        <Text style={Styles.viewInputButtonText}>
                                            Input
                                        </Text>
                                    </Pressable>
                                    <Pressable style={Styles.viewOutputButton} onPress={() => (Linking.openURL(mediaRoutes.outputVideoRoute))}>
                                        <Text style={Styles.viewOutputButtonText}>
                                            Output
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default Home;