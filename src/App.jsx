import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import Button from './Components/Button'
import Code from './Components/Code'
import Slider from './Components/Slider'

function App() {
  const [openedEditor, setOpenedEditor] = useState(() => {
    return localStorage.getItem("openedEditor")
  });
  const [siteTheme, setSiteTheme] = useState(() => {
    return localStorage.getItem("Theme")
  });
  const [active, setActive] = useState(() => {
    return localStorage.getItem("active")
  });
  const [html, setHtml] = useState(() => {
    return localStorage.getItem("HTML")
  });
  const [css, setCss] = useState(() => {
    return localStorage.getItem("CSS")
  });
  const [js, setJs] = useState(() => {
    return localStorage.getItem("JS")
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

  return (
    <div className="App">
      <label className='slider-container'>
        <Slider onclick={() => {changeSiteTheme(siteTheme)}} state={siteTheme}/>
        <h2>{siteTheme[0].toUpperCase() + siteTheme.substring(1)}</h2>
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
        <div className='code-container'>
          <div className='editor-container'>
              {
                openedEditor === "html" ? (
                  <Code language="xml"
                  value={html}
                  setEditorState={setHtml} />
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