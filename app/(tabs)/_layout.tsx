import React from 'react';
import { Stack, Stack as TabsStack } from 'expo-router';
import { TabProvider } from '../contexts/TabContext';

export default function TabsLayout() {
  return (
    <TabProvider>
      <TabsStack screenOptions={{ headerShown: false }}>
        <TabsStack.Screen name="auth" options={{ title: 'Authorization' }} />
        <TabsStack.Screen name="index" options={{ title: 'Home' }} />
        <TabsStack.Screen name="login" options={{ title: 'Login' }} />
        <TabsStack.Screen name="signupFstep" options={{ title: 'First Step' }} />
        <TabsStack.Screen name="signupSstep" options={{ title: 'Second Step' }} />
        <TabsStack.Screen name="signup" options={{ title: 'SignUp' }} />
        <TabsStack.Screen name="forgotPassword" options={{ title: 'Forgot Password' }} />


      </TabsStack>
    </TabProvider>
  );
}
