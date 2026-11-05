function e(e,t,i,n){var r,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,i,o):r(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;let s=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new s(i,e,n)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,n))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",_=m.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},x=(e,t)=>!l(e,t),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&d(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const s=n?.call(this);r?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...u(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,n)=>{if(i)e.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of n){const n=document.createElement("style"),r=t.litNonce;void 0!==r&&n.setAttribute("nonce",r),n.textContent=i.cssText,e.appendChild(n)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=n;const s=r.fromAttribute(t,e.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(e,t,i,n=!1,r){if(void 0!==e){const s=this.constructor;if(!1===n&&(r=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??x)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:r},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,_?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=e=>e,A=w.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+E,O=`<${N}>`,T=document,M=()=>T.createComment(""),D=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,F="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,j=/>/g,z=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),P=/'/g,R=/"/g,B=/^(?:script|style|textarea|title)$/i,H=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),K=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,Y=T.createTreeWalker(T,129);function J(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,n=[];let r,s=2===t?"<svg>":3===t?"<math>":"",o=L;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===L?"!--"===l[1]?o=U:void 0!==l[1]?o=j:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=r??L,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?z:'"'===l[3]?R:P):o===R||o===P?o=z:o===U||o===j?o=L:(o=z,r=void 0);const u=o===z&&e[t+1].startsWith("/>")?" ":"";s+=o===L?i+O:d>=0?(n.push(a),i.slice(0,d)+S+i.slice(d)+E+u):i+E+(-2===d?t:u)}return[J(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class V{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let r=0,s=0;const o=e.length-1,a=this.parts,[l,d]=G(e,t);if(this.el=V.createElement(l,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=Y.nextNode())&&a.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(S)){const t=d[s++],i=n.getAttribute(e).split(E),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?ne:ee}),n.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:r}),n.removeAttribute(e));if(B.test(n.tagName)){const e=n.textContent.split(E),t=e.length-1;if(t>0){n.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],M()),Y.nextNode(),a.push({type:2,index:++r});n.append(e[t],M())}}}else if(8===n.nodeType)if(n.data===N)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=n.data.indexOf(E,e+1));)a.push({type:7,index:r}),e+=E.length-1}r++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,n){if(t===K)return t;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const s=D(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(e),r._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(t=Z(e,r._$AS(e,t.values),r,n)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??T).importNode(t,!0);Y.currentNode=n;let r=Y.nextNode(),s=0,o=0,a=i[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new Q(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new re(r,this,e)),this._$AV.push(t),a=i[++o]}s!==a?.index&&(r=Y.nextNode(),s++)}return Y.currentNode=T,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),D(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=V.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new X(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new V(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const r of e)n===t.length?t.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=t[n],i._$AI(r),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,n){const r=this.strings;let s=!1;if(void 0===r)e=Z(this,e,t,0),s=!D(e)||e!==this._$AH&&e!==K,s&&(this._$AH=e);else{const n=e;let o,a;for(e=r[0],o=0;o<r.length-1;o++)a=Z(this,n[i+o],t,o),a===K&&(a=this._$AH[o]),s||=!D(a)||a!==this._$AH[o],a===q?e=q:e!==q&&(e+=(a??"")+r[o+1]),this._$AH[o]=a}s&&!n&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ne extends ee{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??q)===K)return;const i=this._$AH,n=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==q&&(i===q||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const se=w.litHtmlPolyfillSupport;se?.(V,Q),(w.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;class ae extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let r=n._$litPart$;if(void 0===r){const e=i?.renderBefore??null;n._$litPart$=r=new Q(t.insertBefore(M(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}ae._$litElement$=!0,ae.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ae});const le=oe.litElementPolyfillSupport;le?.({LitElement:ae}),(oe.litElementVersions??=[]).push("4.2.2");const de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},ce=(e=de,t,i)=>{const{kind:n,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,r,e,!0,i)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const r=this[n];t.call(this,i),this.requestUpdate(n,r,e,!0,i)}}throw Error("Unsupported decorator location: "+n)};function ue(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function pe(e){return ue({...e,state:!0,attribute:!1})}function he(e,t){return(t,i,n)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}const me="dmx_config_ui",fe=(e,t="artnet_led")=>e.callWS({type:`${me}/get`,target:t}),ge=(e,t,i="artnet_led")=>e.callWS({type:`${me}/preview`,config:t,target:i}),_e=e=>e.callWS({type:`${me}/status`}),ve=(e,t="artnet_led")=>e.callWS({type:`${me}/import_existing`,target:t}),be=e=>String(e&&"object"==typeof e&&"message"in e?e.message:e),xe=(e,t)=>{customElements.get(e)||customElements.define(e,t)},ye=e=>void 0!==customElements.get(e),$e=o`
  :host {
    --alu-radius: var(--ha-card-border-radius, 12px);
    --alu-border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    --alu-error: var(--error-color, #db4437);
    --alu-warning: var(--warning-color, #ffa600);
    --alu-muted: var(--secondary-text-color, #727272);
    color: var(--primary-text-color);
    font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, inherit));
  }

  button {
    font: inherit;
    border: var(--alu-border);
    border-radius: 8px;
    padding: 6px 12px;
    min-height: 36px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    color: var(--primary-text-color);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  button:hover:not(:disabled) {
    filter: brightness(1.08);
  }
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 1px;
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  button.primary {
    background: var(--primary-color, #03a9f4);
    border-color: transparent;
    color: var(--text-primary-color, #fff);
  }
  button.danger {
    color: var(--alu-error);
  }
  button.icon {
    padding: 4px;
    min-width: 36px;
    justify-content: center;
    background: transparent;
    border-color: transparent;
  }
  button.icon:hover:not(:disabled) {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
  }
  ha-icon {
    --mdc-icon-size: 20px;
  }
  .glyph {
    display: inline-block;
    width: 20px;
    text-align: center;
  }

  .field {
    display: grid;
    gap: 4px;
    min-width: 0;
    align-content: start;
  }
  .field > span.label {
    font-size: 0.8rem;
    color: var(--alu-muted);
  }
  input,
  select,
  textarea {
    font: inherit;
    box-sizing: border-box;
    width: 100%;
    min-height: 40px;
    padding: 8px 10px;
    border-radius: 8px;
    border: var(--alu-border);
    background: var(--input-fill-color, var(--card-background-color, transparent));
    color: var(--primary-text-color);
  }
  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: -1px;
  }
  .field.invalid input,
  .field.invalid select {
    border-color: var(--alu-error);
  }
  .field .helper {
    font-size: 0.75rem;
    color: var(--alu-muted);
  }
  .field .error {
    font-size: 0.75rem;
    color: var(--alu-error);
  }
  .field .warn {
    font-size: 0.75rem;
    color: var(--alu-warning);
  }
  label.check {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
  }
  label.check input {
    width: 18px;
    min-height: 18px;
    margin: 0;
  }

  .grid {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .spacer {
    flex: 1;
  }
  .muted {
    color: var(--alu-muted);
    font-size: 0.85rem;
  }
  .empty {
    padding: 16px;
    border: 1px dashed var(--divider-color, rgba(127, 127, 127, 0.4));
    border-radius: var(--alu-radius);
    color: var(--alu-muted);
    text-align: center;
  }
  .alert {
    padding: 10px 14px;
    border-radius: 8px;
    border-left: 4px solid var(--alu-warning);
    background: rgba(255, 166, 0, 0.1);
  }
  .alert.error {
    border-color: var(--alu-error);
    background: rgba(219, 68, 55, 0.1);
  }
  .alert.info,
  .alert.success {
    border-color: var(--primary-color);
    background: rgba(3, 169, 244, 0.08);
  }
  code,
  pre {
    font-family: var(--ha-font-family-code, ui-monospace, SFMono-Regular, Menlo, monospace);
    font-size: 0.85rem;
  }
`,we={"mdi:arrow-up":"↑","mdi:arrow-down":"↓","mdi:delete-outline":"✕","mdi:content-copy":"⧉","mdi:pencil":"✎","mdi:plus":"+","mdi:undo":"↶","mdi:redo":"↷","mdi:dots-vertical":"⋮","mdi:close":"✕","mdi:drag":"⋮⋮","mdi:magnify":"⌕","mdi:download":"↓","mdi:upload":"↑","mdi:bookshelf":"▤","mdi:swap-horizontal":"⇄","mdi:spotlight-beam":"◮","mdi:lightbulb":"●"},ke=e=>ye("ha-icon")?H`<ha-icon .icon=${e}></ha-icon>`:H`<span class="glyph" aria-hidden="true">${we[e]??"•"}</span>`,Ae=(e,t)=>ye("ha-alert")?H`<ha-alert alert-type=${e}>${t}</ha-alert>`:H`<div class="alert ${e}" role="alert">${t}</div>`,Ce=(e,t)=>H`
  <label class="field ${e.errors?.length?"invalid":""}">
    <span class="label">${e.label}${e.required?" *":""}</span>
    ${t}
    ${e.errors?.length?e.errors.map(e=>H`<span class="error">${e}</span>`):e.warnings?.length?e.warnings.map(e=>H`<span class="warn">${e}</span>`):e.helper?H`<span class="helper">${e.helper}</span>`:q}
  </label>
`,Se=e=>Ce(e,H`<input
      type="text"
      .value=${e.value??""}
      placeholder=${e.placeholder??""}
      aria-invalid=${e.errors?.length?"true":"false"}
      @change=${t=>{const i=t.target.value.trim();e.onChange(i||void 0)}}
    />`),Ee=e=>Ce(e,H`<input
      type="number"
      inputmode="decimal"
      .value=${void 0===e.value||null===e.value?"":String(e.value)}
      min=${e.min??""}
      max=${e.max??""}
      step=${e.step??1}
      placeholder=${e.placeholder??""}
      aria-invalid=${e.errors?.length?"true":"false"}
      @change=${t=>{const i=t.target.value,n=""===i?void 0:Number(i);e.onChange(void 0===n||Number.isNaN(n)?void 0:n)}}
    />`),Ne=e=>Ce(e,H`<select
      aria-invalid=${e.errors?.length?"true":"false"}
      @change=${t=>e.onChange(t.target.value||void 0)}
    >
      ${void 0!==e.emptyLabel?H`<option value="" ?selected=${!e.value}>${e.emptyLabel}</option>`:q}
      ${e.options.map(t=>{const i="string"==typeof t?t:t.value,n="string"==typeof t?t:t.label;return H`<option value=${i} ?selected=${e.value===i}>${n}</option>`})}
      ${e.value&&!e.options.some(t=>("string"==typeof t?t:t.value)===e.value)?H`<option value=${e.value} selected>${e.value}</option>`:q}
    </select>`),Oe=e=>H`
  <label class="check">
    <input
      type="checkbox"
      .checked=${Boolean(e.value)}
      @change=${t=>e.onChange(t.target.checked)}
    />
    <span>${e.label}</span>
  </label>
`;class Te extends ae{constructor(){super(...arguments),this.open=!1,this.heading="",this.subtitle="",this.closeLabel="Close",this.wide=!1}updated(e){e.has("open")&&this._dialog&&(this.open&&!this._dialog.open?this._dialog.showModal():!this.open&&this._dialog.open&&this._dialog.close())}_dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}_onCancel(e){e.preventDefault(),this._dismiss()}_onClick(e){e.target===this._dialog&&this._dismiss()}render(){return H`
      <dialog
        class=${this.wide?"wide":""}
        aria-label=${this.heading}
        @cancel=${this._onCancel}
        @click=${this._onClick}
      >
        <div class="surface">
          <header>
            <div>
              <h2>${this.heading}</h2>
              ${this.subtitle?H`<p class="muted">${this.subtitle}</p>`:q}
            </div>
            <button class="icon" title=${this.closeLabel} aria-label=${this.closeLabel} @click=${this._dismiss}>
              ${ke("mdi:close")}
            </button>
          </header>
          <div class="content"><slot></slot></div>
          <footer><slot name="actions"></slot></footer>
        </div>
      </dialog>
    `}static{this.styles=[$e,o`
      dialog {
        padding: 0;
        border: none;
        border-radius: var(--ha-dialog-border-radius, 24px);
        background: var(--mdc-theme-surface, var(--card-background-color, #fff));
        color: var(--primary-text-color);
        width: min(560px, calc(100vw - 32px));
        max-height: calc(100vh - 32px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
      }
      dialog.wide {
        width: min(960px, calc(100vw - 32px));
      }
      dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
      }
      .surface {
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 32px);
      }
      header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 20px 20px 8px 24px;
      }
      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 500;
      }
      header p {
        margin: 4px 0 0;
      }
      .content {
        padding: 8px 24px;
        overflow: auto;
      }
      footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        flex-wrap: wrap;
        padding: 12px 24px 20px;
      }
      @media (max-width: 600px) {
        dialog,
        dialog.wide {
          width: 100vw;
          max-width: 100vw;
          height: 100%;
          max-height: 100%;
          border-radius: 0;
        }
        .surface {
          height: 100%;
          max-height: 100%;
        }
        .content {
          flex: 1;
        }
      }
    `]}}e([ue({type:Boolean,reflect:!0})],Te.prototype,"open",void 0),e([ue()],Te.prototype,"heading",void 0),e([ue()],Te.prototype,"subtitle",void 0),e([ue()],Te.prototype,"closeLabel",void 0),e([ue({type:Boolean})],Te.prototype,"wide",void 0),e([he("dialog")],Te.prototype,"_dialog",void 0),xe("artnetui-dialog",Te);const Me={title:"DMX Config UI",loading:"Loading…",loadError:"Failed to load configuration",save:"Save",saving:"Saving…",saved:"Saved",saveError:"Failed to save",deploy:"Deploy",deployHint:"Write the YAML file used by ha-artnet-led",deployBlocked:"Fix the validation errors before deploying",undo:"Undo",redo:"Redo",more:"More",addNode:"Add node",importYaml:"Import YAML…",importExisting:"Import from configuration.yaml",importJson:"Import JSON file…",exportJson:"Export JSON",loadExample:"Load example",clearAll:"Clear all",reload:"Reload from server",unsaved:"Unsaved changes",errorsCount:"{count} validation error(s)",artnetMissing:"The ha-artnet-led integration (artnet_led) does not seem to be installed. Install it via HACS, otherwise the generated lights will not work.",includeMissing:"{path} is not yet included in your configuration.yaml. Add this line or use the repair:",openRepairs:"Open repairs",restartPending:"A Home Assistant restart is required to apply the deployed configuration.",versionMismatch:"The editor ({frontend}) and the integration ({backend}) versions differ. Reload the page / clear the browser cache.",confirm:"Confirm",cancel:"Cancel",close:"Close",confirmExampleTitle:"Load example?",confirmExampleText:"The current configuration will be replaced by an example. You can undo this.",confirmClearTitle:"Clear everything?",confirmClearText:"All nodes, universes and lights will be removed. You can undo this.",confirmReloadTitle:"Discard changes?",confirmReloadText:"You have unsaved changes. Reloading discards them.",confirmImportTitle:"Replace configuration?",confirmImportText:"The imported configuration replaces the current one. You can undo this.",importYamlTitle:"Import YAML",importYamlSubtitle:"Paste ha-artnet-led configuration: a `light:` block, a list of platform entries or a single entry.",importAction:"Import",importFailed:"Import failed: {error}",importNothing:"No artnet_led configuration found in configuration.yaml.",deployTitle:"Deploy configuration",deployTarget:"Target file: {path}",deployNoChanges:"The file is already up to date.",deployInvalid:"The configuration has errors and cannot be deployed:",deployAction:"Write file",deploying:"Writing…",deployFailed:"Deploy failed: {error}",deployWritten:"{path} has been written.",deployUnchanged:"{path} is already up to date.",deployRestart:"Restart Home Assistant to apply the changes – a repair with a restart button has been created.",deployCheckError:"Home Assistant reports a configuration problem:",deployNotIncluded:"The file is not included yet, see the repair in Settings → Repairs.",noNodes:"No nodes yet. Use “Add node”, import an existing configuration or load the example.",node:"Node",host:"Host / IP",hostOverride:"Host override",port:"Port",portOverride:"Port override",nodeType:"Node type",maxFps:"Max FPS",refresh:"Refresh every (s)",advanced:"Advanced",universes:"Universes",universe:"Universe",universeId:"Universe ID",outputCorrection:"Output correction",sendPartial:"Send partial universe",addUniverse:"Add universe",addLight:"Add light",noUniverses:"No universes yet.",noLights:"No lights in this universe.",remove:"Remove",duplicate:"Duplicate",edit:"Edit",moveUp:"Move up",moveDown:"Move down",channelMap:"DMX channel map",channelsUsed:"{used} / 512 channels used",overlap:"Overlap",free:"free",default:"Default",editLight:"Edit light",newLight:"New light",name:"Name",nameHelper:"Entity: light.{slug}",friendlyName:"Friendly name",channel:"Start channel",channelHelper:"Occupies {start}–{end} ({width} channel(s))",type:"Type",transition:"Transition (s)",channelSize:"Channel size",byteOrder:"Byte order",minTemp:"Min temperature",maxTemp:"Max temperature",targetUniverse:"Universe",nextFree:"Next free channel",apply:"Apply",channelSetup:"Channel setup",channelSetupHint:"Order of the DMX channels of this light. Click a block to append it, drag or use the arrows to reorder.",channelSetupDefault:"Empty = default ({value})",palette:"Blocks",staticValue:"Static value (0–255)",staticToken:"Static value {value}",add:"Add",resetDefault:"Reset to default",noChannels:"No channels – the default is used.",ch_d:"Dimmer",ch_c:"Cold white (scaled)",ch_C:"Cold white",ch_h:"Warm white (scaled)",ch_H:"Warm white",ch_t:"Temperature (0 warm → 255 cold)",ch_T:"Temperature (255 warm → 0 cold)",ch_r:"Red (scaled)",ch_R:"Red",ch_g:"Green (scaled)",ch_G:"Green",ch_b:"Blue (scaled)",ch_B:"Blue",ch_w:"White (scaled)",ch_W:"White",ch_u:"Hue",ch_U:"Saturation",ch_x:"X (CIE xy)",ch_y:"Y (CIE xy)",tabLegacy:"ha-artnet-led 0.x",tabLegacySub:"artnet_led · lights",tabDmx:"ha-artnet-led 1.x",tabDmxSub:"dmx · fixtures, moving heads",backendInstalled:"installed {version}",backendMissing:"not installed",dmxMissing:"ha-artnet-led 1.x (dmx) does not seem to be installed. You can prepare the configuration now; it is used as soon as 1.x is installed.",dmxForeignBlock:"configuration.yaml already contains a dmx: block. The repair replaces it with the include (a backup is created).",dmxSuggestMigrate:'ha-artnet-led 1.x is installed and you have a 0.x configuration. Use "Migrate from 0.x" to convert it.',migrateFrom0x:"Migrate from 0.x…",dmxFixtureErrors:"Some fixture files could not be read:",importNothingDmx:"No dmx configuration found in configuration.yaml.",warningsCount:"{count} warning(s)",deployWarnings:"Warnings (deploy is still possible):",deployFixturesInstalled:"Copied fixtures to the fixtures folder: {files}",dmxGeneral:"General",dmxLibrary:"Fixture library",dmxFolder:"Fixtures folder",dmxFolderHelper:"Relative to the config folder · {count} fixture(s) available",dmxArtnet:"Art-Net",dmxSacn:"sACN (E1.31)",dmxUniverseCount:"{count} universe(s)",dmxProtocolSettings:"Protocol settings",dmxRateLimit:"Rate limit (s)",dmxSourceName:"Source name",dmxPriority:"Priority",dmxInterfaceIp:"Interface IP",dmxSyncAddress:"Sync address",dmxTtl:"Multicast TTL",dmxPreviewData:"Send preview data",dmxAddArtnetUniverse:"Add Art-Net universe",dmxAddSacnUniverse:"Add sACN universe",dmxNet:"Net",dmxSubnet:"Subnet",dmxCompatibility:"Compatibility (unicast targets)",dmxManualNodes:"Manual nodes (for nodes without ArtPoll discovery)",dmxUnicast:"Unicast addresses (instead of multicast)",dmxAddHost:"Add host",dmxNoDevices:"No fixtures in this universe yet.",dmxAddDevice:"Add fixture",dmxNewDevice:"New fixture",dmxEditDevice:"Edit fixture",dmxFixture:"Fixture",dmxChooseFixture:"choose fixture",dmxBundled:"bundled",dmxBundledHint:"Bundled fixture – it is copied into the fixtures folder on deploy.",dmxMode:"Mode",dmxStartAddress:"Start address",dmxFootprint:"Uses channels {start}–{end} ({width} ch)",dmxPrefix:"Entity ID prefix",dmxPrefixHelper:"Optional · entities like number.{prefix}_<channel>_…",dmxCurve:"Curve",dmxMin:"Min (0–1)",dmxMax:"Max (0–1)",dmxChannels:"Channels of this mode ({count})",dmxEntityPreview:"Creates {light} light, {number} number and {select} select entities",dmxAddress:"DMX",dmxChannel:"Channel",dmxKind:"Entity",kind_number:"number",kind_select:"select",kind_fine:"fine",kind_switching:"switching",kind_empty:"unused",kind_unknown:"unknown",dmxLibrarySubtitle:"Fixtures in the Open Fixture Library format, stored in /config/{folder}",dmxFixtureAdded:"{name} was saved as {file}.",dmxOflError:"Open Fixture Library: {error}",dmxUploadError:"Upload failed: {error}",dmxInstalled:"installed",dmxFolderMissing:"The folder /config/{folder} does not exist yet. It is created on the first download/deploy.",dmxOflTitle:"Add fixtures",dmxOflHint:"Search the Open Fixture Library or upload an OFL JSON file.",dmxOflPlaceholder:"e.g. Hydrabeam, Stairville, ADJ …",dmxSearch:"Search",dmxUpload:"Upload JSON…",dmxDownload:"Download",dmxOflNoResults:"No fixtures found.",dmxAvailable:"Available fixtures ({count})",dmxFilter:"Filter…",dmxBundledExplain:'"bundled" fixtures ship with this integration (generic faders) and are copied into the folder when used.',migTitle:"Migrate from ha-artnet-led 0.x",migSubtitle:"Converts your artnet_led lights into dmx fixtures using the generic faders.",migSummary:"{devices} light(s) in {universes} universe(s) will be converted. Fixtures: {fixtures}",migNotes:"Notes per light",migReplaces:"This replaces the current 1.x configuration in the editor (you can undo this).",migNextSteps:"Review the result, then deploy. Your 0.x configuration is not changed.",migNothing:"There is no 0.x configuration to migrate.",migApply:"Apply",mig_entity_ids_change:"Entity IDs change: ha-artnet-led 1.x creates new entities (e.g. light.<prefix>_…). Update automations, scripts and dashboards.",mig_kinet_unsupported:"Node {host}: KiNET is not supported by 1.x – skipped.",mig_sacn_universe_zero:"Node {host}: sACN universe 0 is invalid – universe 1 is used.",mig_binary_as_dimmer:"binary light becomes a dimmer channel.",mig_channel_setup:"custom channel order ({channel_setup}) is not supported – default order used.",mig_type_unsupported:"type {type} has no generic fixture – skipped.",mig_bit_depth:"no {bits} bit mode found – mode {mode} is used.",mig_byte_order:"little endian byte order is not supported.",mig_transition:"default transition is not supported in 1.x.",mig_color_temp_range:"min/max colour temperature is defined by the fixture in 1.x.",err_required:"Required",err_range:"Must be between {low} and {high}",err_choice:"Must be one of: {choices}",err_temp:"Must look like 2700K",err_setup_char:"'{token}' is not allowed for type {type}",err_setup_value:"Static values must be 0–255",err_overflow:"Ends at channel {end} (> 512)",err_overlap:"Channels {start}–{end} overlap with '{other}' ({otherStart}–{otherEnd})",err_duplicate:"Duplicate",err_folder:"Must be a relative folder inside the config folder",err_prefix:"Use lowercase letters, digits and _",err_min_max:"Min must be below max",err_length:"Max. 63 characters",err_fixture_unknown:"Fixture '{fixture}' is not in the fixtures folder",err_mode_unknown:"Must be one of: {choices}",err_width_estimated:"The channel count of this mode could only be estimated"},De={en:Me,de:{title:"DMX Config UI",loading:"Lade…",loadError:"Konfiguration konnte nicht geladen werden",save:"Speichern",saving:"Speichere…",saved:"Gespeichert",saveError:"Speichern fehlgeschlagen",deploy:"Deploy",deployHint:"YAML-Datei für ha-artnet-led schreiben",deployBlocked:"Behebe zuerst die Validierungsfehler",undo:"Rückgängig",redo:"Wiederholen",more:"Mehr",addNode:"Node hinzufügen",importYaml:"YAML importieren…",importExisting:"Aus configuration.yaml importieren",importJson:"JSON-Datei importieren…",exportJson:"Als JSON exportieren",loadExample:"Beispiel laden",clearAll:"Alles leeren",reload:"Vom Server neu laden",unsaved:"Ungespeicherte Änderungen",errorsCount:"{count} Validierungsfehler",artnetMissing:"Die Integration ha-artnet-led (artnet_led) scheint nicht installiert zu sein. Installiere sie über HACS, sonst funktionieren die erzeugten Lampen nicht.",includeMissing:"{path} ist noch nicht in deiner configuration.yaml eingebunden. Füge diese Zeile hinzu oder nutze die Reparatur:",openRepairs:"Reparaturen öffnen",restartPending:"Ein Neustart von Home Assistant ist nötig, um die Konfiguration zu übernehmen.",versionMismatch:"Editor ({frontend}) und Integration ({backend}) haben unterschiedliche Versionen. Seite neu laden / Browser-Cache leeren.",confirm:"Bestätigen",cancel:"Abbrechen",close:"Schließen",confirmExampleTitle:"Beispiel laden?",confirmExampleText:"Die aktuelle Konfiguration wird durch ein Beispiel ersetzt. Das lässt sich rückgängig machen.",confirmClearTitle:"Alles leeren?",confirmClearText:"Alle Nodes, Universes und Lampen werden entfernt. Das lässt sich rückgängig machen.",confirmReloadTitle:"Änderungen verwerfen?",confirmReloadText:"Es gibt ungespeicherte Änderungen. Neu laden verwirft sie.",confirmImportTitle:"Konfiguration ersetzen?",confirmImportText:"Die importierte Konfiguration ersetzt die aktuelle. Das lässt sich rückgängig machen.",importYamlTitle:"YAML importieren",importYamlSubtitle:"Füge eine ha-artnet-led Konfiguration ein: einen `light:`-Block, eine Liste von Plattform-Einträgen oder einen einzelnen Eintrag.",importAction:"Importieren",importFailed:"Import fehlgeschlagen: {error}",importNothing:"Keine artnet_led Konfiguration in der configuration.yaml gefunden.",deployTitle:"Konfiguration deployen",deployTarget:"Zieldatei: {path}",deployNoChanges:"Die Datei ist bereits aktuell.",deployInvalid:"Die Konfiguration enthält Fehler und kann nicht geschrieben werden:",deployAction:"Datei schreiben",deploying:"Schreibe…",deployFailed:"Deploy fehlgeschlagen: {error}",deployWritten:"{path} wurde geschrieben.",deployUnchanged:"{path} ist bereits aktuell.",deployRestart:"Starte Home Assistant neu, um die Änderungen zu übernehmen – eine Reparatur mit Neustart-Button wurde angelegt.",deployCheckError:"Home Assistant meldet ein Konfigurationsproblem:",deployNotIncluded:"Die Datei ist noch nicht eingebunden, siehe Reparatur unter Einstellungen → Reparaturen.",noNodes:"Noch keine Nodes. Nutze „Node hinzufügen“, importiere eine bestehende Konfiguration oder lade das Beispiel.",node:"Node",host:"Host / IP",hostOverride:"Host-Override",port:"Port",portOverride:"Port-Override",nodeType:"Node-Typ",maxFps:"Max FPS",refresh:"Refresh alle (s)",advanced:"Erweitert",universes:"Universes",universe:"Universe",universeId:"Universe-ID",outputCorrection:"Output-Korrektur",sendPartial:"Teil-Universe senden",addUniverse:"Universe hinzufügen",addLight:"Lampe hinzufügen",noUniverses:"Noch keine Universes.",noLights:"Keine Lampen in diesem Universe.",remove:"Entfernen",duplicate:"Duplizieren",edit:"Bearbeiten",moveUp:"Nach oben",moveDown:"Nach unten",channelMap:"DMX-Kanalbelegung",channelsUsed:"{used} / 512 Kanäle belegt",overlap:"Überlappung",free:"frei",default:"Standard",editLight:"Lampe bearbeiten",newLight:"Neue Lampe",name:"Name",nameHelper:"Entität: light.{slug}",friendlyName:"Anzeigename",channel:"Startkanal",channelHelper:"Belegt {start}–{end} ({width} Kanal/Kanäle)",type:"Typ",transition:"Übergang (s)",channelSize:"Kanalgröße",byteOrder:"Byte-Reihenfolge",minTemp:"Min. Temperatur",maxTemp:"Max. Temperatur",targetUniverse:"Universe",nextFree:"Nächster freier Kanal",apply:"Übernehmen",channelSetup:"Kanal-Setup",channelSetupHint:"Reihenfolge der DMX-Kanäle dieser Lampe. Baustein anklicken zum Anhängen, per Drag & Drop oder Pfeilen sortieren.",channelSetupDefault:"Leer = Standard ({value})",palette:"Bausteine",staticValue:"Statischer Wert (0–255)",staticToken:"Statischer Wert {value}",add:"Hinzufügen",resetDefault:"Auf Standard zurücksetzen",noChannels:"Keine Kanäle – der Standard wird verwendet.",ch_d:"Dimmer",ch_c:"Kaltweiß (skaliert)",ch_C:"Kaltweiß",ch_h:"Warmweiß (skaliert)",ch_H:"Warmweiß",ch_t:"Temperatur (0 warm → 255 kalt)",ch_T:"Temperatur (255 warm → 0 kalt)",ch_r:"Rot (skaliert)",ch_R:"Rot",ch_g:"Grün (skaliert)",ch_G:"Grün",ch_b:"Blau (skaliert)",ch_B:"Blau",ch_w:"Weiß (skaliert)",ch_W:"Weiß",ch_u:"Farbton",ch_U:"Sättigung",ch_x:"X (CIE xy)",ch_y:"Y (CIE xy)",tabLegacy:"ha-artnet-led 0.x",tabLegacySub:"artnet_led · Lichter",tabDmx:"ha-artnet-led 1.x",tabDmxSub:"dmx · Fixtures, Moving Heads",backendInstalled:"installiert {version}",backendMissing:"nicht installiert",dmxMissing:"ha-artnet-led 1.x (dmx) scheint nicht installiert zu sein. Du kannst die Konfiguration schon vorbereiten; sie wird genutzt, sobald 1.x installiert ist.",dmxForeignBlock:"configuration.yaml enthält bereits einen dmx:-Block. Die Reparatur ersetzt ihn durch das Include (ein Backup wird angelegt).",dmxSuggestMigrate:"ha-artnet-led 1.x ist installiert und du hast eine 0.x-Konfiguration. Mit „Von 0.x migrieren“ kannst du sie übernehmen.",migrateFrom0x:"Von 0.x migrieren…",dmxFixtureErrors:"Einige Fixture-Dateien konnten nicht gelesen werden:",importNothingDmx:"Keine dmx-Konfiguration in der configuration.yaml gefunden.",warningsCount:"{count} Warnung(en)",deployWarnings:"Warnungen (Deploy ist trotzdem möglich):",deployFixturesInstalled:"In den Fixtures-Ordner kopiert: {files}",dmxGeneral:"Allgemein",dmxLibrary:"Fixture-Bibliothek",dmxFolder:"Fixtures-Ordner",dmxFolderHelper:"Relativ zum Config-Ordner · {count} Fixture(s) verfügbar",dmxArtnet:"Art-Net",dmxSacn:"sACN (E1.31)",dmxUniverseCount:"{count} Universe(s)",dmxProtocolSettings:"Protokoll-Einstellungen",dmxRateLimit:"Rate-Limit (s)",dmxSourceName:"Quellname",dmxPriority:"Priorität",dmxInterfaceIp:"Interface-IP",dmxSyncAddress:"Sync-Adresse",dmxTtl:"Multicast-TTL",dmxPreviewData:"Preview-Daten senden",dmxAddArtnetUniverse:"Art-Net-Universe hinzufügen",dmxAddSacnUniverse:"sACN-Universe hinzufügen",dmxNet:"Net",dmxSubnet:"Subnet",dmxCompatibility:"Kompatibilität (Unicast-Ziele)",dmxManualNodes:"Manuelle Nodes (für Nodes ohne ArtPoll-Erkennung)",dmxUnicast:"Unicast-Adressen (statt Multicast)",dmxAddHost:"Host hinzufügen",dmxNoDevices:"Noch keine Fixtures in diesem Universe.",dmxAddDevice:"Fixture hinzufügen",dmxNewDevice:"Neues Fixture",dmxEditDevice:"Fixture bearbeiten",dmxFixture:"Fixture",dmxChooseFixture:"Fixture wählen",dmxBundled:"mitgeliefert",dmxBundledHint:"Mitgeliefertes Fixture – es wird beim Deploy in den Fixtures-Ordner kopiert.",dmxMode:"Modus",dmxStartAddress:"Startadresse",dmxFootprint:"Belegt Kanäle {start}–{end} ({width} Kanäle)",dmxPrefix:"Entity-ID-Präfix",dmxPrefixHelper:"Optional · Entitäten wie number.{prefix}_<kanal>_…",dmxCurve:"Kurve",dmxMin:"Min (0–1)",dmxMax:"Max (0–1)",dmxChannels:"Kanäle dieses Modus ({count})",dmxEntityPreview:"Erzeugt {light} Light-, {number} Number- und {select} Select-Entitäten",dmxAddress:"DMX",dmxChannel:"Kanal",dmxKind:"Entität",kind_number:"number",kind_select:"select",kind_fine:"fein",kind_switching:"umschaltend",kind_empty:"ungenutzt",kind_unknown:"unbekannt",dmxLibrarySubtitle:"Fixtures im Open-Fixture-Library-Format, gespeichert in /config/{folder}",dmxFixtureAdded:"{name} wurde als {file} gespeichert.",dmxOflError:"Open Fixture Library: {error}",dmxUploadError:"Upload fehlgeschlagen: {error}",dmxInstalled:"installiert",dmxFolderMissing:"Der Ordner /config/{folder} existiert noch nicht. Er wird beim ersten Download/Deploy angelegt.",dmxOflTitle:"Fixtures hinzufügen",dmxOflHint:"Durchsuche die Open Fixture Library oder lade eine OFL-JSON-Datei hoch.",dmxOflPlaceholder:"z. B. Hydrabeam, Stairville, ADJ …",dmxSearch:"Suchen",dmxUpload:"JSON hochladen…",dmxDownload:"Herunterladen",dmxOflNoResults:"Keine Fixtures gefunden.",dmxAvailable:"Verfügbare Fixtures ({count})",dmxFilter:"Filtern…",dmxBundledExplain:"„Mitgeliefert“ sind generische Fader dieser Integration; sie werden bei Verwendung in den Ordner kopiert.",migTitle:"Von ha-artnet-led 0.x migrieren",migSubtitle:"Wandelt deine artnet_led-Lichter in dmx-Fixtures mit den generischen Fadern um.",migSummary:"{devices} Licht(er) in {universes} Universe(s) werden übernommen. Fixtures: {fixtures}",migNotes:"Hinweise pro Licht",migReplaces:"Die aktuelle 1.x-Konfiguration im Editor wird ersetzt (rückgängig machbar).",migNextSteps:"Prüfe das Ergebnis und deploye dann. Deine 0.x-Konfiguration bleibt unverändert.",migNothing:"Es gibt keine 0.x-Konfiguration zum Migrieren.",migApply:"Übernehmen",mig_entity_ids_change:"Entity-IDs ändern sich: ha-artnet-led 1.x erzeugt neue Entitäten (z. B. light.<präfix>_…). Passe Automationen, Skripte und Dashboards an.",mig_kinet_unsupported:"Node {host}: KiNET wird von 1.x nicht unterstützt – übersprungen.",mig_sacn_universe_zero:"Node {host}: sACN-Universe 0 ist ungültig – Universe 1 wird verwendet.",mig_binary_as_dimmer:"binary-Licht wird zu einem Dimmer-Kanal.",mig_channel_setup:"eigene Kanalreihenfolge ({channel_setup}) wird nicht unterstützt – Standardreihenfolge.",mig_type_unsupported:"Typ {type} hat kein generisches Fixture – übersprungen.",mig_bit_depth:"kein {bits}-Bit-Modus gefunden – Modus {mode} wird verwendet.",mig_byte_order:"Little-Endian-Byte-Reihenfolge wird nicht unterstützt.",mig_transition:"Standard-Transition wird in 1.x nicht unterstützt.",mig_color_temp_range:"Min./max. Farbtemperatur legt in 1.x das Fixture fest.",err_required:"Pflichtfeld",err_range:"Muss zwischen {low} und {high} liegen",err_choice:"Erlaubt: {choices}",err_temp:"Format wie 2700K",err_setup_char:"'{token}' ist für Typ {type} nicht erlaubt",err_setup_value:"Statische Werte müssen 0–255 sein",err_overflow:"Endet bei Kanal {end} (> 512)",err_overlap:"Kanäle {start}–{end} überlappen mit „{other}“ ({otherStart}–{otherEnd})",err_duplicate:"Doppelt vergeben",err_folder:"Muss ein relativer Ordner innerhalb des Config-Ordners sein",err_prefix:"Nur Kleinbuchstaben, Ziffern und _",err_min_max:"Min muss kleiner als Max sein",err_length:"Max. 63 Zeichen",err_fixture_unknown:"Fixture '{fixture}' ist nicht im Fixtures-Ordner",err_mode_unknown:"Muss einer von diesen sein: {choices}",err_width_estimated:"Die Kanalanzahl dieses Modus konnte nur geschätzt werden"}},Ie=new Set(["range","choice","setup_char","overflow","overlap","fixture_unknown","mode_unknown"]),Fe=(e,t)=>{const i=`err_${t.code}`;return i in Me?Ie.has(t.code)&&!t.params?t.message:e(i,t.params):t.message},Le=["linear","quadratic","cubic","quartic","sine"],Ue="fixtures",je=512,ze=511,Pe=/^[a-z0-9_]+$/,Re=["artnet","sacn"],Be=30,He=.8,Ke=.5,qe="HA sACN Controller",We=100,Ye=0,Je=64,Ge=(e,t)=>e?.find(e=>e.aliases.includes(t)),Ve=(e,t)=>t?e.modes.find(e=>(e.key??e.name)===t):e.modes[0],Ze=(e,t)=>{const i=Ge(t,String(e.fixture??""));if(i)return Ve(i,e.mode)?.width},Xe=(e,t)=>{if("sacn"===t)return String(e.universe);const{net:i=0,subnet:n=0}=e;return i||n?`${i}/${n}/${e.universe}`:String(e.universe)},Qe=e=>Re.flatMap(t=>((e,t)=>e[t].universes)(e,t).flatMap(e=>e.devices)),et=(e,t,i,n=-1)=>{const r=new Array(514).fill(!1);e.devices.forEach((e,i)=>{if(i===n)return;const s=Ze(e,t)??1;for(let t=e.start_address;t<e.start_address+s;t++)t>=1&&t<=je&&(r[t]=!0)});for(let e=1;e+i-1<=je&&e<=ze;e++){let t=!0;for(let n=e;n<e+i;n++)if(r[n]){t=!1,e=n;break}if(t)return e}return 1},tt=(e,t)=>{if(!t.includes(e))return e;const i=e.replace(/\s+\d+$/,"");let n=2;for(;t.includes(`${i} ${n}`);)n++;return`${i} ${n}`},it=e=>"object"==typeof e&&null!==e&&!Array.isArray(e),nt=(e,t)=>{const i=it(e._extra)?{...e._extra}:{};for(const[n,r]of Object.entries(e))"_extra"===n||t.includes(n)||(i[n]=r);return Object.keys(i).length?i:void 0},rt=e=>Array.isArray(e)?e:[],st=e=>{if(null==e||""===e)return;const t="number"==typeof e?e:Number(e);return Number.isFinite(t)?t:void 0},ot=e=>{if(null==e)return;return String(e).trim()||void 0},at=e=>{for(const t of Object.keys(e))void 0===e[t]&&delete e[t];return e},lt=e=>rt(e).filter(it).map(e=>at({host:ot(e.host)??"",port:st(e.port),_extra:nt(e,["host","port"])})),dt=e=>{const t=it(e)?e:{};let i;return"string"==typeof t.output_correction&&t.output_correction.trim()?i={curve:t.output_correction.trim()}:it(t.output_correction)&&(i=at({curve:ot(t.output_correction.curve),min:st(t.output_correction.min),max:st(t.output_correction.max),_extra:nt(t.output_correction,["curve","min","max"])}),Object.keys(i).length||(i=void 0)),at({name:ot(t.name)??"",start_address:st(t.start_address)??1,fixture:ot(t.fixture)??"",mode:ot(t.mode),entity_id_prefix:ot(t.entity_id_prefix),output_correction:i,_extra:nt(t,["name","start_address","fixture","mode","entity_id_prefix","output_correction"])})},ct=e=>Boolean(e&&(e.artnet.universes.length||e.sacn.universes.length)),ut=["artnet-direct","artnet-controller","sacn","kinet"],pt=["fixed","binary","dimmer","color_temp","rgb","rgbw","rgbww","xy"],ht=["linear","quadratic","cubic","quadruple"],mt={"8bit":1,"16bit":2,"24bit":3,"32bit":4},ft=["big","little"],gt=["color_temp","rgbww"],_t={fixed:"",binary:"",dimmer:"d",color_temp:"dcChHtT",rgb:"drRgGbBuUwW",rgbw:"drRgGbBuUwW",rgbww:"dcChHtTrRgGbBuU",xy:"dxy"},vt={fixed:[255],binary:"d",dimmer:"d",color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},bt="artnet-direct",xt=25,yt=120,$t=6454,wt=512,kt=/^\d+[kK]$/,At=e=>e.type||"dimmer",Ct=e=>"dimmer"!==e&&"binary"!==e,St=e=>gt.includes(e),Et=e=>null==e||""===e?[]:Array.isArray(e)?[...e]:String(e).split(""),Nt=e=>{if(e.length)return e.every(e=>"string"==typeof e&&1===e.length)?e.join(""):[...e]},Ot=e=>mt[e.channel_size||"8bit"]??1,Tt=e=>(e=>{const t=At(e);if("dimmer"===t||"binary"===t)return 1;const i=e.channel_setup||vt[t]||"d";return Math.max(1,Et(i).length)})(e)*Ot(e),Mt=e=>{const t=Number(e.channel)||1;return[t,t+Tt(e)-1]},Dt=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,""),It=(e,t,i)=>{const n=e.devices.filter((e,t)=>t!==i).map(e=>Mt(e)).sort((e,t)=>e[0]-t[0]);let r=1;for(const[e,i]of n){if(r+t-1<e)break;i>=r&&(r=i+1)}return Math.min(r,wt)},Ft=(e,t)=>{const i=new Set(t.map(Dt));if(e&&!i.has(Dt(e)))return e;const n=(e||"light").replace(/_\d+$/,"");for(let e=2;;e++){const t=`${n}_${e}`;if(!i.has(Dt(t)))return t}},Lt=e=>{const t=At(e),i={...e};if(St(t)||(delete i.min_temp,delete i.max_temp),Ct(t)){if(void 0!==i.channel_setup){const e=_t[t];Et(i.channel_setup).every(t=>"number"==typeof t?t>=0&&t<=255:e.includes(t))||delete i.channel_setup}}else delete i.channel_setup;return 1===(mt[i.channel_size||"8bit"]??1)&&delete i.byte_order,i},Ut=e=>structuredClone(e),jt=e=>e.nodes.flatMap(e=>e.universes.flatMap(e=>e.devices.map(e=>e.name))),zt=e=>({id:e.universes.length?Math.max(...e.universes.map(e=>e.id))+1:0,send_partial_universe:!0,devices:[]}),Pt=()=>({host:"",node_type:"artnet-direct",max_fps:25,universes:[zt({universes:[]})]}),Rt=(e,t,i)=>{if(i<0||i>=e.length)return;const[n]=e.splice(t,1);e.splice(i,0,n)},Bt=(e,t,i,n)=>({path:e,code:t,message:i,...n?{params:n}:{}}),Ht=(e,t,i,n,r)=>{null!=t&&(!(e=>"number"==typeof e&&Number.isFinite(e))(t)||t<n||t>r)&&e.push(Bt(i,"range",`must be between ${n} and ${r}`,{low:n,high:r}))},Kt=(e,t,i,n)=>{null!=t&&(n.includes(t)||e.push(Bt(i,"choice",`must be one of: ${n.join(", ")}`,{choices:n.join(", ")})))},qt=e=>{const t=[],i=new Set;return(e.nodes??[]).forEach((e,n)=>{const r=["nodes",n];String(e.host??"").trim()||t.push(Bt([...r,"host"],"required","host is required")),Kt(t,e.node_type,[...r,"node_type"],ut),Ht(t,e.port,[...r,"port"],1,65535),Ht(t,e.port_override,[...r,"port_override"],1,65535),Ht(t,e.max_fps,[...r,"max_fps"],1,50),Ht(t,e.refresh_every,[...r,"refresh_every"],0,9999),e.universes?.length||t.push(Bt([...r,"universes"],"required","at least one universe"));const s=new Set;(e.universes??[]).forEach((e,n)=>{const o=[...r,"universes",n];Ht(t,e.id,[...o,"id"],0,1024),s.has(e.id)&&t.push(Bt([...o,"id"],"duplicate","duplicate universe id")),s.add(e.id),Kt(t,e.output_correction,[...o,"output_correction"],ht);const a=[];(e.devices??[]).forEach((e,n)=>{const r=[...o,"devices",n];((e,t,i)=>{const n=At(t);if(String(t.name??"").trim()||e.push(Bt([...i,"name"],"required","name is required")),Kt(e,t.type,[...i,"type"],pt),Ht(e,t.channel,[...i,"channel"],1,wt),Ht(e,t.transition,[...i,"transition"],0,999),Kt(e,t.output_correction,[...i,"output_correction"],ht),Kt(e,t.channel_size,[...i,"channel_size"],Object.keys(mt)),Kt(e,t.byte_order,[...i,"byte_order"],ft),St(n))for(const n of["min_temp","max_temp"]){const r=t[n];null==r||kt.test(String(r))||e.push(Bt([...i,n],"temp","must look like 2700K"))}const r=t.channel_setup,s=_t[n];if(null!=r&&void 0!==s&&"binary"!==n){const t=Array.isArray(r)?r:String(r).split("");for(const r of t)"number"==typeof r?(r<0||r>255)&&e.push(Bt([...i,"channel_setup"],"setup_value","static values: 0-255")):s.includes(r)||e.push(Bt([...i,"channel_setup"],"setup_char",`'${r}' is not allowed for type ${n}`,{token:r,type:n}))}const o=t.channel;if(Number.isInteger(o)&&o>=1&&o<=wt){const[,n]=Mt(t);n>wt&&e.push(Bt([...i,"channel"],"overflow",`device ends at channel ${n} (> 512)`,{end:n}))}})(t,e,r);const s=Dt(String(e.name??""));if(s&&(i.has(s)?t.push(Bt([...r,"name"],"duplicate","duplicate light name")):i.add(s)),Number.isInteger(e.channel)){const[i,n]=Mt(e);for(const[e,s,o]of a)if(i<=s&&e<=n){t.push(Bt([...r,"channel"],"overlap",`channels ${i}-${n} overlap with '${o}' (${e}-${s})`,{start:i,end:n,other:o,otherStart:e,otherEnd:s}));break}a.push([i,n,String(e.name??"")])}})})}),t},Wt=e=>e.join(".");class Yt{constructor(e=[]){this.issues=e,this.exact=new Map,this.nested=new Map;for(const t of e){const e=Wt(t.path);this.exact.set(e,[...this.exact.get(e)??[],t]);for(let e=0;e<=t.path.length;e++){const i=Wt(t.path.slice(0,e));this.nested.set(i,[...this.nested.get(i)??[],t])}}}at(e){return this.exact.get(Wt(e))??[]}within(e){return this.nested.get(Wt(e))??[]}}const Jt=e=>`hsl(${137.508*e%360} 65% 55%)`;class Gt extends ae{render(){const e=this.occupancy??(this.universe?(e=>{const t=new Map;return e.devices.forEach((e,i)=>{const[n,r]=Mt(e);for(let s=n;s<=Math.min(r,wt);s++){const o=t.get(s)??[];o.push({index:i,name:e.name,start:n,end:r}),t.set(s,o)}}),t})(this.universe):new Map),t=[];for(let i=1;i<=wt;i++){const n=e.get(i)??[],r=n.length>1,s=n[0],o=n.length?`${i}: ${n.map(e=>`${e.name||"?"} (${e.start}–${e.end})`).join(", ")}${r?` – ${this.t("overlap")}`:""}`:`${i}: ${this.t("free")}`,a=s&&!r?`background:${Jt(s.index)}`:"";t.push(H`<div
        class="cell ${s?"used":""} ${r?"overlap":""} ${s?.start===i?"start":""}"
        style=${a}
        title=${o}
        @click=${()=>s&&this.dispatchEvent(new CustomEvent("device-click",{detail:{index:s.index}}))}
      ></div>`)}return H`
      <div class="map" role="img" aria-label=${this.t("channelMap")}>${t}</div>
      <div class="legend">${this.t("channelsUsed",{used:e.size})}</div>
    `}static{this.styles=o`
    :host {
      display: block;
    }
    .map {
      display: grid;
      grid-template-columns: repeat(32, minmax(0, 1fr));
      gap: 1px;
    }
    .cell {
      height: 10px;
      border-radius: 2px;
      background: var(--card-background-color, #fff);
      box-shadow: inset 0 0 0 1px var(--divider-color, rgba(127, 127, 127, 0.25));
    }
    .cell.used {
      cursor: pointer;
      box-shadow: none;
    }
    .cell.start {
      box-shadow: inset 2px 0 0 rgba(0, 0, 0, 0.45);
    }
    .cell.overlap {
      background: var(--error-color, #db4437);
      background-image: repeating-linear-gradient(
        45deg,
        transparent 0 2px,
        rgba(255, 255, 255, 0.5) 2px 4px
      );
    }
    .legend {
      margin-top: 4px;
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }
    @media (max-width: 600px) {
      .map {
        grid-template-columns: repeat(16, minmax(0, 1fr));
      }
    }
  `}}e([ue({attribute:!1})],Gt.prototype,"universe",void 0),e([ue({attribute:!1})],Gt.prototype,"occupancy",void 0),e([ue({attribute:!1})],Gt.prototype,"t",void 0),xe("artnetui-channel-map",Gt);const Vt=(e,t,i,n,r="error")=>({path:e,code:t,message:i,severity:r,...n?{params:n}:{}}),Zt=e=>"number"==typeof e&&Number.isFinite(e),Xt=(e,t,i,n,r)=>null==t||(!(!Zt(t)||t<n||t>r)||(e.push(Vt(i,"range",`must be between ${n} and ${r}`,{low:n,high:r})),!1)),Qt=(e,t,i)=>{(t??[]).forEach((t,n)=>{String(t.host??"").trim()||e.push(Vt([...i,n,"host"],"required","host is required")),Xt(e,t.port,[...i,n,"port"],1,65535)})},ei=(e,t,i,n)=>{String(t.name??"").trim()||e.push(Vt([...i,"name"],"required","name is required"));const r=Xt(e,t.start_address,[...i,"start_address"],1,ze),s=t.entity_id_prefix;null==s||Pe.test(String(s))||e.push(Vt([...i,"entity_id_prefix"],"prefix","use lowercase letters, digits and _"));const o=t.output_correction;if(o&&Object.keys(o).length){const t=o.curve;null==t||Le.includes(t)||e.push(Vt([...i,"output_correction","curve"],"choice",`must be one of: ${Le.join(", ")}`,{choices:Le.join(", ")}));const n=Xt(e,o.min,[...i,"output_correction","min"],0,1),r=Xt(e,o.max,[...i,"output_correction","max"],0,1),{min:s,max:a}=o;n&&r&&Zt(s)&&Zt(a)&&s>=a&&e.push(Vt([...i,"output_correction","min"],"min_max","min must be below max"))}const a=String(t.fixture??"").trim();if(!a)return void e.push(Vt([...i,"fixture"],"required","fixture is required"));if(!n)return;const l=Ge(n,a);if(!l)return void e.push(Vt([...i,"fixture"],"fixture_unknown",`fixture '${a}' is not in the fixtures folder`,{fixture:a},"warning"));const d=Ve(l,t.mode);if(!d){const t=l.modes.map(e=>e.key??e.name).join(", ");return void e.push(Vt([...i,"mode"],"mode_unknown",`must be one of: ${t}`,{choices:t}))}!1===d.exact&&e.push(Vt([...i,"mode"],"width_estimated","channel count of this mode could only be estimated",void 0,"warning"));const c=d.width,u=t.start_address;if(r&&Number.isInteger(u)&&u+c-1>je){const t=u+c-1;e.push(Vt([...i,"start_address"],"overflow",`device ends at channel ${t} (> 512)`,{end:t}))}return c},ti=(e,t)=>{const i=[];String(e.fixtures_folder??"").trim()?(e=>{const t=e.trim().replace(/\\/g,"/");return!(!t||t.startsWith("/")||/^[A-Za-z]:/.test(t)||t.split("/").includes(".."))})(String(e.fixtures_folder))||i.push(Vt(["fixtures_folder"],"folder","must stay inside the config folder")):i.push(Vt(["fixtures_folder"],"required","folder is required")),Xt(i,e.max_fps,["max_fps"],1,43);for(const t of Re){const n=e[t]??{};Xt(i,n.refresh_every,[t,"refresh_every"],0,9999),Xt(i,n.rate_limit,[t,"rate_limit"],0,9999)}const n=e.sacn??{};Xt(i,n.priority,["sacn","priority"],0,200),Xt(i,n.multicast_ttl,["sacn","multicast_ttl"],1,255),Xt(i,n.sync_address,["sacn","sync_address"],0,63999),String(n.source_name??"").length>63&&i.push(Vt(["sacn","source_name"],"length","max. 63 characters"));const r=new Set,s=new Set;for(const n of Re){const o=new Set;(e[n]?.universes??[]).forEach((e,a)=>{const l=[n,"universes",a];let d,c;if("artnet"===n){const t=e;d=[Xt(i,t.net,[...l,"net"],0,15),Xt(i,t.subnet,[...l,"subnet"],0,15),Xt(i,t.universe,[...l,"universe"],0,511)].every(Boolean),c=`${t.net??0}/${t.subnet??0}/${t.universe}`,Qt(i,t.manual_nodes,[...l,"manual_nodes"])}else{const t=e;d=Xt(i,t.universe,[...l,"universe"],1,63999),c=String(t.universe),Qt(i,t.unicast_addresses,[...l,"unicast_addresses"])}d&&o.has(c)&&i.push(Vt([...l,"universe"],"duplicate","duplicate universe")),o.add(c);const u=[];(e.devices??[]).forEach((e,n)=>{const o=[...l,"devices",n],a=ei(i,e,o,t),d=String(e.name??"").trim();d&&(r.has(d)&&i.push(Vt([...o,"name"],"duplicate","duplicate name")),r.add(d));const c=e.entity_id_prefix;c&&(s.has(c)&&i.push(Vt([...o,"entity_id_prefix"],"duplicate","duplicate prefix")),s.add(c));const p=e.start_address;if(a&&Number.isInteger(p)&&p>=1&&p<=ze){const e=p+a-1;for(const[t,n,r]of u)if(p<=n&&t<=e){i.push(Vt([...o,"start_address"],"overlap",`channels ${p}-${e} overlap with '${r}' (${t}-${n})`,{start:p,end:e,other:r,otherStart:t,otherEnd:n}));break}u.push([p,e,d])}})})}return i},ii=e=>e.filter(e=>"error"===(e.severity??"error")),ni={number:"kind_number",select:"kind_select",fine:"kind_fine",switching:"kind_switching",empty:"kind_empty",unknown:"kind_unknown"};class ri extends ae{constructor(){super(...arguments),this._target="artnet:0"}willUpdate(e){(e.has("device")||e.has("location"))&&(this._draft=structuredClone(this.device),this._target=`${this.location.protocol}:${this.location.universe}`)}get _targetLoc(){const[e,t]=this._target.split(":");return{protocol:e,universe:Number(t)}}_issues(){const e=structuredClone(this.config),{protocol:t,universe:i,device:n}=this.location;n>=0&&e[t].universes[i].devices.splice(n,1);const r=this._targetLoc,s=e[r.protocol].universes[r.universe].devices,o=r.protocol===t&&r.universe===i&&n>=0?n:s.length;return s.splice(o,0,this._draft),{index:new Yt(ti(e,this.fixtures)),path:[r.protocol,"universes",r.universe,"devices",o]}}_set(e,t){const i={...this._draft};void 0===t?delete i[e]:i[e]=t,this._draft=i}_setCorrection(e,t){const i={...this._draft.output_correction??{}};void 0===t?delete i[e]:i[e]=t,this._set("output_correction",Object.keys(i).length?i:void 0)}_setFixture(e){const t={...this._draft,fixture:e??""},i=Ge(this.fixtures,t.fixture);i&&t.mode&&Ve(i,t.mode)||delete t.mode,this._draft=t}_width(){const e=Ge(this.fixtures,this._draft.fixture);return e&&Ve(e,this._draft.mode)?.width||1}_nextFree(){const{protocol:e,universe:t,device:i}=this.location,n=this._targetLoc,r=n.protocol===e&&n.universe===t?i:-1,s=this.config[n.protocol].universes[n.universe];this._set("start_address",et(s,this.fixtures,this._width(),r))}_save(){this.dispatchEvent(new CustomEvent("device-save",{detail:{device:this._draft,from:this.location,to:this._targetLoc}}))}_renderChannels(e,t){const i=this.t,n=e.channels??[];if(!n.length)return q;const r=e.entities;return H`
      <details class="channels" open>
        <summary>${i("dmxChannels",{count:e.width})}</summary>
        ${r?H`<p class="muted">
              ${i("dmxEntityPreview",{light:r.light,number:r.number,select:r.select})}
            </p>`:q}
        <table>
          <thead>
            <tr><th>${i("dmxAddress")}</th><th>${i("dmxChannel")}</th><th>${i("dmxKind")}</th></tr>
          </thead>
          <tbody>
            ${n.map((e,n)=>H`<tr class=${e.kind}>
                <td>${Number.isInteger(t)?t+n:n+1}</td>
                <td>${e.name??"—"}${e.type?H` <span class="muted">(${e.type})</span>`:q}</td>
                <td><span class="kind ${e.kind}">${i(ni[e.kind]??"kind_unknown")}</span></td>
              </tr>`)}
          </tbody>
        </table>
      </details>
    `}render(){if(!this._draft)return q;const e=this.t,t=this._draft,{index:i,path:n}=this._issues(),r=(t,r)=>i.at([...n,t]).filter(e=>(e.severity??"error")===r).map(t=>Fe(e,t)),s=e=>r(e,"error"),o=e=>r(e,"warning"),a=t.output_correction??{},l=Ge(this.fixtures,t.fixture),d=l?Ve(l,t.mode):void 0,c=d?.width,u=t.start_address,p=(t.name||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/ß/g,"ss").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");const h=(this.fixtures??[]).map(t=>({value:t.key,label:`${t.name}${t.key!==t.name?` (${t.key})`:""}${t.installed?"":` – ${e("dmxBundled")}`}`})),m=["artnet","sacn"].flatMap(t=>this.config[t].universes.map((i,n)=>({value:`${t}:${n}`,label:`${e("artnet"===t?"dmxArtnet":"dmxSacn")} · ${e("universe")} ${Xe(i,t)}`})));return H`
      <artnetui-dialog
        open
        wide
        .heading=${this.location.device<0?e("dmxNewDevice"):e("dmxEditDevice")}
        .closeLabel=${e("close")}
      >
        <div class="grid">
          ${Se({label:e("name"),required:!0,value:t.name,errors:s("name"),onChange:e=>this._set("name",e??"")})}
          ${m.length>1?Ne({label:e("universe"),value:this._target,options:m,onChange:e=>e&&(this._target=e)}):q}
        </div>
        <div class="fixture-row">
          ${Ne({label:e("dmxFixture"),required:!0,value:t.fixture||void 0,options:h,emptyLabel:t.fixture?void 0:`— ${e("dmxChooseFixture")} —`,errors:s("fixture"),warnings:o("fixture"),helper:l&&!l.installed?e("dmxBundledHint"):void 0,onChange:e=>this._setFixture(e)})}
          <button @click=${()=>this.dispatchEvent(new CustomEvent("open-library"))}>
            ${ke("mdi:bookshelf")} ${e("dmxLibrary")}
          </button>
        </div>
        <div class="grid">
          ${l?Ne({label:e("dmxMode"),value:t.mode,options:l.modes.map(e=>({value:e.key??e.name,label:`${e.name} (${e.width} ch)`})),emptyLabel:`${e("default")} (${l.modes[0]?.name??"—"})`,errors:s("mode"),warnings:o("mode"),onChange:e=>this._set("mode",e)}):q}
          <div class="with-button">
            ${Ee({label:e("dmxStartAddress"),required:!0,value:t.start_address,min:1,max:ze,errors:s("start_address"),helper:c?e("dmxFootprint",{start:u,end:Number.isInteger(u)?Math.min(u+c-1,je):"?",width:c}):void 0,onChange:e=>this._set("start_address",e??1)})}
            <button class="small" @click=${this._nextFree}>${e("nextFree")}</button>
          </div>
          ${Se({label:e("dmxPrefix"),value:t.entity_id_prefix,placeholder:p,errors:s("entity_id_prefix"),helper:e("dmxPrefixHelper",{prefix:t.entity_id_prefix||p||"…"}),onChange:e=>this._set("entity_id_prefix",e)})}
        </div>
        <details ?open=${Boolean(t.output_correction)}>
          <summary>${e("outputCorrection")}</summary>
          <div class="grid">
            ${Ne({label:e("dmxCurve"),value:a.curve,options:Le,emptyLabel:`${e("default")} (linear)`,errors:s("output_correction.curve"),onChange:e=>this._setCorrection("curve",e)})}
            ${Ee({label:e("dmxMin"),value:a.min,min:0,max:1,step:"any",placeholder:"0",errors:i.at([...n,"output_correction","min"]).map(t=>Fe(e,t)),onChange:e=>this._setCorrection("min",e)})}
            ${Ee({label:e("dmxMax"),value:a.max,min:0,max:1,step:"any",placeholder:"1",errors:i.at([...n,"output_correction","max"]).map(t=>Fe(e,t)),onChange:e=>this._setCorrection("max",e)})}
          </div>
        </details>
        ${d?this._renderChannels(d,u):q}
        <button slot="actions" @click=${()=>this.dispatchEvent(new CustomEvent("closed"))}>${e("cancel")}</button>
        <button slot="actions" class="primary" @click=${this._save}>${e("apply")}</button>
      </artnetui-dialog>
    `}static{this.styles=[$e,o`
      :host {
        display: contents;
      }
      .grid,
      .fixture-row,
      details {
        margin-bottom: 12px;
      }
      .fixture-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
        align-items: start;
      }
      .fixture-row button {
        margin-top: 21px;
      }
      .with-button {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 6px;
        align-items: start;
      }
      .with-button button {
        margin-top: 21px;
        white-space: nowrap;
      }
      details > summary {
        cursor: pointer;
        color: var(--alu-muted);
        font-size: 0.85rem;
        padding: 4px 0;
      }
      details > .grid {
        margin-top: 8px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.85rem;
      }
      th,
      td {
        text-align: left;
        padding: 4px 8px;
        border-bottom: var(--alu-border);
      }
      th {
        color: var(--alu-muted);
        font-weight: 500;
      }
      tr.empty td,
      tr.fine td {
        color: var(--alu-muted);
      }
      .kind {
        font-size: 0.75rem;
        padding: 1px 8px;
        border-radius: 10px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .kind.number {
        background: rgba(3, 169, 244, 0.18);
      }
      .kind.select,
      .kind.switching {
        background: rgba(156, 39, 176, 0.18);
      }
      .kind.unknown {
        background: rgba(255, 166, 0, 0.25);
      }
      @media (max-width: 600px) {
        .fixture-row {
          grid-template-columns: 1fr;
        }
        .fixture-row button {
          margin-top: 0;
        }
      }
    `]}}e([ue({attribute:!1})],ri.prototype,"t",void 0),e([ue({attribute:!1})],ri.prototype,"config",void 0),e([ue({attribute:!1})],ri.prototype,"fixtures",void 0),e([ue({attribute:!1})],ri.prototype,"location",void 0),e([ue({attribute:!1})],ri.prototype,"device",void 0),e([pe()],ri.prototype,"_draft",void 0),e([pe()],ri.prototype,"_target",void 0),xe("artnetui-dmx-device-dialog",ri);const si=e=>"error"===(e.severity??"error");class oi extends ae{constructor(){super(...arguments),this.issues=new Yt}_commit(e){const t=Ut(this.config);e(t),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_errors(e){return this.issues.at(e).filter(si).map(e=>Fe(this.t,e))}_warnings(e){return this.issues.at(e).filter(e=>!si(e)).map(e=>Fe(this.t,e))}_openLibrary(){this.dispatchEvent(new CustomEvent("open-library"))}_newDevice(e){const t=e.devices[e.devices.length-1],i=(t&&Ge(this.fixtures,t.fixture))??Ge(this.fixtures,"RGB")??this.fixtures?.[0],n=t&&i===Ge(this.fixtures,t.fixture)?t.mode:void 0,r=i&&Ve(i,n)?.width||1,s=Qe(this.config).map(e=>e.name);return{name:tt(i?.name??"Fixture",s),start_address:et(e,this.fixtures,r),fixture:i?.key??"",...n?{mode:n}:{}}}_openDevice(e){const t=this.config[e.protocol].universes[e.universe],i=e.device>=0?Ut(t.devices[e.device]):this._newDevice(t);this._editing={location:e,device:i}}_saveDevice(e){const{device:t,from:i,to:n}=e.detail;this._commit(e=>{const r=e[i.protocol].universes[i.universe].devices,s=e[n.protocol].universes[n.universe].devices;i.device<0?s.push(t):i.protocol===n.protocol&&i.universe===n.universe?r[i.device]=t:(r.splice(i.device,1),s.push(t))}),this._editing=void 0}_duplicateDevice(e,t){const i=Ze(t,this.fixtures)??1,n=Qe(this.config).map(e=>e.name),r={...Ut(t),name:tt(t.name||"Fixture",n),start_address:et(e,this.fixtures,i)};return delete r.entity_id_prefix,r}_renderDevice(e,t,i,n,r){const s=this.t,o=[e,"universes",t,"devices",i],a=this.issues.within(o),l=a.filter(si),d=a.filter(e=>!si(e)),c=Ge(this.fixtures,n.fixture),u=c?Ve(c,n.mode):void 0,p=u?.width,h=n.start_address,m=p&&p>1?`${h}–${h+p-1}`:`${h}`,f=this.config[e].universes[t],g=u?.entities;return H`
      <li class="device ${l.length?"invalid":d.length?"warning":""}">
        <span class="swatch" style="background:${Jt(i)}"></span>
        <button class="device-main" @click=${()=>this._openDevice({protocol:e,universe:t,device:i})} title=${s("edit")}>
          ${ke(g&&(g.select||g.number>4)?"mdi:spotlight-beam":"mdi:lightbulb")}
          <span class="device-text">
            <span class="device-name">${n.name||"—"}</span>
            <span class="device-meta">
              ${c?.name??n.fixture??"?"}${u?` · ${u.name}`:""} · ${m}
              ${p?`(${p} ch)`:q}
              ${n.entity_id_prefix?H` · <code>${n.entity_id_prefix}</code>`:q}
            </span>
            ${l.map(e=>H`<span class="device-error">${Fe(s,e)}</span>`)}
            ${d.map(e=>H`<span class="device-warning">${Fe(s,e)}</span>`)}
          </span>
        </button>
        <span class="device-actions">
          <button class="icon" title=${s("moveUp")} aria-label=${s("moveUp")} ?disabled=${0===i}
            @click=${()=>this._commit(n=>Rt(n[e].universes[t].devices,i,i-1))}>
            ${ke("mdi:arrow-up")}
          </button>
          <button class="icon" title=${s("moveDown")} aria-label=${s("moveDown")} ?disabled=${i===r-1}
            @click=${()=>this._commit(n=>Rt(n[e].universes[t].devices,i,i+1))}>
            ${ke("mdi:arrow-down")}
          </button>
          <button class="icon" title=${s("duplicate")} aria-label=${s("duplicate")}
            @click=${()=>this._commit(r=>r[e].universes[t].devices.splice(i+1,0,this._duplicateDevice(f,n)))}>
            ${ke("mdi:content-copy")}
          </button>
          <button class="icon danger" title=${s("remove")} aria-label=${s("remove")}
            @click=${()=>this._commit(n=>n[e].universes[t].devices.splice(i,1))}>
            ${ke("mdi:delete-outline")}
          </button>
        </span>
      </li>
    `}_setUniverse(e,t,i,n){this._commit(r=>{const s=r[e].universes[t];void 0===n?delete s[i]:s[i]=n})}_renderHosts(e,t,i,n,r){const s=this.t,o=[e,"universes",t,i],a=n=>this._commit(r=>{const s=r[e].universes[t];s[i]=s[i]??[],n(s[i])});return H`
      <div class="hosts">
        <span class="label">${s("manual_nodes"===i?"dmxManualNodes":"dmxUnicast")}</span>
        ${n.map((e,t)=>H`<div class="host-row">
            ${Se({label:s("host"),required:!0,value:e.host,placeholder:"192.168.0.10",errors:this._errors([...o,t,"host"]),onChange:e=>a(i=>i[t].host=e??"")})}
            ${Ee({label:s("port"),value:e.port,min:1,max:65535,placeholder:String(r),errors:this._errors([...o,t,"port"]),onChange:e=>a(i=>{void 0===e?delete i[t].port:i[t].port=e})})}
            <button class="icon danger" title=${s("remove")} aria-label=${s("remove")}
              @click=${()=>a(e=>e.splice(t,1))}>
              ${ke("mdi:delete-outline")}
            </button>
          </div>`)}
        <div><button class="small" @click=${()=>a(e=>e.push({host:""}))}>${ke("mdi:plus")} ${s("dmxAddHost")}</button></div>
      </div>
    `}_renderUniverse(e,t,i){const n=this.t,r=[e,"universes",i],s=this.issues.within(r).filter(si).length,o=((e,t)=>{const i=new Map;return e.devices.forEach((e,n)=>{const r=Ze(e,t)??1,s=e.start_address;if(!Number.isInteger(s)||s<1)return;const o=s+r-1;for(let t=s;t<=Math.min(o,je);t++){const r=i.get(t)??[];r.push({index:n,name:e.name,start:s,end:o}),i.set(t,r)}}),i})(t,this.fixtures),a="artnet"===e?t:void 0,l="sacn"===e?t:void 0;return H`
      <section class="universe">
        <header>
          <h3>${n("universe")} ${Xe(t,e)}</h3>
          ${s?H`<span class="badge">${s}</span>`:q}
          <span class="spacer"></span>
          <button class="icon danger" title=${n("remove")} aria-label=${n("remove")}
            @click=${()=>this._commit(t=>t[e].universes.splice(i,1))}>
            ${ke("mdi:delete-outline")}
          </button>
        </header>
        <div class="grid">
          ${a?H`
                ${Ee({label:n("dmxNet"),value:a.net??0,min:0,max:15,errors:this._errors([...r,"net"]),onChange:t=>this._setUniverse(e,i,"net",t??0)})}
                ${Ee({label:n("dmxSubnet"),value:a.subnet??0,min:0,max:15,errors:this._errors([...r,"subnet"]),onChange:t=>this._setUniverse(e,i,"subnet",t??0)})}
                ${Ee({label:n("universe"),required:!0,value:a.universe,min:0,max:511,errors:this._errors([...r,"universe"]),onChange:t=>this._setUniverse(e,i,"universe",t??0)})}
                ${Oe({label:n("sendPartial"),value:a.send_partial_universe??!0,onChange:t=>this._setUniverse(e,i,"send_partial_universe",!!t&&void 0)})}
              `:Ee({label:n("universe"),required:!0,value:t.universe,min:1,max:63999,errors:this._errors([...r,"universe"]),onChange:t=>this._setUniverse(e,i,"universe",t??1)})}
        </div>
        <details ?open=${Boolean((a?.manual_nodes??l?.unicast_addresses??[]).length)}>
          <summary>${n("dmxCompatibility")}</summary>
          ${a?this._renderHosts(e,i,"manual_nodes",a.manual_nodes??[],6454):this._renderHosts(e,i,"unicast_addresses",l?.unicast_addresses??[],5568)}
        </details>
        ${t.devices.length?H`
              <details class="map">
                <summary>${n("channelMap")}</summary>
                <artnetui-channel-map
                  .occupancy=${o}
                  .t=${n}
                  @device-click=${t=>this._openDevice({protocol:e,universe:i,device:t.detail.index})}
                ></artnetui-channel-map>
              </details>
              <ul class="devices">
                ${t.devices.map((n,r)=>this._renderDevice(e,i,r,n,t.devices.length))}
              </ul>
            `:H`<div class="empty">${n("dmxNoDevices")}</div>`}
        <div class="row">
          <button @click=${()=>this._openDevice({protocol:e,universe:i,device:-1})}>
            ${ke("mdi:plus")} ${n("dmxAddDevice")}
          </button>
        </div>
      </section>
    `}_setProtocol(e,t,i){this._commit(n=>{const r=n[e];void 0===i?delete r[t]:r[t]=i})}_renderProtocol(e){const t=this.t,i=this.config[e],n=t=>this._errors([e,t]),r=H`
      ${Ee({label:t("refresh"),value:i.refresh_every,min:0,max:9999,step:"any",placeholder:String(He),errors:n("refresh_every"),onChange:t=>this._setProtocol(e,"refresh_every",t)})}
      ${Ee({label:t("dmxRateLimit"),value:i.rate_limit,min:0,max:9999,step:"any",placeholder:String(Ke),errors:n("rate_limit"),onChange:t=>this._setProtocol(e,"rate_limit",t)})}
    `,s="sacn"===e?this.config.sacn:void 0,o=this.issues.within([e]).filter(si).length;return H`
      <section class="protocol">
        <header>
          <h2>${t("artnet"===e?"dmxArtnet":"dmxSacn")}</h2>
          ${o?H`<span class="badge">${o}</span>`:q}
          <span class="spacer"></span>
          <span class="muted">${t("dmxUniverseCount",{count:i.universes.length})}</span>
        </header>
        <details ?open=${this.issues.within([e]).some(e=>2===e.path.length)}>
          <summary>${t("dmxProtocolSettings")}</summary>
          <div class="grid">
            ${s?H`
                  ${Se({label:t("dmxSourceName"),value:s.source_name,placeholder:qe,errors:n("source_name"),onChange:t=>this._setProtocol(e,"source_name",t)})}
                  ${Ee({label:t("dmxPriority"),value:s.priority,min:0,max:200,placeholder:String(We),errors:n("priority"),onChange:t=>this._setProtocol(e,"priority",t)})}
                  ${Se({label:t("dmxInterfaceIp"),value:s.interface_ip,placeholder:"0.0.0.0",errors:n("interface_ip"),onChange:t=>this._setProtocol(e,"interface_ip",t)})}
                  ${Ee({label:t("dmxSyncAddress"),value:s.sync_address,min:0,max:63999,placeholder:String(Ye),errors:n("sync_address"),onChange:t=>this._setProtocol(e,"sync_address",t)})}
                  ${Ee({label:t("dmxTtl"),value:s.multicast_ttl,min:1,max:255,placeholder:String(Je),errors:n("multicast_ttl"),onChange:t=>this._setProtocol(e,"multicast_ttl",t)})}
                `:q}
            ${r}
            ${s?Oe({label:t("dmxPreviewData"),value:s.enable_preview_data,onChange:t=>this._setProtocol(e,"enable_preview_data",t||void 0)}):q}
          </div>
        </details>
        <div class="universes">
          ${i.universes.map((t,i)=>this._renderUniverse(e,t,i))}
        </div>
        <div class="row">
          <button
            @click=${()=>this._commit(t=>"artnet"===e?t.artnet.universes.push((e=>{const t=new Set(e.artnet.universes.map(e=>`${e.net??0}/${e.subnet??0}/${e.universe}`));let i=0;for(;t.has(`0/0/${i}`)&&i<511;)i++;return{net:0,subnet:0,universe:i,manual_nodes:[],devices:[]}})(t)):t.sacn.universes.push((e=>{const t=new Set(e.sacn.universes.map(e=>e.universe));let i=1;for(;t.has(i)&&i<63999;)i++;return{universe:i,unicast_addresses:[],devices:[]}})(t)))}
          >
            ${ke("mdi:plus")} ${t("artnet"===e?"dmxAddArtnetUniverse":"dmxAddSacnUniverse")}
          </button>
        </div>
      </section>
    `}_renderGeneral(){const e=this.t;return H`
      <section>
        <header>
          <h2>${e("dmxGeneral")}</h2>
        </header>
        <div class="grid">
          ${Se({label:e("dmxFolder"),required:!0,value:this.config.fixtures_folder,placeholder:Ue,errors:this._errors(["fixtures_folder"]),warnings:this._warnings(["fixtures_folder"]),helper:e("dmxFolderHelper",{count:this.fixtures?.length??0}),onChange:e=>this._commit(t=>t.fixtures_folder=e??Ue)})}
          ${Ee({label:e("maxFps"),value:this.config.max_fps,min:1,max:43,placeholder:String(Be),errors:this._errors(["max_fps"]),onChange:e=>this._commit(t=>{void 0===e?delete t.max_fps:t.max_fps=e})})}
        </div>
      </section>
    `}render(){const e=this.t;return H`
      ${this._renderGeneral()} ${this._renderProtocol("artnet")} ${this._renderProtocol("sacn")}
      ${this._editing?H`<artnetui-dmx-device-dialog
            .t=${e}
            .config=${this.config}
            .fixtures=${this.fixtures}
            .location=${this._editing.location}
            .device=${this._editing.device}
            @device-save=${this._saveDevice}
            @open-library=${this._openLibrary}
            @closed=${()=>this._editing=void 0}
          ></artnetui-dmx-device-dialog>`:q}
    `}static{this.styles=[$e,o`
      :host {
        display: grid;
        gap: 16px;
      }
      section {
        display: grid;
        gap: 12px;
        border: var(--alu-border);
        border-radius: var(--alu-radius);
        padding: 16px;
        background: var(--card-background-color, transparent);
        min-width: 0;
      }
      section.universe {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.05));
        padding: 12px;
      }
      header {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 36px;
      }
      h2,
      h3 {
        margin: 0;
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      h2 {
        font-size: 1.15rem;
      }
      h3 {
        font-size: 1rem;
      }
      .badge {
        background: var(--alu-error);
        color: #fff;
        border-radius: 10px;
        padding: 0 8px;
        font-size: 0.75rem;
        line-height: 20px;
      }
      .universes {
        display: grid;
        gap: 12px;
      }
      details > summary {
        cursor: pointer;
        color: var(--alu-muted);
        font-size: 0.85rem;
        padding: 4px 0;
      }
      details > .grid,
      details > .hosts {
        margin-top: 8px;
      }
      .hosts {
        display: grid;
        gap: 8px;
      }
      .hosts .label {
        font-size: 0.8rem;
        color: var(--alu-muted);
      }
      .host-row {
        display: grid;
        grid-template-columns: 2fr 1fr auto;
        gap: 8px;
        align-items: end;
      }
      .devices {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 6px;
      }
      .device {
        display: flex;
        align-items: stretch;
        gap: 8px;
        border: var(--alu-border);
        border-radius: 10px;
        background: var(--card-background-color, transparent);
        overflow: hidden;
      }
      .device.invalid {
        border-color: var(--alu-error);
      }
      .device.warning {
        border-color: var(--alu-warning);
      }
      .swatch {
        width: 6px;
        flex: none;
      }
      .device-main {
        flex: 1;
        min-width: 0;
        border: none;
        background: none;
        border-radius: 0;
        justify-content: flex-start;
        text-align: left;
        padding: 8px 4px;
      }
      .device-text {
        display: grid;
        min-width: 0;
      }
      .device-name {
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .device-meta {
        font-size: 0.8rem;
        color: var(--alu-muted);
      }
      .device-error {
        font-size: 0.8rem;
        color: var(--alu-error);
      }
      .device-warning {
        font-size: 0.8rem;
        color: var(--alu-warning);
      }
      .device-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
        padding-right: 4px;
      }
      @media (max-width: 600px) {
        section {
          padding: 12px;
        }
        .device {
          flex-wrap: wrap;
        }
        .device-main {
          flex-basis: calc(100% - 20px);
        }
        .device-actions {
          width: 100%;
          border-top: var(--alu-border);
        }
        .host-row {
          grid-template-columns: 1fr 90px auto;
        }
      }
    `]}}e([ue({attribute:!1})],oi.prototype,"config",void 0),e([ue({attribute:!1})],oi.prototype,"fixtures",void 0),e([ue({attribute:!1})],oi.prototype,"issues",void 0),e([ue({attribute:!1})],oi.prototype,"t",void 0),e([pe()],oi.prototype,"_editing",void 0),xe("artnetui-dmx-editor",oi);const ai={r:"#e53935",g:"#43a047",b:"#1e88e5",w:"#e0e0e0",c:"#b3e5fc",h:"#ffcc80",t:"#ffe082",d:"#9e9e9e",u:"#ab47bc",x:"#7e57c2",y:"#5c6bc0"},li=e=>Array.isArray(e)?`[${e.join(", ")}]`:`"${e}"`;class di extends ae{constructor(){super(...arguments),this.type="rgb",this.errors=[],this._static=""}get _tokens(){return Et(this.value)}_emit(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:Nt(e)}}))}_append(e){this._emit([...this._tokens,e])}_remove(e){this._emit(this._tokens.filter((t,i)=>i!==e))}_move(e,t){const i=[...this._tokens];if(t<0||t>=i.length||e===t)return;const[n]=i.splice(e,1);i.splice(t,0,n),this._emit(i)}_addStatic(){const e=Number(this._static);""===this._static||!Number.isInteger(e)||e<0||e>255||(this._append(e),this._static="")}_label(e){return"number"==typeof e?this.t("staticToken",{value:e}):this.t(`ch_${e}`)}_chip(e){const t="number"==typeof e?"transparent":ai[e.toLowerCase()];return H`<span class="chip" style="--chip:${t??"#9e9e9e"}">${e}</span>`}render(){const e=_t[this.type].split(""),t=this._tokens;return H`
      <div class="wrap">
        <div class="head">
          <strong>${this.t("channelSetup")}</strong>
          <span class="muted">${this.t("channelSetupDefault",{value:li(vt[this.type])})}</span>
        </div>
        <p class="muted hint">${this.t("channelSetupHint")}</p>
        <div class="body">
          <div class="palette" aria-label=${this.t("palette")}>
            ${e.map(e=>H`
                <button class="token" title=${this._label(e)} @click=${()=>this._append(e)}>
                  ${this._chip(e)}<span class="desc">${this._label(e)}</span>
                </button>
              `)}
            <div class="static">
              <input
                type="number"
                min="0"
                max="255"
                inputmode="numeric"
                placeholder=${this.t("staticValue")}
                aria-label=${this.t("staticValue")}
                .value=${this._static}
                @input=${e=>this._static=e.target.value}
                @keydown=${e=>"Enter"===e.key&&(e.preventDefault(),this._addStatic())}
              />
              <button @click=${this._addStatic}>${ke("mdi:plus")} ${this.t("add")}</button>
            </div>
          </div>
          <ol class="sequence" @dragover=${e=>e.preventDefault()}>
            ${t.length?t.map((e,i)=>H`
                    <li
                      draggable="true"
                      class=${this._dragIndex===i?"dragging":""}
                      @dragstart=${e=>{this._dragIndex=i,e.dataTransfer?.setData("text/plain",String(i))}}
                      @dragend=${()=>this._dragIndex=void 0}
                      @drop=${e=>{e.preventDefault(),void 0!==this._dragIndex&&this._move(this._dragIndex,i),this._dragIndex=void 0}}
                    >
                      <span class="pos">${i+1}</span>
                      ${this._chip(e)}
                      <span class="desc">${this._label(e)}</span>
                      <button class="icon" title=${this.t("moveUp")} aria-label=${this.t("moveUp")} ?disabled=${0===i} @click=${()=>this._move(i,i-1)}>
                        ${ke("mdi:arrow-up")}
                      </button>
                      <button class="icon" title=${this.t("moveDown")} aria-label=${this.t("moveDown")} ?disabled=${i===t.length-1} @click=${()=>this._move(i,i+1)}>
                        ${ke("mdi:arrow-down")}
                      </button>
                      <button class="icon danger" title=${this.t("remove")} aria-label=${this.t("remove")} @click=${()=>this._remove(i)}>
                        ${ke("mdi:delete-outline")}
                      </button>
                    </li>
                  `):H`<li class="none muted">${this.t("noChannels")}</li>`}
          </ol>
        </div>
        ${this.errors.map(e=>H`<div class="error">${e}</div>`)}
        ${t.length?H`<div class="row">
              <code>${li(Nt(t))}</code>
              <span class="spacer"></span>
              <button @click=${()=>this._emit([])}>${this.t("resetDefault")}</button>
            </div>`:q}
      </div>
    `}static{this.styles=[$e,o`
      .wrap {
        display: grid;
        gap: 8px;
        border: var(--alu-border);
        border-radius: var(--alu-radius);
        padding: 12px;
      }
      .head {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
      }
      .hint {
        margin: 0;
      }
      .body {
        display: grid;
        gap: 12px;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      }
      @media (max-width: 640px) {
        .body {
          grid-template-columns: 1fr;
        }
      }
      .palette {
        display: grid;
        gap: 6px;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        align-content: start;
      }
      .token {
        justify-content: flex-start;
        text-align: left;
      }
      .desc {
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        height: 24px;
        padding: 0 4px;
        box-sizing: border-box;
        border-radius: 6px;
        font-weight: 700;
        font-family: var(--ha-font-family-code, monospace);
        background: var(--chip);
        color: #000;
        border: var(--alu-border);
      }
      .static {
        grid-column: 1 / -1;
        display: flex;
        gap: 6px;
      }
      .sequence {
        list-style: none;
        margin: 0;
        padding: 8px;
        border: 1px dashed var(--divider-color, rgba(127, 127, 127, 0.4));
        border-radius: 8px;
        display: grid;
        gap: 4px;
        align-content: start;
        min-height: 120px;
      }
      .sequence li {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 2px 4px;
        border-radius: 6px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        cursor: grab;
      }
      .sequence li.dragging {
        opacity: 0.4;
      }
      .sequence li.none {
        background: none;
        cursor: default;
        padding: 8px;
      }
      .sequence .desc {
        flex: 1;
      }
      .pos {
        width: 20px;
        text-align: right;
        color: var(--alu-muted);
        font-size: 0.75rem;
      }
      .error {
        color: var(--alu-error);
        font-size: 0.8rem;
      }
    `]}}e([ue()],di.prototype,"type",void 0),e([ue({attribute:!1})],di.prototype,"value",void 0),e([ue({attribute:!1})],di.prototype,"t",void 0),e([ue({attribute:!1})],di.prototype,"errors",void 0),e([pe()],di.prototype,"_static",void 0),e([pe()],di.prototype,"_dragIndex",void 0),xe("artnetui-channel-editor",di);class ci extends ae{constructor(){super(...arguments),this._target="0:0"}willUpdate(e){(e.has("device")||e.has("location"))&&(this._draft={...this.device},this._target=`${this.location.node}:${this.location.universe}`)}get _targetLoc(){const[e,t]=this._target.split(":").map(Number);return{node:e,universe:t}}_issues(){const e=structuredClone(this.config),{node:t,universe:i,device:n}=this.location;n>=0&&e.nodes[t].universes[i].devices.splice(n,1);const r=this._targetLoc,s=e.nodes[r.node].universes[r.universe].devices,o=r.node===t&&r.universe===i&&n>=0?n:s.length;return s.splice(o,0,this._draft),{index:new Yt(qt(e)),path:["nodes",r.node,"universes",r.universe,"devices",o]}}_set(e,t){const i={...this._draft};void 0===t?delete i[e]:i[e]=t,this._draft="type"===e||"channel_size"===e?Lt(i):i}_nextFree(){const{node:e,universe:t,device:i}=this.location,n=this._targetLoc,r=n.node===e&&n.universe===t?i:void 0,s=this.config.nodes[n.node].universes[n.universe];this._set("channel",It(s,Tt(this._draft),r))}_save(){this.dispatchEvent(new CustomEvent("device-save",{detail:{device:Lt(this._draft),from:this.location,to:this._targetLoc}}))}render(){if(!this._draft)return q;const e=this.t,t=this._draft,i=At(t),{index:n,path:r}=this._issues(),s=t=>n.at([...r,t]).map(t=>Fe(e,t)),[o,a]=Mt(t),l=Dt(t.name||""),d=this.config.nodes.flatMap((t,i)=>t.universes.map((n,r)=>({value:`${i}:${r}`,label:`${t.host||`${e("node")} ${i+1}`} · ${e("universe")} ${n.id}`})));return H`
      <artnetui-dialog
        open
        wide
        .heading=${this.location.device<0?e("newLight"):e("editLight")}
        .closeLabel=${e("close")}
      >
        <div class="grid">
          ${Se({label:e("name"),required:!0,value:t.name,errors:s("name"),helper:l?e("nameHelper",{slug:l}):void 0,onChange:e=>this._set("name",e??"")})}
          ${Se({label:e("friendlyName"),value:t.friendly_name,onChange:e=>this._set("friendly_name",e)})}
          ${Ne({label:e("type"),value:i,options:pt,errors:s("type"),onChange:e=>this._set("type",e??"dimmer")})}
          ${d.length>1?Ne({label:e("targetUniverse"),value:this._target,options:d,onChange:e=>e&&(this._target=e)}):q}
          <div class="channel">
            ${Ee({label:e("channel"),required:!0,value:t.channel,min:1,max:wt,errors:s("channel"),helper:e("channelHelper",{start:o,end:a,width:Tt(t)}),onChange:e=>this._set("channel",e??1)})}
            <button class="link" @click=${this._nextFree}>${e("nextFree")}</button>
          </div>
          ${"binary"!==i&&"fixed"!==i?Ee({label:e("transition"),value:t.transition,min:0,max:999,step:"any",placeholder:"0",errors:s("transition"),onChange:e=>this._set("transition",e)}):q}
          ${"binary"!==i?Ne({label:e("outputCorrection"),value:t.output_correction,options:ht,emptyLabel:`${e("default")} (universe)`,errors:s("output_correction"),onChange:e=>this._set("output_correction",e)}):q}
          ${"binary"!==i?Ne({label:e("channelSize"),value:t.channel_size,options:Object.keys(mt),emptyLabel:`${e("default")} (8bit)`,errors:s("channel_size"),onChange:e=>this._set("channel_size",e)}):q}
          ${Ot(t)>1?Ne({label:e("byteOrder"),value:t.byte_order,options:ft,emptyLabel:`${e("default")} (big)`,errors:s("byte_order"),onChange:e=>this._set("byte_order",e)}):q}
          ${St(i)?H`
                ${Se({label:e("minTemp"),value:t.min_temp,placeholder:"2700K",errors:s("min_temp"),onChange:e=>this._set("min_temp",e)})}
                ${Se({label:e("maxTemp"),value:t.max_temp,placeholder:"6500K",errors:s("max_temp"),onChange:e=>this._set("max_temp",e)})}
              `:q}
        </div>
        ${Ct(i)?H`<artnetui-channel-editor
              .type=${i}
              .value=${t.channel_setup}
              .t=${e}
              .errors=${s("channel_setup")}
              @value-changed=${e=>this._set("channel_setup",e.detail.value)}
            ></artnetui-channel-editor>`:q}
        <button slot="actions" @click=${()=>this.dispatchEvent(new CustomEvent("closed"))}>
          ${e("cancel")}
        </button>
        <button slot="actions" class="primary" @click=${this._save}>${e("apply")}</button>
      </artnetui-dialog>
    `}static{this.styles=[$e,o`
      .grid {
        margin-bottom: 16px;
      }
      .channel {
        display: grid;
        gap: 2px;
      }
      button.link {
        justify-self: start;
        background: none;
        border: none;
        padding: 0;
        min-height: 24px;
        color: var(--primary-color);
        font-size: 0.8rem;
      }
    `]}}e([ue({attribute:!1})],ci.prototype,"t",void 0),e([ue({attribute:!1})],ci.prototype,"config",void 0),e([ue({attribute:!1})],ci.prototype,"location",void 0),e([ue({attribute:!1})],ci.prototype,"device",void 0),e([pe()],ci.prototype,"_draft",void 0),e([pe()],ci.prototype,"_target",void 0),xe("artnetui-device-dialog",ci);const ui={fixed:"mdi:lightbulb",binary:"mdi:toggle-switch-outline",dimmer:"mdi:brightness-6",color_temp:"mdi:thermometer",rgb:"mdi:palette",rgbw:"mdi:palette",rgbww:"mdi:palette",xy:"mdi:palette-swatch"};class pi extends ae{constructor(){super(...arguments),this.issues=new Yt}_commit(e){const t=Ut(this.config);e(t),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_errors(e){return this.issues.at(e).map(e=>Fe(this.t,e))}_openDevice(e){const t=this.config.nodes[e.node].universes[e.universe],i=e.device>=0?Ut(t.devices[e.device]):((e,t)=>{const i={channel:1,name:Ft("light_1",jt(e)),type:"dimmer"};return i.channel=It(t,Tt(i)),i})(this.config,t);this._editing={location:e,device:i}}_saveDevice(e){const{device:t,from:i,to:n}=e.detail;this._commit(e=>{const r=e.nodes[i.node].universes[i.universe].devices,s=e.nodes[n.node].universes[n.universe].devices;i.device<0?s.push(t):i.node===n.node&&i.universe===n.universe?r[i.device]=t:(r.splice(i.device,1),s.push(t))}),this._editing=void 0}_renderDevice(e,t,i,n,r){const s=this.t,o=["nodes",t,"universes",i,"devices",n],a=this.issues.within(o),[l,d]=Mt(e),c=At(e),u={node:t,universe:i,device:n},p=this.config.nodes[t].universes[i];return H`
      <li class="device ${a.length?"invalid":""}">
        <span class="swatch" style="background:${Jt(n)}"></span>
        <button class="device-main" @click=${()=>this._openDevice(u)} title=${s("edit")}>
          ${ke(ui[c]??"mdi:lightbulb-outline")}
          <span class="device-text">
            <span class="device-name">${e.friendly_name||e.name||"—"}</span>
            <span class="device-meta">
              ${c} · ${l===d?`${l}`:`${l}–${d}`}
              (${Tt(e)} ch${e.channel_size&&"8bit"!==e.channel_size?`, ${e.channel_size}`:""})
              ${e.friendly_name?H` · ${e.name}`:q}
            </span>
            ${a.map(e=>H`<span class="device-error">${Fe(s,e)}</span>`)}
          </span>
        </button>
        <span class="device-actions">
          <button class="icon" title=${s("moveUp")} aria-label=${s("moveUp")} ?disabled=${0===n}
            @click=${()=>this._commit(e=>Rt(e.nodes[t].universes[i].devices,n,n-1))}>
            ${ke("mdi:arrow-up")}
          </button>
          <button class="icon" title=${s("moveDown")} aria-label=${s("moveDown")} ?disabled=${n===r-1}
            @click=${()=>this._commit(e=>Rt(e.nodes[t].universes[i].devices,n,n+1))}>
            ${ke("mdi:arrow-down")}
          </button>
          <button class="icon" title=${s("duplicate")} aria-label=${s("duplicate")}
            @click=${()=>this._commit(r=>r.nodes[t].universes[i].devices.splice(n+1,0,((e,t,i)=>{const n=Ut(i);return n.name=Ft(i.name,jt(e)),delete n.friendly_name,n.channel=It(t,Tt(n)),n})(r,p,e)))}>
            ${ke("mdi:content-copy")}
          </button>
          <button class="icon danger" title=${s("remove")} aria-label=${s("remove")}
            @click=${()=>this._commit(e=>e.nodes[t].universes[i].devices.splice(n,1))}>
            ${ke("mdi:delete-outline")}
          </button>
        </span>
      </li>
    `}_setUniverse(e,t,i,n){this._commit(r=>{const s=r.nodes[e].universes[t];void 0===n?delete s[i]:s[i]=n})}_renderUniverse(e,t,i){const n=this.t,r=["nodes",t,"universes",i],s=this.issues.within(r).length;return H`
      <section class="universe">
        <header>
          <h3>${n("universe")} ${e.id}</h3>
          ${s?H`<span class="badge">${s}</span>`:q}
          <span class="spacer"></span>
          <button class="icon" title=${n("duplicate")} aria-label=${n("duplicate")}
            @click=${()=>this._commit(n=>n.nodes[t].universes.splice(i+1,0,((e,t,i)=>{const n=Ut(i);n.id=zt(t).id;const r=jt(e);for(const e of n.devices)e.name=Ft(e.name,r),delete e.friendly_name,r.push(e.name);return n})(n,n.nodes[t],e)))}>
            ${ke("mdi:content-copy")}
          </button>
          <button class="icon danger" title=${n("remove")} aria-label=${n("remove")}
            @click=${()=>this._commit(e=>e.nodes[t].universes.splice(i,1))}>
            ${ke("mdi:delete-outline")}
          </button>
        </header>
        <div class="grid">
          ${Ee({label:n("universeId"),required:!0,value:e.id,min:0,max:1024,errors:this._errors([...r,"id"]),onChange:e=>this._setUniverse(t,i,"id",e??0)})}
          ${Ne({label:n("outputCorrection"),value:e.output_correction,options:ht,emptyLabel:`${n("default")} (linear)`,errors:this._errors([...r,"output_correction"]),onChange:e=>this._setUniverse(t,i,"output_correction",e)})}
          ${Oe({label:n("sendPartial"),value:e.send_partial_universe??!0,onChange:e=>this._setUniverse(t,i,"send_partial_universe",e)})}
        </div>
        ${e.devices.length?H`
              <details class="map">
                <summary>${n("channelMap")}</summary>
                <artnetui-channel-map
                  .universe=${e}
                  .t=${n}
                  @device-click=${e=>this._openDevice({node:t,universe:i,device:e.detail.index})}
                ></artnetui-channel-map>
              </details>
              <ul class="devices">
                ${e.devices.map((n,r)=>this._renderDevice(n,t,i,r,e.devices.length))}
              </ul>
            `:H`<div class="empty">${n("noLights")}</div>`}
        <div class="row">
          <button @click=${()=>this._openDevice({node:t,universe:i,device:-1})}>
            ${ke("mdi:plus")} ${n("addLight")}
          </button>
        </div>
      </section>
    `}_setNode(e,t,i){this._commit(n=>{const r=n.nodes[e];void 0===i?delete r[t]:r[t]=i})}_renderNode(e,t){const i=this.t,n=["nodes",t],r=e=>this._errors([...n,e]),s=this.issues.within(n).length,o=Boolean(e.host_override||e.port_override||e.port);return H`
      <section class="node">
        <header>
          <h2>${i("node")}: ${e.host||"—"}</h2>
          ${s?H`<span class="badge">${s}</span>`:q}
          <span class="spacer"></span>
          <button class="icon danger" title=${i("remove")} aria-label=${i("remove")}
            @click=${()=>this._commit(e=>e.nodes.splice(t,1))}>
            ${ke("mdi:delete-outline")}
          </button>
        </header>
        <div class="grid">
          ${Se({label:i("host"),required:!0,value:e.host,placeholder:"192.168.0.10",errors:r("host"),onChange:e=>this._setNode(t,"host",e??"")})}
          ${Ne({label:i("nodeType"),value:e.node_type,options:ut,emptyLabel:`${i("default")} (${bt})`,errors:r("node_type"),onChange:e=>this._setNode(t,"node_type",e)})}
          ${Ee({label:i("maxFps"),value:e.max_fps,min:1,max:50,placeholder:String(xt),errors:r("max_fps"),onChange:e=>this._setNode(t,"max_fps",e)})}
          ${Ee({label:i("refresh"),value:e.refresh_every,min:0,max:9999,step:"any",placeholder:String(yt),errors:r("refresh_every"),onChange:e=>this._setNode(t,"refresh_every",e)})}
        </div>
        <details ?open=${o}>
          <summary>${i("advanced")}</summary>
          <div class="grid">
            ${Ee({label:i("port"),value:e.port,min:1,max:65535,placeholder:String($t),errors:r("port"),onChange:e=>this._setNode(t,"port",e)})}
            ${Se({label:i("hostOverride"),value:e.host_override,errors:r("host_override"),onChange:e=>this._setNode(t,"host_override",e)})}
            ${Ee({label:i("portOverride"),value:e.port_override,min:1,max:65535,errors:r("port_override"),onChange:e=>this._setNode(t,"port_override",e)})}
          </div>
        </details>
        <div class="universes">
          ${e.universes.length?e.universes.map((e,i)=>this._renderUniverse(e,t,i)):H`<div class="empty">${i("noUniverses")}</div>`}
          ${r("universes").map(e=>H`<div class="error">${e}</div>`)}
        </div>
        <div class="row">
          <button @click=${()=>this._commit(e=>e.nodes[t].universes.push(zt(e.nodes[t])))}>
            ${ke("mdi:plus")} ${i("addUniverse")}
          </button>
        </div>
      </section>
    `}render(){const e=this.t;return H`
      ${this.config.nodes.length?this.config.nodes.map((e,t)=>this._renderNode(e,t)):H`<div class="empty">${e("noNodes")}</div>`}
      <div class="row">
        <button @click=${()=>this._commit(e=>e.nodes.push(Pt()))}>
          ${ke("mdi:plus")} ${e("addNode")}
        </button>
      </div>
      ${this._editing?H`<artnetui-device-dialog
            .t=${e}
            .config=${this.config}
            .location=${this._editing.location}
            .device=${this._editing.device}
            @device-save=${this._saveDevice}
            @closed=${()=>this._editing=void 0}
          ></artnetui-device-dialog>`:q}
    `}static{this.styles=[$e,o`
      :host {
        display: grid;
        gap: 16px;
      }
      section {
        display: grid;
        gap: 12px;
        border: var(--alu-border);
        border-radius: var(--alu-radius);
        padding: 16px;
        background: var(--card-background-color, transparent);
        min-width: 0;
      }
      section.universe {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.05));
        padding: 12px;
      }
      header {
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 36px;
      }
      h2,
      h3 {
        margin: 0;
        font-weight: 500;
        overflow-wrap: anywhere;
      }
      h2 {
        font-size: 1.15rem;
      }
      h3 {
        font-size: 1rem;
      }
      .badge {
        background: var(--alu-error);
        color: #fff;
        border-radius: 10px;
        padding: 0 8px;
        font-size: 0.75rem;
        line-height: 20px;
      }
      .universes {
        display: grid;
        gap: 12px;
      }
      details > summary {
        cursor: pointer;
        color: var(--alu-muted);
        font-size: 0.85rem;
        padding: 4px 0;
      }
      details > .grid {
        margin-top: 8px;
      }
      .devices {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 6px;
      }
      .device {
        display: flex;
        align-items: stretch;
        gap: 8px;
        border: var(--alu-border);
        border-radius: 10px;
        background: var(--card-background-color, transparent);
        overflow: hidden;
      }
      .device.invalid {
        border-color: var(--alu-error);
      }
      .swatch {
        width: 6px;
        flex: none;
      }
      .device-main {
        flex: 1;
        min-width: 0;
        border: none;
        background: none;
        border-radius: 0;
        justify-content: flex-start;
        text-align: left;
        padding: 8px 4px;
      }
      .device-text {
        display: grid;
        min-width: 0;
      }
      .device-name {
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .device-meta {
        font-size: 0.8rem;
        color: var(--alu-muted);
      }
      .device-error,
      .error {
        font-size: 0.8rem;
        color: var(--alu-error);
      }
      .device-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
        padding-right: 4px;
      }
      @media (max-width: 600px) {
        section {
          padding: 12px;
        }
        .device {
          flex-wrap: wrap;
        }
        .device-main {
          flex-basis: calc(100% - 20px);
        }
        .device-actions {
          width: 100%;
          border-top: var(--alu-border);
        }
      }
    `]}}e([ue({attribute:!1})],pi.prototype,"config",void 0),e([ue({attribute:!1})],pi.prototype,"issues",void 0),e([ue({attribute:!1})],pi.prototype,"t",void 0),e([pe()],pi.prototype,"_editing",void 0),xe("artnetui-editor",pi);class hi extends ae{constructor(){super(...arguments),this._filter="",this._query=""}_installedKeys(){return new Set((this.library?.fixtures??[]).filter(e=>e.installed&&e.manufacturer_key&&e.fixture_key).map(e=>`${e.manufacturer_key}/${e.fixture_key}`))}_changed(e){this._message={type:"success",text:this.t("dmxFixtureAdded",{name:e.name,file:e.file??""})},this.dispatchEvent(new CustomEvent("fixtures-changed",{detail:{fixture:e}}))}async _search(e){e?.preventDefault();const t=this._query.trim();if(t){this._busy="search",this._message=void 0;try{this._results=await((e,t)=>e.callWS({type:`${me}/ofl/search`,query:t}))(this.hass,t)}catch(e){this._results=void 0,this._message={type:"error",text:this.t("dmxOflError",{error:be(e)})}}finally{this._busy=void 0}}}async _download(e){this._busy=e,this._message=void 0;try{this._changed(await((e,t)=>e.callWS({type:`${me}/ofl/download`,key:t}))(this.hass,e))}catch(e){this._message={type:"error",text:this.t("dmxOflError",{error:be(e)})}}finally{this._busy=void 0}}async _upload(e){const t=e.target,i=t.files?.[0];if(t.value="",i){this._busy="upload",this._message=void 0;try{this._changed(await(n=this.hass,r=i.name,s=await i.text(),n.callWS({type:`${me}/fixtures/upload`,file_name:r,content:s})))}catch(e){this._message={type:"error",text:this.t("dmxUploadError",{error:be(e)})}}finally{this._busy=void 0}var n,r,s}}_renderFixture(e){const t=this.t,i=e.modes.map(e=>`${e.name} (${e.width})`).join(", ");return H`<li>
      <div class="name">
        ${e.name}
        ${e.key!==e.name?H`<code>${e.key}</code>`:q}
        <span class="badge ${e.installed?"installed":"bundled"}">
          ${e.installed?t("dmxInstalled"):t("dmxBundled")}
        </span>
      </div>
      <div class="muted">${i}${e.file?H` · ${e.file}`:q}</div>
    </li>`}render(){const e=this.t,t=this.library,i=this._filter.trim().toLowerCase(),n=(t?.fixtures??[]).filter(e=>!i||[e.name,...e.aliases,e.manufacturer_key??""].some(e=>e.toLowerCase().includes(i))),r=this._installedKeys();return H`
      <artnetui-dialog open wide .heading=${e("dmxLibrary")} .subtitle=${e("dmxLibrarySubtitle",{folder:t?.folder??"fixtures"})} .closeLabel=${e("close")}>
        ${this._message?Ae(this._message.type,this._message.text):q}
        ${t&&!t.folder_exists?Ae("info",e("dmxFolderMissing",{folder:t.folder??"fixtures"})):q}
        ${(t?.errors??[]).map(e=>Ae("warning",H`<code>${e.file}</code>: ${e.error}`))}

        <section>
          <h3>${e("dmxOflTitle")}</h3>
          <p class="muted">${e("dmxOflHint")} <a href=${"https://open-fixture-library.org"} target="_blank" rel="noreferrer">open-fixture-library.org</a></p>
          <form class="search" @submit=${this._search}>
            <input
              type="search"
              placeholder=${e("dmxOflPlaceholder")}
              .value=${this._query}
              @input=${e=>this._query=e.target.value}
            />
            <button type="submit" ?disabled=${!this._query.trim()||void 0!==this._busy}>
              ${ke("mdi:magnify")} ${"search"===this._busy?e("loading"):e("dmxSearch")}
            </button>
            <button type="button" ?disabled=${void 0!==this._busy} @click=${()=>this._fileInput?.click()}>
              ${ke("mdi:upload")} ${"upload"===this._busy?e("loading"):e("dmxUpload")}
            </button>
            <input type="file" accept=".json,application/json" hidden @change=${this._upload} />
          </form>
          ${this._results?this._results.length?H`<ul class="results">
                  ${this._results.map(t=>{const i=r.has(t.key);return H`<li>
                      <div>
                        <div class="name">${t.name}</div>
                        <div class="muted"><code>${t.key}</code></div>
                      </div>
                      <button ?disabled=${i||void 0!==this._busy} @click=${()=>this._download(t.key)}>
                        ${ke("mdi:download")}
                        ${i?e("dmxInstalled"):this._busy===t.key?e("loading"):e("dmxDownload")}
                      </button>
                    </li>`})}
                </ul>`:H`<p class="muted">${e("dmxOflNoResults")}</p>`:q}
        </section>

        <section>
          <h3>${e("dmxAvailable",{count:t?.fixtures.length??0})}</h3>
          <input
            type="search"
            placeholder=${e("dmxFilter")}
            .value=${this._filter}
            @input=${e=>this._filter=e.target.value}
          />
          ${t?H`<ul class="fixtures">${n.map(e=>this._renderFixture(e))}</ul>`:H`<p class="muted">${e("loading")}</p>`}
          <p class="muted">${e("dmxBundledExplain")}</p>
        </section>

        <button slot="actions" class="primary" @click=${()=>this.dispatchEvent(new CustomEvent("closed"))}>${e("close")}</button>
      </artnetui-dialog>
    `}static{this.styles=[$e,o`
      :host {
        display: contents;
      }
      section {
        display: grid;
        gap: 8px;
        margin: 12px 0;
      }
      h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
      }
      p {
        margin: 0;
      }
      a {
        color: var(--primary-color);
      }
      .search {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 8px;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 4px;
        max-height: 40vh;
        overflow: auto;
      }
      li {
        padding: 6px 8px;
        border: var(--alu-border);
        border-radius: 8px;
      }
      .results li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .name {
        font-weight: 500;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
      }
      .badge {
        font-size: 0.7rem;
        font-weight: normal;
        padding: 1px 8px;
        border-radius: 10px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .badge.installed {
        background: rgba(76, 175, 80, 0.2);
      }
      @media (max-width: 600px) {
        .search {
          grid-template-columns: 1fr;
        }
      }
    `]}}e([ue({attribute:!1})],hi.prototype,"hass",void 0),e([ue({attribute:!1})],hi.prototype,"t",void 0),e([ue({attribute:!1})],hi.prototype,"library",void 0),e([pe()],hi.prototype,"_filter",void 0),e([pe()],hi.prototype,"_query",void 0),e([pe()],hi.prototype,"_results",void 0),e([pe()],hi.prototype,"_busy",void 0),e([pe()],hi.prototype,"_message",void 0),e([he("input[type=file]")],hi.prototype,"_fileInput",void 0),xe("artnetui-fixture-library",hi);const mi=(e,t)=>{const i=`mig_${t.code}`,n={};for(const[e,i]of Object.entries(t.params??{}))n[e]=Array.isArray(i)?i.join(""):String(i??"—");const r=e(i,n);return r===i?t.code:r};class fi extends ae{constructor(){super(...arguments),this.replacing=!1}render(){const e=this.t,t=this.result;let i=H`<p>${e("loading")}</p>`;if(this.error)i=Ae("error",this.error);else if(t){const n=Qe(t.config).length,r=t.config.artnet.universes.length+t.config.sacn.universes.length,s=t.warnings.filter(e=>!e.device&&"entity_ids_change"!==e.code),o=t.warnings.filter(e=>e.device),a=t.warnings.some(e=>"entity_ids_change"===e.code);i=n?H`
            <p>${e("migSummary",{devices:n,universes:r,fixtures:t.fixtures.join(", ")||"—"})}</p>
            ${a?Ae("warning",e("mig_entity_ids_change")):q}
            ${s.map(t=>Ae("warning",mi(e,t)))}
            ${o.length?H`<h3>${e("migNotes")}</h3>
                  <ul>
                    ${o.map(t=>H`<li><strong>${t.device}</strong>: ${mi(e,t)}</li>`)}
                  </ul>`:q}
            ${this.replacing?Ae("info",e("migReplaces")):q}
            <p class="muted">${e("migNextSteps")}</p>
          `:H`${Ae("info",e("migNothing"))}${s.map(t=>Ae("warning",mi(e,t)))}`}const n=Boolean(t&&Qe(t.config).length&&!this.error);return H`
      <artnetui-dialog open wide .heading=${e("migTitle")} .subtitle=${e("migSubtitle")} .closeLabel=${e("close")}>
        ${i}
        <button slot="actions" @click=${()=>this.dispatchEvent(new CustomEvent("closed"))}>${e("cancel")}</button>
        <button slot="actions" class="primary" ?disabled=${!n} @click=${()=>this.dispatchEvent(new CustomEvent("apply"))}>
          ${e("migApply")}
        </button>
      </artnetui-dialog>
    `}static{this.styles=[$e,o`
      :host {
        display: contents;
      }
      h3 {
        margin: 12px 0 4px;
        font-size: 1rem;
        font-weight: 500;
      }
      ul {
        margin: 0;
        padding-left: 20px;
        display: grid;
        gap: 4px;
      }
      p {
        margin: 8px 0;
      }
    `]}}function gi(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}e([ue({attribute:!1})],fi.prototype,"t",void 0),e([ue({attribute:!1})],fi.prototype,"result",void 0),e([ue({attribute:!1})],fi.prototype,"error",void 0),e([ue({type:Boolean})],fi.prototype,"replacing",void 0),xe("artnetui-migrate-dialog",fi);var _i,vi,bi,xi,yi,$i,wi,ki,Ai,Ci,Si,Ei,Ni,Oi,Ti,Mi,Di,Ii,Fi,Li,Ui,ji,zi,Pi,Ri,Bi,Hi,Ki,qi,Wi,Yi,Ji,Gi,Vi,Zi,Xi,Qi,en,tn,nn,rn,sn,on,an,ln={},dn={},cn={};function un(){if(_i)return cn;function e(e){return null==e}return _i=1,cn.isNothing=e,cn.isObject=function(e){return"object"==typeof e&&null!==e},cn.toArray=function(t){return Array.isArray(t)?t:e(t)?[]:[t]},cn.repeat=function(e,t){let i="";for(let n=0;n<t;n+=1)i+=e;return i},cn.isNegativeZero=function(e){return 0===e&&Number.NEGATIVE_INFINITY===1/e},cn.extend=function(e,t){if(t){const i=Object.keys(t);for(let n=0,r=i.length;n<r;n+=1){const r=i[n];e[r]=t[r]}}return e},cn}function pn(){if(bi)return vi;function e(e,t){let i="";const n=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(i+='in "'+e.mark.name+'" '),i+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!t&&e.mark.snippet&&(i+="\n\n"+e.mark.snippet),n+" "+i):n}function t(t,i){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=i,this.message=e(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack||""}return bi=1,t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t.prototype.toString=function(t){return this.name+": "+e(this,t)},vi=t}function hn(){if(wi)return $i;wi=1;const e=pn(),t=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],i=["scalar","sequence","mapping"];return $i=function(n,r){if(r=r||{},Object.keys(r).forEach(function(i){if(-1===t.indexOf(i))throw new e('Unknown option "'+i+'" is met in definition of "'+n+'" YAML type.')}),this.options=r,this.tag=n,this.kind=r.kind||null,this.resolve=r.resolve||function(){return!0},this.construct=r.construct||function(e){return e},this.instanceOf=r.instanceOf||null,this.predicate=r.predicate||null,this.represent=r.represent||null,this.representName=r.representName||null,this.defaultStyle=r.defaultStyle||null,this.multi=r.multi||!1,this.styleAliases=function(e){const t={};return null!==e&&Object.keys(e).forEach(function(i){e[i].forEach(function(e){t[String(e)]=i})}),t}(r.styleAliases||null),-1===i.indexOf(this.kind))throw new e('Unknown kind "'+this.kind+'" is specified for "'+n+'" YAML type.')}}function mn(){if(Ai)return ki;Ai=1;const e=pn(),t=hn();function i(e,t){const i=[];return e[t].forEach(function(e){let t=i.length;i.forEach(function(i,n){i.tag===e.tag&&i.kind===e.kind&&i.multi===e.multi&&(t=n)}),i[t]=e}),i}function n(e){return this.extend(e)}return n.prototype.extend=function(r){let s=[],o=[];if(r instanceof t)o.push(r);else if(Array.isArray(r))o=o.concat(r);else{if(!r||!Array.isArray(r.implicit)&&!Array.isArray(r.explicit))throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");r.implicit&&(s=s.concat(r.implicit)),r.explicit&&(o=o.concat(r.explicit))}s.forEach(function(i){if(!(i instanceof t))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(i.loadKind&&"scalar"!==i.loadKind)throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(i.multi)throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),o.forEach(function(i){if(!(i instanceof t))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const a=Object.create(n.prototype);return a.implicit=(this.implicit||[]).concat(s),a.explicit=(this.explicit||[]).concat(o),a.compiledImplicit=i(a,"implicit"),a.compiledExplicit=i(a,"explicit"),a.compiledTypeMap=function(){const e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function t(t){t.multi?(e.multi[t.kind].push(t),e.multi.fallback.push(t)):e[t.kind][t.tag]=e.fallback[t.tag]=t}for(let e=0,i=arguments.length;e<i;e+=1)arguments[e].forEach(t);return e}(a.compiledImplicit,a.compiledExplicit),a},ki=n}function fn(){if(Si)return Ci;Si=1;const e=hn();return Ci=new e("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return null!==e?e:""}})}function gn(){if(Ni)return Ei;Ni=1;const e=hn();return Ei=new e("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return null!==e?e:[]}})}function _n(){if(Ti)return Oi;Ti=1;const e=hn();return Oi=new e("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return null!==e?e:{}}})}function vn(){if(Di)return Mi;Di=1;const e=mn();return Mi=new e({explicit:[fn(),gn(),_n()]})}function bn(){if(Fi)return Ii;Fi=1;const e=hn();return Ii=new e("tag:yaml.org,2002:null",{kind:"scalar",resolve:function(e){if(null===e)return!0;const t=e.length;return 1===t&&"~"===e||4===t&&("null"===e||"Null"===e||"NULL"===e)},construct:function(){return null},predicate:function(e){return null===e},represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"})}function xn(){if(Ui)return Li;Ui=1;const e=hn();return Li=new e("tag:yaml.org,2002:bool",{kind:"scalar",resolve:function(e){if(null===e)return!1;const t=e.length;return 4===t&&("true"===e||"True"===e||"TRUE"===e)||5===t&&("false"===e||"False"===e||"FALSE"===e)},construct:function(e){return"true"===e||"True"===e||"TRUE"===e},predicate:function(e){return"[object Boolean]"===Object.prototype.toString.call(e)},represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"})}function yn(){if(zi)return ji;zi=1;const e=un(),t=hn();function i(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function n(e){return e>=48&&e<=55}function r(e){return e>=48&&e<=57}function s(e){let t=e,i=1,n=t[0];if("-"!==n&&"+"!==n||("-"===n&&(i=-1),t=t.slice(1),n=t[0]),"0"===t)return 0;if("0"===n){if("b"===t[1])return i*parseInt(t.slice(2),2);if("x"===t[1])return i*parseInt(t.slice(2),16);if("o"===t[1])return i*parseInt(t.slice(2),8)}return i*parseInt(t,10)}return ji=new t("tag:yaml.org,2002:int",{kind:"scalar",resolve:function(e){if(null===e)return!1;const t=e.length;let o=0,a=!1;if(!t)return!1;let l=e[o];if("-"!==l&&"+"!==l||(l=e[++o]),"0"===l){if(o+1===t)return!0;if(l=e[++o],"b"===l){for(o++;o<t;o++){if(l=e[o],"0"!==l&&"1"!==l)return!1;a=!0}return a&&isFinite(s(e))}if("x"===l){for(o++;o<t;o++){if(!i(e.charCodeAt(o)))return!1;a=!0}return a&&isFinite(s(e))}if("o"===l){for(o++;o<t;o++){if(!n(e.charCodeAt(o)))return!1;a=!0}return a&&isFinite(s(e))}}for(;o<t;o++){if(!r(e.charCodeAt(o)))return!1;a=!0}return!!a&&isFinite(s(e))},construct:function(e){return s(e)},predicate:function(t){return"[object Number]"===Object.prototype.toString.call(t)&&t%1==0&&!e.isNegativeZero(t)},represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})}function $n(){if(Ri)return Pi;Ri=1;const e=un(),t=hn(),i=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),n=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");const r=/^[-+]?[0-9]+e/;return Pi=new t("tag:yaml.org,2002:float",{kind:"scalar",resolve:function(e){return null!==e&&(!!i.test(e)&&(!!isFinite(parseFloat(e,10))||n.test(e)))},construct:function(e){let t=e.toLowerCase();const i="-"===t[0]?-1:1;return"+-".indexOf(t[0])>=0&&(t=t.slice(1)),".inf"===t?1===i?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:".nan"===t?NaN:i*parseFloat(t,10)},predicate:function(t){return"[object Number]"===Object.prototype.toString.call(t)&&(t%1!=0||e.isNegativeZero(t))},represent:function(t,i){if(isNaN(t))switch(i){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===t)switch(i){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===t)switch(i){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(e.isNegativeZero(t))return"-0.0";const n=t.toString(10);return r.test(n)?n.replace("e",".e"):n},defaultStyle:"lowercase"})}function wn(){return Hi?Bi:(Hi=1,Bi=vn().extend({implicit:[bn(),xn(),yn(),$n()]}))}function kn(){return qi?Ki:(qi=1,Ki=wn())}function An(){if(Yi)return Wi;Yi=1;const e=hn(),t=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),i=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");return Wi=new e("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:function(e){return null!==e&&(null!==t.exec(e)||null!==i.exec(e))},construct:function(e){let n=0,r=null,s=t.exec(e);if(null===s&&(s=i.exec(e)),null===s)throw new Error("Date resolve error");const o=+s[1],a=+s[2]-1,l=+s[3];if(!s[4])return new Date(Date.UTC(o,a,l));const d=+s[4],c=+s[5],u=+s[6];if(s[7]){for(n=s[7].slice(0,3);n.length<3;)n+="0";n=+n}if(s[9]){r=6e4*(60*+s[10]+ +(s[11]||0)),"-"===s[9]&&(r=-r)}const p=new Date(Date.UTC(o,a,l,d,c,u,n));return r&&p.setTime(p.getTime()-r),p},instanceOf:Date,represent:function(e){return e.toISOString()}})}function Cn(){if(Gi)return Ji;Gi=1;const e=hn();return Ji=new e("tag:yaml.org,2002:merge",{kind:"scalar",resolve:function(e){return"<<"===e||null===e}})}function Sn(){if(Zi)return Vi;Zi=1;const e=hn(),t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";return Vi=new e("tag:yaml.org,2002:binary",{kind:"scalar",resolve:function(e){if(null===e)return!1;let i=0;const n=e.length,r=t;for(let t=0;t<n;t++){const n=r.indexOf(e.charAt(t));if(!(n>64)){if(n<0)return!1;i+=6}}return i%8==0},construct:function(e){const i=e.replace(/[\r\n=]/g,""),n=i.length,r=t;let s=0;const o=[];for(let e=0;e<n;e++)e%4==0&&e&&(o.push(s>>16&255),o.push(s>>8&255),o.push(255&s)),s=s<<6|r.indexOf(i.charAt(e));const a=n%4*6;return 0===a?(o.push(s>>16&255),o.push(s>>8&255),o.push(255&s)):18===a?(o.push(s>>10&255),o.push(s>>2&255)):12===a&&o.push(s>>4&255),new Uint8Array(o)},predicate:function(e){return"[object Uint8Array]"===Object.prototype.toString.call(e)},represent:function(e){let i="",n=0;const r=e.length,s=t;for(let t=0;t<r;t++)t%3==0&&t&&(i+=s[n>>18&63],i+=s[n>>12&63],i+=s[n>>6&63],i+=s[63&n]),n=(n<<8)+e[t];const o=r%3;return 0===o?(i+=s[n>>18&63],i+=s[n>>12&63],i+=s[n>>6&63],i+=s[63&n]):2===o?(i+=s[n>>10&63],i+=s[n>>4&63],i+=s[n<<2&63],i+=s[64]):1===o&&(i+=s[n>>2&63],i+=s[n<<4&63],i+=s[64],i+=s[64]),i}})}function En(){if(Qi)return Xi;Qi=1;const e=hn(),t=Object.prototype.hasOwnProperty,i=Object.prototype.toString;return Xi=new e("tag:yaml.org,2002:omap",{kind:"sequence",resolve:function(e){if(null===e)return!0;const n={},r=e;for(let e=0,s=r.length;e<s;e+=1){const s=r[e];let o,a=!1;if("[object Object]"!==i.call(s))return!1;for(o in s)if(t.call(s,o)){if(a)return!1;a=!0}if(!a)return!1;if(t.call(n,o))return!1;Object.defineProperty(n,o,{value:!0})}return!0},construct:function(e){return null!==e?e:[]}})}function Nn(){if(tn)return en;tn=1;const e=hn(),t=Object.prototype.toString;return en=new e("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:function(e){if(null===e)return!0;const i=e,n=new Array(i.length);for(let e=0,r=i.length;e<r;e+=1){const r=i[e];if("[object Object]"!==t.call(r))return!1;const s=Object.keys(r);if(1!==s.length)return!1;n[e]=[s[0],r[s[0]]]}return!0},construct:function(e){if(null===e)return[];const t=e,i=new Array(t.length);for(let e=0,n=t.length;e<n;e+=1){const n=t[e],r=Object.keys(n);i[e]=[r[0],n[r[0]]]}return i}})}function On(){if(rn)return nn;rn=1;const e=hn(),t=Object.prototype.hasOwnProperty;return nn=new e("tag:yaml.org,2002:set",{kind:"mapping",resolve:function(e){if(null===e)return!0;const i=e;for(const e in i)if(t.call(i,e)&&null!==i[e])return!1;return!0},construct:function(e){return null!==e?e:{}}})}function Tn(){return on?sn:(on=1,sn=kn().extend({implicit:[An(),Cn()],explicit:[Sn(),En(),Nn(),On()]}))}function Mn(){if(an)return dn;an=1;const e=un(),t=pn(),i=function(){if(yi)return xi;yi=1;const e=un();function t(e,t,i,n,r){let s="",o="";const a=Math.floor(r/2)-1;return n-t>a&&(s=" ... ",t=n-a+s.length),i-n>a&&(o=" ...",i=n+a-o.length),{str:s+e.slice(t,i).replace(/\t/g,"→")+o,pos:n-t+s.length}}function i(t,i){return e.repeat(" ",i-t.length)+t}return xi=function(n,r){if(r=Object.create(r||null),!n.buffer)return null;r.maxLength||(r.maxLength=79),"number"!=typeof r.indent&&(r.indent=1),"number"!=typeof r.linesBefore&&(r.linesBefore=3),"number"!=typeof r.linesAfter&&(r.linesAfter=2);const s=/\r?\n|\r|\0/g,o=[0],a=[];let l,d=-1;for(;l=s.exec(n.buffer);)a.push(l.index),o.push(l.index+l[0].length),n.position<=l.index&&d<0&&(d=o.length-2);d<0&&(d=o.length-1);let c="";const u=Math.min(n.line+r.linesAfter,a.length).toString().length,p=r.maxLength-(r.indent+u+3);for(let s=1;s<=r.linesBefore&&!(d-s<0);s++){const l=t(n.buffer,o[d-s],a[d-s],n.position-(o[d]-o[d-s]),p);c=e.repeat(" ",r.indent)+i((n.line-s+1).toString(),u)+" | "+l.str+"\n"+c}const h=t(n.buffer,o[d],a[d],n.position,p);c+=e.repeat(" ",r.indent)+i((n.line+1).toString(),u)+" | "+h.str+"\n",c+=e.repeat("-",r.indent+u+3+h.pos)+"^\n";for(let s=1;s<=r.linesAfter&&!(d+s>=a.length);s++){const l=t(n.buffer,o[d+s],a[d+s],n.position-(o[d]-o[d+s]),p);c+=e.repeat(" ",r.indent)+i((n.line+s+1).toString(),u)+" | "+l.str+"\n"}return c.replace(/\n$/,"")},xi}(),n=Tn(),r=Object.prototype.hasOwnProperty,s=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,o=/[\x85\u2028\u2029]/,a=/[,\[\]{}]/,l=/^(?:!|!!|![0-9A-Za-z-]+!)$/,d=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function c(e){return Object.prototype.toString.call(e)}function u(e){return 10===e||13===e}function p(e){return 9===e||32===e}function h(e){return 9===e||32===e||10===e||13===e}function m(e){return 44===e||91===e||93===e||123===e||125===e}function f(e){if(e>=48&&e<=57)return e-48;const t=32|e;return t>=97&&t<=102?t-97+10:-1}function g(e){return 120===e?2:117===e?4:85===e?8:0}function _(e){return e>=48&&e<=57?e-48:-1}function v(e){switch(e){case 48:return"\0";case 97:return"";case 98:return"\b";case 116:case 9:return"\t";case 110:return"\n";case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function b(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023))}function x(e,t,i){"__proto__"===t?Object.defineProperty(e,t,{configurable:!0,enumerable:!0,writable:!0,value:i}):e[t]=i}const y=new Array(256),$=new Array(256);for(let e=0;e<256;e++)y[e]=v(e)?1:0,$[e]=v(e);function w(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||n,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.maxDepth="number"==typeof t.maxDepth?t.maxDepth:100,this.maxTotalMergeKeys="number"==typeof t.maxTotalMergeKeys?t.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function k(e,n){const r={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return r.snippet=i(r),new t(n,r)}function A(e,t){throw k(e,t)}function C(e,t){e.onWarning&&e.onWarning.call(null,k(e,t))}function S(e,t,i){const n=e.anchorMapTransactions;if(0!==n.length){const i=n[n.length-1];r.call(i,t)||(i[t]={existed:r.call(e.anchorMap,t),value:e.anchorMap[t]})}e.anchorMap[t]=i}function E(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,tag:e.tag,anchor:e.anchor,kind:e.kind,result:e.result}}function N(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.tag=t.tag,e.anchor=t.anchor,e.kind=t.kind,e.result=t.result}const O={YAML:function(e,t,i){null!==e.version&&A(e,"duplication of %YAML directive"),1!==i.length&&A(e,"YAML directive accepts exactly one argument");const n=/^([0-9]+)\.([0-9]+)$/.exec(i[0]);null===n&&A(e,"ill-formed argument of the YAML directive");const r=parseInt(n[1],10),s=parseInt(n[2],10);1!==r&&A(e,"unacceptable YAML version of the document"),e.version=i[0],e.checkLineBreaks=s<2,1!==s&&2!==s&&C(e,"unsupported YAML version of the document")},TAG:function(e,t,i){let n;2!==i.length&&A(e,"TAG directive accepts exactly two arguments");const s=i[0];n=i[1],l.test(s)||A(e,"ill-formed tag handle (first argument) of the TAG directive"),r.call(e.tagMap,s)&&A(e,'there is a previously declared suffix for "'+s+'" tag handle'),d.test(n)||A(e,"ill-formed tag prefix (second argument) of the TAG directive");try{n=decodeURIComponent(n)}catch(t){A(e,"tag prefix is malformed: "+n)}e.tagMap[s]=n}};function T(e,t,i,n){if(t<i){const r=e.input.slice(t,i);if(n)for(let t=0,i=r.length;t<i;t+=1){const i=r.charCodeAt(t);9===i||i>=32&&i<=1114111||A(e,"expected valid JSON character")}else s.test(r)&&A(e,"the stream contains non-printable characters");e.result+=r}}function M(e){e.totalMergeKeys++,-1!==e.maxTotalMergeKeys&&e.totalMergeKeys>e.maxTotalMergeKeys&&A(e,"merge keys exceeded maxTotalMergeKeys ("+e.maxTotalMergeKeys+")")}function D(t,i,n,s){e.isObject(n)||A(t,"cannot merge mappings; the provided source object is unacceptable"),M(t);const o=Object.keys(n);for(let e=0,a=o.length;e<a;e+=1){const a=o[e];M(t),r.call(i,a)||(x(i,a,n[a]),s[a]=!0)}}function I(e,t,i,n,s,o,a,l,d){if(Array.isArray(s))for(let t=0,i=(s=Array.prototype.slice.call(s)).length;t<i;t+=1)Array.isArray(s[t])&&A(e,"nested arrays are not supported inside keys"),"object"==typeof s&&"[object Object]"===c(s[t])&&(s[t]="[object Object]");if("object"==typeof s&&"[object Object]"===c(s)&&(s="[object Object]"),s=String(s),null===t&&(t={}),"tag:yaml.org,2002:merge"===n)if(Array.isArray(o)){o.length>100&&A(e,"abnormal merge sequence size");for(let n=0,r=o.length;n<r;n+=1)D(e,t,o[n],i)}else D(e,t,o,i);else e.json||r.call(i,s)||!r.call(t,s)||(e.line=a||e.line,e.lineStart=l||e.lineStart,e.position=d||e.position,A(e,"duplicated mapping key")),x(t,s,o),delete i[s];return t}function F(e){const t=e.input.charCodeAt(e.position);10===t?e.position++:13===t?(e.position++,10===e.input.charCodeAt(e.position)&&e.position++):A(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function L(e,t,i){let n=0,r=e.input.charCodeAt(e.position);for(;0!==r;){for(;p(r);)9===r&&-1===e.firstTabInLine&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&35===r)do{r=e.input.charCodeAt(++e.position)}while(10!==r&&13!==r&&0!==r);if(!u(r))break;for(F(e),r=e.input.charCodeAt(e.position),n++,e.lineIndent=0;32===r;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return-1!==i&&0!==n&&e.lineIndent<i&&C(e,"deficient indentation"),n}function U(e){let t=e.position,i=e.input.charCodeAt(t);return!(45!==i&&46!==i||i!==e.input.charCodeAt(t+1)||i!==e.input.charCodeAt(t+2)||(t+=3,i=e.input.charCodeAt(t),0!==i&&!h(i)))}function j(t,i){1===i?t.result+=" ":i>1&&(t.result+=e.repeat("\n",i-1))}function z(e,t){const i=e.tag,n=e.anchor,r=[];let s=!1;if(-1!==e.firstTabInLine)return!1;null!==e.anchor&&S(e,e.anchor,r);let o=e.input.charCodeAt(e.position);for(;0!==o&&(-1!==e.firstTabInLine&&(e.position=e.firstTabInLine,A(e,"tab characters must not be used in indentation")),45===o);){if(!h(e.input.charCodeAt(e.position+1)))break;if(s=!0,e.position++,L(e,!0,-1)&&e.lineIndent<=t){r.push(null),o=e.input.charCodeAt(e.position);continue}const i=e.line;if(K(e,t,3,!1,!0),r.push(e.result),L(e,!0,-1),o=e.input.charCodeAt(e.position),(e.line===i||e.lineIndent>t)&&0!==o)A(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break}return!!s&&(e.tag=i,e.anchor=n,e.kind="sequence",e.result=r,!0)}function P(e,t,i){let n,r,s,o;const a=e.tag,l=e.anchor,d={},c=Object.create(null);let u=null,m=null,f=null,g=!1,_=!1;if(-1!==e.firstTabInLine)return!1;null!==e.anchor&&S(e,e.anchor,d);let v=e.input.charCodeAt(e.position);for(;0!==v;){g||-1===e.firstTabInLine||(e.position=e.firstTabInLine,A(e,"tab characters must not be used in indentation"));const b=e.input.charCodeAt(e.position+1),x=e.line;if(63!==v&&58!==v||!h(b)){if(r=e.line,s=e.lineStart,o=e.position,!K(e,i,2,!1,!0))break;if(e.line===x){for(v=e.input.charCodeAt(e.position);p(v);)v=e.input.charCodeAt(++e.position);if(58===v)v=e.input.charCodeAt(++e.position),h(v)||A(e,"a whitespace character is expected after the key-value separator within a block mapping"),g&&(I(e,d,c,u,m,null,r,s,o),u=m=f=null),_=!0,g=!1,n=!1,u=e.tag,m=e.result;else{if(!_)return e.tag=a,e.anchor=l,!0;A(e,"can not read an implicit mapping pair; a colon is missed")}}else{if(!_)return e.tag=a,e.anchor=l,!0;A(e,"can not read a block mapping entry; a multiline key may not be an implicit key")}}else 63===v?(g&&(I(e,d,c,u,m,null,r,s,o),u=m=f=null),_=!0,g=!0,n=!0):g?(g=!1,n=!0):A(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,v=b;if((e.line===x||e.lineIndent>t)&&(g&&(r=e.line,s=e.lineStart,o=e.position),K(e,t,4,!0,n)&&(g?m=e.result:f=e.result),g||(I(e,d,c,u,m,f,r,s,o),u=m=f=null),L(e,!0,-1),v=e.input.charCodeAt(e.position)),(e.line===x||e.lineIndent>t)&&0!==v)A(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return g&&I(e,d,c,u,m,null,r,s,o),_&&(e.tag=a,e.anchor=l,e.kind="mapping",e.result=d),_}function R(e){let t,i,n=!1,s=!1,o=e.input.charCodeAt(e.position);if(33!==o)return!1;null!==e.tag&&A(e,"duplication of a tag property"),o=e.input.charCodeAt(++e.position),60===o?(n=!0,o=e.input.charCodeAt(++e.position)):33===o?(s=!0,t="!!",o=e.input.charCodeAt(++e.position)):t="!";let c=e.position;if(n){do{o=e.input.charCodeAt(++e.position)}while(0!==o&&62!==o);e.position<e.length?(i=e.input.slice(c,e.position),o=e.input.charCodeAt(++e.position)):A(e,"unexpected end of the stream within a verbatim tag")}else{for(;0!==o&&!h(o);)33===o&&(s?A(e,"tag suffix cannot contain exclamation marks"):(t=e.input.slice(c-1,e.position+1),l.test(t)||A(e,"named tag handle cannot contain such characters"),s=!0,c=e.position+1)),o=e.input.charCodeAt(++e.position);i=e.input.slice(c,e.position),a.test(i)&&A(e,"tag suffix cannot contain flow indicator characters")}i&&!d.test(i)&&A(e,"tag name cannot contain such characters: "+i);try{i=decodeURIComponent(i)}catch(t){A(e,"tag name is malformed: "+i)}return n?e.tag=i:r.call(e.tagMap,t)?e.tag=e.tagMap[t]+i:"!"===t?e.tag="!"+i:"!!"===t?e.tag="tag:yaml.org,2002:"+i:A(e,'undeclared tag handle "'+t+'"'),!0}function B(e){let t=e.input.charCodeAt(e.position);if(38!==t)return!1;null!==e.anchor&&A(e,"duplication of an anchor property"),t=e.input.charCodeAt(++e.position);const i=e.position;for(;0!==t&&!h(t)&&!m(t);)t=e.input.charCodeAt(++e.position);return e.position===i&&A(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(i,e.position),!0}function H(e,t,i,n){const s=E(e);return function(e){e.anchorMapTransactions.push(Object.create(null))}(e),N(e,t),e.tag=null,e.anchor=null,e.kind=null,e.result=null,P(e,i,n)&&"mapping"===e.kind?(function(e){const t=e.anchorMapTransactions.pop(),i=e.anchorMapTransactions;if(0===i.length)return;const n=i[i.length-1],s=Object.keys(t);for(let e=0,i=s.length;e<i;e+=1){const i=s[e];r.call(n,i)||(n[i]=t[i])}}(e),!0):(function(e){const t=e.anchorMapTransactions.pop(),i=Object.keys(t);for(let n=i.length-1;n>=0;n-=1){const r=t[i[n]];r.existed?e.anchorMap[i[n]]=r.value:delete e.anchorMap[i[n]]}}(e),N(e,s),!1)}function K(t,i,n,s,o){let a,l,d,c,v,x=1,w=!1,k=!1,C=null;t.depth>=t.maxDepth&&A(t,"nesting exceeded maxDepth ("+t.maxDepth+")"),t.depth+=1,null!==t.listener&&t.listener("open",t),t.tag=null,t.anchor=null,t.kind=null,t.result=null;const N=a=l=4===n||3===n;if(s&&L(t,!0,-1)&&(w=!0,t.lineIndent>i?x=1:t.lineIndent===i?x=0:t.lineIndent<i&&(x=-1)),1===x)for(;;){const e=t.input.charCodeAt(t.position),n=E(t);if(w&&(33===e&&null!==t.tag||38===e&&null!==t.anchor))break;if(!R(t)&&!B(t))break;null===C&&(C=n),L(t,!0,-1)?(w=!0,l=N,t.lineIndent>i?x=1:t.lineIndent===i?x=0:t.lineIndent<i&&(x=-1)):l=!1}if(l&&(l=w||o),1===x||4===n)if(c=1===n||2===n?i:i+1,v=t.position-t.lineStart,1===x)if(l&&(z(t,v)||P(t,v,c))||function(e,t){let i,n,r,s=!0;const o=e.tag;let a;const l=e.anchor;let d,c,u,p;const m=Object.create(null);let f,g,_,v=e.input.charCodeAt(e.position);if(91===v)d=93,p=!1,a=[];else{if(123!==v)return!1;d=125,p=!0,a={}}for(null!==e.anchor&&S(e,e.anchor,a),v=e.input.charCodeAt(++e.position);0!==v;){if(L(e,!0,t),v=e.input.charCodeAt(e.position),v===d)return e.position++,e.tag=o,e.anchor=l,e.kind=p?"mapping":"sequence",e.result=a,!0;s?44===v&&A(e,"expected the node content, but found ','"):A(e,"missed comma between flow collection entries"),g=f=_=null,c=u=!1,63===v&&h(e.input.charCodeAt(e.position+1))&&(c=u=!0,e.position++,L(e,!0,t)),i=e.line,n=e.lineStart,r=e.position,K(e,t,1,!1,!0),g=e.tag,f=e.result,L(e,!0,t),v=e.input.charCodeAt(e.position),!u&&e.line!==i||58!==v||(c=!0,v=e.input.charCodeAt(++e.position),L(e,!0,t),K(e,t,1,!1,!0),_=e.result),p?I(e,a,m,g,f,_,i,n,r):c?a.push(I(e,null,m,g,f,_,i,n,r)):a.push(f),L(e,!0,t),v=e.input.charCodeAt(e.position),44===v?(s=!0,v=e.input.charCodeAt(++e.position)):s=!1}A(e,"unexpected end of the stream within a flow collection")}(t,c))k=!0;else{const i=t.input.charCodeAt(t.position);null!==C&&N&&!l&&124!==i&&62!==i&&H(t,C,C.position-C.lineStart,c)||a&&function(t,i){let n,r,s=1,o=!1,a=!1,l=i,d=0,c=!1,h=t.input.charCodeAt(t.position);if(124===h)n=!1;else{if(62!==h)return!1;n=!0}for(t.kind="scalar",t.result="";0!==h;)if(h=t.input.charCodeAt(++t.position),43===h||45===h)1===s?s=43===h?3:2:A(t,"repeat of a chomping mode identifier");else{if(!((r=_(h))>=0))break;0===r?A(t,"bad explicit indentation width of a block scalar; it cannot be less than one"):a?A(t,"repeat of an indentation width identifier"):(l=i+r-1,a=!0)}if(p(h)){do{h=t.input.charCodeAt(++t.position)}while(p(h));if(35===h)do{h=t.input.charCodeAt(++t.position)}while(!u(h)&&0!==h)}for(;0!==h;){for(F(t),t.lineIndent=0,h=t.input.charCodeAt(t.position);(!a||t.lineIndent<l)&&32===h;)t.lineIndent++,h=t.input.charCodeAt(++t.position);if(!a&&t.lineIndent>l&&(l=t.lineIndent),u(h)){d++;continue}if(a||0!==l||A(t,"missing indentation for block scalar"),t.lineIndent<l){3===s?t.result+=e.repeat("\n",o?1+d:d):1===s&&o&&(t.result+="\n");break}n?p(h)?(c=!0,t.result+=e.repeat("\n",o?1+d:d)):c?(c=!1,t.result+=e.repeat("\n",d+1)):0===d?o&&(t.result+=" "):t.result+=e.repeat("\n",d):t.result+=e.repeat("\n",o?1+d:d),o=!0,a=!0,d=0;const i=t.position;for(;!u(h)&&0!==h;)h=t.input.charCodeAt(++t.position);T(t,i,t.position,!1)}return!0}(t,c)||function(e,t){let i,n,r=e.input.charCodeAt(e.position);if(39!==r)return!1;for(e.kind="scalar",e.result="",e.position++,i=n=e.position;0!==(r=e.input.charCodeAt(e.position));)if(39===r){if(T(e,i,e.position,!0),r=e.input.charCodeAt(++e.position),39!==r)return!0;i=e.position,e.position++,n=e.position}else u(r)?(T(e,i,n,!0),j(e,L(e,!1,t)),i=n=e.position):e.position===e.lineStart&&U(e)?A(e,"unexpected end of the document within a single quoted scalar"):(e.position++,p(r)||(n=e.position));A(e,"unexpected end of the stream within a single quoted scalar")}(t,c)||function(e,t){let i,n,r,s=e.input.charCodeAt(e.position);if(34!==s)return!1;for(e.kind="scalar",e.result="",e.position++,i=n=e.position;0!==(s=e.input.charCodeAt(e.position));){if(34===s)return T(e,i,e.position,!0),e.position++,!0;if(92===s){if(T(e,i,e.position,!0),s=e.input.charCodeAt(++e.position),u(s))L(e,!1,t);else if(s<256&&y[s])e.result+=$[s],e.position++;else if((r=g(s))>0){let t=r,i=0;for(;t>0;t--)s=e.input.charCodeAt(++e.position),(r=f(s))>=0?i=(i<<4)+r:A(e,"expected hexadecimal character");e.result+=b(i),e.position++}else A(e,"unknown escape sequence");i=n=e.position}else u(s)?(T(e,i,n,!0),j(e,L(e,!1,t)),i=n=e.position):e.position===e.lineStart&&U(e)?A(e,"unexpected end of the document within a double quoted scalar"):(e.position++,p(s)||(n=e.position))}A(e,"unexpected end of the stream within a double quoted scalar")}(t,c)?k=!0:!function(e){let t=e.input.charCodeAt(e.position);if(42!==t)return!1;t=e.input.charCodeAt(++e.position);const i=e.position;for(;0!==t&&!h(t)&&!m(t);)t=e.input.charCodeAt(++e.position);e.position===i&&A(e,"name of an alias node must contain at least one character");const n=e.input.slice(i,e.position);return r.call(e.anchorMap,n)||A(e,'unidentified alias "'+n+'"'),e.result=e.anchorMap[n],L(e,!0,-1),!0}(t)?function(e,t,i){let n,r,s,o,a,l;const d=e.kind,c=e.result;let f=e.input.charCodeAt(e.position);if(h(f)||m(f)||35===f||38===f||42===f||33===f||124===f||62===f||39===f||34===f||37===f||64===f||96===f)return!1;if(63===f||45===f){const t=e.input.charCodeAt(e.position+1);if(h(t)||i&&m(t))return!1}for(e.kind="scalar",e.result="",n=r=e.position,s=!1;0!==f;){if(58===f){const t=e.input.charCodeAt(e.position+1);if(h(t)||i&&m(t))break}else if(35===f){if(h(e.input.charCodeAt(e.position-1)))break}else{if(e.position===e.lineStart&&U(e)||i&&m(f))break;if(u(f)){if(o=e.line,a=e.lineStart,l=e.lineIndent,L(e,!1,-1),e.lineIndent>=t){s=!0,f=e.input.charCodeAt(e.position);continue}e.position=r,e.line=o,e.lineStart=a,e.lineIndent=l;break}}s&&(T(e,n,r,!1),j(e,e.line-o),n=r=e.position,s=!1),p(f)||(r=e.position+1),f=e.input.charCodeAt(++e.position)}return T(e,n,r,!1),!!e.result||(e.kind=d,e.result=c,!1)}(t,c,1===n)&&(k=!0,null===t.tag&&(t.tag="?")):(k=!0,null===t.tag&&null===t.anchor||A(t,"alias node should not have any properties")),null!==t.anchor&&S(t,t.anchor,t.result)}else 0===x&&(k=l&&z(t,v));if(null===t.tag)null!==t.anchor&&S(t,t.anchor,t.result);else if("?"===t.tag){null!==t.result&&"scalar"!==t.kind&&A(t,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+t.kind+'"');for(let e=0,i=t.implicitTypes.length;e<i;e+=1)if(d=t.implicitTypes[e],d.resolve(t.result)){t.result=d.construct(t.result),t.tag=d.tag,null!==t.anchor&&S(t,t.anchor,t.result);break}}else if("!"!==t.tag){if(r.call(t.typeMap[t.kind||"fallback"],t.tag))d=t.typeMap[t.kind||"fallback"][t.tag];else{d=null;const e=t.typeMap.multi[t.kind||"fallback"];for(let i=0,n=e.length;i<n;i+=1)if(t.tag.slice(0,e[i].tag.length)===e[i].tag){d=e[i];break}}d||A(t,"unknown tag !<"+t.tag+">"),null!==t.result&&d.kind!==t.kind&&A(t,"unacceptable node kind for !<"+t.tag+'> tag; it should be "'+d.kind+'", not "'+t.kind+'"'),d.resolve(t.result,t.tag)?(t.result=d.construct(t.result,t.tag),null!==t.anchor&&S(t,t.anchor,t.result)):A(t,"cannot resolve a node with !<"+t.tag+"> explicit tag")}return null!==t.listener&&t.listener("close",t),t.depth-=1,null!==t.tag||null!==t.anchor||k}function q(e){const t=e.position;let i,n=!1;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);0!==(i=e.input.charCodeAt(e.position))&&(L(e,!0,-1),i=e.input.charCodeAt(e.position),!(e.lineIndent>0||37!==i));){n=!0,i=e.input.charCodeAt(++e.position);let t=e.position;for(;0!==i&&!h(i);)i=e.input.charCodeAt(++e.position);const s=e.input.slice(t,e.position),o=[];for(s.length<1&&A(e,"directive name must not be less than one character in length");0!==i;){for(;p(i);)i=e.input.charCodeAt(++e.position);if(35===i){do{i=e.input.charCodeAt(++e.position)}while(0!==i&&!u(i));break}if(u(i))break;for(t=e.position;0!==i&&!h(i);)i=e.input.charCodeAt(++e.position);o.push(e.input.slice(t,e.position))}0!==i&&F(e),r.call(O,s)?O[s](e,s,o):C(e,'unknown document directive "'+s+'"')}L(e,!0,-1),0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)?(e.position+=3,L(e,!0,-1)):n&&A(e,"directives end mark is expected"),K(e,e.lineIndent-1,4,!1,!0),L(e,!0,-1),e.checkLineBreaks&&o.test(e.input.slice(t,e.position))&&C(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&U(e)?46===e.input.charCodeAt(e.position)&&(e.position+=3,L(e,!0,-1)):e.position<e.length-1&&A(e,"end of the stream or a document separator is expected")}function W(e,t){t=t||{},0!==(e=String(e)).length&&(10!==e.charCodeAt(e.length-1)&&13!==e.charCodeAt(e.length-1)&&(e+="\n"),65279===e.charCodeAt(0)&&(e=e.slice(1)));const i=new w(e,t),n=e.indexOf("\0");for(-1!==n&&(i.position=n,A(i,"null byte is not allowed in input")),i.input+="\0";32===i.input.charCodeAt(i.position);)i.lineIndent+=1,i.position+=1;for(;i.position<i.length-1;)q(i);return i.documents}return dn.loadAll=function(e,t,i){null!==t&&"object"==typeof t&&void 0===i&&(i=t,t=null);const n=W(e,i);if("function"!=typeof t)return n;for(let e=0,i=n.length;e<i;e+=1)t(n[e])},dn.load=function(e,i){const n=W(e,i);if(0!==n.length){if(1===n.length)return n[0];throw new t("expected a single document in the stream, but found more")}},dn}var Dn,In,Fn={};function Ln(){if(Dn)return Fn;Dn=1;const e=un(),t=pn(),i=Tn(),n=Object.prototype.toString,r=Object.prototype.hasOwnProperty,s=65279,o={0:"\\0",7:"\\a",8:"\\b",9:"\\t",10:"\\n",11:"\\v",12:"\\f",13:"\\r",27:"\\e",34:'\\"',92:"\\\\",133:"\\N",160:"\\_",8232:"\\L",8233:"\\P"},a=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],l=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function d(i){let n,r;const s=i.toString(16).toUpperCase();if(i<=255)n="x",r=2;else if(i<=65535)n="u",r=4;else{if(!(i<=4294967295))throw new t("code point within a string may not be greater than 0xFFFFFFFF");n="U",r=8}return"\\"+n+e.repeat("0",r-s.length)+s}function c(t){this.schema=t.schema||i,this.indent=Math.max(1,t.indent||2),this.noArrayIndent=t.noArrayIndent||!1,this.skipInvalid=t.skipInvalid||!1,this.flowLevel=e.isNothing(t.flowLevel)?-1:t.flowLevel,this.styleMap=function(e,t){if(null===t)return{};const i={},n=Object.keys(t);for(let s=0,o=n.length;s<o;s+=1){let o=n[s],a=String(t[o]);"!!"===o.slice(0,2)&&(o="tag:yaml.org,2002:"+o.slice(2));const l=e.compiledTypeMap.fallback[o];l&&r.call(l.styleAliases,a)&&(a=l.styleAliases[a]),i[o]=a}return i}(this.schema,t.styles||null),this.sortKeys=t.sortKeys||!1,this.lineWidth=t.lineWidth||80,this.noRefs=t.noRefs||!1,this.noCompatMode=t.noCompatMode||!1,this.condenseFlow=t.condenseFlow||!1,this.quotingType='"'===t.quotingType?2:1,this.forceQuotes=t.forceQuotes||!1,this.replacer="function"==typeof t.replacer?t.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function u(t,i){const n=e.repeat(" ",i);let r=0,s="";const o=t.length;for(;r<o;){let e;const i=t.indexOf("\n",r);-1===i?(e=t.slice(r),r=o):(e=t.slice(r,i+1),r=i+1),e.length&&"\n"!==e&&(s+=n),s+=e}return s}function p(t,i){return"\n"+e.repeat(" ",t.indent*i)}function h(e){return 32===e||9===e}function m(e){return e>=32&&e<=126||e>=161&&e<=55295&&8232!==e&&8233!==e||e>=57344&&e<=65533&&e!==s||e>=65536&&e<=1114111}function f(e){return m(e)&&e!==s&&13!==e&&10!==e}function g(e,t,i){const n=f(e),r=n&&!h(e);return(i?n:n&&44!==e&&91!==e&&93!==e&&123!==e&&125!==e)&&35!==e&&!(58===t&&!r)||f(t)&&!h(t)&&35===e||58===t&&r}function _(e,t){const i=e.charCodeAt(t);let n;return i>=55296&&i<=56319&&t+1<e.length&&(n=e.charCodeAt(t+1),n>=56320&&n<=57343)?1024*(i-55296)+n-56320+65536:i}function v(e){return/^\n* /.test(e)}function b(e,t,i,n,r,o,a,l){let d,c=0,u=null,p=!1,f=!1;const b=-1!==n;let x=-1,y=function(e){return m(e)&&e!==s&&!h(e)&&45!==e&&63!==e&&58!==e&&44!==e&&91!==e&&93!==e&&123!==e&&125!==e&&35!==e&&38!==e&&42!==e&&33!==e&&124!==e&&61!==e&&62!==e&&39!==e&&34!==e&&37!==e&&64!==e&&96!==e}(_(e,0))&&function(e){return!h(e)&&58!==e}(_(e,e.length-1));if(t||a)for(d=0;d<e.length;c>=65536?d+=2:d++){if(c=_(e,d),!m(c))return 5;y=y&&g(c,u,l),u=c}else{for(d=0;d<e.length;c>=65536?d+=2:d++){if(c=_(e,d),10===c)p=!0,b&&(f=f||d-x-1>n&&" "!==e[x+1],x=d);else if(!m(c))return 5;y=y&&g(c,u,l),u=c}f=f||b&&d-x-1>n&&" "!==e[x+1]}return p||f?i>9&&v(e)?5:a?2===o?5:2:f?4:3:!y||a||r(e)?2===o?5:2:1}function x(e,i,n,r,s){e.dump=function(){if(0===i.length)return 2===e.quotingType?'""':"''";if(!e.noCompatMode&&(-1!==a.indexOf(i)||l.test(i)))return 2===e.quotingType?'"'+i+'"':"'"+i+"'";const c=e.indent*Math.max(1,n),p=-1===e.lineWidth?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-c),h=r||e.flowLevel>-1&&n>=e.flowLevel;switch(b(i,h,e.indent,p,function(t){return function(e,t){for(let i=0,n=e.implicitTypes.length;i<n;i+=1)if(e.implicitTypes[i].resolve(t))return!0;return!1}(e,t)},e.quotingType,e.forceQuotes&&!r,s)){case 1:return i;case 2:return"'"+i.replace(/'/g,"''")+"'";case 3:return"|"+y(i,e.indent)+$(u(i,c));case 4:return">"+y(i,e.indent)+$(u(function(e,t){const i=/(\n+)([^\n]*)/g;let n,r,s=function(){let n=e.indexOf("\n");return n=-1!==n?n:e.length,i.lastIndex=n,w(e.slice(0,n),t)}(),o="\n"===e[0]||" "===e[0];for(;r=i.exec(e);){const e=r[1],i=r[2];n=" "===i[0],s+=e+(o||n||""===i?"":"\n")+w(i,t),o=n}return s}(i,p),c));case 5:return'"'+function(e){let t="",i=0;for(let n=0;n<e.length;i>=65536?n+=2:n++){i=_(e,n);const r=o[i];!r&&m(i)?(t+=e[n],i>=65536&&(t+=e[n+1])):t+=r||d(i)}return t}(i)+'"';default:throw new t("impossible error: invalid scalar style")}}()}function y(e,t){const i=v(e)?String(t):"",n="\n"===e[e.length-1];return i+(n&&("\n"===e[e.length-2]||"\n"===e)?"+":n?"":"-")+"\n"}function $(e){return"\n"===e[e.length-1]?e.slice(0,-1):e}function w(e,t){if(""===e||" "===e[0])return e;const i=/ [^ ]/g;let n,r,s=0,o=0,a=0,l="";for(;n=i.exec(e);)a=n.index,a-s>t&&(r=o>s?o:a,l+="\n"+e.slice(s,r),s=r+1),o=a;return l+="\n",e.length-s>t&&o>s?l+=e.slice(s,o)+"\n"+e.slice(o+1):l+=e.slice(s),l.slice(1)}function k(e,t,i,n){let r="";const s=e.tag;for(let s=0,o=i.length;s<o;s+=1){let o=i[s];e.replacer&&(o=e.replacer.call(i,String(s),o)),(C(e,t+1,o,!0,!0,!1,!0)||void 0===o&&C(e,t+1,null,!0,!0,!1,!0))&&(n&&""===r||(r+=p(e,t)),e.dump&&10===e.dump.charCodeAt(0)?r+="-":r+="- ",r+=e.dump)}e.tag=s,e.dump=r||"[]"}function A(e,i,s){const o=s?e.explicitTypes:e.implicitTypes;for(let a=0,l=o.length;a<l;a+=1){const l=o[a];if((l.instanceOf||l.predicate)&&(!l.instanceOf||"object"==typeof i&&i instanceof l.instanceOf)&&(!l.predicate||l.predicate(i))){if(s?l.multi&&l.representName?e.tag=l.representName(i):e.tag=l.tag:e.tag="?",l.represent){const s=e.styleMap[l.tag]||l.defaultStyle;let o;if("[object Function]"===n.call(l.represent))o=l.represent(i,s);else{if(!r.call(l.represent,s))throw new t("!<"+l.tag+'> tag resolver accepts not "'+s+'" style');o=l.represent[s](i,s)}e.dump=o}return!0}}return!1}function C(e,i,r,s,o,a,l){e.tag=null,e.dump=r,A(e,r,!1)||A(e,r,!0);const d=n.call(e.dump),c=s;s&&(s=e.flowLevel<0||e.flowLevel>i);const u="[object Object]"===d||"[object Array]"===d;let h,m;if(u&&(h=e.duplicates.indexOf(r),m=-1!==h),(null!==e.tag&&"?"!==e.tag||m||2!==e.indent&&i>0)&&(o=!1),m&&e.usedDuplicates[h])e.dump="*ref_"+h;else{if(u&&m&&!e.usedDuplicates[h]&&(e.usedDuplicates[h]=!0),"[object Object]"===d)s&&0!==Object.keys(e.dump).length?(!function(e,i,n,r){let s="";const o=e.tag,a=Object.keys(n);if(!0===e.sortKeys)a.sort();else if("function"==typeof e.sortKeys)a.sort(e.sortKeys);else if(e.sortKeys)throw new t("sortKeys must be a boolean or a function");for(let t=0,o=a.length;t<o;t+=1){let o="";r&&""===s||(o+=p(e,i));const l=a[t];let d=n[l];if(e.replacer&&(d=e.replacer.call(n,l,d)),!C(e,i+1,l,!0,!0,!0))continue;const c=null!==e.tag&&"?"!==e.tag||e.dump&&e.dump.length>1024;c&&(e.dump&&10===e.dump.charCodeAt(0)?o+="?":o+="? "),o+=e.dump,c&&(o+=p(e,i)),C(e,i+1,d,!0,c)&&(e.dump&&10===e.dump.charCodeAt(0)?o+=":":o+=": ",o+=e.dump,s+=o)}e.tag=o,e.dump=s||"{}"}(e,i,e.dump,o),m&&(e.dump="&ref_"+h+e.dump)):(!function(e,t,i){let n="";const r=e.tag,s=Object.keys(i);for(let r=0,o=s.length;r<o;r+=1){let o="";""!==n&&(o+=", "),e.condenseFlow&&(o+='"');const a=s[r];let l=i[a];e.replacer&&(l=e.replacer.call(i,a,l)),C(e,t,a,!1,!1)&&(e.dump.length>1024&&(o+="? "),o+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),C(e,t,l,!1,!1)&&(o+=e.dump,n+=o))}e.tag=r,e.dump="{"+n+"}"}(e,i,e.dump),m&&(e.dump="&ref_"+h+" "+e.dump));else if("[object Array]"===d)s&&0!==e.dump.length?(e.noArrayIndent&&!l&&i>0?k(e,i-1,e.dump,o):k(e,i,e.dump,o),m&&(e.dump="&ref_"+h+e.dump)):(!function(e,t,i){let n="";const r=e.tag;for(let r=0,s=i.length;r<s;r+=1){let s=i[r];e.replacer&&(s=e.replacer.call(i,String(r),s)),(C(e,t,s,!1,!1)||void 0===s&&C(e,t,null,!1,!1))&&(""!==n&&(n+=","+(e.condenseFlow?"":" ")),n+=e.dump)}e.tag=r,e.dump="["+n+"]"}(e,i,e.dump),m&&(e.dump="&ref_"+h+" "+e.dump));else{if("[object String]"!==d){if("[object Undefined]"===d)return!1;if(e.skipInvalid)return!1;throw new t("unacceptable kind of an object to dump "+d)}"?"!==e.tag&&x(e,e.dump,i,a,c)}if(null!==e.tag&&"?"!==e.tag){let t=encodeURI("!"===e.tag[0]?e.tag.slice(1):e.tag).replace(/!/g,"%21");t="!"===e.tag[0]?"!"+t:"tag:yaml.org,2002:"===t.slice(0,18)?"!!"+t.slice(18):"!<"+t+">",e.dump=t+" "+e.dump}}return!0}function S(e,t){const i=[],n=[];E(e,i,n);const r=n.length;for(let e=0;e<r;e+=1)t.duplicates.push(i[n[e]]);t.usedDuplicates=new Array(r)}function E(e,t,i){if(null!==e&&"object"==typeof e){const n=t.indexOf(e);if(-1!==n)-1===i.indexOf(n)&&i.push(n);else if(t.push(e),Array.isArray(e))for(let n=0,r=e.length;n<r;n+=1)E(e[n],t,i);else{const n=Object.keys(e);for(let r=0,s=n.length;r<s;r+=1)E(e[n[r]],t,i)}}}return Fn.dump=function(e,t){const i=new c(t=t||{});i.noRefs||S(e,i);let n=e;return i.replacer&&(n=i.replacer.call({"":n},"",n)),C(i,0,n,!0,!0)?i.dump+"\n":""},Fn}const Un=gi(function(){if(In)return ln;In=1;const e=Mn(),t=Ln();function i(e,t){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+t+" instead, which is now safe by default.")}}return ln.Type=hn(),ln.Schema=mn(),ln.FAILSAFE_SCHEMA=vn(),ln.JSON_SCHEMA=wn(),ln.CORE_SCHEMA=kn(),ln.DEFAULT_SCHEMA=Tn(),ln.load=e.load,ln.loadAll=e.loadAll,ln.dump=t.dump,ln.YAMLException=pn(),ln.types={binary:Sn(),float:$n(),map:_n(),null:bn(),pairs:Nn(),set:On(),timestamp:An(),bool:xn(),int:yn(),merge:Cn(),omap:En(),seq:gn(),str:fn()},ln.safeLoad=i("safeLoad","load"),ln.safeLoadAll=i("safeLoadAll","loadAll"),ln.safeDump=i("safeDump","dump"),ln}()),{Type:jn,Schema:zn,FAILSAFE_SCHEMA:Pn,JSON_SCHEMA:Rn,CORE_SCHEMA:Bn,DEFAULT_SCHEMA:Hn,load:Kn,loadAll:qn,dump:Wn,YAMLException:Yn,types:Jn,safeLoad:Gn,safeLoadAll:Vn,safeDump:Zn}=Un;class Xn extends Error{}const Qn=e=>"object"==typeof e&&null!==e&&!Array.isArray(e),er=e=>{if(null==e||"object"==typeof e)return;return String(e).trim()||void 0},tr=(e,t=!1)=>{if(null==e||""===e||"boolean"==typeof e)return;const i=Number(e);return Number.isFinite(i)?t?Math.trunc(i):i:void 0},ir=e=>{if(null!=e&&""!==e){if("number"==typeof e)return[Math.trunc(e)];if("string"==typeof e)return e.trim()||void 0;if(Array.isArray(e)){const t=e.map(e=>{if("number"==typeof e)return Math.trunc(e);const t=String(e).trim();return/^\d+$/.test(t)?Number(t):t}).filter(e=>""!==e);return t.length?t:void 0}}},nr=e=>Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e)),rr=e=>{const t=Qn(e)?e:{};return nr({channel:tr(t.channel,!0)??1,name:er(t.name)??"",friendly_name:er(t.friendly_name),type:er(t.type),transition:tr(t.transition),output_correction:er(t.output_correction),channel_size:er(t.channel_size),channel_setup:ir(t.channel_setup),byte_order:er(t.byte_order),min_temp:er(t.min_temp),max_temp:er(t.max_temp)})},sr=e=>{const t=Qn(e)?e:{};return nr({host:er(t.host)??"",host_override:er(t.host_override),port:tr(t.port,!0),port_override:tr(t.port_override,!0),max_fps:tr(t.max_fps,!0),refresh_every:tr(t.refresh_every),node_type:er(t.node_type),universes:Array.isArray(t.universes)?t.universes.map((e,t)=>((e,t)=>{const i=Qn(e)?e:{};return nr({id:tr(i.id,!0)??t,send_partial_universe:(n=i.send_partial_universe,"boolean"==typeof n?n:"true"===n||"false"!==n&&void 0),output_correction:er(i.output_correction),devices:Array.isArray(i.devices)?i.devices.map(rr):[]});var n})(e,t)):[]})},or=e=>{const t=e.universes,i=Qn(t)?Object.entries(t).map(([e,t])=>({...Qn(t)?t:{},id:e})):Array.isArray(t)?t:[];return sr({...e,universes:i})},ar=e=>Array.isArray(e)?e.filter(Qn).filter(e=>!e.platform||"artnet_led"===e.platform):Qn(e)?void 0!==e.platform||void 0!==e.universes?ar([e]):Object.entries(e).filter(([e])=>"light"===e||e.startsWith("light ")).flatMap(([,e])=>ar(Array.isArray(e)?e:[e])):[],lr=e=>{let t;try{t=Kn((e=>e.replace(/!(include\w*|secret|env_var|input)\b[^\n]*/g,"null"))(e))}catch(e){throw new Xn(e.message)}const i=ar(t);if(!i.length)throw new Xn("no artnet_led configuration found");return{title:"",nodes:i.map(or)}},dr=e=>{let t;try{t=JSON.parse(e)}catch(e){throw new Xn(e.message)}return(e=>{if(!Qn(e)||!Array.isArray(e.nodes))throw new Xn("expected an object with a 'nodes' list");return{title:er(e.title)??"",nodes:e.nodes.map(sr)}})(t)},cr="0.4.0",ur="dmx_config_ui.target",pr=["dmx","artnet_led"],hr=e=>({config:e,saved:JSON.stringify(e),history:[],future:[]}),mr=e=>"error"===(e.severity??"error"),fr=e=>{history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))};class gr extends ae{constructor(){super(...arguments),this.narrow=!1,this.embedded=!1,this._docs={artnet_led:{saved:"",history:[],future:[]},dmx:{saved:"",history:[],future:[]}},this._target="artnet_led",this._issues=new Yt,this._saving=!1,this._menuOpen=!1,this._importOpen=!1,this._importText="",this._libraryOpen=!1,this._loadStarted=!1,this._targetChosen=!1,this._onBeforeUnload=e=>{(this._isDirty("artnet_led")||this._isDirty("dmx"))&&e.preventDefault()},this._onKeyDown=e=>{if(!e.ctrlKey&&!e.metaKey||!this.isConnected||!this._config)return;if(this._modalOpen)return;const t=e.key.toLowerCase();if("s"===t)return e.preventDefault(),void this._save();const i=e.composedPath()[0];i&&["INPUT","TEXTAREA","SELECT"].includes(i.tagName)||("z"!==t||e.shiftKey?("z"===t&&e.shiftKey||"y"===t)&&(e.preventDefault(),this._redo()):(e.preventDefault(),this._undo()))}}get _t(){return t=this.hass,e=(t?.locale?.language??t?.language??navigator.language??"en").toLowerCase().startsWith("de")?"de":"en",(t,i)=>{const n=De[e][t]??Me[t]??t;return i?n.replace(/\{(\w+)\}/g,(e,t)=>t in i?String(i[t]):e):n};var e,t}get _doc(){return this._docs[this._target]}get _config(){return this._doc.config}get _legacy(){return this._docs.artnet_led.config}get _dmx(){return this._docs.dmx.config}_isDirty(e){const t=this._docs[e];return void 0!==t.config&&JSON.stringify(t.config)!==t.saved}get _dirty(){return this._isDirty(this._target)}get _modalOpen(){return this._importOpen||Boolean(this._deploy||this._confirm||this._migrate)||this._libraryOpen}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKeyDown),window.addEventListener("beforeunload",this._onBeforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("beforeunload",this._onBeforeUnload),window.clearTimeout(this._toastTimer)}willUpdate(e){if(["_docs","_target","_fixtures"].some(t=>e.has(t))){const e=this._config;e?"dmx"===this._target?this._issues=new Yt(ti(e,this._fixtures?.fixtures)):this._issues=new Yt(qt(e)):this._issues=new Yt}}updated(e){e.has("hass")&&this.hass&&!this._loadStarted&&(this._loadStarted=!0,this._load());const t=this._dmx?.fixtures_folder;"dmx"===this._target&&void 0!==t&&t!==this._fixturesFolder&&(this._fixturesFolder=t,this._loadFixtures())}_patchDoc(e,t){this._docs={...this._docs,[e]:{...this._docs[e],...t}}}_setConfig(e,t=this._target){const i=this._docs[t];this._patchDoc(t,{config:e,history:i.config?[...i.history,JSON.stringify(i.config)].slice(-100):i.history,future:[]})}_undo(){const e=this._doc;e.history.length&&e.config&&this._patchDoc(this._target,{future:[JSON.stringify(e.config),...e.future],config:JSON.parse(e.history[e.history.length-1]),history:e.history.slice(0,-1)})}_redo(){const e=this._doc;e.future.length&&e.config&&this._patchDoc(this._target,{history:[...e.history,JSON.stringify(e.config)],config:JSON.parse(e.future[0]),future:e.future.slice(1)})}_selectTarget(e){this._target=e,this._menuOpen=!1;try{window.localStorage.setItem(ur,e)}catch{}}_initialTarget(e){const t=(()=>{try{const e=window.localStorage.getItem(ur);return"dmx"===e||"artnet_led"===e?e:void 0}catch{return}})();if(t)return t;const i=e.backends,n=Boolean(this._legacy?.nodes.length);return!i?.dmx.installed||i.artnet_led.installed&&n?!i?.artnet_led.installed&&ct(this._dmx)?"dmx":"artnet_led":"dmx"}_showToast(e,t){this._toast={type:e,text:t},window.clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast=void 0,4e3)}_confirmIf(e,t,i){e?this._confirm={...t,action:i}:i()}_hasContent(e=this._target){return"dmx"===e?ct(this._dmx):Boolean(this._legacy?.nodes.length)}async _load(){if(this.hass){this._loadError=void 0;try{const[e,t,i]=await Promise.all([fe(this.hass,"artnet_led"),fe(this.hass,"dmx"),_e(this.hass)]);this._docs={artnet_led:hr(e??{title:"",nodes:[]}),dmx:hr(t??{fixtures_folder:"fixtures",artnet:{universes:[]},sacn:{universes:[]}})},this._status=i,this._fixturesFolder=void 0,this._targetChosen||(this._targetChosen=!0,this._target=this._initialTarget(i))}catch(e){this._loadError=be(e)}}}async _refreshStatus(){if(this.hass)try{this._status=await _e(this.hass)}catch{}}async _loadFixtures(){const e=this._dmx?.fixtures_folder;var t,i;if(this.hass&&void 0!==e)try{this._fixtures=await(t=this.hass,i={fixtures_folder:"fixtures",artnet:{universes:[]},sacn:{universes:[]},fixtures_folder:e},t.callWS({type:`${me}/fixtures`,...i?{config:i}:{}}))}catch(e){this._showToast("error",be(e))}}async _save(){const e=this._target,t=this._config;if(this.hass&&t&&!this._saving){this._saving=!0;try{const i=await((e,t,i="artnet_led")=>e.callWS({type:`${me}/save`,config:t,target:i}))(this.hass,t,e);JSON.stringify(i.config)!==JSON.stringify(t)&&this._patchDoc(e,{config:i.config}),this._patchDoc(e,{saved:JSON.stringify(this._docs[e].config)}),this._showToast("success",this._t("saved"))}catch(e){this._showToast("error",`${this._t("saveError")}: ${be(e)}`)}finally{this._saving=!1}}}async _openDeploy(){const e=this._target,t=this._config;if(this.hass&&t){this._deploy={target:e,busy:!0};try{this._deploy={target:e,busy:!1,preview:await ge(this.hass,t,e)}}catch(t){this._deploy={target:e,busy:!1,error:be(t)}}}}async _runDeploy(){const e=this._deploy,t=e&&this._docs[e.target].config;if(this.hass&&e&&t){this._deploy={...e,busy:!0,error:void 0};try{const i=await((e,t,i="artnet_led")=>e.callWS({type:`${me}/deploy`,config:t,target:i}))(this.hass,t,e.target);"invalid"!==i.status&&this._patchDoc(e.target,{saved:JSON.stringify(t)}),this._deploy={...e,busy:!1,result:i},this._refreshStatus(),"dmx"===e.target&&i.installed_fixtures?.length&&this._loadFixtures()}catch(t){this._deploy={...e,busy:!1,error:be(t)}}}}async _openMigrate(){if(this.hass){this._migrate={};try{this._migrate={result:await(e=this.hass,t=this._legacy,e.callWS({type:`${me}/migrate`,...t?{config:t}:{}}))}}catch(e){this._migrate={error:be(e)}}var e,t}}_applyMigration(){const e=this._migrate?.result;this._migrate=void 0,e&&(this._setConfig(e.config,"dmx"),this._selectTarget("dmx"))}_menuAction(e){this._menuOpen=!1,e()}_replaceConfig(e,t){this._confirmIf(this._hasContent(t),{title:"confirmImportTitle",text:"confirmImportText"},()=>{this._setConfig(e,t),this._selectTarget(t)})}_importYaml(){try{const e=lr(this._importText);this._importOpen=!1,this._importText="",this._importError=void 0,this._replaceConfig(e,"artnet_led")}catch(e){this._importError=this._t("importFailed",{error:e instanceof Xn?e.message:be(e)})}}async _importExisting(){if(!this.hass)return;const e=this._target;try{if("dmx"===e){const e=await ve(this.hass,"dmx");return ct(e)?void this._replaceConfig(e,"dmx"):void this._showToast("info",this._t("importNothingDmx"))}const t=await ve(this.hass,"artnet_led");if(!t.nodes.length)return void this._showToast("info",this._t("importNothing"));this._replaceConfig(t,"artnet_led")}catch(e){this._showToast("error",this._t("importFailed",{error:be(e)}))}}async _importFile(e){const t=e.target,i=t.files?.[0];var n;if(t.value="",i)try{const e=await i.text();if(!i.name.endsWith(".json"))return void this._replaceConfig(lr(e),"artnet_led");let t;try{t=JSON.parse(e)}catch(e){throw new Xn(e.message)}it(n=t)&&("artnet"in n||"sacn"in n||"fixtures_folder"in n)?this._replaceConfig((e=>{if(!it(e))return{fixtures_folder:"fixtures",artnet:{universes:[]},sacn:{universes:[]}};const t=it(e.artnet)?e.artnet:{},i=it(e.sacn)?e.sacn:{},n=(e,t)=>at(Object.fromEntries(t.map(t=>[t,"source_name"===t||"interface_ip"===t?ot(e[t]):"enable_preview_data"===t?"boolean"==typeof e[t]?e[t]:void 0:st(e[t])]))),r=(e,t)=>at({...n(e,t),_extra:nt(e,[...t,"universes"])});return at({fixtures_folder:ot(e.fixtures_folder)??Ue,max_fps:st(e.max_fps),_extra:nt(e,["fixtures_folder","max_fps","fixtures_extra","animation_extra","artnet","sacn"]),fixtures_extra:it(e.fixtures_extra)?e.fixtures_extra:void 0,animation_extra:it(e.animation_extra)?e.animation_extra:void 0,artnet:{...r(t,["refresh_every","rate_limit"]),universes:rt(t.universes).filter(it).map(e=>at({net:st(e.net)??0,subnet:st(e.subnet)??0,universe:st(e.universe)??0,send_partial_universe:"boolean"==typeof e.send_partial_universe?e.send_partial_universe:void 0,manual_nodes:lt(e.manual_nodes),devices:rt(e.devices).map(dt),_extra:nt(e,["net","subnet","universe","send_partial_universe","manual_nodes","devices","_compatibility_extra"]),_compatibility_extra:it(e._compatibility_extra)?e._compatibility_extra:void 0}))},sacn:{...r(i,["source_name","priority","interface_ip","sync_address","multicast_ttl","enable_preview_data","refresh_every","rate_limit"]),universes:rt(i.universes).filter(it).map(e=>({universe:st(e.universe)??1,unicast_addresses:lt(e.unicast_addresses),devices:rt(e.devices).map(dt),_extra:nt(e,["universe","unicast_addresses","devices","_compatibility_extra"]),_compatibility_extra:it(e._compatibility_extra)?e._compatibility_extra:void 0}))}})})(t),"dmx"):this._replaceConfig(dr(e),"artnet_led")}catch(e){this._showToast("error",this._t("importFailed",{error:be(e)}))}}_exportJson(){if(!this._config)return;const e=new Blob([JSON.stringify(this._config,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download="dmx"===this._target?"dmx-uiconfig.json":"artnet-led-uiconfig.json",i.click(),URL.revokeObjectURL(t)}_emptied(){if("dmx"===this._target){const e=this._dmx;return{...e,artnet:{...e.artnet,universes:[]},sacn:{...e.sacn,universes:[]}}}return{...this._legacy,nodes:[]}}_openRepairsButton(e=""){return H`<button class=${e} @click=${()=>fr("/config/repairs")}>${this._t("openRepairs")}</button>`}_renderBanners(){const e=this._t,t=this._status,i=[],n=this.panel?.config?.version??t?.version;if(n&&n!==cr&&i.push(Ae("warning",e("versionMismatch",{frontend:cr,backend:n}))),!t)return i;const r=t.backends;if("artnet_led"===this._target)t.artnet_led_installed||r?.dmx.installed||i.push(Ae("warning",e("artnetMissing"))),t.included||!t.file_exists&&!this._hasContent("artnet_led")||i.push(Ae("warning",H`${e("includeMissing",{path:t.path})}
              <pre class="include">${t.include_key}: !include ${t.path}</pre>
              ${this._openRepairsButton()}`));else{const n=t.dmx;r&&!r.dmx.installed&&i.push(Ae("warning",e("dmxMissing"))),n&&!n.included&&(n.file_exists||this._hasContent("dmx"))&&i.push(Ae("warning",H`${e("includeMissing",{path:n.path})}
              <pre class="include">dmx: !include ${n.path}</pre>
              ${n.foreign_block?H`<p>${e("dmxForeignBlock")}</p>`:q}
              ${this._openRepairsButton()}`)),r?.dmx.installed&&this._hasContent("artnet_led")&&!this._hasContent("dmx")&&i.push(Ae("info",H`${e("dmxSuggestMigrate")}
              <button class="inline" @click=${this._openMigrate}>${e("migrateFrom0x")}</button>`));const s=this._fixtures?.errors??[];s.length&&i.push(Ae("warning",H`${e("dmxFixtureErrors")}
              <ul class="issues">
                ${s.map(e=>H`<li><code>${e.file}</code>: ${e.error}</li>`)}
              </ul>`))}return t.restart_required&&i.push(Ae("info",H`${e("restartPending")} ${this._openRepairsButton("inline")}`)),i}_renderTabs(){const e=this._t,t=this._status?.backends;return H`
      <div class="tabs" role="tablist">
        ${pr.map(i=>{const n=t?.[i],r=i===this._target;return H`
            <button
              role="tab"
              class="tab ${r?"active":""}"
              aria-selected=${r}
              @click=${()=>this._selectTarget(i)}
            >
              <span class="tab-title">
                ${ke("dmx"===i?"mdi:spotlight-beam":"mdi:lightbulb")}
                ${e("dmx"===i?"tabDmx":"tabLegacy")}
                ${this._isDirty(i)?H`<span class="dot" title=${e("unsaved")}></span>`:q}
              </span>
              <span class="tab-sub">${e("dmx"===i?"tabDmxSub":"tabLegacySub")}</span>
              ${n?H`<span class="badge ${n.installed?"ok":"missing"}">
                    ${n.installed?e("backendInstalled",{version:"dmx"!==i&&n.version?`v${n.version}`:""}).trim():e("backendMissing")}
                  </span>`:q}
            </button>
          `})}
      </div>
    `}_renderMenu(){const e=this._t,t="dmx"===this._target,i=(e,t,i={})=>H`<button role="menuitem" class=${i.danger?"danger":""} ?disabled=${i.disabled} @click=${()=>this._menuAction(t)}>${e}</button>`;return H`
      <div class="menu-backdrop" @click=${()=>this._menuOpen=!1}></div>
      <div class="menu" role="menu">
        ${t?H`${i(e("migrateFrom0x"),()=>{this._openMigrate()},{disabled:!this._hasContent("artnet_led")})}
              ${i(e("dmxLibrary"),()=>this._libraryOpen=!0)}
              <hr />`:i(e("importYaml"),()=>this._importOpen=!0)}
        ${i(e("importExisting"),()=>{this._importExisting()})}
        ${i(e("importJson"),()=>this._fileInput?.click())}
        ${i(e("exportJson"),()=>this._exportJson())}
        <hr />
        ${i(e("loadExample"),()=>this._confirmIf(this._hasContent(),{title:"confirmExampleTitle",text:"confirmExampleText"},()=>this._setConfig(t?{fixtures_folder:"fixtures",max_fps:30,artnet:{universes:[{net:0,subnet:0,universe:0,devices:[{name:"Living room dimmer",start_address:1,fixture:"DeskCh",mode:"16bit"},{name:"Kitchen strip",start_address:3,fixture:"RGBW",mode:"8bit",entity_id_prefix:"kitchen_strip"},{name:"Bar RGB",start_address:7,fixture:"RGB",mode:"16bit",output_correction:{curve:"quadratic"}}]}]},sacn:{universes:[]}}:{title:"",nodes:[{host:"192.168.0.10",max_fps:25,refresh_every:0,node_type:"artnet-direct",universes:[{id:0,send_partial_universe:!0,output_correction:"quadratic",devices:[{channel:1,name:"my_dimmer",type:"dimmer",transition:1,channel_size:"16bit"},{channel:3,name:"my_rgb_lamp",type:"rgb",transition:1,channel_size:"16bit",output_correction:"quadratic",channel_setup:"rbgw"},{channel:125,name:"my_color_temp_lamp",type:"color_temp",min_temp:"2500K",max_temp:"6500K",channel_setup:"ch"},{channel:41,name:"my_rgbww_lamp",type:"rgbww",transition:10},{channel:50,name:"sp4led_1_dimmer",type:"fixed",channel_setup:[255]}]}]}]})))}
        ${i(e("clearAll"),()=>this._confirmIf(!0,{title:"confirmClearTitle",text:"confirmClearText"},()=>this._setConfig(this._emptied())),{danger:!0,disabled:!this._hasContent()})}
        ${i(e("reload"),()=>this._confirmIf(this._isDirty("artnet_led")||this._isDirty("dmx"),{title:"confirmReloadTitle",text:"confirmReloadText"},()=>{this._load()}))}
      </div>
    `}_renderToolbar(){const e=this._t,t=this._issues.issues,i=t.filter(mr).length,n=t.length-i,r=this._doc;return H`
      <div class="toolbar">
        <button class="icon" title="${e("undo")} (Ctrl+Z)" aria-label=${e("undo")} ?disabled=${!r.history.length} @click=${this._undo}>
          ${ke("mdi:undo")}
        </button>
        <button class="icon" title="${e("redo")} (Ctrl+Shift+Z)" aria-label=${e("redo")} ?disabled=${!r.future.length} @click=${this._redo}>
          ${ke("mdi:redo")}
        </button>
        ${"dmx"===this._target?H`<button @click=${()=>this._libraryOpen=!0}>${ke("mdi:bookshelf")} ${e("dmxLibrary")}</button>`:H`<button @click=${()=>this._setConfig({...this._legacy,nodes:[...this._legacy.nodes,Pt()]})}>
              ${ke("mdi:plus")} ${e("addNode")}
            </button>`}
        <div class="menu-wrap">
          <button aria-haspopup="menu" aria-expanded=${this._menuOpen} @click=${()=>this._menuOpen=!this._menuOpen}>
            ${ke("mdi:dots-vertical")} ${e("more")}
          </button>
          ${this._menuOpen?this._renderMenu():q}
        </div>
        <input
          type="file"
          accept=${"dmx"===this._target?".json,application/json":".json,.yaml,.yml,application/json"}
          hidden
          @change=${this._importFile}
        />
        <span class="spacer"></span>
        ${i?H`<span class="state error">${e("errorsCount",{count:i})}</span>`:q}
        ${n?H`<span class="state warning">${e("warningsCount",{count:n})}</span>`:q}
        ${this._dirty?H`<span class="state">${e("unsaved")}</span>`:q}
        <button ?disabled=${!this._dirty||this._saving} @click=${this._save}>
          ${this._saving?e("saving"):e("save")}
        </button>
        <button class="primary" title=${e(i?"deployBlocked":"deployHint")} ?disabled=${i>0} @click=${this._openDeploy}>
          ${e("deploy")}
        </button>
      </div>
      ${this._toast?H`<div class="toast">${Ae(this._toast.type,this._toast.text)}</div>`:q}
    `}_renderIssues(e){return H`<ul class="issues">
      ${e.map(e=>H`<li><code>${e.path.join(".")}</code>: ${Fe(this._t,e)}</li>`)}
    </ul>`}_renderDiff(e){return H`<pre class="diff">${e.split("\n").map(e=>{const t=e.startsWith("+++")||e.startsWith("---")?"meta":e.startsWith("+")?"add":e.startsWith("-")?"del":e.startsWith("@@")?"hunk":"";return H`<span class=${t}>${e}\n</span>`})}</pre>`}_renderWarnings(e){const t=e.filter(e=>!mr(e));return t.length?Ae("warning",H`${this._t("deployWarnings")}${this._renderIssues(t)}`):q}_renderDeployDialog(){const e=this._deploy;if(!e)return q;const t=this._t,{preview:i,result:n}=e;let r=H`<p>${t("loading")}</p>`,s=!1;if(n)r=H`
        ${"invalid"===n.status?H`${Ae("error",t("deployInvalid"))}${this._renderIssues(ii(n.errors??[]))}`:Ae("success",t("written"===n.status?"deployWritten":"deployUnchanged",{path:n.path}))}
        ${n.installed_fixtures?.length?Ae("info",t("deployFixturesInstalled",{files:n.installed_fixtures.join(", ")})):q}
        ${this._renderWarnings(n.warnings??[])}
        ${n.check_error?Ae("error",H`${t("deployCheckError")}<pre>${n.check_error}</pre>`):q}
        ${"invalid"!==n.status&&!1===n.included?Ae("warning",t("deployNotIncluded")):q}
        ${n.restart_required?Ae("info",t("deployRestart")):q}
      `;else if(i){const e=ii(i.errors);s=!e.length,r=H`
        <p class="muted">${t("deployTarget",{path:i.path})}</p>
        ${e.length?H`${Ae("error",t("deployInvalid"))}${this._renderIssues(e)}`:H`${this._renderWarnings(i.errors)}
            ${i.changed?this._renderDiff(i.diff):Ae("info",t("deployNoChanges"))}`}
      `}return H`
      <artnetui-dialog
        open
        wide
        .heading=${t("deployTitle")}
        .closeLabel=${t("close")}
        @closed=${()=>!e.busy&&(this._deploy=void 0)}
      >
        ${e.error?Ae("error",t("deployFailed",{error:e.error})):q}
        ${r}
        ${n?.restart_required||n&&!1===n.included?H`<button slot="actions" @click=${()=>{this._deploy=void 0,fr("/config/repairs")}}>${t("openRepairs")}</button>`:q}
        <button slot="actions" ?disabled=${e.busy} @click=${()=>this._deploy=void 0}>
          ${t(n?"close":"cancel")}
        </button>
        ${n?q:H`<button slot="actions" class="primary" ?disabled=${!s||e.busy} @click=${this._runDeploy}>
              ${e.busy&&i?t("deploying"):t("deployAction")}
            </button>`}
      </artnetui-dialog>
    `}_renderImportDialog(){if(!this._importOpen)return q;const e=this._t;return H`
      <artnetui-dialog
        open
        .heading=${e("importYamlTitle")}
        .subtitle=${e("importYamlSubtitle")}
        .closeLabel=${e("close")}
        @closed=${()=>this._importOpen=!1}
      >
        <textarea
          rows="14"
          spellcheck="false"
          placeholder="light:\n  - platform: artnet_led\n    host: 192.168.0.10\n    universes: ..."
          .value=${this._importText}
          @input=${e=>this._importText=e.target.value}
        ></textarea>
        ${this._importError?Ae("error",this._importError):q}
        <button slot="actions" @click=${()=>this._importOpen=!1}>${e("cancel")}</button>
        <button slot="actions" class="primary" ?disabled=${!this._importText.trim()} @click=${this._importYaml}>
          ${e("importAction")}
        </button>
      </artnetui-dialog>
    `}_renderConfirmDialog(){const e=this._confirm;if(!e)return q;const t=this._t;return H`
      <artnetui-dialog open .heading=${t(e.title)} .closeLabel=${t("close")} @closed=${()=>this._confirm=void 0}>
        <p>${t(e.text)}</p>
        <button slot="actions" @click=${()=>this._confirm=void 0}>${t("cancel")}</button>
        <button slot="actions" class="primary" @click=${()=>{this._confirm=void 0,e.action()}}>${t("confirm")}</button>
      </artnetui-dialog>
    `}_renderMigrateDialog(){const e=this._migrate;return e?H`
      <artnetui-migrate-dialog
        .t=${this._t}
        .result=${e.result}
        .error=${e.error}
        ?replacing=${this._hasContent("dmx")}
        @apply=${this._applyMigration}
        @closed=${()=>this._migrate=void 0}
      ></artnetui-migrate-dialog>
    `:q}_renderLibrary(){return this._libraryOpen&&this.hass?H`
      <artnetui-fixture-library
        .hass=${this.hass}
        .t=${this._t}
        .library=${this._fixtures}
        @fixtures-changed=${()=>{this._loadFixtures()}}
        @closed=${()=>this._libraryOpen=!1}
      ></artnetui-fixture-library>
    `:q}_renderHeader(){return this.embedded?q:H`
      <div class="header">
        ${ye("ha-menu-button")?H`<ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>`:q}
        <div class="title">${this._t("title")}</div>
        <span class="version">v${cr}</span>
      </div>
    `}_renderEditor(){const e=this._t;return"dmx"===this._target?H`
        <artnetui-dmx-editor
          .config=${this._dmx}
          .fixtures=${this._fixtures?.fixtures}
          .issues=${this._issues}
          .t=${e}
          @config-changed=${e=>this._setConfig(e.detail.config,"dmx")}
          @open-library=${()=>this._libraryOpen=!0}
        ></artnetui-dmx-editor>
      `:H`
      <artnetui-editor
        .config=${this._legacy}
        .issues=${this._issues}
        .t=${e}
        @config-changed=${e=>this._setConfig(e.detail.config,"artnet_led")}
      ></artnetui-editor>
    `}render(){const e=this._t;let t;return t=this._loadError?H`${Ae("error",`${e("loadError")}: ${this._loadError}`)}
        <div class="row"><button @click=${this._load}>${e("reload")}</button></div>`:this._config?H`${this._renderTabs()} ${this._renderBanners()} ${this._renderToolbar()} ${this._renderEditor()}`:H`<p class="muted">${e("loading")}</p>`,H`
      ${this._renderHeader()}
      <div class="content">${t}</div>
      ${this._renderDeployDialog()} ${this._renderImportDialog()} ${this._renderMigrateDialog()}
      ${this._renderLibrary()} ${this._renderConfirmDialog()}
    `}static{this.styles=[$e,o`
      :host {
        display: block;
        min-height: 100%;
        background: var(--primary-background-color);
      }
      :host([embedded]) {
        background: none;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        height: var(--header-height, 56px);
        padding: 0 12px;
        background: var(--app-header-background-color, var(--primary-color));
        color: var(--app-header-text-color, var(--text-primary-color, #fff));
        border-bottom: var(--app-header-border-bottom, none);
        position: sticky;
        top: 0;
        z-index: 2;
      }
      .header .title {
        font-size: 1.25rem;
        flex: 1;
        margin-left: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .version {
        font-size: 0.75rem;
        opacity: 0.8;
      }
      .content {
        max-width: 1100px;
        margin: 0 auto;
        padding: 16px;
        display: grid;
        gap: 16px;
      }
      :host([narrow]) .content {
        padding: 8px;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        position: sticky;
        top: calc(var(--header-height, 56px) + 0px);
        z-index: 1;
        padding: 8px;
        border-radius: var(--alu-radius);
        border: var(--alu-border);
        background: var(--card-background-color, var(--primary-background-color));
      }
      :host([embedded]) .toolbar {
        top: 0;
      }
      .state {
        font-size: 0.85rem;
        color: var(--alu-muted);
      }
      .state.error {
        color: var(--alu-error);
      }
      .state.warning {
        color: var(--warning-color, #ffa600);
      }
      .tabs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 8px;
      }
      .tab {
        display: grid;
        justify-items: start;
        gap: 2px;
        padding: 10px 14px;
        text-align: left;
        border-radius: var(--alu-radius);
        border: var(--alu-border);
        background: var(--card-background-color, var(--primary-background-color));
        color: var(--primary-text-color);
        cursor: pointer;
        height: auto;
      }
      .tab.active {
        border-color: var(--primary-color);
        box-shadow: inset 0 -3px 0 var(--primary-color);
      }
      .tab-title {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 500;
      }
      .tab-sub {
        font-size: 0.8rem;
        color: var(--alu-muted);
      }
      .tab .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--warning-color, #ffa600);
      }
      .badge {
        font-size: 0.72rem;
        padding: 1px 8px;
        border-radius: 10px;
        margin-top: 4px;
      }
      .badge.ok {
        background: rgba(67, 160, 71, 0.15);
        color: var(--success-color, #43a047);
      }
      .badge.missing {
        background: rgba(127, 127, 127, 0.15);
        color: var(--alu-muted);
      }
      .menu-wrap {
        position: relative;
      }
      .menu-backdrop {
        position: fixed;
        inset: 0;
        z-index: 3;
      }
      .menu {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        z-index: 4;
        min-width: 260px;
        display: grid;
        padding: 4px 0;
        border-radius: 8px;
        border: var(--alu-border);
        background: var(--card-background-color, #fff);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      }
      .menu button {
        border: none;
        border-radius: 0;
        background: none;
        justify-content: flex-start;
        padding: 8px 16px;
      }
      .menu button:hover:not(:disabled) {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .menu hr {
        width: 100%;
        border: none;
        border-top: var(--alu-border);
        margin: 4px 0;
      }
      .toast {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 5;
        min-width: min(420px, calc(100vw - 32px));
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        background: var(--card-background-color, #fff);
        border-radius: 8px;
      }
      pre.include {
        margin: 8px 0;
        padding: 8px;
        border-radius: 6px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
        white-space: pre-wrap;
        user-select: all;
      }
      button.inline {
        margin-left: 8px;
      }
      textarea {
        font-family: var(--ha-font-family-code, monospace);
        resize: vertical;
      }
      pre.diff {
        margin: 0;
        padding: 12px;
        border-radius: 8px;
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.1));
        overflow: auto;
        max-height: 55vh;
      }
      pre.diff .add {
        color: var(--success-color, #43a047);
      }
      pre.diff .del {
        color: var(--error-color, #db4437);
      }
      pre.diff .hunk,
      pre.diff .meta {
        color: var(--alu-muted);
      }
      ul.issues {
        margin: 8px 0;
        padding-left: 20px;
        font-size: 0.85rem;
      }
    `]}}e([ue({attribute:!1})],gr.prototype,"hass",void 0),e([ue({type:Boolean,reflect:!0})],gr.prototype,"narrow",void 0),e([ue({attribute:!1})],gr.prototype,"panel",void 0),e([ue({type:Boolean,reflect:!0})],gr.prototype,"embedded",void 0),e([pe()],gr.prototype,"_docs",void 0),e([pe()],gr.prototype,"_target",void 0),e([pe()],gr.prototype,"_issues",void 0),e([pe()],gr.prototype,"_status",void 0),e([pe()],gr.prototype,"_fixtures",void 0),e([pe()],gr.prototype,"_loadError",void 0),e([pe()],gr.prototype,"_saving",void 0),e([pe()],gr.prototype,"_toast",void 0),e([pe()],gr.prototype,"_menuOpen",void 0),e([pe()],gr.prototype,"_confirm",void 0),e([pe()],gr.prototype,"_importOpen",void 0),e([pe()],gr.prototype,"_importText",void 0),e([pe()],gr.prototype,"_importError",void 0),e([pe()],gr.prototype,"_deploy",void 0),e([pe()],gr.prototype,"_migrate",void 0),e([pe()],gr.prototype,"_libraryOpen",void 0),e([he("input[type=file]")],gr.prototype,"_fileInput",void 0),xe("dmx-config-ui-panel",gr);const _r="dmx-config-ui";class vr extends ae{setConfig(e){}getCardSize(){return 12}getGridOptions(){return{columns:"full",min_columns:6}}static getStubConfig(){return{}}render(){return H`<ha-card>
      <dmx-config-ui-panel embedded .hass=${this.hass}></dmx-config-ui-panel>
    </ha-card>`}static{this.styles=o`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
  `}}e([ue({attribute:!1})],vr.prototype,"hass",void 0),xe(_r,vr);const br=window;br.customCards=br.customCards??[],br.customCards.some(e=>e.type===_r)||br.customCards.push({type:_r,name:"DMX Config UI",description:"Visual editor for ha-artnet-led Art-Net and DMX configurations (admin only)."});
//# sourceMappingURL=dmx-config-ui.js.map
