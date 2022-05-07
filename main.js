let mock = [{
    title: "Potrawka z wiperza",
    description: "Wieprz sam zjadłby.",
    url: "img/potrawka-z-kurczaka-z-marchewka-i-ryzem.jpg",
    ingredients: ["3 szklanki mąki pszennej - 480 g", "150 g prawdziwego masła - 3/4 kostki", "2 duże lub 3 małe jajka", "1kg kabaniny", "KaPuSyTa 500g"],
    instruction: [" Czas pieczenia blatu bez warstwy orzechów: 11 minut <br> Czas pieczenia blatu z warstwą orzechów: 12 minut", "Na samym początku ugotuj budyń do masy budyniowej. Będzie on potrzebował kilku godzin, by naturalnie przestygnąć na blacie kuchennym. Pamiętaj też o tym, by wyjąć na blat całą kostkę masła - 200 gramów. Masło również potrzebuje kilku godzin, by naturalnie zmiękło. ", "Mleko z cukrem doprowadź do wrzenia. Zmniejsz moc palnika do minimum i wlej dobrze wymieszany proszek budyniowy z mlekiem. Od razu zacznij mieszać budyń. Możesz trochę zwiększyć moc palnika. Budyń mieszaj krótko, ale energicznie. Powinien się ponownie zagotować i zgęstnieć. Nie mieszaj go też za długo. Tylko tyle, by otrzymać odpowiednią konsystencję."]
}, {
    title: "Kapusta z kbannana",
    description: "Wieprz sam zjadłby.",
    url: "img/najlepszy-domowy-pasztet-drobiowy0-4.jpg",
    ingredients: ["3 szklanki mąki pszennej - 480 g", "150 g prawdziwego masła - 3/4 kostki", "2 duże lub 3 małe jajka", "1kg kabaniny", "KaPuSyTa 500g"],
    instruction: [" Czas pieczenia blatu bez warstwy orzechów: 11 minut <br> Czas pieczenia blatu z warstwą orzechów: 12 minut", "Na samym początku ugotuj budyń do masy budyniowej. Będzie on potrzebował kilku godzin, by naturalnie przestygnąć na blacie kuchennym. Pamiętaj też o tym, by wyjąć na blat całą kostkę masła - 200 gramów. Masło również potrzebuje kilku godzin, by naturalnie zmiękło. ", "Mleko z cukrem doprowadź do wrzenia. Zmniejsz moc palnika do minimum i wlej dobrze wymieszany proszek budyniowy z mlekiem. Od razu zacznij mieszać budyń. Możesz trochę zwiększyć moc palnika. Budyń mieszaj krótko, ale energicznie. Powinien się ponownie zagotować i zgęstnieć. Nie mieszaj go też za długo. Tylko tyle, by otrzymać odpowiednią konsystencję."]
}]
let recipesButtons = document.querySelectorAll(".recipe__image-button");
let modalElement = document.querySelector(".modalRecipe");
let popularElement = document.querySelector(".popular");
let modalRecipe = modalElement.querySelector(".recipe")
let buttonCloseHtml = `<button class="recipe__image-buttonClose button button--inverted">Zamknij</button>`;


recipesButtons.forEach((e) => {
    e.addEventListener("click", recipeButtonMoreClick)
})
modalElement.addEventListener("click", (e) => {
    if (e.target == modalElement) closeModal();
})

loadRecipes(mock);
let addRecipe = document.querySelector(".addRecipe");
let addRecipeFrom = document.querySelector(".addRecipe__form");
let addRecipeButtonToggle = document.querySelector(".addRecipe__buttonToggle");

addRecipeFrom.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(e.target)
    let recipe = {}
    for (var p of formData) {
        recipe[p[0]] = p[1]
    }    
    recipe.ingredients = recipe.ingredients.split("\n");
    recipe.instruction = recipe.instruction.split("\n");
    recipe.ingredients=recipe.ingredients.filter((e)=>{return e.length > 0})
    recipe.instruction=recipe.instruction.filter((e)=>{return e.length > 0})
    console.log(recipe);
    popularElement.appendChild(createRecipeElement(recipe));
    addRecipeFrom.reset();
    addRecipeButtonToggle.click();
});

addRecipeButtonToggle.addEventListener("click", function(e){
    if(e.target.innerHTML=="+")
    {
        addRecipe.classList.remove("addRecipe--hidden");
        e.target.innerHTML=">"
    }
    else{
        addRecipe.classList.add("addRecipe--hidden");
        e.target.innerHTML="+"
    }
})


function removeRecipe(e){
    e.target.parentElement.parentElement.remove();
}

function loadRecipes(recipes) {
    recipes.forEach((recipe) => {        
        popularElement.appendChild(createRecipeElement(recipe));
    })
}

function createRecipeElement(recipe){
    let recipeElem = createElementFromHTML(generateRecipeHtml(recipe));
    recipeElem.querySelector(".recipe__image-button").addEventListener("click", recipeButtonMoreClick);
    recipeElem.querySelector(".recipe__image-buttonRemove").addEventListener("click", removeRecipe);
    return recipeElem;
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function generateRecipeHtml(recipe) {
    let html = `<article class="recipe">
    <figure class="recipe__image">
        <img src="${recipe.url}" alt="The Pulpit Rock">
        <button class="recipe__image-button button"> Przepis </button>
        <button class="recipe__image-buttonRemove button button--inverted"> Usuń </button>
    </figure>
    <section class="recipe__text">
        <h3 class="recipe__text-title">${recipe.title} dynamiczne</h3>
        <p class="recipe__text-description"> ${recipe.description} </p>
        <h4>Składniki</h4>
        <ul class="list recipe__text-ingredients">`;
    recipe.ingredients.forEach((i) => {
        html += `<li itemprop="list__element">${i}</li>`
    })
    html += `</ul>
        <h4>Instrukcja</h4>`;
    recipe.instruction.forEach((i) => {
        html += `<p class="recipe__text-instruction">${i}</p>`
    })
    html += ` </section>
        </article>`;
    return html;
}

function recipeButtonMoreClick(e) {
    changeModal(e)
    openModal();
}

function changeModal(e) {
    let recipeNode = e.target.parentElement.parentElement;
    modalRecipe.innerHTML = recipeNode.innerHTML;
    modalRecipe.querySelector(".recipe__text").classList.add("recipe__text--closed");
    modalRecipe.querySelector(".recipe__image-button").parentElement.innerHTML += buttonCloseHtml;
    modalRecipe.querySelector(".recipe__image-button").remove();
    modalRecipe.querySelector(".recipe__image-buttonClose").addEventListener("click", closeModal);
}

function openModal() {
    modalElement.classList.remove("modalRecipe--hidden");
    setTimeout(() => {
        modalRecipe.querySelector(".recipe__text").classList.remove("recipe__text--closed");
    }, 500)
}

function closeModal() {
    modalRecipe.querySelector(".recipe__text").classList.add("recipe__text--closed");
    setTimeout(() => {
        modalElement.classList.add("modalRecipe--hidden");
    }, 500)
}