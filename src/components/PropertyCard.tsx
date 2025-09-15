import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export interface Property {
  id: string;
  title: string;
  price: number;
  priceUSD: number;
  currency: 'ETB' | 'USD';
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  imageUrl: string;
  isVerified: boolean;
  isFurnished: boolean;
  isSaved: boolean;
  type: 'rent' | 'buy';
}

interface PropertyCardProps {
  property: Property;
  onSave: (id: string) => void;
  onClick: (id: string) => void;
  showCurrency?: 'ETB' | 'USD';
}

export function PropertyCard({ property, onSave, onClick, showCurrency = 'ETB' }: PropertyCardProps) {
  const price = showCurrency === 'ETB' ? property.price : property.priceUSD;
  const currencySymbol = showCurrency === 'ETB' ? 'ETB' : '$';

  return (
    <Card className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg" onClick={() => onClick(property.id)}>
      <div className="relative">
        <ImageWithFallback
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onSave(property.id);
          }}
        >
          <Heart className={`h-4 w-4 ${property.isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
        <div className="absolute top-2 left-2 flex gap-2">
          {property.isVerified && (
            <Badge className="bg-success text-white">Verified</Badge>
          )}
          {property.isFurnished && (
            <Badge variant="secondary">Furnished</Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-foreground line-clamp-1">{property.title}</h3>
          <div className="text-lg font-bold text-primary">
            {currencySymbol} {price.toLocaleString()}
            <span className="text-sm text-muted-foreground ml-1">
              /{property.type === 'rent' ? 'month' : 'total'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.size}m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}