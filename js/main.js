const cartWrapper = document.getElementById("cartWrapper");
const totalProducts = document.getElementById("totalProducts");
const totalItems = document.getElementById("totalItems");

let products = [];

const setCount = () => {
  let totalCount = 0;

  for (const i in products) {
    totalCount += products[i].count;
  }

  totalItems.innerText = totalCount.toString();
  return totalCount;
};

const totalPrice = () => {
  let totalCart = 0;

  for (const i in products) {
    totalCart += products[i].price * products[i].count;
  }
  totalProducts.innerHTML = totalCart.toString();
  return totalCart;
};

const productsList = () => {
  cartWrapper.innerHTML = products.map((product) => {
    return `
      <div class="cart-item">
      <div class="cart-item-content">
      <span>${product.product}</span>
      <span>Cantidad: ${product.count}</span>
      </div>
      <span> $ ${product.price}</span>
      </div>
      </div>
      `;
  });

  var saveObjectStorage = () => {
    localStorage.setItem("cosasGuardadas", JSON.stringify(products));
  };

  saveObjectStorage();
};

const addProduct = (product, price, count) => {
  // console.log(products)
  for (const i in products) {
    if (products[i].product === product) {
      products[i].count++;
      setCount();
      totalPrice();
      productsList();
      return;
    }
  }

  products.push({ product, price, count });
  setCount();
  totalPrice();
  productsList();
};

const storedInput = JSON.parse(localStorage.getItem("cosasGuardadas"));

console.log(storedInput)
const showLocalStorage = () => {
  cartWrapper.innerHTML = storedInput.map((stored) => {
    return `
    <div class="cart-item">
    <div class="cart-item-content">
    <span>${stored.product}</span>
    <span>Cantidad: ${stored.count}</span>
    </div>
    <span> $ ${stored.price}</span>
    </div>
    </div>
    `;
  });

  const localTotal = () => {
    totalProducts.innerHTML = storedInput.map((storedLocal) => {
      let priceTotalLocal = storedLocal.price * storedLocal.count;
      // console.log(priceTotalLocal);
      let totalToNumber = Number(priceTotalLocal);
      // console.log(totalToNumber);

      return `
      <span id="totalProducts"></span>
      $ ${priceTotalLocal}
      </span>
      `;
    });
  };

  localTotal();
};

window.onload = showLocalStorage;

// Hamburger Menu
$(function () {
  $(".header__mobile-nav-link").click(function () {
    // Calling a function in case you want to expand upon this.
    toggleNav();
  });
});

function toggleNav() {
  $("#l-site-wrapper").toggleClass("show-nav");
}

