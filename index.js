import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getAuth, onAuthStateChanged, GoogleAuthProvider ,signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

const appSettings = {
    apiKey: "AIzaSyCnDXgpdAJG66Q_O0FflJivjGzhngVWzs0",
    authDomain: "realtime-database-284da.firebaseapp.com",
    databaseURL: "https://realtime-database-284da-default-rtdb.europe-west1.firebasedatabase.app/"
    }

const app = initializeApp(appSettings) 
const database = getDatabase(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider( )


const viewLoggedOut = document.getElementById("view-logged-out")
const viewLoggedIn = document.getElementById("view-logged-in")

const continueWithGoogleBtn = document.getElementById("google-btn")
const logOutBtn = document.getElementById("log-out-btn")

const inputFieldEl =  document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


logOutBtn.addEventListener("click", function()
{
    signOut(auth)
})




continueWithGoogleBtn.addEventListener("click", function()
{
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("logged in with google")
        })
        .catch((error) =>
        {
            console.log(error.code)
        })
})





addButtonEl.addEventListener("click", function() {
    const inputValue = inputFieldEl.value
    const userShoppingListInDB = ref(database, `users/${auth.currentUser.uid}/shoppingList`)
    
    push(userShoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onAuthStateChanged(auth, function(user)
{
    if(user)
    {
        viewLoggedIn.style.display = "block"
        viewLoggedOut.style.display = "none"
        fetchFromDB()
    }
    else{
        viewLoggedOut.style.display = "block"
        viewLoggedIn.style.display = "none"
    }
})

function fetchFromDB() 
{
    clearShoppingListEl()
    const userShoppingListInDB = ref(database, `users/${auth.currentUser.uid}/shoppingList`)
    
    onValue(userShoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

}


function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `/users/${auth.currentUser.uid}/shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}
