import { Heart } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-2 font-bold font-headline ${className}`}>
    <Heart className="h-6 w-6 text-primary" />
    <span className="text-primary">
        SD Connect
    </span>
  </div>
);
