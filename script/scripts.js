const slides = document.querySelectorAll(".card-objective-item");

let index = 0;


const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const chooseBtn = document.getElementById("choose-btn");

const showSlide = (nextIndex) => {
    slides[index].classList.remove("active");
    index = newIndex;

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    slides[index].classList.add("active");
}

const chooseSlide = () => {
    const chosenFeature = prompt(
        `Escolha uma etapa de 1 até ${slides.length}`
    );

    if (chosenFeature !== null) {
        const slideIndex = parseInt(chosenFeature);

        if (!isNaN(slideIndex) && slideIndex >= 1 && slideIndex <= slides.length) {
            showSlide(slideIndex - 1);
        } else {
            alert("Valor inválido");
        }
    }
}
