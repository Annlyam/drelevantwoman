import { NextRequest, NextResponse } from 'next/server';
const books = [
  {
    id: "1",
    title: "Lean In: Women, Work, and the Will to Lead",
    author: "Sheryl Sandberg",
    description: "A landmark book about women and leadership that encourages women to pursue their ambitions.",
    category: "Leadership",
    level: "Beginner",
    image: "/assets/images/extras/mentorship_session.jpg",
    featured: true,
    isFree: true,
  },
  {
    id: "2",
    title: "The Confidence Code",
    author: "Katty Kay & Claire Shipman",
    description: "A deep dive into the nature of confidence and why women need more of it in the workplace.",
    category: "Personal Development",
    level: "Beginner",
    image: "/assets/images/extras/empowerment_workshop.jpg",
    featured: false,
    isFree: false,
    price: 15,
  },
  {
    id: "3",
    title: "Girl, Stop Apologizing",
    author: "Rachel Hollis",
    description: "A shame-free plan for embracing and achieving your goals.",
    category: "Motivation",
    level: "Beginner",
    image: "/assets/images/extras/collaborative_learning.jpg",
    featured: true,
    isFree: false,
    price: 12,
  },
  {
    id: "4",
    title: "Becoming",
    author: "Michelle Obama",
    description: "An intimate memoir by the former First Lady of the United States.",
    category: "Biography",
    level: "Intermediate",
    image: "/assets/images/extras/network_event.jpg",
    featured: false,
    isFree: false,
    price: 20,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isFree = searchParams.get('isFree');
    const search = searchParams.get('search');

    let filteredBooks = books;

    if (category) {
      filteredBooks = filteredBooks.filter(
        (b) => b.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (isFree === 'true') {
      filteredBooks = filteredBooks.filter((b) => b.isFree === true);
    }

    if (search) {
      filteredBooks = filteredBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      books: filteredBooks,
      total: filteredBooks.length,
    });
  } catch (error) {
    console.error('[Academy API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch academy content' },
      { status: 500 }
    );
  }
}

