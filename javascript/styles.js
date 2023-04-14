
let myLeads = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    Render(myLeads)
}

tabBtn.addEventListener("click", function(){
    // talk to chrome browser here and grab the url of current tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        Render(myLeads)
    })
})

function Render(leads){
    let listItems = ""

    for (let i = 0; i < leads.length; i++){ 
        
        listItems +=  `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }

    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    Render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    Render(myLeads)
})