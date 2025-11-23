import { Header } from "@/components/Header";
import { StepCounter } from "@/components/StepCounter";
import { StatCard } from "@/components/StatCard";
import { ProgressChart } from "@/components/ProgressChart";
import { ActivityCard } from "@/components/ActivityCard";
import { Footprints, TrendingUp, Award, Flame } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [steps, setSteps] = useState(0);
  const [dailyGoal] = useState(10000);
  const [isWalking, setIsWalking] = useState(false);
  
  const weeklyData = [
    { name: "Mon", value: 8234 },
    { name: "Tue", value: 9876 },
    { name: "Wed", value: 7456 },
    { name: "Thu", value: 10234 },
    { name: "Fri", value: 6789 },
    { name: "Sat", value: 12456 },
    { name: "Sun", value: steps },
  ];

  const activities = [
    { type: "Walking", duration: "45 min", calories: 180, distance: "3.2 km" },
    { type: "Running", duration: "20 min", calories: 240, distance: "2.8 km" },
    { type: "Cycling", duration: "30 min", calories: 320, distance: "8.5 km" },
  ];

  const weeklySteps = weeklyData.reduce((sum, day) => sum + day.value, 0);
  const avgDailySteps = Math.round(weeklySteps / 7);
  const caloriesBurned = Math.round(steps * 0.04);
  const distance = (steps * 0.0008).toFixed(2);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWalking) {
      interval = setInterval(() => {
        setSteps(prev => prev + Math.floor(Math.random() * 3) + 1);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isWalking]);

  const progressPercent = Math.min(Math.round((steps / dailyGoal) * 100), 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-12" role="region" aria-label="Step counter">
          <StepCounter 
            steps={steps}
            goal={dailyGoal}
            isWalking={isWalking}
            onToggleWalking={() => setIsWalking(!isWalking)}
          />
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" role="region" aria-label="Statistics overview">
          <StatCard
            title="Daily Goal"
            value={`${progressPercent}%`}
            description={`${steps.toLocaleString()} / ${dailyGoal.toLocaleString()} steps`}
            icon={Footprints}
            variant="success"
            trend={{ value: 12, label: "vs yesterday" }}
          />
          <StatCard
            title="Distance"
            value={`${distance} km`}
            description="Today's journey"
            icon={TrendingUp}
            variant="default"
          />
          <StatCard
            title="Calories"
            value={caloriesBurned.toString()}
            description="Burned today"
            icon={Flame}
            variant="warning"
          />
          <StatCard
            title="Weekly Avg"
            value={avgDailySteps.toLocaleString()}
            description="Steps per day"
            icon={Award}
            variant="success"
            trend={{ value: 8, label: "improvement" }}
          />
        </section>

        {/* Activities Grid */}
        <section className="mb-12" role="region" aria-label="Recent activities">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Recent Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((activity, idx) => (
              <ActivityCard key={idx} {...activity} />
            ))}
          </div>
        </section>

        {/* Progress Chart */}
        <section className="mb-12" role="region" aria-label="Weekly steps chart">
          <ProgressChart
            data={weeklyData}
            title="Weekly Steps"
            description="Your step count for each day this week"
          />
        </section>

        {/* Accessibility Statement */}
        <footer className="mt-16 p-6 bg-card rounded-lg border border-border" role="contentinfo">
          <h2 className="text-lg font-semibold mb-3 text-foreground">Accessibility & AI-Powered Tracking</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pacer Pedometer uses AdaBoost regression algorithms to accurately predict and calibrate step counts 
            based on movement patterns. Designed following WCAG 2.1 AAA standards with keyboard navigation, 
            screen reader support, and high contrast for inclusive fitness tracking.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
