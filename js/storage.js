const Storage = {
    // 사용자 관리
    getUsers: () => JSON.parse(localStorage.getItem('plue_users')) || [],
    saveUsers: (users) => localStorage.setItem('plue_users', JSON.stringify(users)),
    
    // 현재 로그인 사용자
    getCurrentUser: () => JSON.parse(localStorage.getItem('plue_current_user')),
    setCurrentUser: (user) => localStorage.setItem('plue_current_user', JSON.stringify(user)),
    clearCurrentUser: () => localStorage.removeItem('plue_current_user'),
    
    // 상품 관리
    getProducts: () => JSON.parse(localStorage.getItem('plue_products')) || getDefaultProducts(),
    saveProducts: (products) => localStorage.setItem('plue_products', JSON.stringify(products)),
    
    // 주문 관리
    getOrders: () => JSON.parse(localStorage.getItem('plue_orders')) || [],
    saveOrders: (orders) => localStorage.setItem('plue_orders', JSON.stringify(orders)),
    
    // 모델 관리
    getModels: () => JSON.parse(localStorage.getItem('plue_models')) || getDefaultModels(),
    saveModels: (models) => localStorage.setItem('plue_models', JSON.stringify(models)),
    
    // 초기화
    initialize: () => {
        if (!localStorage.getItem('plue_products')) {
            Storage.saveProducts(getDefaultProducts());
        }
        if (!localStorage.getItem('plue_models')) {
            Storage.saveModels(getDefaultModels());
        }
    }
};

function getDefaultProducts() {
    return [
        { id: 1, name: 'Premium Sneaker', category: 'Shoes', description: 'Minimalist premium sneaker', price: 180000 },
        { id: 2, name: 'Classic White Shoe', category: 'Shoes', description: 'Elegant white leather shoe', price: 220000 },
        { id: 3, name: 'Modern T-Shirt', category: 'Clothing', description: 'Premium cotton t-shirt', price: 45000 },
        { id: 4, name: 'Essential Hoodie', category: 'Clothing', description: 'Comfortable premium hoodie', price: 95000 },
        { id: 5, name: 'Baseball Cap', category: 'Caps', description: 'Minimalist baseball cap', price: 35000 },
        { id: 6, name: 'Bucket Hat', category: 'Caps', description: 'Premium bucket hat', price: 50000 }
    ];
}

function getDefaultModels() {
    return [
        { id: 1, name: '한여름', title: 'Model Candidate' },
        { id: 2, name: '온리예', title: 'Model Candidate' }
    ];
}

Storage.initialize();