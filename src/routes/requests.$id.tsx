import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { STATUSES, useCampusFix } from "@/lib/campusfix";
import { Header, StatusPill } from "@/components/campusfix/Chrome";

export const Route = createFileRoute("/requests/$id")({
  head: () => ({
    meta: [
      { title: "Work Order Details — CampusFix" },
      {
        name: "description",
        content:
          "Follow a CampusFix work order: reported details, attached evidence, assigned team, status timeline and facilities comments.",
      },
      { property: "og:title", content: "Work Order Details — CampusFix" },
      {
        property: "og:description",
        content: "Track a campus maintenance work order from report to resolution.",
      },
    ],
  }),
  component: RequestDetail,
});

function RequestDetail() {
  const { id } = useParams({ from: "/requests/$id" });
  const { requests } = useCampusFix();
  const request = requests.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-xl font-semibold">Work order #{id} not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            It may have been closed and archived by facilities.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-campus px-4 py-2.5 text-sm font-medium text-campus-foreground"
          >
            Back to dashboard
          </Link>
        </main>
      </div>
    );
  }

  const reachedIndex = STATUSES.indexOf(request.status);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Link to="/" className="text-xs text-muted-foreground hover:text-campus">
          ← Back to my requests
        </Link>

        <div className="mt-4 grid grid-cols-12 gap-6">
          <section className="col-span-12 rounded-xl bg-surface p-6 shadow-sm ring-1 ring-border lg:col-span-7">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">#{request.id}</span>
              <StatusPill status={request.status} />
            </div>
            <h1 className="text-balance text-2xl font-semibold">{request.title}</h1>
            <p className="mt-3 text-pretty text-sm text-muted-foreground">
              {request.description}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-xs">
              <Meta label="Location" value={`${request.location}, ${request.detail}`} />
              <Meta label="Category" value={request.category} />
              <Meta label="Reported by" value={request.reporter} />
              <Meta label="Date reported" value={request.createdAt} />
              <Meta label="Assigned team" value={request.assignee ?? "Awaiting assignment"} />
              <Meta label="Photo evidence" value={request.photoName ?? "None attached"} />
            </dl>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Facilities comments
              </p>
              <div className="mt-3 space-y-2">
                {request.comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No comments yet. You will be notified when facilities responds.
                  </p>
                ) : (
                  request.comments.map((c) => (
                    <div key={c.id} className="rounded-lg bg-secondary p-3 text-sm">
                      <p className="text-xs text-muted-foreground">
                        {c.author} · {c.at}
                      </p>
                      <p className="mt-1 text-pretty">{c.body}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <aside className="col-span-12 lg:col-span-5">
            <div className="rounded-xl bg-surface p-6 shadow-sm ring-1 ring-border">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status timeline
              </p>
              <ol className="mt-5 space-y-6">
                {STATUSES.map((s, i) => {
                  const entry = request.history.find((h) => h.status === s);
                  const done = i <= reachedIndex;
                  return (
                    <li key={s} className="relative flex gap-4">
                      {i < STATUSES.length - 1 ? (
                        <span
                          className={`absolute left-[7px] top-5 h-full w-px ${done ? "bg-campus" : "bg-border"}`}
                        />
                      ) : null}
                      <span
                        className={`mt-1 size-4 shrink-0 rounded-full ring-4 ${
                          done ? "bg-campus ring-campus/15" : "bg-input ring-transparent"
                        }`}
                      />
                      <div>
                        <p
                          className={`text-sm font-medium ${done ? "" : "text-muted-foreground"}`}
                        >
                          {s}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry ? entry.at : "Not yet reached"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}
