// Function to fetch tournament data and populate the table
async function populateTournamentData() {
    try {
        // Fetch data from the API
        const response = await fetch('http://localhost:5555/api/discordbot/gettournaifno');
        const data = await response.json();

        // Check if data is valid
        if (data) {
            // Get the table body
            const tableBody = document.querySelector('.matstable tbody');

            // Clear any existing rows
            tableBody.innerHTML = '';

            // Iterate over the data (keys are player names)
            Object.keys(data).forEach(playerName => {
                const player = data[playerName]; // Get the player object

                const row = document.createElement('tr');

                // Create and append table cells for each player's data
                const nameCell = document.createElement('td');
                nameCell.textContent = playerName; // Player's ingame name
                row.appendChild(nameCell);

                const metalCell = document.createElement('td');
                metalCell.textContent = player.metal; // Player's metal amount
                row.appendChild(metalCell);

                const leadCell = document.createElement('td');
                leadCell.textContent = player.lead; // Player's lead amount
                row.appendChild(leadCell);

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        } else {
            console.error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = function() {
    populateTournamentData();
};