
import { Heart } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-2 font-extrabold font-headline ${className}`}>
    <Heart className="h-5 w-5 text-heart-icon fill-current" />
    <span className="text-primary text-xl">
        Sugar Connect
    </span>
  </div>
);
