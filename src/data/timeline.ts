export interface TimelineEvent {
  title: string;
  description: string;
}

export interface TimelineYear {
  year: number;
  events: TimelineEvent[];
}

export const timeline: TimelineYear[] = [
  {
    year: 2019,
    events: [
      {
        title: "Lorem ipsum dolor sit amet",
        description:
          "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  },
  {
    year: 2020,
    events: [
      {
        title: "Ut enim ad minim veniam",
        description:
          "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        title: "Duis aute irure dolor",
        description:
          "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
    ],
  },
  {
    year: 2021,
    events: [
      {
        title: "Excepteur sint occaecat",
        description:
          "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
  },
  {
    year: 2022,
    events: [
      {
        title: "Sed ut perspiciatis unde",
        description:
          "Omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      },
      {
        title: "Eaque ipsa quae ab illo",
        description:
          "Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
    ],
  },
  {
    year: 2023,
    events: [
      {
        title: "Nemo enim ipsam voluptatem",
        description:
          "Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
      },
    ],
  },
  {
    year: 2024,
    events: [
      {
        title: "Neque porro quisquam est",
        description:
          "Qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.",
      },
      {
        title: "Ut labore et dolore magnam",
        description:
          "Aliquam quaerat voluptatem, ut enim ad minima veniam, quis nostrum exercitationem ullam.",
      },
    ],
  },
  {
    year: 2025,
    events: [
      {
        title: "Corporis suscipit laboriosam",
        description:
          "Nisi ut aliquid ex ea commodi consequatur, quis autem vel eum iure reprehenderit.",
      },
    ],
  },
];
