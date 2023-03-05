export default class ToDoAPI{
    static getAllDos(){
        const td = JSON.parse(localStorage.getItem("to-dos")|| "[]");
   
        return td.sort((a,b)=>{
           return new Date(a.updated)> new Date(b.updated) ? -1 :1;
        });
       }

       static GetToDoId(){
        const tds = ToDoAPI.getAllDos();
        const storedId = tds.id;

        return storedId
       }

       static saveToDo(DoToSave){
        const tds = ToDoAPI.getAllDos();

             DoToSave.id = tds.length;
             DoToSave.updated = new Date().toISOString();
             tds.push(DoToSave);
             //console.log(DoToSave);
     
             localStorage.setItem("to-dos",JSON.stringify(tds));
             }


        static deleteToDo(id){
            const tds = ToDoAPI.getAllDos();
            const newTds = tds.filter(td =>td.id != id);

            localStorage.setItem("to-dos",JSON.stringify(newTds));
        }

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

        static findNote(id,Allnotes){
          const note =  Allnotes.find(note => note.id == id)
  
        return note
    }


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

      

        const lastPostiton = notes.length -1;

        console.log(lastPostiton);

        const lastNote = allNotes[lastPostiton];

        console.log(lastNote);

        const NewId = lastNote.id +1;

        console.log(NewId);

        return NewId;

   }



        static saveNote(noteToSave,TDId){
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td => td.id == TDId);

                noteToSave.updated = new Date().toISOString();
                console.log(td.notes);
                td.notes.push(noteToSave);

      
              localStorage.setItem("to-dos",JSON.stringify(tds));
                
            }
            
        static editNote(noteToSave,TDId){
            const save = noteToSave;
            //const index = noteToSave.id - 1;
            const note = {
                  id:0,
                  title:"",
                  body:"",
                  updated:""
            };

            console.log(save);
            ToDoAPI.deleteNote(TDId,noteToSave.id);

           // td.notes.splice(index,1);


                note.id = save.id;
                note.title = save.title;
                note.body = save.body;
                note.updated = new Date().toISOString();

                const tds = ToDoAPI.getAllDos();
                const td = tds.find(td => td.id == TDId);
                  
                 td.notes.push(note);

                localStorage.setItem("to-dos",JSON.stringify(tds));
    
        
        
                
        }

        static toDoLength(TDId){
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(note => note.id == TDId);
            const length = td.notes.length + 1;
            return length 
        }

        static deleteNote(TDId,id){
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td => td.id == TDId);
            const newTd = td.notes.find(note => note.id == id);

            const tdNote = td.notes.filter(note=>note != newTd);

            td.notes = tdNote;


            localStorage.setItem("to-dos",JSON.stringify(tds));
    
    
        }


        static completed(id){
             console.log(id);
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td => td.id == id);
            console.log(td);
            const comps = ToDoAPI.getAllCompleted();
            console.log(comps);

            const comp ={
                id: comps.length +1,
                title: td.title,
                date:new Date().toISOString()
            }


            comps.push(comp);
               
            localStorage.setItem("ToDo-completed",JSON.stringify(comps));

            ToDoAPI.deleteToDo(id);

        }

        static getAllCompleted(){
            const tds = JSON.parse(localStorage.getItem("ToDo-completed")|| "[]");
                
              return tds;
           }


        static indexGetNoteId(number,nId,tId){

            const indexChecked = ToDoAPI.checkIndex(number,nId,tId)
            console.log(indexChecked);
            const tds = ToDoAPI.getAllDos();
            const td = tds.find(td => td.id == tId);
            const note = td.notes[indexChecked];

            return note.id;
        }

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