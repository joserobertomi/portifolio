type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header>
      <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-sm opacity-70">{description}</p>
    </header>
  );
}
