import React from 'react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          </div>
          <span className="text-lg font-semibold text-foreground">
            ELD Trip Planner
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Plan Trip
          </Link>
        </div>
      </div>
    </nav>
  );
}

