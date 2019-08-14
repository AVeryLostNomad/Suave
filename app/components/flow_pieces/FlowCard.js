import React, { Component } from 'react';
import {
  ContextualMenu,
  IconButton,
  DirectionalHint,
  ContextualMenuItemType
} from 'office-ui-fabric-react/lib/index'

import styles from './FlowCard.css';

type Props = {
  plugins: {},
  collapsedCardColor: "", // rgba(0, 119, 255, 0.15),
  dotsColor: "", // #0078d7,
  cardTitle: "", // Manually trigger a flow
  cardIconSVG: "", // Icon of svg data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGRlZnMgaWQ9ImRlZnM5Ij48c3R5bGUgaWQ9InN0eWxlMiI+LmNscy0xe2lzb2xhdGlvbjppc29sYXRlO30uY2xzLTJ7ZmlsbDojNzQyNzc0O30uIGNscy0ze29wYWNpdHk6MDttaXgtYmxlbmQtbW9kZTptdWx0aXBseTtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy00e2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjE2IiB4Mj0iMTYiIHkyPSIzMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzIzMWYyMCIgc3RvcC1vcGFjaXR5PSIwIiBpZD0ic3RvcDQiLz48c3RvcCBvZmZzZXQ9IjEiIGlkPSJzdG9wNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZSBpZD0idGl0bGUxMSI+ZGVzaWduZXIgaWNvbnM8L3RpdGxlPjxwYXRoIGlkPSJSZWN0YW5nbGUtcGF0aCIgZmlsbD0iIzA3ZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwaDMydjMyaC0zMnoiLz48cGF0aCBkPSJNMTMuNzI5IDEzLjkzNHYtMy40MTljMC0xLjI2MiAxLjAyNC0yLjI4NiAyLjI4Ni0yLjI4NnMyLjI4NiAxLjAyNCAyLjI4NiAyLjI4NnYzLjQxOWMxLjEwNi0uNzQxIDEuODI5LTEuOTkzIDEuODI5LTMuNDE5IDAtMi4yNzctMS44MzgtNC4xMTQtNC4xMTQtNC4xMTQtMi4yNzcgMC00LjExNCAxLjgzOC00LjExNCA0LjExNCAwIDEuNDI2LjcyMiAyLjY3OSAxLjgyOSAzLjQxOXptOC45OTcgNC4yMzNsLTQuMTUxLTIuMDY2Yy0uMTU1LS4wNjQtLjMyLS4xMDEtLjQ5NC0uMTAxaC0uNjk1di01LjQ4NmMwLS43NTktLjYxMy0xLjM3MS0xLjM3MS0xLjM3MS0uNzU5IDAtMS4zNzEuNjEzLTEuMzcxIDEuMzcxdjkuODE5bC0zLjEzNi0uNjU4LS4yMTktLjAyN2MtLjI4MyAwLS41MzkuMTE5LS43MjIuMzAybC0uNzIyLjczMSA0LjUxNyA0LjUxN2MuMjQ3LjI0Ny41OTQuNDAyLjk2OS40MDJoNi4yMDhjLjY4NiAwIDEuMjE2LS41MDMgMS4zMTctMS4xN2wuNjg2LTQuODE4LjAxOC0uMTgzYzAtLjU2Ny0uMzQ3LTEuMDYxLS44MzItMS4yNjJ6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==
  borderColorCode: "" // rgb(0, 119, 255)
};

