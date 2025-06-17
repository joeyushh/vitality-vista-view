
import { Capacitor } from '@capacitor/core';

export class CapacitorService {
  static isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  static getPlatform(): string {
    return Capacitor.getPlatform();
  }

  static isIOS(): boolean {
    return Capacitor.getPlatform() === 'ios';
  }

  static isAndroid(): boolean {
    return Capacitor.getPlatform() === 'android';
  }

  static async addBackButtonListener(handler: () => void): Promise<void> {
    if (this.isAndroid()) {
      const { App } = await import('@capacitor/app');
      App.addListener('backButton', handler);
    }
  }

  static async removeBackButtonListener(): Promise<void> {
    if (this.isAndroid()) {
      const { App } = await import('@capacitor/app');
      App.removeAllListeners();
    }
  }

  static async getDeviceInfo() {
    if (this.isNative()) {
      const { Device } = await import('@capacitor/device');
      return await Device.getInfo();
    }
    return null;
  }

  static async setStatusBarStyle(style: 'LIGHT' | 'DARK' = 'LIGHT') {
    if (this.isNative()) {
      const { StatusBar } = await import('@capacitor/status-bar');
      await StatusBar.setStyle({ style });
    }
  }

  static async hideSplashScreen() {
    if (this.isNative()) {
      const { SplashScreen } = await import('@capacitor/splash-screen');
      await SplashScreen.hide();
    }
  }
}
