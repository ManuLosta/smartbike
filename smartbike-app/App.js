import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { MqttProvider } from './src/context/MqttContext';
import StartButton from './src/components/StartButton';
import RunningSessionScreen from './src/components/RunningSessionScreen';

export default function App() {
  return (
    <MqttProvider>
      <View style={styles.container}>
        <StartButton />
        <RunningSessionScreen />
        <StatusBar style="auto" />
      </View>
    </MqttProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
