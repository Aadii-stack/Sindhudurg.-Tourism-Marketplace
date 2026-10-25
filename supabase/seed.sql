-- ====================================================================
-- Sindhudurg Tourism & Local Products Marketplace Seed Data
-- ====================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.product_categories (id, name, slug, description, icon_name)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'Devgad Alphonso Mangoes', 'alphonso-mangoes', 'GI-tagged authentic Devgad & Vijaydurg Hapus mangoes and pure natural pulp', 'Sun'),
    ('c2222222-2222-2222-2222-222222222222', 'Konkan Cashews & Dry Fruits', 'cashews', 'Premium jumbo W180 & W240 roasted, salted, and spiced coastal cashews', 'Nut'),
    ('c3333333-3333-3333-3333-333333333333', 'Kokum & Natural Beverages', 'kokum-beverages', 'Wild harvested pure Kokum Agal, cooling syrups, and Amla concentrates', 'Wine'),
    ('c4444444-4444-4444-4444-444444444444', 'Sawantwadi Wooden Handicrafts', 'wooden-handicrafts', 'Centuries-old royal lacquerware, Ganjifa playing cards, and hand-carved toys', 'Hammer'),
    ('c5555555-5555-5555-5555-555555555555', 'Authentic Malvani Masalas & Pantry', 'malvani-masalas', 'Stone-ground Malvani Sunday masala, Tirphal spices, and organic red rice', 'Flame')
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED SELLERS
INSERT INTO public.sellers (id, business_name, owner_name, taluka, address, phone, email, specialty, story, avatar_url, banner_url, is_verified, rating, reviews_count)
VALUES
    ('s1111111-1111-1111-1111-111111111111', 'Devgad Mango Orchards Cooperative', 'Dattaram Rane', 'Devgad', 'Jamsande, Devgad, Sindhudurg - 416613', '+91 98221 44521', 'devgad.mangoes@demo.sindhudurg.in', 'Direct Farm GI Alphonso', 'Third-generation organic orchardists cultivating world-famous Devgad Hapus along the Arabian sea breeze cliffs.', 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80', 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=1200&q=80', true, 4.9, 128),
    ('s2222222-2222-2222-2222-222222222222', 'Sawantwadi Royal Heritage Lacquer Craft', 'Raghunath Kanekar', 'Sawantwadi', 'Chitralaya Lane, Royal Palace Road, Sawantwadi - 416510', '+91 94220 89112', 'sawantwadi.craft@demo.sindhudurg.in', 'Traditional Woodcraft & Toys', 'Preserving 300-year-old royal Chitari lacquer artistry using natural vegetable dyes and Pangara wood.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80', true, 5.0, 94),
    ('s3333333-3333-3333-3333-333333333333', 'Malvan Spice Roots & Kokum Collective', 'Sunita Parab', 'Malvan', 'Dandi Beach Road, Malvan - 416606', '+91 91584 72319', 'malvan.roots@demo.sindhudurg.in', 'Pure Kokum & Spices', 'Women-led rural self-help collective processing sun-dried kokum, organic coconut oil, and secret family masalas.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80', true, 4.8, 87),
    ('s4444444-4444-4444-4444-444444444444', 'Tarkarli Ocean Explorers & Guides', 'Prasad Redkar', 'Malvan', 'Wairy Bhutnath, Tarkarli, Malvan - 416606', '+91 98902 33140', 'tarkarli.dive@demo.sindhudurg.in', 'Certified Scuba & Coastal Trails', 'PADI and MTDC certified marine divers showcasing the pristine coral reefs and rocky islets of southern Maharashtra.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', true, 4.9, 160)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED PRODUCTS
