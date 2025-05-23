<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AMNON18 Console</title>
    <script src="/socket.io/socket.io.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            text-align: center;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            padding: 5px 10px;
            border: 1px solid #ddd;
            margin: 5px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>Connected Users</h1>
    <ul id="userList">
        <!-- Users will be dynamically added here -->
    </ul>

    <script>
        const socket = io();

        // Update user list on receiving data
        socket.on('updateUserList', function(users) {
            const userList = document.getElementById('userList');
            userList.innerHTML = ''; // Clear the list
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user;
                userList.appendChild(li);
            });
        });
    </script>
</body>
</html>
