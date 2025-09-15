import { useState } from 'react';
import { Filter, Map, List, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { PropertyCard, Property } from './PropertyCard';
import { SearchFilters } from './HomeScreen';

interface SearchResultsScreenProps {
  filters: SearchFilters;
  onPropertyClick: (id: string) => void;
  onSaveProperty: (id: string) => void;
  onBack: () => void;
}

const mockSearchResults: Property[] = [
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
  },
  {
    id: '5',
    title: 'Luxury Penthouse Bole Medhanialem',
    price: 85000,
    priceUSD: 1580,
    currency: 'ETB',
    location: 'Bole Medhanialem, Addis Ababa',
    bedrooms: 4,
    bathrooms: 3,
    size: 250,
    imageUrl: 'https://images.unsplash.com/photo-1747752419686-e7f957e1fa18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGhvdXNlJTIwYWZyaWNhbiUyMG1vZGVybnxlbnwxfHx8fDE3NTY5OTEyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isVerified: true,
    isFurnished: true,
    isSaved: false,
    type: 'rent'
  },
  {
    id: '6',
    title: 'Cozy 1BR Studio Piassa',
    price: 18000,
    priceUSD: 335,
    currency: 'ETB',
    location: 'Piassa, Addis Ababa',
    bedrooms: 1,
    bathrooms: 1,
    size: 65,
    imageUrl: 'https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybiUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU2OTkxMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    isVerified: false,
    isFurnished: true,
    isSaved: false,
    type: 'rent'
  },
  {
    id: '7',
    title: 'Family House in Kirkos',
    price: 55000,
    priceUSD: 1025,
    currency: 'ETB',
    location: 'Kirkos, Addis Ababa',
    bedrooms: 3,
    bathrooms: 3,
    size: 200,
    imageUrl: 'https://images.unsplash.com/photo-1756148455703-2b883d5308d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV0aGlvcGlhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTY5OTEyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isVerified: true,
    isFurnished: false,
    isSaved: false,
    type: 'rent'
  }
];

export function SearchResultsScreen({ filters, onPropertyClick, onSaveProperty, onBack }: SearchResultsScreenProps) {
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [sortBy, setSortBy] = useState('price-low');

  const resultCount = mockSearchResults.length;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-medium">Search Results</h1>
            <p className="text-sm text-muted-foreground">{resultCount} properties found</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewType === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('map')}
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          {filters.propertyType && (
            <Badge variant="secondary">
              {filters.propertyType}
            </Badge>
          )}
          {filters.bedrooms && (
            <Badge variant="secondary">
              {filters.bedrooms} bedroom{filters.bedrooms !== '1' ? 's' : ''}
            </Badge>
          )}
          {filters.priceRange && (
            <Badge variant="secondary">
              ETB {filters.priceRange}
            </Badge>
          )}
        </div>

        {/* Filter and Sort */}
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filter Properties</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bole">Bole</SelectItem>
                      <SelectItem value="piassa">Piassa</SelectItem>
                      <SelectItem value="kazanchis">Kazanchis</SelectItem>
                      <SelectItem value="cmc">CMC</SelectItem>
                      <SelectItem value="kirkos">Kirkos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Furnished</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furnished">Furnished</SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Verified Only</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All properties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verified">Verified only</SelectItem>
                      <SelectItem value="all">All properties</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      {viewType === 'list' ? (
        <div className="px-4 py-4">
          <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
            {mockSearchResults.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSave={onSaveProperty}
                onClick={onPropertyClick}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-screen bg-gray-200 flex items-center justify-center">
          <Card className="w-80">
            <CardContent className="p-6 text-center">
              <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Map View</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Interactive map with property markers would be displayed here.
              </p>
              <Button onClick={() => setViewType('list')} variant="outline">
                Return to List View
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}