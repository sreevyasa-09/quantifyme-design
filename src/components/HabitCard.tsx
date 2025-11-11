import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitCardProps {
  title: string;
  description: string;
  streak: number;
  completed: boolean;
  progress: number;
  icon: React.ReactNode;
  onToggle: () => void;
}

export function HabitCard({
  title,
  description,
  streak,
  completed,
  progress,
  icon,
  onToggle,
}: HabitCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg border-2 hover:border-primary/50">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-start gap-3">
          <div 
            className={cn(
              "p-2 rounded-lg",
              completed ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
            )}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button
          variant={completed ? "default" : "outline"}
          size="icon"
          onClick={onToggle}
          aria-label={completed ? `Mark ${title} as incomplete` : `Mark ${title} as complete`}
          className={cn(
            "shrink-0",
            completed && "bg-success hover:bg-success/90"
          )}
        >
          <Check className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium" aria-label={`${streak} day streak`}>
              {streak} day streak
            </span>
          </div>
          <Badge 
            variant={progress >= 75 ? "default" : "secondary"}
            className={cn(progress >= 75 && "bg-success")}
          >
            {progress}% this week
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
