document.addEventListener("DOMContentLoaded", () => {
    const confirmationTable = document.getElementById("confirmationTable");

    // Retrieve user inputs from localStorage
    const fullName = localStorage.getItem("fullName");
    const countryCode = localStorage.getItem("countryCode");
    const mobileNumber = localStorage.getItem("mobileNumber");
    const email = localStorage.getItem("email");
    const checkin = localStorage.getItem("visitDate");
    const checkout = localStorage.getItem("checkOutDate");
    const singleRoomCount = parseInt(localStorage.getItem("singleRoom")) || 0;
    const doubleRoomCount = parseInt(localStorage.getItem("doubleRoom")) || 0;
    const tripleRoomCount = parseInt(localStorage.getItem("tripleRoom")) || 0;
    const totalRooms = singleRoomCount + doubleRoomCount + tripleRoomCount;
    const total = localStorage.getItem("summaryTotal");

    // Populate the table with user inputs
    confirmationTable.innerHTML = `
        <tr>
            <td>Full Name:</td>
            <td>${fullName}</td>
        </tr>
        <tr>
            <td>Mobile Number:</td>
            <td>${mobileNumber}</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>Check-in:</td>
            <td>${checkin}</td>
        </tr>
        <tr>
            <td>Check-out:</td>
            <td>${checkout}</td>
        </tr>
        <tr>
            <td>Single Room(s):</td>
            <td>${singleRoomCount}</td>
        </tr>
        <tr>
            <td>Double Room(s):</td>
            <td>${doubleRoomCount}</td>
        </tr>
        <tr>
            <td>Triple Room(s):</td>
            <td>${tripleRoomCount}</td>
        </tr>
        <tr>
            <td>Total Rooms:</td>
            <td>${totalRooms}</td>
        </tr>
        <tr>
            <td>Total:</td>
            <td>${total}</td>
        </tr>
    `;

    // Checkout button event listener
    const checkoutButton = document.getElementById("checkoutButton");
    checkoutButton.addEventListener("click", () => {
        window.location.href = "piha.html"; // Change "homepage.html" to the actual homepage URL
    });
});
