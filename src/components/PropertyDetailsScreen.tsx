import { useState } from 'react';
import { ArrowLeft, Heart, Share2, Phone, MessageSquare, MapPin, Bed, Bath, Square, Wifi, Car, Waves, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Property } from './PropertyCard';

interface PropertyDetailsScreenProps {
  propertyId: string;
  onBack: () => void;
  onContactAgent: () => void;
  onSave: (id: string) => void;
  onShare: () => void;
}

const mockProperty: Property & {
  description: string;
  amenities: string[];
  images: string[];
  agent: {
    name: string;
    rating: number;
    verified: boolean;
    phone: string;
    imageUrl: string;
    totalProperties: number;
  };
} = {
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
  type: 'rent',
  description: 'Beautiful modern apartment located in the heart of Bole, one of Addis Ababa\'s most prestigious neighborhoods. This spacious 2-bedroom unit features contemporary design, high-quality finishes, and stunning city views. Perfect for professionals and expatriates looking for comfort and convenience.',
  amenities: ['High-speed WiFi', 'Parking', 'Swimming Pool', '24/7 Security', 'Gym Access', 'Balcony', 'Air Conditioning', 'Furnished'],
  images: [
    'https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBpbnRlcmlvciUyMG1vZGVybiUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU2OTkxMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1756148455703-2b883d5308d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV0aGlvcGlhbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTY5OTEyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1747752419686-e7f957e1fa18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGhvdXNlJTIwYWZyaWNhbiUyMG1vZGVybnxlbnwxfHx8fDE3NTY5OTEyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  agent: {
    name: 'Sarah Tekle',
    rating: 4.8,
    verified: true,
    phone: '+251911234567',
    imageUrl: 'https://images.unsplash.com/photo-1689013398932-b576a11e07a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBldGhpb3BpYW58ZW58MXx8fHwxNzU2OTkxMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    totalProperties: 47
  }
};

export function PropertyDetailsScreen({ propertyId, onBack, onContactAgent, onSave, onShare }: PropertyDetailsScreenProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCurrency, setShowCurrency] = useState<'ETB' | 'USD'>('ETB');

  const property = mockProperty;
  const price = showCurrency === 'ETB' ? property.price : property.priceUSD;
  const currencySymbol = showCurrency === 'ETB' ? 'ETB' : '$';

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'high-speed wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'swimming pool': return <Waves className="h-4 w-4" />;
      case '24/7 security': return <Shield className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-border sticky top-0 z-40">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onShare}>
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onSave(property.id)}>
            <Heart className={`h-5 w-5 ${property.isSaved ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="h-64 md:h-80 relative overflow-hidden">
          <ImageWithFallback
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          {property.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isVerified && (
            <Badge className="bg-success text-white">Verified</Badge>
          )}
          {property.isFurnished && (
            <Badge variant="secondary">Furnished</Badge>
          )}
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Property Info */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h1 className="font-bold text-xl mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-6 px-2 text-xs ${showCurrency === 'ETB' ? 'bg-primary text-white' : ''}`}
                    onClick={() => setShowCurrency('ETB')}
                  >
                    ETB
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-6 px-2 text-xs ${showCurrency === 'USD' ? 'bg-primary text-white' : ''}`}
                    onClick={() => setShowCurrency('USD')}
                  >
                    USD
                  </Button>
                </div>
                <div className="text-xl font-bold text-primary">
                  {currencySymbol} {price.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  /{property.type === 'rent' ? 'month' : 'total'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center text-muted-foreground">
                <Bed className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Bath className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Square className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.size}m²</span>
              </div>
            </div>

            <Separator className="mb-4" />

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{property.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {getAmenityIcon(amenity) || <div className="h-4 w-4 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                  </div>}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Property Agent</h3>
            <div className="flex items-center gap-3 mb-4">
              <ImageWithFallback
                src={property.agent.imageUrl}
                alt={property.agent.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{property.agent.name}</h4>
                  {property.agent.verified && (
                    <Badge variant="outline" className="text-xs">Verified</Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  ⭐ {property.agent.rating} • {property.agent.totalProperties} properties
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={onContactAgent} className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Agent
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={`tel:${property.agent.phone}`}>
                  <Phone className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Contact Button */}
      <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-30">
        <div className="flex gap-3">
          <Button onClick={() => window.open(`https://wa.me/${property.agent.phone.replace('+', '')}`, '_blank')} className="flex-1 bg-success hover:bg-success/90">
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
          <Button onClick={onContactAgent} className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
}