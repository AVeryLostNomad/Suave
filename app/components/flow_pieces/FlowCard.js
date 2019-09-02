import React, { Component } from 'react';
import {
  IconButton,
  Label,
  TextField
} from 'office-ui-fabric-react/lib/index'

import DraftEditor from '../DraftEditor'

import styles from './FlowCard.css';

// Base 64 for various types of icon
const textBase64 = "url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSI0NHB4IiBoZWlnaHQ9IjQ0cHgiIHZpZXdCb3g9IjAgMCA0NCA0NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8dGl0bGU+VGV4dF9pY29uPC90aXRsZT4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IkZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9IkFkZC1maWxlLS8tRW51bS0tKG1ha2VyKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyLjAwMDAwMCwgLTM1My4wMDAwMDApIj4NCiAgICAgICAgICAgIDxnIGlkPSIyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDAwMDAsIDI2MC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iVGV4dF9pY29uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4wMDAwMDAsIDkzLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0idGV4dCI+DQogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTU1NC1Db3B5IiBmaWxsPSIjOUY2Q0Q5IiBjeD0iMjIiIGN5PSIyMiIgcj0iMjIiPjwvY2lyY2xlPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI1LjIwMDY2MTMsMTMuNzUgTDIwLjMyNTUwNjMsMjguMzQ1NjI5MyBMMTcuNTg4MjkzLDIwLjE0NDIxODggTDE2LjI0OTk0ODMsMjAuMTQ0MjE4OCBMMTIuODMzMzMzMywzMC4zNzI3NTI2IEwxNC4xODE5MDc0LDMwLjM3Mjc1MjYgTDE1LjAzMTc5ODksMjcuODE2MjU4NSBMMTguODA2NDQyNCwyNy44MTYyNTg1IEwxOS42NTYzMzQsMzAuMzcyNzUyNiBMMjEuMDA0OTA4LDMwLjM3Mjc1MjYgTDIyLjcwMzgzODYsMjUuMjU4MDU5NSBMMjkuMDM2NjgxMSwyNS4yNTgwNTk1IEwzMC43MzQ3NTkyLDMwLjM3Mjc1MjYgTDMyLjA4MzMzMzMsMzAuMzcyNzUyNiBMMjYuNTM5ODU4NCwxMy43NSBMMjUuMjAwNjYxMywxMy43NSBaIE0yNS44Njk4MzM2LDE1Ljc3ODgyODMgTDI4LjYwNzA0NjksMjMuOTgwMjM4NyBMMjMuMTMyNjIwNCwyMy45ODAyMzg3IEwyNS44Njk4MzM2LDE1Ljc3ODgyODMgWiBNMTYuOTE5MTIwNywyMi4xNzEzNDIyIEwxOC4zNzc2NjA3LDI2LjUzNjczMjggTDE1LjQ2MDU4MDcsMjYuNTM2NzMyOCBMMTYuOTE5MTIwNywyMi4xNzEzNDIyIFoiIGlkPSJQYWdlLTEiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg==\") center center / contain no-repeat";

type Props = {
  id: 0,
  collapsedCardColor: "", // rgba(0, 119, 255, 0.15),
  dotsColor: "", // #0078d7,
  cardTitle: "", // Manually trigger a flow
  cardIconSVG: "", // Icon of svg data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGRlZnMgaWQ9ImRlZnM5Ij48c3R5bGUgaWQ9InN0eWxlMiI+LmNscy0xe2lzb2xhdGlvbjppc29sYXRlO30uY2xzLTJ7ZmlsbDojNzQyNzc0O30uIGNscy0ze29wYWNpdHk6MDttaXgtYmxlbmQtbW9kZTptdWx0aXBseTtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy00e2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjE2IiB4Mj0iMTYiIHkyPSIzMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzIzMWYyMCIgc3RvcC1vcGFjaXR5PSIwIiBpZD0ic3RvcDQiLz48c3RvcCBvZmZzZXQ9IjEiIGlkPSJzdG9wNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZSBpZD0idGl0bGUxMSI+ZGVzaWduZXIgaWNvbnM8L3RpdGxlPjxwYXRoIGlkPSJSZWN0YW5nbGUtcGF0aCIgZmlsbD0iIzA3ZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwaDMydjMyaC0zMnoiLz48cGF0aCBkPSJNMTMuNzI5IDEzLjkzNHYtMy40MTljMC0xLjI2MiAxLjAyNC0yLjI4NiAyLjI4Ni0yLjI4NnMyLjI4NiAxLjAyNCAyLjI4NiAyLjI4NnYzLjQxOWMxLjEwNi0uNzQxIDEuODI5LTEuOTkzIDEuODI5LTMuNDE5IDAtMi4yNzctMS44MzgtNC4xMTQtNC4xMTQtNC4xMTQtMi4yNzcgMC00LjExNCAxLjgzOC00LjExNCA0LjExNCAwIDEuNDI2LjcyMiAyLjY3OSAxLjgyOSAzLjQxOXptOC45OTcgNC4yMzNsLTQuMTUxLTIuMDY2Yy0uMTU1LS4wNjQtLjMyLS4xMDEtLjQ5NC0uMTAxaC0uNjk1di01LjQ4NmMwLS43NTktLjYxMy0xLjM3MS0xLjM3MS0xLjM3MS0uNzU5IDAtMS4zNzEuNjEzLTEuMzcxIDEuMzcxdjkuODE5bC0zLjEzNi0uNjU4LS4yMTktLjAyN2MtLjI4MyAwLS41MzkuMTE5LS43MjIuMzAybC0uNzIyLjczMSA0LjUxNyA0LjUxN2MuMjQ3LjI0Ny41OTQuNDAyLjk2OS40MDJoNi4yMDhjLjY4NiAwIDEuMjE2LS41MDMgMS4zMTctMS4xN2wuNjg2LTQuODE4LjAxOC0uMTgzYzAtLjU2Ny0uMzQ3LTEuMDYxLS44MzItMS4yNjJ6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==
  borderColorCode: "", // rgb(0, 119, 255)
  inputs: [],  // Describes the inputs we should show for this element
  outputs: [], // Describes the outputs we should show for this element
  headerClickCallback: (id) => {},  // This will be a function passed in from the parent editor component. It will make the other components stop highlighting.
  collapsed: true,
  shouldHighlight: false,
  variables: [],  // A list of variable objects going around in the state
  states: {},  // A list of actual states of this card, deviating from the default (i.e. unfilled states).
  stateChangeCallback: (varName, newValue) => {}
};

