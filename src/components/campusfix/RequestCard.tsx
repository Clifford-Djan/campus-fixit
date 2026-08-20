import { Link } from "@tanstack/react-router";
import { formatDate, statusClasses, type Request } from "@/lib/campusfix";
import { StatusPill } from "./Chrome";

export function RequestCard({ request }: { request: Request }) {
  const { month, day } = formatDate(request.createdAt);

  return (
    <div className="group rounded-xl bg-surface p-4 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div
            className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-lg ring-1 ${statusClasses(request.status)}`}
          >
            <span className="text-[10px] font-semibold uppercase">{month}</span>
            <span className="text-lg font-medium leading-none">{day}</span>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">#{request.id}</span>
              <StatusPill status={request.status} />
            </div>
            <h3 className="mb-1 text-base font-medium text-foreground">{request.title}</h3>
            <p className="max-w-[56ch] text-pretty text-sm text-muted-foreground">
              {request.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span>
                Location: {request.location}, {request.detail}
              </span>
              <span>Reported by: {request.reporter}</span>
              {request.assignee ? <span>Assigned: {request.assignee}</span> : null}
            </div>
          </div>
        </div>
        <Link
          to="/requests/$id"
          params={{ id: request.id }}
          className="shrink-0 py-2 pl-2 pr-3 text-sm text-muted-foreground transition-colors hover:text-campus"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
