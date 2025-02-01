function saveToLS(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}
function loadFromLS(key) {
  const LSdata = localStorage.getItem(key);
  try {
    const parsedLSdata = JSON.parse(LSdata);
    return parsedLSdata;
  } catch (err) {
    console.log(err);
    return null;
  }
}
function removeFromLS(key) {
  localStorage.removeItem(key);
}

const STORAGE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');
// Populate the form from the local storage || empty form
const storedData = loadFromLS(STORAGE_KEY);
feedbackForm.elements.email.value = storedData?.eMail || '';
feedbackForm.elements.message.value = storedData?.message || '';
// On input
feedbackForm.addEventListener('input', event => {
  const formData = {
    eMail: event.currentTarget.elements.email.value.trim(),
    message: event.currentTarget.elements.message.value.trim(),
  };
  saveToLS(STORAGE_KEY, formData);
});
// On submit
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = {
    eMail: event.currentTarget.elements.email.value.trim(),
    message: event.currentTarget.elements.message.value.trim(),
  };
  if (!formData.eMail || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  event.target.reset();
  removeFromLS(STORAGE_KEY);
});
