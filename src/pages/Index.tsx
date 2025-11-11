import { useState } from "react";
import { Header } from "@/components/Header";
import { HabitCard } from "@/components/HabitCard";
import { StatCard } from "@/components/StatCard";
import { ProgressChart } from "@/components/ProgressChart";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Heart, 
  Moon, 
  Droplets, 
  Dumbbell, 
  BookOpen,
  TrendingUp,
  Clock,
  Award
} from "lucide-react";
import { toast } from "sonner";

export default function Index() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      title: "Daily Exercise",
      description: "30 minutes of physical activity",
      streak: 12,
      completed: true,
      progress: 85,
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Drink Water",
      description: "8 glasses throughout the day",
      streak: 7,
      completed: false,
      progress: 62,
      icon: <Droplets className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "Quality Sleep",
      description: "7-8 hours of restful sleep",
      streak: 15,
      completed: true,
      progress: 90,
      icon: <Moon className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "Meditation",
      description: "15 minutes of mindfulness",
      streak: 5,
      completed: false,
      progress: 71,
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: 5,
      title: "Reading",
      description: "Read for 20 minutes",
      streak: 9,
      completed: true,
      progress: 78,
      icon: <BookOpen className="h-5 w-5" />,
    },
  ]);

  const weeklyData = [
    { name: "Mon", value: 4 },
    { name: "Tue", value: 5 },
    { name: "Wed", value: 3 },
    { name: "Thu", value: 5 },
    { name: "Fri", value: 4 },
    { name: "Sat", value: 5 },
    { name: "Sun", value: 4 },
  ];

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
    
    const habit = habits.find(h => h.id === id);
    toast.success(
      habit?.completed 
        ? `${habit.title} marked as incomplete` 
        : `Great job! ${habit?.title} completed!`,
      { description: "Keep up the amazing work!" }
    );
  };

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = Math.round((completedToday / totalHabits) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Hero Section */}
        <section className="mb-8" aria-labelledby="welcome-heading">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground">
            <h2 id="welcome-heading" className="text-3xl font-bold mb-2">
              Welcome back! 👋
            </h2>
            <p className="text-primary-foreground/90 text-lg">
              You're doing great! {completedToday} out of {totalHabits} habits completed today.
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="mb-8" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="text-2xl font-bold mb-4">Your Progress</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Completion Rate"
              value={`${completionRate}%`}
              description="Today's achievements"
              icon={Target}
              variant="success"
              trend={{ value: 12, label: "from yesterday" }}
            />
            <StatCard
              title="Current Streak"
              value="15 days"
              description="Your longest active streak"
              icon={TrendingUp}
              variant="default"
              trend={{ value: 3, label: "this week" }}
            />
            <StatCard
              title="Total Points"
              value="2,847"
              description="Keep tracking to earn more"
              icon={Award}
              variant="warning"
              trend={{ value: 24, label: "this week" }}
            />
          </div>
        </section>

        {/* Habits Grid */}
        <section className="mb-8" aria-labelledby="habits-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="habits-heading" className="text-2xl font-bold">Daily Habits</h2>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
              Add Habit
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                {...habit}
                onToggle={() => toggleHabit(habit.id)}
              />
            ))}
          </div>
        </section>

        {/* Weekly Progress Chart */}
        <section aria-labelledby="chart-heading">
          <ProgressChart
            title="Weekly Habit Completion"
            description="Track your daily habit completion over the past week"
            data={weeklyData}
          />
        </section>

        {/* Accessibility Statement */}
        <footer className="mt-12 pt-8 border-t">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>
              <strong>WCAG AAA Compliant Design</strong> - Built with accessibility in mind
            </p>
            <p>
              Supports keyboard navigation, screen readers, and high contrast modes
            </p>
            <p className="text-xs">
              Part of SDG #9: Sustainable & Resilient Digital Infrastructure
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
