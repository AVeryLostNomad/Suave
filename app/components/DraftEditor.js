import React, { Component } from 'react';

import styles from './DraftEditor.css';

type Props = {
  variables: [], // Should be a dicitonary with keys name, color, icon
  text: "",
  changeCallback: (newValue) => {}
};

export default class DraftEditor extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    const {text} = props;

    this.segmentsInEditor = [];

    this.addSpansByCharacter(text.trim(), props);
  }

  addSpansByCharacter(string: string, props){
    const {variables} = props;

    let buildingString = "";
    let inVarMode = false;
    let inFuncMode = false;

    for(let i = 0; i < string.length; i+=1){
      const char = string.charAt(i);

      let doAdd = true;
      if(char === '$' && string.charAt(i + 1) === '$'){
        // TODO We either need to start or end a function

        doAdd = false;
        i += 1;
      }else if(char === '$' && string.charAt(i + 1) === '#'){
        // TODO we need to start or end a variable

        if(inVarMode){
          const thisCompStyle = {};
          console.log(buildingString);

          // We are searching for a variable to match
          // eslint-disable-next-line no-loop-func
          const matchingVariable = variables.filter(item => item.name.trim() === buildingString.trim())[0];
          thisCompStyle.backgroundColor = matchingVariable.color;
          thisCompStyle.backgroundImage = matchingVariable.icon;

          this.segmentsInEditor.push(
            <span key={i} className={styles.inputTokenWrapper} contentEditable={false}>
            <span className={styles.inputToken} style={thisCompStyle}>
              {buildingString}
              <button title="Delete" aria-label="Delete" className={styles.expressionDelete}>×</button>
            </span>
          </span>
          );
          buildingString = "";
          inVarMode = false;
        }else{
          inVarMode = true;

          this.segmentsInEditor.push(
            <span key={i}>
              <span>{buildingString}</span>
            </span>
          );
          buildingString = "";
        }

        doAdd = false;
        i += 1;
      }

      // Just add to what we're currently doing
      if(doAdd) buildingString += char;
    }

    if(buildingString.length > 0){
      this.segmentsInEditor.push(
        <span key='end'>
              <span>{buildingString}</span>
        </span>
      );
    }else{
      // We need to add an empty string to the end so we can still edit it
      this.segmentsInEditor.push(
        <span key='end'>
            <span />
        </span>
      );
    }
  }

  handleCardContentsChange(event){
    // We only want to just track changes in input if the mask isn't present or relevant
    const {changeCallback} = this.props;
    const newValue = event.target.innerText;
    changeCallback(newValue);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.editorContainer}>
          <div className={styles.content} contentEditable suppressContentEditableWarning role="textbox"
               spellCheck="false" onInput={(event) => {this.handleCardContentsChange(event)}}
          >
            <div className={styles.defaultBlock}>
              {this.segmentsInEditor}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
