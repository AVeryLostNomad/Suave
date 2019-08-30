import React, { Component } from 'react';
import { FontClassNames } from '@uifabric/styling';

import {
  Button,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react/lib/index'

import FlowCard from './flow_pieces/FlowCard'
import AutosuggestSearch from './AutosuggestSearch';


import styles from './FlowDesigner.css';

const arrowDownStyle = "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEzIDMwIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDpub25lO3N0cm9rZTojNUI1QjVDO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwO30NCgkuc3Qxe2ZpbGw6IzVCNUI1Qzt9PC9zdHlsZT4NCiA8cmVjdCB4PSI5IiB3aWR0aD0iMiIgaGVpZ2h0PSIzNy45NzQiIGZpbGw9IiM1MTUxNTEiIHN0cm9rZS13aWR0aD0iNC41MDYyIi8+DQogPHBvbHlnb24gdHJhbnNmb3JtPSJtYXRyaXgoMS4xNzg1IDAgMCAxLjE3ODUgLS42MDY5MiAyMy41NDQpIiBwb2ludHM9IjEuOTI4IDQuMDY1IDguOTk5IDExLjEzNiAxNi4wNzIgNC4wNjUgMTcuNDg2IDUuNDc5IDguOTk5IDEzLjk2NCAwLjUxNSA1LjQ3OSIgZmlsbD0iIzUxNTE1MSIvPg0KPC9zdmc+DQo=\") center center no-repeat";

type Props = {
  plugins: {},
  designSoFar: {}, // If we need to load from a file
};

export default class FlowDesigner extends Component<Props> {
  props: Props;

  static getDefaultFlow(){
    return {
      0: {
        collapsed: true,
        error: {},
        highlighted: false,
        containsChildren: {},  // Things that are actually within the card. TODO implement these
        cardCode: 'manual_trigger',
        cardInfo: {
          collapsedCardColor: "rgba(0, 119, 255, 0.15)",
          dotsColor: "#0078d7",
          cardIconSVG: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGRlZnMgaWQ9ImRlZnM5Ij48c3R5bGUgaWQ9InN0eWxlMiI+LmNscy0xe2lzb2xhdGlvbjppc29sYXRlO30uY2xzLTJ7ZmlsbDojNzQyNzc0O30uIGNscy0ze29wYWNpdHk6MDttaXgtYmxlbmQtbW9kZTptdWx0aXBseTtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy00e2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjE2IiB4Mj0iMTYiIHkyPSIzMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzIzMWYyMCIgc3RvcC1vcGFjaXR5PSIwIiBpZD0ic3RvcDQiLz48c3RvcCBvZmZzZXQ9IjEiIGlkPSJzdG9wNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZSBpZD0idGl0bGUxMSI+ZGVzaWduZXIgaWNvbnM8L3RpdGxlPjxwYXRoIGlkPSJSZWN0YW5nbGUtcGF0aCIgZmlsbD0iIzA3ZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwaDMydjMyaC0zMnoiLz48cGF0aCBkPSJNMTMuNzI5IDEzLjkzNHYtMy40MTljMC0xLjI2MiAxLjAyNC0yLjI4NiAyLjI4Ni0yLjI4NnMyLjI4NiAxLjAyNCAyLjI4NiAyLjI4NnYzLjQxOWMxLjEwNi0uNzQxIDEuODI5LTEuOTkzIDEuODI5LTMuNDE5IDAtMi4yNzctMS44MzgtNC4xMTQtNC4xMTQtNC4xMTQtMi4yNzcgMC00LjExNCAxLjgzOC00LjExNCA0LjExNCAwIDEuNDI2LjcyMiAyLjY3OSAxLjgyOSAzLjQxOXptOC45OTcgNC4yMzNsLTQuMTUxLTIuMDY2Yy0uMTU1LS4wNjQtLjMyLS4xMDEtLjQ5NC0uMTAxaC0uNjk1di01LjQ4NmMwLS43NTktLjYxMy0xLjM3MS0xLjM3MS0xLjM3MS0uNzU5IDAtMS4zNzEuNjEzLTEuMzcxIDEuMzcxdjkuODE5bC0zLjEzNi0uNjU4LS4yMTktLjAyN2MtLjI4MyAwLS41MzkuMTE5LS43MjIuMzAybC0uNzIyLjczMSA0LjUxNyA0LjUxN2MuMjQ3LjI0Ny41OTQuNDAyLjk2OS40MDJoNi4yMDhjLjY4NiAwIDEuMjE2LS41MDMgMS4zMTctMS4xN2wuNjg2LTQuODE4LjAxOC0uMTgzYzAtLjU2Ny0uMzQ3LTEuMDYxLS44MzItMS4yNjJ6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==",
          cardTitle: "Manually trigger a flow",
          borderColorCode: "rgb(0, 119, 255)"
        },
        requirements: [
          'board_name:str'
        ],
        generates: [
          'exists:bool'
        ]
      },
      1: {
        collapsed: true,
        error: {},
        highlighted: false,
        containsChildren: {},  // Things that are actually within the card. TODO implement these
        cardCode: 'manual_trigger',
        cardInfo: {
          collapsedCardColor: "rgba(0, 119, 255, 0.15)",
          dotsColor: "#0078d7",
          cardIconSVG: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGRlZnMgaWQ9ImRlZnM5Ij48c3R5bGUgaWQ9InN0eWxlMiI+LmNscy0xe2lzb2xhdGlvbjppc29sYXRlO30uY2xzLTJ7ZmlsbDojNzQyNzc0O30uIGNscy0ze29wYWNpdHk6MDttaXgtYmxlbmQtbW9kZTptdWx0aXBseTtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy00e2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjE2IiB4Mj0iMTYiIHkyPSIzMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzIzMWYyMCIgc3RvcC1vcGFjaXR5PSIwIiBpZD0ic3RvcDQiLz48c3RvcCBvZmZzZXQ9IjEiIGlkPSJzdG9wNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZSBpZD0idGl0bGUxMSI+ZGVzaWduZXIgaWNvbnM8L3RpdGxlPjxwYXRoIGlkPSJSZWN0YW5nbGUtcGF0aCIgZmlsbD0iIzA3ZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwaDMydjMyaC0zMnoiLz48cGF0aCBkPSJNMTMuNzI5IDEzLjkzNHYtMy40MTljMC0xLjI2MiAxLjAyNC0yLjI4NiAyLjI4Ni0yLjI4NnMyLjI4NiAxLjAyNCAyLjI4NiAyLjI4NnYzLjQxOWMxLjEwNi0uNzQxIDEuODI5LTEuOTkzIDEuODI5LTMuNDE5IDAtMi4yNzctMS44MzgtNC4xMTQtNC4xMTQtNC4xMTQtMi4yNzcgMC00LjExNCAxLjgzOC00LjExNCA0LjExNCAwIDEuNDI2LjcyMiAyLjY3OSAxLjgyOSAzLjQxOXptOC45OTcgNC4yMzNsLTQuMTUxLTIuMDY2Yy0uMTU1LS4wNjQtLjMyLS4xMDEtLjQ5NC0uMTAxaC0uNjk1di01LjQ4NmMwLS43NTktLjYxMy0xLjM3MS0xLjM3MS0xLjM3MS0uNzU5IDAtMS4zNzEuNjEzLTEuMzcxIDEuMzcxdjkuODE5bC0zLjEzNi0uNjU4LS4yMTktLjAyN2MtLjI4MyAwLS41MzkuMTE5LS43MjIuMzAybC0uNzIyLjczMSA0LjUxNyA0LjUxN2MuMjQ3LjI0Ny41OTQuNDAyLjk2OS40MDJoNi4yMDhjLjY4NiAwIDEuMjE2LS41MDMgMS4zMTctMS4xN2wuNjg2LTQuODE4LjAxOC0uMTgzYzAtLjU2Ny0uMzQ3LTEuMDYxLS44MzItMS4yNjJ6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==",
          cardTitle: "Manually trigger a flow",
          borderColorCode: "rgb(0, 119, 255)"
        },
        requirements: [
          'listname:str',
          'item:str|none'
        ]
      }
    }
  }

  constructor(props) {
    super(props);

    const {designSoFar, plugins} = props;

    let json = {};
    if(0 in designSoFar){
      // We are loading a flow we were already working on
      json = designSoFar;
    }else{
      json = FlowDesigner.getDefaultFlow();
    }
    this.state = {
      saveAllowed: false,
      flowJson: json,
      showAddStateDialog: false,
    };
    this.pickerRef = React.createRef();
  }

  clickOnElement(id){
    const {flowJson} = this.state;

    const newFlowJson = Object.assign({}, flowJson);

    newFlowJson[id].collapsed = !newFlowJson[id].collapsed;

    if(!newFlowJson[id].collapsed){
      // We've just opened it. Let's highlight that one.
      newFlowJson[id].highlighted = true;
      Object.keys(newFlowJson).forEach((key) => {
        if(key.toString() !== id.toString()){
          newFlowJson[key].highlighted = false;
        }
      });
    }else{
      Object.keys(newFlowJson).forEach((key) => {
        newFlowJson[key].highlighted = false;
      });
    }

    this.setState({
      flowJson: newFlowJson
    });
  }

  addStateForCard(cardID, variableName, newValue){
    console.log('Getting request to add state');
    const {flowJson} = this.state;
    const oldJson = Object.assign({}, flowJson);

    if("states" in oldJson[cardID]){
      const oldStates = oldJson[cardID].states;
      if(variableName in oldStates){
        delete oldStates[variableName];
      }
      if(newValue !== "") {
        oldStates[variableName] = newValue;
        oldJson[cardID].states = oldStates;
      }
    }else{
      if(newValue !== "") {
        oldJson[cardID].states = {};
        oldJson[cardID].states[variableName] = newValue;
      }
    }
    console.log(oldJson);

    this.setState({
      flowJson: oldJson
    });
  }

  getDefaultVariables(){
    return [
      {
        name: "System time now",
        groupName: "Built-in",
        textColor: "rgb(31, 133, 255)",
        color: "#DEEDFF",
        icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxwYXRoIGQ9Im0wIDBoMzJ2MzJoLTMyeiIgZmlsbD0iIzFGODVGRiIvPg0KIDxnIGZpbGw9IiNmZmYiPg0KICA8cGF0aCBkPSJNMTYuMDE1IDEwLjEzOGMtMy44NC0uMDA3LTYuOTUzIDMuMTA2LTYuOTQ2IDYuOTMxLjAwNyAzLjgzMyAzLjEwNiA2LjkzMSA2LjkyNCA2LjkzMSAzLjgxOCAwIDYuOTMxLTMuMTA2IDYuOTM4LTYuOTI0LjAwNy0zLjgxMS0zLjEwNi02LjkzOC02LjkxNy02LjkzOHptLS4wMjkgMTIuMzI4Yy0zLjA3Ni0uMDE1LTUuMzk2LTIuNDk1LTUuMzgyLTUuNDE4LjAxNS0zLjA5OCAyLjU5Ni01LjQ2MiA1LjYwNy01LjM3NSAyLjgxNS4wODcgNS4yMDcgMi41MzEgNS4xNzggNS4zOTYtLjAwNyAyLjk4OS0yLjM5MyA1LjQxMS01LjQwNCA1LjM5NnoiLz4NCiAgPHBhdGggZD0iTTIxLjk0OSAxMi4xMzhjLjEzOC0uMzQ5LjI2Mi0uNjkxLjQxNS0xLjAxOC4yNC0uNTAyLjEwOS0uOTM4LS4yNjItMS4yODctLjg4LS44MzYtMS45MTMtMS40MzMtMy4wODQtMS43NjctLjM2NC0uMTAyLS43NjQtLjExNi0xLjA0LjE5Ni0uMzEzLjM0OS0uNTc1Ljc0OS0uODczIDEuMTQ5IDEuOTQyLjM1NiAzLjUyNyAxLjI4IDQuODQ0IDIuNzI3eiIvPg0KICA8cGF0aCBkPSJNMTAuMDI5IDEyLjExNmMxLjMwOS0xLjQ2MiAyLjg5NS0yLjM2NCA0LjgxNS0yLjcyNy0uMjMzLS4zMjctLjQ1OC0uNjE4LS42NTUtLjkxNi0uMjY5LS40MjItLjY1NS0uNTMxLTEuMTEzLS40NDQtMS4wNC4yMDQtMS45MTMuNzU2LTIuNzU2IDEuMzY3LS4xODIuMTMxLS4zNDkuMjk4LS41MDIuNDY1LS4yNjIuMjg0LS40MDcuNjE4LS4yOTEuOTk2LjEzOC40MTUuMzI3LjgyMi41MDIgMS4yNTh6Ii8+DQogIDxwYXRoIGQ9Ik0xNi41MTYgMTIuOTIzYy0uNjA0LS4zMjctMS4yNjUuMDUxLTEuMjY1LjczNS4wMDcuOTY3LjAxNSAxLjkzNS4wMzYgMi45MDkuMDA3LjE4OS0uMDQ0LjMyNy0uMTk2LjQ1OC0uMzg1LjMyLS43NzEuNjQ3LTEuMTM1Ljk4OS0uMzEzLjI5MS0uMzA1LjczNS0uMDE1IDEuMDU1LjI4NC4zMTMuNzQyLjM2NCAxLjA1NS4wOTUuNTM4LS40NjUgMS4wNjktLjkzMSAxLjU4NS0xLjQxOC4xMDktLjEwMi4yMTEtLjI5MS4yMTEtLjQzNi4wMjItLjY3Ni4wMDctMS4zNi4wMDctMi4wMzZoLjAzNnYtMS43MzFjLjAwNy0uMjY5LS4wNzMtLjQ4LS4zMi0uNjE4eiIvPg0KIDwvZz4NCjwvc3ZnPg0K"
      }
    ];
  }

  renderCardForID(idNum){
    // Renders the card at ID
    const {flowJson} = this.state;

    const {cardInfo} = flowJson[idNum];

    const variableArray = 'variables' in flowJson ? flowJson.variables : [];
    Array.prototype.push.apply(variableArray, this.getDefaultVariables());

    return (<FlowCard collapsedCardColor={cardInfo.collapsedCardColor}
                      dotsColor={cardInfo.dotsColor}
                      cardIconSVG={cardInfo.cardIconSVG}
                      cardTitle={cardInfo.cardTitle}
                      borderColorCode={cardInfo.borderColorCode}
                      id={idNum}
                      headerClickCallback={(id) => {this.clickOnElement(id)}}
                      collapsed={flowJson[idNum].collapsed}
                      shouldHighlight={flowJson[idNum].highlighted}
                      inputs={"requirements" in flowJson[idNum] ? flowJson[idNum].requirements : []}
                      outputs={"generates" in flowJson[idNum] ? flowJson[idNum].generates : []}
                      variables={variableArray}
                      states={"states" in flowJson[idNum] ? flowJson[idNum].states : {}}
                      stateChangeCallback={(varName, newValue) => {this.addStateForCard(idNum, varName, newValue)}}
    />);
  }

  renderComposableFlow(depth = 0){
    const {flowJson} = this.state;

    // TODO handle multiple guys here
    if(depth in flowJson){
      // We have this layer. Do we have the next layer?
      if(depth + 1 in flowJson){
        // Render this layer and then the children top layers up to the next recursive call
        return (
          <div>
            {this.renderCardForID(depth)}
            <div className={styles.cardChildren}>
              <div className={styles.card_container}>
                <div className={styles.card_flex}>
                {/* Arrow down, then the next card setup */}
                  <div className={styles.connectorArrowDown}>
                    <div className={styles.arrowRow}>
                      <div style={{background: arrowDownStyle}} className={styles.arrowDown} />
                    </div>
                  </div>
                  <div className={styles.card_view_div}>
                    {this.renderComposableFlow(depth + 1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return this.renderCardForID(depth);
    }
  }

  showAddStep() {
    this.setState({showAddStateDialog: true});
  }

  closeAddStep(){
    this.setState({showAddStateDialog: false});
  }

  onAddStep(name: string) {
    console.log(`Getting request to add ${  name}`);
  }

  render() {
    const {saveAllowed, showAddStateDialog} = this.state;
    const {plugins} = this.props;

    return (
      <div className={`${FontClassNames.medium} ${styles.designer_container}`}>
        <div className={styles.designer_canvas}>
          <div className={styles.designer_canvas_parallel}>
            <div className={styles.card_container}>
              <div className={styles.card_flex}>
                <div className={styles.card_view_div}>
                  {this.renderComposableFlow()}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actionpalette}>
            <div className={styles.buttonsrow}>
              <Button onClick={() => {this.showAddStep()}}>+ New Step</Button>
              <Button disabled={!saveAllowed}>Save</Button>
            </div>
          </div>
        </div>

        <Dialog
          hidden={!showAddStateDialog}
          onDismiss={() => {this.closeAddStep()}}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Add a step',
            subText: 'Search for what you want this step to do. Suggestions from your installed plugins will be shown.'
          }}
          modalProps={{
            isBlocking: false,
            styles: { main: { maxWidth: 600 } }
          }}
         >

          <AutosuggestSearch placeholder="Add an action"
                             suggestionsHeader="Suggested Plugin"
                             noneFoundMessage="No matching plugins found"
                             plugins={plugins}
                             selectedCallback={(pluginName) => {this.onAddStep(pluginName)}}
          />

          <DialogFooter>
            <PrimaryButton onClick={() => {this.closeAddStep()}} text="Add" />
            <DefaultButton onClick={() => {this.closeAddStep()}} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
