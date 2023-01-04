var StudentList=function(){
    this.list_of_students=[];
    this.add_student_to_list=function(student){
        this.list_of_students.push(student);
    }
    this.remove_students_from_the_list=function(list_of_remove_students){
        for(var i=0;i<list_of_remove_students.length;i++){
            for(var j=0;j<this.list_of_students.length;j++){
                if(list_of_remove_students[i].student_id==this.list_of_students[j].student_id){
                    this.list_of_students.splice(j,1);
                    break;
                }
            }
        }
    }
    this.find_student_by_id=function(id){
        for(var i=0;i<this.list_of_students.length;i++){
            if(this.list_of_students[i].student_id==id){
                return this.list_of_students[i];
            }
        }
        return null;
    }
}