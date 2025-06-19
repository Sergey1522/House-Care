$(document).ready(function () {

    new WOW().init();

    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }

    });

// carousel
    const cardInfo = [
        {
            name: "Modern house 005",
            address: "Владимирская обл.",
            dimensions: "Габариты: 8,4 м Х 10,5 м",
            square: "Площадь: 154 м2"
        },
        {
            name: "Modern house 004",
            address: "Покровская обл.",
            dimensions: "Габариты: 9,4 м Х 10,0 м",
            square: "Площадь: 154 м2"
        },
        {
            name: "Modern house 003",
            address: "Новгородская обл.",
            dimensions: "Габариты: 7,5 м Х 9,5 м",
            square: "Площадь: 154 м2"
        },
        {
            name: "Modern house 002",
            address: "Нижегородская обл.",
            dimensions: "Габариты: 8,4 м Х 10,5 м",
            square: "Площадь: 154 м2"
        },
        {
            name: "Modern house 001",
            address: "Московская обл.",
            dimensions: "Габариты: 8,4 м Х 10,5 м",
            square: "Площадь: 154 м2"
        },
    ];

    const cards = document.querySelectorAll(".card");
    const dots = document.querySelectorAll(".dot");
    const cardName = document.querySelector(".card-info-description__title");
    const cardAddress = document.querySelector(".card-info-description__address");
    const cardDimensions = document.querySelector('.card-info-preference__dimensions');
    const cardSquare = document.querySelector(".card-info-preference__square");
    const leftArrow = document.querySelector(".nav-arrow.left");
    const rightArrow = document.querySelector(".nav-arrow.right");
    let currentIndex = 0;
    let isAnimating = false;

    function updateCarousel(newIndex) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (newIndex + cards.length) % cards.length;

        cards.forEach((card, i) => {
            const offset = (i - currentIndex + cards.length) % cards.length;

            card.classList.remove(
                "center",
                "left-1",
                "right-1",
                "hidden"
            );

            if (offset === 0) {
                card.classList.add("center");
            } else if (offset === 1) {
                card.classList.add("right-1");
            } else if (offset === cards.length - 1) {
                card.classList.add("left-1");
            } else {
                card.classList.add("hidden");
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        cardName.style.opacity = "0";
        cardAddress.style.opacity = "0";
        cardDimensions.style.opacity = "0";
        cardSquare.style.opacity = "0";

        setTimeout(() => {
            cardName.textContent = cardInfo[currentIndex].name;
            cardAddress.textContent = cardInfo[currentIndex].address;
            cardDimensions.textContent = cardInfo[currentIndex].dimensions;
            cardSquare.textContent = cardInfo[currentIndex].square;
            cardName.style.opacity = "1";
            cardAddress.style.opacity = "1";
            cardDimensions.style.opacity = "1";
            cardSquare.style.opacity = "1";
        }, 300);

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    leftArrow.addEventListener("click", () => {
        console.log('1')
        updateCarousel(currentIndex - 1);
    });

    rightArrow.addEventListener("click", () => {
        console.log('2')
        updateCarousel(currentIndex + 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            updateCarousel(i);
        });
    });

    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            updateCarousel(i);
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            updateCarousel(currentIndex - 1);
        } else if (e.key === "ArrowRight") {
            updateCarousel(currentIndex + 1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                updateCarousel(currentIndex + 1);
            } else {
                updateCarousel(currentIndex - 1);
            }
        }
    }

    updateCarousel(0);

//Menu
    const menu = $('#menu').hide();
    const burger = $('#burger');
    const close = $('#close');
    const nextProject = $('.projects-next a');
    const btnHide = $('.projects-next-hide');
    const projectHide = $('.projects-hide');

    burger.on('click', () => {
        menu.show('slow');
    });

    close.on('click', () => {
        menu.hide('slow');
    });
    $(document).mouseup(function (e) {

        if (!menu.is(e.target)
            && menu.has(e.target).length === 0 || !projectHide.is(e.target)) {
            menu.hide('slow');
            projectHide.hide('slow');
        }
    });
    nextProject.on('click', function () {
        console.log('1')
        projectHide.show('slow');
    });
    btnHide.on('click', function () {
        projectHide.hide('slow');
    });


