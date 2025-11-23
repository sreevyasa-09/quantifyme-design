import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCounterProps {
  steps: number;
  goal: number;
  isWalking: boolean;
  onToggleWalking: () => void;
}

export function StepCounter({ steps, goal, isWalking, onToggleWalking }: StepCounterProps) {
  const progress = Math.min((steps / goal) * 100, 100);
  const remaining = Math.max(goal - steps, 0);

  return (
    <Card className="p-8 text-center bg-gradient-to-br from-card via-card to-primary/5">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className={cn(
            "p-6 rounded-full bg-primary/10 transition-all duration-300",
            isWalking && "animate-pulse"
          )}>
            <Footprints className="h-16 w-16 text-primary" aria-hidden="true" />
          </div>
          {isWalking && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-success rounded-full animate-pulse" 
                 aria-label="Tracking active" />
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-6xl font-bold text-foreground mb-2" aria-label={`${steps.toLocaleString()} steps taken`}>
          {steps.toLocaleString()}
        </h2>
        <p className="text-lg text-muted-foreground">
          {remaining > 0 ? `${remaining.toLocaleString()} steps to goal` : "Goal achieved! 🎉"}
        </p>
      </div>

      <div className="mb-6">
        <Progress value={progress} className="h-3" aria-label={`Goal progress: ${Math.round(progress)}%`} />
        <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% of daily goal</p>
      </div>

      <Button
        size="lg"
        onClick={onToggleWalking}
        className={cn(
          "w-full md:w-auto px-8 transition-all",
          isWalking ? "bg-warning hover:bg-warning/90" : "bg-primary hover:bg-primary/90"
        )}
        aria-label={isWalking ? "Stop tracking" : "Start tracking"}
      >
        {isWalking ? (
          <>
            <Pause className="mr-2 h-5 w-5" aria-hidden="true" />
            Stop Tracking
          </>
        ) : (
          <>
            <Play className="mr-2 h-5 w-5" aria-hidden="true" />
            Start Tracking
          </>
        )}
      </Button>
    </Card>
  );
}
