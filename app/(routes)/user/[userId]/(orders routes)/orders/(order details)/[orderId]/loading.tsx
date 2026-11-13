export default function Loading() {
  return (
    <div className="w-full space-y-6 pb-12 pt-2 animate-pulse">
      {/* Stepper Skeleton */}
      <div className="p-6 rounded-2xl border border-default-200/60 dark:border-neutral-800/80 bg-default-50/50 dark:bg-neutral-900/50">
        <div className="space-y-2 mb-6">
          <div className="w-36 h-5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
          <div className="w-64 h-3.5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
        </div>
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 bg-default-200 dark:bg-neutral-800 rounded-full" />
              <div className="w-20 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              <div className="w-28 h-3 bg-default-200 dark:bg-neutral-800 rounded-lg" />
            </div>
          ))}
        </div>
        <div className="md:hidden space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-7 h-7 bg-default-200 dark:bg-neutral-800 rounded-full" />
              <div className="space-y-1">
                <div className="w-24 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-36 h-3 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Items & Address */}
        <div className="lg:col-span-2 space-y-6">
          {/* Purchased Items Card */}
          <div className="p-6 rounded-2xl border border-default-200/60 dark:border-neutral-800/80 bg-default-50/50 dark:bg-neutral-900/50 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-default-200/60 dark:border-neutral-800/80">
              <div className="w-9 h-9 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              <div className="space-y-1.5">
                <div className="w-36 h-5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-48 h-3 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              </div>
            </div>

            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-default-200 dark:bg-neutral-800 rounded-xl shrink-0" />
                  <div className="space-y-2 flex-1 max-w-sm">
                    <div className="w-full h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                    <div className="w-2/3 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                    <div className="w-32 h-3.5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-2">
                  <div className="w-20 h-5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                  <div className="w-24 h-7 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Address Card */}
          <div className="p-6 rounded-2xl border border-default-200/60 dark:border-neutral-800/80 bg-default-50/50 dark:bg-neutral-900/50 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-default-200/60 dark:border-neutral-800/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="space-y-1.5">
                  <div className="w-36 h-5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                  <div className="w-48 h-3 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="w-20 h-3 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-36 h-5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-28 h-3.5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-40 h-3.5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="w-28 h-3 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-full h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-3/4 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-1/2 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Actions */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-default-200/60 dark:border-neutral-800/80 bg-default-50/50 dark:bg-neutral-900/50 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-default-200/60 dark:border-neutral-800/80">
              <div className="w-9 h-9 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              <div className="space-y-1.5">
                <div className="w-32 h-5 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-40 h-3 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="w-28 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-20 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              </div>
              <div className="flex justify-between">
                <div className="w-20 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-16 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              </div>
              <div className="flex justify-between">
                <div className="w-32 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-14 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              </div>
              <div className="h-px w-full bg-default-200/60 dark:border-neutral-800/80 my-2" />
              <div className="flex justify-between">
                <div className="w-28 h-6 bg-default-200 dark:bg-neutral-800 rounded-lg" />
                <div className="w-24 h-6 bg-default-200 dark:bg-neutral-800 rounded-lg" />
              </div>
            </div>

            <div className="w-full h-12 bg-default-200 dark:bg-neutral-800 rounded-xl" />
          </div>

          <div className="p-6 rounded-2xl border border-default-200/60 dark:border-neutral-800/80 bg-default-50/50 dark:bg-neutral-900/50 space-y-3">
            <div className="w-28 h-4 bg-default-200 dark:bg-neutral-800 rounded-lg" />
            <div className="w-full h-10 bg-default-200 dark:bg-neutral-800 rounded-xl" />
            <div className="w-full h-9 bg-default-200 dark:bg-neutral-800 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
