import { useState } from 'react';
import { ArrowLeft, Phone, MessageSquare, Star, Shield, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ContactAgentScreenProps {
  onBack: () => void;
  onSendMessage: (data: ContactFormData) => void;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const mockAgent = {
  id: '1',
  name: 'Sarah Tekle',
  rating: 4.8,
  verified: true,
  phone: '+251911234567',
  email: 'sarah@addisproperty.com',
  imageUrl: 'https://images.unsplash.com/photo-1689013398932-b576a11e07a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBldGhpb3BpYW58ZW58MXx8fHwxNzU2OTkxMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  totalProperties: 47,
  yearsExperience: 8,
  specialties: ['Residential Rentals', 'Commercial Sales', 'Investment Properties'],
  responseTime: 'Within 2 hours',
  languages: ['English', 'Amharic', 'Oromo']
};

export function ContactAgentScreen({ onBack, onSendMessage }: ContactAgentScreenProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: 'Hi, I\'m interested in learning more about this property. Please contact me with additional details.'
  });

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSendMessage(formData);
    setIsSending(false);
  };

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-medium">Contact Agent</h1>
            <p className="text-sm text-muted-foreground">Get in touch with {mockAgent.name}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Agent Profile */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <ImageWithFallback
                src={mockAgent.imageUrl}
                alt={mockAgent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-medium text-lg">{mockAgent.name}</h2>
                  {mockAgent.verified && (
                    <Badge className="bg-success text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{mockAgent.rating} • {mockAgent.totalProperties} properties</span>
                </div>
                <p className="text-sm text-muted-foreground">{mockAgent.yearsExperience} years experience</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-sm font-medium">{mockAgent.responseTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Languages</p>
                <p className="text-sm font-medium">{mockAgent.languages.join(', ')}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {mockAgent.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                asChild
              >
                <a href={`tel:${mockAgent.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 bg-success/10 border-success text-success hover:bg-success hover:text-white"
                asChild
              >
                <a href={`https://wa.me/${mockAgent.phone.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateFormData('message', e.target.value)}
                  placeholder="Tell the agent what you're looking for..."
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSending}>
                {isSending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-3 text-center">
              By sending this message, you agree to be contacted by the agent via email, phone, or messaging apps.
            </p>
          </CardContent>
        </Card>

        {/* Alternative Contact Methods */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Other Ways to Connect</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">Direct Phone</p>
                  <p className="text-sm text-muted-foreground">{mockAgent.phone}</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href={`tel:${mockAgent.phone}`}>Call</a>
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <p className="text-sm text-muted-foreground">{mockAgent.email}</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href={`mailto:${mockAgent.email}`}>Email</a>
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Instant messaging available</p>
                </div>
                <Button size="sm" className="bg-success hover:bg-success/90" asChild>
                  <a href={`https://wa.me/${mockAgent.phone.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                    Chat
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}