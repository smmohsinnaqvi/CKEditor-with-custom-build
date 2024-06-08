import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "@ckeditor/ckeditor5-editor-decoupled";
import { useEffect, useState } from "react";
import { Mention } from "@ckeditor/ckeditor5-mention";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import {
  FontSize,
  FontFamily,
  FontColor,
  FontBackgroundColor,
} from "@ckeditor/ckeditor5-font";
import { CKFinderUploadAdapter } from "@ckeditor/ckeditor5-adapter-ckfinder";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { CKBox } from "@ckeditor/ckeditor5-ckbox";
import { CKFinder } from "@ckeditor/ckeditor5-ckfinder";
import { EasyImage } from "@ckeditor/ckeditor5-easy-image";
import { Heading } from "@ckeditor/ckeditor5-heading";
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
} from "@ckeditor/ckeditor5-image";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { Link } from "@ckeditor/ckeditor5-link";
import { List, ListProperties } from "@ckeditor/ckeditor5-list";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";

export const Editor = ({ file, docs, setDocs }) => {
  const [editor, setEditor] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const editorConfiguration = {
    plugins: [
      Subscript,
      Superscript,
      Code,
      CodeBlock,
      Link,
      CKFinder,
      CKBox,
      MediaEmbed,
      IndentBlock,
      Indent,
      Image,
      ImageCaption,
      PictureEditing,
      ImageResize,
      ImageStyle,
      ImageUpload,
      ImageToolbar,
      List,
      EasyImage,
      ListProperties,
      Heading,
      TextTransformation,
      CloudServices,
      TableToolbar,
      PasteFromOffice,
      Autoformat,
      BlockQuote,
      CKFinderUploadAdapter,
      FontBackgroundColor,
      FontColor,
      FontSize,
      FontFamily,
      Alignment,
      Essentials,
      Bold,
      Italic,
      Strikethrough,
      Underline,
      Paragraph,
      Mention,
      Table,
    ],
    toolbar: isReadOnly
      ? { items: [] }
      : {
          items: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "fontfamily",
            "fontsize",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "subscript",
            "superscript",
            "code",
            "|",
            "link",
            "uploadImage",
            "blockQuote",
            "codeBlock",
            "|",
            "inserttable",
            "|",
            "alignment",
            "|",
            "mediaEmbed",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },

    mention: {
      feeds: [
        // Feed items as objects.
        {
          marker: "@",
          feed: [
            {
              id: "@Barney",
              // Custom text to be inserted into the editor
              text: "Barney Stinson",
            },
            {
              id: "@Mohsin",
              // Custom text to be inserted into the editor
              text: "Mohsin Naqvi",
            },
            {
              id: "@Saurabh",
              // Custom text to be inserted into the editor
              text: "Saurabh Nikam",
            },
            {
              id: "@Rohan",
              // Custom text to be inserted into the editor
              text: "Rohan Kadam",
            },
            {
              id: "@Sanket",
              // Custom text to be inserted into the editor
              text: "Sanket Kharedkar",
            },
            // ...
          ],
        },
      ],
    },
  };

  const [contents, setContents] = useState(file?.content || "");
  useEffect(() => {
    setContents(file?.content || "");
  }, [file, isReadOnly, editor]);
  console.log(contents);

  const handleDocs = () => {
    const newDocs = docs.map((doc) => {
      if (doc.title === file.title) {
        return {
          ...doc,
          content: editor.getData(),
        };
      }
      return doc;
    });
    setDocs(newDocs);
  };
  return contents ? (
    <>
      <h2>{file.title}</h2>

      <CKEditor
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
          if (editor && isReadOnly === false) {
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );

            // editor.enableReadOnlyMode("my-feature-id");

            //READ ONLY
            setEditor(editor);
          }
          if (isReadOnly) {
            editor.enableReadOnlyMode("my-feature-id");
          }
        }}
        config={editorConfiguration}
        onChange={(event, editor) => {
          // console.log(editor.getData());
          if (!isReadOnly) {
            if (editor.getData()) {
              setContents(editor.getData());
              handleDocs();
            }
          }
        }}
        editor={DecoupledEditor}
        data={contents}
      />
    </>
  ) : (
    ""
  );
};
