import { useState } from 'react';
import { Search, MapPin, Building2, TrendingUp, Banknote, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PropertyCard, Property } from './PropertyCard';

interface HomeScreenProps {
  onSearch: (filters: SearchFilters) => void;
  onPropertyClick: (id: string) => void;
  onSaveProperty: (id: string) => void;
  onQuickAction: (action: 'rent' | 'buy' | 'map' | 'invest') => void;
  onListProperty: () => void;
}

export interface SearchFilters {
  propertyType: string;
  bedrooms: string;
  priceRange: string;
  location?: string;
}

const mockFeaturedProperties: Property[] = [
  {
    id: '1',
    title: 'Modern 2BR Apartment in Bole',
    price: 35000,
    priceUSD: 650,
    currency: 'ETB',
    location: 'Bole, Addis Ababa',
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    imageUrl: 'https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybiUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU2OTkxMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    isVerified: true,
    isFurnished: true,
    isSaved: false,
    type: 'rent'
  },
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
    id: '3',
    title: '3BR Apartment in Piassa',
    price: 28000,
    priceUSD: 520,
    currency: 'ETB',
    location: 'Piassa, Addis Ababa',
    bedrooms: 3,
    bathrooms: 2,
    size: 150,
    imageUrl: 'https://images.unsplash.com/photo-1756148455703-2b883d5308d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV0aGlvcGlhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTY5OTEyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isVerified: false,
    isFurnished: true,
    isSaved: false,
    type: 'rent'
  }
];

export function HomeScreen({ onSearch, onPropertyClick, onSaveProperty, onQuickAction, onListProperty }: HomeScreenProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    propertyType: '',
    bedrooms: '',
    priceRange: ''
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-background pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1741991110666-88115e724741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGRpcyUyMGFiYWJhJTIwZXRoaW9waWElMjBza3lsaW5lJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc1Njk5MTI1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Addis Ababa Skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-6 left-4 right-4 z-10">
          <h2 className="text-white text-2xl font-bold mb-2">Find Your Perfect Home</h2>
          <p className="text-white/90 text-sm mb-4">Discover quality properties across Addis Ababa</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 -mt-8 relative z-20 mb-6">
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-2">
              <Select value={filters.propertyType} onValueChange={(value) => setFilters({...filters, propertyType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.bedrooms} onValueChange={(value) => setFilters({...filters, bedrooms: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4+">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-20000">ETB 0 - 20,000</SelectItem>
                  <SelectItem value="20000-40000">ETB 20,000 - 40,000</SelectItem>
                  <SelectItem value="40000-80000">ETB 40,000 - 80,000</SelectItem>
                  <SelectItem value="80000+">ETB 80,000+</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={handleSearch} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary"
            onClick={() => onQuickAction('rent')}
          >
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-sm">Rent</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-accent/10 hover:border-accent"
            onClick={() => onQuickAction('buy')}
          >
            <Banknote className="h-6 w-6 text-accent" />
            <span className="text-sm">Buy</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-success/10 hover:border-success"
            onClick={() => onQuickAction('map')}
          >
            <MapPin className="h-6 w-6 text-success" />
            <span className="text-sm">Map</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-amber-500/10 hover:border-amber-500"
            onClick={() => onQuickAction('invest')}
          >
            <TrendingUp className="h-6 w-6 text-amber-500" />
            <span className="text-sm">Invest</span>
          </Button>
        </div>
      </div>

      {/* Featured Listings */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Featured Properties</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
          {mockFeaturedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSave={onSaveProperty}
              onClick={onPropertyClick}
            />
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="px-4 mb-6">
        <Card className="bg-gradient-to-r from-primary to-accent text-white">
          <CardContent className="p-6 text-center">
            <h3 className="font-medium mb-2">List Your Property Today</h3>
            <p className="text-white/90 text-sm mb-4">Reach thousands of potential tenants and buyers</p>
            <Button 
              onClick={onListProperty}
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90"
            >
              List Property
            </Button>
          </CardContent>
        </Card>
      </div>


    </div>
  );
}