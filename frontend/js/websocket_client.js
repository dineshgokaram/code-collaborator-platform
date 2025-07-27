class WebSocketClient {
    constructor(url) {
        this.socket = new WebSocket(url);
        this.socket.onopen = () => this._onOpen();
        this.socket.onclose = () => this._onClose();
        this.socket.onmessage = (event) => this._onMessage(event);
        this.socket.onerror = (error) => this._onError(error);
        this.openHandler = () => {};
        this.closeHandler = () => {};
        this.messageHandler = () => {};
    }
    _onOpen() { this.openHandler(); }
    _onClose() { this.closeHandler(); }
    _onMessage(event) { this.messageHandler(event); }
    _onError(error) { console.error("WebSocket Error:", error); }
    onOpen(handler) { this.openHandler = handler; }
    onClose(handler) { this.closeHandler = handler; }
    onMessage(handler) { this.messageHandler = handler; }
    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error("WebSocket is not open. Cannot send message.");
        }
    }
}