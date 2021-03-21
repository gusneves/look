import React from 'react';
import Router from './src/routes'
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    Menlo: require('./assets/Menlo.ttf'),
  });
  
  if(!loaded){
    return null;
  }

  return (
    <Router/>
  );
}
