$(document).ready(function () {

    // //Initialize the Carousel
    // $(".carousel").carousel()({
    //     indicators: true,
    //     dist: -200,
    //     padding: 100
    // })


    //Listening for Subject selection to pull applicable cards from API GET route.
    $(".card-subject").on("click", function () {


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
                <div class="card">
                     <div class="front">${cardArray[i].question}</div>
                    <div class="back">${cardArray[i].answer}</div>
                </div>
            </label>`);
            console.log("Q:", cardArray[i].question)
            console.log("A:", cardArray[i].answer)
            $("#cardCarousel").append(carouselCard);
        }
    }


})