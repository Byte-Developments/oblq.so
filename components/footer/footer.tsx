import { SocialLinks } from "./social-links";
import { FooterLinks } from "./footer-links";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center sm:items-start gap-4">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Modern Utilities
            </h2>
            <FooterLinks />
          </div>
          <div className="flex flex-col items-center sm:items-end gap-4">
            <SocialLinks />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Modern Utilities. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}