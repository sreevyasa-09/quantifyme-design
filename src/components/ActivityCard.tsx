import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Footprints, Zap, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
  type: string;
  duration: string;
  calories: number;
  distance: string;
}

export function ActivityCard({ type, duration, calories, distance }: ActivityCardProps) {
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case "running":
        return Zap;
      case "cycling":
        return Bike;
      default:
        return Footprints;
    }
  };

  const getVariantColor = () => {
    switch (type.toLowerCase()) {
      case "running":
        return "text-warning";
      case "cycling":
        return "text-accent";
      default:
        return "text-primary";
    }
  };

  const Icon = getIcon();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">{type}</CardTitle>
        <div className={cn("p-2 rounded-lg bg-muted", getVariantColor())} aria-hidden="true">
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium text-foreground">{duration}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Calories</span>
            <span className="font-medium text-foreground">{calories} kcal</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              Distance
            </span>
            <span className="font-medium text-foreground">{distance}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
