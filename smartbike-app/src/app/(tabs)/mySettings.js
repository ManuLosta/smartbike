import { View, Text, StyleSheet } from 'react-native';
import { MqttProvider } from '../../context/MqttContext';
import { StatusBar } from 'expo-status-bar';
import WeightSetter from '../../components/WeightSetter';

export default function Tab() {
    return (
        <MqttProvider>
            <View style= { styles.container } >
                <WeightSetter />
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