//ScrollOrder
    let navigation = $('.menu');
    let orderCall = $('.orderCall-link');
    let btn = $('.scroll');
    console.log(btn)

    navigation.on('click', 'a', function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    btn.on("click", function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));

    });
    orderCall.on('click', 'a', function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    })

    function smoothScroll(target) {
        console.log(target)

        $('body,html').animate({
            scrollTop: target.offset().top
        }, 800);
    }

//Validation Form
    let form = $('.form');
    let formPopup = $('.form-popup');
    let formMessage = $('.form-message').hide();
    let formMsgPopup = $('.form-message-popup').hide()
function validateForm () {
    let inputName = $('#name');
    let inputTel = $('#phone');
    let valInput = $('input');
    let hasError = false;


    if (!inputName.val()) {
        console.log('1')
        inputName.addClass('red');
        inputName.next().show('fast');

        hasError = true;

    } else {
        inputName.removeClass('red');
    }
    if (!inputTel.val()) {
        console.log('2')
        inputTel.addClass('red');
        inputTel.next().show('fast');
        hasError = true;
    } else {
        inputTel.removeClass('red');
    }
    if (!$('#checkbox').is(':checked')) {
        hasError = true;
    }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {name: inputName.val(), phone: inputTel.val(),}
        })
            .done(function (msg) {
                if (msg.success) {
                    form.hide('slow');
                    formMessage.show('slow');
                } else {
                    alert('Возникла ошибка');
                    valInput.val('');
                }
                console.log(msg)
            });
    }
}
    function validateFormPopup () {
        let inputName = $('#namePopup');
        let inputTel = $('#phonePopup');
        let valInput = $('.form-popup input');
        let hasErrorPopup = false;


        if (!inputName.val()) {
            console.log('1')
            inputName.addClass('red');
            inputName.next().show('fast')
            hasErrorPopup = true;

        } else {
            inputName.removeClass('red');
        }
        if (!inputTel.val()) {
            console.log('2')
            inputTel.addClass('red');
            inputTel.next().show('fast');
            hasErrorPopup = true;
        } else {
            inputTel.removeClass('red');
        }
        if (!$('#checkboxPopup').is(':checked')) {
            hasErrorPopup = true;
        }

        if (!hasErrorPopup) {
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {name: inputName.val(), phone: inputTel.val(),}
            })
                .done(function (msg) {
                    if (msg.success) {
                        formPopup.hide('slow');
                        formMsgPopup.show('slow');
                    } else {
                        alert('Возникла ошибка');
                        valInput.val('');
                    }
                    console.log(msg)
                });
        }
    }




    $('#submit').click(function () {
        validateForm();
        // let inputName = $('#name');
        // let inputTel = $('#phone');
        // let valInput = $('input');
        // let hasError = false;
        //
        //
        // if (!inputName.val()) {
        //     console.log('1')
        //     inputName.addClass('red');
        //     inputName.next().show('fast')
        //     hasError = true;
        //
        // } else {
        //     inputName.removeClass('red');
        // }
        // if (!inputTel.val()) {
        //     console.log('2')
        //     inputTel.addClass('red');
        //     inputTel.next().show('fast');
        //     hasError = true;
        // } else {
        //     inputTel.removeClass('red');
        // }
        // if (!$('#checkbox').is(':checked')) {
        //     hasError = true;
        // }
        //
        // if (!hasError) {
        //     $.ajax({
        //         method: "POST",
        //         url: "https://testologia.ru/checkout",
        //         data: {name: inputName.val(), phone: inputTel.val(),}
        //     })
        //         .done(function (msg) {
        //             if (msg.success) {
        //                 form.hide('slow');
        //                 formMessage.show('slow');
        //             } else {
        //                 alert('Возникла ошибка');
        //                 valInput.val('');
        //             }
        //             console.log(msg)
        //         });


    });
    let btnSignup = $('#sign');
    console.log(btnSignup)
    let popUp = $('.popup').hide();
    let popupClose = $('.close-popup');
    btnSignup.on('click', function () {

        popUp.show('slow');
        $('#submitPopup').click(function () {
            validateFormPopup();


        });

    });
    popupClose.on('click', function () {
        popUp.hide('slow');
    })



});
