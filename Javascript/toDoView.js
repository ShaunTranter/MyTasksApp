// The view class controls what goes onto the page based on the information its given.
// all button events occur on this page which will tell toDo.js what to do.
// root is used to control the path, any refernce to root is refering to this page (in short)
// root html is what the page will load on page load.
export default class ToDoView{
    constructor(root,{ onNoteSelect,onNoteAdd,onNoteEdit,onNoteDelete,onToDoAdd,onToDoDelete,onToDoComplete,onNoteChange}={}){
        this.root = root;
        this.onToDoAdd = onToDoAdd;
        this.onToDoDelete = onToDoDelete;
        this.onToDoComplete = onToDoComplete;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteDelete = onNoteDelete;
        this.onNoteEdit = onNoteEdit;
        this.onNoteChange = onNoteChange;
        this.root.innerHTML = `        <div>
        <div class="intro-con">
        <div class="title-con">
           <h1>My Tasks</h1>
           <h3>Stop Procrastonating!</h3>
        </div>
        <div class="toDo__input-con">
            <input class ="toDo__text" type="text" placeholder="Enter Task...">
            <button class ="toDo__add main-btn">Add Task</button>
            <button class ="toDo__show-comp main-btn">Show completed</button>
        </div>
    </div>
    <div>
            
        <div class ="TD__list-con">        

        
        <div class="notes" id="TD__note">
        <div class="notes__bar">
        <div class="notes__list">

    
            </div>
        </div>
    </div>
    </div>
    </div>
    <button class ="toDo__comp-btn-close main-btn">></button>
    <div class="toDo__complete-preview">
    
    </div> 
    </div>
    <div class="notes__pre">
      <input class ="notes__title" type="text" placeholder="Enter">
      <div class ="break-2"></div>
      <textarea class="notes__body"></textarea>
      <button class="notes__save main-btn" type="button">Save Note</button>
    </div>
    <div id ="overlay" class ="overlay">
    <button class="notes__close main-btn" type="button">x</button>
    <button class="notes__previous main-btn" type="button"><</button>
    <button class="notes__next main-btn" type="button">></button>
    </div>
    </div>
` ;   

 // define the main input boxes and buttons
 const titleInp = this.root.querySelector(".notes__title");
 const bodyInp = this.root.querySelector(".notes__body");
 
 const btnAddToDo =this.root.querySelector(".toDo__add");


// sends "add ToDo" event with the input to the ToDo.js file
 btnAddToDo.addEventListener("click",() =>{
     const title = this.root.querySelector(".toDo__text").value;
     this.onToDoAdd(title);
 })

 const btnEdit=this.root.querySelector(".notes__save");

// sends "edit note" event with inputs to the ToDo.js file
     btnEdit.addEventListener("click",()=>{
         const updatedTitle = titleInp.value.trim();
         const updatedBody = bodyInp.value.trim();
 
         this.onNoteEdit(updatedTitle,updatedBody);
     });
 
     // note carousel, sends either 1 or -1 to ToDo.js
     const btnCaraNext=this.root.querySelector(".notes__next");
     const btnCaraPre=this.root.querySelector(".notes__previous");

     btnCaraNext.addEventListener("click",()=>{
            const next = 1;

        this.onNoteChange(next);
    });

    btnCaraPre.addEventListener("click",()=>{
           const pre = -1

        this.onNoteChange(pre);
    });


// These hide pop ups and the complete side bar, when the button is clicked, visability is updated
 this.updateVisability(false);

 const btnComp =this.root.querySelector(".toDo__show-comp");
 btnComp.addEventListener("click",()=>{
    this.comVisability(true);
});

const btnCompClose =this.root.querySelector(".toDo__comp-btn-close");
btnCompClose.addEventListener("click",()=>{
   this.comVisability(false);
});

 this.comVisability(false);



    }

// private classes are marked with _,
// The below classes create each div for the information that is retrived back from ToDo.js
    _createToDoItemHTML(TDId,TDtitle,TDupdated){
        return `    
        <div class ="TD__list-item" "data-td-id="${TDId}">
        <div class ="TD-item-header">
        <h3 class="TD__title" id ="${TDId}" data-td-id="${TDId}">${TDtitle}</h3>
        <p class ="TD__date">${TDupdated.toLocaleString(undefined,{dateStyle:"full",timeStyle:"short"})}</p>
        </div>
        <div class ="TD__item--btn-con">
        <div class ="break"></div>
        <div class =" TD__item--btn-con">
        <button class="notes__add td-btn" data-td-id="${TDId}" type="button"><i class="fa-solid fa-plus"></i><span class ="add-span"></span></button>
        <button class ="toDo__comp td-btn"  data-td-id="${TDId}"><i class="fa-solid fa-check"></i><span class ="com-span"></button>
        <button class ="toDo__del td-btn"  data-td-id="${TDId}"><i class="fa-solid fa-trash"></i><span class ="del-span"></button>
        </div>
        <div class ="break-2"></div>
        </div>

        <div class="notes" id="TD__note">
        <div class="notes__bar">
        <div class="notes__list">

         
    
            </div>
        </div>
    </div>
   
        `
       }


       // if body is null 
       _createListItemHTML(id,title,body,updated,TDId){
        const MAX_BODY_LENGTH = 60;
    
        return `
        <div class ="notes__list-item" data-note-id="${id}" data-td-id="${TDId}">
        <div class ="notes__small-title">${title}</div>
        <div class ="break-2"></div>
        <div class ="notes__small-body">${body.substring(0, MAX_BODY_LENGTH)}
        ${body.length>MAX_BODY_LENGTH ? "..." :""}
        </div>
        <div class ="notes__small-updated">
        ${updated.toLocaleString(undefined,{dateStyle:"full",timeStyle:"short"})}
        </div>
        </div>
        `
    }

