import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface GearImageGalleryProps {
  imageURL: string;
  title: string;
  stock: number;
}

export const GearImageGallery = ({ imageURL, title, stock }: GearImageGalleryProps) => {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <Image
        src={imageURL}
        alt={title}
        fill
        priority
        className="object-cover transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
      />
      {/* Stock Status Badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge 
          variant={stock > 0 ? "default" : "destructive"} 
          className="text-xs px-3 py-1 font-semibold rounded-full shadow-md"
        >
          {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
        </Badge>
      </div>
    </div>
  );
};