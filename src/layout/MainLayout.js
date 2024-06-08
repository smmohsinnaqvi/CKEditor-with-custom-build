import React, { useEffect, useState } from "react";
import { Editor } from "../components/Editor";
import SideNavBar from "../components/SideNavBar";

export default function MainLayout() {
  const [docs, setDocs] = useState([
    { title: "doc 1", content: "Doc 1 abc" },
    { title: "doc 2", content: "Doc 2 abc" },
    { title: "doc 3", content: "Doc 3 abc" },
  ]);

  const [collection, setCollection] = useState([
    {
      id: 1,
      title: "Test1",
      docs: [
        { title: "doc 4", content: "Doc 4 abc" },
        { title: "doc 5", content: "Doc 5 abc" },
        { title: "doc 6", content: "Doc 6 abc" },
      ],
    },
  ]);

  const [selected, setSelected] = useState(docs[0]);

  useEffect(() => {}, [selected]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{ display: "flex", justifyContent: "center", width: "20%" }}
        >
          <SideNavBar
            docs={docs}
            setDocs={setDocs}
            selected={selected}
            setSelected={setSelected}
            collection={collection}
            setCollection={setCollection}
          />
        </div>

        <div style={{ width: "80%", marginLeft: "4%", marginRight: "4%" }}>
          <Editor file={selected} docs={docs} setDocs={setDocs} />;
        </div>
      </div>
    </>
  );
}