export default class FlowCard extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      showCallout: false, // Whether or not to show the context menu
    };

    console.log('Initializing with states');
    console.log(props.states);

    this.contextButton = React.createRef();
  }

  renderContextDots(){
    const {dotsColor} = this.props;

    const dotsStyle = {
      color: dotsColor,
      backgroundColor: dotsColor,
    };

    return (
      <div className={styles.card_context}>
        <IconButton
          styles={dotsStyle}
          className={styles.card_context_icon_btn}
          iconProps={{iconName: 'More'}}
          title="More"
          ariaLabel="MoreContext"
          menuProps={{
            shouldFocusOnMount: true,
            items: [
              {
                key: 'rename',
                name: 'Rename',
                onClick: () => console.log('Rename done'),
                iconProps: {
                  iconName: 'PencilReply',
                  // style: {
                  //   color: 'salmon'
                  // }
                },
              },
              {
                key: 'comment',
                name: 'Add a comment',
                onClick: () => console.log('Comment made'),
                iconProps: {
                  iconName: 'Comment'
                }
              },
              {
                key: 'settings',
                name: 'Settings',
                onClick: () => console.log('Settings made'),
                iconProps: {
                  iconName: 'Settings'
                }
              },
              {
                key: 'delete',
                name: 'Delete',
                onClick: () => console.log('Delete made'),
                iconProps: {
                  iconName: 'Delete'
                }
              }
            ]
          }}
          />
      </div>
    );
  }

  headerClick(){
    const { headerClickCallback, id } = this.props;

    headerClickCallback(id);
  }

  newValueReceivedForVariable(newValue, name){
    console.log("Elevating change to FlowDesigner with name " + name + " and value " + newValue);
    const {stateChangeCallback} = this.props;
    stateChangeCallback(name, newValue.replace(/\r?\n|\r/, ""));
    this.forceUpdate();
  }

  renderCollapsedCard(){
    const {collapsedCardColor, cardTitle, cardIconSVG} = this.props;

    const cardHeaderStyle = {
      backgroundColor: collapsedCardColor
    };

    return (
      <div className={styles.card}>
        <div className={styles.card_header} draggable="false" style={cardHeaderStyle} onClick={() => {this.headerClick()}}>
          {/* Option menu */}
          <div className={styles.card_closed_content}>
            <div className={styles.card_header_logo}>
              <img alt="" src={cardIconSVG}
                draggable="false"
                className={styles.card_header_icon}
              />
            </div>
            <a aria-expanded="false"
               tabIndex="-1"
               href="javascript:void(0)"
               draggable="false"
               role="button"
               className={styles.card_header_title_view}
            >
              <div className={styles.card_title}>
                {cardTitle}
              </div>
            </a>
          </div>
          {this.renderContextDots(collapsedCardColor)}
        </div>
      </div>
    );
  }

  renderOpenedCard(){
    const {collapsedCardColor, cardTitle, cardIconSVG, borderColorCode,
      shouldHighlight, inputs, outputs, variables, states} = this.props;

    const cardHeaderStyle = {
    };
    if(shouldHighlight){
      cardHeaderStyle.borderColor = borderColorCode;
      cardHeaderStyle.outlineColor = borderColorCode;
    }

    const openHeaderStyle = {
      backgroundColor: collapsedCardColor
    };

    const shadowElement = {};
    if(shouldHighlight){
      shadowElement.boxShadow = "0 0 10px #acacac";
    }

    const inputsToShow = [];
    for(let i = 0; i < inputs.length; i+=1){
      const parameter = inputs[i];

      const parts = parameter.split(':');
      const name = parts[0];
      const allowedTypes = parts[1].toLowerCase().split("|");

      let typeString = "";
      for(let j = 0; j < allowedTypes.length; j+=1){
        let toAdd = allowedTypes[j];
        if(toAdd === "str"){
          toAdd = "String";
        }
        if(toAdd === "int"){
          toAdd = "Integer";
        }
        if(toAdd === "float"){
          toAdd = "Float";
        }
        if(toAdd === "bool"){
          toAdd = "Boolean";
        }
        if(toAdd === "none"){
          toAdd = "None";
        }

        if(j !== allowedTypes.length - 1){
          if(allowedTypes.length > 2) {
            toAdd += ", ";
          }else{
            toAdd += " ";
          }
        }else if(allowedTypes.length > 1) {
          toAdd = `or ${toAdd}`;
        }

        typeString += toAdd;
      }
      inputsToShow.push(
        <div className={styles.input_parameter_item} key={i}>
          <div className={styles.parameter}>
            <div className={styles.parameter_label}>
              <Label
                required={!allowedTypes.includes("none")}
                className={styles.labelStyles}
                >
                {name}
              </Label>
            </div>
            <DraftEditor
              placeholder={typeString}
              multiLine
              autoAdjustHeight
              className={styles.textboxStyles}
              suppressContentEditableWarning
              text={name in states ? states[name] : ""}
              variables={variables}
              changeCallback={(newValue) => {this.newValueReceivedForVariable(newValue, name)}}
              uniqueID={`${name}vars`}
            />
          </div>
        </div>
      );
    }

    const outputsToShow = [];
    for(let i = 0; i < outputs.length; i+=1){
      const parameter = outputs[i];

      const parts = parameter.split(':');
      const name = parts[0];
      const typesBars = parts[1].toLowerCase();
      const allowedTypes = parts[1].toLowerCase().split("|");

      let typeString = "";
      for(let j = 0; j < allowedTypes.length; j+=1){
        let toAdd = allowedTypes[j];
        if(toAdd === "str"){
          toAdd = "String";
        }
        if(toAdd === "int"){
          toAdd = "Integer";
        }
        if(toAdd === "float"){
          toAdd = "Float";
        }
        if(toAdd === "bool"){
          toAdd = "Boolean";
        }
        if(toAdd === "none"){
          toAdd = "None";
        }

        if(j !== allowedTypes.length - 1){
          if(allowedTypes.length > 2) {
            toAdd += ", ";
          }else{
            toAdd += " ";
          }
        }else if(allowedTypes.length > 1) {
          toAdd = `or ${toAdd}`;
        }

        typeString += toAdd;
      }

      outputsToShow.push(
        <div className={styles.input_parameter_item} key={i}>
          <div className={styles.parameter}>
            <div className={styles.parameter_label}>
              <Label
                required={!allowedTypes.includes("none")}
                className={styles.labelStyles}
              >
                {name}
              </Label>
            </div>
            <DraftEditor
              placeholder={typeString}
              multiLine
              autoAdjustHeight
              className={styles.textboxStyles}
              suppressContentEditableWarning
              text={name in states ? states[name] : ""}
              variables={variables}
              changeCallback={(newValue) => {this.newValueReceivedForVariable(newValue, name)}}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`${styles.card} ${shouldHighlight ? styles.thick_border : ''}`} style={cardHeaderStyle}>
        <div className={styles.card_selected} draggable="false" style={shadowElement}>
          <div className={styles.open_card_header} draggable="false" style={openHeaderStyle} onClick={() => {this.headerClick()}}>
            {/* Option menu */}
            <div className={styles.card_closed_content}>
              <div className={styles.card_header_logo}>
                <img alt="" src={cardIconSVG}
                     draggable="false"
                     className={styles.card_header_icon}
                />
              </div>
              <a aria-expanded="false"
                 tabIndex="-1"
                 href="javascript:void(0)"
                 draggable="false"
                 role="button"
                 className={styles.card_header_title_view}
              >
                <div className={styles.card_title}>
                  {cardTitle}
                </div>
              </a>
            </div>
            {this.renderContextDots(collapsedCardColor)}
          </div>

          <div className={styles.open_card_body}>
            {/* This is where the card's body should be shown. Let's go through and do outputs and inputs */}
            {inputs.length > 0 || outputs.length > 0 ?
              <div className={styles.parameter_group}>
                <div className={styles.parameters_body}>
                  <div className={styles.parameters_list}>
                    {inputs.length > 0 ? inputsToShow : null}
                    {inputs.length > 0 && outputs.length > 0 ?
                    <div className={styles.dynamicAddedParamBottomDivider} />
                    : null}
                    {outputs.length > 0 ? outputsToShow : null}
                  </div>
                </div>
              </div>
            : null
            }
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { collapsed } = this.props;

    return (
      <div className={styles.card_caption}>
          {collapsed ? this.renderCollapsedCard() : this.renderOpenedCard()}
      </div>
    );
  }
}
