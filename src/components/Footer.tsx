export function Footer() {
  return (
    <footer className="bg-card border-t py-6">
      <div className="container mx-auto text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} UK Sugar Connect. All rights reserved.</p>
      </div>
    </footer>
  );
}
