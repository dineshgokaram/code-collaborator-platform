document.addEventListener('DOMContentLoaded', () => {
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const mainApp = document.getElementById('main-app');
    const userList = document.getElementById('user-list');
    let accessToken = null;
    let username = null;
    let remoteCursors = {};

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.textContent = '';
        username = loginForm.username.value;
        const password = loginForm.password.value;
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        try {
            const response = await fetch('http://localhost:8000/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData,
            });
            if (!response.ok) { throw new Error('Incorrect username or password'); }
            const data = await response.json();
            accessToken = data.access_token;
            loginOverlay.classList.add('hidden');
            mainApp.classList.remove('hidden');
            initializeApp();
        } catch (error) {
            loginError.textContent = error.message;
        }
    });

    function initializeApp() {
        const statusElement = document.getElementById('status');
        let isEditorUpdateFromRemote = false;

        if (window.initializeEditor) {
            window.initializeEditor(setupEventListeners);
        }

        const sessionId = "session123";
        const ws = new WebSocketClient(`ws://localhost:8000/ws/${sessionId}?token=${accessToken}`);

        ws.onOpen(() => {
            statusElement.textContent = `Status: Connected as ${username}`;
        });

        ws.onMessage((event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case 'user_list':
                    updateUserList(message.users);
                    break;
                case 'code_update':
                    isEditorUpdateFromRemote = true;
                    if (window.editor) {
                        const model = window.editor.getModel();
                        model.pushEditOperations([], [{ range: model.getFullModelRange(), text: message.content }], () => null);
                    }
                    setTimeout(() => { isEditorUpdateFromRemote = false; }, 20);
                    break;
                case 'cursor_update':
                    if (message.sender !== username) {
                        updateRemoteCursor(message.sender, message.position);
                    }
                    break;
            }
        });

        function updateUserList(users) {
            userList.innerHTML = '';
            Object.keys(remoteCursors).forEach(user => {
                if (!users.includes(user)) {
                    remoteCursors[user].widget.dispose(); // Use the correct API
                    delete remoteCursors[user];
                }
            });
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `👤 ${user}`;
                if (user === username) {
                    li.textContent += ' (You)';
                    li.style.fontWeight = 'bold';
                }
                userList.appendChild(li);
            });
        }

        function updateRemoteCursor(sender, position) {
            if (!remoteCursors[sender]) {
                const cursorNode = document.createElement('div');
                cursorNode.className = 'remote-cursor';
                const labelNode = document.createElement('div');
                labelNode.className = 'remote-cursor-label';
                labelNode.textContent = sender;
                cursorNode.appendChild(labelNode);
                
                const widget = {
                    getId: () => `remote-cursor-${sender}`,
                    getDomNode: () => cursorNode,
                    getPosition: () => ({
                        position: remoteCursors[sender]?.position,
                        preference: [monaco.editor.ContentWidgetPositioningPreference.EXACT]
                    })
                };
                window.editor.addContentWidget(widget);
                remoteCursors[sender] = { widget: widget, position: position };
            }
            remoteCursors[sender].position = position;
            window.editor.layoutContentWidget(remoteCursors[sender].widget);
        }

        function setupEventListeners() {
            const runButton = document.getElementById('run-button');
            const outputConsole = document.getElementById('output-console');
            
            runButton.addEventListener('click', async () => {
                const code = window.editor.getValue();
                outputConsole.textContent = 'Running code...';
                outputConsole.classList.remove('error');
                runButton.disabled = true;
                try {
                    const response = await fetch('http://localhost:8000/api/execute', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ language: 'python', code: code }),
                    });
                    const result = await response.json();
                    if (result.error) {
                        outputConsole.textContent = result.error;
                        outputConsole.classList.add('error');
                    } else {
                        outputConsole.textContent = result.output;
                    }
                } catch (error) {
                    outputConsole.textContent = `Failed to connect. Error: ${error}`;
                    outputConsole.classList.add('error');
                } finally {
                    runButton.disabled = false;
                }
            });

            window.editor.onDidChangeModelContent(() => {
                if (isEditorUpdateFromRemote) return;
                const message = { type: 'code_update', content: window.editor.getValue() };
                ws.sendMessage(JSON.stringify(message));
            });

            window.editor.onDidChangeCursorPosition(e => {
                const message = { type: 'cursor_update', position: e.position };
                ws.sendMessage(JSON.stringify(message));
            });
        }
    }
});