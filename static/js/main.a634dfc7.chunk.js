(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{189:function(e,t,a){},193:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),l=a(7),r=a.n(l),o=(a(88),a(8)),i=a(9),c=a(11),u=a(10),d=a(12),m=function(e,t){var a=new Date(e).toISOString().substring(0,10);if("ISO"===t)return a;if("timestamp"===t)return new Date(e).getTime();if("local"===t){var n=a.substring(0,4),s=a.substring(5,7),l=a.substring(8,10),r=new Date;return r.setUTCFullYear(n),r.setUTCMonth(s-1),r.setUTCDate(l),r.toLocaleDateString("en-GB")}},g=function(e){if("today"===e){var t=m(Date.now(),"ISO");return m(t,"timestamp")}},h=function(e){var t=m(Date.now(),"ISO");return e-(t=m(t,"timestamp"))<0?"Overdue":e-t===0?"Today":e-t===864e5?"Tomorrow":m(e,"local")},f=function(e,t,a){var n=e.slice(0),s=e[t];return 0===t&&(a=e.length),n.splice(t,1),n.splice(a,0,s),n},v=a(52),p=a(13),y=a(48),E=a.n(y),k=a(32),b=a.n(k),S=function(){var e=["Great job! \ud83d\udc4d","Nice! \ud83d\udc4c","You're doing so great!","You're on a roll!","We're doing it! \ud83d\ude01","Weow! \ud83d\ude3a","A++ for effort!\u2728","Cool \ud83d\ude0e","Amazing! \ud83d\ude04","Impressive \ud83d\ude0e","Incredible! \ud83d\udc4f","Nice moves! \ud83d\udd7a","Making progress! \ud83d\ude0a"];return e[Math.floor(Math.random()*e.length)]},C=function(){function e(e){return e}function t(e){return"string"===typeof e?e.toLowerCase():e}function a(n,s){var l="function"==typeof this&&!this.firstBy&&this,r=function(a,n){if(n="number"===typeof n?{direction:n}:n||{},"function"!=typeof a){var s=a;a=function(e){return e[s]?e[s]:""}}if(1===a.length){var l=a,r=n.ignoreCase?t:e,o=n.cmp||function(e,t){return e<t?-1:e>t?1:0};a=function(e,t){return o(r(l(e)),r(l(t)))}}return-1===n.direction?function(e,t){return-a(e,t)}:a}(n,s),o=l?function(e,t){return l(e,t)||r(e,t)}:r;return o.thenBy=a,o}return a.firstBy=a,a}(),N=a(3),T=function(e){var t=e.stats,a=t.tasksCompleted,n=Object.keys(a).length,l=Date.now()-6048e5,r=Object.keys(a).reduce(function(e,t){return a[t].timeCompleted>l&&e++,e},0);return s.a.createElement("div",{className:"align-center"},s.a.createElement("div",{className:"star-big"},"\u2605"),s.a.createElement("h1",null,"Stars: ",s.a.createElement("span",{className:"special-text"},n+t.bonusStars-t.starsUsed)),s.a.createElement("div",null,"Tasks completed: ".concat(n)),s.a.createElement("div",null,"This week: ".concat(r)))},D=function(e){var t=e.handleOnChange,a=e.value,n=e.convertDate;return s.a.createElement(s.a.Fragment,null,s.a.createElement(N.n,{className:"calendar-element",onChange:t,type:"date",value:a,min:n(Date.now(),"ISO"),max:"2019-12-31"}))},x=a(78),I=a.n(x),O=a(79),w=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleSave=function(e){a.props.saveKitty(e),a.setState({saveButtonClicked:!0})},a.state={loading:!0,saveButtonClicked:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;I()({method:"get",url:"https://api.thecatapi.com/v1/images/search?limit=1&mime_types=gif&format=json&order=RANDOM",headers:{"x-api-key":"f5568fae-d85b-4310-8e88-cb282e0e2bac"},timeout:2e4}).then(function(t){var a=t.data;console.log(a[0].url),e.setState({loading:!1,gif:a})}).catch(function(e){alert(e)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.loading,n=t.gif,l=t.saveButtonClicked;return a?s.a.createElement("div",{className:"align-center"},s.a.createElement(O.ClipLoader,{color:"#007bff",sizeUnit:"px",size:50,loading:a})):s.a.createElement(N.c,{body:!0,className:"text-center"},s.a.createElement(N.g,null,"Here's your kitty! \u2665"),s.a.createElement("div",{className:"align-center margin-bottom-5"},s.a.createElement("img",{className:"rounded-border",style:{width:"100%"},src:n[0].url,alt:"This should be a cat gif..."})),s.a.createElement(N.b,{onClick:function(){return e.handleSave(n[0].url)},color:l?"success":"info",disabled:l},l?"Saved!":"Save Kitty"))}}]),t}(n.Component),M=function(e){var t=e.className,a=e.isOpen,n=e.modalType,l=e.header,r=e.toggleModal;return s.a.createElement(N.o,{isOpen:a,toggle:function(){return r(n)}},s.a.createElement(N.r,{toggle:function(){return r(n)}},l),s.a.createElement(N.p,{className:t},e.children),s.a.createElement(N.q,null,s.a.createElement(N.b,{color:"primary",onClick:function(){return r(n)}},"OK")))},P=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).buyGif=function(e){a.setState({showGif:!0,buttonDisabled:!0}),a.props.deductStars(e)},a.toggleSavedKitties=function(){a.setState({savedKitties:!a.state.savedKitties})},a.toggleInnerModal=function(e){a.setState({innerModal:!a.state.innerModal,currentCatGif:e})},a.state={showGif:!1,buttonDisabled:!1,savedKitties:!1,innerModal:!1,currentCatGif:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.stats,n=t.inventory,l=t.saveKitty,r=this.state,o=r.buttonDisabled,i=r.savedKitties,c=r.innerModal,u=r.currentCatGif,d=Object.keys(a.tasksCompleted).length+a.bonusStars-a.starsUsed;return s.a.createElement(s.a.Fragment,null,s.a.createElement(M,{isOpen:c,toggleModal:this.toggleInnerModal},s.a.createElement("img",{style:{width:"100%"},src:u,alt:"This should be a cat gif.."})),s.a.createElement(N.s,null,s.a.createElement(N.h,{xs:{size:6,offset:6}},s.a.createElement("h4",{className:"align-center"},"Stars ",s.a.createElement(N.a,{className:"golden-text",color:"primary"},s.a.createElement("span",{className:"drop-shadow"},d))))),s.a.createElement(N.s,{className:"margin-top-10"},s.a.createElement(N.h,{xs:{size:10,offset:1}},s.a.createElement(N.c,{className:"margin-bottom-10"},s.a.createElement(N.e,null,"Items"),s.a.createElement(N.d,null,s.a.createElement(N.c,{className:"align-center"},s.a.createElement(N.d,null,s.a.createElement(N.f,null,"1 x Cat Gif: \u2b502"),s.a.createElement(N.b,{className:"buy-button",color:"warning",disabled:o||d<2,onClick:function(){return e.buyGif(2)}},"Retrieve Cuteness"))))))),this.state.showGif?s.a.createElement(w,{saveKitty:l}):null,s.a.createElement(N.s,null,s.a.createElement(N.h,{xs:{offset:2}},s.a.createElement("p",null),s.a.createElement(N.b,{className:"margin-bottom-5",onClick:this.toggleSavedKitties},"Saved Kitties"),s.a.createElement(N.i,{isOpen:i},n.catGifs.map(function(t,a){return s.a.createElement("div",{key:a},s.a.createElement(N.c,{className:"extra-padding-10 margin-bottom-2"},s.a.createElement(N.s,null,s.a.createElement(N.h,null,s.a.createElement("span",null,"Kitty ".concat(a+1)),s.a.createElement(N.b,{id:"Popover",color:"link",onClick:function(){return e.toggleInnerModal(t)}},"View")))))})))))}}]),t}(n.Component),B=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).createItem=function(e){var t=a.props,n=t.tasks,s=t.selectedPriority,l=t.addItem,r=t.convertPriority,o=t.convertDate,i=t.selectedDate,c=t.selectedTag,u=a.inputElement.current.value,d=n.reduce(function(e,t){return e+(u===t.text?1:0)},1);l({active:!0,id:b()().substring(0,12),hidden:!1,text:u,priority:r(s),timeCreated:Date.now(),dateDue:o(i,"timestamp"),instance:d,editPanelHidden:!0,settingsHidden:!0,tag:"None"===c?"None":c}),a.inputElement.current.value="",e.preventDefault()},a.inputElement=s.a.createRef(),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.inputChange,a=e.buttonDisabled;return s.a.createElement(N.l,{onSubmit:this.createItem},s.a.createElement(N.m,null,s.a.createElement(N.s,{className:"row-0 no-gutters"},s.a.createElement(N.h,{className:"padding-right",xs:"9"},s.a.createElement(N.n,{type:"text",className:"input--add-task",onChange:t,innerRef:this.inputElement,placeholder:"Enter Task"})),s.a.createElement(N.h,{xs:"3"},s.a.createElement(N.b,{className:"add-button",outline:!0,color:"primary",disabled:a,type:"submit"},"Add")))))}}]),t}(n.Component),j=function(e){var t=e.handleOnChange,a=e.value;return s.a.createElement(s.a.Fragment,null,s.a.createElement(N.n,{type:"select",className:"priority-element",value:a,onChange:t},s.a.createElement("option",{value:"Low"},"Priority: Low"),s.a.createElement("option",{value:"Medium"},"Medium"),s.a.createElement("option",{value:"High"},"High")))},H=function(e){return s.a.createElement("div",{className:"list"},e.children)},G=void 0,K=function(e){var t=e.settings,a=e.selectedStyle,n=e.changeStyle,l=e.changeColor,r=e.toggleInactiveTasks;return s.a.createElement(s.a.Fragment,null,s.a.createElement("fieldset",null,s.a.createElement("div",null,s.a.createElement("legend",null,"Choose your colours"),s.a.createElement("div",null,s.a.createElement(N.n,{className:"select-style",type:"select",value:a,onChange:n},s.a.createElement("option",{value:"None"},"None"),s.a.createElement("option",{value:"Default"},"Default"),s.a.createElement("option",{value:"Marie"},"Marie"),s.a.createElement("option",{value:"Halloween"},"Halloween"))),s.a.createElement("div",null,s.a.createElement("input",{className:"change-color",type:"color",value:t.style.colorHigh,onChange:function(e){return l(e,"colorHigh")}}),s.a.createElement("label",null,"High Priority")),s.a.createElement("div",null,s.a.createElement("input",{className:"change-color",type:"color",value:t.style.colorMedium,onChange:function(e){return l(e,"colorMedium")}}),s.a.createElement("label",null,"Medium Priority")),s.a.createElement("div",null,s.a.createElement("input",{className:"change-color",type:"color",value:t.style.colorLow,onChange:function(e){return G.changeColor(e,"colorLow")}}),s.a.createElement("label",null,"Low Priority"))),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",null,"-----------"),s.a.createElement(N.s,null,s.a.createElement(N.h,null,s.a.createElement(N.k,{type:"checkbox",id:"checkbox",label:"Show completed tasks",checked:!t.hideInactive,onChange:r}))),s.a.createElement("div",null,"-----------"))))},L=a(81),z=a.n(L),U=function(e){var t=e.settings,a=e.task,n=e.index,l=e.toggleEditItem,r=e.handleTextChange,o=e.editText,i=e.children;return s.a.createElement("div",{className:a.active?"task":"task animate-background",onClick:function(){return l(n)},style:{backgroundColor:a.active?3===a.priority?t.style.colorLow:2===a.priority?t.style.colorMedium:t.style.colorHigh:"#e5e5e5"}},s.a.createElement("span",{style:{textDecorationLine:a.active?"none":"line-through"}},a.editPanelHidden?s.a.createElement(N.s,null,s.a.createElement(N.h,null,a.text,s.a.createElement("span",{className:"instance"},a.instance>1?" (".concat(a.instance,")"):null))):s.a.createElement("span",null,s.a.createElement(N.s,{className:"edit-text no-gutters"},s.a.createElement(N.h,{xs:"10"},s.a.createElement(z.a,{className:"edit-text-element",onChange:function(e){return r(e)},onClick:function(e){return e.stopPropagation()},defaultValue:a.text})),s.a.createElement(N.h,{xs:"2"},s.a.createElement(N.b,{className:"edit-text-button",color:"secondary",size:"sm",onClick:function(e){return o(e,n)}},"OK"))))),i)},F=function(e){var t=e.task,a=e.articulateDateDue;return s.a.createElement(N.s,null,s.a.createElement(N.h,{className:"task-details"},s.a.createElement(p.TransitionGroup,null,s.a.createElement("div",{className:"date-due x-small"},"None"===t.tag?null:s.a.createElement("span",{className:"tag"},t.tag),t.active?"Due: ".concat(a(t.dateDue)):s.a.createElement(s.a.Fragment,null,s.a.createElement("span",{className:"x-small"},"Complete "),s.a.createElement(p.CSSTransition,{in:!t.active,timeout:1e3,classNames:"star"},s.a.createElement("span",{className:"star x-small"},"\u2605")),s.a.createElement(p.CSSTransition,{in:!t.active,timeout:1e3,classNames:"plus-one"},s.a.createElement("span",{className:"plus-one x-small"}," +1")))))))},J=function(e){var t=e.task,a=e.index,n=e.markComplete,l=e.sortItems;return s.a.createElement("div",{className:"item-buttons"},s.a.createElement(N.b,{className:"sort-button",size:"sm",outline:!0,color:"secondary",onClick:function(){return l(a,!0)}},"\u2191"),s.a.createElement(N.b,{className:"delete-item-button",size:"sm",outline:!0,color:t.active?"success":"danger",onClick:function(){return n(a)}},t.active?"\u2713":"\u2715"))},A=function(e){var t=e.task,a=e.index,n=e.markComplete,l=e.children;return s.a.createElement("div",{className:"edit-task",hidden:t.editPanelHidden},s.a.createElement("span",{hidden:!t.active},l),s.a.createElement("div",{className:"undo"},s.a.createElement(N.b,{hidden:t.active,className:"undo-button",outline:!0,color:"secondary",onClick:function(){return n(a,!0)}},'Undo "Mark Complete"')))},R=function(e){var t=e.tags,a=e.selectedTag,n=e.changeTag,l=e.addTag,r=e.removeTag,o=e.showButtons;return s.a.createElement(s.a.Fragment,null,s.a.createElement(N.n,{type:"select",className:"select-tag",value:a,onChange:n},t.map(function(e,t){return s.a.createElement("option",{key:t,value:e},"None"===e?"Tag: None":e)})),o?s.a.createElement(s.a.Fragment,null,s.a.createElement(N.b,{outline:!0,color:"secondary",size:"sm",onClick:r},"-"),s.a.createElement(N.b,{outline:!0,color:"secondary",size:"sm",onClick:l},"+")):null)},_=function(e){return s.a.createElement(s.a.Fragment,null,s.a.createElement(N.s,{className:"no-gutters"},s.a.createElement(N.h,{xs:"9"},s.a.createElement(U,{settings:e.settings,task:e.task,index:e.index,handleTextChange:e.handleTextChange,editText:e.editText,toggleEditItem:e.toggleEditItem},s.a.createElement(F,{task:e.task,articulateDateDue:e.articulateDateDue}))),s.a.createElement(N.h,{xs:"3"},s.a.createElement(p.TransitionGroup,null,s.a.createElement(p.CSSTransition,{key:e.task.id,timeout:500,classNames:"fade"},s.a.createElement(J,{task:e.task,index:e.index,markComplete:e.markComplete,sortItems:e.sortItems}))))),s.a.createElement(A,{task:e.task,index:e.index,markComplete:e.markComplete},s.a.createElement(N.s,null,s.a.createElement(N.h,null,s.a.createElement(D,{value:e.convertDate(e.task.dateDue,"ISO"),handleOnChange:function(t){return e.editDate(t,e.index)},convertDate:e.convertDate})),s.a.createElement(N.h,null,s.a.createElement(j,{value:e.convertPriority(e.task.priority),handleOnChange:function(t){return e.editPriority(t,e.index)}}))),s.a.createElement(N.s,{className:"margin-top-2"},s.a.createElement(N.h,{xs:{size:6,offset:6}},s.a.createElement(R,{tags:e.tags,index:e.index,selectedTag:e.task.tag,changeTag:function(t){return e.editTaskTag(t,e.index)},addTag:e.addTag,removeTag:e.removeTag})))))},W=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).clone=function(e){return JSON.parse(JSON.stringify(e))},a.addItem=function(e){var t=a.state.selectedSort,n=a.clone(a.state.tasks);n=Object(v.a)(n).concat([e]),n=a.sortItemsBy(n,t),a.setState({tasks:n,buttonDisabled:!0})},a.markComplete=function(e,t){var n=a.clone(a.state.tasks),s=a.clone(a.state.stats),l=n[e];if(0===n.length)console.log("List is empty");else try{if(l.active){l.active=!1,s.tasksCompleted[l.id]={timeCreated:l.timeCreated,timeCompleted:Date.now()},a.state.settings.hideInactive&&(n=a.sortItemsBy(n,"active")),a.setState({tasks:n,stats:s});var r=Object.keys(s.tasksCompleted).length;r%5===0&&setTimeout(function(){a.notify(S(),"custom",2e3,a.notifyStyle)},500),r%10===0&&setTimeout(function(){a.notify("\u2b50+2 STARS BONUS\u2b50","custom",2e3,{background:"#fff5be",text:"#000000"}),s.bonusStars+=2,a.setState({stats:s})},500)}else t?(l.editPanelHidden=!0,l.active=!0,delete s.tasksCompleted[l.id],a.setState({tasks:n,stats:s})):a.deleteItem(e)}catch(o){console.log(o)}},a.deleteItem=function(e){var t=a.clone(a.state.tasks);t=t.filter(function(t,a){return a!==e}),a.setState({tasks:t})},a.changePriority=function(e){var t=e.target.value;a.setState({selectedPriority:t})},a.convertPriority=function(e){return"string"===typeof e?"Low"===e?3:"Medium"===e?2:1:3===e?"Low":2===e?"Medium":"High"},a.editPriority=function(e,t){var n=a.state.selectedSort,s=a.clone(a.state.tasks),l=s[t],r=e.target.value;l.priority=a.convertPriority(r),l.editPanelHidden=!0,s=a.sortItemsBy(s,n),a.setState({tasks:s})},a.editDate=function(e,t){var n=a.state.selectedSort,s=a.clone(a.state.tasks),l=e.target.value;s[t].dateDue=m(l,"timestamp"),s[t].editPanelHidden=!0,s=a.sortItemsBy(s,n),a.setState({tasks:s})},a.inputChange=function(e){""===e.target.value?a.setState({buttonDisabled:!0}):a.setState({buttonDisabled:!1})},a.toggleItems=function(e,t,n){var s=a.clone(e);return"selected tag"===t?s.forEach(function(e){return(e.tag!==n||"None"===e.tag)&&(e.hidden=!0)}):"tags only"===t?s.forEach(function(e){return"None"===e.tag&&(e.hidden=!0)}):"show all"===t&&s.forEach(function(e){return!0===e.hidden&&(e.hidden=!1)}),s},a.sortItemsBy=function(e,t,n){var s=a.toggleItems(e,"show all");if("Manual"===t){var l=n-1;return a.props.arrayMove(e,n,l)}return"None"===t?s:"Priority"===t?(e=s).sort(C("active",-1).thenBy("priority").thenBy("dateDue").thenBy("text")):"Date Due"===t?(e=s).sort(C("active",-1).thenBy("dateDue").thenBy("priority").thenBy("text")):"A-Z"===t?(e=s).sort(C("active",-1).thenBy("text")):"Tags"===t?(e=s,(e=a.toggleItems(e,"tags only")).sort(C("tag").thenBy("priority").thenBy("dateDue").thenBy("text"))):"Selected Tag"===t?(e=a.toggleItems(e,"selected tag",a.state.selectedTag)).sort(C("tag").thenBy("priority").thenBy("dateDue").thenBy("text")):"active"===t?e.sort(C("active",-1)):void 0},a.sortItems=function(e,t){var n=a.clone(a.state.tasks),s=a.selectSortBy.current.value;t?"None"===s?(console.log("correct"),n=a.sortItemsBy(n,"Manual",e),a.setState({tasks:n})):(n=a.sortItemsBy(n,"Manual",e),a.setState({tasks:n,selectedSort:"None"})):(n=a.sortItemsBy(n,s),a.setState({tasks:n,selectedSort:s}))},a.toggleEditItem=function(e){var t=a.clone(a.state.tasks),n=t[e],s=n.editPanelHidden;t.forEach(function(e){!1===e.editPanelHidden&&e!==n&&(e.editPanelHidden=!0)}),t[e].editPanelHidden=!s,a.setState({tasks:t,editTaskText:n.text})},a.changeDate=function(e){var t=e.target.value;a.setState({selectedDate:t})},a.changeColor=function(e,t){var n=a.clone(a.state.settings);n.style[t]=e.target.value,a.setState({settings:n,selectedStyle:"None"})},a.changeStyle=function(e){var t=a.clone(a.state.settings),n=e.target.value,s=t.style;"None"===s?a.setState({selectedStyle:n}):(s.colorLow=a.styles[n][0],s.colorMedium=a.styles[n][1],s.colorHigh=a.styles[n][2],s.backgroundColor=a.styles[n][3],a.setState({settings:t,selectedStyle:n}))},a.changeTag=function(e){var t=a.state.selectedSort,n=a.clone(a.state.tasks),s=e.target.value;"Selected Tag"===t?(n=a.toggleItems(n,"show all"),n=a.toggleItems(n,"selected tag",s),a.setState({tasks:n,selectedTag:s})):a.setState({selectedTag:s})},a.addTag=function(){var e=a.clone(a.state.tags),t=prompt("Enter a new tag");""===t||e.includes(t)?alert("Invalid tag or duplicate"):(e=Object(v.a)(e).concat([t]),a.setState({tags:e,selectedTag:t}))},a.removeTag=function(){var e=a.state.selectedTag,t=a.clone(a.state.tags);t=t.filter(function(t){return t!==e||"None"===t}),a.setState({tags:t,selectedTag:"None"})},a.editTaskTag=function(e,t){var n=a.state.selectedSort,s=a.clone(a.state.tasks),l=s[t];l.tag=e.target.value,l.editPanelHidden=!0,s=a.sortItemsBy(s,n),a.setState({tasks:s})},a.editText=function(e,t){e.stopPropagation();var n=a.clone(a.state.tasks);n[t].text=a.state.editTaskText,n[t].editPanelHidden=!0,a.setState({tasks:n})},a.handleTextChange=function(e){var t=e.target.value;a.setState({editTaskText:t})},a.hideEditPanels=function(){a.state.tasks.forEach(function(e){return!1===e.editPanelHidden&&(e.editPanelHidden=!0)})},a.toggleInactiveTasks=function(){var e=a.clone(a.state.tasks),t=a.clone(a.state.settings);t.hideInactive=!t.hideInactive,e=a.sortItemsBy(e,"active"),a.setState({tasks:e,settings:t})},a.toggleModal=function(e){var t=a.clone(a.state.modals);t[e]=!t[e],a.setState({modals:t})},a.deductStars=function(e){var t=a.clone(a.state.stats);t.starsUsed+=e,a.setState({stats:t})},a.saveKitty=function(e){var t=a.clone(a.state.inventory);t.catGifs.push(e),a.setState({inventory:t})},a.state={tasks:a.props.tasks?JSON.parse(a.props.tasks):[{active:!0,hidden:!1,id:b()().substring(0,10),text:"Sample Task \u2728",priority:3,time:Date.now(),instance:1,editPanelHidden:!0,dateDue:g("today"),tag:"None"}],inventory:a.props.inventory?JSON.parse(a.props.inventory):{catGifs:[]},settings:a.props.settings?JSON.parse(a.props.settings):{style:{colorHigh:"#f5c6cb",colorMedium:"#ffeeba",colorLow:"#bee5eb",backgroundColor:"#ffffff",font:""},hideInactive:!1},stats:a.props.stats?JSON.parse(a.props.stats):{tasksCompleted:{},bonusStars:0,starsUsed:0},modals:{settingsModal:!1,statsModal:!1,shopModal:!1},tags:a.props.tags?JSON.parse(a.props.tags):["None"],buttonDisabled:!0,selectedPriority:"Low",selectedSort:"None",selectedDate:a.props.convertDate(Date.now(),"ISO"),selectedStyle:"None",selectedTag:"None",editTaskText:""},a.selectSortBy=s.a.createRef(),a.notify=y.notify.createShowQueue(),a.styles={Default:["#bee5eb","#ffeeba","#f5c6cb","#ffffff"],Marie:["#fce8f7","#f2b5e2","#f46ed0","#ffffff"],Halloween:["#feeeb8","#ffa100","#e76427","#000000"]},a.notifyStyle={background:"#007bff",text:"#ffffff"},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidUpdate",value:function(e,t){var a=this.state,n=a.tasks,s=a.inventory,l=a.settings,r=a.stats,o=a.tags,i=this.props.saveData;console.log(this.state),t.tasks!==n&&i(n,"tasks"),t.inventory!==s&&i(s,"inventory"),t.settings!==l&&i(l,"settings"),t.stats!==r&&i(r,"stats_5"),t.tags!==o&&i(o,"tags_2");var c=Object.keys(t.stats.tasksCompleted).length;if(Object.keys(r.tasksCompleted).length<c&&c%10===0){var u=this.clone(r);u.bonusStars-=2,console.log("Stars are being removed.."),this.setState({stats:u})}}},{key:"componentDidMount",value:function(){this.hideEditPanels(),this.sortItems(),console.log(this.state),this.notify("You got this! \ud83d\ude0a","custom",2e3,this.notifyStyle)}},{key:"render",value:function(){var e=this,t=this.state,a=t.tasks,n=t.inventory,l=t.settings,r=t.stats,o=t.tags,i=t.buttonDisabled,c=t.selectedPriority,u=t.selectedDate,d=t.selectedTag,m=t.selectedSort,g=t.selectedStyle,h=t.modals,f=this.props,v=f.convertDate,y=f.articulateDateDue;return document.body.style.backgroundColor=l.style.backgroundColor,s.a.createElement(N.j,null,s.a.createElement(E.a,null),s.a.createElement(N.s,null,s.a.createElement(N.h,{className:"todo",sm:"10",md:"7",lg:"5",xl:"5"},s.a.createElement(B,{tasks:a,addItem:this.addItem,inputChange:this.inputChange,convertPriority:this.convertPriority,convertDate:v,buttonDisabled:i,selectedPriority:c,selectedDate:u,selectedTag:d}),s.a.createElement(N.s,{className:"row-1 no-gutters"},s.a.createElement(N.h,null,s.a.createElement("div",{className:"calendar"},s.a.createElement(D,{value:u,handleOnChange:this.changeDate,convertDate:v}))),s.a.createElement(N.h,null,s.a.createElement("div",{className:"priority--top"},s.a.createElement(j,{value:c,handleOnChange:this.changePriority})))),s.a.createElement(N.s,{className:"row-2 no-gutters"},s.a.createElement(N.h,{className:"sort padding-right",xs:"5"},s.a.createElement(N.n,{type:"select",className:"select-sort",value:m,innerRef:this.selectSortBy,onChange:this.sortItems},s.a.createElement("option",{value:"None"},"Sort: None"),s.a.createElement("option",{value:"Priority"},"Priority"),s.a.createElement("option",{value:"Date Due"},"Date Due"),s.a.createElement("option",{value:"A-Z"},"A-Z"),s.a.createElement("option",{value:"Tags"},"Tags"),s.a.createElement("option",{value:"Selected Tag"},"Selected Tag"))),s.a.createElement(N.h,{className:"manage-tags",xs:"7"},s.a.createElement(R,{tags:o,selectedTag:d,changeTag:this.changeTag,addTag:this.addTag,removeTag:this.removeTag,showButtons:!0}))),s.a.createElement(H,{className:"list"},s.a.createElement(p.TransitionGroup,null,a.map(function(t,n){return t.hidden?null:!t.active&&l.hideInactive?null:s.a.createElement(p.CSSTransition,{key:t.id,timeout:500,classNames:"fade"},s.a.createElement(_,{tasks:a,settings:l,task:t,index:n,handleTextChange:e.handleTextChange,editText:e.editText,toggleEditItem:e.toggleEditItem,articulateDateDue:y,markComplete:e.markComplete,sortItems:e.sortItems,convertPriority:e.convertPriority,editDate:e.editDate,convertDate:v,editPriority:e.editPriority,tags:o,editTaskTag:e.editTaskTag,addTag:e.addTag,removeTag:e.removeTag}))}))),s.a.createElement(N.s,{className:"row-3 no-gutters"},s.a.createElement(N.b,{className:"settings-button",outline:!0,color:"secondary",onClick:function(){return e.toggleModal("settingsModal")}},"\u2699"),s.a.createElement(N.b,{className:"stats-button",outline:!0,color:"secondary",onClick:function(){return e.toggleModal("statsModal")}},"\u2b50"),s.a.createElement(N.b,{className:"cat-button",outline:!0,color:"secondary",onClick:function(){return e.toggleModal("shopModal")}},"\ud83d\udc31")),s.a.createElement(N.s,{className:"settings no-gutters"}))),s.a.createElement(M,{isOpen:h.settingsModal,modalType:"settingsModal",header:"Settings",toggleModal:this.toggleModal},s.a.createElement(K,{settings:l,selectedStyle:g,changeStyle:this.changeStyle,changeColor:this.changeColor,toggleInactiveTasks:this.toggleInactiveTasks})),s.a.createElement(M,{className:"rainbow-background",isOpen:h.statsModal,modalType:"statsModal",header:"Stats",toggleModal:this.toggleModal},s.a.createElement(T,{stats:r})),s.a.createElement(M,{isOpen:h.shopModal,modalType:"shopModal",header:"Le Catte Gif Shoppe",toggleModal:this.toggleModal},s.a.createElement(P,{stats:r,inventory:n,saveKitty:this.saveKitty,deductStars:this.deductStars})))}}]),t}(n.Component);W.defaultProps={convertDate:m,getDate:g,articulateDateDue:h,arrayMove:f};var Y=W,Z=(a(189),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=localStorage.getItem("tasks"),t=localStorage.getItem("inventory"),a=localStorage.getItem("settings"),n=localStorage.getItem("stats_5"),l=localStorage.getItem("tags_2");return s.a.createElement(Y,{tasks:e,inventory:t,settings:a,stats:n,tags:l,saveData:function(e,t){return localStorage.setItem(t,JSON.stringify(e))},convertDate:m,articulateDateDue:h,arrayMove:f})}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(191);r.a.render(s.a.createElement(Z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},83:function(e,t,a){e.exports=a(193)},88:function(e,t,a){}},[[83,2,1]]]);
//# sourceMappingURL=main.a634dfc7.chunk.js.map