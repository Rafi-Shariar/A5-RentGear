import Image from 'next/image';
import { ShieldCheck, MapPin, Phone, Mail, Tag } from 'lucide-react';

interface Provider {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  photoURL: string;
}

interface GearInfoSectionProps {
  brand: string;
  title: string;
  category: string;
  description: string;
  provider: Provider;
}

export const GearInfoSection = ({
  brand,
  title,
  category,
  description,
  provider,
}: GearInfoSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Category & Brand Header */}
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">
          <Tag className="w-4 h-4" />
          <span>{category}</span>
          <span>•</span>
          <span className="text-zinc-500">{brand}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
      </div>

      {/* Description */}
      <div className="border-t border-b border-zinc-200 dark:border-zinc-800 py-4">
        <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">About this gear</h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
          {description}
        </p>
      </div>

      {/* Provider Details Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Listed By Provider</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700">
              <Image 
                src={provider.photoURL} 
                alt={provider.name} 
                fill 
                className="object-cover" 
              />
            </div>
            <div>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                {provider.name}
                <ShieldCheck className="w-4 h-4 text-emerald-500 inline" />
              </p>
              <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" /> {provider.address}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Snippets */}
        <div className="pt-2 flex flex-wrap gap-4 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-200/50 dark:border-zinc-800">
          <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {provider.phoneNumber}</span>
          <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {provider.email}</span>
        </div>
      </div>
    </div>
  );
};