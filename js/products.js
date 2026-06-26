const Products = {
    renderProducts: () => {
        const products = Storage.getProducts();
        const grid = document.getElementById('productsGrid');

        if (!grid) return;

        grid.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card fade-in';
            card.innerHTML = `
                <div class="product-image">
                    <div class="placeholder">${product.category.toUpperCase()}</div>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <button class="btn-details">View Details</button>
            `;
            grid.appendChild(card);
        });
    },

    populateOrderForm: () => {
        const products = Storage.getProducts();
        const select = document.getElementById('product');

        if (!select) return;

        select.innerHTML = '<option value="">선택하세요</option>';
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.name}`;
            select.appendChild(option);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Products.renderProducts();
    Products.populateOrderForm();

    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const currentUser = Storage.getCurrentUser();
            if (!currentUser) {
                alert('주문을 하려면 로그인이 필요합니다.');
                document.getElementById('loginBtn').click();
                return;
            }

            const phone = document.getElementById('phone').value;
            const productId = parseInt(document.getElementById('product').value);
            const quantity = parseInt(document.getElementById('quantity').value);

            const products = Storage.getProducts();
            const product = products.find(p => p.id === productId);

            if (product) {
                const orders = Storage.getOrders();
                orders.push({
                    id: Date.now(),
                    userName: currentUser.name,
                    phone,
                    product: product.name,
                    quantity,
                    createdAt: new Date().toISOString()
                });
                Storage.saveOrders(orders);

                showAlert('주문이 완료되었습니다.\n확인 후 순차적으로 안내드리겠습니다.');
                orderForm.reset();
            }
        });
    }
});