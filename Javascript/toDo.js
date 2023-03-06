import ToDoView from "./toDoView.js";
import ToDoAPI from "./toDoAPI.js";

export default class notes{
    constructor(root){
      // since we dont know which note or task is active, each time one is selected, we save the id in actives
      // we set null and empty varibles so we can keep updating the array with new informationt to send back and forth
        this.notes = [];
        this.tds =[];
        this.activeTd = null;
        this.active = null;
        // when we want to update the view, we use this varible to call a function
        this.view = new ToDoView(root, this._handlers());
// sets all the new objects onto the view by using the below fucntions 
        this._refreshDos();
        this._refreshComp();
    }

    _refreshDos(){
        const tds = ToDoAPI.getAllDos();
        this._setDos(tds);
        
      
      }
      _setDos(tds){
        this.tds= tds;
        this.view.updateToDoList(tds);
      
      
      
      }

      _refreshComp(){
        const tds = ToDoAPI.getAllCompleted();
         this._setComp(tds)
      }
      _setComp(tds){
        this.tds = tds;
        this.view.updateComplete(tds);
      }

      _setActiveTd(td){
        this.activeTd = td;
      }



      _setActiveNote(note,TdId){
        this.active = note;
        this._setActiveTd(TdId);

    
       this.view.updateActive(note,TdId);
    }

    _reselect(nId,TId){
      this.view.reselect(nId,TId);
    }
// the handlers are called on the view, this controls which information is sent to the API in a given event
// after the API is called, we have to update the view by calling refresh or active note
    _handlers(){
        return{
           onToDoAdd:title =>{
               const newToDo ={
                title: title,
                notes: [],
                updated:new Date().toISOString()
               };
              ToDoAPI.saveToDo(newToDo);
              this._refreshDos();
           },

          onNoteSelect:(noteId,TdId) =>{
 
            const allNotes = ToDoAPI.getNotes(TdId);     
            const selectedNote = ToDoAPI.findNote(noteId,allNotes);

           this._refreshDos();
            
            this._setActiveNote(selectedNote,TdId);
          },
          onNoteAdd:(id) =>{
            const selectdTd = this.tds.find(td => td.id == id)
            const newNote = {
                id:ToDoAPI.sortByNoteId(id),
                title:"New Note",
                body:"Take Note..."
            };
            ToDoAPI.saveNote(newNote,selectdTd.id);
            this._refreshDos();
          },
          onNoteEdit:(title,body) =>{


            ToDoAPI.editNote({
                id:this.active.id,
                title:title,
                body:body
            },this.activeTd);

            this._refreshDos();
            this._reselect(this.active.id,this.activeTd);
          },
          onToDoDelete:id=>{
            ToDoAPI.deleteToDo(id);
            this._refreshDos();
          },

          onNoteDelete:(noteId,TdId)=>{
            ToDoAPI.deleteNote(TdId,noteId);
            this._refreshDos();
          },

          onNoteChange:(number)=>{
          const index = ToDoAPI.indexGetNoteId(number,this.active.id,this.activeTd);
          this._refreshDos();
          this._reselect(index,this.activeTd);

          },

          onToDoComplete:(tId)=>{
            ToDoAPI.completed(tId);
            this._refreshDos();

            this._refreshComp();
               
          }

        }
    }

}