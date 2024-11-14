import { Shield, Lock, CheckCircle } from 'lucide-react';

export function SecurityBanner() {
  return (
    <div className="bg-indigo-600 text-white text-xs md:text-sm py-2">
      <div className="container mx-auto px-4 flex items-center justify-center text-center space-x-4">
        <div className="flex items-center">
          <Shield className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">SOC2 Type II</span>
        </div>
        <div className="flex items-center">
          <Lock className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">256-bit Encryption</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">GDPR Compliant</span>
        </div>
      </div>
    </div>
  );
}