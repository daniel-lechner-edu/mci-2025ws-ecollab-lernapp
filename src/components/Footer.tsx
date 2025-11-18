export function Footer() {
  return (
    <footer className="border-t mt-12 py-8 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 text-center text-sm text-muted-foreground">
        <p className="mb-3">
          © {new Date().getFullYear()} MCI Flashcard App
        </p>
        <p className="mb-2">
          <strong>Development:</strong> Daniel Lechner, Simon Pfitscher
        </p>
        <p className="mb-4">
          <strong>Project Team:</strong> Daniel Lechner, Simon Pfitscher, Lisa Gnant, Thomas Mußhauser, Nitesh Singh
        </p>
        <a
          href="https://github.com/daniel-lechner-edu/mci-ecollab-learn-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 hover:text-teal-700 underline"
        >
          View on GitHub
        </a>
      </div>
    </footer>
  );
}
