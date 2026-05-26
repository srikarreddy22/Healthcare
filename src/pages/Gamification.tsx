import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Flame, Trophy, NotebookText, Heart, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Task = {
  id: string;
  title: string;
  points: number;
  icon: any;
};

const BASE_TASKS: Task[] = [
  { id: "journal-1", title: "Write a 3‑line journal", points: 10, icon: NotebookText },
  { id: "breathing-5", title: "5‑minute breathing", points: 10, icon: Heart },
  { id: "kindness-1", title: "One act of kindness", points: 15, icon: Users },
  { id: "gratitude-3", title: "List 3 gratitudes", points: 10, icon: Heart },
];

type SaveState = { points: number; completed: string[]; streakStartISO?: string; lastClaimISO?: string };

const loadState = (): SaveState => {
  try { return JSON.parse(localStorage.getItem("gami.state") || "{}"); } catch { return {}; }
};
const saveState = (s: SaveState) => localStorage.setItem("gami.state", JSON.stringify(s));

function getStreakDays(state: SaveState) {
  if (!state.streakStartISO || !state.lastClaimISO) return 0;
  const start = new Date(state.streakStartISO);
  const last = new Date(state.lastClaimISO);
  const diff = Math.floor((last.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  return Math.max(0, diff + 1);
}

const Gamification = () => {
  const [state, setState] = useState<SaveState>(() => ({ points: 0, completed: [] }));
  useEffect(() => { setState({ points: 0, completed: [], ...loadState() }); }, []);
  useEffect(() => { saveState(state); }, [state]);

  const progressPct = useMemo(() => Math.min(100, (state.points % 100)), [state.points]);
  const level = Math.floor(state.points / 100) + 1;
  const streak = getStreakDays(state);

  const handleClaim = (task: Task) => {
    if (state.completed.includes(task.id)) return;
    const nowISO = new Date().toISOString();
    const newState: SaveState = {
      points: (state.points || 0) + task.points,
      completed: [...(state.completed || []), task.id],
      streakStartISO: state.lastClaimISO ? state.streakStartISO : nowISO,
      lastClaimISO: nowISO,
    };
    setState(newState);
  };

  const resetToday = () => setState({ ...state, completed: [] });

  const earnedBadges = useMemo(() => {
    const list: string[] = [];
    if (state.points >= 50) list.push("Bronze");
    if (state.points >= 200) list.push("Silver");
    if (state.points >= 500) list.push("Gold");
    if (streak >= 3) list.push("3‑Day Streak");
    if (streak >= 7) list.push("7‑Day Streak");
    return list;
  }, [state.points, streak]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-secondary-soft">
      <Header />
      <main className="container py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Wellness Journey</h1>
            <p className="text-muted-foreground">Earn points for healthy habits and collect badges as you grow.</p>
          </div>
          <Button variant="outline" onClick={resetToday}>Reset Today</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-large bg-card/70 backdrop-blur rounded-2xl md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-primary" /> Level {level} • {state.points} pts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Progress value={progressPct} />
                <p className="text-xs text-muted-foreground mt-1">{100 - progressPct} pts to next level</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {BASE_TASKS.map((t) => {
                  const Icon = t.icon;
                  const done = state.completed.includes(t.id);
                  return (
                    <div key={t.id} className={`p-4 rounded-xl border ${done ? 'bg-muted/40' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{t.title}</p>
                            <p className="text-xs text-muted-foreground">{t.points} pts</p>
                          </div>
                        </div>
                        <Button size="sm" variant={done ? "secondary" : "soft"} onClick={() => handleClaim(t)} disabled={done}>
                          {done ? <><CheckCircle2 className="w-4 h-4 mr-1"/> Claimed</> : "Claim"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-0 shadow-large bg-card/70 backdrop-blur rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Flame className="w-5 h-5 text-accent" /> Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{streak} days</p>
                <p className="text-sm text-muted-foreground">Complete at least one task daily to extend your streak.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-large bg-card/70 backdrop-blur rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-secondary" /> Badges</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {earnedBadges.length === 0 && <p className="text-sm text-muted-foreground">No badges yet — keep going!</p>}
                {earnedBadges.map((b) => (
                  <Badge key={b} variant="outline">{b}</Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-0 shadow-large bg-card/70 backdrop-blur rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Heart className="w-5 h-5 text-primary" /> Tips</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border">Pair breathing with journaling for bonus calm.</div>
            <div className="p-3 rounded-xl border">Block 10 minutes daily to build streak momentum.</div>
            <div className="p-3 rounded-xl border">Celebrate small wins; perfection isn’t the goal.</div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Gamification;


