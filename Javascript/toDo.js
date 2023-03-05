import ToDoView from "./toDoView.js";
import ToDoAPI from "./toDoAPI.js";

export default class notes{
    constructor(root){
        this.notes = [];
        this.tds =[];
        this.activeTd = null;
        this.active = null;
        this.view = new ToDoView(root, this._handlers());
// for all TD get notes\
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

       // console.log(note);
    
       this.view.updateActive(note,TdId);
    }

    _reselect(nId,TId){
      this.view.reselect(nId,TId);
    }

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
            // needs to be full object, use api to get the note 
            console.log(noteId);
            
            const allNotes = ToDoAPI.getNotes(TdId);     
            const selectedNote = ToDoAPI.findNote(noteId,allNotes);

           // console.log(selectedNote)
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

            console.log(this.activeTd);
            console.log(this.active.id);
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