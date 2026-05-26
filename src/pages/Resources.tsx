import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Sparkles, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Resource = { title: string; author?: string; url: string; note?: string };

const motivationalBooks: Resource[] = [
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", url: "https://www.goodreads.com/book/show/4069.Man_s_Search_for_Meaning", note: "Purpose and resilience" },
  { title: "Atomic Habits", author: "James Clear", url: "https://jamesclear.com/atomic-habits", note: "Small steps, big change" },
  { title: "The Power of Now", author: "Eckhart Tolle", url: "https://www.eckharttolle.com/power-of-now-excerpt/", note: "Presence and calm" },
  { title: "The Courage to Be Disliked", author: "Ichiro Kishimi, Fumitake Koga", url: "https://www.goodreads.com/book/show/43306206-the-courage-to-be-disliked" },
];

const motivationalVideos: Resource[] = [
  { title: "5‑Minute Mindfulness Meditation", url: "https://www.youtube.com/watch?v=inpok4MKVLM", note: "Breathing + grounding" },
  { title: "Guided Meditation for Beginners", url: "https://www.youtube.com/watch?v=1vx8iUvfyCY", note: "Gentle introduction" },
  { title: "Grit: The Power of Passion and Perseverance – Angela Duckworth", url: "https://www.youtube.com/watch?v=2Lz0VOltZKA" },
  { title: "How to Believe in Yourself – Jim Cathcart (TEDx)", url: "https://www.youtube.com/watch?v=mgmVOuLgFB0" },
];

const spiritualTexts: Resource[] = [
  { title: "Bhagavad Gītā (Accessible Commentary)", url: "https://www.holy-bhagavad-gita.org/", note: "Selected verses on calm" },
  { title: "Dhammapada (Teachings of the Buddha)", url: "https://suttacentral.net/kn/dhp", note: "Short verses for reflection" },
  { title: "Meditations", author: "Marcus Aurelius", url: "https://www.gutenberg.org/ebooks/2680", note: "Stoic grounding" },
  { title: "Tao Te Ching", url: "https://taoism.net/tao-te-ching-online-translation/", note: "Ease and balance" },
];

const guides: Resource[] = [
  { title: "Anxiety: Quick Grounding Techniques", url: "https://www.health.harvard.edu/mind-and-mood/take-a-break-try-this-3-minute-breathing-space-meditation", note: "3‑minute reset" },
  { title: "Sleep Hygiene Essentials", url: "https://www.sleepfoundation.org/sleep-hygiene", note: "Better rest" },
  { title: "Coping with Exam Stress", url: "https://www.mind.org.uk/information-support/tips-for-everyday-living/student-life/", note: "Student focused" },
  { title: "Crisis Resources (India)", url: "https://findahelpline.com/in/", note: "24/7 helplines" },
];

const ResourceCard = ({ item }: { item: Resource }) => (
  <a href={item.url} target="_blank" rel="noreferrer" className="block rounded-xl border hover:bg-muted/40 transition p-4">
    <p className="font-medium">{item.title}</p>
    {item.author && <p className="text-sm text-muted-foreground">{item.author}</p>}
    {item.note && <p className="text-xs text-muted-foreground mt-1">{item.note}</p>}
  </a>
);

const Resources = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-secondary-soft">
      <Header />
      <main className="container py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resource Library</h1>
            <p className="text-muted-foreground">Curated books, videos, and guides for motivation, mindfulness, and faith‑based support.</p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
        </div>

        <Tabs defaultValue="books" className="w-full">
          <TabsList className="mb-6 grid grid-cols-4 w-full">
            <TabsTrigger value="books" className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Books</TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2"><Video className="w-4 h-4" /> Videos</TabsTrigger>
            <TabsTrigger value="spiritual" className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Spiritual</TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2"><HeartHandshake className="w-4 h-4" /> Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="books">
            <Card className="border-0 shadow-large bg-card/70 backdrop-blur rounded-2xl">
              <CardHeader><CardTitle>Motivational & Self‑help Books</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {motivationalBooks.map((b) => <ResourceCard key={b.title} item={b} />)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card className="border-0 shadow-large bg-card/70 backdrop-blur rounded-2xl">
              <CardHeader><CardTitle>Motivational & Mindfulness Videos</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {motivationalVideos.map((v) => <ResourceCard key={v.title} item={v} />)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spiritual">
            <Card className="border-0 shadow-large bg-card/70 backdrop-blur rounded-2xl">
              <CardHeader><CardTitle>Spiritual & Religious Texts</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {spiritualTexts.map((s) => <ResourceCard key={s.title} item={s} />)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides">
            <Card className="border-0 shadow-large bg-card/70 backdrop-blur rounded-2xl">
              <CardHeader><CardTitle>Guides & Practical Playbooks</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((g) => <ResourceCard key={g.title} item={g} />)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;


