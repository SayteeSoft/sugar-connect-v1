import { Heart } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-2 text-2xl font-bold font-headline ${className}`}>
    <Heart className="h-8 w-8 text-primary" fill="currentColor" />
    <span>
        <span style={{ color: '#800080' }}>SD</span> Connect
    </span>
  </div>
);
