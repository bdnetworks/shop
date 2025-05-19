(function() {
    // শুধুমাত্র এই ডোমেইনে কাজ করবে
    const allowedDomain = "radiopipra.blogspot.com"; // এখানে আপনার সাইটের ডোমেইন লিখুন

    // বর্তমান হোস্ট চেক করা
    if (window.location.hostname !== allowedDomain && window.location.hostname !== "www." + allowedDomain) {
      document.documentElement.innerHTML = ""; // পুরো পেইজ ফাঁকা করে দেওয়া
      alert("This site cannot be viewed outside the official domain.");
      window.stop(); // স্ক্রিপ্ট এক্সিকিউশন থামানো
    }
  })();
let products = [];
  let cart = [];

  const productList = document.getElementById("productList");
  const cartCount = document.getElementById("cartCount");
  const orderDetails = document.getElementById("orderDetails");

  fetch('https://bdnetworks.github.io/shop/products.json')
    .then(response => {
      if (!response.ok) throw new Error('পণ্য ডাটা লোড করতে সমস্যা হয়েছে');
      return response.json();
    })
    .then(data => {
      products = data;
      displayProducts();
    })
    .catch(err => {
      productList.innerHTML = `<p style="color:red; text-align:center;">${err.message}</p>`;
    });

  function displayProducts() {
    productList.innerHTML = '';
    products.forEach((p) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${p.image}" alt="${p.name}"/>
        <div class="product-body">
          <h4>${p.name}</h4>
          <p>৳${p.price}</p>
          <button id="btn-${p.id}" onclick="addToCart(${p.id})">🛒 কার্টে যোগ করুন</button>
          <a href="#">🔗 ডেমো লিংক</a>
        </div>`;
      productList.appendChild(div);
    });
  }

  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);
    const btn = document.getElementById(`btn-${id}`);
    if (!existing) {
      cart.push(product);
      btn.textContent = "✔️ কার্টে যোগ হয়েছে";
      btn.classList.add("added");
    } else {
      btn.textContent = "✔️ আগেই যোগ হয়েছে";
    }
    updateCart();
  }

  function updateCart() {
    cartCount.textContent = cart.length;
    orderDetails.value = cart.map(p => `${p.name} - ৳${p.price}`).join("\n");
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
    const orders = orderDetails.value;

    if (!name || !phone || !address) {
      alert("সকল তথ্য পূরণ করুন");
      return;
    }

    const message = `নাম: ${name}%0Aমোবাইল: ${phone}%0Aঠিকানা: ${address}%0Aঅর্ডার: %0A${orders}`;
    const gmailURL = `mailto:saakib.com@gmail.com?subject=নতুন অর্ডার&body=${message}`;
    window.open(gmailURL, '_blank');

    cart = [];
    updateCart();
    closeCheckout();
    alert("অর্ডার সাবমিট হয়েছে!");
  }

  function submitWhatsAppOrder() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const orders = orderDetails.value;

    if (!name || !phone || !address) {
      alert("সকল তথ্য পূরণ করুন");
      return;
    }

    const message = `নাম: ${name}%0Aমোবাইল: ${phone}%0Aঠিকানা: ${address}%0Aঅর্ডার: %0A${orders}`;
    const whatsappURL = `https://wa.me/8801711466850?text=${message}`;
    window.open(whatsappURL, '_blank');
  }

  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  }
