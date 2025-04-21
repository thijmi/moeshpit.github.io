document.addEventListener('DOMContentLoaded', () => {
    const walletBoxes = document.querySelectorAll('.wallet-box');

    walletBoxes.forEach((wallet) => {
        const icon = wallet.querySelector('.icon');
        const walletAddress = wallet.getAttribute('data-wallet');

        wallet.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(walletAddress);
            } catch (err) {
                console.error('Copy failed:', err);
                return;
            }

            icon.classList.remove('fa-copy');
            icon.classList.add('fa-check');

            wallet.classList.add('copied');

            wallet.style.transform = 'scale(1.01)';
            wallet.style.transition = 'transform 0.2s ease';

            setTimeout(() => {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-copy');
                icon.style.transform = 'scale(1)';
                wallet.classList.remove('copied');
                wallet.style.transform = 'scale(1)';
            }, 500);
        });
    });
});

function submitId() {
    const userId = document.getElementById('input').value;  // Die User ID aus dem Textfeld
    const token = 'YOUR_DISCORD_BOT_TOKEN';  // Ersetze dies mit deinem Bot-Token

    // Discord API-URL für den Abruf der Benutzerinformationen
    const url = `https://discord.com/api/v10/users/${userId}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bot ${"MTM2Mzk3NTgwODAzMjcwNjcxMA.GOiizv.PRWpdTTLE9ONEYB9QhK8BLT2ZxahEpmccKqXvA"}`  // Hier fügst du den Bot-Token hinzu
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "401: Unauthorized") {
            // Wenn es ein Fehler gibt (z. B. falsche ID oder Token)
            document.getElementById('user-info').innerHTML = 'Error: Unauthorized or Invalid User ID';
        } else {
            // Erfolgreiche Antwort – Benutzerinfos anzeigen
            document.getElementById('user-info').innerHTML = `
                <h3>User Info:</h3>
                <p><strong>Username:</strong> ${data.username}#${data.discriminator}</p>
                <p><strong>Avatar:</strong> <img src="https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png" alt="Avatar" width="100"></p>
                <p><strong>User ID:</strong> ${data.id}</p>
                <p><strong>Bot:</strong> ${data.bot ? 'Yes' : 'No'}</p>
                <p><strong>Created at:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
            `;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById('user-info').innerHTML = 'An error occurred while fetching user data.';
    });
}
