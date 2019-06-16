$(document).ready(function () {

    // perform a get request to get a list of subject to build out the sidebar menu
    $.get("/api/categories", function (dbArray) {
        // take each item and use jQuery to build out the sidebar categories
        for (let i = 0; i < dbArray.length; i++) {
            $("#sidebar").append(`<a href="#!" class="collection-item card-subject" data-id="${dbArray[i].DISTINCT}">${dbArray[i].DISTINCT}</a>`)
        }
    });


    //Listening for Subject selection to pull applicable cards from API GET route.
      $("#sidebar").on("click", ".card-subject", function () {


        // document.addEventListener('DOMContentLoaded', function () {
        //     var elems = document.querySelectorAll('.carousel');
        //     var instances = M.Carousel.init(elems, {
        //         indicators: true,
        //         dist: -200,
        //         padding: 100
        //     });

        // });


        $("#cardCarousel").empty();

        let subject = $(this).data("id");
        console.log("Subject:", subject)

        $.get("/api/cards/" + subject, function (data) {
            console.log("Cards", data);
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