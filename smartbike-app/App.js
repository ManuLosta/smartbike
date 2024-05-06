import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { MqttProvider } from './src/context/MqttContext';
import StartButton from './src/components/StartButton';

export default function App() {
  return (
    <MqttProvider>
      <View style={styles.container}>
        <StartButton />
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
