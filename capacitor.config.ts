import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'be.vanberlo.jonas.fantasyfootball',
  appName: 'FantasyFootball',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duur in milliseconden
      launchAutoHide: true, // Automatisch verbergen na de duur
      backgroundColor: 'rgba(128,208,10,0.95)', // Achtergrondkleur van de splash screen
      androidSplashResourceName: 'splash', // Naam van de splash resource
      showSpinner: true, // Toon een spinner (optioneel)
      androidSpinnerStyle: 'large', // Stijl van de spinner op Android
      iosSpinnerStyle: 'small', // Stijl van de spinner op iOS
      spinnerColor: '#999999' // Kleur van de spinner
    }
  }
};

export default config;
