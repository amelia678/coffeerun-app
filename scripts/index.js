// ==================
// DOM selection
// ==================
const orderForm = document.querySelector('[data-form]');
const notificationArea = document.querySelector('[data-notification]');




// ==================
// Helper functions
// ==================

function notifyUser(notificationText) {
    // create a div
    const notificationBox = document.createElement('div')
    
    // add some text content
    notificationBox.textContent = notificationText;
    // must check for the exisitence of a .firstChild
    
    notificationArea.innerHTML = "";

    // if (notificationArea.firstChild)
    // notificationArea.removeChild(notificationArea.firstChild);
    // append to...something .... somewhere ...???
    notificationArea.appendChild(notificationBox);
}
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
      .then( (orderInfo) => {
        //   check the order info for errors
            if (orderInfo.name === "ValidationError") {
                notifyUser(`I'm sorry. Please fill out the coffee AND email address field. Thx`);
            } else {
                notifyUser(`Your coffee is being prepared by gnomes`);
                
            }
            
          //gotta wrap it in an anonymous function
      })

}

// ==================
// Main event listeners
// ==================
console.log('about to add event listenter!')
orderForm.addEventListener('submit', handleSubmit);