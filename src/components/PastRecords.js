import React, { useState, useEffect, forwardRef } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, Linking, ActivityIndicator } from 'react-native';

import axios from 'axios';

import { allRecordsRoute, getBaseUrl } from '../utils/apiService';
import Styles from '../styles/components/PastRecords';
import RecordTile from './RecordTile';


const PastRecords = forwardRef((props, ref) => {

    const [pastRecordsData, setPastRecordsData] = useState([
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

    const fetchRecords = async () => {
        setLoading(true);
        // console.log(`${baseUrl}/api/v1/parsed-videos`)
        const baseUrl = await getBaseUrl();
        axios.get(`${baseUrl}${allRecordsRoute}`)
            .then(({ data: response }) => {
                // console.log(response);
                setPastRecordsData(response.data);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }

    React.useImperativeHandle(
      ref,
      () => ({
        fetchRecords
      }));

    return (
        <View style={Styles.recordsContainer}>
            <View style={Styles.recordsHeadingContainer}>
                <Text style={Styles.recordsHeadingText}>
                    Past uploads
                </Text>
            </View>
            {
                loading ? (
                    <View>
                        <ActivityIndicator
                        color={'#0065C1'}
                        size={25}/>
                    </View>
                ) : (
                    pastRecordsData.map((item, index) => (
                        <RecordTile
                            key={index}
                            recordData={item}
                        />
                    ))
                )
            }
        </View>
    )
});

export default PastRecords;