"use-strict"

$(document).ready(function () {
    console.log("ready");
    $('#loading').fadeOut(500, function () {
        $('body').css({ 'overflow': 'auto' })
        $('#loading').css({ "display": "none" })
    });
})
let apiDisplay = document.querySelector('.row');
let searchSection = document.querySelector(".row")
let searchMeals =document.querySelector(".meals")


// sidebar jq
let sideWidth = $(".sidebar-inner").outerWidth(true);
$(".side-bar").css("left", -sideWidth)
$(".open-close-icon").click(function () {
    if ($('.side-bar').css('left') == "0px") {
        closeSlide();

    } else {
        openSlide();
    }
})
function openSlide() {
    $(".open-close-icon").addClass('fa-x');
    $(".side-bar").animate({ left: '0px' }, 700);
    $('.side-bar ul li').animate({ "top": "0px" }, 1000);
}
function closeSlide() {
    $(".open-close-icon").removeClass('fa-x');
    $('.side-bar ul li').animate({ "top": "300px" }, 1000);
    $(".side-bar").animate({ left: -sideWidth }, 700);

}


// HOME API 
getHomeMeal();
async function getHomeMeal() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let data = await response.json();
    let finalData = data.meals;
    displayMeal(finalData);
}
function displayMeal(data) {
    searchMeals.innerHTML='';
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="col-md-3">
        <div onclick="getMealInfo(${data[i].idMeal})" class="img-layer rounded-2 position-relative overflow-hidden">
          <img class="w-100" src="${data[i].strMealThumb}" alt="">
          <div class="img-hover position-absolute d-flex align-items-center bottom-0 ">
            <h3>${data[i].strMeal}</h3>
          </div>
        </div>
      </div> `
    }
    apiDisplay.innerHTML = cartona;
}

//api search by name
async function getSearchByName(mealName) {
    $('#loading').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
    let data = await response.json();
    let finalData = data.meals;
    $('#loading').fadeOut(500);
    displayMealSearch(finalData);
}

//api search by character
async function getSearchByChar(char) {
    $('#loading').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
    let data = await response.json();
    let finalData = data.meals;
    $('#loading').fadeOut(500);
    displayMealSearch(finalData);
}
function displayMealSearch(data) {
    searchMeals.innerHTML='';
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="col-md-3">
        <div onclick="getMealInfo(${data[i].idMeal})" class="img-layer rounded-2 position-relative overflow-hidden">
          <img class="w-100" src="${data[i].strMealThumb}" alt="">
          <div class="img-hover position-absolute d-flex align-items-center bottom-0 ">
            <h3>${data[i].strMeal}</h3>
          </div>
        </div>
      </div> `
    }
    searchMeals.innerHTML = cartona;
}

