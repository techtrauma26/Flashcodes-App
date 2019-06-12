// Get references to page elements
const $categoryText = $("#category-menu");
const $questionText = $("#question-text");
const $answerDescription = $("#answer-description");
const $submitBtn = $("#submit");

// Submitting new cards to API POST route.
$("#submit").on("click", function() {
  // clean up the values from the question and answer fields
  let category = $categoryText.val().trim();
  let question = $questionText.val().trim(); 
  let answer = $answerDescription.val().trim();
  event.preventDefault();
  if (checkForm(category, question, answer)) {
    // build a new card object for uploading to the DB
    let card = {
      category: category,
      question: question,
      answer: answer
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
      });
  }
  // if the form wasn't properly filled out, show the user a modal.
  else {
    $("#formModal").modal();
  }
})

function checkForm(category, question, answer) {
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
    return passed; // send a true or false based on whether or not the form was filled out properly.
}
