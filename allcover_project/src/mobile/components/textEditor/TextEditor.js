import { useState } from "react";
import ReactQuill from "react-quill";




export default function TextEditor() {
    const modules = {
        toolbar: {
            container: [
                ["image"],
                [{ header: [1, 2, 3, 4, 5, false] }],
                ["bold", "underline"],
            ],
        },
    }
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    return (
        <>
            <ReactQuill
                style={{ width: "100%", height: "100%" }}
                modules={modules}
                onChange={setContent}
            >
            </ReactQuill>
        </>
    )
}