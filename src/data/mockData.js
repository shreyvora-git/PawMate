// PawMate Mock Data - Services & Verified Caregivers

export const INITIAL_SERVICES = [
  {
    id: 1,
    name: 'Dog Walking',
    category: 'Walking',
    price: '₹300',
    location: 'Chembur, Mumbai',
    description: 'Daily active 45-minute neighborhood walks with hydration breaks, live GPS tracking, and paw wipe down.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80',
    icon: '🦮',
    badge: 'MOST POPULAR'
  },
  {
    id: 2,
    name: 'Pet Sitting',
    category: 'Sitting',
    price: '₹600',
    location: 'Powai, Mumbai',
    description: 'Compassionate, reliable in-home visits with feeding, playtime, litter care, and photo check-ins.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
    icon: '🏠',
    badge: 'VERIFIED'
  },
  {
    id: 3,
    name: 'Dog Grooming',
    category: 'Grooming',
    price: '₹850',
    location: 'Bandra, Mumbai',
    description: 'Professional bathing, breed-specific coat styling, nail trimming, and gentle ear cleaning.',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80',
    icon: '✂️',
    badge: 'SPONSORED'
  },
  {
    id: 4,
    name: 'Pet Boarding',
    category: 'Boarding',
    price: '₹1,200',
    location: 'Andheri, Mumbai',
    description: 'Safe, cozy overnight home stays with 24/7 loving companionship, secure yard play, and constant updates.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
    icon: '🏨',
    badge: 'PREMIUM'
  },
  {
    id: 5,
    name: 'Cat Grooming',
    category: 'Grooming',
    price: '₹750',
    location: 'Juhu, Mumbai',
    description: 'Stress-free feline hygiene including gentle de-shedding brushing, nail clipping, and waterless coat bath.',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop&q=80',
    icon: '🐱',
    badge: 'SPECIALIZED'
  },
  {
    id: 6,
    name: 'Pet Feeding & Drop-In',
    category: 'Sitting',
    price: '₹250',
    location: 'Andheri West, Mumbai',
    description: 'Scheduled quick visits to serve fresh meals, refill fresh water, dispense oral meds, and provide cuddle time.',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80',
    icon: '🍲',
    badge: 'POPULAR'
  },
  {
    id: 7,
    name: 'Dog Training & Manners',
    category: 'Training',
    price: '₹950',
    location: 'Bandra, Mumbai',
    description: '1-on-1 positive-reinforcement coaching for calm leash walking, basic obedience commands, and manners.',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=80',
    icon: '🎾',
    badge: 'EXPERT'
  },
  {
    id: 8,
    name: 'Pet Exercise & Agility',
    category: 'Walking',
    price: '₹450',
    location: 'Dadar, Mumbai',
    description: 'High-energy park runs, frisbee fetch, and obstacle games for athletic dogs needing extra stamina workouts.',
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&auto=format&fit=crop&q=80',
    icon: '🏃‍♂️',
    badge: 'ACTIVE'
  },
  {
    id: 9,
    name: 'Puppy Care & Socialization',
    category: 'Specialized',
    price: '₹500',
    location: 'Chembur, Mumbai',
    description: 'Frequent potty break routines, bite inhibition coaching, teething relief, and gentle socialization for young pups.',
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=600&auto=format&fit=crop&q=80',
    icon: '🐕',
    badge: 'PUPPY FAVORITE'
  },
  {
    id: 10,
    name: 'Cat Sitting & Playtime',
    category: 'Sitting',
    price: '₹550',
    location: 'Powai, Mumbai',
    description: 'Quiet in-home companionship, feather wand playtime, litter box cleaning, and soothing company.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&auto=format&fit=crop&q=80',
    icon: '🐈',
    badge: 'CALM CARE'
  },
  {
    id: 11,
    name: 'Overnight House Sitting',
    category: 'Boarding',
    price: '₹1,400',
    location: 'Colaba, Mumbai',
    description: 'Caregiver stays overnight at your home so your pets maintain their familiar bedtime routine and security.',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&auto=format&fit=crop&q=80',
    icon: '🌙',
    badge: '24/7 CARE'
  },
  {
    id: 12,
    name: 'Senior Pet Care',
    category: 'Specialized',
    price: '₹600',
    location: 'Ghatkopar, Mumbai',
    description: 'Gentle mobility assistance, joint-friendly pacing, scheduled oral medication, and patient companionship.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
    icon: '🩺',
    badge: 'GENTLE'
  },
  {
    id: 13,
    name: 'Special Needs Care',
    category: 'Specialized',
    price: '₹700',
    location: 'Andheri, Mumbai',
    description: 'Experienced care for pets recovering from surgery, diabetic injection routines, or specific medical directives.',
    image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=600&auto=format&fit=crop&q=80',
    icon: '🛡️',
    badge: 'MEDICAL TRAINED'
  },
  {
    id: 14,
    name: 'Pet Day Care',
    category: 'Boarding',
    price: '₹900',
    location: 'Juhu, Mumbai',
    description: 'Full-day interactive daycare with supervised indoor/outdoor playtime, rest hours, and nutritious meal breaks.',
    image: 'https://images.unsplash.com/photo-1560743641-3914f4c4b88c?w=600&auto=format&fit=crop&q=80',
    icon: '🐾',
    badge: 'ALL DAY PLAY'
  }
];

