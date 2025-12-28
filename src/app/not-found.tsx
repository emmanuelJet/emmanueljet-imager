import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-[100px] -z-10 mix-blend-screen animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px] -z-10 mix-blend-screen animate-float" style={{ animationDelay: "-3s" }} />

      <div className="glass-panel p-8 md:p-12 rounded-2xl max-w-md w-full text-center flex flex-col items-center gap-6 border border-white/10">
        <div className="size-16 rounded-2xl flex items-center justify-center">
          <img src="/brand/emmanueljet-logomark.svg" alt="emmanueljet logo" className="size-16" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black bg-gradient-to-r from-brand-purple to-brand-orange bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            The page you are looking for doesn't exist or has been moved to another dimension.
          </p>
        </div>

        <Link
          href="/"
          className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-brand-purple to-brand-orange px-8 font-medium text-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-background"
        >
          <span className="relative z-10 flex items-center gap-2">
            Go Home
          </span>
          <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
    </div>
  );
}
