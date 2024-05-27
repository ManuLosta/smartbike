import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarStyle: {
          paddingVertical: 10, // Adjusts the vertical padding of the tab bar
          height: 70, // Increases the height of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 14, // Adjust font size if needed
          marginTop: 5, // Adds space between the icon and the text
        },
        tabBarIconStyle: {
          marginBottom: -5, // Adjusts the position of the icon
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Live Session',
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="directions-bike" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="savedSessions"
        options={{
          title: 'Saved Sessions',
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="history" color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="mySettings"
            options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
                <AntDesign size={28} name="setting" color={color} />
            ),
            }}
        />
    </Tabs>
  );
}
