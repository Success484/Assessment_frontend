const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ELD Trip Planner. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
