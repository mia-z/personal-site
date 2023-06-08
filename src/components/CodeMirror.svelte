<script lang="ts">
    import { basicSetup, EditorView } from "codemirror";
    import { markdown } from "@codemirror/lang-markdown";
    import { languages } from "@codemirror/language-data";
    import { onMount } from "svelte";

    export let doc: string;
    export let wrapperClass: string;

    let editorContainer: HTMLDivElement;
    let editor: EditorView;

    const fixedHeightEditor = EditorView.theme({
        ".cm-content, .cm-gutter": {minHeight: "200px"}
    });

    onMount(() => {
        editor = new EditorView({
            doc,
            extensions: [
                basicSetup,
                markdown({
                    codeLanguages: languages
                }),
                EditorView.lineWrapping,
                EditorView.updateListener.of((e) => {
                    doc = e.state.doc.toString();
                }),
                fixedHeightEditor
            ],
            parent: editorContainer
        });
        
    });
</script>

<div class={wrapperClass} bind:this={editorContainer}>

</div>