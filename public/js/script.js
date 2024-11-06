document.addEventListener("DOMContentLoaded", function () {
    // Add search functionality
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", function () {
        const query = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll("tbody tr");
        
        rows.forEach(row => {
            let text = row.innerText.toLowerCase();
            if (text.includes(query)) {
                row.style.display = ""; // Show row if it matches the query
            } else {
                row.style.display = "none"; // Hide row if it doesn't match
            }
        });
    });

    // Add highlight functionality on hover
    const cells = document.querySelectorAll("td");
    cells.forEach(cell => {
        cell.addEventListener("mouseenter", function () {
            this.style.backgroundColor = "#ffe082"; // Highlight color
        });
        cell.addEventListener("mouseleave", function () {
            this.style.backgroundColor = ""; // Reset color
        });
    });
});