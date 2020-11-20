$(document).ready(() => {
  // Getting references to our form and input
  const subscriptionForm = $("form.subscription");
  const nameInput = $("input#subscription-name-input");
  const priceInput = $("input#subscription-price-input");
  const frequencyInput = $("select#subscription-frequency-input");
  const categoryInput = $("select#subscription-category-input");
  const dateInput = $("input#subscription-date-input");
  const deleteSubscriptionButton = $(".delete-subscription-button");

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
    const dateOutput = getDateOutput(date);
    $.post("/api/subscription", {
      name: name,
      price: price,
      frequency: frequency,
      category: category,
      withdrawalDate: date,
      withdrawalDateOutput: dateOutput
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

  //Sends PUT request to /subscriptions with subscription ID.

  //Sends DELETE(destroy) request to /subscriptions with subscription ID.
  deleteSubscriptionButton.on("click", event => {
    //Get the data to be sent over.
    //If the user clicks directly on the icon, go above to the button element to access subscription id.
    //Otherwise, get it from this element that was clicked (the button).
    const requestData = {
      // eslint-disable-next-line prettier/prettier
      id: event.target.getAttribute("data-subscription-id") === null ? event.target.parentNode.getAttribute("data-subscription-id") : event.target.getAttribute("data-subscription-id")
    };

    //Send the delete request, and when it is complete, reload the page.
    $.ajax({
      url: "/api/subscription",
      type: "DELETE",
      data: requestData
    }).then(() => {
      console.log("done");
      location.reload();
    });
  });

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  function getDateOutput(date) {
    // eslint-disable-next-line prettier/prettier
    const dateOutput = (date % 10 === 1 && date !== "11") ? "st" : (date % 10 === 2 && date !== "12") ? "nd" : (date % 10 === 3 && date !== "13") ? "rd" : "th";
    return dateOutput;
  }
});
