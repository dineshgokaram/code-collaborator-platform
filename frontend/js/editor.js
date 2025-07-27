function initializeEditor(callback) {
    const editorDiv = document.getElementById('editor');
    if (!editorDiv) {
        console.error("Editor container 'editor' not found.");
        return;
    }
    
    window.editor = monaco.editor.create(editorDiv, {
        value: 'print("Hello, collaborative world!")',
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true,
    });
    
    if (callback) {
        callback();
    }
}

window.initializeEditor = initializeEditor;