import { Link } from "@tanstack/react-router";
import { statusClasses, useCampusFix, type Status } from "@/lib/campusfix";

export function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${statusClasses(status)}`}
    >
      {status}
    </span>
  );
}

export function Header() {
  const { role, setRole } = useCampusFix();

  return (
    <header className="bg-campus text-campus-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-sm bg-campus-foreground/10 ring-1 ring-campus-foreground/20">
            <span className="text-xs font-medium tracking-tighter">CFX</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none tracking-tight">CampusFix</h1>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-70">
              Facilities Management &amp; Registry
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-1 rounded-md bg-foreground/20 p-1 ring-1 ring-campus-foreground/10">
            <button
              onClick={() => setRole("student")}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                role === "student" ? "bg-campus-foreground/15" : "opacity-60 hover:opacity-100"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                role === "admin" ? "bg-campus-foreground/15" : "opacity-60 hover:opacity-100"
              }`}
            >
              Administrator
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/" className="font-medium opacity-80 hover:opacity-100">
              Dashboard
            </Link>
            <Link to="/admin" className="font-medium opacity-80 hover:opacity-100">
              Admin queue
            </Link>
            <Link to="/login" className="font-medium opacity-80 hover:opacity-100">
              Sign in
            </Link>
          </div>
          <div className="size-8 rounded-full bg-foreground/40 ring-1 ring-campus-foreground/20" />
        </nav>
      </div>
    </header>
  );
}

export function StatusFooter() {
  const { requests } = useCampusFix();
  const active = requests.filter((r) => r.status !== "Resolved").length;

  return (
    <div className="fixed bottom-6 right-6 z-20 hidden items-center gap-6 rounded-xl bg-foreground p-4 text-background shadow-xl ring-1 ring-background/10 md:flex">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest opacity-50">
          Current system load
        </span>
        <span className="text-sm font-medium">{active} active orders</span>
      </div>
      <div className="h-8 w-px bg-background/10" />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest opacity-50">Avg. response</span>
        <span className="text-sm font-medium">4.2 hours</span>
      </div>
    </div>
  );
}
