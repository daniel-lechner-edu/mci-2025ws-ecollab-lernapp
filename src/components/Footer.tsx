export function Footer() {
  return (
    <footer className="border-t mt-12 py-6 text-center text-sm text-muted-foreground">
      <div className="max-w-4xl mx-auto px-6">
        <p className="mb-2">
          © {new Date().getFullYear()} MCI Flashcard App
        </p>
        <p className="mb-1">
          <strong>Development:</strong> Daniel Lechner, Simon Pfitscher
        </p>
        <p>
          <strong>Project Team:</strong> Daniel Lechner, Simon Pfitscher, Lisa Gnant, Thomas Mußhauser, Nitesh Singh
        </p>
      </div>
    </footer>
  );
}
