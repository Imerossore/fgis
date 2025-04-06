import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Notification = {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  message: string;
  timestamp: string;
};

export default function NotificationComponent() {
  const notifications: Notification[] = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      message: "Updated system status for Division A",
      timestamp: "10 minutes ago",
    },
    {
      id: "2",
      user: {
        name: "Sarah Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      message: "Added new report for Q2 systems review",
      timestamp: "1 hour ago",
    },
    {
      id: "3",
      user: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      message: "Requested approval for maintenance window",
      timestamp: "3 hours ago",
    },
  ];

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto max-h-[calc(100%-4rem)]">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between border-b border-muted pb-3 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={notification.user.avatar}
                  alt={notification.user.name}
                />
                <AvatarFallback>
                  {notification.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{notification.user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.message}
                </p>
                <span className="text-xs text-muted-foreground">
                  {notification.timestamp}
                </span>
              </div>
            </div>
            <Button size="sm" variant="outline">
              View
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
