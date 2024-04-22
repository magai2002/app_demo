import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Audio } from 'expo-av';

export default function Button() {

    const [recording, setRecording] = useState();
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    async function startRecording() {
        try {
          if (permissionResponse.status !== 'granted') {
            console.log('Requesting permission..');
            await requestPermission();
          }
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
    
          console.log('Starting recording..');
          const { recording: newRecording } = await Audio.Recording.createAsync(
            Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecording(newRecording);
          console.log('Recording started');
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      }
    
      async function stopRecording() {
        console.log('Stopping recording..');
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        setRecording(undefined);
    }

    return (
    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={recording ? stopRecording : startRecording}>
            <Text style={styles.buttonLabel}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
        </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  buttonLabel: {
    color: '#000',
    fontSize: 16,
  },
});
