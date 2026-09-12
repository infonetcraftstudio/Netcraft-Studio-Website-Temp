import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";

// 1. Define the review data
const reviews = [
  {
    id: 1,
    name: "Ashley Right",
    affiliation: "Pinterest",
    quote:
      "Professionals in their craft! All products were super amazing with strong attention to details, comps and overall vibe.",
    // Image from the provided screenshot
    imageSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Jacob Jose",
    affiliation: "New York Times",
    quote:
      "Unlimited, instant access to hundreds of premium quality resources created by designers for designers.",
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Elara Sands",
    affiliation: "Behance",
    quote:
      "The attention to detail is immaculate. Every component feels polished and ready for production.",
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Marcus Cole",
    affiliation: "Dribbble",
    quote:
      "A true time-saver. I can focus on my core logic instead of pixel-pushing. Highly recommended.",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Serena V.",
    affiliation: "Figma",
    quote:
      "This is the design system I've been waiting for. It's flexible, accessible, and beautiful.",
    imageSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
  },
];

// 2. Render the component with the data
export default function TestimonialSliderDemo() {
  return (
    <div className="w-full">
      <TestimonialSlider reviews={reviews} />
    </div>
  );
}
