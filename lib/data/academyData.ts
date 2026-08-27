import { Book } from "@/components/academy/BookCard";
import { Program } from "@/components/academy/ProgramCard";

export const booksData: any[] = [];

export const programsData: Program[] = [
  {
    id: "rwa-program",
    title: "The Relevant Woman Academy (RWA)",
    description:
      "A flagship personal development program designed to help young women master self-leadership, find clarity on their career calling, and build key communication capabilities.",
    instructor: {
      name: "Iveren Ann Lyam",
      image:
        "/assets/images/team/iveren_ann_lyam_founder_the_relevant_woman.jpg",
    },
    duration: "12 Weeks",
    level: "Intermediate",
    rating: 4.9,
    reviews: 240,
    price: 0,
    category: "Academy",
    categoryColor: "#3a225c",
    categoryIcon: "Award",
    image: "/assets/images/extras/RWA_Academy.jpg",
    featured: true,
  }
];
