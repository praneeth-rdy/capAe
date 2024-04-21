import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import RNFS from 'react-native-fs'

import { getMediaRoutesById } from '../utils/apiService';
import { showToastShort } from '../utils/toast';
import Styles from '../styles/components/RecordTile';


function RecordTile({ recordData }) {

    let statusContainerStyle = null;
    let statusTextStyle = null;
    if (recordData.status === 'in-process') {
        statusContainerStyle = Styles.inProcessState
        statusTextStyle = Styles.inProcessStatusText
    } else if (recordData.status === 'done') {
        statusContainerStyle = Styles.doneState
        statusTextStyle = Styles.doneStatusText
    } else {
        statusContainerStyle = Styles.errorState
        statusTextStyle = Styles.errorStatusText
    }

    const getStatusText = () => {
        switch (recordData.status) {
            case 'in-process':
                return 'In process';
            case 'done':
                return 'Done';
            default:
                return 'Error';
        }
    }

    const downloadVideo = (url, video_type) => {
        const timestamp = new Date().getTime(); // Get current timestamp
        const videoFilename = `${video_type}_video_${timestamp}.mp4`; // Create unique filename with timestamp

        const downloadDest = `${RNFS.DownloadDirectoryPath}/${videoFilename}`;

        console.log(url);

        showToastShort('Downloading the file...');

        RNFS.downloadFile({
            fromUrl: url,
            toFile: downloadDest,
            // progress: (res) => {
            //     // Handle download progress updates if needed
            //     const progress = (res.bytesWritten / res.contentLength) * 100;
            //     console.log(`Progress: ${progress.toFixed(2)}%`);
            // },
        }).promise.then((response) => {
            showToastShort('File downloaded!')
            console.log('File downloaded!', response, downloadDest);
        }).catch((err) => {
            console.log('Download error:', err);
        });
    };


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

    const handleInputNavigation = async () => {
        const mediaRoutes = await getMediaRoutesById(recordData['_id']);
        switch (recordData.status) {
            case 'in-process':
                // Linking.openURL(mediaRoutes.inputVideoRoute)
                downloadVideo(mediaRoutes.inputVideoRoute, 'input');
                break;
            case 'done':
                // Linking.openURL(mediaRoutes.inputVideoRoute)
                downloadVideo(mediaRoutes.inputVideoRoute, 'input');
                break
            default:
                showToastShort('Cannot view input video of an error record');
                break
        }
    }

    const handleOutputNavigation = async () => {
        const mediaRoutes = await getMediaRoutesById(recordData['_id']);
        switch (recordData.status) {
            case 'in-process':
                showToastShort('Record is still in process');
                break;
            case 'done':
                downloadVideo(mediaRoutes.outputVideoRoute, 'output');
                // Linking.openURL(mediaRoutes.outputVideoRoute)
                break
            default:
                showToastShort('Cannot view output video of an error record');
                break
        }
    }

    return (
        <View style={Styles.record}>
            <View style={Styles.recordHeader}>
                <Text style={Styles.recordTitle}>
                    {recordData.name}
                </Text>
                <View style={[Styles.statusContainer, statusContainerStyle]}>
                    <Text style={[Styles.statusText, statusTextStyle]}>
                        {getStatusText()}
                    </Text>
                </View>
            </View>
            {recordData.runtime && (
                <View style={Styles.recordRuntimeContainer}>
                    <Text style={Styles.recordRuntime}>
                        Execution time: {recordData.runtime}
                    </Text>
                </View>
            )}
            <View style={Styles.createdAtContainer}>
                <Text style={Styles.createdAtText}>
                    Created on {formatTimeInstance(recordData.createdAt)}
                </Text>
            </View>
            <View style={Styles.bottomActionContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={Styles.viewInputButton}
                    onPress={handleInputNavigation}>
                    <Text style={Styles.viewInputButtonText}>
                        Input
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={Styles.viewOutputButton}
                    onPress={handleOutputNavigation}>
                    <Text style={Styles.viewOutputButtonText}>
                        Output
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RecordTile;