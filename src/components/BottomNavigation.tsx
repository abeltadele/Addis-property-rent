import { Home, Search, Heart, MessageCircle, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export type NavigationTab = 'home' | 'search' | 'saved' | 'messages' | 'profile';

interface BottomNavigationProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  messageCount?: number;
}

export function BottomNavigation({ activeTab, onTabChange, messageCount = 0 }: BottomNavigationProps) {
  const tabs = [
    { id: 'home' as NavigationTab, icon: Home, label: 'Home' },
    { id: 'search' as NavigationTab, icon: Search, label: 'Search' },
    { id: 'saved' as NavigationTab, icon: Heart, label: 'Saved' },
    { id: 'messages' as NavigationTab, icon: MessageCircle, label: 'Messages', count: messageCount },
    { id: 'profile' as NavigationTab, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-2 py-2 md:hidden">
      <div className="flex items-center justify-around">
        {tabs.map(({ id, icon: Icon, label, count }) => (
          <Button
            key={id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 h-auto ${
              activeTab === id 
                ? 'text-primary bg-primary/10' 
                : 'text-muted-foreground hover:text-primary'
            }`}
            onClick={() => onTabChange(id)}
          >
            <div className="relative">
              <Icon className="h-5 w-5" />
              {count && count > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs bg-accent text-white">
                  {count > 9 ? '9+' : count}
                </Badge>
              )}
            </div>
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}