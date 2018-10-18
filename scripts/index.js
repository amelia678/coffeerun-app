// ==================
// DOM selection
// ==================
const orderForm = document.querySelector('[data-form]');

// ==================
// Helper functions
// ==================
function handleSubmit(event) {
    event.preventDefault();
    console.log('You get a coffee!')
    console.log(event.target);

    // we're gonna AJax tha thang.
    // Call fetch()
    // pass it the URL
    // and an object with a method and a body
    const url = event.target.action;
    const method = event.target.method;
    const elements = event.target.elements;
    const data = {
        strength: elements.strength.value,
        flavor: elements.flavor.value,
        size: elements.size.value,
        coffee: elements.coffee.value,
        emailAddress: elements.emailAddress.value,
        
    }
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data)
    }).then(r => r.json())
      .then(console.log)

}

// ==================
// Main event listeners
// ==================
console.log('about to add event listenter!')
orderForm.addEventListener('submit', handleSubmit);