export const INITIAL_PAWMATES = [
  {
    id: 1,
    name: 'Rahul Sharma',
    rating: '4.9',
    jobs: '164 jobs',
    location: 'Chembur, Mumbai',
    experience: '5+ years',
    service: 'Dog Walker & Sitter',
    price: '₹300/session',
    services: [
      'Dog Walking',
      'Pet Sitting',
      'Pet Exercise & Agility',
      'Puppy Care & Socialization',
      'Senior Pet Care'
    ],
    tags: ['LARGE DOGS', 'CPR CERTIFIED'],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Priya Mehta',
    rating: '5.0',
    jobs: '128 jobs',
    location: 'Powai, Mumbai',
    experience: '4+ years',
    service: 'Pet Sitter & Cat Specialist',
    price: '₹500/day',
    services: [
      'Pet Sitting',
      'Cat Sitting & Playtime',
      'Pet Feeding & Drop-In',
      'Overnight House Sitting',
      'Cat Grooming'
    ],
    tags: ['CATS & DOGS', 'MEDICATION'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Aarav Patel',
    rating: '4.8',
    jobs: '95 jobs',
    location: 'Bandra, Mumbai',
    experience: '3+ years',
    service: 'Trainer & Dog Walker',
    price: '₹800/session',
    services: [
      'Dog Training & Manners',
      'Dog Walking',
      'Pet Exercise & Agility',
      'Puppy Care & Socialization'
    ],
    tags: ['PUPPY TRAINING', 'BEHAVIOR'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Ananya Deshmukh',
    rating: '4.9',
    jobs: '110 jobs',
    location: 'Juhu, Mumbai',
    experience: '6+ years',
    service: 'Senior Pet & Special Needs Sitter',
    price: '₹650/day',
    services: [
      'Senior Pet Care',
      'Special Needs Care',
      'Pet Sitting',
      'Overnight House Sitting',
      'Pet Feeding & Drop-In'
    ],
    tags: ['SENIOR PETS', 'FIRST AID'],
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Rohan Verma',
    rating: '4.9',
    jobs: '84 jobs',
    location: 'Andheri West, Mumbai',
    experience: '4+ years',
    service: 'Dog Walker & Runner',
    price: '₹350/session',
    services: [
      'Dog Walking',
      'Pet Exercise & Agility',
      'Pet Day Care',
      'Pet Boarding'
    ],
    tags: ['ACTIVE RUNS', 'AGILITY'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    name: 'Sneha Kulkarni',
    rating: '5.0',
    jobs: '142 jobs',
    location: 'Dadar, Mumbai',
    experience: '7+ years',
    service: 'Feline Specialist & Groomer',
    price: '₹600/day',
    services: [
      'Cat Grooming',
      'Cat Sitting & Playtime',
      'Dog Grooming',
      'Pet Feeding & Drop-In',
      'Pet Sitting'
    ],
    tags: ['KITTEN CARE', 'POST-OP CARE'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 7,
    name: 'Vikram Singh',
    rating: '4.8',
    jobs: '76 jobs',
    location: 'Colaba, Mumbai',
    experience: '5+ years',
    service: 'Overnight & Boarding Specialist',
    price: '₹1,100/night',
    services: [
      'Pet Boarding',
      'Overnight House Sitting',
      'Pet Day Care',
      'Dog Walking'
    ],
    tags: ['HOUSE SITTING', '24/7 CARE'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    name: 'Kavita Rao',
    rating: '4.9',
    jobs: '92 jobs',
    location: 'Thane West, Mumbai',
    experience: '3+ years',
    service: 'Master Groomer & Walker',
    price: '₹450/session',
    services: [
      'Dog Grooming',
      'Cat Grooming',
      'Puppy Care & Socialization',
      'Pet Sitting',
      'Dog Walking'
    ],
    tags: ['SPA WASH', 'LEASH MANNERS'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
  }
];