export default class Test extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      // eslint-disable-next-line react/no-unused-state
      showCallout: false,
      inputs: {}, // What are the inputs to this card?
      addInputContext: false // If true, we show a menu with input options. If false, we show "Add an input"
    };

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

  addInputToCard(inputType: string){
    console.log(inputType);
    this.setState({addInputContext: false})
  }

  renderCardBody(){
    // Use our provided settings and put content here
    const {inputs, addInputContext} = this.state;
    const { borderColorCode } = this.props;

    const buttonStyle = {
      color: borderColorCode,
    };

    const textButton = {
      background: "url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHdpZHRoPSI0NHB4IiBoZWlnaHQ9IjQ0cHgiIHZpZXdCb3g9IjAgMCA0NCA0NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8dGl0bGU+VGV4dF9pY29uPC90aXRsZT4NCiAgICA8ZGVmcz48L2RlZnM+DQogICAgPGcgaWQ9IkZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9IkFkZC1maWxlLS8tRW51bS0tKG1ha2VyKSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyLjAwMDAwMCwgLTM1My4wMDAwMDApIj4NCiAgICAgICAgICAgIDxnIGlkPSIyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4wMDAwMDAsIDI2MC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iVGV4dF9pY29uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4wMDAwMDAsIDkzLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0idGV4dCI+DQogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTU1NC1Db3B5IiBmaWxsPSIjOUY2Q0Q5IiBjeD0iMjIiIGN5PSIyMiIgcj0iMjIiPjwvY2lyY2xlPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI1LjIwMDY2MTMsMTMuNzUgTDIwLjMyNTUwNjMsMjguMzQ1NjI5MyBMMTcuNTg4MjkzLDIwLjE0NDIxODggTDE2LjI0OTk0ODMsMjAuMTQ0MjE4OCBMMTIuODMzMzMzMywzMC4zNzI3NTI2IEwxNC4xODE5MDc0LDMwLjM3Mjc1MjYgTDE1LjAzMTc5ODksMjcuODE2MjU4NSBMMTguODA2NDQyNCwyNy44MTYyNTg1IEwxOS42NTYzMzQsMzAuMzcyNzUyNiBMMjEuMDA0OTA4LDMwLjM3Mjc1MjYgTDIyLjcwMzgzODYsMjUuMjU4MDU5NSBMMjkuMDM2NjgxMSwyNS4yNTgwNTk1IEwzMC43MzQ3NTkyLDMwLjM3Mjc1MjYgTDMyLjA4MzMzMzMsMzAuMzcyNzUyNiBMMjYuNTM5ODU4NCwxMy43NSBMMjUuMjAwNjYxMywxMy43NSBaIE0yNS44Njk4MzM2LDE1Ljc3ODgyODMgTDI4LjYwNzA0NjksMjMuOTgwMjM4NyBMMjMuMTMyNjIwNCwyMy45ODAyMzg3IEwyNS44Njk4MzM2LDE1Ljc3ODgyODMgWiBNMTYuOTE5MTIwNywyMi4xNzEzNDIyIEwxOC4zNzc2NjA3LDI2LjUzNjczMjggTDE1LjQ2MDU4MDcsMjYuNTM2NzMyOCBMMTYuOTE5MTIwNywyMi4xNzEzNDIyIFoiIGlkPSJQYWdlLTEiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg==\") center center no-repeat"
    };

    return (
      <div className={styles.open_card_body}>
        <div>

        </div>
        <div className={styles.floating_action_menu_container}>
          {addInputContext ?
            (<div className={styles.floating_action_menu_items_container}>
              <div>
                <span className={styles.floating_action_menu_items_title}>Choose the type of user input</span>
                <span role="button" className={styles.floating_action_menu_items_close} tabIndex="0" onClick={() => {this.setState({addInputContext: false})}}>x</span>
              </div>
              <div className={styles.floating_action_menu_items}>
                {/* This contains all of the individual input types we can put in */}
                <div className={styles.item_horizontal_container} onClick={() => {this.addInputToCard("text")}}>
                  <div role="button" tabIndex="0" className={styles.item_logo} style={textButton} />
                  <span className={styles.item_label}>Text</span>
                </div>
              </div>
            </div>)
            :
            (<div role="button" tabIndex="0" className={styles.floating_action_menu} onClick={() => {this.setState({addInputContext: true})}}>
              <span className={styles.floating_action_plus_icon} style={buttonStyle}> + </span>
              <span className={styles.floating_action_menu_title}>Add an input</span>
            </div>)
          }
        </div>
      </div>
    );
  }

  renderCollapsedCard(){
    const {collapsedCardColor, cardTitle, cardIconSVG} = this.props;

    const cardHeaderStyle = {
      backgroundColor: collapsedCardColor
    };

    return (
      <div className={styles.card}>
        <div className={styles.card_header} draggable="false" style={cardHeaderStyle}>
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
    const {collapsedCardColor, cardTitle, cardIconSVG, borderColorCode} = this.props;

    const cardHeaderStyle = {
      borderColor: borderColorCode,
      outlineColor: borderColorCode
    };

    const openHeaderStyle = {
      backgroundColor: collapsedCardColor
    };

    return (
      <div className={`${styles.card} ${styles.thick_border}`} style={cardHeaderStyle}>
        <div className={styles.card_selected} draggable="false">
          <div className={styles.open_card_header} draggable="false" style={openHeaderStyle}>
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
          {this.renderCardBody()}
        </div>
      </div>
    );
  }

  render() {
    const { collapsed } = this.state;

    return (
      <div className={styles.card_caption}>
          {collapsed ? this.renderCollapsedCard() : this.renderOpenedCard()}
      </div>
    );
  }
}
