"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHtmlToLexical = convertHtmlToLexical;
const html_1 = require("@lexical/html");
const lexical_1 = require("lexical");
const jsdom_1 = require("jsdom");
function convertHtmlToLexical(htmlString, fieldName) {
    const editor = (0, lexical_1.createEditor)();
    editor.update(() => {
        const nodes = (0, html_1.$generateNodesFromDOM)(editor, new jsdom_1.JSDOM(htmlString).window.document);
        (0, lexical_1.$getRoot)().select();
        const selection = (0, lexical_1.$getSelection)();
        selection === null || selection === void 0 ? void 0 : selection.insertNodes(nodes);
    }, { discrete: true });
    const lexicalJson = editor.getEditorState().toJSON();
    return {
        [fieldName]: lexicalJson,
    };
}
