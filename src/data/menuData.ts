export const menuItems = [
  // Appetizers
  {
    name: 'Bruschetta',
    description: 'Toasted bread baked fresh daily, topped with juicy diced tomatoes, garlic, and a generous layer of our house-made pesto.',
    image: '/images/menu/appetizer/app-bruschetta.jpg', // Path diperbaiki
    category: 'appetizer',
    basePrice: 99,
  },
  {
    name: 'Shrimp Scampi',
    description: 'Tender shrimp sautéed in butter, garlic, extra virgin olive oil, and fresh basil, finished with a touch of chili.',
    image: '/images/menu/appetizer/app-scampi.jpg', // Path diperbaiki
    category: 'appetizer',
    basePrice: 159,
  },
  {
    name: 'Creamy Bacon Potato Soup',
    description: 'A rich and velvety soup packed with hearty potatoes, crispy bacon, butter, and high-quality cream.',
    image: '/images/menu/appetizer/app-potato-soup.jpg', // Path diperbaiki
    category: 'appetizer',
    basePrice: 139,
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp romaine tossed in our bold, house-made Caesar dressing, topped with crunchy croutons and parmesan.',
    image: '/images/menu/appetizer/app-salad-caesar.jpg', // Path diperbaiki
    category: 'appetizer',
    basePrice: 159,
  },
  {
    name: 'Thousand Island Salad',
    description: 'Crisp lettuce, juicy tomatoes, and seasonal veggies tossed with our bright, slightly sweet house-made dressing.',
    image: '/images/menu/appetizer/app-salad-1000.jpg', // Path diperbaiki
    category: 'appetizer',
    basePrice: 159,
  },
  {
    name: 'Italian Salad',
    description: 'A zesty, bold, and tangy dressing made from scratch with herbs, vinegar, and a touch of spice.',
    image: '/images/menu/appetizer/app-salad-italian.jpg', // Path diperbaiki
    category: 'appetizer',
    basePrice: 159,
  },
  // Pizzas
  {
    name: 'Cheese Pizza',
    description: 'Our special seasoned tomato sauce, piled with generous amounts of premium cheese that melts to golden perfection.',
    image: '/images/menu/pizza/pizza-cheese.jpg',
    category: 'pizza',
    basePrice: 359,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 136 },
    ],
  },
  {
    name: 'Veggie Pizza',
    description: 'Seasoned tomato sauce topped with melty cheese, sweet onions, earthy mushrooms, green peppers and ripe tomatoes.',
    image: '/images/menu/pizza/pizza-veggie.jpg',
    category: 'pizza',
    basePrice: 359,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 136 },
    ],
  },
  {
    name: 'Margherita Pizza',
    description: 'House-made fresh mozzarella, signature tomato sauce, hand-stretched dough, and fresh basil.',
    image: '/images/menu/pizza/pizza-margherita.jpg',
    category: 'pizza',
    basePrice: 369,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 136 },
    ],
  },
  {
    name: 'Chicken Pesto Pizza',
    description: 'Rich, house-made basil pesto, layered with tender chunks of chicken breast and melted mozzarella.',
    image: '/images/menu/pizza/pizza-pesto-chicken.jpg',
    category: 'pizza',
    basePrice: 369,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 166 },
    ],
  },
  {
    name: 'Hawaiian Pizza',
    description: 'Juicy, ripe chunks of pineapple paired with slightly salty ham over our seasoned tomato sauce.',
    image: '/images/menu/pizza/pizza-hawaiian.jpg',
    category: 'pizza',
    basePrice: 369,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 136 },
    ],
  },
  {
    name: 'Ricotta Sausage Pizza',
    description: 'Creamy house-made ricotta cheese, savory Italian sausage, and sweet onions over our flavorful tomato sauce.',
    image: '/images/menu/pizza/pizza-ricotta-sausage.jpg',
    category: 'pizza',
    basePrice: 379,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 156 },
    ],
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Loaded with premium pepperoni slices that crisp up perfectly over rich tomato sauce & gooey mozzarella cheese.',
    image: '/images/menu/pizza/pizza-pepperoni.jpg',
    category: 'pizza',
    basePrice: 379,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 116 },
    ],
  },
  {
    name: 'Meat Lovers Pizza',
    description: 'A delicious trio of pepperoni, Italian sausage, and ham, all layered over rich tomato sauce.',
    image: '/images/menu/pizza/pizza-meat-lovers.jpg',
    category: 'pizza',
    basePrice: 379,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 126 },
    ],
  },
  {
    name: 'Seafood Pizza',
    description: 'Generous chunks of shrimp, squid, and crab, all laid over our specially blended tomato sauce.',
    image: '/images/menu/pizza/pizza-seafood.jpg',
    category: 'pizza',
    basePrice: 389,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 146 },
    ],
  },
  {
    name: 'Truffle Pizza',
    description: 'Custom tomato sauce, cheese, generous amounts of Champignon mushrooms and topped with precious black truffles.',
    image: '/images/menu/pizza/pizza-truffle.jpg',
    category: 'pizza',
    basePrice: 389,
    sizes: [
      { name: 'Large 10"', price: 0 },
      { name: 'XL 15"', price: 146 },
    ],
  },
  // Pastas
  {
    name: 'Beef Stroganoff',
    description: 'Tender slices of steak simmered with caramelized onions and mushrooms in a rich, velvety cream and butter sauce.',
    image: '/images/menu/pasta/pasta-beef-stroganoff.jpg',
    category: 'pasta',
    basePrice: 239,
  },
  {
    name: 'Chicken Parmigiana',
    description: 'Tender, juicy chicken breast cooked sous vide, then hand-breaded and golden fried, topped with melted mozzarella.',
    image: '/images/menu/pasta/pasta-spag-chx-parmesan.jpg',
    category: 'pasta',
    basePrice: 239,
  },
  {
    name: 'Pork Bolognese Lasagna',
    description: 'Five layers of fresh-pressed pasta and rich pork bolognese, slow-simmered with housemade Italian sausage.',
    image: '/images/menu/pasta/pasta-lasagna.jpg',
    category: 'pasta',
    basePrice: 235,
  },
  {
    name: 'Bacon Garlic & Chili Pasta',
    description: 'A bold and spicy Thai favorite made with crispy bacon, garlic, dried chilies, and fragrant Thai herbs.',
    image: '/images/menu/pasta/pasta-spag-bacon-garlic.jpg',
    category: 'pasta',
    basePrice: 115,
  },
  {
    name: 'Drunken Noodles Pasta',
    description: 'A bold, spicy Thai street food classic stir-fried with garlic, chilies, Thai basil, and fresh vegetables.',
    image: '/images/menu/pasta/pasta-spag-kee-mao.jpg',
    category: 'pasta',
    basePrice: 115,
  },
  {
    name: 'Pork Bolognese Pasta',
    description: 'Slow-cooked for hours with sweet onions, ripe tomatoes, mushrooms, and our house-made Italian sausage.',
    image: '/images/menu/pasta/pasta-spag-bolognese.jpg',
    category: 'pasta',
    basePrice: 145,
  },
  {
    name: 'Creamy Carbonara',
    description: 'Crispy bacon, garlic, and parmesan, elevated with high-quality cream for an extra smooth, velvety finish.',
    image: '/images/menu/pasta/pasta-spag-carbonara.jpg',
    category: 'pasta',
    basePrice: 145,
  },
  {
    name: 'Pesto Pasta',
    description: 'A vibrant, aromatic blend of fresh basil, garlic, parmesan cheese, toasted nuts, and extra virgin olive oil.',
    image: '/images/menu/pasta/pasta-spag-pesto.jpg',
    category: 'pasta',
    basePrice: 145,
  },
  // Desserts
  {
    name: 'Carrot Cake',
    description: 'Deliciously moist house-made carrot cake with a rich and sweet cream cheese icing.',
    image: '/images/menu/dessert/dessert-carrot-cake.jpg', // Path diperbaiki
    category: 'dessert',
    basePrice: 109,
  },
];
