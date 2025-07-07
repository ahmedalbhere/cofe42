let total = 0;

function addToBill(itemName, itemPrice) {
    // إضافة العنصر إلى قائمة الفاتورة
    const billItems = document.getElementById('bill-items');
    const newItem = document.createElement('div');
    newItem.className = 'bill-item';
    newItem.innerHTML = `
        <span>${itemName}</span>
        <span>${itemPrice} جنيهاً</span>
    `;
    billItems.appendChild(newItem);
    
    // تحديث الإجمالي
    total += itemPrice;
    document.getElementById('total-amount').textContent = total;
    
    // تأثير عند النقر
    const clickedItem = event.currentTarget;
    clickedItem.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedItem.style.transform = '';
    }, 200);
}

function resetBill() {
    if (confirm('هل تريد تصفير الفاتورة؟')) {
        document.getElementById('bill-items').innerHTML = '';
        total = 0;
        document.getElementById('total-amount').textContent = '0';
    }
}
