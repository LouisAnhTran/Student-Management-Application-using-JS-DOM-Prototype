var student_list = new StudentList();

// pull_data_from_local_storage();
GetStorage();

var add_new_student = function () {
    var validation_tool = new ValidationInfo();

    var valid = true;

    // Check if input value is empty: 
    valid &= validation_tool.check_empty_input("#masv", "Student School ID", "#error_id_empty");
    valid &= validation_tool.check_empty_input("#hoten", "Student full name", "#error_name_empty");
    valid &= validation_tool.check_empty_input("#cmnd", "Student IC", "#error_res_id_empty");
    valid &= validation_tool.check_empty_input("#sdt", "Student Phone Number", "#error_phone_empty");
    valid &= validation_tool.check_empty_input("#email", "Student Email", "#error_email_empty");
    valid &= validation_tool.check_empty_input("#Toan", "Student Math Score", "#error_math_empty");
    valid &= validation_tool.check_empty_input("#Ly", "Student Physics Score", "#error_physics_empty");
    valid &= validation_tool.check_empty_input("#Hoa", "Student Chemistry Score", "#error_chemistry_empty");


    if (valid != true) {
        alert("Information provided is not valid");
        return;
    }

    // # Initialize new student instance 
    var student = new Student();

    student.student_id = document.querySelector("#masv").value;
    student.student_name = document.querySelector("#hoten").value;
    student.student_resident_id = document.querySelector("#cmnd").value;
    student.student_phone_number = document.querySelector("#sdt").value;
    student.student_email = document.querySelector("#email").value;
    student.math_score = document.querySelector("#Toan").value;
    student.physics_score = document.querySelector("#Ly").value;
    student.chemistry_score = document.querySelector("#Hoa").value;

    student.find_average_score();
    student.find_level();


    // Add new student instance to the list of student
    student_list.add_student_to_list(student);
    console.log(student_list);
    print_list_of_students();

}

function create_td_with_value(value) {
    var new_td_element = document.createElement("td");
    new_td_element.innerHTML = value;
    return new_td_element;
}

function print_list_of_students() {
    var body_table = document.getElementById("tbodySinhVien");
    body_table.innerHTML = "";
    for (var i = 0; i < student_list.list_of_students.length; i++) {
        // take student object
        var item = student_list.list_of_students[i];
        // create new tr element
        var tr_element = document.createElement("tr");
        tr_element.setAttribute("class", "row_each_student")
        tr_element.setAttribute("onclick", "update_information(" + item.student_id + ")");

        // Create checkbox
        var td_for_check_box = document.createElement("td");
        var check_box = document.createElement("input");
        check_box.setAttribute("class", "check_box_for_removing");
        check_box.setAttribute("type", "checkbox");
        check_box.setAttribute("value", item.student_id);
        td_for_check_box.appendChild(check_box);

        // Create td element for other fields:
        tr_element.appendChild(td_for_check_box);
        tr_element.appendChild(create_td_with_value(item.student_id));
        tr_element.appendChild(create_td_with_value(item.student_name));
        tr_element.appendChild(create_td_with_value(item.student_email));
        tr_element.appendChild(create_td_with_value(item.student_resident_id));
        tr_element.appendChild(create_td_with_value(item.student_phone_number));
        tr_element.appendChild(create_td_with_value(item.average_score));
        tr_element.appendChild(create_td_with_value(item.level));

        body_table.appendChild(tr_element);
    }
}

// Reset fields to original state
var reset_field_to_original_state = function (id) {
    var obj = document.querySelector(id);
    obj.value = "";
    obj.style.borderColor = "black";
    obj.style.borderSize = "0.5px";
}
document.querySelector("#button_clear_info").onclick = function () {
    reset_field_to_original_state("#masv");
    reset_field_to_original_state("#hoten");
    reset_field_to_original_state("#cmnd");
    reset_field_to_original_state("#sdt");
    reset_field_to_original_state("#email");
    reset_field_to_original_state("#Toan");
    reset_field_to_original_state("#Ly");
    reset_field_to_original_state("#Hoa");
    var obj_list = document.getElementsByClassName("check_color");
    for (var i = 0; i < obj_list.length; i++) {
        var item = obj_list[i];
        item.innerHTML = "";
        item.style.display = "none";
    }
}

// Remove student from the list
var remove_student_from_current_list = function () {
    var obj_check_boc = document.querySelectorAll(".check_box_for_removing");
    var student_list_to_remove = [];
    for (var i = 0; i < obj_check_boc.length; i++) {
        if (obj_check_boc[i].checked) {
            student_list_to_remove.push(student_list.find_student_by_id(obj_check_boc[i].value))
        }
    }
    student_list.remove_students_from_the_list(student_list_to_remove);
    print_list_of_students();
}

var check_if_any_check_box_is_sticked = function () {
    var obj_check_boc = document.querySelectorAll(".check_box_for_removing");
    for (var i = 0; i < obj_check_boc.length; i++) {
        if (obj_check_boc[i].checked) {
            return true;
        }
    }
    return false;
}


// Work with local data storage
function push_data_to_local_storage() {
    localStorage.setItem("listStudent", JSON.stringify(student_list.list_of_students));
}


function pull_data_from_local_storage() {
    student_list.list_of_students = JSON.parse(localStorage.getItem("listStudent"));
    print_list_of_students();
}

