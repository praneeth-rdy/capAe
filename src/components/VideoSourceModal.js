import React, { useState, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import { allRecordsRoute, getMediaRoutesById } from '../apiService';
import Styles from '../styles/components/VideoSourceModal';


function VideoSourceModal({ visible, closeModal }) {

    const pickVideoFile = () => {
        console.log("Picking")
    }

    const openCamera = () => {
        console.log("Opening cam")
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            style={Styles.modal}
            onRequestClose={closeModal}
        >
            <Pressable style={Styles.modalBackground} onPress={closeModal}>
                <Pressable style={Styles.modalContent} onPress={() => {}}>
                    <Text style={Styles.modalHeader}>
                        Select a video
                    </Text>
                    <View style={Styles.modalBody}>
                        <TouchableOpacity activeOpacity={0.6} onPress={openCamera}>
                            <Text style={Styles.videoSourceItem}>
                                Camera
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={pickVideoFile}>
                            <Text style={Styles.videoSourceItem}>
                                Gallery
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default VideoSourceModal;