    _createNoteMessage(){
        return `<p>Click the plus to add a note</p>`
    }

    _createCompItemHTML(title,date,TDId){
    
        return `
        <div class ="complete__item">
        <i class="fa-solid fa-check comp__check"></i>
          <h2>${title}</h2>
           <p>${date.toLocaleString(undefined,{dateStyle:"full",timeStyle:"short"})}</p>
        </div>` 
    }

    _createCompMessageItemHTML(){
        return `   <div class ="msg">  
          <h1 class="comp-msg">You Havent Completed Any Tasks Yet!</h1>
          <div>` 
    }

    // complete section function
    updateComplete(tds){
        // tds are the objects that are sent to the function in an array
        // we define the created html container above to put the info into
        const preCon = this.root.querySelector(".toDo__complete-preview");
        preCon.innerHTML ="";

        // if there are no comepleted tasks
        if(tds.length == 0){
            const html = this._createCompMessageItemHTML();
            preCon.insertAdjacentHTML("afterbegin", html);
        }
         // for each object in the array, create the html and insert it onto the page
        for(const td of tds){
            const html = this._createCompItemHTML(td.title,new Date(td.date),td.id);
            preCon.insertAdjacentHTML("afterbegin", html);
        }

    }

    updateToDoList(tds){
        // same method as above function for each task item 
       const tdListCon = this.root.querySelector(".TD__list-con");
       const notesListCon = this.root.querySelector(".notes__list");

    
       tdListCon.innerHTML="";

       
          
       for(const td of tds){
        const html = this._createToDoItemHTML(td.id,td.title,new Date(td.updated));

        tdListCon.insertAdjacentHTML("afterbegin",html);
        // second loop for each note object that is stored in an array of every task object
        // the full object looks like this: tasks = {id:1, title:example, notes:[{id:1,title:note1,date:example}]}
        for(const note of td.notes){
            const noteHtml = this._createListItemHTML(note.id,note.title,note.body, new Date(note.updated),td.id);
            const notesList = tdListCon.querySelector(".notes__list");

        
           notesList.insertAdjacentHTML("beforeend",noteHtml);



       
        }

 


       }

       // every event for these created html divs has tp be defined within this function
       // we used the defined container at the start of the function to select the created divs
       // we use the dataset of the html div to retreive the id of the Task or note selected 

       tdListCon.querySelectorAll(`.notes__list-item`).forEach(Item =>{
        Item.addEventListener("click",()=>{
            this.onNoteSelect(Item.dataset.noteId,Item.dataset.tdId);
          // sends "select note" event with the input to the ToDo.js file

              
        });
    
        Item.addEventListener("dblclick",()=>{
            const prompt = confirm("Are You Sure you want to delete this note?");
   
    
            if(prompt){

               this.onNoteDelete(Item.dataset.noteId,Item.dataset.tdId);
               // sends "delete" event with the input to the ToDo.js file
            }
        })
    
       });

        


        tdListCon.querySelectorAll(".toDo__del").forEach(Item =>{
            Item.addEventListener("click",()=>{
                this.onToDoDelete(Item.dataset.tdId);
                // sends "delete" event with the input to the ToDo.js file
            });
            
        });

        
        tdListCon.querySelectorAll(".toDo__comp").forEach(Item =>{
            Item.addEventListener("click",()=>{
                this.onToDoComplete(Item.dataset.tdId);
                // sends "complete" event with the input to the ToDo.js file
            });
            
        });

        tdListCon.querySelectorAll(".notes__add").forEach(Item =>{
            Item.addEventListener("click",()=>{
                this.onNoteAdd(Item.dataset.tdId);
                // sends "add note" event with the input to the ToDo.js file
            });
            
        });


    
       
    
    }
// when we select a note, ToDo.js sends the information to the API to find the note 
// we then call this function on ToDo.js with the note and task Id to update the view/ html
    updateActive(note,id){
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(item =>{
            item.classList.remove("notes__List-item--selected");
        });

    
        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"][data-td-id="${id}"]`).classList.add("notes__List-item--selected");
        this.updateVisability(true);
        this.root.querySelectorAll(".notes__pre").forEach(child =>{
            child.classList.add("active");
        })
        this.root.querySelector(".overlay").classList.add("active")
        
        const close = this.root.querySelector('.notes__close');
    
        close.addEventListener("click",()=>{
            this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.remove("notes__List-item--selected");
            this.updateVisability(false);
    
        })
    
    
    }


    // controls visabilty of classes 
    updateVisability(visable){
        this.root.querySelector(".notes__pre").style.visability = visable? "visable" : "hidden";
    
        if(!visable){
            this.root.querySelectorAll(".notes__pre").forEach(child =>{
                child.classList.remove("active");
                this.root.querySelector(".overlay").classList.remove("active")
            })
    
        }
    }


    comVisability(visable){
        this.root.querySelector(".toDo__complete-preview").style.visability = visable? "visable" : "hidden";
        if(!visable){
            this.root.querySelectorAll(".toDo__complete-preview").forEach(child =>{
                child.classList.remove("active");
            })
            this.root.querySelector(".toDo__comp-btn-close").classList.remove("active")
        }else{
            this.root.querySelectorAll(".toDo__complete-preview").forEach(child =>{
                child.classList.add("active");
            })
            this.root.querySelector(".toDo__comp-btn-close").classList.add("active")
        }
    }

    // after an edit, me must reselect the note that was edited 
    reselect(n,t){
        this.onNoteSelect(n,t);

    }
    
}