import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen, SearchFilters } from './components/HomeScreen';
import { SearchResultsScreen } from './components/SearchResultsScreen';
import { PropertyDetailsScreen } from './components/PropertyDetailsScreen';
import { SavedListingsScreen } from './components/SavedListingsScreen';
import { ContactAgentScreen } from './components/ContactAgentScreen';
import { UserAccountScreen } from './components/UserAccountScreen';
import { MobileNavbar } from './components/MobileNavbar';
import { BottomNavigation, NavigationTab } from './components/BottomNavigation';
import { Footer } from './components/Footer';
import { Sheet, SheetContent } from './components/ui/sheet';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { Toaster } from './components/ui/sonner';
import { Home, Search, MapPin, TrendingUp, Building2, Phone, Mail, X } from 'lucide-react';
import { toast } from 'sonner';

type Screen = 
  | 'splash'
  | 'home'
  | 'search-results'
  | 'property-details'
  | 'saved-listings'
  | 'contact-agent'
  | 'user-account';

interface AppState {
  currentScreen: Screen;
  activeTab: NavigationTab;
  searchFilters: SearchFilters | null;
  selectedPropertyId: string | null;
  savedPropertyIds: Set<string>;
  showMobileMenu: boolean;
  showOnboarding: boolean;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'splash',
    activeTab: 'home',
    searchFilters: null,
    selectedPropertyId: null,
    savedPropertyIds: new Set(['2', '4']), // Pre-saved properties
    showMobileMenu: false,
    showOnboarding: true
  });

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const navigateTo = (screen: Screen, tab?: NavigationTab, additionalState?: Partial<AppState>) => {
    updateState({
      currentScreen: screen,
      activeTab: tab || state.activeTab,
      showMobileMenu: false,
      ...additionalState
    });
  };

  const handleStartExploring = () => {
    updateState({ currentScreen: 'home', showOnboarding: false });
  };

  const handleSearch = (filters: SearchFilters) => {
    navigateTo('search-results', 'search', { searchFilters: filters });
  };

  const handlePropertyClick = (propertyId: string) => {
    navigateTo('property-details', undefined, { selectedPropertyId: propertyId });
  };

  const handleSaveProperty = (propertyId: string) => {
    const newSavedIds = new Set(state.savedPropertyIds);
    if (newSavedIds.has(propertyId)) {
      newSavedIds.delete(propertyId);
      toast.success('Property removed from saved items');
    } else {
      newSavedIds.add(propertyId);
      toast.success('Property saved successfully');
    }
    updateState({ savedPropertyIds: newSavedIds });
  };

  const handleQuickAction = (action: 'rent' | 'buy' | 'map' | 'invest') => {
    const filters: SearchFilters = {
      propertyType: action === 'rent' || action === 'buy' ? 'apartment' : '',
      bedrooms: '',
      priceRange: ''
    };
    
    if (action === 'map') {
      toast.info('Map view would open here with all properties');
    } else if (action === 'invest') {
      toast.info('Investment insights would be displayed here');
    } else {
      handleSearch(filters);
    }
  };

  const handleContactAgent = () => {
    navigateTo('contact-agent');
  };

  const handleSendMessage = (data: any) => {
    toast.success('Message sent successfully! The agent will contact you soon.');
    navigateTo('property-details');
  };

  const handleTabChange = (tab: NavigationTab) => {
    switch (tab) {
      case 'home':
        navigateTo('home', tab);
        break;
      case 'search':
        navigateTo('search-results', tab, { searchFilters: { propertyType: '', bedrooms: '', priceRange: '' } });
        break;
      case 'saved':
        navigateTo('saved-listings', tab);
        break;
      case 'messages':
        toast.info('Messages feature would open here');
        break;
      case 'profile':
        navigateTo('user-account', tab);
        break;
    }
  };

  const renderMobileMenu = () => (
    <Sheet open={state.showMobileMenu} onOpenChange={(open: boolean) => updateState({ showMobileMenu: open })}>
      <SheetContent side="left" className="w-72">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-primary">Addis Property Rent</h2>
            <p className="text-sm text-muted-foreground">Find Your Perfect Home</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => updateState({ showMobileMenu: false })}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigateTo('home', 'home')}
          >
            <Home className="h-4 w-4 mr-3" />
            Home
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => handleSearch({ propertyType: 'apartment', bedrooms: '', priceRange: '' })}
          >
            <Building2 className="h-4 w-4 mr-3" />
            Rent Properties
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => handleSearch({ propertyType: 'house', bedrooms: '', priceRange: '' })}
          >
            <Building2 className="h-4 w-4 mr-3" />
            Buy Properties
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => toast.info('Map view would open here')}
          >
            <MapPin className="h-4 w-4 mr-3" />
            Map View
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => toast.info('Investment insights would open here')}
          >
            <TrendingUp className="h-4 w-4 mr-3" />
            Investment
          </Button>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigateTo('saved-listings', 'saved')}
          >
            <Search className="h-4 w-4 mr-3" />
            Saved Properties
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigateTo('user-account', 'profile')}
          >
            <Building2 className="h-4 w-4 mr-3" />
            My Account
          </Button>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-3">
          <div>
            <h3 className="font-medium mb-2">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+251 11 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@addisproperty.com</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  const renderCurrentScreen = () => {
    switch (state.currentScreen) {
      case 'splash':
        return <SplashScreen onStartExploring={handleStartExploring} />;
        
      case 'home':
        return (
          <HomeScreen
            onSearch={handleSearch}
            onPropertyClick={handlePropertyClick}
            onSaveProperty={handleSaveProperty}
            onQuickAction={handleQuickAction}
            onListProperty={() => toast.info('Property listing form would open here')}
          />
        );
        
      case 'search-results':
        return (
          <SearchResultsScreen
            filters={state.searchFilters || { propertyType: '', bedrooms: '', priceRange: '' }}
            onPropertyClick={handlePropertyClick}
            onSaveProperty={handleSaveProperty}
            onBack={() => navigateTo('home', 'home')}
          />
        );
        
      case 'property-details':
        return (
          <PropertyDetailsScreen
            propertyId={state.selectedPropertyId || '1'}
            onBack={() => window.history.length > 1 ? window.history.back() : navigateTo('home', 'home')}
            onContactAgent={handleContactAgent}
            onSave={handleSaveProperty}
            onShare={() => toast.success('Property link copied to clipboard')}
          />
        );
        
      case 'saved-listings':
        return (
          <SavedListingsScreen
            onPropertyClick={handlePropertyClick}
            onRemoveProperty={handleSaveProperty}
            onCreateAlert={() => toast.info('Alert creation form would open here')}
          />
        );
        
      case 'contact-agent':
        return (
          <ContactAgentScreen
            onBack={() => navigateTo('property-details')}
            onSendMessage={handleSendMessage}
          />
        );
        
      case 'user-account':
        return (
          <UserAccountScreen
            onLogin={() => toast.info('Login form would open here')}
            onRegister={() => toast.info('Registration form would open here')}
            onEditProfile={() => toast.info('Profile editing form would open here')}
            onSettings={() => toast.info('Settings page would open here')}
            onSavedListings={() => navigateTo('saved-listings', 'saved')}
            onSearchHistory={() => toast.info('Search history would be displayed here')}
            onNotifications={() => toast.info('Notifications page would open here')}
            onHelp={() => toast.info('Help & support page would open here')}
            onLogout={() => {
              toast.success('Logged out successfully');
              navigateTo('home', 'home');
            }}
          />
        );
        
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header - Show only when not on splash screen */}
      {state.currentScreen !== 'splash' && (
        <div className="md:hidden">
          <MobileNavbar
            onMenuClick={() => updateState({ showMobileMenu: true })}
            onSearchClick={() => navigateTo('search-results', 'search')}
            onNotificationClick={() => toast.info('Notifications would open here')}
            onProfileClick={() => navigateTo('user-account', 'profile')}
            notificationCount={3}
          />
        </div>
      )}

      {/* Main Content */}
      <main className={state.currentScreen !== 'splash' ? 'md:pl-0' : ''}>
        {renderCurrentScreen()}
        
        {/* Footer - Show on all screens except splash */}
        {state.currentScreen !== 'splash' && <Footer />}
      </main>

      {/* Bottom Navigation - Mobile Only */}
      {state.currentScreen !== 'splash' && (
        <BottomNavigation
          activeTab={state.activeTab}
          onTabChange={handleTabChange}
          messageCount={2}
        />
      )}

      {/* Mobile Menu Drawer */}
      {renderMobileMenu()}

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}