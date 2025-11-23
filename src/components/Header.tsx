import { Button } from "@/components/ui/button";
import { Activity, User, Settings, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg" aria-hidden="true">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-primary">Pacer</span> Pedometer
          </h1>
        </div>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-2">
            <li>
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Open settings"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="View profile"
              >
                <User className="h-5 w-5" />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
