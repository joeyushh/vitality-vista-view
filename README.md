
# Vitality Vista - iOS Native Fitness App

A comprehensive fitness tracking application optimized for iOS devices, built with React, TypeScript, and Capacitor for native iOS performance.

## 🍎 iOS Native Features

- **Native iOS Experience**: Optimized for iPhone and iPad with native navigation patterns
- **Haptic Feedback**: Touch interactions with iOS haptic feedback
- **Safe Area Handling**: Full support for iPhone notches and Dynamic Island
- **iOS Keyboard**: Smart keyboard handling with automatic view adjustment
- **Status Bar Integration**: Seamless iOS status bar styling
- **App State Management**: Proper iOS background/foreground state handling
- **Performance Optimized**: Hash routing and iOS-specific optimizations

## 🚀 Quick Start for iOS Development

### Prerequisites
- Node.js & npm
- Xcode (for iOS development)
- iOS Simulator or physical iOS device
- Mac computer (required for iOS development)

### Development Setup

1. **Clone and Install**
   ```bash
   git clone <YOUR_GIT_URL>
   cd vitality-vista-view
   npm install
   ```

2. **Add iOS Platform**
   ```bash
   npx cap add ios
   ```

3. **Build and Sync**
   ```bash
   npm run build
   npx cap sync ios
   ```

4. **Run on iOS Simulator**
   ```bash
   npx cap run ios
   ```

### iOS-Specific Commands

- **Open in Xcode**: `npx cap open ios`
- **Sync iOS**: `npx cap sync ios`
- **Update iOS**: `npx cap update ios`
- **Copy Web Assets**: `npx cap copy ios`

## 📱 iOS App Configuration

The app is configured with:
- **App ID**: `app.lovable.2ac92cb0e998418ba3c3c872255db881`
- **App Name**: `Vitality Vista`
- **Bundle ID**: Matches App ID for iOS App Store
- **iOS Version**: Supports iOS 13.0+

## 🛠 Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Mobile Framework**: Capacitor 7
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: TanStack Query
- **Routing**: React Router (Hash-based for iOS)
- **Icons**: Lucide React
- **Charts**: Recharts

## 📋 iOS-Specific Plugins

- `@capacitor/app` - App lifecycle management
- `@capacitor/device` - Device information
- `@capacitor/status-bar` - iOS status bar control
- `@capacitor/splash-screen` - Launch screen management
- `@capacitor/haptics` - iOS haptic feedback
- `@capacitor/keyboard` - iOS keyboard handling

## 🎯 Core Features

### Dashboard
- Real-time fitness metrics
- Daily goals tracking
- Quick action buttons
- iOS-style pull-to-refresh

### Food Tracking
- Calorie and macro tracking
- Food search and logging
- Meal planning
- Nutritional insights

### Workout Management
- Exercise library
- Workout planning
- Progress tracking
- Strength training logs

### Progress Analytics
- Visual progress charts
- Historical data
- Goal achievements
- Performance metrics

### Rewards System
- Achievement badges
- Progress milestones
- Motivation system
- Credit-based goals

## 📱 iOS Development Workflow

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Sync with iOS
npx cap sync ios

# Run on iOS simulator
npx cap run ios
```

### iOS App Store Preparation
1. Update app icons in `ios/App/App/Assets.xcassets/`
2. Configure app metadata in Xcode
3. Set up provisioning profiles
4. Build for release in Xcode
5. Submit to App Store Connect

## 🔧 iOS Build Configuration

### Xcode Project Settings
- **Deployment Target**: iOS 13.0
- **Device Orientation**: Portrait (optimized)
- **Safe Area**: Full support
- **Background Modes**: Background app refresh
- **Privacy Permissions**: Camera, Health (if needed)

### Performance Optimizations
- Tree shaking enabled
- Code splitting for optimal bundle size
- iOS-specific CSS optimizations
- Hardware acceleration enabled
- Memory usage optimized

## 🐛 iOS Testing & Debugging

### Simulator Testing
```bash
# List available simulators
xcrun simctl list devices

# Boot specific simulator
xcrun simctl boot "iPhone 15 Pro"

# Run on specific simulator
npx cap run ios --target="iPhone 15 Pro"
```

### Physical Device Testing
1. Connect iOS device via USB
2. Enable Developer Mode on device
3. Trust computer in iOS Settings
4. Select device in Xcode and run

### Debug Console
- Safari Web Inspector (for web content)
- Xcode Console (for native logs)
- Chrome DevTools (during development)

## 📦 Deployment

### Development Deployment
The app includes live-reload functionality pointing to:
`https://2ac92cb0-e998-418b-a3c3-c872255db881.lovableproject.com`

### Production Deployment
1. Build production assets: `npm run build`
2. Remove server URL from `capacitor.config.ts`
3. Sync and build in Xcode
4. Archive and upload to App Store

## 🔗 Useful Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Xcode Documentation](https://developer.apple.com/xcode/)
- [iOS App Store Guidelines](https://developer.apple.com/app-store/guidelines/)

## 💡 iOS Best Practices

- Follow iOS Human Interface Guidelines
- Optimize for different screen sizes (iPhone/iPad)
- Use native iOS patterns and animations
- Handle app lifecycle events properly
- Implement proper error handling
- Test on multiple iOS versions
- Optimize for performance and battery life

## 🆘 Troubleshooting

### Common iOS Issues
- **Build Errors**: Run `npx cap sync ios` after changes
- **Simulator Issues**: Reset simulator or restart Xcode
- **Certificate Issues**: Check provisioning profiles in Xcode
- **Performance**: Enable hardware acceleration in simulator

### Getting Help
- Check the [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- Visit [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Read our [Mobile Development Guide](https://lovable.dev/blogs/TODO)

---

Built with ❤️ using Lovable for iOS native development