//api meal info
async function getMealInfo(id) {
    apiDisplay.innerHTML = '';
    $('#loading').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await response.json();
    let finalData = data.meals[0];
    $('#loading').fadeOut(500);
    displayMealInfo(finalData);
}
function displayMealInfo(data) {
    searchMeals.innerHTML='';
    let cartona = ``;
    for (let i = 1; i < 20; i++) {
        if (data[`strMeasure${i}`] && data[`strIngredient${i}`]) {
            cartona += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }
    let strtags = ``;
    if (data.strTags != null) {
        let tags = data.strTags.split(",");
        console.log(tags);
        for (let i = 0; i < tags.length; i++) {
            strtags += `<p class="alert alert-danger mx-1 mb-4 p-1">${tags[i]}</p>`
        }
    }
  
    apiDisplay.innerHTML = `<div class="col-md-4">
    <img class="w-100 rounded-4" src="${data.strMealThumb}" alt="">
    <h2 class="text-white">${data.strMeal}</h2>
</div>
<div class="col-md-8 ">
    <h2 class="text-white">Instructions</h2>
    <p class="text-white">${data.strInstructions}</p>
    <h3 class="text-white">Area :<span>${data.strArea}</span></h3>
    <h3 class="text-white">Category :<span>${data.strCategory}</span></h3>
    <h3 class="text-white">Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${cartona}
    </ul>
    <h3 class="text-white">Tags :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
${strtags}
</ul>
    <a href="${data.strSource}" target="_blank" class="btn btn-success px-3 py-2">Source</a>
    <a href="${data.strYoutube}" target="_blank" class="btn btn-danger px-3 py-2">Youtube</a>

</div>`

}

//api catagrey
async function getCategories() {
    apiDisplay.innerHTML = '';
    $('#loading').fadeIn(500);
    $('#loading').css({ "diaplay": "flex" }, 500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    let finalData = data.categories;
    $('#loading').fadeOut(500);
    displayCategories(finalData);
}
function displayCategories(data) {
    searchMeals.innerHTML='';
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += ` <div class="col-md-3">
        <div onclick="getCategoriesMeals('${data[i].strCategory}')" class="img-layer rounded-2 position-relative overflow-hidden">
            <img class="w-100" src="${data[i].strCategoryThumb}" alt="">
            <div class="img-hover position-absolute text-center bottom-0">
                <h3 class="mb-4">${data[i].strCategory}</h3>
                <p>${data[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>`
    }
    apiDisplay.innerHTML = cartona;
}
async function getCategoriesMeals(category) {
    apiDisplay.innerHTML = '';
    $('#loading').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json();
    let finalData = data.meals;
    $('#loading').fadeOut(500);
    displayMeal(finalData);
}
// api area 
async function getArea() {
    apiDisplay.innerHTML = '';
    $('#loading').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await response.json();
    let finalData = data.meals;
    $('#loading').fadeOut(500);
    displayArea(finalData);
}
function displayArea(data) {
    searchMeals.innerHTML='';
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="col-md-3">
        <div onclick="getAreaMeals('${data[i].strArea}')" class="text-center text-white area-item">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${data[i].strArea}</h3>
        </div>
    </div>`
    }
    apiDisplay.innerHTML = cartona;
}
async function getAreaMeals(area) {
    apiDisplay.innerHTML = '';
    $('#loading').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let data = await response.json();
    let finalData = data.meals;
    $('#loading').fadeOut(500);
    displayMeal(finalData);
}
// end api area 

// api Ingredients 
async function getIngredients() {
    apiDisplay.innerHTML = '';
    $('#loading').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await response.json();
    let finalData = data.meals;
    $('#loading').fadeOut(500);
    displayIngredients(finalData);
}
function displayIngredients(data) {
    searchMeals.innerHTML='';
    let cartona = ``;
    for (let i = 0; i < 20; i++) {
        cartona += ` <div class="col-md-3">
        <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="ingredient text-center text-white">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${data[i].strIngredient}</h3>
            <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
    </div>`
    }
    apiDisplay.innerHTML = cartona;
}
async function getIngredientsMeals(ingredient) {
    apiDisplay.innerHTML = '';
    $('#loading').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let data = await response.json();
    let finalData = data.meals;
    $('#loading').fadeOut(500);
    displayMeal(finalData);


}


//events 
$('#search').click(function () {
    searchSection.innerHTML = `
        <div class="col-md-6">
            <input id="searchFullname" type="text" class="form-control  bg-transparent text-white" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input id="searchCharacter" type="text" maxlength="1"  class="form-control  bg-transparent text-white" placeholder="Search By First Letter">
        </div>`
    closeSlide();

    let searchFullname = document.querySelector('#searchFullname');
    let searchCharacter = document.querySelector('#searchCharacter');

    searchFullname.addEventListener("input", function (e) {
        getSearchByName(e.target.value);
    })

    searchCharacter.addEventListener("input", function (e) {
        getSearchByChar(e.target.value);
    })

})
$('#catagrey').click(function () {
    getCategories();
    closeSlide();

})
$('#area').click(function () {
    getArea();
    closeSlide();

})
$('#Ingredients').click(function () {
    getIngredients();
    closeSlide();

})
$('#contact').click(function () {
    displayContact();
    closeSlide();
})
function displayContact() {
    searchMeals.innerHTML='';
    apiDisplay.innerHTML = `<div class="container w-75">
        <div class="row pt-5 g-4">
            <div class="col-md-6">
                <input onkeyup="validation()" id="nameInput" type="text" class="form-control" placeholder="Enter your Name">
                    <p id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </p>
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="emailInput" type="email" class="form-control" placeholder="Enter your Email">
                <p id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">Email not valid *exemple@yyy.zz</p>
                </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="phoneInput" type="number" class="form-control" placeholder="Enter your Phone">
                <p id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number
            </p>
                </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="ageInput" type="number" class="form-control" placeholder="Enter your Age">
                <p id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid age
            </p>
                </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="passwordInput" type="password" class="form-control" placeholder="Enter your Password">
                <p id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </p>
                </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="repasswordInput" type="password" class="form-control" placeholder="Enter your Repassword">
                <p id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid repassword
            </p>
                </div>
         
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3  d-block m-auto">Submit</button>

    </div>`
    

    let nameInput = document.querySelector('#nameInput');
    nameInput.addEventListener("focus",function(){
        nameFlag =true;
    })
    let emailInput = document.querySelector('#emailInput');
    emailInput.addEventListener("focus",function(){
       emailFlag =true;
    })
    let phoneInput = document.querySelector('#phoneInput');
    phoneInput.addEventListener("focus",function(){
        phoneFlag =true;
    })
    let ageInput = document.querySelector('#ageInput');
    ageInput.addEventListener("focus",function(){
        ageFlag =true;
    })
    let passwordInput = document.querySelector('#passwordInput');
    passwordInput.addEventListener("focus",function(){
        passwordFlag =true;
    })
    let repasswordInput = document.querySelector('#repasswordInput');
    repasswordInput.addEventListener("focus",function(){
       repasswordFlag =true;
    })

}
let nameFlag = false;
let phoneFlag = false;
let ageFlag = false;
let emailFlag = false;
let passwordFlag = false;
let repasswordFlag = false;

//validation 



function validation(){
    if(nameFlag){
        if(validateName()){
            $('#nameAlert').addClass('d-none');
        }else{
            $('#nameAlert').removeClass('d-none')
        }
    }
    if (emailFlag) {
       if ( validateEmail()) {
        $('#emailAlert').addClass('d-none');
       }else{
        $('#emailAlert').removeClass('d-none');
       }
    }
    if (phoneFlag) {
        if (validatePhone()) {
            $('#phoneAlert').addClass('d-none');
        }else{
            $('#phoneAlert').removeClass('d-none');
        }
    }
    if (ageFlag) {
       if ( validateAge()) {
        $('#ageAlert').addClass('d-none');
       }else{
        $('#ageAlert').removeClass('d-none');

       }
    }
    if (passwordFlag) {
        if (validatePassword()) {
            $('#passwordAlert').addClass('d-none');
        }else{
            $('#passwordAlert').removeClass('d-none');
        }
    }
    if (repasswordFlag) {
        if (validaterepassword()) {
            $('#repasswordAlert').addClass('d-none');
        }else{
            $('#repasswordAlert').removeClass('d-none');
        }
    }
    if (validateName()&&validateEmail()&&validatePhone()&&validateAge()
    &&validatePassword()&&validaterepassword()) {
     document.querySelector("#submitBtn").removeAttribute("disabled");
    } else {
        document.querySelector("#submitBtn").setAttribute("disabled",true);
    }
}
function validateName() { 
        let regex = /^[A-Za-z]{3,9}$/gm;
        if (regex.test(nameInput.value) == true) {
            return true;
        }
    }

function validateEmail() {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(emailInput.value) == true) {
            return true;
        } 
    }

function validatePhone() {
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (regex.test(phoneInput.value) == true) {
            return true
        } 
    }

function validateAge() {
        let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
        if (regex.test(ageInput.value) == true) {
            return true;
        }
    }
function validatePassword() {
        let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
        if (regex.test(passwordInput.value) == true) {
            return true;
        } 
    }

function validaterepassword() {
        if (passwordInput.value == repasswordInput.value) {
            return true;
        } 
    }






