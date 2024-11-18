const cartItems = [];  // ใช้ตัวแปรนี้แทนการประกาศหลายครั้ง

// ฟังก์ชันสลับหน้า
function showPage(pageId) {
  // ซ่อนทุกหน้า
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  // แสดงหน้าที่ต้องการ
  document.getElementById(pageId).classList.add('active');
}

// เพิ่มสินค้าในตะกร้า
function addToCart(name, price, image) {
  const itemIndex = cartItems.findIndex(item => item.name === name);
  if (itemIndex > -1) {
    cartItems[itemIndex].quantity++;
  } else {
    cartItems.push({ name, price, quantity: 1, image });
  }
  updateCart();
}

// อัปเดตตะกร้าสินค้า
function updateCart() {
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  cartItemsContainer.innerHTML = '';  // Clear previous items

  let total = 0;
  cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // เพิ่มการแสดงรูปภาพสินค้า
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">฿${item.price} x ${item.quantity}</div>
      </div>
      <div class="cart-item-controls">
        <button onclick="changeQuantity('${item.name}', -1)"><i class="fas fa-minus-circle"></i></button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity('${item.name}', 1)"><i class="fas fa-plus-circle"></i></button>
      </div>
      <div class="cart-item-total">฿${itemTotal}</div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  document.getElementById('totalAmount').textContent = `ยอดรวม: ฿${total}`;
}

// เปลี่ยนจำนวนสินค้าในตะกร้า
function changeQuantity(name, delta) {
  const item = cartItems.find(item => item.name === name);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    const index = cartItems.indexOf(item);
    cartItems.splice(index, 1);
  }
  updateCart();
}

// ชำระเงิน
function checkout() {
  alert("ขอบคุณที่ใช้บริการ ยอดรวมของคุณคือ " + document.getElementById('totalAmount').textContent.split(" ")[1]);
  cartItems.length = 0;  // Clear the cart
  updateCart();  // Update the cart display
}