var NoteMemo=[] /*מערך פתקים */
var Snap        /*הצמדה בין פתק לסגירתו*/
var Closer      /*כפתור סגירה */


//בפתיחת הדף 
addEventListener("load", loadTasks)                     /*הצמדת פקודה בהפעלת קובץ הסקריפט  בתחילת העבודה */
function loadTasks()
{
    if(localStorage["MisPad"] !== "null")              /*  אם הזכרון לא ריק  */
    {
        NoteMemo=JSON.parse(localStorage["MisPad"])    /*הצב זיכרון בשם נוטפד בערך נוטממו*/
        for(i = 0; i < NoteMemo.length; i++)
        {
                var SingleNote = NoteMemo[i]            /*יצירת ערך המיצג פתק במערך*/
                   
                var padDiv = document.createElement("div")           /*יצירת אלמט לפתק*/
                var padTextearea = document.createElement("textarea")/* יצירת אלמנט לטקסט בפתק */
                var padSpan = document.createElement("span")         /*הכנת ערך למחיקה*/
                /*סידור האלמנטים */
                padTextearea.setAttribute("class","ArrNote")    /*"יצירת תכונה: כיתה בשם "פדאק*/
                padTextearea.innerHTML = SingleNote
                padDiv.addEventListener("mouseover", add_X)
                padDiv.appendChild(padSpan)                    /*פעולות הבאות יצירת קשר של אב ובן בין אובייקאטים */
                padDiv.appendChild(padTextearea)
                
                document.getElementById("pads").appendChild(padDiv)                     
        }       
    }
}


document.getElementById("submit").addEventListener("click", newNote) /*בעת לחיצה בכפתור האישור להפעיל פטנקצית יצירת םתק חדש */

function newNote()
{   
    //אם מילאת הכל המשך
    if(document.getElementById("textarea").value !== "" && document.getElementById("date").value !== "")
         {   
             localStorage.setItem("MisPad",JSON.stringify( NoteMemo))/*לשמור את לוקאל סטוראג במערך */
           if(localStorage["MisPad"] !== "null")
            {
                //לקיחת הנתונים מלוקאל כדי שמאוחר יותר נוכל להכניס בפוש את הפאד החדש
                NoteMemo=JSON.parse(localStorage["MisPad"])
            }    
                //מחיקת האזהרה של "לא מילאת הכל" אם היתה אזהרה 
                document.getElementById("warning").innerHTML=null
                //יצירת הפאד
                var padDiv = document.createElement("div")
                var padTextearea = document.createElement("textarea")
                var padSpan = document.createElement("span")
                
                padTextearea.setAttribute("class","padTextearea")
                padTextearea.innerHTML =  document.getElementById("textarea").value+ "\n" + "\n" +"date:"+document.getElementById("date").value
                padDiv.addEventListener("mouseover", add_X) /*שיוך הכפתור סגירה לפונקציה */
                padDiv.appendChild(padSpan)
                padDiv.appendChild(padTextearea)
                document.getElementById("pads").appendChild(padDiv)
                
                 // שמירת הכיתוב של הפאד ללוכאל
                var SingleNote = padTextearea.innerHTML
                NoteMemo.push(SingleNote)
                localStorage.setItem("MisPad",JSON.stringify( NoteMemo))
                
                //עידכון הוואר לאחר הוספת פאד בשביל אפשרות מחיקה מיידית               
                NoteMemo=JSON.parse(localStorage["MisPad"])
               
                //מחיקה וחידוש אזור הכתיבה
                document.getElementById("textarea").value=""
                document.getElementById("date").value=""
                                              
        }
        else
        {
            //אם לא מילאת הכל לא תוכל להמשיך
             var warning1 = document.createElement("h3")
             warning1.innerHTML="Please, fill in everything.There are empty fields."
           
             document.getElementById("warning").appendChild(warning1)
             alert("Please fill all fields")
        }
}
/* פונקציה למחיקה ספציפית*/
function add_X() {
    //הוספת אייקון מבוטסטראפ ושמירת הפאד המסויים שהועבר עליו העכבר
    Closer = this
    var c = this.childNodes
    Snap = this.childNodes[1].innerHTML
    var padSpan = c[0]

    padSpan.setAttribute("class", "glyphicon glyphicon-remove")
    //הוספת פונקציה למחיקת הפאד מהדף ומהלוקאל
    padSpan.addEventListener("click", deletefromlocal)
}

//מחיקת הפאד מהדף ומהלוקאל 
function deletefromlocal() {
    //אזהרה לפני מחיקה
    if (confirm("Are you sure you want to delete this task")) {
        for (i = 0; i < NoteMemo.length; i++) {

            if (JSON.stringify(NoteMemo[i]) === JSON.stringify(Snap)) {
                NoteMemo.splice(i, 1);
            }
            localStorage["MisPad"] = JSON.stringify(NoteMemo)
        }
        //מחיקת כל הפאדים והוספתם מחדש בכדי שלא יווצרו חורים בדף
        document.getElementById("pads").innerHTML = null
        loadTasks()
    }
}



function deleteAll()
{
     if (confirm("Are you sure you want to delete ALL??")){
    localStorage.removeItem("MisPad");
    window.location.reload();
    } 
}