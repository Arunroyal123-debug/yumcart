// Optimized Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart
  let cart = JSON.parse(localStorage.getItem('yumcartCart')) || [];
  const cartItemsContainer = document.getElementById('cartItems');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Update cart count on load
  updateCartCount();

  // Add to cart functionality
  document.addEventListener('click', function(e) {
    if (e.target.closest('.add-to-cart')) {
      const button = e.target.closest('.add-to-cart');
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const img = button.dataset.img;
      
      addToCart(id, name, price, img);
      showToast(`${name} added to cart!`);
    }
  }, { passive: true });

  // Cart page specific functionality
  if (cartItemsContainer) {
    renderCart();
    
    // Handle quantity changes and removals
    cartItemsContainer.addEventListener('click', function(e) {
      if (e.target.closest('.decrease')) {
        updateItemQuantity(e.target.closest('.decrease').dataset.id, -1);
      } else if (e.target.closest('.increase')) {
        updateItemQuantity(e.target.closest('.increase').dataset.id, 1);
      } else if (e.target.closest('.cart-item-remove')) {
        removeFromCart(e.target.closest('.cart-item-remove').dataset.id);
      }
    }, { passive: true });
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length > 0) {
        document.getElementById('checkoutModal').classList.add('active');
      }
    }, { passive: true });
  }

  // Modal controls
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-modal')) {
      e.target.closest('.modal-container').classList.remove('active');
    }
  }, { passive: true });

  // Place order button
  const placeOrderBtn = document.getElementById('placeOrderBtn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('checkoutModal').classList.remove('active');
      document.getElementById('orderConfirmationModal').classList.add('active');
      cart = [];
      saveCart();
      updateCartCount();
    }, { passive: true });
  }

  // Back to home button
  const backToHomeBtn = document.querySelector('.btn-back-home');
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    }, { passive: true });
  }

  // Cart functions
  function addToCart(id, name, price, img) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ id, name, price, img, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    if (cartItemsContainer) renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartCount();
    renderCart();
  }

  function updateItemQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        removeFromCart(id);
      } else {
        saveCart();
        renderCart();
      }
    }
  }

  function saveCart() {
    localStorage.setItem('yumcartCart', JSON.stringify(cart));
  }

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
    });
    if (checkoutBtn) {
      checkoutBtn.disabled = count === 0;
    }
  }

  function renderCart() {
    if (!cartItemsContainer) return;
    
    const emptyCartMessage = document.getElementById('emptyCart');
    if (cart.length === 0) {
      if (emptyCartMessage) emptyCartMessage.style.display = 'flex';
      cartItemsContainer.innerHTML = '';
      updateOrderSummary(0);
      return;
    }

    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-content">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <p>Unit Price: $${item.price.toFixed(2)}</p>
          <div class="cart-item-actions">
            <div class="item-quantity">
              <button class="quantity-btn decrease" data-id="${item.id}">
                <i class="fas fa-minus"></i>
              </button>
              <span class="quantity-count">${item.quantity}</span>
              <button class="quantity-btn increase" data-id="${item.id}">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
              <i class="fas fa-trash-alt"></i> Remove
            </button>
          </div>
        </div>
      </div>
    `).join('');

    updateOrderSummary(cart.reduce((total, item) => total + (item.price * item.quantity), 0));
  }

  function updateOrderSummary(subtotal) {
    const deliveryFee = subtotal > 0 ? 2.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('deliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => toast.remove(), 3000);
  }
});