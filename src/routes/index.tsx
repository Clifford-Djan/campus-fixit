import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  CATEGORIES,
  LOCATIONS,
  STATUSES,
  useCampusFix,
  type Status,
} from "@/lib/campusfix";
import { Header, StatusFooter } from "@/components/campusfix/Chrome";
import { RequestCard } from "@/components/campusfix/RequestCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusFix — Report & Track Campus Maintenance" },
      {
        name: "description",
        content:
          "Report faults in halls, hostels and lecture blocks, attach photo evidence and track every work order from pending to resolved.",
      },
      { property: "og:title", content: "CampusFix — Report & Track Campus Maintenance" },
      {
        property: "og:description",
        content:
          "Submit campus maintenance requests with photo evidence and follow their progress in real time.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { requests, addRequest } = useCampusFix();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Status | "All">("All");
  const [photoName, setPhotoName] = useState<string>();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: CATEGORIES[0] as string,
    location: LOCATIONS[0] as string,
    detail: "",
  });

  const visible = requests.filter((r) => filter === "All" || r.status === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <section className="rounded-xl bg-surface p-6 shadow-sm ring-1 ring-border">
              <h2 className="mb-1 text-balance text-xl font-semibold">Submit new request</h2>
              <p className="mb-6 max-w-[40ch] text-pretty text-sm text-muted-foreground">
                Report infrastructure failures or maintenance needs across campus housing and
                facilities.
              </p>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!form.title.trim()) return;
                  const id = addRequest({ ...form, photoName });
                  setForm({
                    title: "",
                    description: "",
                    category: CATEGORIES[0],
                    location: LOCATIONS[0],
                    detail: "",
                  });
                  setPhotoName(undefined);
                  navigate({ to: "/requests/$id", params: { id } });
                }}
              >
                <Field label="Issue summary">
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Faulty ceiling fan in reading room"
                    className="w-full rounded-lg bg-input px-3 py-2.5 text-sm ring-1 ring-border transition-shadow focus:outline-none focus:ring-2 focus:ring-campus"
                  />
                </Field>

                <Field label="Location">
                  <select
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full rounded-lg bg-input px-3 py-2.5 text-sm ring-1 ring-border transition-shadow focus:outline-none focus:ring-2 focus:ring-campus"
                  >
                    {LOCATIONS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Specific spot">
                  <input
                    value={form.detail}
                    onChange={(e) => setForm({ ...form, detail: e.target.value })}
                    placeholder="Block B, Room 14"
                    className="w-full rounded-lg bg-input px-3 py-2.5 text-sm ring-1 ring-border transition-shadow focus:outline-none focus:ring-2 focus:ring-campus"
                  />
                </Field>

                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg bg-input px-3 py-2.5 text-sm ring-1 ring-border transition-shadow focus:outline-none focus:ring-2 focus:ring-campus"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Describe the problem">
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="What is wrong, and how urgent is it?"
                    className="w-full resize-none rounded-lg bg-input px-3 py-2.5 text-sm ring-1 ring-border transition-shadow focus:outline-none focus:ring-2 focus:ring-campus"
                  />
                </Field>

                <Field label="Photo evidence">
                  <label className="grid h-32 w-full cursor-pointer place-items-center rounded-lg bg-input outline-1 -outline-offset-1 outline-border transition-colors hover:bg-secondary">
                    <span className="px-4 text-center text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      {photoName ?? "Click to upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setPhotoName(e.target.files?.[0]?.name)}
                    />
                  </label>
                </Field>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-campus px-4 py-2.5 text-sm font-medium text-campus-foreground ring-1 ring-campus ring-offset-2 ring-offset-surface transition-transform hover:-translate-y-px"
                >
                  Submit work order
                </button>
              </form>
            </section>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Active work orders</h2>
              <div className="flex flex-wrap gap-2">
                {(["All", ...STATUSES] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      filter === s
                        ? "bg-secondary text-secondary-foreground ring-1 ring-border"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {visible.map((r) => (
                <RequestCard key={r.id} request={r} />
              ))}
              {visible.length === 0 ? (
                <p className="rounded-xl bg-surface p-8 text-center text-sm text-muted-foreground ring-1 ring-border">
                  No work orders with this status.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <StatusFooter />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
