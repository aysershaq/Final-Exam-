let rowData = $("#rowData")
let searchContainer = $("#searchContainer");

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

let userName 
let userAge
let userEmail
let userPassword
let userPhone 
let userRepassword
var regex = {

    Name:{

        value : /^[A-Za-z]{3,15}$/,
        isValid : false
    },
    Email:{
        value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
        isValid:false,
    },
    Password:{
        value:/^[A-Za-z0-9]{5,20}$/i,
        isValid:false
    },
    Phone:{
        value:/^[0-9]{10,12}$/i,
        isValid:false

    },

    Age:{
        value:/^[0-9]{1,2}$/i,
        isValid:false

    },
    Repassword: {
    value: null,
    isValid: false
}

}


function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)

    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

getHomeMeals()

 async   function getHomeMeals(){

        let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")

        response = await response.json()

        // console.log(response.meals)

        displayMeals(response.meals)


}



function displayMeals(arr){


    searchContainer.html("")
    cartona= ""

    for(let i = 0 ;i<arr.length ;i++){

        cartona+= `  <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.html(cartona) 
}


async    function getMealDetails(idMeal){

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    response = await response.json()
    
    
    console.log(response.meals)


            displayMealDetails(response.meals[0])
}

function displayMealDetails(object){
    searchContainer.html("")

    cartona = ""

  
        cartona+= ` 
       <div class="row py-5"> 
            <div class="col-md-4">
                <img class="w-100 rounded-3" src="${object.strMealThumb}" alt="meal pic">
                <h3>${object.strMeal}</h3>
            </div>
            <div class="col-md-8">
                <h3 class="fw-bolder fs-2">Instructions</h3>
                <p class="fw-lighter fs-5">${object.strInstructions}</p>
                <h3 class="fw-bolder">Area: ${object.strArea}</h3>
                <h3 class="fw-bolder">Category: ${object.strCategory}</h3>
                <h3 class="fw-bolder">Recipes: </h3>
                ${generateIngredientsList(object)}
                <h3>Tags:</h3>
                <a class="btn btn-success" href="${object.strSource}">Source</a>
                <a class="btn btn-danger" href="${object.strYoutube}">Youtube</a>
            </div>
        </div>
    `;
       

       rowData.html(cartona)


}

function generateIngredientsList(meal) {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients += `<p class="alert alert-info m-2 p-1">${measure} ${ingredient}</p>`;
        }
    }
    return ingredients;
}
       
        


        
    
 async function getCategories(){

    response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    response = await response.json()

    console.log(response.categories)

    displayAllCategories(response.categories)
}
    



function displayAllCategories(arr){
    searchContainer.html("")

    cartona = ""

    for(let i = 0 ;i<arr.length;i++){

        cartona+= `
        <div class="col-md-3 cursor-pointer">
        <div    onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal-cat position-relative overflow-hidden ">
        <img class="w-100" src="${arr[i].strCategoryThumb}">
        <div class="category-layer position-absolute">
            <h3 class="text-center text-black">${arr[i].strCategory}</h3> 
            <p class="text-black text-center">${arr[i].strCategoryDescription}
       </div>
       </div>
      </div>
            
        


        
        `


    }

    rowData.html(cartona)

}
        


async function getCategoryMeals(category){


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
       response = await response.json()


       console.log(response.meals.slice(0,20))

       displayMeals(response.meals.slice(0,20))
}



async function getArea() {

    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")

    response = await response.json()

    // console.log(response.meals)

    displayArea(response.meals)


    
}

function displayArea(arr){

    searchContainer.html("")

    cartona= ""

    for(let i = 0 ;i<arr.length;i++){


        cartona+= `
                    <div class="col-md-3 mar-start" >
                    <div onclick="getAreaMeals('${arr[i].strArea}')"  class="col-md-3 cursor-pointer">
                     <i class="fa-solid fa-house-laptop fa-4x"></i>
                     <h3>${arr[i].strArea}
                     </div>
                     </div>

        
        `
    }

    rowData.html(cartona)
}


async function getAreaMeals(Area) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`)
    response = await response.json()

    console.log(response.meals)
     displayMeals(response.meals.slice(0,20))

    
}


async function getIngredients(){

    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()

    
    // console.log(response.meals.slice(0,20))
     displayIngredients(response.meals.slice(0,20))


}

function displayIngredients(arr){

    searchContainer.html("")

    cartona = "";
    for(let i = 0 ; i<arr.length;i++){
    cartona+= ` <div   onclick="getIngredientsMeals('${arr[i].strIngredient}')"    class="col-md-3   cursor-pointer">
                    <i    class="fa-solid fa-drumstick-bite fa-4x"></i>
                     <h3>${arr[i].strIngredient}</h3>
                      <p>${arr[i].strDescription}</p>

                    </div> `
    }

    rowData.html(cartona)
}
    
async function getIngredientsMeals(ingredients){

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)

    response = await response.json()

    console.log(response.meals)

    displayMeals(response.meals.slice(0,20))

}


