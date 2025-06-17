
import { useEffect, useState } from 'react';
import { CapacitorService } from '../services/capacitorService';

export function useMobileApp() {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<string>('web');
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    const initMobileApp = async () => {
      const native = CapacitorService.isNative();
      const platformName = CapacitorService.getPlatform();
      
      setIsNative(native);
      setPlatform(platformName);

      if (native) {
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
            // Handle back button - could navigate or minimize app
            if (window.history.length > 1) {
              window.history.back();
            }
          });
        }
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
    isAndroid: CapacitorService.isAndroid()
  };
}
