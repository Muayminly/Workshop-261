function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU5d9c2f64dba5a79b5703f16217099f581aa997f95cea8f85ee3303e96d2af4fa9389bf05fe88938703a7a4a10e198098'
        },
        body: JSON.stringify({
            "UserName": username,
            "PassWord": password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === true) {
            document.getElementById('message').innerText = "Login successful!";
            displayUserData(data);
            saveStudentData(data); // เรียกใช้ฟังก์ชันเพื่อบันทึกข้อมูล

        } else {
            alert("Error: login เข้าสู่ระบบไม่สำเร็จ");
            document.getElementById('message').innerText = "เข้าสู่ระบบไม่สำเร็จ";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error: login เข้าสู่ระบบไม่สำเร็จ");
        document.getElementById('message').innerText = "เกิดข้อผิดพลาด: " + error.message;
    });
}


function saveStudentData(data) {
    fetch('http://localhost:8080/students', { // URL ต้องตรงกับ Spring Boot endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            engName: data.displayname_en,
            email: data.email,
            faculty: data.faculty,
            type: data.type,
            userName: data.username
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data saved successfully:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

// Function to toggle the login button's enabled state based on form completion
function toggleLoginButton() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const loginButton = document.querySelector('button');

    loginButton.disabled = !(username && password && role);

    if (username && password && role !== "") {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}





// Add event listeners to check for input and toggle the login button
document.getElementById('username').addEventListener('input', toggleLoginButton);
document.getElementById('password').addEventListener('input', toggleLoginButton);
document.getElementById('role').addEventListener('change', toggleLoginButton);

// Toggle password visibility
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Disable the login button initially
document.querySelector('button').disabled = true;

// Function to display user data in the showdata div
function displayUserData(data) {
    const showDataDiv = document.getElementById('showdata');
    document.getElementById('showdata').style.display ='block';


    // Create HTML structure to show user data
    const userInfoHTML = `
        <h2>User Information</h2>
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>Display Name (TH):</strong> ${data.displayname_th}</p>
        <p><strong>Display Name (EN):</strong> ${data.displayname_en}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Status:</strong> ${data.tu_status}</p>
        <p><strong>Department:</strong> ${data.department}</p>
        <p><strong>Faculty:</strong> ${data.faculty}</p>
    `;

    // Insert the user information into the div
    showDataDiv.innerHTML = userInfoHTML;
}