import { SkeletonModuleCard } from '@/components/ui/SkeletonCard'

/**
 * Global loading state for the app
 * Uses skeleton placeholders for better UX
 */
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonModuleCard key={i} />
        ))}
      </div>
    </div>
  )
}
