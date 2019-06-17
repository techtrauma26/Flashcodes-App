$(document).ready(function () {
    // initialize modals
    $('#updateModal').modal();
    $("#deleteModal").modal();

    // perform a get request to get a list of subject to build out the sidebar menu
    $.get("/api/categories", function (dbArray) {
        // take each item and use jQuery to build out the sidebar categories
        for (let i = 0; i < dbArray.length; i++) {
            $("#sidebarSub").append(`<a href="#!" class="collection-item card-subject" data-id="${dbArray[i].DISTINCT}">${dbArray[i].DISTINCT}</a>`)
        }
    });

    // perform a get request to get a list of subject to build out the sidebar menu
    $.get("/api/authors", function (dbArray) {
        // take each item and use jQuery to build out the sidebar categories
        for (let i = 0; i < dbArray.length; i++) {
            $("#sidebarAuth").append(`<a href="#!" class="collection-item card-author" data-id="${dbArray[i].DISTINCT}">${dbArray[i].DISTINCT}</a>`)
        }
    });

    //Listening for Subject selection to pull applicable cards from API GET route.
    $("#sidebarSub").on("click", ".card-subject", function () {

        $(".intro").hide();
        $("#cardCarousel").empty();

        let subject = $(this).data("id");
        console.log("Subject:", subject)

        $.get("/api/cards/" + subject, function (data) {
            //console.log("Cards", data);
            renderCards(data)

            //$(".carousel").carousel();
            $('.carousel').carousel({
                //fullWidth: true,
                indicators: true
              });

        });
    });

    //Listening for Author selection to pull applicable cards from API GET route.
    $("#sidebarAuth").on("click", ".card-author", function () {

        $(".intro").hide();
        $("#cardCarousel").empty();

        let author = $(this).data("id");
        console.log("Author:", author)

        $.get("/api/author/" + author, function (data) {
            console.log("Author", data);
            renderCards(data)

            $(".carousel").carousel();

        });

    });

    function renderCards(data) {
        let cardArray = data

        for (let i = 0; i < cardArray.length; i++) {

            const carouselCard = $(`<a class="carousel-item" href="#!" data-id="${cardArray[i].id}">`)



            carouselCard.html(`
            <label>
                <input type="checkbox" class="checker" id="cb${i}" unchecked />
                <div class="card valign-wrapper center-align" >
                    <div class="front row valign-wrapper center-align">
                    <p class="center-align q">${cardArray[i].question}</p>
                    </div>
                    <div class="back center-align valign-wrapper">
                    <p class="center-align a "> ${cardArray[i].answer}</p>
                    </div>
                   
                        
                </div>
            </label>`);
            console.log("Q:", cardArray[i].question)
            console.log("A:", cardArray[i].answer)
            $("#cardCarousel").append(carouselCard);
        }
    }

    //Listening for Subject selection to pull applicable cards from API GET route.
    $("#sidebarSub").on("click", ".card-subject", function () {

        $("#cardCarousel").empty();

        let subject = $(this).data("id");
        console.log("Subject:", subject)

        $.get("/api/cards/" + subject, function (data) {
            console.log("Cards", data);
            renderCards(data)

            $('.carousel').carousel({
                //fullWidth: true,
                indicators: true
              });

        });
    });



    $("#cardCarousel").scroll(function () {

        $("input[type='checkbox']").prop("checked", false);
        $(".checker").prop("checked", false);
    });

    $('input[type="checkbox"]').click(function(){
        if($(this).prop("checked") == true){
            alert("Checkbox is checked.");
        }
        else if($(this).prop("checked") == false){
            alert("Checkbox is unchecked.");
        }
    });

})

//UPDATE CARD BUTTON
$(".fa-pencil-alt").on("click", function () {
    // Go through each carousel item and find the one with z-index of 0. This is the "current" card to edit
    $(".carousel-item").each(function() {
        var index_current = parseInt($(this).css("zIndex"), 10);
        if (index_current === 0) {
            let cardID = ($(this).data("id")); // the data ID of the card matches the ID in the database
            // do a GET request on the current card that is highlighted
            $.get("/api/card_id/" + cardID, function (currentCardData) {
                updateForm(currentCardData);
            });
        }
    });
})

