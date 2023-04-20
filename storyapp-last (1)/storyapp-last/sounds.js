// sounds.js

import { Audio } from 'expo-av';

const soundObjects = {
  click: require('./assets/sounds/tap.wav'),
  // Ajoutez d'autres sons ici
};

export const playSound = async (soundName) => {
  const sound = new Audio.Sound();
  try {
    await sound.loadAsync(soundObjects[soundName]);
    await sound.playAsync();
  } catch (error) {
    console.log('Erreur lors de la lecture du son :', error);
  }
};

