const slides = document.querySelectorAll(".card-objective-item");

let index = 0;


const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const chooseBtn = document.getElementById("choose-btn");
const newsLink = document.querySelectorAll("#news-link");

const showSlide = (nextIndex) => {
    slides[index].classList.remove("active");
    index = nextIndex;

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

const newsClick = (event) => {
    event.preventDefault();
    alert("Você será direcionado para o site da notícia")
    window.open(event.currentTarget.href, "_blank");
}

showSlide(index);

nextBtn.addEventListener("click", () => {
    showSlide(index + 1);
});

prevBtn.addEventListener("click", () => {
    showSlide(index - 1);
});

chooseBtn.addEventListener("click", () => {
    chooseSlide();
});

newsLink.forEach((link) => {
    link.addEventListener("click", newsClick);
});