import { Stack } from 'expo-router';
import { FarmProvider } from '../context/FarmContext';

export default function RootLayout() {
  return (
    <FarmProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </FarmProvider>
  );
}