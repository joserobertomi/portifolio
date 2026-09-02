const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-foreground/10 px-6 py-8 text-center text-sm opacity-60">
      <p>© {new Date().getFullYear()} José Roberto. Todos os direitos reservados.</p>
    </footer>
  );
};

export { Footer };
