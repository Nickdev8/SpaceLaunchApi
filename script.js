document.addEventListener('DOMContentLoaded', () => {
    fetch('fetch_launches.php')
        .then(response => response.json())
        .then(data => {
            const launchList = document.getElementById('launch-list');
            data.result.forEach(launch => {
                const launchDiv = document.createElement('div');
                launchDiv.className = 'launch';
                launchDiv.innerHTML = `
                    <h3>${launch.name}</h3>
                    <p><strong>Provider:</strong> ${launch.provider.name}</p>
                    <p><strong>Vehicle:</strong> ${launch.vehicle.name}</p>
                    <p><strong>Launch Time:</strong> ${new Date(launch.t0).toLocaleString()}</p>
                    <p><strong>Location:</strong> ${launch.pad.location.name}, ${launch.pad.location.statename}</p>
                    <p>${launch.launch_description}</p>
                `;
                launchList.appendChild(launchDiv);
            });
        });

    const notifyButton = document.getElementById('notify-btn');
    notifyButton.addEventListener('click', () => {
        if (Notification.permission === 'granted') {
            alert('Notifications are already enabled.');
        } else if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    alert('Notifications enabled! You will be notified of launches.');
                } else {
                    alert('Notifications disabled.');
                }
            });
        } else {
            alert('Notifications have been blocked. Please enable them in your browser settings.');
        }
    });
});
