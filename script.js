// بيانات أولية إذا لم تكن موجودة
if (!localStorage.getItem('menuItems')) {
    const initialItems = [
        { id: 1, name: "كبدة حارة", price: 30, category: "كبدة" },
        { id: 2, name: "كبدة بارد", price: 25, category: "كبدة" },
        { id: 3, name: "حواشي مخصوص", price: 40, category: "حواشي" },
        { id: 4, name: "فراخ مشوية", price: 50, category: "فراخ" }
    ];
    localStorage.setItem('menuItems', JSON.stringify(initialItems));
}

// متغيرات عامة
let total = 0;
let menuItems = JSON.parse(localStorage.getItem('menuItems'));

// عند تحميل الصفحة الرئيسية
if (document.getElementById('menu-items')) {
    displayMenuItems();
}

// عند تحميل صفحة الإدارة
if (document.getElementById('current-items')) {
    displayCurrentItems();
}

// عرض الأصناف في الصفحة الرئيسية
function displayMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';
    
    const categories = [...new Set(menuItems.map(item => item.category))];
    
    categories.forEach(category => {
        const categoryItems = menuItems.filter(item => item.category === category);
        
        categoryItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <i class="fas fa-${getItemIcon(item.category)}"></i>
                <h3>${item.name}</h3>
                <p>${item.price} جنيهاً</p>
            `;
            itemElement.onclick = () => addToBill(item);
            menuContainer.appendChild(itemElement);
        });
    });
}

// عرض الأصناف في صفحة الإدارة
function displayCurrentItems() {
    const itemsContainer = document.getElementById('current-items');
    itemsContainer.innerHTML = '';
    
    menuItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'current-item';
        itemElement.innerHTML = `
            <input type="text" id="item-name-${item.id}" value="${item.name}">
            <input type="number" id="item-price-${item.id}" value="${item.price}">
            <select id="item-category-${item.id}">
                <option value="كبدة" ${item.category === 'كبدة' ? 'selected' : ''}>كبدة</option>
                <option value="حواشي" ${item.category === 'حواشي' ? 'selected' : ''}>حواشي</option>
                <option value="فراخ" ${item.category === 'فراخ' ? 'selected' : ''}>فراخ</option>
            </select>
            <button onclick="updateItem(${item.id})" class="edit-btn">تحديث</button>
        `;
        itemsContainer.appendChild(itemElement);
    });
}

// إضافة صنف جديد
function addNewItem() {
    const name = document.getElementById('new-item-name').value;
    const price = parseFloat(document.getElementById('new-item-price').value);
    const category = document.getElementById('new-item-category').value;
    
    if (name && price) {
        const newItem = {
            id: menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1,
            name,
            price,
            category
        };
        
        menuItems.push(newItem);
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        
        // تحديث العرض
        displayCurrentItems();
        
        // مسح حقول الإدخال
        document.getElementById('new-item-name').value = '';
        document.getElementById('new-item-price').value = '';
        
        alert('تمت إضافة الصنف بنجاح');
    } else {
        alert('الرجاء إدخال اسم الصنف والسعر');
    }
}

// تحديث صنف موجود
function updateItem(itemId) {
    const name = document.getElementById(`item-name-${itemId}`).value;
    const price = parseFloat(document.getElementById(`item-price-${itemId}`).value);
    const category = document.getElementById(`item-category-${itemId}`).value;
    
    if (name && price) {
        const itemIndex = menuItems.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            menuItems[itemIndex] = { id: itemId, name, price, category };
            localStorage.setItem('menuItems', JSON.stringify(menuItems));
            alert('تم تحديث الصنف بنجاح');
        }
    } else {
        alert('الرجاء إدخال اسم الصنف والسعر');
    }
}

// إضافة صنف للفاتورة
function addToBill(item) {
    const billItems = document.getElementById('bill-items');
    const newItem = document.createElement('div');
    newItem.className = 'bill-item';
    newItem.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price} جنيهاً</span>
    `;
    billItems.appendChild(newItem);
    
    // تحديث الإجمالي
    total += item.price;
    document.getElementById('total-amount').textContent = total;
    
    // تأثير عند النقر
    const clickedItem = event.currentTarget;
    clickedItem.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedItem.style.transform = '';
    }, 200);
}

// تصفير الفاتورة
function resetBill() {
    if (confirm('هل تريد تصفير الفاتورة؟')) {
        document.getElementById('bill-items').innerHTML = '';
        total = 0;
        document.getElementById('total-amount').textContent = '0';
    }
}

// الحصول على أيقونة حسب التصنيف
function getItemIcon(category) {
    switch(category) {
        case 'كبدة': return 'utensils';
        case 'حواشي': return 'drumstick-bite';
        case 'فراخ': return 'kiwi-bird';
        default: return 'hamburger';
    }
}
