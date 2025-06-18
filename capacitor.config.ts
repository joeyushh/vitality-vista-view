
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2ac92cb0e998418ba3c3c872255db881',
  appName: 'Vitality Vista',
  webDir: 'dist',
  server: {
    url: 'https://2ac92cb0-e998-418b-a3c3-c872255db881.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      spinnerColor: '#007AFF'
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#ffffff'
    },
    Keyboard: {
      resize: 'ionic',
      resizeOnFullScreen: true
    }
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#ffffff',
    allowsLinkPreview: false,
    handleApplicationNotifications: false,
    preferredContentMode: 'mobile'
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#ffffff',
    webContentsDebuggingEnabled: false
  }
};

export default config;
