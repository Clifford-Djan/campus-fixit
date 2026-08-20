import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Status = "Pending" | "Assigned" | "In Progress" | "Resolved";

export const STATUSES: Status[] = ["Pending", "Assigned", "In Progress", "Resolved"];

export const CATEGORIES = [
  "Electrical / Power",
  "Plumbing / Water",
  "Carpentry / Furniture",
  "Structural / Masonry",
  "Network / IT",
] as const;

export const LOCATIONS = [
  "Mensah Sarbah Hall",
  "Volta Hall",
  "Commonwealth Hall",
  "Balme Library",
  "Computer Science Block",
] as const;

export const TEAMS = [
  "Facilities Team Alpha",
  "Facilities Team Bravo",
  "Electrical Unit",
  "ICT Support",
] as const;

export type Comment = {
  id: string;
  author: string;
  body: string;
  at: string;
};

export type Request = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  detail: string;
  reporter: string;
  status: Status;
  assignee?: string;
  createdAt: string;
  photoName?: string;
  comments: Comment[];
  history: { status: Status; at: string }[];
};

const seed: Request[] = [
  {
    id: "W-29401",
    title: "Faulty ceiling fan in reading room",
    description:
      "The fan in the 300-level reading block is sparking when switched to speed 3. Immediate attention required.",
    category: "Electrical / Power",
    location: "Mensah Sarbah Hall",
    detail: "Block B, Reading Room 2",
    reporter: "Clifford Djan",
    status: "Pending",
    createdAt: "2026-08-14",
    photoName: "fan-sparking.jpg",
    comments: [],
    history: [{ status: "Pending", at: "2026-08-14" }],
  },
  {
    id: "W-29388",
    title: "Water leakage — hostel kitchen",
    description:
      "Main pipe underneath the sink has a hairline crack. Constant dripping wasting water.",
    category: "Plumbing / Water",
    location: "Volta Hall",
    detail: "Ground floor shared kitchen",
    reporter: "Jessey Obeng Akonnor",
    status: "Assigned",
    assignee: "Facilities Team Alpha",
    createdAt: "2026-08-12",
    comments: [
      {
        id: "c1",
        author: "Facilities Desk",
        body: "Plumber scheduled for Thursday morning. Please keep the area clear.",
        at: "2026-08-13",
      },
    ],
    history: [
      { status: "Pending", at: "2026-08-12" },
      { status: "Assigned", at: "2026-08-13" },
    ],
  },
  {
    id: "W-29375",
    title: "Broken window latch in study cubicle",
    description:
      "Latch on the east-facing window will not close; rain enters the cubicle during storms.",
    category: "Carpentry / Furniture",
    location: "Balme Library",
    detail: "Second floor, cubicle 14",
    reporter: "Aaron Asirifi Boakye",
    status: "In Progress",
    assignee: "Facilities Team Bravo",
    createdAt: "2026-08-11",
    comments: [
      {
        id: "c2",
        author: "Facilities Team Bravo",
        body: "Replacement latch collected from stores. Fitting today.",
        at: "2026-08-15",
      },
    ],
    history: [
      { status: "Pending", at: "2026-08-11" },
      { status: "Assigned", at: "2026-08-12" },
      { status: "In Progress", at: "2026-08-15" },
    ],
  },
  {
    id: "W-29350",
    title: "Internet router maintenance",
    description:
      "Scheduled reset and firmware update for the CS department backbone router.",
    category: "Network / IT",
    location: "Computer Science Block",
    detail: "Server room, rack 3",
    reporter: "Samuel Kofi Afrifa",
    status: "Resolved",
    assignee: "ICT Support",
    createdAt: "2026-08-10",
    comments: [
      {
        id: "c3",
        author: "Herman Bannerman-Hesse",
        body: "Firmware updated and link tested at full throughput. Closing the order.",
        at: "2026-08-11",
      },
    ],
    history: [
      { status: "Pending", at: "2026-08-10" },
      { status: "Assigned", at: "2026-08-10" },
      { status: "In Progress", at: "2026-08-11" },
      { status: "Resolved", at: "2026-08-11" },
    ],
  },
];

export type NewRequest = {
  title: string;
  description: string;
  category: string;
  location: string;
  detail: string;
  photoName?: string;
};

type Ctx = {
  requests: Request[];
  role: "student" | "admin";
  user: string;
  setRole: (r: "student" | "admin") => void;
  addRequest: (r: NewRequest) => string;
  setStatus: (id: string, s: Status) => void;
  assign: (id: string, team: string) => void;
  addComment: (id: string, body: string) => void;
};

const CampusFixContext = createContext<Ctx | null>(null);

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function CampusFixProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<Request[]>(seed);
  const [role, setRole] = useState<"student" | "admin">("student");
  const user = role === "admin" ? "Facilities Desk" : "Clifford Djan";

  const addRequest = useCallback(
    (r: NewRequest) => {
      const id = `W-${29402 + requests.length}`;
      setRequests((prev) => [
        {
          ...r,
          id,
          reporter: "Clifford Djan",
          status: "Pending",
          createdAt: today(),
          comments: [],
          history: [{ status: "Pending", at: today() }],
        },
        ...prev,
      ]);
      return id;
    },
    [requests.length],
  );

  const setStatus = useCallback((id: string, s: Status) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: s, history: [...r.history, { status: s, at: today() }] }
          : r,
      ),
    );
  }, []);

  const assign = useCallback((id: string, team: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              assignee: team,
              status: r.status === "Pending" ? "Assigned" : r.status,
              history:
                r.status === "Pending"
                  ? [...r.history, { status: "Assigned" as Status, at: today() }]
                  : r.history,
            }
          : r,
      ),
    );
  }, []);

  const addComment = useCallback((id: string, body: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              comments: [
                ...r.comments,
                {
                  id: `${id}-${r.comments.length + 1}`,
                  author: "Facilities Desk",
                  body,
                  at: today(),
                },
              ],
            }
          : r,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({ requests, role, user, setRole, addRequest, setStatus, assign, addComment }),
    [requests, role, user, addRequest, setStatus, assign, addComment],
  );

  return <CampusFixContext.Provider value={value}>{children}</CampusFixContext.Provider>;
}

export function useCampusFix() {
  const ctx = useContext(CampusFixContext);
  if (!ctx) throw new Error("useCampusFix must be used inside CampusFixProvider");
  return ctx;
}

export function statusClasses(status: Status) {
  switch (status) {
    case "Pending":
      return "bg-pending-soft text-pending ring-pending/15";
    case "Assigned":
      return "bg-assigned-soft text-assigned ring-assigned/15";
    case "In Progress":
      return "bg-progress-soft text-progress ring-progress/15";
    default:
      return "bg-resolved-soft text-resolved ring-resolved/15";
  }
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    month: d.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
    day: String(d.getDate()).padStart(2, "0"),
  };
}
