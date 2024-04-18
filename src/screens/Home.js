import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import axios from 'axios';
import Styles from '../styles/screens/Home';
import PastRecords from '../components/PastRecords';

function Home() {
    const [errText, setErrText] = useState('');

    const pickVideoFile = () => {
        console.log("Picking a new file");
    }

    const handleSubmit = () => {
        console.log("Submitting your response");
    }

    return (
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
            <PastRecords />
        </ScrollView>
    )
}

export default Home;