(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,a){e.exports=a(51)},31:function(e,t,a){},47:function(e,t,a){},51:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(4),s=a.n(r),i=(a(31),a(6)),o=a(7),c=a(9),d=a(8),m=a(10),u=function(e,t){var a=new Date(e).toISOString().substring(0,10);if("ISO"===t)return a;if("timestamp"===t)return new Date(e).getTime();if("local"===t){var n=a.substring(0,4),l=a.substring(5,7),r=a.substring(8,10),s=new Date;return s.setUTCFullYear(n),s.setUTCMonth(l-1),s.setUTCDate(r),s.toLocaleDateString("en-GB")}},g=function(e){var t=u(Date.now(),"ISO");return e-(t=u(t,"timestamp"))<0?"Overdue":e-t===0?"Today":e-t===864e5?"Tomorrow":u(e,"local")},h=function(e,t,a){var n=e.slice(0),l=e[t];return 0===t&&(a=e.length),n.splice(t,1),n.splice(a,0,l),n},v=a(16),E=a(5),f=a(3),p=a(24),y=a.n(p),I=a(12),S=a.n(I),b=function(){function e(e){return e}function t(e){return"string"===typeof e?e.toLowerCase():e}function a(n,l){var r="function"==typeof this&&!this.firstBy&&this,s=function(a,n){if(n="number"===typeof n?{direction:n}:n||{},"function"!=typeof a){var l=a;a=function(e){return e[l]?e[l]:""}}if(1===a.length){var r=a,s=n.ignoreCase?t:e,i=n.cmp||function(e,t){return e<t?-1:e>t?1:0};a=function(e,t){return i(s(r(e)),s(r(t)))}}return-1===n.direction?function(e,t){return-a(e,t)}:a}(n,l),i=r?function(e,t){return r(e,t)||s(e,t)}:s;return i.thenBy=a,i}return a.firstBy=a,a}(),D=void 0,k=function(e){var t=e.handleOnChange,a=e.value,n=e.convertDate;return l.a.createElement(l.a.Fragment,null,l.a.createElement(f.g,{className:"calendar-element",onChange:t,type:"date",value:a,min:n(Date.now(),"ISO"),max:"2019-12-31"}))},C=function(e){var t=e.handleOnChange,a=e.value;return l.a.createElement(l.a.Fragment,null,l.a.createElement(f.g,{type:"select",className:"priority-element",value:a,onChange:t},l.a.createElement("option",{value:"Low"},"Priority: Low"),l.a.createElement("option",{value:"Medium"},"Medium"),l.a.createElement("option",{value:"High"},"High")))},N=function(e){return l.a.createElement("div",{className:"list"},e.children)},T=function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement(f.l,{className:"no-gutters"},l.a.createElement(f.b,{xs:"9"},l.a.createElement(w,{data:e.data,item:e.item,index:e.index,handleTextChange:e.handleTextChange,editText:e.editText,toggleEditItem:e.toggleEditItem},l.a.createElement(x,{item:e.item,articulateDateDue:e.articulateDateDue}))),l.a.createElement(f.b,{xs:"3"},l.a.createElement(E.TransitionGroup,null,l.a.createElement(E.CSSTransition,{key:e.item.id,timeout:500,classNames:"fade"},l.a.createElement(P,{item:e.item,index:e.index,markComplete:e.markComplete,sortItems:e.sortItems}))))),l.a.createElement(H,{item:e.item,index:e.index,markComplete:e.markComplete},l.a.createElement(f.l,null,l.a.createElement(f.b,null,l.a.createElement(k,{value:e.convertDate(e.item.dateDue,"ISO"),handleOnChange:function(t){return e.editDate(t,e.index)},convertDate:e.convertDate})),l.a.createElement(f.b,null,l.a.createElement(C,{value:e.convertPriority(e.item.priority),handleOnChange:function(t){return e.editPriority(t,e.index)}})))))},w=function(e){var t=e.data,a=e.item,n=e.index,r=e.toggleEditItem,s=e.handleTextChange,i=e.editText,o=e.children;return l.a.createElement("div",{className:a.active?"task":"task task-complete animate-background",onClick:function(){return r(n)},style:{backgroundColor:a.active?3===a.priority?t.settings.style.colorLow:2===a.priority?t.settings.style.colorMedium:t.settings.style.colorHigh:"#e5e5e5"}},l.a.createElement("span",{style:{textDecorationLine:a.active?"none":"line-through"}},a.editPanelHidden?l.a.createElement(f.l,null,l.a.createElement(f.b,null,a.task,l.a.createElement("span",{className:"instance"},a.instance>1?" (".concat(a.instance,")"):null))):l.a.createElement("span",null,l.a.createElement(f.l,{className:"edit-text no-gutters"},l.a.createElement(f.b,{xs:"10"},l.a.createElement(y.a,{className:"edit-text-element",onChange:function(e){return s(e)},onClick:function(e){return e.stopPropagation()},defaultValue:a.task})),l.a.createElement(f.b,{xs:"2"},l.a.createElement(f.a,{className:"edit-text-button",color:"secondary",size:"sm",onClick:function(e){return i(e,n)}},"OK"))))),o)},x=function(e){var t=e.item,a=e.articulateDateDue;return l.a.createElement(f.l,null,l.a.createElement(f.b,{className:"task-details"},l.a.createElement(E.TransitionGroup,null,l.a.createElement("div",{className:"date-due x-small"},null===t.tag?null:l.a.createElement("span",{className:"tag"},t.tag),t.active?"Due: ".concat(a(t.dateDue)):l.a.createElement(l.a.Fragment,null,l.a.createElement("span",{className:"x-small"},"Complete "),l.a.createElement(E.CSSTransition,{in:!t.active,timeout:1e3,classNames:"star"},l.a.createElement("span",{className:"star x-small"},"\u2605")),l.a.createElement(E.CSSTransition,{in:!t.active,timeout:1e3,classNames:"plus-one"},l.a.createElement("span",{className:"plus-one x-small"}," +1")))))))},P=function(e){var t=e.item,a=e.index,n=e.markComplete,r=e.sortItems;return l.a.createElement("div",{className:"item-buttons"},l.a.createElement(f.a,{className:"sort-button",size:"sm",outline:!0,color:"secondary",onClick:function(){return r(a,!0)}},"\u2191"),l.a.createElement(f.a,{className:"delete-item-button",size:"sm",outline:!0,color:t.active?"success":"danger",onClick:function(){return n(a)}},t.active?"\u2713":"\u2715"))},H=function(e){var t=e.item,a=e.index,n=e.markComplete,r=e.children;return l.a.createElement("div",{className:"edit-task",hidden:t.editPanelHidden},l.a.createElement("span",{hidden:!t.active},r),l.a.createElement("div",{className:"undo"},l.a.createElement(f.a,{hidden:t.active,className:"undo-button",outline:!0,color:"secondary",onClick:function(){return n(a,!0)}},'Undo "Mark Complete"')))},O=function(e){var t=e.data,a=e.settingsHidden,n=e.selectedStyle,r=e.changeStyle,s=e.changeColor,i=e.toggleInactiveTasks;return l.a.createElement(l.a.Fragment,null,l.a.createElement("fieldset",{hidden:a},l.a.createElement("div",null,l.a.createElement("legend",null,"Choose your colours"),l.a.createElement("div",null,l.a.createElement(f.g,{className:"select-style",type:"select",value:n,onChange:r},l.a.createElement("option",{value:"None"},"None"),l.a.createElement("option",{value:"Default"},"Default"),l.a.createElement("option",{value:"Marie"},"Marie"),l.a.createElement("option",{value:"Halloween"},"Halloween"))),l.a.createElement("div",null,l.a.createElement("input",{className:"change-color",type:"color",value:t.settings.style.colorHigh,onChange:function(e){return s(e,"colorHigh")}}),l.a.createElement("label",null,"High Priority")),l.a.createElement("div",null,l.a.createElement("input",{className:"change-color",type:"color",value:t.settings.style.colorMedium,onChange:function(e){return s(e,"colorMedium")}}),l.a.createElement("label",null,"Medium Priority")),l.a.createElement("div",null,l.a.createElement("input",{className:"change-color",type:"color",value:t.settings.style.colorLow,onChange:function(e){return D.changeColor(e,"colorLow")}}),l.a.createElement("label",null,"Low Priority"))),l.a.createElement(l.a.Fragment,null,l.a.createElement("div",null,"-----------"),l.a.createElement(f.l,null,l.a.createElement(f.b,null,l.a.createElement(f.d,{type:"checkbox",id:"checkbox",label:"Show completed tasks",checked:!t.settings.hideInactive,onChange:i}))),l.a.createElement("div",null,"-----------"))))},B=function(e){var t=e.data,a=e.statsHidden;return l.a.createElement("div",{className:"align-center",hidden:a},l.a.createElement("div",{className:"star-big"},"\u2605"),l.a.createElement("h1",null,"".concat(t.stats.tasksCompleted," stars earned!")))},M=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).createItem=function(e){var t=a.props,n=t.data,l=t.selectedPriority,r=t.addItem,s=t.convertPriority,i=t.convertDate,o=t.selectedDate,c=t.selectedTag,d=a.inputElement.current.value,m=n.listItems.reduce(function(e,t){return e+(d===t.task?1:0)},1);r({active:!0,id:S()().substring(0,10),hidden:!1,task:d,priority:s(l),time:Date.now(),dateDue:i(o,"timestamp"),instance:m,editPanelHidden:!0,settingsHidden:!0,tag:"None"===c?null:c}),a.inputElement.current.value="",e.preventDefault()},a.inputElement=l.a.createRef(),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.inputChange,a=e.buttonDisabled;return l.a.createElement(f.e,{onSubmit:this.createItem},l.a.createElement(f.f,null,l.a.createElement(f.l,{className:"row-0 no-gutters"},l.a.createElement(f.b,{className:"padding-right",xs:"9"},l.a.createElement(f.g,{type:"text",className:"input--add-task",onChange:t,innerRef:this.inputElement,placeholder:"Enter Task"})),l.a.createElement(f.b,{xs:"3"},l.a.createElement(f.a,{className:"add-button",outline:!0,color:"primary",disabled:a,type:"submit"},"Add")))))}}]),t}(n.Component),j=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).clone=function(e){return JSON.parse(JSON.stringify(e))},a.addItem=function(e){var t=a.state.selectedSort,n=a.clone(a.state.data);n.listItems=Object(v.a)(n.listItems).concat([e]),n.listItems=a.sortItemsBy(n.listItems,t),a.setState({data:n,buttonDisabled:!0})},a.markComplete=function(e,t){var n=a.clone(a.state.data),l=n.listItems[e];0===n.listItems.length?console.log("List is empty"):l.active?(l.active=!1,n.stats.tasksCompleted++,a.setState({data:n})):t?(l.editPanelHidden=!0,l.active=!0,n.stats.tasksCompleted--,a.setState({data:n})):a.deleteItem(e)},a.deleteItem=function(e){var t=a.clone(a.state.data);t.listItems=t.listItems.filter(function(t,a){return a!==e}),a.setState({data:t})},a.changePriority=function(e){var t=e.target.value;a.setState({selectedPriority:t})},a.convertPriority=function(e){return"string"===typeof e?"Low"===e?3:"Medium"===e?2:1:3===e?"Low":2===e?"Medium":"High"},a.editPriority=function(e,t){var n=a.state.selectedSort,l=a.clone(a.state.data),r=l.listItems[t],s=e.target.value;r.priority=a.convertPriority(s),r.editPanelHidden=!0,l.listItems=a.sortItemsBy(l.listItems,n),a.setState({data:l})},a.editDate=function(e,t){var n=a.state.selectedSort,l=a.clone(a.state.data),r=e.target.value;l.listItems[t].dateDue=u(r,"timestamp"),l.listItems[t].editPanelHidden=!0,l.listItems=a.sortItemsBy(l.listItems,n),a.setState({data:l})},a.inputChange=function(e){""===e.target.value?a.setState({buttonDisabled:!0}):a.setState({buttonDisabled:!1})},a.toggleItems=function(e,t,n){var l=a.clone(e);return"selected tag"===t?l.forEach(function(e){return e.tag!==n&&(e.hidden=!0)}):"tags only"===t?l.forEach(function(e){return null===e.tag&&(e.hidden=!0)}):"show all"===t&&l.forEach(function(e){return!0===e.hidden&&(e.hidden=!1)}),l},a.sortItemsBy=function(e,t,n){var l=a.toggleItems(e,"show all");if("Manual"===t){var r=n-1;return a.props.arrayMove(e,n,r)}return"None"===t?l:"Priority"===t?(e=l).sort(b("active",-1).thenBy("priority").thenBy("dateDue").thenBy("task")):"Date Due"===t?(e=l).sort(b("active",-1).thenBy("dateDue").thenBy("priority").thenBy("task")):"A-Z"===t?(e=l).sort(b("active",-1).thenBy("task")):"Tags"===t?(e=l,(e=a.toggleItems(e,"tags only")).sort(b("tag").thenBy("priority").thenBy("dateDue").thenBy("task"))):"Selected Tag"===t?(e=a.toggleItems(e,"selected tag",a.state.selectedTag)).sort(b("tag").thenBy("priority").thenBy("dateDue").thenBy("task")):"toggle inactive"===t?e.sort(b("active",-1)):void 0},a.sortItems=function(e,t){var n=a.clone(a.state.data),l=a.selectSortBy.current.value;t?"None"===l?(n.listItems=a.sortItemsBy(n.listItems,"Manual",e),a.setState({data:n})):(n.listItems=a.sortItemsBy(n.listItems,"Manual",e),a.setState({data:n,selectedSort:"None"})):(n.listItems=a.sortItemsBy(n.listItems,l),a.setState({data:n,selectedSort:l}))},a.toggleEditItem=function(e){var t=a.clone(a.state.data),n=t.listItems[e],l=n.editPanelHidden;t.listItems.forEach(function(e,t){!1===e.editPanelHidden&&e!==n&&(e.editPanelHidden=!0)}),t.listItems[e].editPanelHidden=!l,a.setState({data:t,editTaskText:n.task})},a.changeDate=function(e){var t=e.target.value;a.setState({selectedDate:t})},a.changeColor=function(e,t){var n=a.clone(a.state.data);n.settings.style[t]=e.target.value,a.setState({data:n,selectedStyle:"None"})},a.toggleSettings=function(){a.setState(function(e){return{settingsHidden:!1,modal:!e.modal}})},a.toggleStats=function(){a.setState(function(e){return{statsHidden:!1,modal:!e.modal}})},a.changeStyle=function(e){var t=a.clone(a.state.data),n=e.target.value,l=t.settings.style;"None"===n?a.setState({selectedStyle:n}):"Default"===n?(l.colorHigh="#f5c6cb",l.colorMedium="#ffeeba",l.colorLow="#bee5eb",a.setState({data:t,selectedStyle:n})):"Marie"===n?(l.colorHigh="#f46ed0",l.colorMedium="#f2b5e2",l.colorLow="#fce8f7",a.setState({data:t,selectedStyle:n})):"Halloween"===n&&(l.colorHigh="#e76427",l.colorMedium="#ffa100",l.colorLow="#feeeb8",a.setState({data:t,selectedStyle:n}))},a.changeTag=function(e){var t=a.state.selectedSort,n=a.clone(a.state.data),l=e.target.value;"Selected Tag"===t?(a.toggleItems(n.listItems,"show all"),a.toggleItems(n.listItems,"selected tag",l),a.setState({data:n,selectedTag:l})):a.setState({selectedTag:l})},a.addTag=function(){var e=a.clone(a.state.data),t=prompt("Enter a new tag");""===t||e.tags.includes(t)?alert("Invalid tag or duplicate"):(e.tags=Object(v.a)(e.tags).concat([t]),a.setState({data:e,selectedTag:t}))},a.removeTag=function(){var e=a.state.selectedTag,t=a.clone(a.state.data);t.tags=t.tags.filter(function(t){return t!==e||"None"===t}),a.setState({data:t,selectedTag:"None"})},a.editText=function(e,t){e.stopPropagation();var n=a.state.editTaskText,l=a.clone(a.state.data);l.listItems[t].task=n,l.listItems[t].editPanelHidden=!0,a.setState({data:l})},a.handleTextChange=function(e){var t=e.target.value;a.setState({editTaskText:t})},a.hideEditPanels=function(){a.state.data.listItems.forEach(function(e){return!1===e.editPanelHidden&&(e.editPanelHidden=!0)})},a.toggleInactiveTasks=function(){var e=a.clone(a.state.data);e.settings.hideInactive=!e.settings.hideInactive,e.listItems=a.sortItemsBy(e.listItems,"toggle inactive"),a.setState({data:e})},a.toggleModal=function(){a.setState(function(e){return{modal:!e.modal,settingsHidden:!0,statsHidden:!0}})},a.state={data:a.props.data?JSON.parse(a.props.data):{listItems:[{active:!0,hidden:!1,id:S()().substring(0,10),task:"Sample Task \u2728",priority:3,time:Date.now(),instance:1,editPanelHidden:!0,dateDue:Date.now(),tag:null}],settings:{style:{colorHigh:"#f5c6cb",colorMedium:"#ffeeba",colorLow:"#bee5eb"},hideInactive:!1},tags:["None"],stats:{tasksCompleted:0}},buttonDisabled:!0,selectedPriority:"Low",selectedSort:"None",selectedDate:a.props.convertDate(Date.now(),"ISO"),settingsHidden:!0,statsHidden:!0,selectedStyle:"None",selectedTag:"None",editTaskText:"",modal:!1},a.selectSortBy=l.a.createRef(),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidUpdate",value:function(){var e=this.state.data;(0,this.props.saveData)(e)}},{key:"componentDidMount",value:function(){this.hideEditPanels(),this.sortItems(),console.log(this.state.data.listItems)}},{key:"render",value:function(){var e=this,t=this.state,a=t.data,n=t.buttonDisabled,r=t.selectedPriority,s=t.selectedDate,i=t.selectedTag,o=t.selectedSort,c=t.settingsHidden,d=t.statsHidden,m=t.selectedStyle,u=t.modal,g=this.props,h=g.convertDate,v=g.articulateDateDue;return l.a.createElement(f.c,{style:{backgroundColor:"Halloween"===m?"black":"white"}},l.a.createElement(f.h,{isOpen:u,toggle:this.toggleModal},l.a.createElement(f.k,{toggle:this.toggleModal},c?"Stats":"Settings"),l.a.createElement(f.i,null,l.a.createElement(O,{data:a,settingsHidden:c,selectedStyle:m,changeStyle:this.changeStyle,changeColor:this.changeColor,toggleInactiveTasks:this.toggleInactiveTasks}),l.a.createElement(B,{data:a,statsHidden:d})),l.a.createElement(f.j,null,l.a.createElement(f.a,{color:"primary",onClick:this.toggleModal},"OK"))),l.a.createElement(f.l,null,l.a.createElement(f.b,{className:"todo",sm:"10",md:"7",lg:"5",xl:"5"},l.a.createElement(M,{data:a,addItem:this.addItem,inputChange:this.inputChange,convertPriority:this.convertPriority,convertDate:h,buttonDisabled:n,selectedPriority:r,selectedDate:s,selectedTag:i}),l.a.createElement(f.l,{className:"row-1 no-gutters"},l.a.createElement(f.b,null,l.a.createElement("div",{className:"calendar"},l.a.createElement(k,{value:s,handleOnChange:this.changeDate,convertDate:h}))),l.a.createElement(f.b,null,l.a.createElement("div",{className:"priority--top"},l.a.createElement(C,{value:r,handleOnChange:this.changePriority})))),l.a.createElement(f.l,{className:"row-2 no-gutters"},l.a.createElement(f.b,{className:"sort padding-right",xs:"5"},l.a.createElement(f.g,{type:"select",className:"select-sort",value:o,innerRef:this.selectSortBy,onChange:this.sortItems},l.a.createElement("option",{value:"None"},"Sort: None"),l.a.createElement("option",{value:"Priority"},"Priority"),l.a.createElement("option",{value:"Date Due"},"Date Due"),l.a.createElement("option",{value:"A-Z"},"A-Z"),l.a.createElement("option",{value:"Tags"},"Tags"),l.a.createElement("option",{value:"Selected Tag"},"Selected Tag"))),l.a.createElement(f.b,{className:"manage-tags",xs:"7"},l.a.createElement(f.g,{type:"select",className:"select-tag",value:i,onChange:this.changeTag},this.state.data.tags.map(function(e,t){return l.a.createElement("option",{key:t,value:e},"None"===e?"Tag: None":e)})),l.a.createElement(f.a,{outline:!0,color:"secondary",size:"sm",onClick:this.removeTag},"-"),l.a.createElement(f.a,{outline:!0,color:"secondary",size:"sm",onClick:this.addTag},"+"))),l.a.createElement(N,{className:"list"},l.a.createElement(E.TransitionGroup,null,a.listItems.map(function(t,n){return t.hidden?null:!t.active&&a.settings.hideInactive?null:l.a.createElement(E.CSSTransition,{key:t.id,timeout:500,classNames:"fade"},l.a.createElement(T,{data:a,item:t,index:n,handleTextChange:e.handleTextChange,editText:e.editText,toggleEditItem:e.toggleEditItem,articulateDateDue:v,markComplete:e.markComplete,sortItems:e.sortItems,convertPriority:e.convertPriority,editDate:e.editDate,convertDate:h,editPriority:e.editPriority}))}))),l.a.createElement(f.l,{className:"row-3 no-gutters"},l.a.createElement(f.a,{className:"settings-button",outline:!0,color:"secondary",onClick:this.toggleSettings},"\u2699"),l.a.createElement(f.a,{className:"stats-button",outline:!0,color:"secondary",onClick:this.toggleStats},"\u2605")),l.a.createElement(f.l,{className:"settings no-gutters"}))))}}]),t}(n.Component);j.defaultProps={convertDate:u,articulateDateDue:g,arrayMove:h};var L=j,F=(a(47),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=localStorage.getItem("data_6");return l.a.createElement(L,{data:e,saveData:function(e){return localStorage.setItem("data_6",JSON.stringify(e))},convertDate:u,articulateDateDue:g,arrayMove:h})}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(49);s.a.render(l.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[26,2,1]]]);
//# sourceMappingURL=main.a94f50b3.chunk.js.map