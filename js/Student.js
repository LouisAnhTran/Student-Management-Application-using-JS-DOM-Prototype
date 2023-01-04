// Defining the student class 
var Student=function(){
    this.student_id="";
    this.student_name="";
    this.student_resident_id="";
    this.student_phone_number="";
    this.student_email="";
    this.math_score="";
    this.physics_score="";
    this.chemistry_score="";
    this.average_score="";
    this.level="";
    this.find_average_score=function(){
        this.average_score=((Number(this.math_score)+Number(this.chemistry_score)+Number(this.physics_score))/3).toFixed(2);
    }
    this.find_level=function(){
        if(this.average_score>=9){
            this.level="Excellent";
        }
        else if(this.average_score>=8){
            this.level="Very Good";
        }
        else if(this.average_score>=7){
            this.level="Good";
        }
        else if(this.average_score>=6){
            this.level="Satisfactory";
        }
        else if(this.average_score>=5){
            this.level="Acceptable";
        }
        else{
            this.level="Fail";
        }
    }    
}