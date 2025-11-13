import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

/**
 * Generic Skeleton Placeholder
 */
export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
      <div className="bg-gray-200 h-4 rounded w-1/2 mb-4"></div>
      <div className="bg-gray-200 h-20 rounded"></div>
    </div>
  );
}

/**
 * Module Card Skeleton (for dashboard loading)
 */
export function SkeletonModuleCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <div className="bg-gray-200 h-6 rounded w-3/4 mb-2"></div>
          <div className="bg-gray-200 h-4 rounded w-1/2"></div>
        </div>
      </div>
      <div className="bg-gray-200 h-20 rounded mb-4"></div>
      <div className="flex gap-2">
        <div className="bg-gray-200 h-10 rounded flex-1"></div>
        <div className="bg-gray-200 h-10 rounded w-20"></div>
      </div>
    </div>
  );
}

/**
 * Quiz Question Skeleton
 */
export function SkeletonQuestion() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="bg-gray-200 h-8 rounded w-full"></div>
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-12 rounded"></div>
        ))}
      </div>
      <div className="bg-gray-200 h-10 rounded w-1/4"></div>
    </div>
  );
}