INSERT INTO public.products (id, seller_id, category_id, name, slug, description, price_inr, mrp_inr, unit, stock_quantity, origin_taluka, image_url, is_organic, is_featured, rating, reviews_count)
VALUES
    (
        'p1111111-1111-1111-1111-111111111111',
        's1111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'Original Devgad GI-Tagged Alphonso Mango Box (Grade A)',
        'devgad-gi-alphonso-mango-box',
        'Directly harvested from sea-facing orchards in Devgad. Naturally straw-ripened without calcium carbide. Golden saffron hue, thin skin, and rich aromatic sweetness.',
        1250.00,
        1500.00,
        '1 Dozen (12 Pieces)',
        40,
        'Devgad',
        'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
        true,
        true,
        4.9,
        96
    ),
    (
        'p2222222-2222-2222-2222-222222222222',
        's1111111-1111-1111-1111-111111111111',
        'c1111111-1111-1111-1111-111111111111',
        'Pure 100% Devgad Mango Pulp (Amba Poli Sweetened & No Preservatives)',
        'pure-devgad-mango-pulp-can',
        'Traditional canned ripe Alphonso pulp. Ideal for Aamras, mango kulfi, milkshakes, and festive desserts all year round.',
        380.00,
        450.00,
        '850g Can',
        85,
        'Devgad',
        'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
        true,
        false,
        4.8,
        42
    ),
    (
        'p3333333-3333-3333-3333-333333333333',
        's2222222-2222-2222-2222-222222222222',
        'c4444444-4444-4444-4444-444444444444',
        'Sawantwadi Handcrafted Wooden Fruit & Vegetable Set',
        'sawantwadi-wooden-fruit-basket',
        'Heritage wooden craftsmanship dating back to the Sawant Bhonsle royalty. Hand-lathed using soft Pangara wood and finished with safe, non-toxic lacquer vegetable tints.',
        650.00,
        790.00,
        '1 Set (8 Artisanal Pieces)',
        25,
        'Sawantwadi',
        'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        false,
        true,
        5.0,
        64
    ),
    (
        'p4444444-4444-4444-4444-444444444444',
        's2222222-2222-2222-2222-222222222222',
        'c4444444-4444-4444-4444-444444444444',
        'Traditional Sawantwadi Ganjifa Playing Cards Artwork Frame',
        'sawantwadi-ganjifa-cards-frame',
        'Intricate hand-painted Dashavatara circular cards crafted by master chitari artisans. Framed in seasoned teakwood.',
        1850.00,
        2200.00,
        '1 Framed Keepsake',
        10,
        'Sawantwadi',
        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        false,
        true,
        4.9,
        28
    ),
    (
        'p5555555-5555-5555-5555-555555555555',
        's3333333-3333-3333-3333-333333333333',
        'c3333333-3333-3333-3333-333333333333',
        'Pure Malvani Kokum Agal (Concentrated Unsweetened Extract)',
        'pure-malvani-kokum-agal',
        'Natural acidic extract of wild Garcinia indica with rock salt. The indispensable foundation for Solkadhi, fish curries, and digestive cooling elixirs.',
        190.00,
        230.00,
        '500 ml Bottle',
        110,
        'Malvan',
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        true,
        true,
        4.8,
        55
    ),
    (
        'p6666666-6666-6666-6666-666666666666',
        's3333333-3333-3333-3333-333333333333',
        'c5555555-5555-5555-5555-555555555555',
        'Handmade Malvani Sunday Fish & Chicken Masala Blend',
        'handmade-malvani-sunday-masala',
        'Artisanal 24-spice blend roasted on iron griddles with Dagad Phool, Tirphal (Sichuan pepper cousin), and red Byadgi chillies. Authentic coastal aroma.',
        240.00,
        290.00,
        '250g Jar',
        70,
        'Malvan',
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
        false,
        true,
        4.9,
        83
    ),
    (
        'p7777777-7777-7777-7777-777777777777',
        's1111111-1111-1111-1111-111111111111',
        'c2222222-2222-2222-2222-222222222222',
        'Vengurla Jumbo Grade W210 Roasted Cashews (Kaju)',
        'vengurla-jumbo-cashews-w210',
        'Sindhudurg coastal cashew kernels grown in red laterite soil. Exceptionally crunchy, rich in natural oils, slow dry-roasted.',
        520.00,
        610.00,
        '500g Vacuum Pack',
        60,
        'Vengurla',
        'https://images.unsplash.com/photo-1509912760195-46702e7b579c?auto=format&fit=crop&w=800&q=80',
        true,
        false,
        4.9,
        51
    )
ON CONFLICT (id) DO NOTHING;

