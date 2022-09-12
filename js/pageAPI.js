import { NoEmitOnErrorsPlugin } from "webpack";

// Access pages  -> get, save, and delete notes
export default class pageAPI{
    static getAllPages(){
        const pages = JSON.parse(localStorage.getItem("plantpage-page") || "[]");
        return pages.sort((a,b) => {
            // check out sort algo vid for this
            // sort notes by timestamp
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static savePages(pageSave){
        const pages = pageAPI.getAllPages();
        //check if existing
        const exists = pages.find(page => pages.id == pageSave.id);
        if(exists){
            //edit/update
            exists.title = pageSave.title;
            exists.body = pageSave.body;
            exists.updated = new Date().toISOString();
        }
        else{
            //else insert
            //generate rand id for page to save
            pageSave.id = Math.floor(Math.random()*1000000);
            pageSave.updated = new Date().toISOString();
            pages.push(pageSave);
            localStorage.setItem("plantpage-page", JSON.stringify(pages));
        }
    }

    static deletePage(deleteID){
        const pages = pageAPI.getAllPages();
        const newPages = pages.filter(page => page.id != id);
        localStorage.setItem("plantpage-page", JSON.stringify(newPages));
    }
}