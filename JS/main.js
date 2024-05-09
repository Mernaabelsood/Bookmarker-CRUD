var nameInput = document.getElementById('name');
var urlInput = document.getElementById('url');

var addBtn = document.getElementById('addBtn');

var tableBody = document.getElementById('tableBody');

var siteContainer =[] ;

var mainIndex = 0;

if (localStorage.getItem("siteContainer")!==null)
 {
    siteContainer= JSON.parse(localStorage.getItem("siteContainer"))
    display(siteContainer);
}

var nameRegex = /^[A-Za-z]{1,}$/
// console.log(nameRegex.test("f"))
function isNameValid(){
if (nameRegex.test(nameInput.value)) {
    return true;
} else {
    return false;
}
}

var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
// console.log(urlRegex.test("www.google.com"))
function isUrlValid(){
    if (urlRegex.test(urlInput.value)) {
        return true;
    } else {
        return false;
    }
    }

    nameInput.onkeyup = function(){
        if (isUrlValid() && isNameValid()) {
            addBtn.removeAttribute("disabled")
        } else{
            addBtn.disabled = true;
        }
    }
    urlInput.onkeyup = function(){
        if (isUrlValid() && isNameValid()) {
            addBtn.removeAttribute("disabled")
        } else{
            addBtn.disabled = true;
        }
    }

function addSite() 
{
   if (addBtn.innerHTML == "update") {
    addBtn.innerHTML = "Submit";
    var site ={
        name: nameInput.value ,
        url: urlInput.value 
    }
siteContainer.splice(mainIndex,1,site)
   } else {
    var site ={
        name: nameInput.value ,
        url: urlInput.value 
    }
    // console.log(site);
    siteContainer.push(site);
    // console.log(siteContainer);

   }

    localStorage.setItem("site", JSON.stringify(siteContainer));
    display(siteContainer);
    clearBook();
}

function display(anyArray)
{
    var marks = '';

    for (let i = 0; i < anyArray.length; i++) {
        marks += `
        <tr> 
        <td>${anyArray[i].name} </td>
        <td> <a href="${urlInput.value}"> <button class="btn btn-primary">Visit </button> </a> </td> 
        <td> <button onclick="updateBook(${i})" class="btn btn-info"> update </button> </td>
        <td> <button onclick="deleteBook(${i})" class="btn btn-danger"> Delete </button> </td>
       
        </tr>
        `
        
    }
    tableBody.innerHTML= marks;
}


function deleteBook(index)
{
    siteContainer.splice(index,1);
    localStorage.setItem("site", JSON.stringify(siteContainer));
    display(siteContainer);

}

function clearBook(){
    nameInput.value="";
    urlInput.value="";

}

function updateBook(index)
{
nameInput.value = siteContainer[index].name;
urlInput.value = siteContainer[index].url;
addBtn.innerHTML = "update";
mainIndex = index;
}


function search(term){

    var wantedBook=[];
    for (let i = 0; i < siteContainer.length; i++) {
        if (siteContainer[i].name.toLowerCase().includes(term)) {
            wantedBook.push(siteContainer[i]);
        }
    }
display(wantedBook);
}


