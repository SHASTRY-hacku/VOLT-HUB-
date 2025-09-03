// Smooth hero CTA behaviour
function welcomeMessage(){
  alert("Welcome to VOLT-HUB! Happy Shopping 😊");
  document.querySelector("#products").scrollIntoView({behavior:"smooth"});
}

// NAVBAR solid on scroll
const navbar = document.querySelector('.navbar');
function handleNav(){
  if(window.scrollY > 40){
    navbar.classList.remove('transparent'); navbar.classList.add('solid');
  } else {
    navbar.classList.add('transparent'); navbar.classList.remove('solid');
  }
}
window.addEventListener('scroll', handleNav);
handleNav();

// Scroll-trigger animations
const faders = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    }
  });
},{threshold:0.2, rootMargin:"0px 0px -80px 0px"});
faders.forEach(el=>io.observe(el));

// CART LOGIC
const cartList = document.getElementById('cartList');
const emptyCartMsg = document.getElementById('emptyCart');
const totalEl = document.getElementById('total');
let total = 0;

function updateTotal(delta){
  total += delta;
  totalEl.textContent = `Total: ₹${total}`;
  if(cartList.children.length === 0){
    emptyCartMsg.classList.remove('hidden');
  }else{
    emptyCartMsg.classList.add('hidden');
  }
}

document.querySelectorAll('.buyBtn').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const card = e.target.closest('.product');
    const name = card.querySelector('h3').textContent;
    const price = parseInt(card.getAttribute('data-price'), 10);

    const li = document.createElement('li');
    li.innerHTML = `<span>${name}</span><span>₹${price}</span>`;
    const remove = document.createElement('button');
    remove.className = 'removeBtn';
    remove.textContent = 'Remove';
    remove.addEventListener('click', ()=>{
      cartList.removeChild(li);
      updateTotal(-price);
    });
    li.appendChild(remove);
    cartList.appendChild(li);
    updateTotal(price);
  });
});

document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  if(total === 0){ alert('Your cart is empty. Add some products first!'); return; }
  alert('✅ Thank you for shopping with VOLT-HUB! Your order has been placed.');
});
