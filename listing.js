const form = document.querySelector('#listing-form');
const titleInput = document.querySelector('#title');
const categoryInput = document.querySelector('#category');
const priceInput = document.querySelector('#price');
const conditionInput = document.querySelector('#condition');
const imageInput = document.querySelector('#image');

const previewTitle = document.querySelector('#preview-title');
const previewCategory = document.querySelector('#preview-category');
const previewPrice = document.querySelector('#preview-price');
const previewCondition = document.querySelector('#preview-condition');
const previewImage = document.querySelector('#preview-image');

let selectedImage = '';

function formatPrice(value) {
  const amount = Number(value);
  if (!value || Number.isNaN(amount)) return '₦0';
  return `₦${amount.toLocaleString('en-NG')}`;
}

titleInput.addEventListener('input', () => {
  previewTitle.textContent = titleInput.value.trim() || 'Your listing title';
});

categoryInput.addEventListener('change', () => {
  previewCategory.textContent = categoryInput.value || 'Category';
});

priceInput.addEventListener('input', () => {
  previewPrice.textContent = formatPrice(priceInput.value);
});

conditionInput.addEventListener('change', () => {
  previewCondition.textContent = conditionInput.value || 'Condition';
});

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];

  if (!file) {
    selectedImage = '';
    previewImage.style.backgroundImage = '';
    previewImage.innerHTML = '<span>Photo preview</span>';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('Please choose an image smaller than 5 MB.');
    imageInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    selectedImage = reader.result;
    previewImage.innerHTML = '';
    previewImage.style.backgroundImage = `url('${selectedImage}')`;
  };
  reader.readAsDataURL(file);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const listing = {
    name: titleInput.value.trim(),
    category: categoryInput.value,
    price: formatPrice(priceInput.value),
    seller: 'You',
    condition: conditionInput.value,
    description: document.querySelector('#description').value.trim(),
    image: selectedImage
  };

  if (!listing.name || !listing.category || !listing.price || !listing.condition) {
    alert('Please complete the required listing fields.');
    return;
  }

  const savedListings = JSON.parse(localStorage.getItem('smartListings') || '[]');
  savedListings.unshift(listing);
  localStorage.setItem('smartListings', JSON.stringify(savedListings));

  window.location.href = 'mark.html';
});

document.querySelector('#login-button').addEventListener('click', () => {
  alert('Cognito login will be connected in a later step.');
});

