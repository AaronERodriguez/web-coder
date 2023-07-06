import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import Button from './Components/Button'
import Code from './Components/Code'
import Slider from './Components/Slider'
import Range from './Components/Range'
import FontDropDown from './Components/fontDropDown'
import FileDropDown from './Components/FileDropDown'
import AddFile from './Components/AddFile'
import DeleteFile from './Components/DeleteFile'

function App() {
  const [currentFile, setCurrentFile] = useState(() => {
    const localValue = localStorage.getItem("currentFile")
    if (localValue == null) {return "placeHolder"}
    else {return localValue}
  })
  const [openedEditor, setOpenedEditor] = useState(() => {
    const localValue = localStorage.getItem(currentFile);
    if (localValue === "[object Object]" || localValue === null) {return "html"}
    else {return JSON.parse(localValue).openedEditor}
    
  });
  const [codeFont, setCodeFont] = useState(() => {
    const localValue = localStorage.getItem("codeFont")
    if (localValue == null) {return "25"}
    else {return localValue}
  });
  const [codeFontFamily, setCodeFontFamily] = useState(() => {
    const localValue = localStorage.getItem("fontFamily")
    if (localValue == null) {return "monospace"}
    else {return localValue}
  })
  const [siteTheme, setSiteTheme] = useState(() => {
    const localValue = localStorage.getItem("Theme")
    if (localValue == null) {return "dark"}
    else {return localValue}
  });
  const [active, setActive] = useState(() => {
    const localValue = localStorage.getItem(currentFile);
    if (localValue === "[object Object]" || localValue === null) {return "html"}
    else {return JSON.parse(localValue).active}
  });
  const [html, setHtml] = useState(() => {
    const localValue = localStorage.getItem(currentFile);
    if (localValue === "[object Object]" || localValue === null) {
      return ""}
      else {
        return JSON.parse(localValue).HTML}
      });
      const [css, setCss] = useState(() => {
        const localValue = localStorage.getItem(currentFile);
        if (localValue === "[object Object]" || localValue === null) {return ""}
    else {return JSON.parse(localValue).CSS}
  });
  const [js, setJs] = useState(() => {
    const localValue = localStorage.getItem(currentFile);
    if (localValue === "[object Object]" || localValue === null) {return ""}
    else {return JSON.parse(localValue).JS}
  });
  const [srcDoc, setSrcDoc] = useState(` `);

  let createdFile = localStorage.getItem("createdFiles") === null ? [] : localStorage.getItem("createdFiles").split(",");
  window.onload = () => {
    console.log(createdFile)
    if (createdFile === [] || createdFile === null) {
      return;
    }
    for (let i = 0; i < createdFile.length; i++) {
      console.log(createdFile[i])
      let newOption = document.createElement('option');
      let optionText = document.createTextNode(createdFile[i]);
      newOption.appendChild(optionText);
      newOption.setAttribute('value', createdFile[i]);
      if (createdFile[i] === currentFile) {
        newOption.selected = true
      } else {newOption.selected = false}
      document.getElementById('files').appendChild(newOption);
    }
  }
  
  const onTabClick = editorName => {
    setOpenedEditor(editorName);
    setActive(editorName)
  };

  const changeSiteTheme = currentTheme => {
    currentTheme === "dark" ? setSiteTheme("light") : setSiteTheme("dark");
  }

  const createNewFile = (fileName) => {
    if (fileName === "") {
      return alert("Please type a name for your File")
    } else if (createdFile.indexOf(fileName) !== -1) {
      return alert("This file name already exists, please use another name or delete that file")
    }
    const fileObject = {
      openedEditor: "html",
      active: "html",
      HTML: "",
      CSS: "",
      JS: ""
    };
    let newOption = document.createElement('option');
    let optionText = document.createTextNode(fileName);
    newOption.appendChild(optionText);
    newOption.setAttribute('value', fileName);
    document.getElementById('files').appendChild(newOption);
    window.localStorage.setItem(fileName, JSON.stringify(fileObject));
    createdFile.push(fileName);
    window.localStorage.setItem("createdFiles", createdFile);
    document.getElementById('fname').value = "";
  }

  const deleteFile = () => {
    let previousFile;
    let selectElement = document.getElementById('files');
    let fileToDelete;
    if (currentFile === "placeHolder") {
      return alert("The default file can't be deleted")
    }
    if (createdFile.indexOf(currentFile) >= 1) {
      previousFile = createdFile[createdFile.indexOf(currentFile) - 1];
      selectElement.value = previousFile;
      selectElement.remove(createdFile.indexOf(currentFile) + 1);
      fileToDelete = createdFile.splice(createdFile.indexOf(currentFile));
      window.localStorage.setItem("createdFiles", createdFile);
      window.localStorage.removeItem(fileToDelete);
      setCurrentFile(previousFile);
    } else {
      previousFile = "placeHolder";
      selectElement.value = previousFile;
      selectElement.remove(createdFile.indexOf(currentFile) + 1);
      fileToDelete = createdFile.splice(createdFile.indexOf(currentFile));
      createdFile = [];
      window.localStorage.removeItem("createdFiles");
      window.localStorage.removeItem(fileToDelete);
      setCurrentFile(previousFile);
    }
  }

  useEffect(() => {
    document.body.setAttribute("class", siteTheme)
    window.localStorage.setItem("Theme", siteTheme)
    const timeOut = setTimeout(() => {
      setSrcDoc(
        `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `
      )
      let fileObject = {
        openedEditor: openedEditor,
        active: active,
        HTML: html,
        CSS: css,
        JS: js
      };
      window.localStorage.setItem(currentFile, JSON.stringify(fileObject));
    }, 250);
    return () => clearTimeout(timeOut)
  }, [html, css, js, siteTheme])

  useEffect(() => {
    let fileObject = {
      openedEditor: openedEditor,
      active: active,
      HTML: html,
      CSS: css,
      JS: js
    };
    window.localStorage.setItem(currentFile, JSON.stringify(fileObject));
  }, [openedEditor, active])

  useEffect(() => {
    window.localStorage.setItem("codeFont", codeFont);
    window.localStorage.setItem("fontFamily", codeFontFamily)
    const codeEditors = document.querySelectorAll('.CodeMirror');
    codeEditors.forEach(codeEditor => {
      codeEditor.style.fontSize = codeFont + "px";
      codeEditor.style.fontFamily = codeFontFamily;
    })
  }, [codeFont, codeFontFamily])
  useEffect(() => {
    window.localStorage.setItem("currentFile", currentFile);
    let fileObjectPrev = window.localStorage.getItem(currentFile);
    let fileObject;
    if (fileObjectPrev === "[object Object]") {return} else {
      fileObject = JSON.parse(fileObjectPrev);
    }
    console.log(fileObject);
    setOpenedEditor(fileObject.openedEditor);
    setActive(fileObject.active);
    setHtml(fileObject.HTML);
    setCss(fileObject.CSS);
    setJs(fileObject.JS);
  }, [currentFile])

  return (
    <div className="App">
      <label className='slider-container'>
        <Slider onclick={() => {changeSiteTheme(siteTheme)}} state={siteTheme}/>
        <h2>{siteTheme}</h2>
      </label>
      <label className='slider-container'>
        <Range value={codeFont} changeState={setCodeFont} />
        <h2>Font size: {codeFont + "px"}</h2>
      </label>
      <div className='code'>
        <h1>Code Editor</h1>
        <div className='button-container'>
          <Button className={`${active === "html" ? "active-" + siteTheme : siteTheme}`} title="HTML" onclick={() => {
            onTabClick("html")}} id="html" />
          <Button className={`${active === "css" ? "active-" + siteTheme: siteTheme}`} title="CSS" onclick={() => {
            onTabClick("css")}}id="css" />
          <Button className={`${active === "js" ? "active-" + siteTheme: siteTheme}`} title="JavaScript" onclick={() => {
            onTabClick("js")}} id="js" />  
        </div>
        <FontDropDown value={codeFontFamily} changeState={setCodeFontFamily} />
        <FileDropDown value={currentFile} changeState={setCurrentFile} />
        <DeleteFile removeFile={deleteFile} />
        <AddFile addFile={createNewFile} />
        <div className='code-container'>
          <div className='editor-container'>
              {
                openedEditor === "html" ? (
                  <Code language="xml"
                  value={html}
                  setEditorState={setHtml}
                  style={{fontSize: codeFont}} />
                ) : openedEditor === "css" ? (
                  <Code language="css"
                  value={css}
                  setEditorState={setCss} />
                ) : (
                  <Code language="javascript"
                  value={js}
                  setEditorState={setJs} />
                )
              }
          </div>
          <div style={{"backgroundColor": "white"}}>
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="1"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App