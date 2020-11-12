$(document).ready(() => {
  // Getting references to our form and input
  const subscriptionForm = $("form.subscription");
  const nameInput = $("input#subscription-name-input");
  const priceInput = $("input#subscription-price-input");
  const frequencyInput = $("input#subscription-frequency-input");
  const categoryInput = $("input#subscription-category-input");
  const dateInput = $("input#subscription-date-input");

  // When the signup button is clicked, we validate the email and password are not blank
  subscriptionForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      name: nameInput.val().trim(),
      priceInput: priceInput.val().trim(),
      frequencyInput: frequencyInput.val().trim(),
      categoryInput: categoryInput.val().trim(),
      dateInput: dateInput.val().trim()
    };

    if (
      !userData.name ||
      !userData.priceInput ||
      !userData.frequencyInput ||
      !userData.categoryInput ||
      !userData.dateInput
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    newSubscription(
      userData.name,
      userData.priceInput,
      userData.frequencyInput,
      userData.categoryInput,
      userData.dateInput
    );
    nameInput.val("");
    priceInput.val("");
    frequencyInput.val("");
    categoryInput.val("");
    dateInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function newSubscription(name, price, frequency, category, date) {
    $.post("/api/subscription", {
      name: name,
      price: price,
      frequency: frequency,
      category: category,
      withdrawalDate: date
    })
      .then(() => {
        console.log("in then block of js file");
        //window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert

        //Reload the page so that /members can be in charge of displaying/updating subscriptions for the user to view.
        location.reload();
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
