import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoryGrid } from './CategoryGrid';
import { FeaturedProducts } from './FeaturedProducts';
import { TourismSpotlight } from './TourismSpotlight';
import { WhyChooseLocal } from './WhyChooseLocal';
import { ArtisanStories } from './ArtisanStories';

interface HomePageProps {
  onNavigateTab: (tab: string) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateTab,
  onSelectCategory
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Hero Section */}
      <HeroSection
        onExploreProducts={() => onNavigateTab('products')}
        onExploreTourism={() => onNavigateTab('tourism')}
        onSelectCategory={onSelectCategory}
      />

      {/* 2. Visual Categories Breakdown */}
      <CategoryGrid
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          onNavigateTab('products');
        }}
        onSelectTourism={() => onNavigateTab('tourism')}
      />

      {/* 3. Featured Local Produce & Crafts */}
      <FeaturedProducts
        onViewAll={() => onNavigateTab('products')}
      />

      {/* 4. Tourism Expeditions Spotlight */}
      <TourismSpotlight
        onViewAllTourism={() => onNavigateTab('tourism')}
      />

      {/* 5. Why Choose Local Section */}
      <WhyChooseLocal
        onLearnMore={() => onNavigateTab('admin')}
      />

      {/* 6. Meet The Artisans & Guides */}
      <ArtisanStories
        onSelectSeller={() => onNavigateTab('sellers')}
      />
    </div>
  );
};
