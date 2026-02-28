import Editor from '@monaco-editor/react';

function EditorComponent({ code, setCode, onSubmit, disabled }) {
  return (
    <div className="h-full rounded-xl border border-cyan-900/60 bg-arcane-900/70 p-3 shadow-rune">
      <Editor
        height="68vh"
        defaultLanguage="javascript"
        value={code}
        onChange={(value) => setCode(value ?? '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 15,
          lineNumbers: 'on',
          wordWrap: 'on',
          tabSize: 2,
          automaticLayout: true
        }}
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={disabled}
        className="mt-4 w-full rounded-lg bg-cyan-500 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
      >
        Cast Spell
      </button>
    </div>
  );
}

export default EditorComponent;
