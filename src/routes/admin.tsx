import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CATEGORIES,
  STATUSES,
  TEAMS,
  formatDate,
  useCampusFix,
  type Status,
} from "@/lib/campusfix";
import { Header, StatusPill, StatusFooter } from "@/components/campusfix/Chrome";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administrator Queue — CampusFix" },
      {
        name: "description",
        content:
          "Facilities administrators triage campus work orders: filter the queue, assign maintenance teams, update status and log comments.",
      },
      { property: "og:title", content: "Administrator Queue — CampusFix" },
      {
        property: "og:description",
        content: "Triage, assign and resolve campus maintenance work orders.",
      },
    ],
  }),
  component: AdminQueue,
});

function AdminQueue() {
  const { requests, setStatus, assign, addComment } = useCampusFix();
  const [status, setFilter] = useState<Status | "All">("All");
  const [category, setCategory] = useState<string>("All");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(requests[0]?.id);
  const [comment, setComment] = useState("");

  const list = requests.filter(
    (r) =>
      (status === "All" || r.status === status) &&
      (category === "All" || r.category === category) &&
      (q.trim() === "" ||
        `${r.id} ${r.title} ${r.location} ${r.reporter}`.toLowerCase().includes(q.toLowerCase())),
  );

  const selected = requests.find((r) => r.id === selectedId) ?? list[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Administrator queue</h2>
            <p className="text-sm text-muted-foreground">
              {list.length} of {requests.length} work orders shown
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search ID, title, hall…"
              className="w-56 rounded-lg bg-surface px-3 py-2 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-campus"
            />
            <select
              value={status}
              onChange={(e) => setFilter(e.target.value as Status | "All")}
              className="rounded-lg bg-surface px-3 py-2 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-campus"
            >
              <option value="All">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg bg-surface px-3 py-2 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-campus"
            >
              <option value="All">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 space-y-2 lg:col-span-7">
            {list.map((r) => {
              const { month, day } = formatDate(r.createdAt);
              const active = selected?.id === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className={`flex w-full items-start gap-4 rounded-xl bg-surface p-4 text-left shadow-sm ring-1 transition-shadow hover:shadow-md ${
                    active ? "ring-2 ring-campus" : "ring-border"
                  }`}
                >
                  <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary">
                    <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                      {month}
                    </span>
                    <span className="text-lg font-medium leading-none">{day}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">#{r.id}</span>
                      <StatusPill status={r.status} />
                    </div>
                    <p className="truncate text-base font-medium">{r.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {r.category} · {r.location} · {r.reporter}
                    </p>
                  </div>
                </button>
              );
            })}
            {list.length === 0 ? (
              <p className="rounded-xl bg-surface p-8 text-center text-sm text-muted-foreground ring-1 ring-border">
                No work orders match these filters.
              </p>
            ) : null}
          </div>

          <div className="col-span-12 lg:col-span-5">
            {selected ? (
              <div className="sticky top-6 space-y-4 rounded-xl bg-surface p-6 shadow-sm ring-1 ring-border">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      #{selected.id}
                    </span>
                    <StatusPill status={selected.status} />
                  </div>
                  <h3 className="text-lg font-semibold">{selected.title}</h3>
                  <p className="mt-2 text-pretty text-sm text-muted-foreground">
                    {selected.description}
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
                  <Meta label="Location" value={`${selected.location}, ${selected.detail}`} />
                  <Meta label="Category" value={selected.category} />
                  <Meta label="Reported by" value={selected.reporter} />
                  <Meta label="Evidence" value={selected.photoName ?? "None attached"} />
                </dl>

                <div className="space-y-3 border-t border-border pt-4">
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Assign team
                  </label>
                  <select
                    value={selected.assignee ?? ""}
                    onChange={(e) => assign(selected.id, e.target.value)}
                    className="w-full rounded-lg bg-input px-3 py-2 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-campus"
                  >
                    <option value="">Unassigned</option>
                    {TEAMS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>

                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Update status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(selected.id, s)}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                          selected.status === s
                            ? "bg-campus text-campus-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-accent"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 border-t border-border pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Comments
                  </p>
                  {selected.comments.map((c) => (
                    <div key={c.id} className="rounded-lg bg-secondary p-3 text-sm">
                      <p className="text-xs text-muted-foreground">
                        {c.author} · {c.at}
                      </p>
                      <p className="mt-1 text-pretty">{c.body}</p>
                    </div>
                  ))}
                  <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!comment.trim()) return;
                      addComment(selected.id, comment.trim());
                      setComment("");
                    }}
                  >
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add an update for the reporter…"
                      className="flex-1 rounded-lg bg-input px-3 py-2 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-campus"
                    />
                    <button className="rounded-lg bg-campus px-3 py-2 text-sm font-medium text-campus-foreground">
                      Post
                    </button>
                  </form>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <StatusFooter />
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
