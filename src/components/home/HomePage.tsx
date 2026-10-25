import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoryGrid } from './CategoryGrid';
import { FeaturedProducts } from './FeaturedProducts';
import { TourismSpotlight } from './TourismSpotlight';
import { WhyChooseLocal } from './WhyChooseLocal';
import { ArtisanStories } from './ArtisanStories';
import { ScrollReveal } from '../common/ScrollReveal';

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
      {/* 1. Hero Section (Immediate Presence) */}
      <HeroSection
        onExploreProducts={() => onNavigateTab('products')}
        onExploreTourism={() => onNavigateTab('tourism')}
        onSelectCategory={onSelectCategory}
      />

      {/* 2. Visual Categories Directory (Scroll Reveal) */}
      <ScrollReveal animation="fade-up" duration={700}>
        <CategoryGrid
          onSelectCategory={(cat) => {
            onSelectCategory(cat);
            onNavigateTab('products');
          }}
          onSelectTourism={() => onNavigateTab('tourism')}
        />
      </ScrollReveal>

      {/* 3. Featured Local Produce & Crafts */}
      <ScrollReveal animation="fade-up" duration={700}>
        <FeaturedProducts
          onViewAll={() => onNavigateTab('products')}
        />
      </ScrollReveal>

      {/* 4. Tourism Expeditions Spotlight */}
      <ScrollReveal animation="fade-up" duration={700}>
        <TourismSpotlight
          onViewAllTourism={() => onNavigateTab('tourism')}
        />
      </ScrollReveal>

      {/* 5. Why Choose Local Section */}
      <ScrollReveal animation="fade-up" duration={700}>
        <WhyChooseLocal
          onLearnMore={() => onNavigateTab('admin')}
        />
      </ScrollReveal>

      {/* 6. Meet The Artisans & Guides */}
      <ScrollReveal animation="fade-up" duration={700}>
        <ArtisanStories
          onSelectSeller={() => onNavigateTab('sellers')}
        />
      </ScrollReveal>
    </div>
  );
};
