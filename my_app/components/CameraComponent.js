import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraComponent() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [cameraRef, setCameraRef] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraPerm = await Camera.requestCameraPermissionsAsync();
            console.log('Camera Permission Status:', cameraPerm.status); // Log permission status
            setHasCameraPermission(cameraPerm.status === 'granted');
        })();
    }, []);

    const captureImage = async () => {
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
            console.log('photo', photo);
            // Here you would proceed with the image processing and ChatGPT queries
        }
    };

    if (hasCameraPermission === null) {
        console.log("Requesting permissions...");
        return <View />;
    }
    if (hasCameraPermission === false) {
        console.log("No access to camera");
        return <Text>No access to camera</Text>;
    }

    // Include your camera view and other UI elements here
    return (
        <Camera style={styles.camera} type={cameraType} ref={ref => setCameraRef(ref)}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
                    <Text style={styles.captureButtonText}>Capture</Text>
                </TouchableOpacity>
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    camera: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000'
    },
    captureButtonText: {
        fontSize: 16,
        color: '#000'
    }
});
