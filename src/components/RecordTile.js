import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';

import { getMediaRoutesById } from '../apiService';
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

    const handleInputNavigation = () => {
        const mediaRoutes = getMediaRoutesById(recordData['_id']);
        switch (recordData.status) {
            case 'in-process':
                Linking.openURL(mediaRoutes.inputVideoRoute)
                break;
            case 'done':
                Linking.openURL(mediaRoutes.inputVideoRoute)
                break
            default:
                console.log("This record is in error state")
                break
        }
    }

    const handleOutputNavigation = () => {
        const mediaRoutes = getMediaRoutesById(recordData['_id']);
        switch (recordData.status) {
            case 'in-process':
                console.log("This record is still running")
                break;
            case 'done':
                Linking.openURL(mediaRoutes.outputVideoRoute)
                break
            default:
                console.log("This record is in error state")
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