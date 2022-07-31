let preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  preloader.remove();
});

let modeIs = document.querySelector(".form-check-input");
let dark_light_mode_label = document.querySelector(".form-check-label");

modeIs.addEventListener("click", () => {
  modeIs.classList.toggle("dark-mode");
  switchMode();
  if (modeIs.classList.contains("dark-mode")) {
    dark_light_mode_label.innerHTML = "Dark Mode";
  } else {
    dark_light_mode_label.innerHTML = "Light Mode";
  }
});

function switchMode() {
  document.querySelector(":root").classList.toggle("dark");
}

let array = [];
let total = document.querySelector(".total h3 span");

class Item {
  constructor(img, price, size, haba, name, id) {
    this.image = img;
    this.size = size;
    this.haba = haba;
    this.price = price;
    this.name = name;
    this.id = id;
  }
}

let time = 4000;

let error = document.querySelector(".error h4");

let addBtn = document.querySelectorAll("#add_to_card");

let card = document.querySelectorAll(".card");

card.forEach((el) => {
  el.addEventListener("mouseover", () => {
    let sizeActive = el.querySelectorAll(".size li");
    sizeActive.forEach((el) => {
      el.addEventListener("click", () => {
        sizeActive.forEach((el) => {
          el.classList.remove("active");
        });
        el.classList.add("active");
      });
    });
  });
});

let colorActive = document.querySelectorAll(".colors ul li");

colorActive.forEach((el) => {
  el.addEventListener("click", () => {
    colorActive.forEach((ele) => {
      ele.classList.remove("active");
    });
    el.classList.add("active");
    document
      .querySelector(":root")
      .style.setProperty("--color", el.dataset.color);
  });
});

addBtn.forEach((ele) => {
  ele.addEventListener("click", () => {
    collectData(ele);
  });
});

function changePrice() {
  let haba = document.querySelectorAll("#number");
  haba.forEach((el) => {
    el.addEventListener("change", () => {
      changeProductPrice(el);
    });
  });
}

changePrice();

function changeProductPrice(el) {
  let father = el.parentElement.parentElement.parentElement;

  let price = father.querySelector("#rule_price");

  let btn = father.querySelector("#add_to_card").dataset.price;

  price.innerHTML =
    (+el.value * btn) % 2 === 0
      ? `${+el.value * btn}.00`
      : `${+el.value * btn}.00`;
}

function collectData(el) {
  let parentEl = el.parentElement.parentElement;

  let img = parentEl.querySelector("img").src;

  let price = parentEl.querySelector("#rule_price").innerHTML;

  let size = parentEl.querySelector(".size .active").dataset.size;

  let haba = parentEl.querySelector("input").value;

  let name = parentEl.querySelector(".brand_name_1").innerHTML;

  let id = Date.now();

  createItem(img, price, size, haba, name, id);
}

function createItem(img, price, size, haba, name, id) {
  let item = new Item(img, price, size, haba, name, id);
  if (array.length !== 0) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].price === item.price) {
        return false;
      } else {
        array.push(item);
        setPopup(array);
        check();
      }
    }
  } else {
    array.push(item);
    setPopup(array);
    check();
  }
}

function setPopup(data) {
  let d = document.querySelectorAll(".new-col");
  d.forEach((el) => {
    el.remove();
  });
  data.forEach((el) => {
    let col = document.createElement("div");
    col.className = "col-12 col-lg-6 mt-3 new-col";

    col.innerHTML = `
    <div class="card p-3 border-none">
      <div class="brand_name">
      <h3 class="brand_name_1 brand_name_2">${el.name}</h3>
        </div>
        <div class="image">
          <img src="${el.image}" alt="Sorry Your Connection So Week">
        </div>
        <p class="text mb-0">size</p>
        <div class="info2 mb-3 d-flex flex-row justify-content-between align-items-center">
          <div class="size">
            <h3 style="font-weight: 500;padding: 6px 15px;background-color: var(--color);color: var(--white)">${el.size}</h3>
          </div>
          <div class="rate">
            <i class="fa-solid fa-star active-star"></i>
            <i class="fa-solid fa-star active-star"></i>
            <i class="fa-solid fa-star active-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
        <div class="add d-flex flex-row justify-content-between gap-2 align-items-center">
        <button id="add_to_card" data-size="4" data-num="1" data-price="16">remove from cart <i
              class="fa-solid fa-bag-shopping"></i></button>
          <div id="price">
            <h3>$<span id="rule_price">${el.price}</span></h3>
          </div>
        </div>
      </div>
    `;
    document.querySelector(".offcanvas-body .row").appendChild(col);

    let removeBtn = col.querySelector("#add_to_card");

    removeFromCart(removeBtn, el.id);
  });
}
let text = document.querySelector(".offcanvas-title");

let numberOfProduct = document.querySelector(".product_number p");
function check() {
  if (array.length !== 0) {
    numberOfProduct.innerHTML = array.length;
    text.innerHTML = `There Is ${array.length} Item In Your Cart`;
  } else {
    numberOfProduct.innerHTML = "0";
    text.innerHTML = "Your Cart Is Empty";
  }
  calculateTotal();
}
check();

function removeFromCart(el, id) {
  el.addEventListener("click", () => {
    el.parentElement.parentElement.parentElement.remove();
    array = array.filter((el) => el.id !== id);
    check();
  });
}

function calculateTotal() {
  let price = 0;
  let cols = document.querySelector(".offcanvas-body .row");
  let prices = cols.querySelectorAll("#rule_price");
  prices.forEach((el) => {
    price += +el.innerHTML;
  });
  total.innerHTML = price;
}
