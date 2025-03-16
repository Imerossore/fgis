import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Globe, Building } from "lucide-react";
import { User } from "@/lib/data/users";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border border-white/20 bg-white/10 backdrop-blur-md dark:bg-black/20 dark:border-white/10">
      <CardHeader className="bg-white/20 dark:bg-white/5 pb-2 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">
              {user.name}
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Mail className="h-3.5 w-3.5 mr-1 text-primary" />
              <span className="text-sm">{user.email}</span>
            </CardDescription>
          </div>
          <Avatar className="h-12 w-12 border-2 border-primary/30 shadow-sm">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <Badge
          variant="secondary"
          className="mt-2 w-fit bg-white/30 dark:bg-white/10 backdrop-blur-md text-foreground"
        >
          @{user.username}
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 space-y-3 text-foreground/90">
        <div className="flex items-center text-sm">
          <Building className="h-4 w-4 mr-2 text-primary" />
          <span className="font-medium">{user.company.name}</span>
        </div>

        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-primary" />
          <span>{user.phone}</span>
        </div>

        <div className="flex items-center text-sm">
          <Globe className="h-4 w-4 mr-2 text-primary" />
          <a
            href={`https://${user.website}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        </div>

        <div className="flex items-start text-sm">
          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary" />
          <span>
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </span>
        </div>
      </CardContent>

      <CardFooter className="border-t border-white/10 dark:border-white/5 bg-white/5 dark:bg-white/5 py-3 flex justify-between backdrop-blur-sm">
        <div className="text-xs text-foreground/70">ID: {user.id}</div>
        <div className="text-xs italic text-foreground/70">
          {user.company.catchPhrase}
        </div>
      </CardFooter>
    </Card>
  );
}
