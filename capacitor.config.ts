
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2ac92cb0e998418ba3c3c872255db881',
  appName: 'vitality-vista-view',
  webDir: 'dist',
  server: {
    url: 'https://2ac92cb0-e998-418b-a3c3-c872255db881.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    },
    StatusBar: {
      style: 'LIGHT_CONTENT',
      backgroundColor: '#ffffff'
    }
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
