import { useState } from 'react';
import { User, Settings, Bell, Heart, Search, LogOut, Edit, Shield, HelpCircle, MessageSquare, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';

interface UserAccountScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onEditProfile: () => void;
  onSettings: () => void;
  onSavedListings: () => void;
  onSearchHistory: () => void;
  onNotifications: () => void;
  onHelp: () => void;
  onLogout: () => void;
}

const mockUser = {
  name: 'Abebe Kebede',
  email: 'abebe.kebede@email.com',
  phone: '+251911123456',
  profileImage: 'https://images.unsplash.com/photo-1689013398932-b576a11e07a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBldGhpb3BpYW58ZW58MXx8fHwxNzU2OTkxMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  joinDate: 'March 2024',
  savedProperties: 5,
  recentSearches: 12,
  notifications: 3,
  isVerified: true
};

const activityStats = [
  { label: 'Properties Viewed', value: '47' },
  { label: 'Saved Properties', value: mockUser.savedProperties.toString() },
  { label: 'Inquiries Sent', value: '8' },
  { label: 'Recent Searches', value: mockUser.recentSearches.toString() },
];

export function UserAccountScreen({ 
  onLogin, 
  onRegister, 
  onEditProfile, 
  onSettings, 
  onSavedListings, 
  onSearchHistory, 
  onNotifications, 
  onHelp, 
  onLogout 
}: UserAccountScreenProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock logged in state
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-xl">Welcome to Addis Property Rent</CardTitle>
            <p className="text-sm text-muted-foreground">Sign in to save properties and get personalized recommendations</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => setIsLoggedIn(true)} className="w-full">
              Sign In
            </Button>
            <Button onClick={() => setIsLoggedIn(true)} variant="outline" className="w-full">
              Create Account
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-white/20">
            <AvatarImage src={mockUser.profileImage} alt={mockUser.name} />
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {mockUser.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-bold text-xl">{mockUser.name}</h1>
              {mockUser.isVerified && (
                <Badge className="bg-success text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-white/90 text-sm">{mockUser.email}</p>
            <p className="text-white/70 text-xs">Member since {mockUser.joinDate}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onEditProfile}>
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Activity Stats */}
        <Card className="mb-6 -mt-8 relative z-10 shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Your Activity</h3>
            <div className="grid grid-cols-2 gap-4">
              {activityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={onSavedListings}>
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm">Saved Properties</span>
                {mockUser.savedProperties > 0 && (
                  <Badge variant="secondary" className="text-xs">{mockUser.savedProperties}</Badge>
                )}
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={onSearchHistory}>
                <Search className="h-5 w-5 text-accent" />
                <span className="text-sm">Search History</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={onNotifications}>
                <Bell className="h-5 w-5 text-amber-500" />
                <span className="text-sm">Notifications</span>
                {mockUser.notifications > 0 && (
                  <Badge variant="destructive" className="text-xs">{mockUser.notifications}</Badge>
                )}
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={onHelp}>
                <MessageSquare className="h-5 w-5 text-success" />
                <span className="text-sm">Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Alert */}
        {mockUser.notifications > 0 && (
          <Alert className="mb-6 border-accent/20 bg-accent/5">
            <Bell className="h-4 w-4" />
            <AlertDescription>
              You have {mockUser.notifications} new notification{mockUser.notifications > 1 ? 's' : ''}. 
              <Button variant="link" className="p-0 ml-1 h-auto font-medium text-accent" onClick={onNotifications}>
                View all
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Settings */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">Toggle dark theme</p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Get notified about new properties</p>
                  </div>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Options */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="divide-y">
              <button 
                onClick={onEditProfile}
                className="flex items-center gap-3 p-4 w-full text-left hover:bg-muted transition-colors"
              >
                <Edit className="h-5 w-5 text-muted-foreground" />
                <span>Edit Profile</span>
              </button>
              
              <button 
                onClick={onSettings}
                className="flex items-center gap-3 p-4 w-full text-left hover:bg-muted transition-colors"
              >
                <Settings className="h-5 w-5 text-muted-foreground" />
                <span>Account Settings</span>
              </button>
              
              <button 
                onClick={onHelp}
                className="flex items-center gap-3 p-4 w-full text-left hover:bg-muted transition-colors"
              >
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                <span>Help & Support</span>
              </button>
              
              <button 
                onClick={onLogout}
                className="flex items-center gap-3 p-4 w-full text-left hover:bg-destructive/5 text-destructive transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Addis Property Rent</p>
            <p className="text-xs text-muted-foreground">Version 1.0.0 • Made with ❤️ in Ethiopia</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}