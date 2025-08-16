import Image1 from './src/assets/products/download (10).jpg';
import Image2 from './src/assets/products/carrots-table_popidar-ss.jpg';
import Image3 from './src/assets/products/collard.jpg';
import Image4 from './src/assets/products/download (10).jpg';
import Image5 from './src/assets/products/download (11).jpg';
import Image6 from './src/assets/products/download (12).jpg';


import Image7 from './src/assets/products/images (9).jpg';
import Image8 from './src/assets/products/images (9).jpg';
import Image9 from './src/assets/products/download (13).jpg';
import Image10 from './src/assets/products/collard.jpg';
import Image11 from './src/assets/products/download (12).jpg';
import Image12 from './src/assets/products/download (16).jpg';

//categories
import Cat1 from './src/assets/categories/cereals.jpg';
import Cat2 from './src/assets/categories/dairy.jpg';
import Cat3 from './src/assets/categories/fruits.jpg';
import Cat4 from './src/assets/categories/vegetables.jpg';
import Cat5 from './src/assets/categories/protein.jpg';
import Cat6 from './src/assets/categories/other.jpg';
import { IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp } from 'react-icons/io';
import { FaTelegram } from 'react-icons/fa';
import { PiXLogo } from 'react-icons/pi';

export const dishes = [
  {
    id: 1,
    title: "50kg sack of rice",
    price: 1320,
    image: Image1,
    description: "With the great quality of rice 1 sack at an affordable price, you're definitely in for a treat.",
    categories: ["gin", "liquor", "dry"],
    stars: 4.5,

  },
  {
    id: 2,
    title: "1 bunch Sukuma wiki (Collard greens)",
    price: 550,
    image: Image2,
    description: "Fresh from the farm",
    categories: ["gin", "liquor", "new"],
    stars: 4.5,

  },
  {
    id: 3,
    title: "tasty food",
    price: 550,
    image: Image3,
    description: "1 Chicken Piece with regular chips",
    categories: ["gin", "liquor", "new"],
    stars: 4.5,

  },
  {
    id: 4,
    title: "tasty food",
    price: 550,
    image: Image4,
    description: "1 Chicken Piece with regular chips",
    categories: ["gin", "liquor", "new"],
    stars: 4.5,

  },
  {
    id: 5,
    title: "delicious food",
    price: 550,
    image: Image5,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
    categories: ["gin", "liquor", "new"],
    stars: 4.5,

  },
  {
    id: 6,
    title: "Coke soft drink",
    price: 140,
    image: Image6,
    description: "Cocacola Carbonated soft drink",
    categories: ["drink", "mixer", "carbonated"],
    stars: 4.5,

  },
];

export const menus = [
    {
      id: 7,
      title: "Black Bird Red Wine",
      price: 3499,
      image: Image1,
      description: "Natural Sweet Red Wine, Scottish 1992",
      stars: 5.0,

    },
    {
      id: 8,
      title: "1kg, red tomatoes",
      price: 259,
      image: Image2,
      description: "Red tomatoes",
      stars: 4.5,

    },
    {
      id: 9,
      title: "delicious food",
      price: 550,
      image: Image3,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,

    },
    {
      id: 10,
      title: "tasty food",
      price: 550,
      image: Image4,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,

    },
    {
      id: 11,
      title: "delicious food",
      price: 550,
      image: Image5,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,

    },
    {
      id: 12,
      title: "delicious food",
      price: 550,
      image: Image6,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.",
      stars: 4.5,

    },
  ];


export const categories = [
  {
    id: 1,
    title: "Cereals",
    image: Cat1,
    link: "https://www.oaks.delivery/"
  },
  {
    id: 2,
    title: "Dairy",
    image: Cat2,
    link: "https://www.oaks.delivery/"
  },
  {
    id: 3,
    title: "Fruits",
    image: Cat3,
    link: "https://www.oaks.delivery/"
  },
  {
    id: 4,
    title: "Vegetables",
    image: Cat4,
    link: "https://www.oaks.delivery/"
  },
  {
    id: 5,
    title: "Protein",
    image: Cat5,
    link: "https://www.oaks.delivery/"
  },
  {
    id: 6,
    title: "Other",
    image: Cat6,
    link: "https://www.oaks.delivery/"
  },
]

export const products = [
  {
    id: "1",
    title: "Daily",
    description: "Day",
    price: 500,
    images: [""],
    features: [
      "Daily match predictions",
      "Fixed Correct Score",
      "20+ odds",
    ],
    colors: ["#059212", "#3e4d40ff"],
    stock: 2
  }
]

export const socialUrls = [
  { id: 1, icon: <IoLogoFacebook />, url: "https://www.facebook.com/profile.php?id=61570224237201", title: "Facebook" },
  { id: 2, icon: <FaTelegram />, url: "https://t.me/bet365gurus", title: "Telegram" },
  { id: 3, icon: <IoLogoWhatsapp />, url: "https://whatsapp.com/channel/0029VayjRf71t90afonqcy0b", title: "WhatsApp" },
  { id: 4, icon: <PiXLogo />, url: "https://x.com/goalgeniusvip", title: "X(Twitter)" },
  {
    id: 5, icon: <IoLogoInstagram
    />, url: "https://instagram.com/goalgenius.vip", title: "Instagram"
  },
];