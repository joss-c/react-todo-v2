(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{189:function(e,t,a){},193:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),l=a(13),r=a.n(l),o=(a(88),a(8)),i=a(9),c=a(11),u=a(10),d=a(12),m=function(e,t){var a=new Date(e).toISOString().substring(0,10);if("ISO"===t)return a;if("timestamp"===t)return new Date(e).getTime();if("local"===t){var n=a.substring(0,4),s=a.substring(5,7),l=a.substring(8,10),r=new Date;return r.setUTCFullYear(n),r.setUTCMonth(s-1),r.setUTCDate(l),r.toLocaleDateString("en-GB")}},g=function(e){if("today"===e){var t=m(Date.now(),"ISO");return m(t,"timestamp")}},h=function(e){var t=m(Date.now(),"ISO");return e-(t=m(t,"timestamp"))<0?"Overdue":e-t===0?"Today":e-t===864e5?"Tomorrow":m(e,"local")},p=function(e,t,a){var n=e.slice(0),s=e[t];return 0===t&&(a=e.length),n.splice(t,1),n.splice(a,0,s),n},f=function(e,t){var a=parseInt(e.slice(1,3),16),n=parseInt(e.slice(3,5),16),s=parseInt(e.slice(5,7),16);return t?"rgba("+a+", "+n+", "+s+", "+t+")":"rgb("+a+", "+n+", "+s+")"},k=a(25),v=a(6),E=a(50),y=a.n(E),T=a(23),b=a.n(T),C=function(){var e=["Great job! \ud83d\udc4d","Nice! \ud83d\udc4c","You're doing so great!","You're on a roll!","We're doing it! \ud83d\ude01","Weow! \ud83d\ude3a","A++ for effort!\u2728","Cool \ud83d\ude0e","Amazing! \ud83d\ude04","Impressive \ud83d\ude0e","Incredible! \ud83d\udc4f","Nice moves! \ud83d\udd7a","Making progress! \ud83d\ude0a","You're unstoppable! \ud83d\ude32","You're on fiyah!!!","Don't stop now!","You're pretty neat.","YES!!! \ud83d\ude0a","Pretty dope tbh","You're like a rocket! \ud83d\ude80","Whoa slow down! I can't keep up!","Jaw to the floor \ud83d\ude32","Proud of you \ud83d\ude09"];return e[Math.floor(Math.random()*e.length)]},S=function(){function e(e){return e}function t(e){return"string"===typeof e?e.toLowerCase():e}function a(n,s){var l="function"==typeof this&&!this.firstBy&&this,r=function(a,n){if(n="number"===typeof n?{direction:n}:n||{},"function"!=typeof a){var s=a;a=function(e){return e[s]?e[s]:""}}if(1===a.length){var l=a,r=n.ignoreCase?t:e,o=n.cmp||function(e,t){return e<t?-1:e>t?1:0};a=function(e,t){return o(r(l(e)),r(l(t)))}}return-1===n.direction?function(e,t){return-a(e,t)}:a}(n,s),o=l?function(e,t){return l(e,t)||r(e,t)}:r;return o.thenBy=a,o}return a.firstBy=a,a}(),x=a(2),N=function(e){var t=e.stats,a=t.tasksCompleted,n=Object.keys(a).length,l=Date.now()-6048e5,r=Object.keys(a).reduce(function(e,t){return a[t].timeCompleted>l&&e++,e},0);return s.a.createElement("div",{className:"align-center"},s.a.createElement("div",{className:"star-big"},"\u2605"),s.a.createElement("h1",null,"Stars: ",s.a.createElement("span",{className:"special-text"},n+t.bonusStars-t.starsUsed)),s.a.createElement("div",null,"Tasks completed: ".concat(n)),s.a.createElement("div",null,"This week: ".concat(r)),s.a.createElement("div",null,"Consecutive days app used: ".concat(t.consecutiveDaysUsed)))},w=function(e){var t=e.handleOnChange,a=e.value,n=e.convertDate;return s.a.createElement(s.a.Fragment,null,s.a.createElement(x.n,{className:"calendar-element",onChange:t,type:"date",value:a,min:n(Date.now(),"ISO"),max:"2019-12-31"}))},D=a(79),O=a.n(D),I=a(80),M=function(){var e=["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"],t=function(e){return e[Math.floor(Math.random()*e.length)]},a=(Math.random()>.4?t(e):t(["ab","th","fr","chr","ch","dr","cl","gr","pr","st","sn","sl","tr","eth","an","el","in","ol"]))+(Math.random()>.4?t(["au","ai","ea","ee","eu","eo","ia","io","oo","ou","ui"]):t(["a","e","i","o","u"]))+(Math.random()>.8?t(["bb","dd","ff","gg","ll","mm","nn","pp","rr","ss","tt","vv","zz"]):t(e))+t(["y","a","e","s","ie","ia","er","el","on","en","ur","es","as","sy","sta","ely","ley","ina","ers","elyn","ica","arin"]);return a=a.charAt(0).toUpperCase()+a.slice(1)},P=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleSave=function(e){var t={url:e,name:a.state.newKittyName,popoverOpen:!1};a.props.saveKitty(t),a.setState({saveButtonClicked:!0})},a.state={loading:!0,saveButtonClicked:!1,newKittyName:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;O()({method:"get",url:"https://api.thecatapi.com/v1/images/search?limit=1&mime_types=gif&format=json&order=RANDOM",headers:{"x-api-key":"f5568fae-d85b-4310-8e88-cb282e0e2bac"},timeout:2e4}).then(function(t){var a=t.data;console.log(a[0].url),e.setState({loading:!1,newKittyName:M(),gif:a})}).catch(function(e){alert(e)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.loading,n=t.gif,l=t.saveButtonClicked,r=t.newKittyName,o=this.props.hideCatGif;return a?s.a.createElement("div",{className:"align-center"},s.a.createElement(I.ClipLoader,{color:"#007bff",sizeUnit:"px",size:50,loading:a})):s.a.createElement(x.c,{body:!0,className:"text-center"},s.a.createElement(x.g,null,s.a.createElement(x.w,null,s.a.createElement(x.h,{className:"align-left",xs:"9"},s.a.createElement(x.g,null,"Here's your new kitty! - ".concat(r))),s.a.createElement(x.h,{className:"align-right",xs:"3"},s.a.createElement(x.b,{outline:!0,onClick:o},"X")))),s.a.createElement("div",{className:"align-center margin-bottom-5 margin-top-5"},s.a.createElement("img",{className:"rounded-border",style:{width:"100%"},src:n[0].url,alt:"This should be a cat gif..."})),s.a.createElement(x.b,{onClick:function(){return e.handleSave(n[0].url)},color:l?"success":"info",disabled:l},l?"Saved!":"Save Kitty"))}}]),t}(n.Component),B=function(e){var t=e.className,a=e.isOpen,n=e.modalType,l=e.header,r=e.toggleModal;return s.a.createElement(x.o,{isOpen:a,toggle:function(){return r(n)}},s.a.createElement(x.r,{toggle:function(){return r(n)}},l),s.a.createElement(x.p,{className:t},e.children),s.a.createElement(x.q,null,s.a.createElement(x.b,{color:"primary",onClick:function(){return r(n)}},"OK")))},j=a(3),H=a.n(j),K=function(e){var t=e.buttonDisabled,a=e.totalStars,n=e.buyGif;return s.a.createElement(x.w,{className:"margin-top-10"},s.a.createElement(x.h,{xs:{size:10,offset:1}},s.a.createElement(x.c,{className:"margin-bottom-10"},s.a.createElement(x.e,null,"Items"),s.a.createElement(x.d,null,s.a.createElement(x.c,{className:"align-center"},s.a.createElement(x.d,null,s.a.createElement(x.f,null,"1 x Cat Gif: \u2b502"),s.a.createElement(x.b,{className:"buy-button",color:"warning",disabled:t||a<2,onClick:function(){return n(2)}},"Retrieve Cuteness")))))))},G=function(e){var t=e.showSavedKitties,a=e.deleteKitty,n=e.inventory,l=e.toggleModal;return s.a.createElement(x.w,{className:"margin-top-10"},s.a.createElement(x.h,null,s.a.createElement(x.i,{isOpen:t},s.a.createElement(x.z,{striped:!0},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,"#"),s.a.createElement("th",null,"Kitty"),s.a.createElement("th",null,"Gif"),s.a.createElement("th",null))),s.a.createElement("tbody",null,n.catGifs.map(function(e,t){return s.a.createElement("tr",null,s.a.createElement("th",{scope:"row"},t+1),s.a.createElement("td",null,e.name),s.a.createElement("td",null,s.a.createElement(x.b,{color:"link",onClick:function(){return l(e)}},"View")),s.a.createElement("td",null,s.a.createElement(x.b,{color:"danger",onClick:function(){return a(t)}},"x")))}))))))},L=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).buyGif=function(e){a.setState({showGif:!0,buttonDisabled:!0}),a.props.deductStars(e)},a.hideCatGif=function(){a.setState({showGif:!1,buttonDisabled:!1})},a.togglesavedKitties=function(){a.setState({showSavedKitties:!a.state.showSavedKitties})},a.toggleInnerModal=function(e){a.state.innerModal?a.setState({innerModal:!1}):a.setState({innerModal:!0,currentCatGif:e})},a.state={showGif:!1,buttonDisabled:!1,showSavedKitties:!1,innerModal:!1,currentCatGif:"",activeTab:"1"},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"toggleTab",value:function(e){this.state.activeTab!==e&&this.setState({activeTab:e,showSavedKitties:!this.state.showSavedKitties})}},{key:"render",value:function(){var e=this,t=this.props,a=t.stats,n=t.inventory,l=t.saveKitty,r=t.deleteKitty,o=this.state,i=o.buttonDisabled,c=o.showSavedKitties,u=o.innerModal,d=o.currentCatGif,m=o.showGif,g=Object.keys(a.tasksCompleted).length+a.bonusStars-a.starsUsed;return s.a.createElement(s.a.Fragment,null,s.a.createElement(B,{isOpen:u,header:d.name,toggleModal:this.toggleInnerModal},s.a.createElement("img",{style:{width:"100%"},src:d.url,alt:"This should be a cat gif.."})),s.a.createElement(x.s,{tabs:!0},s.a.createElement(x.t,null,s.a.createElement(x.u,{className:H()({active:"1"===this.state.activeTab}),style:{cursor:"pointer"},onClick:function(){return e.toggleTab("1")}},"Shop")),s.a.createElement(x.t,null,s.a.createElement(x.u,{className:H()({active:"2"===this.state.activeTab}),style:{cursor:"pointer"},onClick:function(){return e.toggleTab("2")}},"Saved Kitties"))),s.a.createElement(x.x,{activeTab:this.state.activeTab},s.a.createElement(x.y,{tabId:"1"},s.a.createElement(x.w,{className:"margin-top-10"},s.a.createElement(x.h,{xs:{size:6,offset:6}},s.a.createElement("h4",{className:"align-center"},"Stars ",s.a.createElement(x.a,{className:"golden-text",color:"primary"},s.a.createElement("span",{className:"drop-shadow"},g))))),s.a.createElement(K,{buttonDisabled:i,totalStars:g,buyGif:this.buyGif}),m&&s.a.createElement(P,{saveKitty:l,hideCatGif:this.hideCatGif})),s.a.createElement(x.y,{tabId:"2"},s.a.createElement(G,{deleteKitty:r,showSavedKitties:c,inventory:n,toggleModal:this.toggleInnerModal}))))}}]),t}(n.Component),z=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).createItem=function(e){var t=a.props,n=t.tasks,s=t.selectedPriority,l=t.addTask,r=t.convertPriority,o=t.convertDate,i=t.selectedDate,c=t.selectedTag,u=a.inputElement.current.value,d=n.reduce(function(e,t){return e+(u===t.text?1:0)},1);l({active:!0,id:b()().substring(0,12),hidden:!1,text:u,priority:r(s),timeCreated:Date.now(),dateDue:o(i,"timestamp"),instance:d,editPanelHidden:!0,settingsHidden:!0,tag:"None"===c?"None":c,checklist:[]}),a.inputElement.current.value="",e.preventDefault()},a.inputElement=s.a.createRef(),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.inputChange,a=e.buttonDisabled;return s.a.createElement(x.l,{onSubmit:this.createItem},s.a.createElement(x.m,null,s.a.createElement(x.w,{className:"row-0 no-gutters"},s.a.createElement(x.h,{className:"padding-right",xs:"9"},s.a.createElement(x.n,{type:"text",className:"input--add-task",onChange:t,innerRef:this.inputElement,placeholder:"Enter Task"})),s.a.createElement(x.h,{xs:"3"},s.a.createElement(x.b,{className:"add-button",outline:!0,color:"primary",disabled:a,type:"submit"},"Add")))))}}]),t}(n.Component),A=function(e){var t=e.handleOnChange,a=e.value;return s.a.createElement(s.a.Fragment,null,s.a.createElement(x.n,{type:"select",className:"priority-element",value:a,onChange:t},s.a.createElement("option",{value:"Low"},"Priority: Low"),s.a.createElement("option",{value:"Medium"},"Medium"),s.a.createElement("option",{value:"High"},"High")))},U=function(e){return s.a.createElement("div",{className:"list"},e.children)},R=function(e){var t=e.settings,a=e.selectedStyle,n=e.changeStyle,l=e.changeColor,r=e.toggleInactiveTasks,o=e.toggleAddTasksToTop;return s.a.createElement(s.a.Fragment,null,s.a.createElement("fieldset",null,s.a.createElement("div",null,s.a.createElement("legend",null,"Choose your colours"),s.a.createElement("div",null,s.a.createElement(x.n,{className:"select-style",type:"select",value:a,onChange:n},s.a.createElement("option",{value:"None"},"None"),s.a.createElement("option",{value:"Default"},"Default"),s.a.createElement("option",{value:"Marie"},"Marie"),s.a.createElement("option",{value:"Marie_2"},"Marie 2"),s.a.createElement("option",{value:"Halloween"},"Halloween"))),s.a.createElement("div",null,s.a.createElement("input",{className:"change-color",type:"color",value:t.style.colorHigh,onChange:function(e){return l(e,"colorHigh")}}),s.a.createElement("label",null,"High Priority")),s.a.createElement("div",null,s.a.createElement("input",{className:"change-color",type:"color",value:t.style.colorMedium,onChange:function(e){return l(e,"colorMedium")}}),s.a.createElement("label",null,"Medium Priority")),s.a.createElement("div",null,s.a.createElement("input",{className:"change-color",type:"color",value:t.style.colorLow,onChange:function(e){return l(e,"colorLow")}}),s.a.createElement("label",null,"Low Priority"))),s.a.createElement(s.a.Fragment,null,s.a.createElement("div",null,"-----------"),s.a.createElement(x.w,null,s.a.createElement(x.h,null,s.a.createElement(x.k,{type:"checkbox",id:"hidInactive",label:"Show completed tasks",checked:!t.hideInactive,onChange:r}))),s.a.createElement(x.w,null,s.a.createElement(x.h,null,s.a.createElement(x.k,{type:"checkbox",id:"addTasksToTop",label:"Add tasks to top of list",checked:t.addTasksToTop,onChange:o}))),s.a.createElement("div",null,"-----------"))))},_=a(34),F=a.n(_),J=function(e){var t=e.settings,a=e.task,n=e.index,l=e.toggleEditItem,r=e.handleTextChange,o=e.editText,i=e.children,c=a.checklist.length>0;return s.a.createElement("div",{className:a.active?"task":"task animate-background",onClick:function(){return l(n)},style:{backgroundColor:a.active?3===a.priority?t.style.colorLow:2===a.priority?t.style.colorMedium:t.style.colorHigh:"#e5e5e5",borderTopLeftRadius:"0.25rem",borderTopRightRadius:"0.25rem",borderBottomRightRadius:c?"0rem":"0.25rem",borderBottomLeftRadius:c?"0rem":"0.25rem"}},s.a.createElement("span",{style:{textDecorationLine:a.active?"none":"line-through"}},a.editPanelHidden?s.a.createElement(x.w,null,s.a.createElement(x.h,null,a.text,s.a.createElement("span",{className:"instance"},a.instance>1?" (".concat(a.instance,")"):null))):s.a.createElement("span",null,s.a.createElement(x.w,{className:"edit-text no-gutters"},s.a.createElement(x.h,{xs:"10"},s.a.createElement(F.a,{className:"edit-text-element",onChange:function(e){return r(e)},onClick:function(e){return e.stopPropagation()},defaultValue:a.text})),s.a.createElement(x.h,{xs:"2"},s.a.createElement(x.b,{className:"edit-text-button",color:"secondary",size:"sm",onClick:function(e){return o(e,n)}},"OK"))))),i)},Y=function(e){var t=e.task,a=e.articulateDateDue;return s.a.createElement(x.w,null,s.a.createElement(x.h,{className:"task-details"},s.a.createElement(v.TransitionGroup,null,s.a.createElement("div",{className:"date-due x-small"},"None"===t.tag?null:s.a.createElement("span",{className:"tag"},t.tag),t.active?"Due: ".concat(a(t.dateDue)):s.a.createElement(s.a.Fragment,null,s.a.createElement("span",{className:"x-small"},"Complete "),s.a.createElement(v.CSSTransition,{in:!t.active,timeout:1e3,classNames:"star"},s.a.createElement("span",{className:"star x-small"},"\u2605")),s.a.createElement(v.CSSTransition,{in:!t.active,timeout:1e3,classNames:"plus-one"},s.a.createElement("span",{className:"plus-one x-small"}," +1")))))))},W=function(e){var t=e.task,a=e.index,n=e.markComplete,l=e.sortItems;return s.a.createElement("div",{className:"item-buttons"},s.a.createElement(x.b,{className:"sort-button",size:"sm",outline:!0,color:"secondary",onClick:function(){return l(a,!0)}},"\u2191"),s.a.createElement(x.b,{className:"delete-item-button",size:"sm",outline:!0,color:t.active?"success":"danger",onClick:function(){return n(a)}},t.active?"\u2713":"\u2715"))},V=function(e){var t=e.task,a=e.index,n=e.markComplete,l=e.children;return s.a.createElement("div",{className:"edit-task",hidden:t.editPanelHidden},s.a.createElement("span",{hidden:!t.active},l),s.a.createElement("div",{className:"undo"},s.a.createElement(x.b,{hidden:t.active,className:"undo-button",outline:!0,color:"secondary",onClick:function(){return n(a,!0)}},'Undo "Mark Complete"')))},Z=function(e){var t=e.tags,a=e.selectedTag,n=e.changeTag,l=e.addTag,r=e.removeTag,o=e.showButtons;return s.a.createElement(s.a.Fragment,null,s.a.createElement(x.n,{type:"select",className:"select-tag",value:a,onChange:n},t.map(function(e,t){return s.a.createElement("option",{key:t,value:e},"None"===e?"Tag: None":e)})),o?s.a.createElement(s.a.Fragment,null,s.a.createElement(x.b,{outline:!0,color:"secondary",size:"sm",onClick:r},"-"),s.a.createElement(x.b,{outline:!0,color:"secondary",size:"sm",onClick:l},"+")):null)},q=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).inputChange=function(){var e=a.inputElement.current.value.length<1;a.setState({currentText:a.inputElement.current.value,addButtonDisabled:e})},a.addChecklistTask=function(e,t){e.preventDefault();var n={text:a.inputElement.current.value,complete:!1,editTask:!1,id:b()().substring(0,10)};a.inputElement.current.value="",a.props.addTask(n,t),a.setState({addButtonDisabled:!0})},a.styleChecklistTask=function(e){var t=a.props,n=["colorHigh","colorMedium","colorLow"][t.task.priority-1];return{backgroundColor:e?"#E5E5E577":f(t.settings.style[n],.5),padding:"2% 3% 3% 3%"}},a.handleTextChange=function(e){a.setState({currentTaskText:e.target.value})},a.handleTaskOnClick=function(e,t){a.props.editTask(a.props.index,e),a.setState({currentTaskText:t})},a.state={addButtonDisabled:!0,currentTaskText:""},a.inputElement=s.a.createRef(),a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=this.state.addButtonDisabled,n=t.task.checklist.length;return s.a.createElement(s.a.Fragment,null,s.a.createElement(x.v,{hidden:n<1,className:"margin-top-2",striped:!0,animated:100!==t.percentageComplete,value:t.percentageComplete,color:100===t.percentageComplete?"success":null}),s.a.createElement("div",{className:"margin-top-2"}),t.task.checklistHidden&&t.task.checklist.length<1?null:s.a.createElement(s.a.Fragment,null,s.a.createElement(v.TransitionGroup,null,t.task.checklist.map(function(a,n){return s.a.createElement(v.CSSTransition,{key:a.id,timeout:100,classNames:"fade"},s.a.createElement(x.w,{className:"no-gutters"},s.a.createElement(x.h,{xs:"8"},s.a.createElement("div",{className:"task",style:e.styleChecklistTask(a.complete),onClick:function(){return e.handleTaskOnClick(n,a.text)}},a.editTask?s.a.createElement(x.w,{className:"no-gutters",style:{paddingTop:"3px"}},s.a.createElement(x.h,{xs:"10"},s.a.createElement(F.a,{className:"edit-text-element",onChange:function(t){return e.handleTextChange(t)},onClick:function(e){return e.stopPropagation()},defaultValue:a.text})),s.a.createElement(x.h,{xs:"2"},s.a.createElement(x.b,{className:"edit-text-button",style:{padding:"0px",width:"100%",minHeight:"30px"},color:"secondary",size:"sm",onClick:function(a){return t.editText(a,t.index,n,e.state.currentTaskText)}},"OK"))):s.a.createElement("span",{style:{textDecorationLine:a.complete?"line-through":"none"}},a.text))),s.a.createElement(x.h,{xs:"2"},s.a.createElement(x.b,{className:"checklist-button",size:"sm",outline:!0,color:"secondary",onClick:function(e){return t.sortTask(e,t.index,n)}},"\u2191")),s.a.createElement(x.h,{xs:"2"},s.a.createElement(x.b,{className:"checklist-button",size:"sm",outline:!0,color:a.complete?"danger":"success",onClick:function(){return t.deleteTask(t.index,n)}},a.complete?"\u2715":"\u2713"))))})),s.a.createElement(x.l,{onSubmit:function(a){return e.addChecklistTask(a,t.index)}},s.a.createElement(x.m,{style:{marginBottom:0}},s.a.createElement(x.w,{className:"margin-top-2 no-gutters"},s.a.createElement(x.h,{xs:"10"},s.a.createElement(x.n,{type:"text",innerRef:this.inputElement,onChange:this.inputChange})),s.a.createElement(x.h,{xs:"2"},s.a.createElement(x.b,{type:"submit",className:"checklist-button",size:"sm",outline:!0,color:"primary",disabled:a,style:{height:"calc(2.25rem + 2px)",maxHeight:"calc(2.25rem + 2px)"}},"Add"))))),s.a.createElement(x.w,null,s.a.createElement(x.h,null,s.a.createElement(x.b,{onClick:t.hide,color:"secondary",outline:!0,style:{width:"100%",marginTop:"5px"}},"Hide")))))}}]),t}(n.Component),Q=function(e){var t=100/e.task.checklist.length*e.task.checklist.reduce(function(e,t){return t.complete?e+1:e},0);return s.a.createElement(s.a.Fragment,null,s.a.createElement(x.w,{className:"no-gutters"},s.a.createElement(x.h,{xs:"9"},s.a.createElement(J,{settings:e.settings,task:e.task,index:e.index,handleTextChange:e.handleTextChange,editText:e.editText,toggleEditItem:e.toggleEditItem},s.a.createElement(Y,{task:e.task,articulateDateDue:e.articulateDateDue})),e.task.checklist.length>0&&s.a.createElement(x.v,{striped:!0,color:100===t&&"success",style:{height:"8px",position:"relative",zIndex:"-100",marginTop:"-6px",marginBottom:"2px",borderRadius:"0.25rem",backgroundImage:"linear-gradient(to bottom,#d6d6d6 0,#e8e8e8 100%)"},value:t})),s.a.createElement(x.h,{xs:"3"},s.a.createElement(v.TransitionGroup,null,s.a.createElement(v.CSSTransition,{key:e.task.id,timeout:500,classNames:"fade"},s.a.createElement(W,{task:e.task,index:e.index,markComplete:e.markComplete,sortItems:e.sortItems}))))),s.a.createElement(V,{task:e.task,index:e.index,markComplete:e.markComplete},s.a.createElement(x.w,null,s.a.createElement(x.h,null,s.a.createElement(w,{value:e.convertDate(e.task.dateDue,"ISO"),handleOnChange:function(t){return e.editDate(t,e.index)},convertDate:e.convertDate})),s.a.createElement(x.h,null,s.a.createElement(A,{value:e.convertPriority(e.task.priority),handleOnChange:function(t){return e.editPriority(t,e.index)}}))),s.a.createElement(x.w,{className:"margin-top-2"},s.a.createElement(x.h,null,s.a.createElement(x.b,{color:"link",onClick:function(){return e.showChecklist(e.index)},disabled:e.task.checklist.length>0},"Add checklist \u25be")),s.a.createElement(x.h,null,s.a.createElement(Z,{tags:e.tags,index:e.index,selectedTag:e.task.tag,changeTag:function(t){return e.editTaskTag(t,e.index)},addTag:e.addTag,removeTag:e.removeTag}))),s.a.createElement(q,{task:e.task,index:e.index,settings:e.settings,addTask:e.addChecklistTask,deleteTask:e.deleteChecklistTask,hide:e.hideEditPanels,sortTask:e.sortChecklistTask,editTask:e.editChecklistTask,editText:e.editChecklistTaskText,percentageComplete:t})))},X=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).clone=function(e){return JSON.parse(JSON.stringify(e))},a.addTask=function(e){var t=a.state,n=t.selectedSort,s=t.settings,l=a.clone(a.state.tasks);l=s.addTasksToTop?[e].concat(Object(k.a)(l)):Object(k.a)(l).concat([e]),l=a.sortItemsBy(l,n),a.setState({tasks:l,buttonDisabled:!0})},a.markComplete=function(e,t){var n=a.clone(a.state.tasks),s=a.clone(a.state.stats),l=n[e];if(0===n.length)console.log("List is empty");else try{if(l.active){l.active=!1,s.tasksCompleted[l.id]={timeCreated:l.timeCreated,timeCompleted:Date.now()},a.state.settings.hideInactive&&(n=a.sortItemsBy(n,"active")),a.setState({tasks:n,stats:s});var r=Object.keys(s.tasksCompleted).length;r%5===0&&setTimeout(function(){a.notify(C(),"custom",2e3,a.notifyStyle)},500),r%10===0&&setTimeout(function(){a.notify("\u2b50+2 STARS BONUS\u2b50","custom",2e3,{background:"#fff5be",text:"#000000"}),s.bonusStars+=2,a.setState({stats:s})},500)}else t?(l.editPanelHidden=!0,l.active=!0,delete s.tasksCompleted[l.id],a.setState({tasks:n,stats:s})):a.deleteTask(e)}catch(o){console.log(o)}},a.deleteTask=function(e){var t=a.clone(a.state.tasks);t=t.filter(function(t,a){return a!==e}),a.setState({tasks:t})},a.deleteChecklistTask=function(e,t){var n=a.clone(a.state.tasks),s=n[e].checklist,l=n[e].checklist[t];if(l.complete){var r=n[e].checklist.filter(function(e,a){return a!==t});n[e].checklist=r}else l.complete=!0;n[e].checklist.reduce(function(e,t){return t.complete?e+1:e},0)==s.length&&a.encouragingMessage(),a.setState({tasks:n})},a.changePriority=function(e){var t=e.target.value;a.setState({selectedPriority:t})},a.convertPriority=function(e){return"string"===typeof e?"Low"===e?3:"Medium"===e?2:1:3===e?"Low":2===e?"Medium":"High"},a.editPriority=function(e,t){var n=a.state.selectedSort,s=a.clone(a.state.tasks),l=s[t],r=e.target.value;l.priority=a.convertPriority(r),l.editPanelHidden=!0,s=a.sortItemsBy(s,n),a.setState({tasks:s})},a.editDate=function(e,t){var n=a.state.selectedSort,s=a.clone(a.state.tasks),l=e.target.value;s[t].dateDue=m(l,"timestamp"),s[t].editPanelHidden=!0,s=a.sortItemsBy(s,n),a.setState({tasks:s})},a.inputChange=function(e){""===e.target.value?a.setState({buttonDisabled:!0}):a.setState({buttonDisabled:!1})},a.toggleItems=function(e,t,n){var s=a.clone(e);return"selected tag"===t?s.forEach(function(e){return(e.tag!==n||"None"===e.tag)&&(e.hidden=!0)}):"tags only"===t?s.forEach(function(e){return"None"===e.tag&&(e.hidden=!0)}):"show all"===t&&s.forEach(function(e){return!0===e.hidden&&(e.hidden=!1)}),s},a.sortItemsBy=function(e,t,n){var s=a.toggleItems(e,"show all");if("Manual"===t){var l=n-1;return e=a.props.arrayMove(e,n,l),a.state.settings.hideInactive&&(e=a.sortItemsBy(e,"active")),e}return"None"===t?s:"Priority"===t?(e=s).sort(S("active",-1).thenBy("priority").thenBy("dateDue").thenBy("text")):"Date Due"===t?(e=s).sort(S("active",-1).thenBy("dateDue").thenBy("priority").thenBy("text")):"A-Z"===t?(e=s).sort(S("active",-1).thenBy("text")):"Tags"===t?(e=s,(e=a.toggleItems(e,"tags only")).sort(S("tag").thenBy("priority").thenBy("dateDue").thenBy("text"))):"Selected Tag"===t?(e=a.toggleItems(e,"selected tag",a.state.selectedTag)).sort(S("tag").thenBy("priority").thenBy("dateDue").thenBy("text")):"active"===t?e.sort(S("active",-1)):void 0},a.sortItems=function(e,t){var n=a.clone(a.state.tasks),s=a.selectSortBy.current.value;t?"None"===s?(console.log("correct"),n=a.sortItemsBy(n,"Manual",e),a.setState({tasks:n})):(n=a.sortItemsBy(n,"Manual",e),a.setState({tasks:n,selectedSort:"None"})):(n=a.sortItemsBy(n,s),a.setState({tasks:n,selectedSort:s}))},a.toggleEditItem=function(e){var t=a.clone(a.state.tasks),n=t[e],s=n.editPanelHidden;t.forEach(function(e){!1===e.editPanelHidden&&e!==n&&(e.editPanelHidden=!0,e.checklist.length<1&&(e.checklistHidden=!0))}),t[e].editPanelHidden=!s,t[e].checklist.length<1&&(t[e].checklistHidden=!0),a.setState({tasks:t,editTaskText:n.text})},a.changeDate=function(e){var t=e.target.value;a.setState({selectedDate:t})},a.changeColor=function(e,t){var n=a.clone(a.state.settings);n.style[t]=e.target.value,a.setState({settings:n,selectedStyle:"None"})},a.changeStyle=function(e){var t=a.clone(a.state.settings),n=e.target.value,s=t.style;"None"===s?a.setState({selectedStyle:n}):(s.colorLow=a.styles[n][0],s.colorMedium=a.styles[n][1],s.colorHigh=a.styles[n][2],s.backgroundColor=a.styles[n][3],a.setState({settings:t,selectedStyle:n}))},a.changeTag=function(e){var t=a.state.selectedSort,n=a.clone(a.state.tasks),s=e.target.value;"Selected Tag"===t?(n=a.toggleItems(n,"show all"),n=a.toggleItems(n,"selected tag",s),a.setState({tasks:n,selectedTag:s})):a.setState({selectedTag:s})},a.addTag=function(){var e=a.clone(a.state.tags),t=prompt("Enter a new tag");""===t||e.includes(t)?alert("Invalid tag or duplicate"):(e=Object(k.a)(e).concat([t]),a.setState({tags:e,selectedTag:t}))},a.removeTag=function(){var e=a.state.selectedTag,t=a.clone(a.state.tags);t=t.filter(function(t){return t!==e||"None"===t}),a.setState({tags:t,selectedTag:"None"})},a.editTaskTag=function(e,t){var n=a.state.selectedSort,s=a.clone(a.state.tasks),l=s[t];l.tag=e.target.value,l.editPanelHidden=!0,s=a.sortItemsBy(s,n),a.setState({tasks:s})},a.editText=function(e,t){e.stopPropagation();var n=a.clone(a.state.tasks);n[t].text=a.state.editTaskText,n[t].editPanelHidden=!0,a.setState({tasks:n})},a.handleTextChange=function(e){var t=e.target.value;a.setState({editTaskText:t})},a.hideEditPanels=function(){var e=a.clone(a.state.tasks);e.forEach(function(e){return!1===e.editPanelHidden&&(e.editPanelHidden=!0)}),a.setState({tasks:e})},a.toggleInactiveTasks=function(){var e=a.clone(a.state.tasks),t=a.clone(a.state.settings);t.hideInactive=!t.hideInactive,e=a.sortItemsBy(e,"active"),a.setState({tasks:e,settings:t})},a.toggleAddTasksToTop=function(){var e=a.clone(a.state.settings);console.log(e),e.addTasksToTop=!e.addTasksToTop,console.log("after",e),a.setState({settings:e})},a.toggleModal=function(e){var t=a.clone(a.state.modals);t[e]=!t[e],a.setState({modals:t})},a.deductStars=function(e){var t=a.clone(a.state.stats);t.starsUsed+=e,a.setState({stats:t})},a.saveKitty=function(e){var t=a.clone(a.state.inventory);t.catGifs=Object(k.a)(t.catGifs).concat([e]),a.setState({inventory:t})},a.deleteKitty=function(e){var t=a.clone(a.state.inventory);t.catGifs=t.catGifs.filter(function(t,a){return a!==e}),a.setState({inventory:t})},a.showChecklist=function(e){var t=a.clone(a.state.tasks);t[e].checklistHidden=!1,a.setState({tasks:t})},a.addChecklistTask=function(e,t){var n=a.clone(a.state.tasks);n[t].checklist.push(e),a.setState({tasks:n})},a.sortChecklistTask=function(e,t,n){var s=a.clone(a.state.tasks),l=n-1,r=s[t].checklist;s[t].checklist=a.props.arrayMove(r,n,l),a.setState({tasks:s})},a.editChecklistTask=function(e,t){var n=a.clone(a.state.tasks),s=n[e].checklist;s.forEach(function(e){return e.editTask=!1}),s[t].editTask=!0,a.setState({tasks:n})},a.editChecklistTaskText=function(e,t,n,s){e.stopPropagation();var l=a.clone(a.state.tasks),r=l[t].checklist[n];r.text=s,r.editTask=!1,console.log("THIS SHOULD BE WORKING",l),a.setState({tasks:l})},a.encouragingMessage=function(){setTimeout(function(){a.notify(C(),"custom",2e3,a.notifyStyle)},500)},a.state={tasks:a.props.tasks?JSON.parse(a.props.tasks):[{active:!0,hidden:!1,id:b()().substring(0,10),text:"Sample Task \u2728",priority:3,time:Date.now(),instance:1,editPanelHidden:!0,dateDue:g("today"),tag:"None",checklist:[]}],inventory:a.props.inventory?JSON.parse(a.props.inventory):{catGifs:[]},settings:a.props.settings?JSON.parse(a.props.settings):{style:{colorHigh:"#f5c6cb",colorMedium:"#ffeeba",colorLow:"#bee5eb",backgroundColor:"#ffffff",font:""},hideInactive:!1,addTasksToTop:!1},stats:a.props.stats?JSON.parse(a.props.stats):{tasksCompleted:{},bonusStars:0,starsUsed:0,daysAppUsed:[],consecutiveDaysUsed:0},modals:{settingsModal:!1,statsModal:!1,shopModal:!1},tags:a.props.tags?JSON.parse(a.props.tags):["None"],buttonDisabled:!0,selectedPriority:"Low",selectedSort:"None",selectedDate:a.props.convertDate(Date.now(),"ISO"),selectedStyle:"None",selectedTag:"None",editTaskText:""},a.selectSortBy=s.a.createRef(),a.notify=E.notify.createShowQueue(),a.styles={Default:["#bee5eb","#ffeeba","#f5c6cb","#ffffff"],Marie:["#fce8f7","#f2b5e2","#f46ed0","#ffffff"],Marie_2:["#85cdf3","#ba93f0","#e317de","#faefff"],Halloween:["#feeeb8","#ffa100","#e76427","#000000"]},a.notifyStyle={background:"#007bff",text:"#ffffff"},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.state.tasks.forEach(function(e){!1===e.editPanelHidden&&(e.editPanelHidden=!0),e.checklist.forEach(function(e){return!0===e.editTask&&(e.editTask=!1)})}),this.sortItems(),console.log(this.state),this.notify("You got this! \ud83d\ude0a","custom",2e3,this.notifyStyle)}},{key:"componentDidUpdate",value:function(e,t){var a=this,n=this.state,s=n.tasks,l=n.inventory,r=n.settings,o=n.stats,i=n.tags,c=this.props.saveData;t.tasks!==s&&c(s,"tasks_3b"),t.inventory!==l&&c(l,"inventory_3"),t.settings!==r&&c(r,"settings_2"),t.stats!==o&&c(o,"stats_10"),t.tags!==i&&c(i,"tags_2");var u=Object.keys(t.stats.tasksCompleted).length;if(Object.keys(o.tasksCompleted).length<u&&u%10===0){var d=this.clone(o);d.bonusStars-=2,console.log("Stars are being removed.."),this.setState({stats:d})}!function(){var e=a.props.getDate("today"),t=a.clone(a.state.stats),n=t.daysAppUsed;n[n.length-1]!==e&&(n.push(e),t.consecutiveDaysUsed=a.props.countDays(n,n.length-1,0)+1,console.log("Logging present-day timestamp to stats"),a.setState({stats:t}))}()}},{key:"render",value:function(){var e=this,t=this.state,a=t.tasks,n=t.inventory,l=t.settings,r=t.stats,o=t.tags,i=t.buttonDisabled,c=t.selectedPriority,u=t.selectedDate,d=t.selectedTag,m=t.selectedSort,g=t.selectedStyle,h=t.modals,p=this.props,f=p.convertDate,k=p.articulateDateDue;return document.body.style.backgroundColor=l.style.backgroundColor,s.a.createElement(x.j,null,s.a.createElement(y.a,null),s.a.createElement(x.w,null,s.a.createElement(x.h,{className:"todo",sm:"10",md:"7",lg:"5",xl:"5"},s.a.createElement(z,{tasks:a,addTask:this.addTask,inputChange:this.inputChange,convertPriority:this.convertPriority,convertDate:f,buttonDisabled:i,selectedPriority:c,selectedDate:u,selectedTag:d}),s.a.createElement(x.w,{className:"row-1 no-gutters"},s.a.createElement(x.h,null,s.a.createElement("div",{className:"calendar"},s.a.createElement(w,{value:u,handleOnChange:this.changeDate,convertDate:f}))),s.a.createElement(x.h,null,s.a.createElement("div",{className:"priority--top"},s.a.createElement(A,{value:c,handleOnChange:this.changePriority})))),s.a.createElement(x.w,{className:"row-2 no-gutters"},s.a.createElement(x.h,{className:"sort padding-right",xs:"5"},s.a.createElement(x.n,{type:"select",className:"select-sort",value:m,innerRef:this.selectSortBy,onChange:this.sortItems},s.a.createElement("option",{value:"None"},"Sort: None"),s.a.createElement("option",{value:"Priority"},"Priority"),s.a.createElement("option",{value:"Date Due"},"Date Due"),s.a.createElement("option",{value:"A-Z"},"A-Z"),s.a.createElement("option",{value:"Tags"},"Tags"),s.a.createElement("option",{value:"Selected Tag"},"Selected Tag"))),s.a.createElement(x.h,{className:"manage-tags",xs:"7"},s.a.createElement(Z,{tags:o,selectedTag:d,changeTag:this.changeTag,addTag:this.addTag,removeTag:this.removeTag,showButtons:!0}))),s.a.createElement(U,{className:"list"},s.a.createElement(v.TransitionGroup,null,a.map(function(t,n){return t.hidden?null:!t.active&&l.hideInactive?null:s.a.createElement(v.CSSTransition,{key:t.id,timeout:100,classNames:"fade"},s.a.createElement(Q,{tasks:a,settings:l,task:t,index:n,handleTextChange:e.handleTextChange,editText:e.editText,toggleEditItem:e.toggleEditItem,articulateDateDue:k,markComplete:e.markComplete,sortItems:e.sortItems,convertPriority:e.convertPriority,editDate:e.editDate,convertDate:f,editPriority:e.editPriority,tags:o,editTaskTag:e.editTaskTag,addTag:e.addTag,removeTag:e.removeTag,showChecklist:e.showChecklist,addChecklistTask:e.addChecklistTask,deleteChecklistTask:e.deleteChecklistTask,hideEditPanels:e.hideEditPanels,sortChecklistTask:e.sortChecklistTask,editChecklistTask:e.editChecklistTask,editChecklistTaskText:e.editChecklistTaskText}))}))),s.a.createElement(x.w,{className:"row-3 no-gutters"},s.a.createElement(x.b,{className:"settings-button",outline:!0,color:"secondary",onClick:function(){return e.toggleModal("settingsModal")}},"\u2699"),s.a.createElement(x.b,{className:"stats-button",outline:!0,color:"secondary",onClick:function(){return e.toggleModal("statsModal")}},"\u2b50"),s.a.createElement(x.b,{className:"cat-button",outline:!0,color:"secondary",onClick:function(){return e.toggleModal("shopModal")}},"\ud83d\udc31")),s.a.createElement(x.w,{className:"settings no-gutters"}))),s.a.createElement(B,{isOpen:h.settingsModal,modalType:"settingsModal",header:"Settings",toggleModal:this.toggleModal},s.a.createElement(R,{settings:l,selectedStyle:g,changeStyle:this.changeStyle,changeColor:this.changeColor,toggleInactiveTasks:this.toggleInactiveTasks,toggleAddTasksToTop:this.toggleAddTasksToTop})),s.a.createElement(B,{className:"rainbow-background",isOpen:h.statsModal,modalType:"statsModal",header:"Stats",toggleModal:this.toggleModal},s.a.createElement(N,{stats:r})),s.a.createElement(B,{isOpen:h.shopModal,modalType:"shopModal",header:"Le Catte Gif Shoppe",toggleModal:this.toggleModal},s.a.createElement(L,{stats:r,inventory:n,saveKitty:this.saveKitty,deleteKitty:this.deleteKitty,deductStars:this.deductStars})))}}]),t}(n.Component);X.defaultProps={convertDate:m,getDate:g,countDays:function e(t,a,n){return t[a]-t[a-1]===864e5?e(t,a-1,n+=1):n},articulateDateDue:h,arrayMove:p};var $=X,ee=(a(189),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=localStorage.getItem("tasks_3b"),t=localStorage.getItem("inventory_3"),a=localStorage.getItem("settings_2"),n=localStorage.getItem("stats_10"),l=localStorage.getItem("tags_2");return s.a.createElement($,{tasks:e,inventory:t,settings:a,stats:n,tags:l,saveData:function(e,t){return localStorage.setItem(t,JSON.stringify(e))},convertDate:m,articulateDateDue:h,arrayMove:p})}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(191);r.a.render(s.a.createElement(ee,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},83:function(e,t,a){e.exports=a(193)},88:function(e,t,a){}},[[83,2,1]]]);
//# sourceMappingURL=main.b187489c.chunk.js.map