-- 4. SEED TOURISM LISTINGS
INSERT INTO public.tourism_listings (id, seller_id, title, slug, category, location_taluka, address, duration, price_indicative_inr, price_label, description, highlights, included, image_url, is_featured, rating, reviews_count)
VALUES
    (
        't1111111-1111-1111-1111-111111111111',
        's4444444-4444-4444-4444-444444444444',
        'Tarkarli Coral Reef Scuba Diving & Underwater Photography',
        'tarkarli-coral-scuba-dive',
        'water_sports',
        'Malvan',
        'Near Tsunami Island, Tarkarli Coastal Waters',
        '3 Hours',
        1800.00,
        'per person',
        'Explore the azure waters of Malvan with PADI-certified dive masters. Discover vibrant marine life, soft corals, brain corals, and schools of butterflyfish near the historic fort coastline.',
        ARRAY['Certified Dive Master briefing', 'Full scuba gear & wet suit provided', 'Underwater 4K video & 10 high-res photos', 'Boat transfer to reef zone'],
        ARRAY['Safety Equipment', 'Instructor Support', 'Photos & Video File', 'Boat Ride'],
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        true,
        4.9,
        210
    ),
    (
        't2222222-2222-2222-2222-222222222222',
        's4444444-4444-4444-4444-444444444444',
        'Sindhudurg Sea Fort Historic Walking Trail & Boat Passage',
        'sindhudurg-sea-fort-heritage-walk',
        'fort',
        'Malvan',
        'Kurte Island, Off Malvan Jetty',
        '3.5 Hours',
        450.00,
        'per person',
        'Board an indigenous wooden jetty boat to Kurte Island. Walk upon the massive 1664 basalt battlements engineered by Chhatrapati Shivaji Maharaj, featuring secret tunnels and fresh water sweet wells in the ocean.',
        ARRAY['Ferry transfer from Malvan port', 'Local historian storytelling guide', 'Shivaji Maharaj palm & footprint shrine visit', 'Panoramic 360-degree sea ramparts'],
        ARRAY['Boat Round-Trip Ticket', 'Heritage Historian Guide', 'Entry Permits'],
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        true,
        4.8,
        185
    ),
    (
        't3333333-3333-3333-3333-333333333333',
        's2222222-2222-2222-2222-222222222222',
        'Sawantwadi Palace & Master Chitari Lacquerware Workshop',
        'sawantwadi-palace-craft-experience',
        'culture',
        'Sawantwadi',
        'Moti Talao Lakeside, Sawantwadi Palace Enclave',
        '4 Hours',
        800.00,
        'per participant',
        'Step inside the red stone Sawantwadi Palace museum overlooking Moti Talao. Learn directly from royal chitari artisans, try hand-painting wooden birds with natural vegetable lac, and take home your creation.',
        ARRAY['Private Palace museum tour', 'Hands-on wooden lacquer painting session', 'Keepsake handcrafted wooden toy', 'Traditional Konkani tea and snack'],
        ARRAY['Workshop Materials', 'Instructor Fee', 'Museum Entry', 'Welcome Drink'],
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        true,
        5.0,
        74
    ),
    (
        't4444444-4444-4444-4444-444444444444',
        's3333333-3333-3333-3333-333333333333',
        'Coastal Konkani Homestay & Malvani Culinary Masterclass',
        'coastal-malvani-homestay-culinary',
        'homestay',
        'Devgad',
        'Mithbav Beach Hamlet, Devgad Taluka',
        '1 Night / 2 Days',
        2600.00,
        'per night (double occupancy)',
        'Stay in a traditional tiled roof farmhouse surrounded by betel nut palms and mango groves. Enjoy fresh Solkadhi, freshly pressed coconut curries, and evening stargazing on virgin white sand beaches.',
        ARRAY['Private cottage with open sit-out verandah', 'Farm-to-table breakfast and dinner included', 'Cooking session on clay chulha', 'Private access to secluded beach'],
        ARRAY['Accommodation', 'All Meals (Malvani Cuisine)', 'Cooking Demo', 'Wi-Fi'],
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        true,
        4.9,
        92
    ),
    (
        't5555555-5555-5555-5555-555555555555',
        's4444444-4444-4444-4444-444444444444',
        'Vengurla Lighthouse Sunset & Dolphin Safari Boat Tour',
        'vengurla-dolphin-sunset-cruise',
        'nature',
        'Vengurla',
        'Vengurla Jetty & Lighthouse Point',
        '2.5 Hours',
        750.00,
        'per person',
        'Board an early morning or golden sunset boat cruise into the deep coastal waters off Vengurla rocks. Spot Indo-Pacific humpback dolphins playing in the surf and tour the 1877 Dutch stone lighthouse.',
        ARRAY['Dolphin sighting boat excursion', '1877 heritage lighthouse vantage visit', 'Lifejackets & coastal safety gear', 'Binoculars for bird & dolphin watching'],
        ARRAY['Cruise Operator', 'Safety Gear', 'Lighthouse Access'],
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        false,
        4.8,
        63
    )
ON CONFLICT (id) DO NOTHING;
