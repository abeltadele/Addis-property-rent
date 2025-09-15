import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-12 mb-20 md:mb-0">
      {/* Market Stats Section */}
      <div className="px-4 py-8 border-b border-primary-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-medium mb-4 text-center text-primary-foreground">Market Overview</h3>
          <div className="grid grid-cols-3 gap-3 md:gap-6">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary-foreground mb-1">1,250+</div>
                <div className="text-xs text-primary-foreground/70">Active Listings</div>
              </CardContent>
            </Card>
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">ETB 32K</div>
                <div className="text-xs text-primary-foreground/70">Avg. Rent/Month</div>
              </CardContent>
            </Card>
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">95%</div>
                <div className="text-xs text-primary-foreground/70">Customer Satisfaction</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <h3 className="font-bold text-lg mb-4">Addis Property Rent</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Your trusted partner in finding the perfect home in Addis Ababa. 
                We connect tenants with quality properties across the city.
              </p>
              <div className="flex space-x-3">
                <Facebook className="h-5 w-5 text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors" />
                <Linkedin className="h-5 w-5 text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Rent Properties</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Buy Properties</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">List Your Property</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Saved Properties</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Search Map</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Property Management</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Investment Consulting</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Market Analysis</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Legal Support</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Property Valuation</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-medium mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-primary-foreground/60" />
                  <span className="text-primary-foreground/80">
                    Bole Road, Atlas Building<br />
                    3rd Floor, Addis Ababa
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary-foreground/60" />
                  <span className="text-primary-foreground/80">+251 11 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary-foreground/60" />
                  <span className="text-primary-foreground/80">hello@addisproperty.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="px-4 py-4 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/70">
            <p>&copy; 2024 Addis Property Rent. All rights reserved.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}