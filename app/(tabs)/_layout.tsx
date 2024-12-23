import React from 'react';
import { Stack, Tabs, Stack as TabsStack } from 'expo-router';
import { TabProvider } from '../contexts/TabContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { UserProvider } from '../contexts/UserContext';

export default function TabsLayout() {
  return (
    <UserProvider>
      <TabProvider>
        <TabsStack screenOptions={{ headerShown: false }}>
          <TabsStack.Screen name="auth" options={{ title: 'Authorization' }} />
          <TabsStack.Screen name="index" options={{ title: 'Home' }} />
          <TabsStack.Screen name="login" options={{ title: 'Login' }} />
          <TabsStack.Screen name="signupFstep" options={{ title: 'First Step' }} />
          <TabsStack.Screen name="signupSstep" options={{ title: 'Second Step' }} />
          <TabsStack.Screen name="signup" options={{ title: 'SignUp' }} />
          <TabsStack.Screen name="forgotPassword" options={{ title: 'Forgot Password' }} />
          <Tabs.Screen name="SecurityScreen" options={{ tabBarIcon: () => <FontAwesome5 name="shield-alt" /> }}/>

        </TabsStack>
      </TabProvider>
    </UserProvider>
  );
}
