import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const img = (seed) => `https://picsum.photos/seed/${seed}/300/200`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('snake-plant'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: img('spider-plant'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: img('peace-lily'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: img('boston-fern'), description: 'Adds humidity and removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: img('rubber-plant'), description: 'Easy-care plant that cleans indoor air.', cost: 17 },
      { name: 'Aloe Vera', image: img('aloe-vera'), description: 'Purifies air and soothes burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: img('lavender'), description: 'Calming scent that promotes relaxation.', cost: 20 },
      { name: 'Jasmine', image: img('jasmine'), description: 'Sweet fragrance that uplifts the mood.', cost: 18 },
      { name: 'Rosemary', image: img('rosemary'), description: 'Fragrant herb used in cooking and aromatherapy.', cost: 15 },
      { name: 'Mint', image: img('mint'), description: 'Refreshing aroma, great for teas.', cost: 12 },
      { name: 'Lemon Balm', image: img('lemon-balm'), description: 'Citrusy scent that reduces stress.', cost: 14 },
      { name: 'Hyacinth', image: img('hyacinth'), description: 'Intense floral fragrance for spring.', cost: 22 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: img('zz-plant'), description: 'Thrives on neglect and low light.', cost: 25 },
      { name: 'Pothos', image: img('pothos'), description: 'Hardy trailing vine for any room.', cost: 10 },
      { name: 'Cast Iron Plant', image: img('cast-iron-plant'), description: 'Nearly indestructible, tolerates shade.', cost: 22 },
      { name: 'Jade Plant', image: img('jade-plant'), description: 'Long-lived succulent needing little water.', cost: 16 },
      { name: 'Chinese Evergreen', image: img('chinese-evergreen'), description: 'Tolerates low light and irregular watering.', cost: 19 },
      { name: 'Haworthia', image: img('haworthia'), description: 'Compact succulent that is easy to keep.', cost: 11 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const Navbar = () => (
    <div className="navbar">
      <div>
        <strong>Paradise Nursery</strong>
      </div>
      <div>
        <a onClick={onHomeClick}>Home</a>
        <a onClick={() => setShowCart(false)}>Plants</a>
        <a onClick={() => setShowCart(true)}>Cart</a>
      </div>
      <div className="cart-icon" onClick={() => setShowCart(true)}>
        🛒<span className="cart-count">{totalQuantity}</span>
      </div>
    </div>
  );

  if (showCart) {
    return (
      <div>
        <Navbar />
        <CartItem onContinueShopping={() => setShowCart(false)} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {plantsArray.map((group) => (
        <div key={group.category}>
          <h2 className="category-title">{group.category}</h2>
          <div className="product-grid">
            {group.plants.map((plant) => (
              <div className="product-card" key={plant.name}>
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>{plant.description}</p>
                <p className="product-price">${plant.cost}</p>
                <button
                  className="product-button"
                  disabled={isInCart(plant.name)}
                  onClick={() => handleAddToCart(plant)}
                >
                  {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
