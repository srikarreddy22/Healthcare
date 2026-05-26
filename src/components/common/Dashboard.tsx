import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Brain,
  Star,
  Clock,
  ArrowRight,
  TrendingUp
} from "lucide-react";

export const Dashboard = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Your Wellness Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Track your progress and access support tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Quick Support
              </CardTitle>
              <CardDescription>
                Get immediate help when you need it most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="hero" className="h-20 flex-col gap-2">
                  <MessageCircle className="h-6 w-6" />
                  Start AI Chat
                  <span className="text-xs opacity-80">Available 24/7</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  Book Counselling
                  <span className="text-xs text-muted-foreground">Next available: Today 2PM</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wellness Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Wellness Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-success mb-2">87</div>
                <p className="text-sm text-muted-foreground mb-4">Great progress this week!</p>
                <Badge variant="secondary" className="bg-success-soft text-success">
                  <Star className="h-3 w-3 mr-1" />
                  Level 3: Mindful Student
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-soft rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Chat session</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent-soft rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Read article</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary-soft rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Group Session</p>
                    <p className="text-xs text-muted-foreground">Tomorrow 3PM</p>
                  </div>
                </div>
                <Button variant="soft" size="sm" className="w-full">
                  View Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recommended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-1">Exam Stress Guide</p>
                  <p className="text-xs text-muted-foreground">5 min read</p>
                </div>
                <Button variant="soft" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Library
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">2.4k</p>
                  <p className="text-xs text-muted-foreground">Active students</p>
                </div>
                <Button variant="soft" size="sm" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Join Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Support Banner */}
        <Card className="mt-8 border-destructive/20 bg-destructive/5">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold text-destructive mb-1">
                Need immediate help?
              </h3>
              <p className="text-sm text-muted-foreground">
                Crisis support is available 24/7 through our emergency channels
              </p>
            </div>
            <Button variant="destructive">
              <Clock className="h-4 w-4 mr-2" />
              Emergency Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};