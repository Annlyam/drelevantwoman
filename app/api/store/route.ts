import { NextRequest, NextResponse } from 'next/server';
const products = [
  {
    id: "1",
    title: "Leadership Foundations for Young Women",
    description: "Build essential leadership skills and confidence to lead with purpose and impact.",
    instructor: { name: "Iveren Ann Lyam" },
    duration: "8 hours",
    level: "Beginner",
    rating: 4.8,
    reviews: 124,
    price: 49,
    originalPrice: 99,
    category: "Leadership",
    image: "/assets/images/extras/mentorship_session.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Career Development Mastery",
    description: "Navigate your career path with confidence and strategic planning.",
    instructor: { name: "Victoria Wilson" },
    duration: "12 hours",
    level: "Intermediate",
    rating: 4.9,
    reviews: 89,
    price: 79,
    originalPrice: 149,
    category: "Career",
    image: "/assets/images/extras/collaborative_learning.jpg",
    featured: false,
  },
  {
    id: "3",
    title: "Financial Literacy for Entrepreneurs",
    description: "Master financial management and build wealth as a female entrepreneur.",
    instructor: { name: "Cynthia Christopher" },
    duration: "14 hours",
    level: "Advanced",
    rating: 4.9,
    reviews: 67,
    price: 99,
    originalPrice: 199,
    category: "Finance",
    image: "/assets/images/extras/collaborative_learning.jpg",
    featured: false,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');

    let filteredProducts = products;

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (level) {
      filteredProducts = filteredProducts.filter(
        (p) => p.level.toLowerCase() === level.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      products: filteredProducts,
      total: filteredProducts.length,
    });
  } catch (error) {
    console.error('[Store API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