function SetStorage() {
    //Chuyển đổi object mảng danh sách sinh viên thành chuỗi json
    var jsonDanhSachSinhVien = JSON.stringify(student_list.list_of_students);
    //Rồi đem chuỗi json lưu vào storage và đặt tên là DanhSachSV
    localStorage.setItem("DanhSachSV", jsonDanhSachSinhVien);
    console.log("I hate you");
}

function GetStorage() {
    //Lấy ra chuỗi json là mảng danhsachsinhvien thông qua tên DanhSachSV
    var jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
    if (jsonDanhSachSinhVien) {
        var mangDSSV = JSON.parse(jsonDanhSachSinhVien);
        student_list.list_of_students = mangDSSV;
        print_list_of_students();
    }
    console.log("I love you");
}


// Update student information
function check_information() {
    var validation_tool = new ValidationInfo();

    var valid = true;

    // Check if input value is empty: 
    valid &= validation_tool.check_empty_input("#masv", "Student School ID", "#error_id_empty");
    valid &= validation_tool.check_empty_input("#hoten", "Student full name", "#error_name_empty");
    valid &= validation_tool.check_empty_input("#cmnd", "Student IC", "#error_res_id_empty");
    valid &= validation_tool.check_empty_input("#sdt", "Student Phone Number", "#error_phone_empty");
    valid &= validation_tool.check_empty_input("#email", "Student Email", "#error_email_empty");
    valid &= validation_tool.check_empty_input("#Toan", "Student Math Score", "#error_math_empty");
    valid &= validation_tool.check_empty_input("#Ly", "Student Physics Score", "#error_physics_empty");
    valid &= validation_tool.check_empty_input("#Hoa", "Student Chemistry Score", "#error_chemistry_empty");


    if (valid != true) {
        alert("Information provided is not valid");
        return;
    }
}
function update_information(id) {
    var item = student_list.find_student_by_id(id);
    document.querySelector("#masv").value = item.student_id;
    document.querySelector("#hoten").value = item.student_name;
    document.querySelector("#cmnd").value = item.student_resident_id;
    document.querySelector("#sdt").value = item.student_phone_number;
    document.querySelector("#email").value = item.student_email;
    document.querySelector("#Toan").value = item.math_score;
    document.querySelector("#Ly").value = item.physics_score;
    document.querySelector("#Hoa").value = item.chemistry_score;
}

function save_update_student_info() {
    var student_id_info = document.querySelector("#masv").value;
    if (student_id_info == "" || student_list.find_student_by_id(student_id_info) == null) {
        alert("Failure to save changes because there is no valid student with that id in the list");
        return;
    }

    var validation_tool = new ValidationInfo();

    var valid = true;

    // Check if input value is empty: 
    valid &= validation_tool.check_empty_input("#masv", "Student School ID", "#error_id_empty");
    valid &= validation_tool.check_empty_input("#hoten", "Student full name", "#error_name_empty");
    valid &= validation_tool.check_empty_input("#cmnd", "Student IC", "#error_res_id_empty");
    valid &= validation_tool.check_empty_input("#sdt", "Student Phone Number", "#error_phone_empty");
    valid &= validation_tool.check_empty_input("#email", "Student Email", "#error_email_empty");
    valid &= validation_tool.check_empty_input("#Toan", "Student Math Score", "#error_math_empty");
    valid &= validation_tool.check_empty_input("#Ly", "Student Physics Score", "#error_physics_empty");
    valid &= validation_tool.check_empty_input("#Hoa", "Student Chemistry Score", "#error_chemistry_empty");


    if (valid != true) {
        alert("Information provided is not valid");
        return;
    }

    var student = student_list.find_student_by_id(student_id_info);

    student.student_id = document.querySelector("#masv").value;
    student.student_name = document.querySelector("#hoten").value;
    student.student_resident_id = document.querySelector("#cmnd").value;
    student.student_phone_number = document.querySelector("#sdt").value;
    student.student_email = document.querySelector("#email").value;
    student.math_score = document.querySelector("#Toan").value;
    student.physics_score = document.querySelector("#Ly").value;
    student.chemistry_score = document.querySelector("#Hoa").value;

    student.average_score = ((Number(student.math_score) + Number(student.chemistry_score) + Number(student.physics_score)) / 3).toFixed(2);

    if (student.average_score >= 9) {
        student.level = "Excellent";
    }
    else if (student.average_score >= 8) {
        student.level = "Very Good";
    }
    else if (student.average_score >= 7) {
        student.level = "Good";
    }
    else if (student.average_score >= 6) {
        student.level = "Satisfactory";
    }
    else if (student.average_score >= 5) {
        student.level = "Acceptable";
    }
    else {
        student.level = "Fail";
    }


print_list_of_students();
}

document.querySelector("#button_add_student").onclick = add_new_student;

document.querySelector("#remove_student").onclick = function () {
    if (check_if_any_check_box_is_sticked()) {
        remove_student_from_current_list();
    }
    else {
        alert("No student is selected to be remove")
        return;
    }
}

document.querySelector("#push_to_storage").onclick = SetStorage;
document.querySelector("#pull_from_storage").onclick = GetStorage;
document.querySelector("#save_change").onclick = save_update_student_info;