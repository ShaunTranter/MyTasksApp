export default class ToDoAPI{
    // gets all tasks, sorts them by date and then returns them
    static getAllDos(){
        const td = JSON.parse(localStorage.getItem("to-dos")|| "[]");
   
        return td.sort((a,b)=>{
           return new Date(a.updated)> new Date(b.updated) ? -1 :1;
        });
       }
       // gets all ids of the tasks
       static GetToDoId(){
        const tds = ToDoAPI.getAllDos();
        const storedId = tds.id;

        return storedId
       }
    // retrives the entered information, and saves it to local storage 
       static saveToDo(DoToSave){
        const tds = ToDoAPI.getAllDos();
            // the id is set by getting the length of the local stroage array length
             DoToSave.id = tds.length;
             DoToSave.updated = new Date().toISOString();
             tds.push(DoToSave);
           
     
             localStorage.setItem("to-dos",JSON.stringify(tds));
             }

        // deletes task item
        static deleteToDo(id){
            const tds = ToDoAPI.getAllDos();
            const newTds = tds.filter(td =>td.id != id);

            localStorage.setItem("to-dos",JSON.stringify(newTds));
        }
        // gets all notes for a selected task item by using its id
        static getNotes(TDId){
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td =>td.id == TDId);
            console.log(td.notes);

            const notes = td.notes;

            const sortedNotes = notes.sort((a,b)=>{
                a.id > b.id ? -1 :1;
    
                return a.id - b.id;
            });

            return sortedNotes
              
        }
        //finds a specific note in a object array thats passed into it 
        static findNote(id,Allnotes){
          const note =  Allnotes.find(note => note.id == id)
  
        return note
    }

    // sorts all notes by ID number, returns 1 if the array of notes is empty
    static sortByNoteId(id){
        const allNotes = ToDoAPI.getNotes(id);

        if(allNotes.length == 0){
            const NewId = 1;
            return NewId;
        }

        const notes = allNotes.sort((a,b)=>{
            a.id > b.id ? -1 :1;

            return a.id - b.id;
        });

      
        // to get uniquie note ids, after sorting by id, it gets the highest ID and adds 1 for a new note id
        const lastPostiton = notes.length -1;

        console.log(lastPostiton);

        const lastNote = allNotes[lastPostiton];

        console.log(lastNote);

        const NewId = lastNote.id +1;

        console.log(NewId);
        // returns the new note id 
        return NewId;

   }


 // saves a note
        static saveNote(noteToSave,TDId){
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td => td.id == TDId);

                noteToSave.updated = new Date().toISOString();
                td.notes.push(noteToSave);

      
              localStorage.setItem("to-dos",JSON.stringify(tds));
                
            }
            // edits a note
        static editNote(noteToSave,TDId){
            const save = noteToSave;
            //creates a empty note object
            const note = {
                  id:0,
                  title:"",
                  body:"",
                  updated:""
            };
             
            // to edit a note, we get its ID and delete it from the Task 
            ToDoAPI.deleteNote(TDId,noteToSave.id);

          

             // after deleting the old note, we get the new information and use the same id
                note.id = save.id;
                note.title = save.title;
                note.body = save.body;
                note.updated = new Date().toISOString();

                const tds = ToDoAPI.getAllDos();
                const td = tds.find(td => td.id == TDId);
                // push the new title and body using the same id 
                 td.notes.push(note);

                localStorage.setItem("to-dos",JSON.stringify(tds));
    
        
        
                
        }
        // gets all tasks and finds the lengh of the array 
        static toDoLength(TDId){
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(note => note.id == TDId);
            const length = td.notes.length + 1;
            return length 
        }
          // deletes a selected note
        static deleteNote(TDId,id){
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td => td.id == TDId);
            const newTd = td.notes.find(note => note.id == id);

            const tdNote = td.notes.filter(note=>note != newTd);

            td.notes = tdNote;


            localStorage.setItem("to-dos",JSON.stringify(tds));
    
    
        }
     

        static completed(id){
            // creates a completed item and then saves it 
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td => td.id == id);
            const comps = ToDoAPI.getAllCompleted();

            const comp ={
                id: comps.length +1,
                title: td.title,
                date:new Date().toISOString()
            }


            comps.push(comp);
               
            localStorage.setItem("ToDo-completed",JSON.stringify(comps));
            // after the comeplete item is saved, delete the task 
            ToDoAPI.deleteToDo(id);

        }
          // gets all comepleted 
        static getAllCompleted(){
            const tds = JSON.parse(localStorage.getItem("ToDo-completed")|| "[]");
                
              return tds;
           }

        // for the carousel, since we use ID's to find notes and each note is sorted on the page by date
        // we need to find the index of the note that is selected
        static indexGetNoteId(number,nId,tId){

            const indexChecked = ToDoAPI.checkIndex(number,nId,tId)
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td => td.id == tId);
            const note = td.notes[indexChecked];

            return note.id;
        }
        // the number cannot go past the index of the array as there will ne no note there
        // so, if the number is higher then the length or equal to it, return the first and the opposite.
        static checkIndex(number,nId,tId){
              const length = ToDoAPI.toDoLength(tId);

             const index = ToDoAPI.indexOfNote(number,nId,tId);
             console.log(index);


             if(index >= length-1){
                return 0;
             }
             else if(index < 0){
               return length-2;
             }
             else{
                return index;
             }
  
        }
         // retrives the number sent from the carousel and adds/ minus it from the index of the array
        static indexOfNote(number,nId,tId){
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td => td.id == tId);
            const index = td.notes.findIndex(note=> note.id == nId);

            console.log(index);

           if(number === 1){
            return index + 1
           }else{
            return index - 1
           }

        }


 
       }