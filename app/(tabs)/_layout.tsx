import { SplashScreen, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreenComponent from '@/components/SplashScreenComponent';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulate loading of assets (optional)
    async function prepare() {
      try {
        // Simulate a delay (e.g., loading images)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true); // Resources are loaded, app is ready
        await SplashScreen.hideAsync(); // Hide splash screen
      }
    }

    prepare(); // Start the resource loading
  }, []);

  if (!isAppReady) {
    // If the app is not ready, show the SplashScreen component
    return <SplashScreenComponent />;
  }

  return (
    <Tabs
        screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      
      {/* <Tabs.Screen
        name="Dashboard"
        options={{
          title: 'Personal Info.',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="Signout"
        options={{
          title: 'Sign Out',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'log-out' : 'log-out-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );

}
