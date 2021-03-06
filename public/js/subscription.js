$(document).ready(() => {
  // Getting references to our form and input
  const subscriptionForm = $("form.subscription");
  const nameInput = $("input#subscription-name-input");
  const priceInput = $("input#subscription-price-input");
  const frequencyInput = $("select#subscription-frequency-input");
  const categoryInput = $("select#subscription-category-input");
  const dateInput = $("input#subscription-date-input");
  const deleteSubscriptionButton = $(".delete-subscription-button");
  const editSubscriptionButton = $(".edit-subscription-button");
  const confirmDeleteButton = $("#confirm-delete-button");
  const confirmEditButton = $("#confirm-edit-button");
  const subscriptionNameToDelete = $("#subscription-name-to-delete");
  const subscriptionNameToEdit = $("#subscription-name-to-edit");

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

  deleteSubscriptionButton.on("click", event => {
    //Set attribute value of confirm delete button and put text into modal.
    // eslint-disable-next-line prettier/prettier
    const nameToDelete = event.target.getAttribute("data-subscription-id") === null ? event.target.parentNode.parentNode.previousElementSibling.innerText : event.target.parentNode.previousElementSibling.innerText;
    // eslint-disable-next-line prettier/prettier
    const idToDelete = event.target.getAttribute("data-subscription-id") === null ? event.target.parentNode.getAttribute("data-subscription-id") : event.target.getAttribute("data-subscription-id"); 
    //Output the subscription name in the modal.
    subscriptionNameToDelete.text(nameToDelete);
    //Create/Set the data-subscription-id attribute to the id of the subscription to be deleted for the confirm button.
    confirmDeleteButton.attr("data-subscription-id", idToDelete);
  });

  editSubscriptionButton.on("click", event => {
    //Get the id for this card to be edited.
    // eslint-disable-next-line prettier/prettier
    const idToEdit = event.target.getAttribute("data-subscription-id") === null ? event.target.parentNode.getAttribute("data-subscription-id") : event.target.getAttribute("data-subscription-id");

    //From this subscription card, get all the data values that correspond to this subscription.
    const thisCardElement = $(`#card${idToEdit}`);
    const nameToEdit = thisCardElement.attr("data-name");
    const priceToEdit = thisCardElement.attr("data-price");
    const frequencyToEdit = thisCardElement.attr("data-frequency");
    const categoryToEdit = thisCardElement.attr("data-category");
    const withdrawalToEdit = thisCardElement.attr("data-withdrawalDate");

    //Put the name into the card header.
    subscriptionNameToEdit.text(nameToEdit);

    //Fill in the form input vales and placeholders.
    $("#subscription-price-edit-input").val(priceToEdit);
    $("#subscription-price-edit-input").attr("placeholder", priceToEdit);
    $("#subscription-frequency-edit-input").val(frequencyToEdit);
    $("#subscription-category-edit-input").val(categoryToEdit);
    $("#subscription-date-edit-input").val(withdrawalToEdit);

    //Set the attribute for the confirm button to hold this id to be sent over to the db.
    confirmEditButton.attr("data-subscription-id", idToEdit);
  });

  //Sends PUT request to /subscriptions with subscription ID.
  confirmEditButton.on("click", event => {
    //Get the data to be sent over.

    const editedDateOutput = getDateOutput(
      $("#subscription-date-edit-input")
        .val()
        .trim()
    );

    $.ajax("/api/subscription", {
      url: "/api/subscription",
      type: "PUT",
      data: {
        id: event.target.getAttribute("data-subscription-id"),
        price: $("#subscription-price-edit-input")
          .val()
          .trim(),
        frequency: $("#subscription-frequency-edit-input")
          .val()
          .trim(),
        category: $("#subscription-category-edit-input")
          .val()
          .trim(),
        withdrawalDate: $("#subscription-date-edit-input")
          .val()
          .trim(),
        withdrawalDateOutput: editedDateOutput
      }
    })
      .then(() => {
        console.log("in then block of js file");
        //window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert

        //Reload the page so that /members can be in charge of displaying/updating subscriptions for the user to view.
        location.reload();
      })
      .catch(handleLoginErr);
  });

  //Sends DELETE(destroy) request to /subscriptions with subscription ID.
  confirmDeleteButton.on("click", event => {
    //Get the data to be sent over.
    const requestData = {
      // eslint-disable-next-line prettier/prettier
      id: event.target.getAttribute("data-subscription-id")
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
