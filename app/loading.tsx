export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 py-20 sm:py-32">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 bg-muted rounded-lg" />
          <div className="h-4 w-full max-w-lg bg-muted rounded-lg" />
          <div className="h-4 w-5/6 max-w-lg bg-muted rounded-lg" />
          <div className="pt-4 flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-muted rounded-full" />
            <div className="h-6 w-20 bg-muted rounded-full" />
            <div className="h-6 w-14 bg-muted rounded-full" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 space-y-10 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-1/3 bg-muted rounded-lg" />
              <div className="h-4 w-full bg-muted rounded-lg" />
              <div className="h-4 w-2/3 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
