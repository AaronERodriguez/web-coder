import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import Button from './Components/Button'
import Code from './Components/Code'
import Slider from './Components/Slider'
import Range from './Components/Range'
import FontDropDown from './Components/fontDropDown'

function App() {
  const [openedEditor, setOpenedEditor] = useState(() => {
    const localValue = localStorage.getItem("openedEditor")
    if (localValue == null) {return "html" }
    else {return localValue}
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
    const localValue = localStorage.getItem("active")
    if (localValue == null) {return "html"}
    else {return localValue}
  });
  const [html, setHtml] = useState(() => {
    const localValue = localStorage.getItem("HTML")
    if (localValue == null) {return ""}
    else {return localValue}
  });
  const [css, setCss] = useState(() => {
    const localValue = localStorage.getItem("CSS")
    if (localValue == null) {return ""}
    else {return localValue}
  });
  const [js, setJs] = useState(() => {
    const localValue = localStorage.getItem("JS")
    if (localValue == null) {return ""}
    else {return localValue}
  });
  const [srcDoc, setSrcDoc] = useState(` `);

  const onTabClick = editorName => {
    setOpenedEditor(editorName);
    setActive(editorName)
  };

  const changeSiteTheme = currentTheme => {
    currentTheme === "dark" ? setSiteTheme("light") : setSiteTheme("dark");
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
      window.localStorage.setItem("HTML", html)
      window.localStorage.setItem("CSS", css)
      window.localStorage.setItem("JS", js)
    }, 250);
    return () => clearTimeout(timeOut)
  }, [html, css, js, siteTheme])

  useEffect(() => {
    window.localStorage.setItem("openedEditor", openedEditor)
    window.localStorage.setItem("active", active)
  }, [openedEditor, active])

  useEffect(() => {
    window.localStorage.setItem("codeFont", codeFont);
    window.localStorage.setItem("fontFamily", codeFontFamily)
    console.log(codeFont)
    const codeEditors = document.querySelectorAll('.CodeMirror');
    codeEditors.forEach(codeEditor => {
      codeEditor.style.fontSize = codeFont + "px";
      codeEditor.style.fontFamily = codeFontFamily;
    })
  }, [codeFont, codeFontFamily])

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