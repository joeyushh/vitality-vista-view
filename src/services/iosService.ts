
export class IOSService {
  static isIOSApp(): boolean {
    return window.navigator.userAgent.includes('iPhone') || 
           window.navigator.userAgent.includes('iPad') ||
           (window as any).DeviceInfo?.platform === 'ios';
  }

  static async setupIOSOptimizations(): Promise<void> {
    if (!this.isIOSApp()) return;

    try {
      // Prevent bounce scrolling
      document.addEventListener('touchmove', (e) => {
        if ((e.target as Element).closest('.scrollable')) return;
        e.preventDefault();
      }, { passive: false });

      // Handle iOS keyboard
      this.setupKeyboardHandling();
      
      // Setup haptic feedback
      await this.setupHapticFeedback();
      
      // Configure status bar
      await this.configureStatusBar();
    } catch (error) {
      console.warn('iOS optimizations setup failed:', error);
    }
  }

  private static setupKeyboardHandling(): void {
    let viewportHeight = window.innerHeight;
    
    window.addEventListener('resize', () => {
      const currentHeight = window.innerHeight;
      const keyboardHeight = viewportHeight - currentHeight;
      
      if (keyboardHeight > 100) {
        document.body.classList.add('keyboard-open');
        document.documentElement.style.setProperty('--keyboard-height', `${keyboardHeight}px`);
      } else {
        document.body.classList.remove('keyboard-open');
        document.documentElement.style.setProperty('--keyboard-height', '0px');
      }
    });
  }

  private static async setupHapticFeedback(): Promise<void> {
    try {
      const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
      
      // Add haptic feedback to buttons
      document.addEventListener('touchstart', (e) => {
        const target = e.target as Element;
        if (target.closest('button, .touch-feedback')) {
          Haptics.impact({ style: ImpactStyle.Light });
        }
      });
    } catch (error) {
      console.warn('Haptic feedback setup failed:', error);
    }
  }

  private static async configureStatusBar(): Promise<void> {
    try {
      const { StatusBar, Style } = await import('@capacitor/status-bar');
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
    } catch (error) {
      console.warn('Status bar configuration failed:', error);
    }
  }

  static async handleAppState(): Promise<void> {
    try {
      const { App } = await import('@capacitor/app');
      
      App.addListener('appStateChange', ({ isActive }) => {
        if (isActive) {
          document.body.classList.add('app-active');
          document.body.classList.remove('app-background');
        } else {
          document.body.classList.add('app-background');
          document.body.classList.remove('app-active');
        }
      });
    } catch (error) {
      console.warn('App state handling setup failed:', error);
    }
  }
}
