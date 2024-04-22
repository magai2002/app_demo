// App.js
import React from 'react';
import { StyleSheet, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RecordingButton from './components/RecordingButton';
import CameraComponent from './components/CameraComponent';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <CameraComponent/>
        <View style={styles.footerContainer}>
            <RecordingButton/>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
  },
  footerContainer: {
    flex: 1 / 4,
    alignItems: 'center',
  },
});