import {
  Dumbbell,
  Waves,
  Gamepad2,
  PartyPopper,
  Car,
  ShieldCheck,
  Zap,
  Trees,
  Building2,
  Accessibility,
} from "lucide-react";

const projectData = {
  slug: "saffpoll-residences",
  name: "SaffPoll Residences",
  category: "Premium Residential",
  location: "New Delhi, India",
  startingPrice: "₹XX Lakh",
  status: "Under Construction",

  heroImage:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90",

  overview:
    "A thoughtfully planned residential development designed around modern living, functional spaces and quality construction. SaffPoll Residences brings together contemporary architecture, practical layouts and lifestyle-focused amenities.",

  stats: [
    {
      label: "Total Units",
      value: "120+",
    },
    {
      label: "Project Area",
      value: "5 Acres",
    },
    {
      label: "Unit Types",
      value: "2 / 3 / 4 BHK",
    },
    {
      label: "Project Status",
      value: "Under Construction",
    },
  ],

  features: [
    {
      title: "Swimming Pool",
      description:
        "A dedicated leisure space designed for relaxation and recreation.",
      icon: Waves,
    },
    {
      title: "Kids Play Area",
      description:
        "Safe and engaging spaces designed for children and families.",
      icon: Gamepad2,
    },
    {
      title: "Modern Gym",
      description:
        "A dedicated fitness area designed for an active lifestyle.",
      icon: Dumbbell,
    },
    {
      title: "Party Hall",
      description:
        "A versatile community space for gatherings and celebrations.",
      icon: PartyPopper,
    },
    {
      title: "Dedicated Parking",
      description:
        "Planned parking facilities for residents and visitors.",
      icon: Car,
    },
    {
      title: "Controlled Access",
      description:
        "Thoughtful access management for a secure living environment.",
      icon: ShieldCheck,
    },
    {
      title: "Power Backup",
      description:
        "Backup infrastructure designed to support essential services.",
      icon: Zap,
    },
    {
      title: "Landscaped Areas",
      description:
        "Green spaces integrated into the overall project planning.",
      icon: Trees,
    },
    {
      title: "Modern Entrance",
      description:
        "A contemporary entrance experience reflecting the character of the development.",
      icon: Building2,
    },
    {
      title: "Accessible Design",
      description:
        "Planning considerations for convenient movement across shared spaces.",
      icon: Accessibility,
    },
  ],

  units: [
    {
      type: "2 BHK",
      area: "1,100 sq.ft.",
      price: "₹XX Lakh",
      description:
        "A practical configuration designed for comfortable modern living.",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    },
    {
      type: "3 BHK",
      area: "1,650 sq.ft.",
      price: "₹XX Lakh",
      description:
        "Spacious family-oriented layouts with generous living areas.",
      image:
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",
    },
    {
      type: "4 BHK",
      area: "2,250 sq.ft.",
      price: "₹XX Lakh",
      description:
        "Premium layouts offering additional space for larger families.",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    },
  ],

  floorPlans: {
    "2 BHK":
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
    "3 BHK":
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    "4 BHK":
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
  },

  specifications: [
    {
      label: "Project Type",
      value: "Premium Residential Development",
    },
    {
      label: "Project Area",
      value: "5 Acres",
    },
    {
      label: "Total Units",
      value: "120+",
    },
    {
      label: "Structure",
      value: "RCC Framed Structure",
    },
    {
      label: "Parking",
      value: "Planned Resident & Visitor Parking",
    },
    {
      label: "Status",
      value: "Under Construction",
    },
    {
      label: "Construction Started",
      value: "Month Year",
    },
    {
      label: "Expected Completion",
      value: "Month Year",
    },
  ],

  gallery: [
    {
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
      title: "Living Spaces",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",
      title: "Contemporary Architecture",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1800&q=90",
      title: "Interior Spaces",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1800&q=90",
      title: "Premium Interiors",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=90",
      title: "Project Exterior",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90",
      title: "Architectural Detail",
    },
  ],

  construction: {
    started: "Month Year",
    expectedCompletion: "Month Year",
    progress: 68,
    stages: [
      {
        title: "Planning",
        status: "Completed",
      },
      {
        title: "Design",
        status: "Completed",
      },
      {
        title: "Engineering",
        status: "Completed",
      },
      {
        title: "Structure",
        status: "In Progress",
      },
      {
        title: "Finishing",
        status: "Upcoming",
      },
      {
        title: "Handover",
        status: "Upcoming",
      },
    ],
  },

  locationDetails: {
    title: "Connected to the city. Designed for modern living.",
    description:
      "The project is planned with convenient access to important roads, daily conveniences, educational institutions, healthcare facilities and commercial destinations.",
    highlights: [
      "Major Road Connectivity",
      "Metro / Public Transport",
      "Schools & Institutions",
      "Healthcare Facilities",
      "Retail & Commercial Areas",
    ],
  },
};

export default projectData;
