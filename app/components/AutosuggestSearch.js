import React, { Component } from 'react';

import {
  SearchBox,
  Callout,
  DirectionalHint
} from 'office-ui-fabric-react/lib/index'

import styles from './AutosuggestSearch.css';

type Props = {
  plugins: [],
  placeholder: "",
  suggestionsHeader: "",
  noneFoundMessage: "",
  selectedCallback: (pluginName) => {}
};

export default class AutosuggestSearch extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      isCalloutVisible: false,
      toShow: [],
      value: "",
      selectedIndex: 0
    };

    this.searchTarget = React.createRef();
    this.searchBox = React.createRef();

    this.pluginNames = [];
    const {plugins} = props;
    Object.keys(plugins).forEach((key) => {
      Object.keys(plugins[key]).forEach((arrayKey) => {
        if(arrayKey.toString() === 'actions' || arrayKey.toString() === 'triggers'){
          Object.values((plugins[key])[arrayKey]).forEach((item) => {
            this.pluginNames.push(item.name);
          });
        }
      });
    });
    this.pluginNames = this.pluginNames.map(item => ({label: item}));
    console.log(this.pluginNames);

    this.calloutRef = React.createRef();

    document.addEventListener('click', (evt) => {
      const {target} = evt;
      if(target == null) return;
      if(this.calloutRef != null && this.calloutRef.current != null){
        if(!this.calloutRef.current.contains(target) && (!target.hasAttribute("id") || !target.getAttribute('id').toLowerCase().includes("search"))){
          // We are clicking somewhere other than the callout
          this.hideCalloutMenu();
        }
      }
    });
  }

  showCalloutMenu() {
    this.setState({
      isCalloutVisible: true
    });
  }

  hideCalloutMenu() {
    this.setState({
      isCalloutVisible: false
    });
  }

  onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false
    });
  };

  getSearchResults(e, newValue){
    const searchBox = this.searchBox.current;

    if(searchBox == null) return;

    if(newValue === "" || newValue.length === 0){
      this.setState({
        toShow: [],
        value: "",
        selectedIndex: 0
      });
      return;
    }

    this.setState({
      toShow: this.pluginNames.filter(item => item.label.toLowerCase().includes(newValue.toLowerCase())),
      value: newValue,
      selectedIndex: 0
    });
  }

  handleKeyDown(e){
    const {selectedIndex, toShow} = this.state;

    console.log(e.key);
    if (e.keyCode === 38 && selectedIndex > 0) {
      this.setState( prevState => ({
        selectedIndex: prevState.selectedIndex - 1
      }))
    } else if (e.keyCode === 40 && selectedIndex < toShow.length - 1) {
      this.setState( prevState => ({
        selectedIndex: prevState.selectedIndex + 1
      }))
    }
  }

  onSearch(){
    const {selectedIndex, toShow} = this.state;
    const {selectedCallback} = this.props;
    selectedCallback(toShow[selectedIndex].label);
  }

  render() {
    const {placeholder, suggestionsHeader, noneFoundMessage, selectedCallback} = this.props;
    const {isCalloutVisible, toShow, value, selectedIndex} = this.state;

    const itemsToShow = [];

    for(let i = 0; i < toShow.length; i+=1){
      const name = toShow[i];
      itemsToShow.push(
        <div key={i} aria-selected={i === selectedIndex ? "true" : "false"} role="option" aria-label={name.label} className={styles.itemHover}>
          <div className={styles.suggestionsItemRoot}>
            <button type="button" className={styles.suggestionsItem} data-is-foucsable="true" onClick={() => {selectedCallback(name.label)}}>
              <div className={styles.flexContainer}>
                <div className={styles.tagItem}>
                  {name.label.substring(0,name.label.toLowerCase().indexOf(value.toLowerCase()))}
                  <strong>
                    {name.label.substring(name.label.toLowerCase().indexOf(value.toLowerCase()),
                      name.label.toLowerCase().indexOf(value.toLowerCase()) + value.length)}</strong>
                  {name.label.substring(name.label.toLowerCase().indexOf(value.toLowerCase()) + value.length, name.label.length)}
                </div>
              </div>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div ref={this.searchTarget}>
        <SearchBox
          componentRef={this.searchBox}
          autoFocus={false}
          placeholder={placeholder}
          onFocus={() => {this.showCalloutMenu()}}
          onBlur={() => {}} // Don't hide the callout menu outright here. We'll use a window method instead
          onChange={(e, newValue) => {this.getSearchResults(e, newValue)}}
          underlined
          onSearch={() => {this.onSearch()}}
          onKeyDown={(e) => {this.handleKeyDown(e)}}
        />
        {/* TODO figure out why this isn't wide. It needs to be as wide as the search bar. */}
        <Callout
          className="ms-CalloutExample-callout"
          ariaLabelledBy="pluginSearchLabel"
          ariaDescribedBy=""
          role="alertdialog"
          gapSpace={0}
          target={this.searchTarget.current}
          onDismiss={() => {this.hideCalloutMenu()}}
          setInitialFocus={false}
          preventDismissOnScroll
          preventDismissOnResize
          preventDismissOnLostFocus
          hidden={!isCalloutVisible}
          directionalHint={DirectionalHint.rightTopEdge}
        >
          <div className={styles.component_main} ref={this.calloutRef}>
            <div className={styles.suggestionsTitle}>{suggestionsHeader}</div>
            {toShow.length === 0 ?
              <div role="alert" className={styles.noSuggestions}>{noneFoundMessage}</div>
              :
              <div role="listbox" className={styles.suggestionsContainer}>
                {itemsToShow}
              </div>
            }
          </div>
        </Callout>
      </div>
    );
  }
}
