// Category Page Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get category from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  
  if (!category) {
    window.location.href = 'index.html';
    return;
  }
  
  // Set up category banner and title
  setupCategoryBanner(category);
  
  // Load items for this category
  loadCategoryItems(category);
  
  // Filter functionality
  const searchInput = document.getElementById('searchItems');
  const sortSelect = document.getElementById('sortBy');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const applyFiltersBtn = document.getElementById('applyFilters');
  
  // Update price range value display
  if (priceRange && priceValue) {
    priceRange.addEventListener('input', function() {
      priceValue.textContent = `$${this.value}`;
    });
  }
  
  // Apply filters button
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', function() {
      loadCategoryItems(category, true);
    });
  }
  
  // Setup category banner with appropriate image and title
  function setupCategoryBanner(category) {
    const categoryBanner = document.getElementById('categoryBanner');
    if (!categoryBanner) return;
    
    let bannerImage, categoryTitle, categoryDescription;
    
    switch (category) {
      case 'vegetarian':
        bannerImage = 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg';
        categoryTitle = 'Vegetarian Delights';
        categoryDescription = 'Explore our fresh and healthy vegetarian options';
        break;
      case 'non-vegetarian':
        bannerImage = 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg';
        categoryTitle = 'Non-Vegetarian Specialties';
        categoryDescription = 'Premium meat dishes prepared to perfection';
        break;
      case 'seafood':
        bannerImage = 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg';
        categoryTitle = 'Fresh Seafood';
        categoryDescription = 'Ocean-fresh seafood delicacies';
        break;
      case 'desserts':
        bannerImage = 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg';
        categoryTitle = 'Delicious Desserts';
        categoryDescription = 'Sweet treats to satisfy your cravings';
        break;
      case 'street-food':
        bannerImage = 'https://images.pexels.com/photos/2689419/pexels-photo-2689419.jpeg';
        categoryTitle = 'Street Food Favorites';
        categoryDescription = 'Authentic street flavors in every bite';
        break;
      case 'drinks':
        bannerImage = 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg';
        categoryTitle = 'Refreshing Drinks';
        categoryDescription = 'Quench your thirst with our beverage selection';
        break;
      case 'ice-creams':
        bannerImage = 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg';
        categoryTitle = 'Creamy Ice Creams';
        categoryDescription = 'Cool down with our delicious frozen treats';
        break;
      case 'fast-food':
        bannerImage = 'https://images.pexels.com/photos/1893557/pexels-photo-1893557.jpeg';
        categoryTitle = 'Fast Food Favorites';
        categoryDescription = 'Quick, tasty options for on-the-go';
        break;
      default:
        bannerImage = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg';
        categoryTitle = 'Explore Our Menu';
        categoryDescription = 'Find your favorite dishes';
    }
    
    // Set banner content
    categoryBanner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bannerImage}')`;
    
    const bannerContent = document.createElement('div');
    bannerContent.className = 'category-banner-content';
    bannerContent.innerHTML = `
      <h1>${categoryTitle}</h1>
      <p>${categoryDescription}</p>
    `;
    
    categoryBanner.appendChild(bannerContent);
    
    // Update page title
    document.title = `${categoryTitle} - YumCart`;
  }
  
  // Load items for this category
  function loadCategoryItems(category, filtered = false) {
    const itemsContainer = document.getElementById('itemsContainer');
    if (!itemsContainer) return;
    
    // Show loading state
    itemsContainer.innerHTML = '<div class="loading-items">Loading items...</div>';
    
    // Get filter values if filtered
    let searchTerm = '';
    let sortBy = 'popular';
    let maxPrice = 50;
    let dietary = {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      nutFree: false
    };
    
    if (filtered) {
      searchTerm = document.getElementById('searchItems').value.toLowerCase();
      sortBy = document.getElementById('sortBy').value;
      maxPrice = parseInt(document.getElementById('priceRange').value);
      
      dietary.vegetarian = document.getElementById('vegetarian').checked;
      dietary.vegan = document.getElementById('vegan').checked;
      dietary.glutenFree = document.getElementById('glutenFree').checked;
      dietary.nutFree = document.getElementById('nutFree').checked;
    }
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate items based on category
      const items = generateCategoryItems(category);
      
      // Apply filters
      let filteredItems = items;
      
      if (filtered) {
        filteredItems = items.filter(item => {
          // Filter by search term
          if (searchTerm && !item.name.toLowerCase().includes(searchTerm) && 
              !item.description.toLowerCase().includes(searchTerm)) {
            return false;
          }
          
          // Filter by price
          if (item.price > maxPrice) {
            return false;
          }
          
          // Filter by dietary preferences
          if (dietary.vegetarian && !item.isVegetarian) {
            return false;
          }
          
          if (dietary.vegan && !item.isVegan) {
            return false;
          }
          
          if (dietary.glutenFree && !item.isGlutenFree) {
            return false;
          }
          
          if (dietary.nutFree && !item.isNutFree) {
            return false;
          }
          
          return true;
        });
        
        // Sort items
        switch (sortBy) {
          case 'price-low':
            filteredItems.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredItems.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredItems.sort((a, b) => b.rating - a.rating);
            break;
          default:
            // Already sorted by popularity
            break;
        }
      }
      
      // Generate HTML for items
      if (filteredItems.length === 0) {
        itemsContainer.innerHTML = `
          <div class="no-items-found">
            <i class="fas fa-search"></i>
            <h3>No items found</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        `;
        return;
      }
      
      let itemsHTML = '';
      
      filteredItems.forEach(item => {
        let badgeHTML = '';
        
        if (item.isBestseller) {
          badgeHTML = '<div class="food-badge bestseller">Bestseller</div>';
        } else if (item.isNew) {
          badgeHTML = '<div class="food-badge new">New</div>';
        } else if (item.isVegetarian) {
          badgeHTML = '<div class="food-badge vegetarian">Vegetarian</div>';
        }
        
        itemsHTML += `
          <div class="food-item">
            ${badgeHTML}
            <div class="food-item-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="food-item-content">
              <div class="food-item-title">
                <h3>${item.name}</h3>
                <div class="food-item-rating">
                  <i class="fas fa-star"></i>
                  <span>${item.rating.toFixed(1)}</span>
                </div>
              </div>
              <p class="food-item-desc">${item.description}</p>
              <div class="food-item-actions">
                <span class="food-item-price">$${item.price.toFixed(2)}</span>
                <button class="btn food-item-btn add-to-cart" 
                  data-id="${item.id}" 
                  data-name="${item.name}" 
                  data-price="${item.price}" 
                  data-img="${item.image}">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        `;
      });
      
      itemsContainer.innerHTML = itemsHTML;
      
      // Add event listeners to new "Add to Cart" buttons
      const addToCartButtons = itemsContainer.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          const name = this.getAttribute('data-name');
          const price = parseFloat(this.getAttribute('data-price'));
          const img = this.getAttribute('data-img');
          
          // Call addToCart from cart.js
          addToCart(id, name, price, img);
          
          // Show confirmation toast
          showToast(`${name} added to cart!`);
        });
      });
    }, 800);
  }
  
  // Notification toast function (same as in cart.js for independence)
  function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
      
      // Add CSS for toast
      const style = document.createElement('style');
      style.textContent = `
        .toast-notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: var(--primary-color);
          color: white;
          padding: 12px 20px;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
          font-weight: 500;
        }
        .toast-notification.show {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Update toast content and show it
    toast.textContent = message;
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Helper function to add item to cart (simplified version of the one in cart.js)
  function addToCart(id, name, price, img) {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('yumcartCart')) || [];
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: id,
        name: name,
        price: price,
        img: img,
        quantity: 1
      });
    }
    
    // Save cart back to localStorage
    localStorage.setItem('yumcartCart', JSON.stringify(cart));
    
    // Update cart count
    const cartCountElements = document.querySelectorAll('#cartCount');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
      element.textContent = count;
    });
  }
  
  // Generate mock data for each category
  function generateCategoryItems(category) {
    const items = [];
    
    // Different items based on category
    switch (category) {
      case 'vegetarian':
        items.push(
          {
            id: 'veg1',
            name: 'Garden Fresh Salad',
            description: 'Mixed greens with seasonal vegetables and balsamic dressing',
            price: 8.99,
            rating: 4.5,
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            isNutFree: true,
            isBestseller: true
          },
          {
            id: 'veg2',
            name: 'Avocado Toast',
            description: 'Sourdough bread topped with avocado, cherry tomatoes, and microgreens',
            price: 9.99,
            rating: 4.8,
            image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg',
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: false,
            isNutFree: true
          },
          {
            id: 'veg3',
            name: 'Vegetable Stir Fry',
            description: 'Mixed vegetables stir-fried with tofu in a savory sauce',
            price: 12.99,
            rating: 4.3,
            image: 'https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg',
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            isNutFree: true
          },
          {
            id: 'veg4',
            name: 'Mushroom Risotto',
            description: 'Creamy arborio rice with wild mushrooms and parmesan',
            price: 14.99,
            rating: 4.7,
            image: 'https://images.pexels.com/photos/6541814/pexels-photo-6541814.jpeg',
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            isNutFree: true,
            isBestseller: true
          },
          {
            id: 'veg5',
            name: 'Spinach and Feta Pie',
            description: 'Flaky pastry filled with spinach and feta cheese',
            price: 10.99,
            rating: 4.4,
            image: 'https://images.pexels.com/photos/6941017/pexels-photo-6941017.jpeg',
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: true
          },
          {
            id: 'veg6',
            name: 'Vegetable Paella',
            description: 'Spanish rice dish with seasonal vegetables and saffron',
            price: 15.99,
            rating: 4.6,
            image: 'https://images.pexels.com/photos/5837792/pexels-photo-5837792.jpeg',
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            isNutFree: true
          },
          {
            id: 'veg7',
            name: 'Eggplant Parmesan',
            description: 'Breaded eggplant with tomato sauce and mozzarella',
            price: 13.99,
            rating: 4.5,
            image: 'https://images.pexels.com/photos/5639329/pexels-photo-5639329.jpeg',
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: true
          },
          {
            id: 'veg8',
            name: 'Quinoa Buddha Bowl',
            description: 'Protein-rich quinoa with roasted vegetables and tahini dressing',
            price: 12.49,
            rating: 4.7,
            image: 'https://images.pexels.com/photos/1546039/pexels-photo-1546039.jpeg',
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            isNutFree: false,
            isNew: true
          },
          {
            id: 'veg9',
            name: 'Vegetable Lasagna',
            description: 'Layers of pasta, vegetables, and cheese in tomato sauce',
            price: 14.49,
            rating: 4.6,
            image: 'https://images.pexels.com/photos/6406460/pexels-photo-6406460.jpeg',
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: true
          },
          {
            id: 'veg10',
            name: 'Stuffed Bell Peppers',
            description: 'Bell peppers filled with rice, beans, and vegetables',
            price: 11.99,
            rating: 4.4,
            image: 'https://images.pexels.com/photos/7656553/pexels-photo-7656553.jpeg',
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            isNutFree: true
          }
        );
        break;
        
      case 'non-vegetarian':
        items.push(
          {
            id: 'nonveg1',
            name: 'Grilled Chicken Breast',
            description: 'Tender chicken breast marinated and grilled to perfection',
            price: 14.99,
            rating: 4.6,
            image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isNutFree: true,
            isBestseller: true
          },
          {
            id: 'nonveg2',
            name: 'Beef Steak',
            description: 'Premium cut beef steak with herb butter',
            price: 22.99,
            rating: 4.8,
            image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isNutFree: true,
            isBestseller: true
          },
          {
            id: 'nonveg3',
            name: 'BBQ Pork Ribs',
            description: 'Slow-cooked pork ribs with homemade BBQ sauce',
            price: 18.99,
            rating: 4.7,
            image: 'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isNutFree: true
          },
          {
            id: 'nonveg4',
            name: 'Lamb Chops',
            description: 'Grilled lamb chops with rosemary and garlic',
            price: 21.99,
            rating: 4.6,
            image: 'https://images.pexels.com/photos/6941021/pexels-photo-6941021.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isNutFree: true
          },
          {
            id: 'nonveg5',
            name: 'Chicken Alfredo Pasta',
            description: 'Creamy pasta with grilled chicken and parmesan',
            price: 15.99,
            rating: 4.5,
            image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: true
          },
          {
            id: 'nonveg6',
            name: 'Bacon Cheeseburger',
            description: 'Beef patty with bacon, cheese, and all the fixings',
            price: 12.99,
            rating: 4.4,
            image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: true
          },
          {
            id: 'nonveg7',
            name: 'Chicken Tikka Masala',
            description: 'Grilled chicken in a creamy tomato sauce with Indian spices',
            price: 16.99,
            rating: 4.7,
            image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isNutFree: true,
            isNew: true
          },
          {
            id: 'nonveg8',
            name: 'Pulled Pork Sandwich',
            description: 'Slow-cooked pulled pork with coleslaw on a brioche bun',
            price: 13.99,
            rating: 4.5,
            image: 'https://images.pexels.com/photos/3662136/pexels-photo-3662136.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: true
          },
          {
            id: 'nonveg9',
            name: 'Meat Lover\'s Pizza',
            description: 'Pizza topped with pepperoni, sausage, bacon, and ham',
            price: 17.99,
            rating: 4.6,
            image: 'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: true
          },
          {
            id: 'nonveg10',
            name: 'Buffalo Wings',
            description: 'Spicy chicken wings with blue cheese dipping sauce',
            price: 12.49,
            rating: 4.5,
            image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isNutFree: true
          }
        );
        break;
        
      // Add similar items for other categories (omitted for brevity)
      default:
        // Add some default items if category not found
        items.push(
          {
            id: 'default1',
            name: 'Chef\'s Special',
            description: 'Our chef\'s special dish of the day',
            price: 16.99,
            rating: 4.7,
            image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isNutFree: false,
            isBestseller: true
          }
        );
    }
    
    return items;
  }
});