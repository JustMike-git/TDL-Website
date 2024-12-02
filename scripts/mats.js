// Function to fetch tournament data and populate the table
async function populateTournamentData() {
    try {
        // Fetch data from the API
        const response = await fetch('http://supplies-whether.gl.at.ply.gg:19194/api/discordbot/gettournaifno');
        const data = await response.json();

        // Check if data is valid
        if (data) {
            // Get the table body
            const tableBody = document.querySelector('.matstable tbody');

            // Clear any existing rows
            tableBody.innerHTML = '';

            // Format numbers with commas
            const formatter = new Intl.NumberFormat();

            // Iterate over the data (keys are player names)
            Object.keys(data).forEach(playerName => {
                const player = data[playerName]; // Get the player object

                const row = document.createElement('tr');

                // Create and append table cells for each player's data
                const nameCell = document.createElement('td');
                nameCell.textContent = playerName; // Player's ingame name
                row.appendChild(nameCell);

                const metalCell = document.createElement('td');
                metalCell.textContent = formatter.format(player.metal); // Player's metal amount formatted
                row.appendChild(metalCell);

                const leadCell = document.createElement('td');
                leadCell.textContent = formatter.format(player.lead); // Player's lead amount formatted
                row.appendChild(leadCell);

                // Calculate total materials
                const metal = parseFloat(player.metal) || 0;
                const lead = parseFloat(player.lead) || 0;
                const totalMaterials = (Math.min(metal, lead) / 50000) * 30000;

                // Create a cell for the total materials
                const totalMaterialsCell = document.createElement('td');
                totalMaterialsCell.textContent = formatter.format(Math.round(totalMaterials)); // Total materials formatted and rounded
                row.appendChild(totalMaterialsCell);

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