function showContacts(){


    searchContainer.html("")
   let  cartona = `
   
   
   <form method="GET">

   <div class="row py-5  g-4  mx-auto ps-5">
   <div class="col-md-6 mar-high mar-bot">
    <input class="form-control" id="Name" placeholder="Enter Your Name" Name="name">
    <div class="alert alert-danger d-none mt-3">Special characters and numbers not allowed,Number of letters should be between 3 to 15 </div>
</div>
   
  <div class="col-md-6 mar-high ">
    <input class="form-control" id="Email" placeholder="Enter Your Email" Name="email">
    <div class="alert alert-danger d-none mt-3">Invalid Email (e.g., name@example.com)</div>
</div>
  <div class="col-md-6 ">
    <input class="form-control" id="Phone" placeholder="Enter Your Phone" Name="phone">
    <div class="alert alert-danger d-none mt-3">Invalid Phone Number ,the count of numbers should be between 10 to 12</div>
</div>
<div class="col-md-6 ">
    <input class="form-control" id="Age" placeholder="Enter Your Age" Name="age">
    <div class="alert alert-danger d-none mt-3">Age must be 2 digits</div>
</div>
<div class="col-md-6">
    <input class="form-control" id="Password" placeholder="Enter Your Password" Name="password">
    <div class="alert alert-danger d-none mt-3">Password must be 5-20 alphanumeric characters</div>
</div>
<div class="col-md-6">
    <input class="form-control" id="Repassword" placeholder="Repassword" Name="repassword">
    <div class="alert alert-danger d-none mt-3">Passwords do not match</div>
</div>
   <div class="col-md-12 text-center">

     <button  type="submit" id="submitBtn" class="btn border border-danger text-danger" disabled>Submit</button>

      </div>
      </div>
      </form>
      
    `

    rowData.html(cartona)

   setTimeout(() => {
    userName = $('#Name');
    userEmail = $('#Email');
    userPassword = $('#Password');
    userPhone = $('#Phone');
    userAge = $('#Age');
    userRepassword = $('#Repassword');

    // console.log(userRepassword.val()); // سيطبع قيمة فارغة "" بدل undefined الآن

    userName.on("input", function () {
        validateContacts(userName);
    });
    userEmail.on("input", function () {
        validateContacts(userEmail);
    });
    userPassword.on("input", function () {
        validateContacts(userPassword);
    });
    userPhone.on("input", function () {
        validateContacts(userPhone);
    });
    userAge.on("input", function () {
        validateContacts(userAge);
    });
    userRepassword.on("input", function () {
        validateContacts(userRepassword);
    });

}, 0); // delay 0ms لضمان أن الـ DOM تم تحديثه
    


}




function validateContacts(element){

    

    if (element.attr('id') === 'Repassword') {
        
        
        if(userPassword.val() === element.val()){

        
       
        element.addClass("is-valid")
        element.removeClass("is-invalid")
        element.next().addClass('d-none');

        regex.Repassword = { isValid: true };
       
        checkFormValidity();

        return; // Exit early for Repassword
    }
    else{
        element.removeClass("is-valid")
        element.addClass("is-invalid")
        element.next().removeClass('d-none');

        regex.Repassword = { isValid: false };
        checkFormValidity();
        
     return ;

    }

     
}
       if(regex[element.attr('id')].value.test(element.val())==true){

        element.addClass("is-valid")
        element.removeClass("is-invalid")
        element.next().addClass("d-none")

        regex[element.attr('id')].isValid=true

    }

    else{

        element.addClass("is-invalid")
        element.removeClass("is-valid")
        element.next().removeClass("d-none")
        regex[element.attr('id')].isValid=false




    }
    checkFormValidity()
}


function checkFormValidity() {
    const isFormValid = regex.Name.isValid &&
                        regex.Email.isValid &&
                        regex.Password.isValid &&
                        regex.Phone.isValid &&
                        regex.Age.isValid &&
                        regex.Repassword.isValid;
                        // console.log(userPassword.val());
                        console.log( regex.Repassword.isValid);

    if (isFormValid) {
        $("#submitBtn").removeAttr("disabled");
        $("#submitBtn").addClass("cursor-pointer");
        $("#submitBtn").addClass("bg-danger");
        $("#submitBtn").toggleClass("text-danger","text-black");


    } else {
        $("#submitBtn").attr("disabled", true);
    }
}


function showSearchInputs(){

    searchContainer.html( `

 <div class="row g-4 py-4">
    
         <div class="col-md-6">
         <input onkeyup="searchByName(this.value)"  class="form-control" id="searchByName" placeholder="Search By Name" >
         </div>
         <div class="col-md-6">
         <input  onkeyup="searchByFLetter(this.value)"  class="form-control" id="searchByFLetter" placeholder="Search By First Letter" >
         </div>
</div>
    `)
    
    
    
    rowData.html("")

    

 
}





async function searchByName(mealName){

     $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)

    response =  await response.json()

    // console.log(response.meals)

    displayMeals(response.meals)

        $(".inner-loading-screen").fadeOut(300)






}

async function searchByFLetter(fLetter) {

         $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fLetter}`)

    response =  await response.json()

    console.log(response.meals)

    displayMeals(response.meals)
            $(".inner-loading-screen").fadeOut(300)


    
}


