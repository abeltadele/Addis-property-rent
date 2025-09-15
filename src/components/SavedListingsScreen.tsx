import { useState } from 'react';
import { Heart, Search, Bell, Trash2, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { PropertyCard, Property } from './PropertyCard';

interface SavedListingsScreenProps {
  onPropertyClick: (id: string) => void;
  onRemoveProperty: (id: string) => void;
  onCreateAlert: () => void;
}

const mockSavedProperties: Property[] = [
  {
    id: '2',
    title: 'Luxury Villa in Kazanchis',
    price: 2500000,
    priceUSD: 46500,
    currency: 'ETB',
    location: 'Kazanchis, Addis Ababa',
    bedrooms: 4,
    bathrooms: 3,
    size: 350,
    imageUrl: 'https://images.unsplash.com/photo-1747752419686-e7f957e1fa18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGhvdXNlJTIwYWZyaWNhbiUyMG1vZGVybnxlbnwxfHx8fDE3NTY5OTEyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isVerified: true,
    isFurnished: false,
    isSaved: true,
    type: 'buy'
  },
  {
    id: '4',
    title: 'Spacious 3BR in CMC',
    price: 42000,
    priceUSD: 780,
    currency: 'ETB',
    location: 'CMC, Addis Ababa',
    bedrooms: 3,
    bathrooms: 2,
    size: 180,
    imageUrl: 'https://images.unsplash.com/photo-1756148455703-2b883d5308d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV0aGlvcGlhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTY5OTEyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isVerified: true,
    isFurnished: false,
    isSaved: true,
    type: 'rent'
  }
];

const mockAlerts = [
  {
    id: '1',
    title: 'New 2BR Apartments in Bole',
    criteria: '2 Bedrooms • Bole • ETB 25,000 - 40,000',
    frequency: 'Daily',
    newMatches: 3
  },
  {
    id: '2',
    title: 'Luxury Properties in Kazanchis',
    criteria: 'Luxury • Kazanchis • ETB 80,000+',
    frequency: 'Weekly',
    newMatches: 0
  }
];

export function SavedListingsScreen({ onPropertyClick, onRemoveProperty, onCreateAlert }: SavedListingsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'saved' | 'alerts'>('saved');

  const filteredProperties = mockSavedProperties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-4 sticky top-0 z-40">
        <h1 className="font-bold text-xl mb-3">Saved & Alerts</h1>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-3">
          <Button
            variant={activeTab === 'saved' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('saved')}
            className="flex-1"
          >
            <Heart className="h-4 w-4 mr-2" />
            Saved ({mockSavedProperties.length})
          </Button>
          <Button
            variant={activeTab === 'alerts' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('alerts')}
            className="flex-1"
          >
            <Bell className="h-4 w-4 mr-2" />
            Alerts ({mockAlerts.length})
          </Button>
        </div>

        {/* Search */}
        {activeTab === 'saved' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search saved properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}
      </div>

      <div className="px-4 py-4">
        {activeTab === 'saved' ? (
          <>
            {/* Empty State */}
            {filteredProperties.length === 0 && searchQuery === '' && (
              <Card className="text-center py-12">
                <CardContent>
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Saved Properties</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start browsing and save properties you're interested in
                  </p>
                  <Button onClick={() => window.history.back()}>
                    Browse Properties
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Search Results Empty State */}
            {filteredProperties.length === 0 && searchQuery !== '' && (
              <Card className="text-center py-8">
                <CardContent>
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Results Found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search terms
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Saved Properties List */}
            {filteredProperties.length > 0 && (
              <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSave={onRemoveProperty}
                    onClick={onPropertyClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Create Alert CTA */}
            <Card className="mb-4 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
              <CardContent className="p-4 text-center">
                <Bell className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-medium mb-2">Get Notified of New Properties</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Set up alerts based on your preferences and never miss a great property
                </p>
                <Button onClick={onCreateAlert} className="bg-accent hover:bg-accent/90">
                  <Bell className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
              </CardContent>
            </Card>

            {/* Active Alerts */}
            {mockAlerts.length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-medium">Active Alerts</h3>
                {mockAlerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{alert.title}</h4>
                            {alert.newMatches > 0 && (
                              <Badge className="bg-accent text-white">
                                {alert.newMatches} new
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.criteria}</p>
                          <p className="text-xs text-muted-foreground">Frequency: {alert.frequency}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      
                      {alert.newMatches > 0 && (
                        <Alert className="mt-3 border-accent/20 bg-accent/5">
                          <Bell className="h-4 w-4" />
                          <AlertDescription>
                            {alert.newMatches} new propert{alert.newMatches > 1 ? 'ies' : 'y'} match your criteria. 
                            <Button variant="link" className="p-0 ml-1 h-auto font-medium text-accent">
                              View matches
                            </Button>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Active Alerts</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create alerts to get notified about new properties that match your criteria
                  </p>
                  <Button onClick={onCreateAlert}>
                    <Bell className="h-4 w-4 mr-2" />
                    Create Your First Alert
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}