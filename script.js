let cart = [];

async function fetchProducts() {
  const response = await fetch('products.json');
  const products = await response.json();
  const productList = document.getElementById("productList");

  products.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = \`
      <img src="\${p.image}" alt="\${p.name}"/>
      <div class="product-body">
        <h4>\${p.name}</h4>
        <p>৳\${p.price}</p>
        <button onclick="addToCart(\${p.id})">🛒 Add to Cart</button>
        <a href="#">🔗 ডেমো লিংক</a>
      </div>
    \`;
    productList.appendChild(div);
  });

  window.products = products;
}

function addToCart(id) {
  const product = window.products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("orderDetails").value = cart.map(p => \`\${p.name} - ৳\${p.price}\`).join("\n");
}

function openCheckout() {
  if (cart.length === 0) {
    alert("কার্ট খালি!");
    return;
  }
  document.getElementById("checkoutModal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeCheckout() {
  document.getElementById("checkoutModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function submitOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const orders = document.getElementById("orderDetails").value;

  if (!name || !phone || !address) {
    alert("সকল তথ্য পূরণ করুন");
    return;
  }

  const message = \`নাম: \${name}%0Aমোবাইল: \${phone}%0Aঠিকানা: \${address}%0Aঅর্ডার: %0A\${orders}\`;
  const gmailURL = \`mailto:yourstore@gmail.com?subject=নতুন অর্ডার&body=\${message}\`;
  const whatsappURL = \`https://wa.me/8801XXXXXXXXX?text=\${message}\`;

  window.open(gmailURL, '_blank');
  window.open(whatsappURL, '_blank');

  cart = [];
  updateCart();
  closeCheckout();
  alert("অর্ডার সাবমিট হয়েছে!");
}

fetchProducts();
