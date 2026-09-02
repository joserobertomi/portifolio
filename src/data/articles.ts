export interface Article {
  slug: string;
  title: string;
  date: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "lorem-ipsum-dolor-sit-amet",
    title: "Lorem ipsum dolor sit amet",
    date: "2025-01-12",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
  },
  {
    slug: "consectetur-adipiscing-elit",
    title: "Consectetur adipiscing elit",
    date: "2025-04-03",
    content: [
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    ],
  },
  {
    slug: "sed-do-eiusmod-tempor",
    title: "Sed do eiusmod tempor incididunt",
    date: "2025-06-21",
    content: [
      "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    ],
  },
  {
    slug: "ut-labore-et-dolore",
    title: "Ut labore et dolore magnam aliquam",
    date: "2025-08-09",
    content: [
      "Quaerat voluptatem, ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      "Nisi ut aliquid ex ea commodi consequatur, quis autem vel eum iure reprehenderit qui in ea voluptate.",
    ],
  },
];
