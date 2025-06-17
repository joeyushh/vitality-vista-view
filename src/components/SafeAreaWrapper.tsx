
import { ReactNode } from 'react';

interface SafeAreaWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function SafeAreaWrapper({ children, className = '' }: SafeAreaWrapperProps) {
  return (
    <div className={`safe-area-wrapper ${className}`} style={{
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)',
    }}>
      {children}
    </div>
  );
}
