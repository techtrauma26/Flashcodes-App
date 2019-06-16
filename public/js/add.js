$(document).ready(function () {
 
  // Initialize the Modal
  $('#formModal').modal();

  // Get references to page elements
  const $categoryText = $("#category-menu");
  const $questionText = $("#question-text");
  const $answerDescription = $("#answer-description");
  const $authorText = $("#author-text");
  const $submitBtn = $("#submit");


  // Submitting new cards to API POST route.
  $("#submit").on("click", function () {
    // clean up the values from the question and answer fields
    let category = $categoryText.val();
    console.log("Category:", category);
    let question = $questionText.val();
    console.log("Question:", question);
    let answer = $answerDescription.val();
    console.log("Answer:", answer);
    let author = $authorText.val();
    console.log("Author:", author);

    event.preventDefault();
    if (checkForm(category, question, answer, author)) {
      // build a new card object for uploading to the DB
      let card = {
        category: category,
        question: question,
        answer: answer,
        author: author
      }
      $.ajax("/api/cards", {
        type: "POST",
        data: card
      }).then(function () {
        console.log("Successfully added new card to DB.");
        // clear out the text from the entry fields and return dropdown to default value.
        $questionText.val("");
        $answerDescription.val("");
        $categoryText.val("default");
        $authorText.val("");
      });
    }
    // if the form wasn't properly filled out, show the user a modal.
    else {
      $("#formModal").modal('open');
    }
  })

  function checkForm(category, question, answer, author) {
    let passed = true;
    if (category === null || category === undefined || category === "" || category === "default") {
      passed = false;
    }
    if (question === null || question === undefined || question === "") {
      passed = false;
    }
    if (answer === null || answer === undefined || answer === "") {
      passed = false;
    }

    if (author === null || author === undefined || author === "") {
      passed = false;
    }

    console.log("Pass?", passed)
    return passed; // send a true or false based on whether or not the form was filled out properly.
  }

});