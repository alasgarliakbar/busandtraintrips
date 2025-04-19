import { Stack, Redirect } from 'expo-router';

export default function Home() {
  // Redirect to the tabs home page
  return <Redirect href="/(tabs)" />;
}