function updateForm(currentCardData) {
    $("#updateModal").modal('open');  
    console.log(currentCardData[0].question)
    // populate all entries in the modal with the values from the database
    $("#category-menu").val(currentCardData[0].category);
    $("#question-text").val(currentCardData[0].question);
    $("#answer-description").val(currentCardData[0].answer);
    $("#author-text").val(currentCardData[0].author);
    // upon hitting the submit button, perform the API post to the DB.
}

$("#updateSubmit").on("click", function () {
    $(".carousel-item").each(function() {
        var index_current = parseInt($(this).css("zIndex"), 10);
        if (index_current === 0) {
            let cardID = ($(this).data("id")); // the data ID of the card matches the ID in the database
            //console.log("/api/update/" + cardID)
            // get the new card info from the form
            let currentCard = {
                id: cardID,
                category: $("#category-menu").val(),
                question: $("#question-text").val(),
                author: $("#author-text").val(),
                answer: $("#answer-description").val()
            }
            $.ajax({
                url: "/api/update",
                method: "PUT",
                data: currentCard,
                success: function(result) {    
                    // show success message  
                    M.toast({html: 'Card successfully updated!', classes: 'rounded', displayLength: 1500, outDuration: 600});
                    let subject = $("#category-menu").val();
                    console.log(subject)
                    // clear out all entries from the form upon successful update
                    $("#category-menu").val("");
                    $("#question-text").val("");
                    $("#answer-description").val("");
                    $("#author-text").val("");
                    // close the update form modal
                    $("#updateModal").modal('close');  
                    // finally, reload the carousel to reflect the changes
                    reRender(subject); 
                }
            });
        }
    });
})

// DELETE Button features
$(".fa-times-circle").on("click", function () {
    // Go through each carousel item and find the one with z-index of 0. This is the "current" card to edit
    $("#deleteModal").modal('open');  
})

$("#confirmDeleteButton").on("click", function() {
    $(".carousel-item").each(function() {
        var index_current = parseInt($(this).css("zIndex"), 10);
        if (index_current === 0) {
            let cardID = ($(this).data("id")); // the data ID of the card matches the ID in the database
            $.ajax({
                url: "/api/delete/" + cardID,
                method: "DELETE",
                success: function(result) {    
                    // show success message  
                    M.toast({html: 'Card Deleted!', classes: 'rounded delete-toast', displayLength: 1500, outDuration: 600});
                    $("#deleteModal").modal('close');
                    let subject = "HTML";
                    reRender(subject);
                }
            });
        }
    });
})

// Dedicated button for canceling delete
$("#cancelDelete").on("click", function(){
    $("#deleteModal").modal('close');
})

function reRender (subject) {
    console.log("running")
    $("#cardCarousel").empty();
    $.get("/api/cards/" + subject, function (data) {

        // let subject = $(this).data("id");
        let cardArray = data;

        for (let i = 0; i < cardArray.length; i++) {

            const carouselCard = $(`<a class="carousel-item" href="#!" data-id="${cardArray[i].id}">`)

            carouselCard.html(`
            <label>
                <input type="checkbox" class="checker" id="cb${i}" unchecked />
                <div class="card valign-wrapper center-align" >
                    <div class="front row valign-wrapper center-align">
                    <p class="center-align q">${cardArray[i].question}</p>
                    </div>
                    <div class="back center-align valign-wrapper">
                    <p class="center-align a "> ${cardArray[i].answer}</p>
                    </div>
                </div>
            </label>`);
            console.log("Q:", cardArray[i].question)
            console.log("A:", cardArray[i].answer)
            $("#cardCarousel").append(carouselCard);
        }
        $('.carousel').carousel({
            //fullWidth: true,
            indicators: true
          });

    }); 
}