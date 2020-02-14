const div = document.querySelector(".list-item")
const openContacts = document.querySelector("#open-contacts");
const searchInput = document.querySelector("#search");

const defaultIcon = "https://saopera.sa.gov.au/wp-content/uploads/2017/11/person-placeholder.jpg";

const loadContacts = async() => {

  const api = (navigator.contacts || navigator.mozContacts);

  const props = ['name', 'tel', 'email', 'icon']
  const opts = { multiple: true };

  try {
    const people = await api.select(props, opts);
    handle(people)
  } catch (err) {
    console.error(err)
  }
}

const handle = people => {
  const temp = people.map(item => template(item))
  div.innerHTML = temp.join('');
}


const handleSearch = event => {
  const value = event.target.value;
  const items = Array.from(document.querySelectorAll('.item'))

  if(value && value.length >= 3) {
    const founded = items.filter(item => !item.innerText.toLowerCase().includes(value.toLowerCase()))
    founded.map(item => item.setAttribute('style', 'display:none'))
  } else {
    items.map(item => item.setAttribute('style', 'display:flex'))
  }
}


const template = data => {
  
  const formatTel = tel => tel.replace(/[^0-9]/g, '');
  const hasIcon = icon => !icon ? defaultIcon : icon;

  return `<div class="item">
    <div class="item__icon">
      <img src="${hasIcon(data.icon)}" width="50">
    </div>
    <div class="item__detail">
      <span>${data.name}</span>
      <span><a href="tel:${formatTel(data.tel)}">${data.tel}</a></span>
      <span><a href="mailto:${data.email}">${data.email}</a></span>
    </div>
  </div>`;
}

searchInput.addEventListener('keyup', handleSearch, false)
openContacts.addEventListener('click', loadContacts, false)