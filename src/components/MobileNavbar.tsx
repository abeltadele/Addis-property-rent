import { Menu, Search, Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MobileNavbarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onNotificationClick: () => void;
  onProfileClick: () => void;
  notificationCount?: number;
}

export function MobileNavbar({ 
  onMenuClick, 
  onSearchClick, 
  onNotificationClick, 
  onProfileClick,
  notificationCount = 0 
}: MobileNavbarProps) {
  return (
    <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-6 w-6 text-primary" />
        </Button>
        <div className="ml-3">
          <h1 className="text-lg font-bold text-primary">Addis Property Rent</h1>
          <p className="text-xs text-muted-foreground">Find Your Home</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onSearchClick}>
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        <Button variant="ghost" size="icon" className="relative" onClick={onNotificationClick}>
          <Bell className="h-5 w-5 text-muted-foreground" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-white">
              {notificationCount > 9 ? '9+' : notificationCount}
            </Badge>
          )}
        </Button>
        
        <Button variant="ghost" size="icon" onClick={onProfileClick}>
          <User className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}