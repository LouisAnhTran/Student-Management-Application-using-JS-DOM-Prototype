var ValidationInfo=function(){
    this.check_empty_input=function(input_id,field_name,error_id){
        var input_obj=document.querySelector(input_id);
        var error_obj=document.querySelector(error_id);
        if(input_obj.value.trim()==""){
            input_obj.style.borderColor="red";
            input_obj.style.borderWidth="1.5px";
            error_obj.style.color="red";
            error_obj.style.display="block";
            error_obj.innerHTML=field_name + " can not be empty field";
            return false;
        } 
        input_obj.style.borderWidth="1.5px";       
        input_obj.style.borderColor="green";
        error_obj.style.display="none";
        return true;
    }
}