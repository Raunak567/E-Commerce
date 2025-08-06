const products = [
            {
                id: 1,
                name: 'Wireless Headphones',
                price: 199.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                rating: 4,
                category: 'Electronics'
            },
            {
                id: 2,
                name: 'Smart Watch',
                price: 249.99,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                rating: 5,
                category: 'Electronics'
            },
            {
                id: 3,
                name: 'Leather Wallet',
                price: 59.99,
                image: 'https://images.unsplash.com/photo-1591561954555-607968c989ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                rating: 4,
                category: 'Fashion'
            },
            {
                id: 4,
                name: 'Blender',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1573521193826-58c7dc2e13a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                rating: 3,
                category: 'Home'
            },
            {
                id: 5,
                name: 'Running Shoes',
                price: 129.99,
                image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                rating: 5,
                category: 'Sports'
            },
            {
                id: 6,
                name: 'Backpack',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                rating: 4,
                category: 'Fashion'
            },
            {
                id: 7,
                name: 'Coffee Maker',
                price: 149.99,
                image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                rating: 4,
                category: 'Home'
            },
            {
                id: 8,
                name: 'Yoga Mat',
                price: 39.99,
                image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
                rating: 3,
                category: 'Sports'
            }
        ];

        // Cart functionality
        let cart = [];
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartButton = document.getElementById('cart-button');
        const closeCartButton = document.getElementById('close-cart');
        const continueShoppingButton = document.getElementById('continue-shopping');
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartTotalElement = document.getElementById('cart-total');
        const cartCountElement = document.getElementById('cart-count');
        const productsContainer = document.getElementById('products-container');

        // Render products
        function renderProducts() {
            productsContainer.innerHTML = '';
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'group relative product-card transition duration-300 ease-in-out';
                
                const ratingStars = Array(5).fill('').map((_, i) => 
                    i < product.rating ? 
                    '<i class="fas fa-star text-yellow-400"></i>' : 
                    '<i class="far fa-star text-yellow-400"></i>'
                ).join('');
                
                productElement.innerHTML = `
                    <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${product.name}
                            </h3>
                            <div class="mt-1 flex items-center">
                                ${ratingStars}
                                <span class="text-gray-500 text-xs ml-1">(${product.rating})</span>
                            </div>
                        </div>
                        <p class="text-sm font-medium text-gray-900">$${product.price.toFixed(2)}</p>
                    </div>
                    <div class="mt-4">
                        <button class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 add-to-cart" data-id="${product.id}">
                            Add to cart
                        </button>
                    </div>
                `;
                productsContainer.appendChild(productElement);
            });

            // Add event listeners to all "Add to cart" buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }

        // Add to cart function
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }

            updateCart();
            showCart();
            
            // Show added to cart notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center';
            notification.innerHTML = `
                <i class="fas fa-check-circle mr-2"></i>
                Added to cart!
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }

        // Remove from cart function
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        // Update quantity function
        function updateQuantity(productId, newQuantity) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = Math.max(1, newQuantity);
                updateCart();
            }
        }

        // Update cart UI
        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.textContent = totalItems;
            
            // Update cart items
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                emptyCartMessage.style.display = 'flex';
                cartTotalElement.textContent = '$0.00';
                return;
            }
            
            emptyCartMessage.style.display = 'none';
            
            cart.forEach(item => {
                const cartItemElement = document.createElement('li');
                cartItemElement.className = 'py-6 flex cart-item-enter';
                
                cartItemElement.innerHTML = `
                    <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-center object-cover">
                    </div>
                    <div class="ml-4 flex-1 flex flex-col">
                        <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                                <h3>${item.name}</h3>
                                <p class="ml-4">$${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">${item.category}</p>
                        </div>
                        <div class="flex-1 flex items-end justify-between text-sm">
                            <div class="flex items-center">
                                <button class="text-gray-500 px-2 py-1 rounded-md border border-gray-300 quantity-decrease" data-id="${item.id}">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="mx-2">${item.quantity}</span>
                                <button class="text-gray-500 px-2 py-1 rounded-md border border-gray-300 quantity-increase" data-id="${item.id}">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500 remove-item" data-id="${item.id}">
                                Remove
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            // Update cart total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotalElement.textContent = `$${total.toFixed(2)}`;
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.quantity-decrease').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('button').getAttribute('data-id'));
                    const item = cart.find(item => item.id === productId);
                    if (item && item.quantity > 1) {
                        updateQuantity(productId, item.quantity - 1);
                    }
                });
            });
            
            document.querySelectorAll('.quantity-increase').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('button').getAttribute('data-id'));
                    const item = cart.find(item => item.id === productId);
                    if (item) {
                        updateQuantity(productId, item.quantity + 1);
                    }
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
        }

        // Show cart
        function showCart() {
            cartSidebar.classList.remove('translate-x-full');
            cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
            cartOverlay.classList.add('opacity-100');
        }

        // Hide cart
        function hideCart() {
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.remove('opacity-100');
            cartOverlay.classList.add('opacity-0', 'pointer-events-none');
        }

        // Event listeners
        cartButton.addEventListener('click', showCart);
        closeCartButton.addEventListener('click', hideCart);
        continueShoppingButton.addEventListener('click', hideCart);
        cartOverlay.addEventListener('click', hideCart);

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            updateCart();
        });