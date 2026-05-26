import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, User } from "lucide-react";
import { useMemo, useState } from "react";

type LiveEvent = {
  id: string;
  title: string;
  dateISO: string; // ISO string
  durationMins: number;
  host: string;
  summary: string;
  tags?: string[];
  joinUrl?: string;
};

const SESSIONS: LiveEvent[] = [
  {
    id: "mindfulness-101",
    title: "Mindfulness 101: 10‑minute daily reset",
    dateISO: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // +2 days
    durationMins: 45,
    host: "Dr. Ananya Rao, Psychologist",
    summary: "Learn a simple breathing and grounding routine to manage exam stress.",
    tags: ["mindfulness", "breathing", "students"],
    joinUrl: "https://meet.google.com/",
  },
  {
    id: "sleep-habits",
    title: "Sleep hygiene for better focus",
    dateISO: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // +4 days
    durationMins: 60,
    host: "Dr. Vikram Singh, Wellness Coach",
    summary: "Science‑backed tips to improve sleep quality during busy semesters.",
    tags: ["sleep", "habits"],
    joinUrl: "https://meet.google.com/",
  },
  {
    id: "compassion-circle",
    title: "Compassion Circle (Guided)",
    dateISO: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // +6 days
    durationMins: 40,
    host: "Campus Counsellor Team",
    summary: "Gentle peer‑support circle with short reflection and sharing.",
    tags: ["community", "sharing"],
    joinUrl: "https://meet.google.com/",
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getGoogleCalendarLink(e: LiveEvent) {
  const start = new Date(e.dateISO).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const end = new Date(new Date(e.dateISO).getTime() + e.durationMins * 60000)
    .toISOString()
    .replace(/[-:]|\.\d{3}/g, "");
  const text = encodeURIComponent(e.title);
  const details = encodeURIComponent(`${e.summary}\nHost: ${e.host}${e.joinUrl ? `\nJoin: ${e.joinUrl}` : ""}`);
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}%2F${end}&details=${details}`;
}

const useRsvps = () => {
  const key = "live.rsvps";
  const [map, setMap] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch { return {}; }
  });
  const set = (id: string, v: boolean) => {
    const next = { ...map, [id]: v };
    setMap(next);
    localStorage.setItem(key, JSON.stringify(next));
  };
  return { map, set };
};

const Live = () => {
  const upcoming = useMemo(() => SESSIONS.sort((a, b) => +new Date(a.dateISO) - +new Date(b.dateISO)), []);
  const { map, set } = useRsvps();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-secondary-soft">
      <Header />
      <main className="container py-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Sessions</h1>
          <p className="text-muted-foreground">Weekend webinars and guided circles with psychologists and counsellors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {upcoming.map((e) => (
            <Card key={e.id} className="border-0 shadow-large bg-card/70 backdrop-blur rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">{e.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" /> {formatDate(e.dateISO)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" /> {e.durationMins} mins
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" /> {e.host}
                </div>
                <p className="text-sm">{e.summary}</p>
                {e.tags && (
                  <div className="flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <Badge key={t} variant="outline">{t}</Badge>
                    ))}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  {e.joinUrl && (
                    <Button asChild className="flex-1">
                      <a href={e.joinUrl} target="_blank" rel="noreferrer"><Video className="w-4 h-4 mr-2" /> Join</a>
                    </Button>
                  )}
                  <Button asChild variant="outline" className="flex-1">
                    <a href={getGoogleCalendarLink(e)} target="_blank" rel="noreferrer">Add to Google Calendar</a>
                  </Button>
                  <Button
                    variant={map[e.id] ? "secondary" : "soft"}
                    className="flex-1"
                    onClick={() => set(e.id, !map[e.id])}
                  >
                    {map[e.id] ? "RSVP’d" : "RSVP"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Live;


