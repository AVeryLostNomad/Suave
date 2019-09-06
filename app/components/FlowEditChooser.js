import React, { Component } from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { getFiles, homedir } from '../utils/fsutils';
import styles from './FlowEditChooser.css';

const fs = require('fs');
const path = require("path");

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px'
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden'
      }
    }
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px'
  },
  controlWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  exampleToggle: {
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '30px'
  },
  selectionDetails: {
    marginBottom: '20px'
  }
});

export interface IDocument {
  key: string,
  name: string,
  value: string,
  iconName: string,
  fileType: string,
  modifiedBy: string,
  dateModified: string,
  dateModifiedValue: number,
  fileSize: string,
  fileSizeRaw: number
}

export default class FlowEditChooser extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    const columns: IColumn[] = [
      {
        key: 'column1',
        name: 'File Type',
        className: classNames.fileIconCell,
        iconClassName: classNames.fileIconHeaderIcon,
        ariaLabel: 'Column operations for File type, Press to sort on File type',
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'name',
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />;
        }
      },
      {
        key: 'column2',
        name: 'Name',
        fieldName: 'name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this.onColumnClick,
        data: 'string',
        isPadded: true
      },
      {
        key: 'column3',
        name: 'Date Modified',
        fieldName: 'dateModifiedValue',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this.onColumnClick,
        data: 'number',
        onRender: (item: IDocument) => {
          return <span>{item.dateModified}</span>;
        },
        isPadded: true
      },
      {
        key: 'column4',
        name: 'Modified By',
        fieldName: 'modifiedBy',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        onColumnClick: this.onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true
      },
      {
        key: 'column5',
        name: 'File Size',
        fieldName: 'fileSizeRaw',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'number',
        onColumnClick: this.onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.fileSize}</span>;
        }
      }
    ];

    this.selection = new Selection({
      onSelectionChanged: () => {

      }
    });

    this.state = {
      discoveredFlows: [],
      columns: columns
    };
  }

  componentDidMount(): void {
    this.findAllFlowsOnPath();
  }

  findAllFlowsOnPath() {
    const folder = `${homedir}\\Documents\\Suave\\Flows`;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    this.setState({
      discoveredFlows: getFiles(folder)
    });
  }

  // Data for CommandBar
  getItems(){
    return [
      {
        key: 'newItem',
        name: 'New',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Add'
        },
        ariaLabel: 'New',
        subMenuProps: {
          items: [
            {
              key: 'manualTriggerFlow',
              name: 'Manually Triggered Flow',
              iconProps: {
                iconName: 'TouchPointer'
              },
              onClick: () => console.log('Manual flow')
            },
            {
              key: 'automationTriggeredFlow',
              name: 'Automated Flow',
              iconProps: {
                iconName: 'TriggerAuto'
              },
              onClick: () => console.log('Automation flow')
            }
          ]
        }
      }
    ];
  };

  getFarItems(){
    return [
      {
        key: 'sort',
        name: 'Sort',
        ariaLabel: 'Sort',
        iconProps: {
          iconName: 'SortLines'
        },
        subMenuProps: {
          items: [
            {
              key: 'ascending',
              name: 'Ascending',
              iconProps: {
                iconName: 'Ascending'
              },
              onClick: () => console.log('Sort Ascending')
            },
            {
              key: 'descending',
              name: 'Descending',
              iconProps: {
                iconName: 'Descending'
              },
              onClick: () => console.log('Sort descending')
            },
            {
              key: 'mostran',
              name: 'Most Ran',
              iconProps: {
                iconName: 'NumberField'
              },
              onClick: () => console.log('Sort most ran')
            },
            {
              key: 'lastran',
              name: 'Last Ran',
              iconProps: {
                iconName: 'Clock'
              },
              onClick: () => console.log('Sort last ran')
            }
          ]
        }
      },
      {
        key: 'refresh',
        name: 'Refresh List',
        ariaLabel: 'Refresh List',
        iconProps: {
          iconName: 'Refresh'
        },
        iconOnly: true,
        onClick: () => console.log('Tiles')
      },
      {
        key: 'info',
        name: 'Info',
        ariaLabel: 'Info',
        iconProps: {
          iconName: 'Info'
        },
        iconOnly: true,
        onClick: () => console.log('Info')
      }
    ];
  };

  generateDocumentsFromFile(){
    const {discoveredFlows} = this.state;
    const items: IDocument[] = [];
    console.log(discoveredFlows);
    for(let i = 0; i < discoveredFlows.length; i+=1){
      const thisFlowFile = discoveredFlows[i];
      const stats = fs.statSync(thisFlowFile);
      console.log(stats);
      items.push({
        key: i.toString(),
        name: path.basename(thisFlowFile),
        value: path.basename(thisFlowFile),
        iconName: 'Dataflows',
        fileType: '.json',
        modifiedBy: stats.uid,
        dateModified: 'Today',
        dateModifiedValue: stats.mtime,
        fileSize: stats.size,
        fileSizeRaw: stats.size
      });
    }
    return items;
  }

  getKey(item): string {
    return item.key;
  }

  render() {
    const { columns } = this.state;

    return (
      <div className={styles.content}>
        <CommandBar
          items={this.getItems()}
          farItems={this.getFarItems()}
          ariaLabel="Use left and right arrow keys to navigate between commands"
        />
        <MarqueeSelection selection={this.selection}>
          <DetailsList
            items={this.generateDocumentsFromFile()}
            compact={false}
            columns={columns}
            selectionMode={SelectionMode.none}
            getKey={(item) => {this.getKey(item)}}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible
            selection={this.selection}
            selectionPreservedOnEmptyClick
            onItemInvoked={() => {console.log("Clicked an item")}}
            enterModalSelectionOnTouch
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
          />
        </MarqueeSelection>
      </div>
    );
  }
}
