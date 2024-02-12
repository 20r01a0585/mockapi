
var usersData = []; 
function viewUsers() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      usersData = JSON.parse(this.responseText);
      renderUsersTable();
    }
  };
  xhttp.open("GET", "https://6481981129fa1c5c5031b1e5.mockapi.io/api/vi/users", true);
  xhttp.send();
}
function renderUsersTable() {
  var tableBody = document.getElementById("userTableBody");
  tableBody.innerHTML = "";
  for (var i = 0; i < usersData.length; i++) {
    var user = usersData[i];
    var row = document.createElement("tr");
    row.id = "userRow_" + i;
    row.innerHTML =
      "<td>" + user.user_id + "</td>" +
      "<td>" + user.remarks + "</td>" +
      "<td>" + user.created_by + "</td>" +
      "<td>" + user.created_at + "</td>" +
      "<td class='actions'>" +
      "<button onclick='editUser(" + i + ")' style='background-color: black; color: white;'>Edit</button>" +
      "<button onclick='deleteUser(" + i + ")' style='background-color: pink; color: white;'>>Delete</button>" +
      "</td>";
    tableBody.appendChild(row);
  }
}
function editUser(userIndex) {
  var row = document.getElementById("userRow_" + userIndex);
  var cells = row.getElementsByTagName("td");
  for (var i = 0; i < cells.length - 1; i++) {
    var cell = cells[i];
    var cellValue = cell.innerText;
    cell.innerHTML = "<input type='text' value='" + cellValue + "' />";
  }
  var actionsCell = cells[cells.length - 1];
  actionsCell.innerHTML =
    "<button onclick='saveUser(" + userIndex + ")'>Save</button>" +
    "<button onclick='cancelEdit(" + userIndex + ")'>Cancel</button>";
}

function saveUser(userIndex) {
  var row = document.getElementById("userRow_" + userIndex);
  var cells = row.getElementsByTagName("td");
  var newName = cells[0].getElementsByTagName("input")[0].value;
  var newAge = cells[1].getElementsByTagName("input")[0].value;
  var newState = cells[2].getElementsByTagName("input")[0].value;
  var newState1 = cells[3].getElementsByTagName("input")[0].value;
  usersData[userIndex].user_id = newName;
  usersData[userIndex].remarks= newAge;
  usersData[userIndex].created_by= newState;
  usersData[userIndex].created_at= newState1;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //fetchUsers(); // Refresh the user list
     renderUsersTable();
    }
  };
  xhttp.open("PUT", "https://6481981129fa1c5c5031b1e5.mockapi.io/api/vi/users/" + usersData[userIndex].id, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ user_id: newName, remarks: newAge, created_by: newState, created_at: newState1}));
}

function cancelEdit(userIndex) {
  fetchUsers();
}

function deleteUser(userIndex) {
 var confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) {
  return;
}
 var userId = usersData[userIndex].id;
 var row = document.getElementById("userRow_" + userIndex);
 row.parentNode.removeChild(row);
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) { 

}
};
 xhttp.open("DELETE", "https://6481981129fa1c5c5031b1e5.mockapi.io/api/vi/users/" + userId, true);
 xhttp.setRequestHeader("Content-type", "application/json");
 xhttp.send();
}
document.getElementById("addUserForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var user_id = document.getElementById("nameInput").value;
  var remarks = document.getElementById("ageInput").value;
  var created_by = document.getElementById("stateInput").value;
  var created_at = document.getElementById("stateInput1").value;
  var newUser = {
    user_id: user_id,
    remarks: remarks,
    created_by: created_by,
    created_at: created_at
  };
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
     renderUsersTable();
      document.getElementById("addUserForm").reset(); 
    }
  };
  xhttp.open("POST", "https://6481981129fa1c5c5031b1e5.mockapi.io/api/vi/users", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(newUser));
});