$(document).ready(function () {

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

        $("#cardCarousel").empty();

        let subject = $(this).data("id");
        console.log("Subject:", subject)

        $.get("/api/cards/" + subject, function (data) {
            console.log("Cards", data);
            renderCards(data)

            $(".carousel").carousel();

        });
    });

    //Listening for Author selection to pull applicable cards from API GET route.
    $("#sidebarAuth").on("click", ".card-author", function () {

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

            const carouselCard = $("<a class='carousel-item' href='#!'>")

            // carouselCard.addClass("carousel-item");
            carouselCard.data("id", i);
            carouselCard.html(`
            <label>
                <input type="checkbox" />
                <div class="card valign-wrapper center-align" >
                     <div class="front valign-wrapper center-align">${cardArray[i].question}</div>
                    <div class="back valign-wrapper center-align">${cardArray[i].answer}</div>
                </div>
            </label>`);
            console.log("Q:", cardArray[i].question)
            console.log("A:", cardArray[i].answer)
            $("#cardCarousel").append(carouselCard);
        }
    }


})