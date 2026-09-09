const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-foreground/10 px-6 pt-8 pb-24 text-center text-sm opacity-60 sm:pb-8">
      <p>© {new Date().getFullYear()} José Roberto. Todos os direitos reservados.</p>
    </footer>
  );
};

export { Footer };
