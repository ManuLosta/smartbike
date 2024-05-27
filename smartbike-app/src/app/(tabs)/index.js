import { View, Text, StyleSheet } from 'react-native';
import { MqttProvider } from '../../context/MqttContext';
import StartButton from '../../components/StartButton';
import RunningSessionScreen from '../../components/RunningSessionScreen';
import { StatusBar } from 'expo-status-bar';



export default function Tab() {
  return (
    <MqttProvider>
        <View style= { styles.container } >
        <StartButton />
        < RunningSessionScreen />
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
