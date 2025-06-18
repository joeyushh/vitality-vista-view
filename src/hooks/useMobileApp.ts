
import { useEffect, useState } from 'react';
import { CapacitorService } from '../services/capacitorService';
import { IOSService } from '../services/iosService';

export function useMobileApp() {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<string>('web');
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMobileApp = async () => {
      try {
        const native = CapacitorService.isNative();
        const platformName = CapacitorService.getPlatform();
        
        setIsNative(native);
        setPlatform(platformName);

        if (native) {
          // Enhanced iOS setup
          if (CapacitorService.isIOS()) {
            await IOSService.setupIOSOptimizations();
            await IOSService.handleAppState();
          }

          // Set status bar style
          await CapacitorService.setStatusBarStyle('LIGHT');
          
          // Hide splash screen after app loads
          await CapacitorService.hideSplashScreen();
          
          // Get device info for fitness tracking context
          const info = await CapacitorService.getDeviceInfo();
          setDeviceInfo(info);

          // Handle Android back button
          if (CapacitorService.isAndroid()) {
            CapacitorService.addBackButtonListener(() => {
              if (window.history.length > 1) {
                window.history.back();
              }
            });
          }
        }
        
        setIsReady(true);
      } catch (error) {
        console.error('Mobile app initialization failed:', error);
        setIsReady(true);
      }
    };

    initMobileApp();

    return () => {
      if (CapacitorService.isAndroid()) {
        CapacitorService.removeBackButtonListener();
      }
    };
  }, []);

  return {
    isNative,
    platform,
    deviceInfo,
    isIOS: CapacitorService.isIOS(),
    isAndroid: CapacitorService.isAndroid(),
    isReady
  };
}
