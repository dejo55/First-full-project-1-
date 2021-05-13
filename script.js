//declaring our variables
const courses= document.querySelector("#courses-list");
const shoppingCartContent = document.querySelector("#cart-content tbody");

const clearCartBtn=document.querySelector("#clear-cart");


//event listeners
loadEventListeners();

function loadEventListeners(){
    //when a new course is added
    courses.addEventListener("click",buyCourse);
    //when the remove button is clicked
shoppingCartContent.addEventListener("click",removeCourse);
//clear cart btn
clearCartBtn.addEventListener("click",clearCart);

//documentready
document.addEventListener("DOMContentLoaded",getFromLocalStorage);
}

//functions
function buyCourse(e){
    e.preventDefault();
    //use delegation to find course that as added
    if(e.target.classList.contains("add-to-cart")){
        const course = e.target.parentElement.parentElement;
        //read the values
        getCourseInfo(course);
    }
}

//read the html information of the selected course
function getCourseInfo(course){
    //Create an object with course data
    const courseInfo ={
        image: course.querySelector("img").src,
        title:course.querySelector("h4").textContent,
        price: course.querySelector(".price span").textContent,
        id: course.querySelector("a").getAttribute("data-id"),
    };
    //insert into the shopping cart
    addIntoCart(courseInfo);

}

 //display the selected course into the shopping cart
 function addIntoCart(course){
     //creat a <tr>
     const row = document.createElement("tr");
     //Build the template
     row.innerHTML =`
     <tr>
     <td>
     <img src="${course.image}" width=100>
     </td>
     <td>${course.title}</td>
     <td>${course.price}</td>
     <td>
     <a href="#" class="remove" data-id="${course.id}">X</a>
     </td>
     </tr>
     `;

     //add into the shopping cart
     shoppingCartContent.appendChild(row);

     //add course into storage
     saveIntoStorage(course);
 }

 //add the course into the local storage
 function saveIntoStorage(course){
     let courses=getCoursesFromStorage();
//add the course into the array
courses.push(course);
//since storage only saves strings, e need to convert Json into string
localStorage.setItem("courses", JSON.stringify(courses));
 }

 //get the contents from the storage 
 function getFromLocalStorage(){
     let courses;
     //if something exits in storage the we get the value, otherise e create an empty array
     if (localStorage.getItem("courses"===null)){
         courses=[];

     }else{
         courses=JSON.parse(localStorage.getItem("courses"));
     }
     return courses;
 }


 //remove course from the Dom
 function removeCourse(e){
     let course, courseId;

     //remove from the dom
     if (e.target.classList.contains("remove")){
         e.target.parentElement.parentElement.remove();
         course=e.target.parentElement.parentElement;
         courseId= course.querySelector("a").getAttribute("data-id");
     }
     console.log(courseId);
     //remove from the local storage
     removeCourseLocalStorage(courseId);
 }

 //remove from local storage
 function removeCourseLocalStorage(id){
     //get the local storage data
     let coursesLS=getCoursesFromStorage();

     //loop through the array and the index to remove
     coursesLS.forEach(function(coursesLS,index){
         if(coursesLS.id===id){
             coursesLS.splice(index,1);
         }
     });
     //add the rest of the array
     localStorage.setItem("courses", JSON.stringify(coursesLS));
 }

 //clears the shopping cart
 function clearCart(){
     //shoppingCartContent.innerHTML = '' ;\
     while (shoppingCartContent.firstChild){shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    //clear from local storage
    clearLocalStorage();
 }
// Clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
  }
 //Loads when document is ready and print courses into shopping cart
 function getFromLocalStorage(){
     let coursesLS = getCoursesFromStorage();

     // Loop through the courses and print into the cart
     coursesLS.forEach(function (course){ 
         //creat the <tr>
         const row = document.createElement("tr");

         //print the content
         row.innerHTML =`
         <tr>
         <td>
         <img src="${course.image}" width=100>
         </td>
         <td>${course.title}</td>
         <td>${course.price}</td>
         <td>
         <a href="#" class= "remove" data-id="${course.id}">X</a>
         </td>
         </tr>
         `;
shoppingCartContent.appendChild(row);
     });
 }