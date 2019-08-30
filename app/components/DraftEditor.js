import React, { Component } from 'react';

import styles from './DraftEditor.css';

function getCaretPosition(el){
  var caretOffset = 0, sel;
  if (typeof window.getSelection !== "undefined") {
    var range = window.getSelection().getRangeAt(0);
    var selected = range.toString().length;
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(el);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length - selected;
  }
  return caretOffset;
}

function setCaretPosition(d){
  var sel = window.getSelection(),
    range = document.createRange();
  range.setStart(d.node, d.position);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  d.node.parentElement.focus();
}

function getAllTextnodes(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}
function getCaretData(el, position){
  var node;
  var nodes = getAllTextnodes(el);
  for(var n = 0; n < nodes.length; n++) {
    if (position > nodes[n].nodeValue.length && nodes[n+1]) {
      // remove amount from the position, go to next node
      position -= nodes[n].nodeValue.length;
    } else {
      node = nodes[n];
      break;
    }
  }
  // you'll need the node and the position (offset) to set the caret
  return { node: node, position: position };
}

type Props = {
  variables: [], // Should be a dicitonary with keys name, color, icon
  text: "",
  changeCallback: (newValue) => {},
  placeholder: ""
};

export default class DraftEditor extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    const {text} = props;

    this.segmentsInEditor = [];

    this.state = {
      cursor: 0,
      showParamInsert: false
    };

    this.startInsert = 0;
    this.endInsert = 0;

    this.editableRef = React.createRef();

    document.addEventListener('mousedown', (evt) => {
      if(window.getSelection() != null){
        if(window.getSelection().rangeCount === 0) return;
        this.startInsert = window.getSelection().getRangeAt(0).startOffset;
        this.endInsert = window.getSelection().getRangeAt(0).endOffset;
      }
    });

    document.addEventListener('click', (evt) => {
      const {target} = evt;
      const {cursor} = this.state;
      if(target == null) return;
      if(this.editableRef.current != null){
        // This is the selected element
        if(this.editableRef.current !== document.activeElement) {
          if(typeof document.activeElement.className !== 'undefined' && document.activeElement.className.includes("tokenButton")){
            if(document.activeElement.hasAttribute("title")){
              this.clickOnVariable(document.activeElement.getAttribute("title"));
            }
          }
          this.hideInsertTool();
        }
      }
    }, false);
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

          // We are searching for a variable to match
          // eslint-disable-next-line no-loop-func
          const matchingVariable = variables.filter(item => item.name.trim() === buildingString.trim())[0];
          const thisCompStyle = {
            backgroundColor: matchingVariable.color,
            backgroundImage: `url(${matchingVariable.icon})`
          };

          this.segmentsInEditor.push(
            <span key={i} className={styles.inputTokenWrapper} contentEditable={false} variable="yes">
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
        <div key='end'>
              <div>{buildingString}</div>
        </div>
      );
    }else{
      // We need to add an empty string to the end so we can still edit it
      this.segmentsInEditor.push(
        <div data-contents key='empty'>
          <div data-block>
            <span>
              <br data-text />
            </span>
          </div>
        </div>
      );
    }
  }

  handleCardContentsChange(event){
    // We only want to just track changes in input if the mask isn't present or relevant
    const {changeCallback} = this.props;
    const newValue = this.buildStringFromContent(event.target);
    changeCallback(newValue);
    const cpos = getCaretPosition(event.target);
    this.setState({cursor: cpos});
  }

  buildStringFromContent(element){
    const inner = element.children[0];
    let toReturn = "";
    for(let i = 0; i < inner.children.length; i++){
      const thisChild = inner.children[i];
      if(thisChild.hasAttribute("variable")){
        // This is a variable
        const actText = thisChild.innerText.substr(0, thisChild.innerText.length - 2);
        toReturn += `$#${actText}$#`;
      }else if(thisChild.hasAttribute("function")){
        const actText = thisChild.innerText.substr(0, thisChild.innerText.length - 2);
        toReturn += `$$${actText}$$`;
      }else{
        // This is normal
        toReturn += thisChild.innerText;
      }
    }
    return toReturn;
  }

  getDeepestChild(element){
    if(element.childElementCount > 0){
      return this.getDeepestChild(element.children[0]);
    }

    return element;
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    const {cursor} = this.state;
    if(this.editableRef.current != null){
      // This is the selected element
      if(this.editableRef.current === document.activeElement) {
        const data = getCaretData(document.activeElement, cursor);
        if(typeof data.node !== 'undefined') {
          setCaretPosition(data);
        }
      }
    }
  }

  handleKeyDown(event){
    const {text, changeCallback} = this.props;

    if(event.keyCode === 8){
      if(text.length - 1 <= 0){
        changeCallback("");
        this.setState({cursor: 0});
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  showInsertTool(){
    this.setState({showParamInsert: true});
  }

  hideInsertTool(){
    // First we need to check if we might be over a dropdown button
    this.setState({showParamInsert: false});
  }// TODO fix multiline text and recommendations window. display:block maybe?

  clickOnVariable(varname){
    const {changeCallback, text} = this.props;
    console.log(`Getting a click on a recommended dropdown guy for varname ${  varname} at pos ${this.startInsert} to ${this.endInsert}`);
    const leftText = text.substr(0, this.startInsert);
    const rightText = text.substr(this.endInsert, text.length - this.endInsert);
    changeCallback(`${leftText}$#${varname}$#${rightText}`);
  }

  buildVariableOptions(){
    const {variables} = this.props;
    const unique = [...new Set(variables.map(item => item.groupName))];
    const toReturn = [];

    for(let i = 0; i < unique.length; i+=1){
      const item = variables.find(x => x.groupName === unique[i]);

      toReturn.push(
        <div className={styles.tokenRecommendationSection} key={`tokenSec${i}`}>
          <div style={{color: item.textColor}}>
            {item.groupName}
          </div>
          {variables.map(variable =>
            variable.groupName === unique[i] ?
              <div className={styles.recommendationToken} key={`${variable.groupName}${variable.name}`}>
                <button title={variable.name} style={{backgroundColor: variable.color}} className={styles.tokenButton}>
                  <img alt={variable.name} role="presentation" src={variable.icon} className={styles.tokenImg} />
                  <span className={styles.tokenSpan}>{variable.name}</span>
                </button>
              </div>
            : null
          )}
        </div>
      );
    }
    return toReturn;
  }

  render() {
    const {text, placeholder} = this.props;
    const {showParamInsert} = this.state;

    this.segmentsInEditor = [];

    this.addSpansByCharacter(text, this.props);

    const itemsToReturn = [];
    itemsToReturn.push(
    <div className={styles.inputParameterBox} key="box">
      <div className={styles.root}>
        <div className={styles.editorContainer}>
          <div className={styles.content} contentEditable suppressContentEditableWarning role="textbox"
               spellCheck="false" onInput={(event) => {this.handleCardContentsChange(event)}} ref={this.editableRef}
               onKeyDown={(event) => {this.handleKeyDown(event)}} onFocus={() => {this.showInsertTool()}} onBlur={() => {}}
          >
            {text.length > 0 ?
              <div className={styles.defaultBlock} key="segments">
                {this.segmentsInEditor}
              </div>
              :
              <div data-contents key="emptyDat">
                <div data-block>
                      <span>
                        <br data-text />
                      </span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
    );
    if(showParamInsert){
      itemsToReturn.push(
        <div className={styles.tokenRecommendation} key="recs">
          <div>Insert parameters from previous steps</div>
          {this.buildVariableOptions()}
        </div>
      );
    }

    return itemsToReturn;
  }
}
