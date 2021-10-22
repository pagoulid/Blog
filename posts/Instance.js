// custom instance object to apply foreach on an object list type
class Instance{


    constructor(body,len){

        this.body=body;
        this.len=len;
        this.count=-1;
    }
    Tail(callback){
        let info = Object.entries(this.body[this.len-1]);
        let val = Object.values(info[0][1]);
        let Last_id = val[0];
        callback(Last_id);
        
    }
    Loop(callback){
        

        while(this.count<this.len-1){
            this.count++;
            
            let info = Object.entries(this.body[this.count]);
            
            let val = Object.values(info[0][1]);// get the values from datavalues content only


            let res={
                'id':val[0],
                'title':val[1],
                'main_text':val[2],
                'author':val[3],
                'post_date':val[4]

            }
            callback.call(this,res);

        }


    }








   
}

module.exports = Instance;
