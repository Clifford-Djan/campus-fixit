import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCampusFix } from "@/lib/campusfix";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CampusFix" },
      {
        name: "description",
        content:
          "Sign in to CampusFix with your student or staff credentials to submit and manage campus maintenance requests.",
      },
      { property: "og:title", content: "Sign in — CampusFix" },
      {
        property: "og:description",
        content: "Access your CampusFix student or administrator dashboard.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { setRole } = useCampusFix();
  const navigate = useNavigate();
  const [as, setAs] = useState<"student" | "admin">("student");

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-between bg-campus px-10 py-12 text-campus-foreground">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-sm bg-campus-foreground/10 ring-1 ring-campus-foreground/20">
            <span className="text-xs font-medium tracking-tighter">CFX</span>
          </div>
          <div>
            <p className="text-lg font-semibold leading-none">CampusFix</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-70">
              Facilities Management &amp; Registry
            </p>
          </div>
        </div>

        <div className="max-w-[38ch]">
          <h1 className="text-balance text-3xl font-semibold leading-tight">
            One register for every campus fault.
          </h1>
          <p className="mt-3 text-pretty text-sm opacity-70">
            Report a fault once, attach evidence, and follow it through Pending, Assigned, In
            Progress and Resolved — no more lost WhatsApp messages.
          </p>
        </div>

        <dl className="grid grid-cols-3 gap-6 text-xs">
          <div>
            <dt className="uppercase tracking-widest opacity-50">Halls covered</dt>
            <dd className="mt-1 text-base font-medium">14</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest opacity-50">Avg. response</dt>
            <dd className="mt-1 text-base font-medium">4.2 hrs</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest opacity-50">Resolved</dt>
            <dd className="mt-1 text-base font-medium">1,208</dd>
          </div>
        </dl>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-12">
        <form
          className="w-full max-w-sm space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setRole(as);
            navigate({ to: as === "admin" ? "/admin" : "/" });
          }}
        >
          <div>
            <h2 className="text-xl font-semibold">Sign in</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use your university ID and password.
            </p>
          </div>

          <div className="flex gap-1 rounded-lg bg-input p-1 ring-1 ring-border">
            {(["student", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setAs(r)}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  as === r
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r === "admin" ? "Administrator" : "Student / Staff"}
              </button>
            ))}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              University ID
            </label>
            <input
              defaultValue="2425400968"
              className="w-full rounded-lg bg-input px-3 py-2.5 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-campus"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              defaultValue="campusfix"
              className="w-full rounded-lg bg-input px-3 py-2.5 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-campus"
            />
          </div>

          <button className="w-full rounded-lg bg-campus px-4 py-2.5 text-sm font-medium text-campus-foreground transition-transform hover:-translate-y-px">
            Continue
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Front-end preview — no live authentication yet.{" "}
            <Link to="/" className="text-campus underline underline-offset-2">
              Skip to dashboard
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
