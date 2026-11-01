function e(e,t,n,i){var r,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(s=(o<3?r(s):o>3?r(t,n,s):r(t,n))||s);return o>3&&s&&Object.defineProperty(t,n,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,n=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&r.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const n=1===e.length?e[0]:t.reduce((t,n,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[i+1],e[0]);return new o(n,e,i)},a=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",v=f.reactiveElementPolyfillSupport,y=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},_=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const o=i?.call(this);r?.call(this,t),this.requestUpdate(e,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=h(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...u(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(n)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const n of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=n.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(void 0!==i&&!0===n.reflect){const r=(void 0!==n.converter?.toAttribute?n.converter:b).toAttribute(t,n.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=n.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=i;const o=r.fromAttribute(t,e.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,t,n,i=!1,r){if(void 0!==e){const o=this.constructor;if(!1===i&&(r=this[e]),n??=o.getPropertyOptions(e),!((n.hasChanged??_)(r,t)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:r},o){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,n,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=e=>e,k=w.trustedTypes,C=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+E,N=`<${T}>`,O=document,I=()=>O.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,j="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,R=/>/g,F=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,P=/"/g,H=/^(?:script|style|textarea|title)$/i,K=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,Y=O.createTreeWalker(O,129);function J(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const V=(e,t)=>{const n=e.length-1,i=[];let r,o=2===t?"<svg>":3===t?"<math>":"",s=D;for(let t=0;t<n;t++){const n=e[t];let a,l,c=-1,d=0;for(;d<n.length&&(s.lastIndex=d,l=s.exec(n),null!==l);)d=s.lastIndex,s===D?"!--"===l[1]?s=U:void 0!==l[1]?s=R:void 0!==l[2]?(H.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=F):void 0!==l[3]&&(s=F):s===F?">"===l[0]?(s=r??D,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?F:'"'===l[3]?P:z):s===P||s===z?s=F:s===U||s===R?s=D:(s=F,r=void 0);const u=s===F&&e[t+1].startsWith("/>")?" ":"";o+=s===D?n+N:c>=0?(i.push(a),n.slice(0,c)+S+n.slice(c)+E+u):n+E+(-2===c?t:u)}return[J(e,o+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class G{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let r=0,o=0;const s=e.length-1,a=this.parts,[l,c]=V(e,t);if(this.el=G.createElement(l,n),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(S)){const t=c[o++],n=i.getAttribute(e).split(E),s=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:s[2],strings:n,ctor:"."===s[1]?te:"?"===s[1]?ne:"@"===s[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:r}),i.removeAttribute(e));if(H.test(i.tagName)){const e=i.textContent.split(E),t=e.length-1;if(t>0){i.textContent=k?k.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],I()),Y.nextNode(),a.push({type:2,index:++r});i.append(e[t],I())}}}else if(8===i.nodeType)if(i.data===T)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(E,e+1));)a.push({type:7,index:r}),e+=E.length-1}r++}}static createElement(e,t){const n=O.createElement("template");return n.innerHTML=e,n}}function Z(e,t,n=e,i){if(t===B)return t;let r=void 0!==i?n._$Co?.[i]:n._$Cl;const o=M(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,n,i)),void 0!==i?(n._$Co??=[])[i]=r:n._$Cl=r),void 0!==r&&(t=Z(e,r._$AS(e,t.values),r,i)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??O).importNode(t,!0);Y.currentNode=i;let r=Y.nextNode(),o=0,s=0,a=n[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new Q(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new re(r,this,e)),this._$AV.push(t),a=n[++s]}o!==a?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=O,i}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),M(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=G.createElement(J(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new X(i,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new G(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const r of e)i===t.length?t.push(n=new Q(this.O(I()),this.O(I()),this,this.options)):n=t[i],n._$AI(r),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=q}_$AI(e,t=this,n,i){const r=this.strings;let o=!1;if(void 0===r)e=Z(this,e,t,0),o=!M(e)||e!==this._$AH&&e!==B,o&&(this._$AH=e);else{const i=e;let s,a;for(e=r[0],s=0;s<r.length-1;s++)a=Z(this,i[n+s],t,s),a===B&&(a=this._$AH[s]),o||=!M(a)||a!==this._$AH[s],a===q?e=q:e!==q&&(e+=(a??"")+r[s+1]),this._$AH[s]=a}o&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ne extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class ie extends ee{constructor(e,t,n,i,r){super(e,t,n,i,r),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??q)===B)return;const n=this._$AH,i=e===q&&n!==q||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==q&&(n===q||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const oe=w.litHtmlPolyfillSupport;oe?.(G,Q),(w.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;class ae extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const i=n?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=n?.renderBefore??null;i._$litPart$=r=new Q(t.insertBefore(I(),e),e,void 0,n??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ae._$litElement$=!0,ae.finalized=!0,se.litElementHydrateSupport?.({LitElement:ae});const le=se.litElementPolyfillSupport;le?.({LitElement:ae}),(se.litElementVersions??=[]).push("4.2.2");const ce={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_},de=(e=ce,t,n)=>{const{kind:i,metadata:r}=n;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),"accessor"===i){const{name:i}=n;return{set(n){const r=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,r,e,!0,n)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=n;return function(n){const r=this[i];t.call(this,n),this.requestUpdate(i,r,e,!0,n)}}throw Error("Unsupported decorator location: "+i)};function ue(e){return(t,n)=>"object"==typeof n?de(e,t,n):((e,t,n)=>{const i=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),i?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function pe(e){return ue({...e,state:!0,attribute:!1})}function he(e,t){return(t,n,i)=>((e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,n),n))(t,n,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}const fe="ha_artnet_led_uiconfig",me=e=>e.callWS({type:`${fe}/status`}),ge=e=>String(e&&"object"==typeof e&&"message"in e?e.message:e),ve=(e,t)=>{customElements.get(e)||customElements.define(e,t)},ye=e=>void 0!==customElements.get(e),be=s`
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
`,_e={"mdi:arrow-up":"↑","mdi:arrow-down":"↓","mdi:delete-outline":"✕","mdi:content-copy":"⧉","mdi:pencil":"✎","mdi:plus":"+","mdi:undo":"↶","mdi:redo":"↷","mdi:dots-vertical":"⋮","mdi:close":"✕","mdi:drag":"⋮⋮"},$e=e=>ye("ha-icon")?K`<ha-icon .icon=${e}></ha-icon>`:K`<span class="glyph" aria-hidden="true">${_e[e]??"•"}</span>`,xe=(e,t)=>ye("ha-alert")?K`<ha-alert alert-type=${e}>${t}</ha-alert>`:K`<div class="alert ${e}" role="alert">${t}</div>`,we=(e,t)=>K`
  <label class="field ${e.errors?.length?"invalid":""}">
    <span class="label">${e.label}${e.required?" *":""}</span>
    ${t}
    ${e.errors?.length?e.errors.map(e=>K`<span class="error">${e}</span>`):e.helper?K`<span class="helper">${e.helper}</span>`:q}
  </label>
`,Ae=e=>we(e,K`<input
      type="text"
      .value=${e.value??""}
      placeholder=${e.placeholder??""}
      aria-invalid=${e.errors?.length?"true":"false"}
      @change=${t=>{const n=t.target.value.trim();e.onChange(n||void 0)}}
    />`),ke=e=>we(e,K`<input
      type="number"
      inputmode="decimal"
      .value=${void 0===e.value||null===e.value?"":String(e.value)}
      min=${e.min??""}
      max=${e.max??""}
      step=${e.step??1}
      placeholder=${e.placeholder??""}
      aria-invalid=${e.errors?.length?"true":"false"}
      @change=${t=>{const n=t.target.value,i=""===n?void 0:Number(n);e.onChange(void 0===i||Number.isNaN(i)?void 0:i)}}
    />`),Ce=e=>we(e,K`<select
      aria-invalid=${e.errors?.length?"true":"false"}
      @change=${t=>e.onChange(t.target.value||void 0)}
    >
      ${void 0!==e.emptyLabel?K`<option value="" ?selected=${!e.value}>${e.emptyLabel}</option>`:q}
      ${e.options.map(t=>{const n="string"==typeof t?t:t.value,i="string"==typeof t?t:t.label;return K`<option value=${n} ?selected=${e.value===n}>${i}</option>`})}
      ${e.value&&!e.options.some(t=>("string"==typeof t?t:t.value)===e.value)?K`<option value=${e.value} selected>${e.value}</option>`:q}
    </select>`);class Se extends ae{constructor(){super(...arguments),this.open=!1,this.heading="",this.subtitle="",this.closeLabel="Close",this.wide=!1}updated(e){e.has("open")&&this._dialog&&(this.open&&!this._dialog.open?this._dialog.showModal():!this.open&&this._dialog.open&&this._dialog.close())}_dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}_onCancel(e){e.preventDefault(),this._dismiss()}_onClick(e){e.target===this._dialog&&this._dismiss()}render(){return K`
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
              ${this.subtitle?K`<p class="muted">${this.subtitle}</p>`:q}
            </div>
            <button class="icon" title=${this.closeLabel} aria-label=${this.closeLabel} @click=${this._dismiss}>
              ${$e("mdi:close")}
            </button>
          </header>
          <div class="content"><slot></slot></div>
          <footer><slot name="actions"></slot></footer>
        </div>
      </dialog>
    `}static{this.styles=[be,s`
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
    `]}}e([ue({type:Boolean,reflect:!0})],Se.prototype,"open",void 0),e([ue()],Se.prototype,"heading",void 0),e([ue()],Se.prototype,"subtitle",void 0),e([ue()],Se.prototype,"closeLabel",void 0),e([ue({type:Boolean})],Se.prototype,"wide",void 0),e([he("dialog")],Se.prototype,"_dialog",void 0),ve("artnetui-dialog",Se);const Ee={title:"Art-Net LED UI Config",loading:"Loading…",loadError:"Failed to load configuration",save:"Save",saving:"Saving…",saved:"Saved",saveError:"Failed to save",deploy:"Deploy",deployHint:"Write the YAML file used by ha-artnet-led",deployBlocked:"Fix the validation errors before deploying",undo:"Undo",redo:"Redo",more:"More",addNode:"Add node",importYaml:"Import YAML…",importExisting:"Import from configuration.yaml",importJson:"Import JSON file…",exportJson:"Export JSON",loadExample:"Load example",clearAll:"Clear all",reload:"Reload from server",unsaved:"Unsaved changes",errorsCount:"{count} validation error(s)",artnetMissing:"The ha-artnet-led integration (artnet_led) does not seem to be installed. Install it via HACS, otherwise the generated lights will not work.",includeMissing:"{path} is not yet included in your configuration.yaml. Add this line or use the repair:",openRepairs:"Open repairs",restartPending:"A Home Assistant restart is required to apply the deployed configuration.",versionMismatch:"The editor ({frontend}) and the integration ({backend}) versions differ. Reload the page / clear the browser cache.",confirm:"Confirm",cancel:"Cancel",close:"Close",confirmExampleTitle:"Load example?",confirmExampleText:"The current configuration will be replaced by an example. You can undo this.",confirmClearTitle:"Clear everything?",confirmClearText:"All nodes, universes and lights will be removed. You can undo this.",confirmReloadTitle:"Discard changes?",confirmReloadText:"You have unsaved changes. Reloading discards them.",confirmImportTitle:"Replace configuration?",confirmImportText:"The imported configuration replaces the current one. You can undo this.",importYamlTitle:"Import YAML",importYamlSubtitle:"Paste ha-artnet-led configuration: a `light:` block, a list of platform entries or a single entry.",importAction:"Import",importFailed:"Import failed: {error}",importNothing:"No artnet_led configuration found in configuration.yaml.",deployTitle:"Deploy configuration",deployTarget:"Target file: {path}",deployNoChanges:"The file is already up to date.",deployInvalid:"The configuration has errors and cannot be deployed:",deployAction:"Write file",deploying:"Writing…",deployFailed:"Deploy failed: {error}",deployWritten:"{path} has been written.",deployUnchanged:"{path} is already up to date.",deployRestart:"Restart Home Assistant to apply the changes – a repair with a restart button has been created.",deployCheckError:"Home Assistant reports a configuration problem:",deployNotIncluded:"The file is not included yet, see the repair in Settings → Repairs.",noNodes:"No nodes yet. Use “Add node”, import an existing configuration or load the example.",node:"Node",host:"Host / IP",hostOverride:"Host override",port:"Port",portOverride:"Port override",nodeType:"Node type",maxFps:"Max FPS",refresh:"Refresh every (s)",advanced:"Advanced",universes:"Universes",universe:"Universe",universeId:"Universe ID",outputCorrection:"Output correction",sendPartial:"Send partial universe",addUniverse:"Add universe",addLight:"Add light",noUniverses:"No universes yet.",noLights:"No lights in this universe.",remove:"Remove",duplicate:"Duplicate",edit:"Edit",moveUp:"Move up",moveDown:"Move down",channelMap:"DMX channel map",channelsUsed:"{used} / 512 channels used",overlap:"Overlap",free:"free",default:"Default",editLight:"Edit light",newLight:"New light",name:"Name",nameHelper:"Entity: light.{slug}",friendlyName:"Friendly name",channel:"Start channel",channelHelper:"Occupies {start}–{end} ({width} channel(s))",type:"Type",transition:"Transition (s)",channelSize:"Channel size",byteOrder:"Byte order",minTemp:"Min temperature",maxTemp:"Max temperature",targetUniverse:"Universe",nextFree:"Next free channel",apply:"Apply",channelSetup:"Channel setup",channelSetupHint:"Order of the DMX channels of this light. Click a block to append it, drag or use the arrows to reorder.",channelSetupDefault:"Empty = default ({value})",palette:"Blocks",staticValue:"Static value (0–255)",staticToken:"Static value {value}",add:"Add",resetDefault:"Reset to default",noChannels:"No channels – the default is used.",ch_d:"Dimmer",ch_c:"Cold white (scaled)",ch_C:"Cold white",ch_h:"Warm white (scaled)",ch_H:"Warm white",ch_t:"Temperature (0 warm → 255 cold)",ch_T:"Temperature (255 warm → 0 cold)",ch_r:"Red (scaled)",ch_R:"Red",ch_g:"Green (scaled)",ch_G:"Green",ch_b:"Blue (scaled)",ch_B:"Blue",ch_w:"White (scaled)",ch_W:"White",ch_u:"Hue",ch_U:"Saturation",ch_x:"X (CIE xy)",ch_y:"Y (CIE xy)",err_required:"Required",err_range:"Must be between {low} and {high}",err_choice:"Must be one of: {choices}",err_temp:"Must look like 2700K",err_setup_char:"'{token}' is not allowed for type {type}",err_setup_value:"Static values must be 0–255",err_overflow:"Ends at channel {end} (> 512)",err_overlap:"Channels {start}–{end} overlap with '{other}' ({otherStart}–{otherEnd})",err_duplicate:"Duplicate"},Te={en:Ee,de:{title:"Art-Net LED UI Config",loading:"Lade…",loadError:"Konfiguration konnte nicht geladen werden",save:"Speichern",saving:"Speichere…",saved:"Gespeichert",saveError:"Speichern fehlgeschlagen",deploy:"Deploy",deployHint:"YAML-Datei für ha-artnet-led schreiben",deployBlocked:"Behebe zuerst die Validierungsfehler",undo:"Rückgängig",redo:"Wiederholen",more:"Mehr",addNode:"Node hinzufügen",importYaml:"YAML importieren…",importExisting:"Aus configuration.yaml importieren",importJson:"JSON-Datei importieren…",exportJson:"Als JSON exportieren",loadExample:"Beispiel laden",clearAll:"Alles leeren",reload:"Vom Server neu laden",unsaved:"Ungespeicherte Änderungen",errorsCount:"{count} Validierungsfehler",artnetMissing:"Die Integration ha-artnet-led (artnet_led) scheint nicht installiert zu sein. Installiere sie über HACS, sonst funktionieren die erzeugten Lampen nicht.",includeMissing:"{path} ist noch nicht in deiner configuration.yaml eingebunden. Füge diese Zeile hinzu oder nutze die Reparatur:",openRepairs:"Reparaturen öffnen",restartPending:"Ein Neustart von Home Assistant ist nötig, um die Konfiguration zu übernehmen.",versionMismatch:"Editor ({frontend}) und Integration ({backend}) haben unterschiedliche Versionen. Seite neu laden / Browser-Cache leeren.",confirm:"Bestätigen",cancel:"Abbrechen",close:"Schließen",confirmExampleTitle:"Beispiel laden?",confirmExampleText:"Die aktuelle Konfiguration wird durch ein Beispiel ersetzt. Das lässt sich rückgängig machen.",confirmClearTitle:"Alles leeren?",confirmClearText:"Alle Nodes, Universes und Lampen werden entfernt. Das lässt sich rückgängig machen.",confirmReloadTitle:"Änderungen verwerfen?",confirmReloadText:"Es gibt ungespeicherte Änderungen. Neu laden verwirft sie.",confirmImportTitle:"Konfiguration ersetzen?",confirmImportText:"Die importierte Konfiguration ersetzt die aktuelle. Das lässt sich rückgängig machen.",importYamlTitle:"YAML importieren",importYamlSubtitle:"Füge eine ha-artnet-led Konfiguration ein: einen `light:`-Block, eine Liste von Plattform-Einträgen oder einen einzelnen Eintrag.",importAction:"Importieren",importFailed:"Import fehlgeschlagen: {error}",importNothing:"Keine artnet_led Konfiguration in der configuration.yaml gefunden.",deployTitle:"Konfiguration deployen",deployTarget:"Zieldatei: {path}",deployNoChanges:"Die Datei ist bereits aktuell.",deployInvalid:"Die Konfiguration enthält Fehler und kann nicht geschrieben werden:",deployAction:"Datei schreiben",deploying:"Schreibe…",deployFailed:"Deploy fehlgeschlagen: {error}",deployWritten:"{path} wurde geschrieben.",deployUnchanged:"{path} ist bereits aktuell.",deployRestart:"Starte Home Assistant neu, um die Änderungen zu übernehmen – eine Reparatur mit Neustart-Button wurde angelegt.",deployCheckError:"Home Assistant meldet ein Konfigurationsproblem:",deployNotIncluded:"Die Datei ist noch nicht eingebunden, siehe Reparatur unter Einstellungen → Reparaturen.",noNodes:"Noch keine Nodes. Nutze „Node hinzufügen“, importiere eine bestehende Konfiguration oder lade das Beispiel.",node:"Node",host:"Host / IP",hostOverride:"Host-Override",port:"Port",portOverride:"Port-Override",nodeType:"Node-Typ",maxFps:"Max FPS",refresh:"Refresh alle (s)",advanced:"Erweitert",universes:"Universes",universe:"Universe",universeId:"Universe-ID",outputCorrection:"Output-Korrektur",sendPartial:"Teil-Universe senden",addUniverse:"Universe hinzufügen",addLight:"Lampe hinzufügen",noUniverses:"Noch keine Universes.",noLights:"Keine Lampen in diesem Universe.",remove:"Entfernen",duplicate:"Duplizieren",edit:"Bearbeiten",moveUp:"Nach oben",moveDown:"Nach unten",channelMap:"DMX-Kanalbelegung",channelsUsed:"{used} / 512 Kanäle belegt",overlap:"Überlappung",free:"frei",default:"Standard",editLight:"Lampe bearbeiten",newLight:"Neue Lampe",name:"Name",nameHelper:"Entität: light.{slug}",friendlyName:"Anzeigename",channel:"Startkanal",channelHelper:"Belegt {start}–{end} ({width} Kanal/Kanäle)",type:"Typ",transition:"Übergang (s)",channelSize:"Kanalgröße",byteOrder:"Byte-Reihenfolge",minTemp:"Min. Temperatur",maxTemp:"Max. Temperatur",targetUniverse:"Universe",nextFree:"Nächster freier Kanal",apply:"Übernehmen",channelSetup:"Kanal-Setup",channelSetupHint:"Reihenfolge der DMX-Kanäle dieser Lampe. Baustein anklicken zum Anhängen, per Drag & Drop oder Pfeilen sortieren.",channelSetupDefault:"Leer = Standard ({value})",palette:"Bausteine",staticValue:"Statischer Wert (0–255)",staticToken:"Statischer Wert {value}",add:"Hinzufügen",resetDefault:"Auf Standard zurücksetzen",noChannels:"Keine Kanäle – der Standard wird verwendet.",ch_d:"Dimmer",ch_c:"Kaltweiß (skaliert)",ch_C:"Kaltweiß",ch_h:"Warmweiß (skaliert)",ch_H:"Warmweiß",ch_t:"Temperatur (0 warm → 255 kalt)",ch_T:"Temperatur (255 warm → 0 kalt)",ch_r:"Rot (skaliert)",ch_R:"Rot",ch_g:"Grün (skaliert)",ch_G:"Grün",ch_b:"Blau (skaliert)",ch_B:"Blau",ch_w:"Weiß (skaliert)",ch_W:"Weiß",ch_u:"Farbton",ch_U:"Sättigung",ch_x:"X (CIE xy)",ch_y:"Y (CIE xy)",err_required:"Pflichtfeld",err_range:"Muss zwischen {low} und {high} liegen",err_choice:"Erlaubt: {choices}",err_temp:"Format wie 2700K",err_setup_char:"'{token}' ist für Typ {type} nicht erlaubt",err_setup_value:"Statische Werte müssen 0–255 sein",err_overflow:"Endet bei Kanal {end} (> 512)",err_overlap:"Kanäle {start}–{end} überlappen mit „{other}“ ({otherStart}–{otherEnd})",err_duplicate:"Doppelt vergeben"}},Ne=new Set(["range","choice","setup_char","overflow","overlap"]),Oe=(e,t)=>{const n=`err_${t.code}`;return n in Ee?Ne.has(t.code)&&!t.params?t.message:e(n,t.params):t.message},Ie=["artnet-direct","artnet-controller","sacn","kinet"],Me=["fixed","binary","dimmer","color_temp","rgb","rgbw","rgbww","xy"],Le=["linear","quadratic","cubic","quadruple"],je={"8bit":1,"16bit":2,"24bit":3,"32bit":4},De=["big","little"],Ue=["color_temp","rgbww"],Re={fixed:"",binary:"",dimmer:"d",color_temp:"dcChHtT",rgb:"drRgGbBuUwW",rgbw:"drRgGbBuUwW",rgbww:"dcChHtTrRgGbBuU",xy:"dxy"},Fe={fixed:[255],binary:"d",dimmer:"d",color_temp:"ch",rgb:"rgb",rgbw:"rgbw",rgbww:"rgbch",xy:"dxy"},ze="artnet-direct",Pe=25,He=120,Ke=6454,Be=512,qe=/^\d+[kK]$/,We=e=>e.type||"dimmer",Ye=e=>"dimmer"!==e&&"binary"!==e,Je=e=>Ue.includes(e),Ve=e=>null==e||""===e?[]:Array.isArray(e)?[...e]:String(e).split(""),Ge=e=>{if(e.length)return e.every(e=>"string"==typeof e&&1===e.length)?e.join(""):[...e]},Ze=e=>je[e.channel_size||"8bit"]??1,Xe=e=>(e=>{const t=We(e);if("dimmer"===t||"binary"===t)return 1;const n=e.channel_setup||Fe[t]||"d";return Math.max(1,Ve(n).length)})(e)*Ze(e),Qe=e=>{const t=Number(e.channel)||1;return[t,t+Xe(e)-1]},et=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,""),tt=(e,t,n)=>{const i=e.devices.filter((e,t)=>t!==n).map(e=>Qe(e)).sort((e,t)=>e[0]-t[0]);let r=1;for(const[e,n]of i){if(r+t-1<e)break;n>=r&&(r=n+1)}return Math.min(r,Be)},nt=(e,t)=>{const n=new Set(t.map(et));if(e&&!n.has(et(e)))return e;const i=(e||"light").replace(/_\d+$/,"");for(let e=2;;e++){const t=`${i}_${e}`;if(!n.has(et(t)))return t}},it=e=>{const t=We(e),n={...e};if(Je(t)||(delete n.min_temp,delete n.max_temp),Ye(t)){if(void 0!==n.channel_setup){const e=Re[t];Ve(n.channel_setup).every(t=>"number"==typeof t?t>=0&&t<=255:e.includes(t))||delete n.channel_setup}}else delete n.channel_setup;return 1===(je[n.channel_size||"8bit"]??1)&&delete n.byte_order,n},rt=e=>structuredClone(e),ot=e=>e.nodes.flatMap(e=>e.universes.flatMap(e=>e.devices.map(e=>e.name))),st=e=>({id:e.universes.length?Math.max(...e.universes.map(e=>e.id))+1:0,send_partial_universe:!0,devices:[]}),at=()=>({host:"",node_type:"artnet-direct",max_fps:25,universes:[st({universes:[]})]}),lt=(e,t,n)=>{if(n<0||n>=e.length)return;const[i]=e.splice(t,1);e.splice(n,0,i)},ct=(e,t,n,i)=>({path:e,code:t,message:n,...i?{params:i}:{}}),dt=(e,t,n,i,r)=>{null!=t&&(!(e=>"number"==typeof e&&Number.isFinite(e))(t)||t<i||t>r)&&e.push(ct(n,"range",`must be between ${i} and ${r}`,{low:i,high:r}))},ut=(e,t,n,i)=>{null!=t&&(i.includes(t)||e.push(ct(n,"choice",`must be one of: ${i.join(", ")}`,{choices:i.join(", ")})))},pt=e=>{const t=[],n=new Set;return(e.nodes??[]).forEach((e,i)=>{const r=["nodes",i];String(e.host??"").trim()||t.push(ct([...r,"host"],"required","host is required")),ut(t,e.node_type,[...r,"node_type"],Ie),dt(t,e.port,[...r,"port"],1,65535),dt(t,e.port_override,[...r,"port_override"],1,65535),dt(t,e.max_fps,[...r,"max_fps"],1,50),dt(t,e.refresh_every,[...r,"refresh_every"],0,9999),e.universes?.length||t.push(ct([...r,"universes"],"required","at least one universe"));const o=new Set;(e.universes??[]).forEach((e,i)=>{const s=[...r,"universes",i];dt(t,e.id,[...s,"id"],0,1024),o.has(e.id)&&t.push(ct([...s,"id"],"duplicate","duplicate universe id")),o.add(e.id),ut(t,e.output_correction,[...s,"output_correction"],Le);const a=[];(e.devices??[]).forEach((e,i)=>{const r=[...s,"devices",i];((e,t,n)=>{const i=We(t);if(String(t.name??"").trim()||e.push(ct([...n,"name"],"required","name is required")),ut(e,t.type,[...n,"type"],Me),dt(e,t.channel,[...n,"channel"],1,Be),dt(e,t.transition,[...n,"transition"],0,999),ut(e,t.output_correction,[...n,"output_correction"],Le),ut(e,t.channel_size,[...n,"channel_size"],Object.keys(je)),ut(e,t.byte_order,[...n,"byte_order"],De),Je(i))for(const i of["min_temp","max_temp"]){const r=t[i];null==r||qe.test(String(r))||e.push(ct([...n,i],"temp","must look like 2700K"))}const r=t.channel_setup,o=Re[i];if(null!=r&&void 0!==o&&"binary"!==i){const t=Array.isArray(r)?r:String(r).split("");for(const r of t)"number"==typeof r?(r<0||r>255)&&e.push(ct([...n,"channel_setup"],"setup_value","static values: 0-255")):o.includes(r)||e.push(ct([...n,"channel_setup"],"setup_char",`'${r}' is not allowed for type ${i}`,{token:r,type:i}))}const s=t.channel;if(Number.isInteger(s)&&s>=1&&s<=Be){const[,i]=Qe(t);i>Be&&e.push(ct([...n,"channel"],"overflow",`device ends at channel ${i} (> 512)`,{end:i}))}})(t,e,r);const o=et(String(e.name??""));if(o&&(n.has(o)?t.push(ct([...r,"name"],"duplicate","duplicate light name")):n.add(o)),Number.isInteger(e.channel)){const[n,i]=Qe(e);for(const[e,o,s]of a)if(n<=o&&e<=i){t.push(ct([...r,"channel"],"overlap",`channels ${n}-${i} overlap with '${s}' (${e}-${o})`,{start:n,end:i,other:s,otherStart:e,otherEnd:o}));break}a.push([n,i,String(e.name??"")])}})})}),t},ht=e=>e.join(".");class ft{constructor(e=[]){this.issues=e,this.exact=new Map,this.nested=new Map;for(const t of e){const e=ht(t.path);this.exact.set(e,[...this.exact.get(e)??[],t]);for(let e=0;e<=t.path.length;e++){const n=ht(t.path.slice(0,e));this.nested.set(n,[...this.nested.get(n)??[],t])}}}at(e){return this.exact.get(ht(e))??[]}within(e){return this.nested.get(ht(e))??[]}}const mt=e=>`hsl(${137.508*e%360} 65% 55%)`;class gt extends ae{render(){const e=(e=>{const t=new Map;return e.devices.forEach((e,n)=>{const[i,r]=Qe(e);for(let o=i;o<=Math.min(r,Be);o++){const s=t.get(o)??[];s.push({index:n,name:e.name,start:i,end:r}),t.set(o,s)}}),t})(this.universe),t=[];for(let n=1;n<=Be;n++){const i=e.get(n)??[],r=i.length>1,o=i[0],s=i.length?`${n}: ${i.map(e=>`${e.name||"?"} (${e.start}–${e.end})`).join(", ")}${r?` – ${this.t("overlap")}`:""}`:`${n}: ${this.t("free")}`,a=o&&!r?`background:${mt(o.index)}`:"";t.push(K`<div
        class="cell ${o?"used":""} ${r?"overlap":""} ${o?.start===n?"start":""}"
        style=${a}
        title=${s}
        @click=${()=>o&&this.dispatchEvent(new CustomEvent("device-click",{detail:{index:o.index}}))}
      ></div>`)}return K`
      <div class="map" role="img" aria-label=${this.t("channelMap")}>${t}</div>
      <div class="legend">${this.t("channelsUsed",{used:e.size})}</div>
    `}static{this.styles=s`
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
  `}}e([ue({attribute:!1})],gt.prototype,"universe",void 0),e([ue({attribute:!1})],gt.prototype,"t",void 0),ve("artnetui-channel-map",gt);const vt={r:"#e53935",g:"#43a047",b:"#1e88e5",w:"#e0e0e0",c:"#b3e5fc",h:"#ffcc80",t:"#ffe082",d:"#9e9e9e",u:"#ab47bc",x:"#7e57c2",y:"#5c6bc0"},yt=e=>Array.isArray(e)?`[${e.join(", ")}]`:`"${e}"`;class bt extends ae{constructor(){super(...arguments),this.type="rgb",this.errors=[],this._static=""}get _tokens(){return Ve(this.value)}_emit(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:Ge(e)}}))}_append(e){this._emit([...this._tokens,e])}_remove(e){this._emit(this._tokens.filter((t,n)=>n!==e))}_move(e,t){const n=[...this._tokens];if(t<0||t>=n.length||e===t)return;const[i]=n.splice(e,1);n.splice(t,0,i),this._emit(n)}_addStatic(){const e=Number(this._static);""===this._static||!Number.isInteger(e)||e<0||e>255||(this._append(e),this._static="")}_label(e){return"number"==typeof e?this.t("staticToken",{value:e}):this.t(`ch_${e}`)}_chip(e){const t="number"==typeof e?"transparent":vt[e.toLowerCase()];return K`<span class="chip" style="--chip:${t??"#9e9e9e"}">${e}</span>`}render(){const e=Re[this.type].split(""),t=this._tokens;return K`
      <div class="wrap">
        <div class="head">
          <strong>${this.t("channelSetup")}</strong>
          <span class="muted">${this.t("channelSetupDefault",{value:yt(Fe[this.type])})}</span>
        </div>
        <p class="muted hint">${this.t("channelSetupHint")}</p>
        <div class="body">
          <div class="palette" aria-label=${this.t("palette")}>
            ${e.map(e=>K`
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
              <button @click=${this._addStatic}>${$e("mdi:plus")} ${this.t("add")}</button>
            </div>
          </div>
          <ol class="sequence" @dragover=${e=>e.preventDefault()}>
            ${t.length?t.map((e,n)=>K`
                    <li
                      draggable="true"
                      class=${this._dragIndex===n?"dragging":""}
                      @dragstart=${e=>{this._dragIndex=n,e.dataTransfer?.setData("text/plain",String(n))}}
                      @dragend=${()=>this._dragIndex=void 0}
                      @drop=${e=>{e.preventDefault(),void 0!==this._dragIndex&&this._move(this._dragIndex,n),this._dragIndex=void 0}}
                    >
                      <span class="pos">${n+1}</span>
                      ${this._chip(e)}
                      <span class="desc">${this._label(e)}</span>
                      <button class="icon" title=${this.t("moveUp")} aria-label=${this.t("moveUp")} ?disabled=${0===n} @click=${()=>this._move(n,n-1)}>
                        ${$e("mdi:arrow-up")}
                      </button>
                      <button class="icon" title=${this.t("moveDown")} aria-label=${this.t("moveDown")} ?disabled=${n===t.length-1} @click=${()=>this._move(n,n+1)}>
                        ${$e("mdi:arrow-down")}
                      </button>
                      <button class="icon danger" title=${this.t("remove")} aria-label=${this.t("remove")} @click=${()=>this._remove(n)}>
                        ${$e("mdi:delete-outline")}
                      </button>
                    </li>
                  `):K`<li class="none muted">${this.t("noChannels")}</li>`}
          </ol>
        </div>
        ${this.errors.map(e=>K`<div class="error">${e}</div>`)}
        ${t.length?K`<div class="row">
              <code>${yt(Ge(t))}</code>
              <span class="spacer"></span>
              <button @click=${()=>this._emit([])}>${this.t("resetDefault")}</button>
            </div>`:q}
      </div>
    `}static{this.styles=[be,s`
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
    `]}}e([ue()],bt.prototype,"type",void 0),e([ue({attribute:!1})],bt.prototype,"value",void 0),e([ue({attribute:!1})],bt.prototype,"t",void 0),e([ue({attribute:!1})],bt.prototype,"errors",void 0),e([pe()],bt.prototype,"_static",void 0),e([pe()],bt.prototype,"_dragIndex",void 0),ve("artnetui-channel-editor",bt);class _t extends ae{constructor(){super(...arguments),this._target="0:0"}willUpdate(e){(e.has("device")||e.has("location"))&&(this._draft={...this.device},this._target=`${this.location.node}:${this.location.universe}`)}get _targetLoc(){const[e,t]=this._target.split(":").map(Number);return{node:e,universe:t}}_issues(){const e=structuredClone(this.config),{node:t,universe:n,device:i}=this.location;i>=0&&e.nodes[t].universes[n].devices.splice(i,1);const r=this._targetLoc,o=e.nodes[r.node].universes[r.universe].devices,s=r.node===t&&r.universe===n&&i>=0?i:o.length;return o.splice(s,0,this._draft),{index:new ft(pt(e)),path:["nodes",r.node,"universes",r.universe,"devices",s]}}_set(e,t){const n={...this._draft};void 0===t?delete n[e]:n[e]=t,this._draft="type"===e||"channel_size"===e?it(n):n}_nextFree(){const{node:e,universe:t,device:n}=this.location,i=this._targetLoc,r=i.node===e&&i.universe===t?n:void 0,o=this.config.nodes[i.node].universes[i.universe];this._set("channel",tt(o,Xe(this._draft),r))}_save(){this.dispatchEvent(new CustomEvent("device-save",{detail:{device:it(this._draft),from:this.location,to:this._targetLoc}}))}render(){if(!this._draft)return q;const e=this.t,t=this._draft,n=We(t),{index:i,path:r}=this._issues(),o=t=>i.at([...r,t]).map(t=>Oe(e,t)),[s,a]=Qe(t),l=et(t.name||""),c=this.config.nodes.flatMap((t,n)=>t.universes.map((i,r)=>({value:`${n}:${r}`,label:`${t.host||`${e("node")} ${n+1}`} · ${e("universe")} ${i.id}`})));return K`
      <artnetui-dialog
        open
        wide
        .heading=${this.location.device<0?e("newLight"):e("editLight")}
        .closeLabel=${e("close")}
      >
        <div class="grid">
          ${Ae({label:e("name"),required:!0,value:t.name,errors:o("name"),helper:l?e("nameHelper",{slug:l}):void 0,onChange:e=>this._set("name",e??"")})}
          ${Ae({label:e("friendlyName"),value:t.friendly_name,onChange:e=>this._set("friendly_name",e)})}
          ${Ce({label:e("type"),value:n,options:Me,errors:o("type"),onChange:e=>this._set("type",e??"dimmer")})}
          ${c.length>1?Ce({label:e("targetUniverse"),value:this._target,options:c,onChange:e=>e&&(this._target=e)}):q}
          <div class="channel">
            ${ke({label:e("channel"),required:!0,value:t.channel,min:1,max:Be,errors:o("channel"),helper:e("channelHelper",{start:s,end:a,width:Xe(t)}),onChange:e=>this._set("channel",e??1)})}
            <button class="link" @click=${this._nextFree}>${e("nextFree")}</button>
          </div>
          ${"binary"!==n&&"fixed"!==n?ke({label:e("transition"),value:t.transition,min:0,max:999,step:"any",placeholder:"0",errors:o("transition"),onChange:e=>this._set("transition",e)}):q}
          ${"binary"!==n?Ce({label:e("outputCorrection"),value:t.output_correction,options:Le,emptyLabel:`${e("default")} (universe)`,errors:o("output_correction"),onChange:e=>this._set("output_correction",e)}):q}
          ${"binary"!==n?Ce({label:e("channelSize"),value:t.channel_size,options:Object.keys(je),emptyLabel:`${e("default")} (8bit)`,errors:o("channel_size"),onChange:e=>this._set("channel_size",e)}):q}
          ${Ze(t)>1?Ce({label:e("byteOrder"),value:t.byte_order,options:De,emptyLabel:`${e("default")} (big)`,errors:o("byte_order"),onChange:e=>this._set("byte_order",e)}):q}
          ${Je(n)?K`
                ${Ae({label:e("minTemp"),value:t.min_temp,placeholder:"2700K",errors:o("min_temp"),onChange:e=>this._set("min_temp",e)})}
                ${Ae({label:e("maxTemp"),value:t.max_temp,placeholder:"6500K",errors:o("max_temp"),onChange:e=>this._set("max_temp",e)})}
              `:q}
        </div>
        ${Ye(n)?K`<artnetui-channel-editor
              .type=${n}
              .value=${t.channel_setup}
              .t=${e}
              .errors=${o("channel_setup")}
              @value-changed=${e=>this._set("channel_setup",e.detail.value)}
            ></artnetui-channel-editor>`:q}
        <button slot="actions" @click=${()=>this.dispatchEvent(new CustomEvent("closed"))}>
          ${e("cancel")}
        </button>
        <button slot="actions" class="primary" @click=${this._save}>${e("apply")}</button>
      </artnetui-dialog>
    `}static{this.styles=[be,s`
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
    `]}}e([ue({attribute:!1})],_t.prototype,"t",void 0),e([ue({attribute:!1})],_t.prototype,"config",void 0),e([ue({attribute:!1})],_t.prototype,"location",void 0),e([ue({attribute:!1})],_t.prototype,"device",void 0),e([pe()],_t.prototype,"_draft",void 0),e([pe()],_t.prototype,"_target",void 0),ve("artnetui-device-dialog",_t);const $t={fixed:"mdi:lightbulb",binary:"mdi:toggle-switch-outline",dimmer:"mdi:brightness-6",color_temp:"mdi:thermometer",rgb:"mdi:palette",rgbw:"mdi:palette",rgbww:"mdi:palette",xy:"mdi:palette-swatch"};class xt extends ae{constructor(){super(...arguments),this.issues=new ft}_commit(e){const t=rt(this.config);e(t),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_errors(e){return this.issues.at(e).map(e=>Oe(this.t,e))}_openDevice(e){const t=this.config.nodes[e.node].universes[e.universe],n=e.device>=0?rt(t.devices[e.device]):((e,t)=>{const n={channel:1,name:nt("light_1",ot(e)),type:"dimmer"};return n.channel=tt(t,Xe(n)),n})(this.config,t);this._editing={location:e,device:n}}_saveDevice(e){const{device:t,from:n,to:i}=e.detail;this._commit(e=>{const r=e.nodes[n.node].universes[n.universe].devices,o=e.nodes[i.node].universes[i.universe].devices;n.device<0?o.push(t):n.node===i.node&&n.universe===i.universe?r[n.device]=t:(r.splice(n.device,1),o.push(t))}),this._editing=void 0}_renderDevice(e,t,n,i,r){const o=this.t,s=["nodes",t,"universes",n,"devices",i],a=this.issues.within(s),[l,c]=Qe(e),d=We(e),u={node:t,universe:n,device:i},p=this.config.nodes[t].universes[n];return K`
      <li class="device ${a.length?"invalid":""}">
        <span class="swatch" style="background:${mt(i)}"></span>
        <button class="device-main" @click=${()=>this._openDevice(u)} title=${o("edit")}>
          ${$e($t[d]??"mdi:lightbulb-outline")}
          <span class="device-text">
            <span class="device-name">${e.friendly_name||e.name||"—"}</span>
            <span class="device-meta">
              ${d} · ${l===c?`${l}`:`${l}–${c}`}
              (${Xe(e)} ch${e.channel_size&&"8bit"!==e.channel_size?`, ${e.channel_size}`:""})
              ${e.friendly_name?K` · ${e.name}`:q}
            </span>
            ${a.map(e=>K`<span class="device-error">${Oe(o,e)}</span>`)}
          </span>
        </button>
        <span class="device-actions">
          <button class="icon" title=${o("moveUp")} aria-label=${o("moveUp")} ?disabled=${0===i}
            @click=${()=>this._commit(e=>lt(e.nodes[t].universes[n].devices,i,i-1))}>
            ${$e("mdi:arrow-up")}
          </button>
          <button class="icon" title=${o("moveDown")} aria-label=${o("moveDown")} ?disabled=${i===r-1}
            @click=${()=>this._commit(e=>lt(e.nodes[t].universes[n].devices,i,i+1))}>
            ${$e("mdi:arrow-down")}
          </button>
          <button class="icon" title=${o("duplicate")} aria-label=${o("duplicate")}
            @click=${()=>this._commit(r=>r.nodes[t].universes[n].devices.splice(i+1,0,((e,t,n)=>{const i=rt(n);return i.name=nt(n.name,ot(e)),delete i.friendly_name,i.channel=tt(t,Xe(i)),i})(r,p,e)))}>
            ${$e("mdi:content-copy")}
          </button>
          <button class="icon danger" title=${o("remove")} aria-label=${o("remove")}
            @click=${()=>this._commit(e=>e.nodes[t].universes[n].devices.splice(i,1))}>
            ${$e("mdi:delete-outline")}
          </button>
        </span>
      </li>
    `}_setUniverse(e,t,n,i){this._commit(r=>{const o=r.nodes[e].universes[t];void 0===i?delete o[n]:o[n]=i})}_renderUniverse(e,t,n){const i=this.t,r=["nodes",t,"universes",n],o=this.issues.within(r).length;return K`
      <section class="universe">
        <header>
          <h3>${i("universe")} ${e.id}</h3>
          ${o?K`<span class="badge">${o}</span>`:q}
          <span class="spacer"></span>
          <button class="icon" title=${i("duplicate")} aria-label=${i("duplicate")}
            @click=${()=>this._commit(i=>i.nodes[t].universes.splice(n+1,0,((e,t,n)=>{const i=rt(n);i.id=st(t).id;const r=ot(e);for(const e of i.devices)e.name=nt(e.name,r),delete e.friendly_name,r.push(e.name);return i})(i,i.nodes[t],e)))}>
            ${$e("mdi:content-copy")}
          </button>
          <button class="icon danger" title=${i("remove")} aria-label=${i("remove")}
            @click=${()=>this._commit(e=>e.nodes[t].universes.splice(n,1))}>
            ${$e("mdi:delete-outline")}
          </button>
        </header>
        <div class="grid">
          ${ke({label:i("universeId"),required:!0,value:e.id,min:0,max:1024,errors:this._errors([...r,"id"]),onChange:e=>this._setUniverse(t,n,"id",e??0)})}
          ${Ce({label:i("outputCorrection"),value:e.output_correction,options:Le,emptyLabel:`${i("default")} (linear)`,errors:this._errors([...r,"output_correction"]),onChange:e=>this._setUniverse(t,n,"output_correction",e)})}
          ${s={label:i("sendPartial"),value:e.send_partial_universe??!0,onChange:e=>this._setUniverse(t,n,"send_partial_universe",e)},K`
  <label class="check">
    <input
      type="checkbox"
      .checked=${Boolean(s.value)}
      @change=${e=>s.onChange(e.target.checked)}
    />
    <span>${s.label}</span>
  </label>
`}
        </div>
        ${e.devices.length?K`
              <details class="map">
                <summary>${i("channelMap")}</summary>
                <artnetui-channel-map
                  .universe=${e}
                  .t=${i}
                  @device-click=${e=>this._openDevice({node:t,universe:n,device:e.detail.index})}
                ></artnetui-channel-map>
              </details>
              <ul class="devices">
                ${e.devices.map((i,r)=>this._renderDevice(i,t,n,r,e.devices.length))}
              </ul>
            `:K`<div class="empty">${i("noLights")}</div>`}
        <div class="row">
          <button @click=${()=>this._openDevice({node:t,universe:n,device:-1})}>
            ${$e("mdi:plus")} ${i("addLight")}
          </button>
        </div>
      </section>
    `;var s}_setNode(e,t,n){this._commit(i=>{const r=i.nodes[e];void 0===n?delete r[t]:r[t]=n})}_renderNode(e,t){const n=this.t,i=["nodes",t],r=e=>this._errors([...i,e]),o=this.issues.within(i).length,s=Boolean(e.host_override||e.port_override||e.port);return K`
      <section class="node">
        <header>
          <h2>${n("node")}: ${e.host||"—"}</h2>
          ${o?K`<span class="badge">${o}</span>`:q}
          <span class="spacer"></span>
          <button class="icon danger" title=${n("remove")} aria-label=${n("remove")}
            @click=${()=>this._commit(e=>e.nodes.splice(t,1))}>
            ${$e("mdi:delete-outline")}
          </button>
        </header>
        <div class="grid">
          ${Ae({label:n("host"),required:!0,value:e.host,placeholder:"192.168.0.10",errors:r("host"),onChange:e=>this._setNode(t,"host",e??"")})}
          ${Ce({label:n("nodeType"),value:e.node_type,options:Ie,emptyLabel:`${n("default")} (${ze})`,errors:r("node_type"),onChange:e=>this._setNode(t,"node_type",e)})}
          ${ke({label:n("maxFps"),value:e.max_fps,min:1,max:50,placeholder:String(Pe),errors:r("max_fps"),onChange:e=>this._setNode(t,"max_fps",e)})}
          ${ke({label:n("refresh"),value:e.refresh_every,min:0,max:9999,step:"any",placeholder:String(He),errors:r("refresh_every"),onChange:e=>this._setNode(t,"refresh_every",e)})}
        </div>
        <details ?open=${s}>
          <summary>${n("advanced")}</summary>
          <div class="grid">
            ${ke({label:n("port"),value:e.port,min:1,max:65535,placeholder:String(Ke),errors:r("port"),onChange:e=>this._setNode(t,"port",e)})}
            ${Ae({label:n("hostOverride"),value:e.host_override,errors:r("host_override"),onChange:e=>this._setNode(t,"host_override",e)})}
            ${ke({label:n("portOverride"),value:e.port_override,min:1,max:65535,errors:r("port_override"),onChange:e=>this._setNode(t,"port_override",e)})}
          </div>
        </details>
        <div class="universes">
          ${e.universes.length?e.universes.map((e,n)=>this._renderUniverse(e,t,n)):K`<div class="empty">${n("noUniverses")}</div>`}
          ${r("universes").map(e=>K`<div class="error">${e}</div>`)}
        </div>
        <div class="row">
          <button @click=${()=>this._commit(e=>e.nodes[t].universes.push(st(e.nodes[t])))}>
            ${$e("mdi:plus")} ${n("addUniverse")}
          </button>
        </div>
      </section>
    `}render(){const e=this.t;return K`
      ${this.config.nodes.length?this.config.nodes.map((e,t)=>this._renderNode(e,t)):K`<div class="empty">${e("noNodes")}</div>`}
      <div class="row">
        <button @click=${()=>this._commit(e=>e.nodes.push(at()))}>
          ${$e("mdi:plus")} ${e("addNode")}
        </button>
      </div>
      ${this._editing?K`<artnetui-device-dialog
            .t=${e}
            .config=${this.config}
            .location=${this._editing.location}
            .device=${this._editing.device}
            @device-save=${this._saveDevice}
            @closed=${()=>this._editing=void 0}
          ></artnetui-device-dialog>`:q}
    `}static{this.styles=[be,s`
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
    `]}}function wt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}e([ue({attribute:!1})],xt.prototype,"config",void 0),e([ue({attribute:!1})],xt.prototype,"issues",void 0),e([ue({attribute:!1})],xt.prototype,"t",void 0),e([pe()],xt.prototype,"_editing",void 0),ve("artnetui-editor",xt);var At,kt,Ct,St,Et,Tt,Nt,Ot,It,Mt,Lt,jt,Dt,Ut,Rt,Ft,zt,Pt,Ht,Kt,Bt,qt,Wt,Yt,Jt,Vt,Gt,Zt,Xt,Qt,en,tn,nn,rn,on,sn,an,ln,cn,dn,un,pn,hn,fn,mn={},gn={},vn={};function yn(){if(At)return vn;function e(e){return null==e}return At=1,vn.isNothing=e,vn.isObject=function(e){return"object"==typeof e&&null!==e},vn.toArray=function(t){return Array.isArray(t)?t:e(t)?[]:[t]},vn.repeat=function(e,t){let n="";for(let i=0;i<t;i+=1)n+=e;return n},vn.isNegativeZero=function(e){return 0===e&&Number.NEGATIVE_INFINITY===1/e},vn.extend=function(e,t){if(t){const n=Object.keys(t);for(let i=0,r=n.length;i<r;i+=1){const r=n[i];e[r]=t[r]}}return e},vn}function bn(){if(Ct)return kt;function e(e,t){let n="";const i=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(n+='in "'+e.mark.name+'" '),n+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!t&&e.mark.snippet&&(n+="\n\n"+e.mark.snippet),i+" "+n):i}function t(t,n){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=n,this.message=e(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack||""}return Ct=1,t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t.prototype.toString=function(t){return this.name+": "+e(this,t)},kt=t}function _n(){if(Nt)return Tt;Nt=1;const e=bn(),t=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],n=["scalar","sequence","mapping"];return Tt=function(i,r){if(r=r||{},Object.keys(r).forEach(function(n){if(-1===t.indexOf(n))throw new e('Unknown option "'+n+'" is met in definition of "'+i+'" YAML type.')}),this.options=r,this.tag=i,this.kind=r.kind||null,this.resolve=r.resolve||function(){return!0},this.construct=r.construct||function(e){return e},this.instanceOf=r.instanceOf||null,this.predicate=r.predicate||null,this.represent=r.represent||null,this.representName=r.representName||null,this.defaultStyle=r.defaultStyle||null,this.multi=r.multi||!1,this.styleAliases=function(e){const t={};return null!==e&&Object.keys(e).forEach(function(n){e[n].forEach(function(e){t[String(e)]=n})}),t}(r.styleAliases||null),-1===n.indexOf(this.kind))throw new e('Unknown kind "'+this.kind+'" is specified for "'+i+'" YAML type.')}}function $n(){if(It)return Ot;It=1;const e=bn(),t=_n();function n(e,t){const n=[];return e[t].forEach(function(e){let t=n.length;n.forEach(function(n,i){n.tag===e.tag&&n.kind===e.kind&&n.multi===e.multi&&(t=i)}),n[t]=e}),n}function i(e){return this.extend(e)}return i.prototype.extend=function(r){let o=[],s=[];if(r instanceof t)s.push(r);else if(Array.isArray(r))s=s.concat(r);else{if(!r||!Array.isArray(r.implicit)&&!Array.isArray(r.explicit))throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");r.implicit&&(o=o.concat(r.implicit)),r.explicit&&(s=s.concat(r.explicit))}o.forEach(function(n){if(!(n instanceof t))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(n.loadKind&&"scalar"!==n.loadKind)throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(n.multi)throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),s.forEach(function(n){if(!(n instanceof t))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const a=Object.create(i.prototype);return a.implicit=(this.implicit||[]).concat(o),a.explicit=(this.explicit||[]).concat(s),a.compiledImplicit=n(a,"implicit"),a.compiledExplicit=n(a,"explicit"),a.compiledTypeMap=function(){const e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function t(t){t.multi?(e.multi[t.kind].push(t),e.multi.fallback.push(t)):e[t.kind][t.tag]=e.fallback[t.tag]=t}for(let e=0,n=arguments.length;e<n;e+=1)arguments[e].forEach(t);return e}(a.compiledImplicit,a.compiledExplicit),a},Ot=i}function xn(){if(Lt)return Mt;Lt=1;const e=_n();return Mt=new e("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return null!==e?e:""}})}function wn(){if(Dt)return jt;Dt=1;const e=_n();return jt=new e("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return null!==e?e:[]}})}function An(){if(Rt)return Ut;Rt=1;const e=_n();return Ut=new e("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return null!==e?e:{}}})}function kn(){if(zt)return Ft;zt=1;const e=$n();return Ft=new e({explicit:[xn(),wn(),An()]})}function Cn(){if(Ht)return Pt;Ht=1;const e=_n();return Pt=new e("tag:yaml.org,2002:null",{kind:"scalar",resolve:function(e){if(null===e)return!0;const t=e.length;return 1===t&&"~"===e||4===t&&("null"===e||"Null"===e||"NULL"===e)},construct:function(){return null},predicate:function(e){return null===e},represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"})}function Sn(){if(Bt)return Kt;Bt=1;const e=_n();return Kt=new e("tag:yaml.org,2002:bool",{kind:"scalar",resolve:function(e){if(null===e)return!1;const t=e.length;return 4===t&&("true"===e||"True"===e||"TRUE"===e)||5===t&&("false"===e||"False"===e||"FALSE"===e)},construct:function(e){return"true"===e||"True"===e||"TRUE"===e},predicate:function(e){return"[object Boolean]"===Object.prototype.toString.call(e)},represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"})}function En(){if(Wt)return qt;Wt=1;const e=yn(),t=_n();function n(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function i(e){return e>=48&&e<=55}function r(e){return e>=48&&e<=57}function o(e){let t=e,n=1,i=t[0];if("-"!==i&&"+"!==i||("-"===i&&(n=-1),t=t.slice(1),i=t[0]),"0"===t)return 0;if("0"===i){if("b"===t[1])return n*parseInt(t.slice(2),2);if("x"===t[1])return n*parseInt(t.slice(2),16);if("o"===t[1])return n*parseInt(t.slice(2),8)}return n*parseInt(t,10)}return qt=new t("tag:yaml.org,2002:int",{kind:"scalar",resolve:function(e){if(null===e)return!1;const t=e.length;let s=0,a=!1;if(!t)return!1;let l=e[s];if("-"!==l&&"+"!==l||(l=e[++s]),"0"===l){if(s+1===t)return!0;if(l=e[++s],"b"===l){for(s++;s<t;s++){if(l=e[s],"0"!==l&&"1"!==l)return!1;a=!0}return a&&isFinite(o(e))}if("x"===l){for(s++;s<t;s++){if(!n(e.charCodeAt(s)))return!1;a=!0}return a&&isFinite(o(e))}if("o"===l){for(s++;s<t;s++){if(!i(e.charCodeAt(s)))return!1;a=!0}return a&&isFinite(o(e))}}for(;s<t;s++){if(!r(e.charCodeAt(s)))return!1;a=!0}return!!a&&isFinite(o(e))},construct:function(e){return o(e)},predicate:function(t){return"[object Number]"===Object.prototype.toString.call(t)&&t%1==0&&!e.isNegativeZero(t)},represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})}function Tn(){if(Jt)return Yt;Jt=1;const e=yn(),t=_n(),n=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),i=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");const r=/^[-+]?[0-9]+e/;return Yt=new t("tag:yaml.org,2002:float",{kind:"scalar",resolve:function(e){return null!==e&&(!!n.test(e)&&(!!isFinite(parseFloat(e,10))||i.test(e)))},construct:function(e){let t=e.toLowerCase();const n="-"===t[0]?-1:1;return"+-".indexOf(t[0])>=0&&(t=t.slice(1)),".inf"===t?1===n?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:".nan"===t?NaN:n*parseFloat(t,10)},predicate:function(t){return"[object Number]"===Object.prototype.toString.call(t)&&(t%1!=0||e.isNegativeZero(t))},represent:function(t,n){if(isNaN(t))switch(n){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===t)switch(n){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===t)switch(n){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(e.isNegativeZero(t))return"-0.0";const i=t.toString(10);return r.test(i)?i.replace("e",".e"):i},defaultStyle:"lowercase"})}function Nn(){return Gt?Vt:(Gt=1,Vt=kn().extend({implicit:[Cn(),Sn(),En(),Tn()]}))}function On(){return Xt?Zt:(Xt=1,Zt=Nn())}function In(){if(en)return Qt;en=1;const e=_n(),t=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),n=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");return Qt=new e("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:function(e){return null!==e&&(null!==t.exec(e)||null!==n.exec(e))},construct:function(e){let i=0,r=null,o=t.exec(e);if(null===o&&(o=n.exec(e)),null===o)throw new Error("Date resolve error");const s=+o[1],a=+o[2]-1,l=+o[3];if(!o[4])return new Date(Date.UTC(s,a,l));const c=+o[4],d=+o[5],u=+o[6];if(o[7]){for(i=o[7].slice(0,3);i.length<3;)i+="0";i=+i}if(o[9]){r=6e4*(60*+o[10]+ +(o[11]||0)),"-"===o[9]&&(r=-r)}const p=new Date(Date.UTC(s,a,l,c,d,u,i));return r&&p.setTime(p.getTime()-r),p},instanceOf:Date,represent:function(e){return e.toISOString()}})}function Mn(){if(nn)return tn;nn=1;const e=_n();return tn=new e("tag:yaml.org,2002:merge",{kind:"scalar",resolve:function(e){return"<<"===e||null===e}})}function Ln(){if(on)return rn;on=1;const e=_n(),t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";return rn=new e("tag:yaml.org,2002:binary",{kind:"scalar",resolve:function(e){if(null===e)return!1;let n=0;const i=e.length,r=t;for(let t=0;t<i;t++){const i=r.indexOf(e.charAt(t));if(!(i>64)){if(i<0)return!1;n+=6}}return n%8==0},construct:function(e){const n=e.replace(/[\r\n=]/g,""),i=n.length,r=t;let o=0;const s=[];for(let e=0;e<i;e++)e%4==0&&e&&(s.push(o>>16&255),s.push(o>>8&255),s.push(255&o)),o=o<<6|r.indexOf(n.charAt(e));const a=i%4*6;return 0===a?(s.push(o>>16&255),s.push(o>>8&255),s.push(255&o)):18===a?(s.push(o>>10&255),s.push(o>>2&255)):12===a&&s.push(o>>4&255),new Uint8Array(s)},predicate:function(e){return"[object Uint8Array]"===Object.prototype.toString.call(e)},represent:function(e){let n="",i=0;const r=e.length,o=t;for(let t=0;t<r;t++)t%3==0&&t&&(n+=o[i>>18&63],n+=o[i>>12&63],n+=o[i>>6&63],n+=o[63&i]),i=(i<<8)+e[t];const s=r%3;return 0===s?(n+=o[i>>18&63],n+=o[i>>12&63],n+=o[i>>6&63],n+=o[63&i]):2===s?(n+=o[i>>10&63],n+=o[i>>4&63],n+=o[i<<2&63],n+=o[64]):1===s&&(n+=o[i>>2&63],n+=o[i<<4&63],n+=o[64],n+=o[64]),n}})}function jn(){if(an)return sn;an=1;const e=_n(),t=Object.prototype.hasOwnProperty,n=Object.prototype.toString;return sn=new e("tag:yaml.org,2002:omap",{kind:"sequence",resolve:function(e){if(null===e)return!0;const i={},r=e;for(let e=0,o=r.length;e<o;e+=1){const o=r[e];let s,a=!1;if("[object Object]"!==n.call(o))return!1;for(s in o)if(t.call(o,s)){if(a)return!1;a=!0}if(!a)return!1;if(t.call(i,s))return!1;Object.defineProperty(i,s,{value:!0})}return!0},construct:function(e){return null!==e?e:[]}})}function Dn(){if(cn)return ln;cn=1;const e=_n(),t=Object.prototype.toString;return ln=new e("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:function(e){if(null===e)return!0;const n=e,i=new Array(n.length);for(let e=0,r=n.length;e<r;e+=1){const r=n[e];if("[object Object]"!==t.call(r))return!1;const o=Object.keys(r);if(1!==o.length)return!1;i[e]=[o[0],r[o[0]]]}return!0},construct:function(e){if(null===e)return[];const t=e,n=new Array(t.length);for(let e=0,i=t.length;e<i;e+=1){const i=t[e],r=Object.keys(i);n[e]=[r[0],i[r[0]]]}return n}})}function Un(){if(un)return dn;un=1;const e=_n(),t=Object.prototype.hasOwnProperty;return dn=new e("tag:yaml.org,2002:set",{kind:"mapping",resolve:function(e){if(null===e)return!0;const n=e;for(const e in n)if(t.call(n,e)&&null!==n[e])return!1;return!0},construct:function(e){return null!==e?e:{}}})}function Rn(){return hn?pn:(hn=1,pn=On().extend({implicit:[In(),Mn()],explicit:[Ln(),jn(),Dn(),Un()]}))}function Fn(){if(fn)return gn;fn=1;const e=yn(),t=bn(),n=function(){if(Et)return St;Et=1;const e=yn();function t(e,t,n,i,r){let o="",s="";const a=Math.floor(r/2)-1;return i-t>a&&(o=" ... ",t=i-a+o.length),n-i>a&&(s=" ...",n=i+a-s.length),{str:o+e.slice(t,n).replace(/\t/g,"→")+s,pos:i-t+o.length}}function n(t,n){return e.repeat(" ",n-t.length)+t}return St=function(i,r){if(r=Object.create(r||null),!i.buffer)return null;r.maxLength||(r.maxLength=79),"number"!=typeof r.indent&&(r.indent=1),"number"!=typeof r.linesBefore&&(r.linesBefore=3),"number"!=typeof r.linesAfter&&(r.linesAfter=2);const o=/\r?\n|\r|\0/g,s=[0],a=[];let l,c=-1;for(;l=o.exec(i.buffer);)a.push(l.index),s.push(l.index+l[0].length),i.position<=l.index&&c<0&&(c=s.length-2);c<0&&(c=s.length-1);let d="";const u=Math.min(i.line+r.linesAfter,a.length).toString().length,p=r.maxLength-(r.indent+u+3);for(let o=1;o<=r.linesBefore&&!(c-o<0);o++){const l=t(i.buffer,s[c-o],a[c-o],i.position-(s[c]-s[c-o]),p);d=e.repeat(" ",r.indent)+n((i.line-o+1).toString(),u)+" | "+l.str+"\n"+d}const h=t(i.buffer,s[c],a[c],i.position,p);d+=e.repeat(" ",r.indent)+n((i.line+1).toString(),u)+" | "+h.str+"\n",d+=e.repeat("-",r.indent+u+3+h.pos)+"^\n";for(let o=1;o<=r.linesAfter&&!(c+o>=a.length);o++){const l=t(i.buffer,s[c+o],a[c+o],i.position-(s[c]-s[c+o]),p);d+=e.repeat(" ",r.indent)+n((i.line+o+1).toString(),u)+" | "+l.str+"\n"}return d.replace(/\n$/,"")},St}(),i=Rn(),r=Object.prototype.hasOwnProperty,o=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,s=/[\x85\u2028\u2029]/,a=/[,\[\]{}]/,l=/^(?:!|!!|![0-9A-Za-z-]+!)$/,c=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function d(e){return Object.prototype.toString.call(e)}function u(e){return 10===e||13===e}function p(e){return 9===e||32===e}function h(e){return 9===e||32===e||10===e||13===e}function f(e){return 44===e||91===e||93===e||123===e||125===e}function m(e){if(e>=48&&e<=57)return e-48;const t=32|e;return t>=97&&t<=102?t-97+10:-1}function g(e){return 120===e?2:117===e?4:85===e?8:0}function v(e){return e>=48&&e<=57?e-48:-1}function y(e){switch(e){case 48:return"\0";case 97:return"";case 98:return"\b";case 116:case 9:return"\t";case 110:return"\n";case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function b(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023))}function _(e,t,n){"__proto__"===t?Object.defineProperty(e,t,{configurable:!0,enumerable:!0,writable:!0,value:n}):e[t]=n}const $=new Array(256),x=new Array(256);for(let e=0;e<256;e++)$[e]=y(e)?1:0,x[e]=y(e);function w(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||i,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.maxDepth="number"==typeof t.maxDepth?t.maxDepth:100,this.maxTotalMergeKeys="number"==typeof t.maxTotalMergeKeys?t.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function A(e,i){const r={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return r.snippet=n(r),new t(i,r)}function k(e,t){throw A(e,t)}function C(e,t){e.onWarning&&e.onWarning.call(null,A(e,t))}function S(e,t,n){const i=e.anchorMapTransactions;if(0!==i.length){const n=i[i.length-1];r.call(n,t)||(n[t]={existed:r.call(e.anchorMap,t),value:e.anchorMap[t]})}e.anchorMap[t]=n}function E(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,tag:e.tag,anchor:e.anchor,kind:e.kind,result:e.result}}function T(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.tag=t.tag,e.anchor=t.anchor,e.kind=t.kind,e.result=t.result}const N={YAML:function(e,t,n){null!==e.version&&k(e,"duplication of %YAML directive"),1!==n.length&&k(e,"YAML directive accepts exactly one argument");const i=/^([0-9]+)\.([0-9]+)$/.exec(n[0]);null===i&&k(e,"ill-formed argument of the YAML directive");const r=parseInt(i[1],10),o=parseInt(i[2],10);1!==r&&k(e,"unacceptable YAML version of the document"),e.version=n[0],e.checkLineBreaks=o<2,1!==o&&2!==o&&C(e,"unsupported YAML version of the document")},TAG:function(e,t,n){let i;2!==n.length&&k(e,"TAG directive accepts exactly two arguments");const o=n[0];i=n[1],l.test(o)||k(e,"ill-formed tag handle (first argument) of the TAG directive"),r.call(e.tagMap,o)&&k(e,'there is a previously declared suffix for "'+o+'" tag handle'),c.test(i)||k(e,"ill-formed tag prefix (second argument) of the TAG directive");try{i=decodeURIComponent(i)}catch(t){k(e,"tag prefix is malformed: "+i)}e.tagMap[o]=i}};function O(e,t,n,i){if(t<n){const r=e.input.slice(t,n);if(i)for(let t=0,n=r.length;t<n;t+=1){const n=r.charCodeAt(t);9===n||n>=32&&n<=1114111||k(e,"expected valid JSON character")}else o.test(r)&&k(e,"the stream contains non-printable characters");e.result+=r}}function I(e){e.totalMergeKeys++,-1!==e.maxTotalMergeKeys&&e.totalMergeKeys>e.maxTotalMergeKeys&&k(e,"merge keys exceeded maxTotalMergeKeys ("+e.maxTotalMergeKeys+")")}function M(t,n,i,o){e.isObject(i)||k(t,"cannot merge mappings; the provided source object is unacceptable"),I(t);const s=Object.keys(i);for(let e=0,a=s.length;e<a;e+=1){const a=s[e];I(t),r.call(n,a)||(_(n,a,i[a]),o[a]=!0)}}function L(e,t,n,i,o,s,a,l,c){if(Array.isArray(o))for(let t=0,n=(o=Array.prototype.slice.call(o)).length;t<n;t+=1)Array.isArray(o[t])&&k(e,"nested arrays are not supported inside keys"),"object"==typeof o&&"[object Object]"===d(o[t])&&(o[t]="[object Object]");if("object"==typeof o&&"[object Object]"===d(o)&&(o="[object Object]"),o=String(o),null===t&&(t={}),"tag:yaml.org,2002:merge"===i)if(Array.isArray(s)){s.length>100&&k(e,"abnormal merge sequence size");for(let i=0,r=s.length;i<r;i+=1)M(e,t,s[i],n)}else M(e,t,s,n);else e.json||r.call(n,o)||!r.call(t,o)||(e.line=a||e.line,e.lineStart=l||e.lineStart,e.position=c||e.position,k(e,"duplicated mapping key")),_(t,o,s),delete n[o];return t}function j(e){const t=e.input.charCodeAt(e.position);10===t?e.position++:13===t?(e.position++,10===e.input.charCodeAt(e.position)&&e.position++):k(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function D(e,t,n){let i=0,r=e.input.charCodeAt(e.position);for(;0!==r;){for(;p(r);)9===r&&-1===e.firstTabInLine&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&35===r)do{r=e.input.charCodeAt(++e.position)}while(10!==r&&13!==r&&0!==r);if(!u(r))break;for(j(e),r=e.input.charCodeAt(e.position),i++,e.lineIndent=0;32===r;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return-1!==n&&0!==i&&e.lineIndent<n&&C(e,"deficient indentation"),i}function U(e){let t=e.position,n=e.input.charCodeAt(t);return!(45!==n&&46!==n||n!==e.input.charCodeAt(t+1)||n!==e.input.charCodeAt(t+2)||(t+=3,n=e.input.charCodeAt(t),0!==n&&!h(n)))}function R(t,n){1===n?t.result+=" ":n>1&&(t.result+=e.repeat("\n",n-1))}function F(e,t){const n=e.tag,i=e.anchor,r=[];let o=!1;if(-1!==e.firstTabInLine)return!1;null!==e.anchor&&S(e,e.anchor,r);let s=e.input.charCodeAt(e.position);for(;0!==s&&(-1!==e.firstTabInLine&&(e.position=e.firstTabInLine,k(e,"tab characters must not be used in indentation")),45===s);){if(!h(e.input.charCodeAt(e.position+1)))break;if(o=!0,e.position++,D(e,!0,-1)&&e.lineIndent<=t){r.push(null),s=e.input.charCodeAt(e.position);continue}const n=e.line;if(B(e,t,3,!1,!0),r.push(e.result),D(e,!0,-1),s=e.input.charCodeAt(e.position),(e.line===n||e.lineIndent>t)&&0!==s)k(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break}return!!o&&(e.tag=n,e.anchor=i,e.kind="sequence",e.result=r,!0)}function z(e,t,n){let i,r,o,s;const a=e.tag,l=e.anchor,c={},d=Object.create(null);let u=null,f=null,m=null,g=!1,v=!1;if(-1!==e.firstTabInLine)return!1;null!==e.anchor&&S(e,e.anchor,c);let y=e.input.charCodeAt(e.position);for(;0!==y;){g||-1===e.firstTabInLine||(e.position=e.firstTabInLine,k(e,"tab characters must not be used in indentation"));const b=e.input.charCodeAt(e.position+1),_=e.line;if(63!==y&&58!==y||!h(b)){if(r=e.line,o=e.lineStart,s=e.position,!B(e,n,2,!1,!0))break;if(e.line===_){for(y=e.input.charCodeAt(e.position);p(y);)y=e.input.charCodeAt(++e.position);if(58===y)y=e.input.charCodeAt(++e.position),h(y)||k(e,"a whitespace character is expected after the key-value separator within a block mapping"),g&&(L(e,c,d,u,f,null,r,o,s),u=f=m=null),v=!0,g=!1,i=!1,u=e.tag,f=e.result;else{if(!v)return e.tag=a,e.anchor=l,!0;k(e,"can not read an implicit mapping pair; a colon is missed")}}else{if(!v)return e.tag=a,e.anchor=l,!0;k(e,"can not read a block mapping entry; a multiline key may not be an implicit key")}}else 63===y?(g&&(L(e,c,d,u,f,null,r,o,s),u=f=m=null),v=!0,g=!0,i=!0):g?(g=!1,i=!0):k(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,y=b;if((e.line===_||e.lineIndent>t)&&(g&&(r=e.line,o=e.lineStart,s=e.position),B(e,t,4,!0,i)&&(g?f=e.result:m=e.result),g||(L(e,c,d,u,f,m,r,o,s),u=f=m=null),D(e,!0,-1),y=e.input.charCodeAt(e.position)),(e.line===_||e.lineIndent>t)&&0!==y)k(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return g&&L(e,c,d,u,f,null,r,o,s),v&&(e.tag=a,e.anchor=l,e.kind="mapping",e.result=c),v}function P(e){let t,n,i=!1,o=!1,s=e.input.charCodeAt(e.position);if(33!==s)return!1;null!==e.tag&&k(e,"duplication of a tag property"),s=e.input.charCodeAt(++e.position),60===s?(i=!0,s=e.input.charCodeAt(++e.position)):33===s?(o=!0,t="!!",s=e.input.charCodeAt(++e.position)):t="!";let d=e.position;if(i){do{s=e.input.charCodeAt(++e.position)}while(0!==s&&62!==s);e.position<e.length?(n=e.input.slice(d,e.position),s=e.input.charCodeAt(++e.position)):k(e,"unexpected end of the stream within a verbatim tag")}else{for(;0!==s&&!h(s);)33===s&&(o?k(e,"tag suffix cannot contain exclamation marks"):(t=e.input.slice(d-1,e.position+1),l.test(t)||k(e,"named tag handle cannot contain such characters"),o=!0,d=e.position+1)),s=e.input.charCodeAt(++e.position);n=e.input.slice(d,e.position),a.test(n)&&k(e,"tag suffix cannot contain flow indicator characters")}n&&!c.test(n)&&k(e,"tag name cannot contain such characters: "+n);try{n=decodeURIComponent(n)}catch(t){k(e,"tag name is malformed: "+n)}return i?e.tag=n:r.call(e.tagMap,t)?e.tag=e.tagMap[t]+n:"!"===t?e.tag="!"+n:"!!"===t?e.tag="tag:yaml.org,2002:"+n:k(e,'undeclared tag handle "'+t+'"'),!0}function H(e){let t=e.input.charCodeAt(e.position);if(38!==t)return!1;null!==e.anchor&&k(e,"duplication of an anchor property"),t=e.input.charCodeAt(++e.position);const n=e.position;for(;0!==t&&!h(t)&&!f(t);)t=e.input.charCodeAt(++e.position);return e.position===n&&k(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(n,e.position),!0}function K(e,t,n,i){const o=E(e);return function(e){e.anchorMapTransactions.push(Object.create(null))}(e),T(e,t),e.tag=null,e.anchor=null,e.kind=null,e.result=null,z(e,n,i)&&"mapping"===e.kind?(function(e){const t=e.anchorMapTransactions.pop(),n=e.anchorMapTransactions;if(0===n.length)return;const i=n[n.length-1],o=Object.keys(t);for(let e=0,n=o.length;e<n;e+=1){const n=o[e];r.call(i,n)||(i[n]=t[n])}}(e),!0):(function(e){const t=e.anchorMapTransactions.pop(),n=Object.keys(t);for(let i=n.length-1;i>=0;i-=1){const r=t[n[i]];r.existed?e.anchorMap[n[i]]=r.value:delete e.anchorMap[n[i]]}}(e),T(e,o),!1)}function B(t,n,i,o,s){let a,l,c,d,y,_=1,w=!1,A=!1,C=null;t.depth>=t.maxDepth&&k(t,"nesting exceeded maxDepth ("+t.maxDepth+")"),t.depth+=1,null!==t.listener&&t.listener("open",t),t.tag=null,t.anchor=null,t.kind=null,t.result=null;const T=a=l=4===i||3===i;if(o&&D(t,!0,-1)&&(w=!0,t.lineIndent>n?_=1:t.lineIndent===n?_=0:t.lineIndent<n&&(_=-1)),1===_)for(;;){const e=t.input.charCodeAt(t.position),i=E(t);if(w&&(33===e&&null!==t.tag||38===e&&null!==t.anchor))break;if(!P(t)&&!H(t))break;null===C&&(C=i),D(t,!0,-1)?(w=!0,l=T,t.lineIndent>n?_=1:t.lineIndent===n?_=0:t.lineIndent<n&&(_=-1)):l=!1}if(l&&(l=w||s),1===_||4===i)if(d=1===i||2===i?n:n+1,y=t.position-t.lineStart,1===_)if(l&&(F(t,y)||z(t,y,d))||function(e,t){let n,i,r,o=!0;const s=e.tag;let a;const l=e.anchor;let c,d,u,p;const f=Object.create(null);let m,g,v,y=e.input.charCodeAt(e.position);if(91===y)c=93,p=!1,a=[];else{if(123!==y)return!1;c=125,p=!0,a={}}for(null!==e.anchor&&S(e,e.anchor,a),y=e.input.charCodeAt(++e.position);0!==y;){if(D(e,!0,t),y=e.input.charCodeAt(e.position),y===c)return e.position++,e.tag=s,e.anchor=l,e.kind=p?"mapping":"sequence",e.result=a,!0;o?44===y&&k(e,"expected the node content, but found ','"):k(e,"missed comma between flow collection entries"),g=m=v=null,d=u=!1,63===y&&h(e.input.charCodeAt(e.position+1))&&(d=u=!0,e.position++,D(e,!0,t)),n=e.line,i=e.lineStart,r=e.position,B(e,t,1,!1,!0),g=e.tag,m=e.result,D(e,!0,t),y=e.input.charCodeAt(e.position),!u&&e.line!==n||58!==y||(d=!0,y=e.input.charCodeAt(++e.position),D(e,!0,t),B(e,t,1,!1,!0),v=e.result),p?L(e,a,f,g,m,v,n,i,r):d?a.push(L(e,null,f,g,m,v,n,i,r)):a.push(m),D(e,!0,t),y=e.input.charCodeAt(e.position),44===y?(o=!0,y=e.input.charCodeAt(++e.position)):o=!1}k(e,"unexpected end of the stream within a flow collection")}(t,d))A=!0;else{const n=t.input.charCodeAt(t.position);null!==C&&T&&!l&&124!==n&&62!==n&&K(t,C,C.position-C.lineStart,d)||a&&function(t,n){let i,r,o=1,s=!1,a=!1,l=n,c=0,d=!1,h=t.input.charCodeAt(t.position);if(124===h)i=!1;else{if(62!==h)return!1;i=!0}for(t.kind="scalar",t.result="";0!==h;)if(h=t.input.charCodeAt(++t.position),43===h||45===h)1===o?o=43===h?3:2:k(t,"repeat of a chomping mode identifier");else{if(!((r=v(h))>=0))break;0===r?k(t,"bad explicit indentation width of a block scalar; it cannot be less than one"):a?k(t,"repeat of an indentation width identifier"):(l=n+r-1,a=!0)}if(p(h)){do{h=t.input.charCodeAt(++t.position)}while(p(h));if(35===h)do{h=t.input.charCodeAt(++t.position)}while(!u(h)&&0!==h)}for(;0!==h;){for(j(t),t.lineIndent=0,h=t.input.charCodeAt(t.position);(!a||t.lineIndent<l)&&32===h;)t.lineIndent++,h=t.input.charCodeAt(++t.position);if(!a&&t.lineIndent>l&&(l=t.lineIndent),u(h)){c++;continue}if(a||0!==l||k(t,"missing indentation for block scalar"),t.lineIndent<l){3===o?t.result+=e.repeat("\n",s?1+c:c):1===o&&s&&(t.result+="\n");break}i?p(h)?(d=!0,t.result+=e.repeat("\n",s?1+c:c)):d?(d=!1,t.result+=e.repeat("\n",c+1)):0===c?s&&(t.result+=" "):t.result+=e.repeat("\n",c):t.result+=e.repeat("\n",s?1+c:c),s=!0,a=!0,c=0;const n=t.position;for(;!u(h)&&0!==h;)h=t.input.charCodeAt(++t.position);O(t,n,t.position,!1)}return!0}(t,d)||function(e,t){let n,i,r=e.input.charCodeAt(e.position);if(39!==r)return!1;for(e.kind="scalar",e.result="",e.position++,n=i=e.position;0!==(r=e.input.charCodeAt(e.position));)if(39===r){if(O(e,n,e.position,!0),r=e.input.charCodeAt(++e.position),39!==r)return!0;n=e.position,e.position++,i=e.position}else u(r)?(O(e,n,i,!0),R(e,D(e,!1,t)),n=i=e.position):e.position===e.lineStart&&U(e)?k(e,"unexpected end of the document within a single quoted scalar"):(e.position++,p(r)||(i=e.position));k(e,"unexpected end of the stream within a single quoted scalar")}(t,d)||function(e,t){let n,i,r,o=e.input.charCodeAt(e.position);if(34!==o)return!1;for(e.kind="scalar",e.result="",e.position++,n=i=e.position;0!==(o=e.input.charCodeAt(e.position));){if(34===o)return O(e,n,e.position,!0),e.position++,!0;if(92===o){if(O(e,n,e.position,!0),o=e.input.charCodeAt(++e.position),u(o))D(e,!1,t);else if(o<256&&$[o])e.result+=x[o],e.position++;else if((r=g(o))>0){let t=r,n=0;for(;t>0;t--)o=e.input.charCodeAt(++e.position),(r=m(o))>=0?n=(n<<4)+r:k(e,"expected hexadecimal character");e.result+=b(n),e.position++}else k(e,"unknown escape sequence");n=i=e.position}else u(o)?(O(e,n,i,!0),R(e,D(e,!1,t)),n=i=e.position):e.position===e.lineStart&&U(e)?k(e,"unexpected end of the document within a double quoted scalar"):(e.position++,p(o)||(i=e.position))}k(e,"unexpected end of the stream within a double quoted scalar")}(t,d)?A=!0:!function(e){let t=e.input.charCodeAt(e.position);if(42!==t)return!1;t=e.input.charCodeAt(++e.position);const n=e.position;for(;0!==t&&!h(t)&&!f(t);)t=e.input.charCodeAt(++e.position);e.position===n&&k(e,"name of an alias node must contain at least one character");const i=e.input.slice(n,e.position);return r.call(e.anchorMap,i)||k(e,'unidentified alias "'+i+'"'),e.result=e.anchorMap[i],D(e,!0,-1),!0}(t)?function(e,t,n){let i,r,o,s,a,l;const c=e.kind,d=e.result;let m=e.input.charCodeAt(e.position);if(h(m)||f(m)||35===m||38===m||42===m||33===m||124===m||62===m||39===m||34===m||37===m||64===m||96===m)return!1;if(63===m||45===m){const t=e.input.charCodeAt(e.position+1);if(h(t)||n&&f(t))return!1}for(e.kind="scalar",e.result="",i=r=e.position,o=!1;0!==m;){if(58===m){const t=e.input.charCodeAt(e.position+1);if(h(t)||n&&f(t))break}else if(35===m){if(h(e.input.charCodeAt(e.position-1)))break}else{if(e.position===e.lineStart&&U(e)||n&&f(m))break;if(u(m)){if(s=e.line,a=e.lineStart,l=e.lineIndent,D(e,!1,-1),e.lineIndent>=t){o=!0,m=e.input.charCodeAt(e.position);continue}e.position=r,e.line=s,e.lineStart=a,e.lineIndent=l;break}}o&&(O(e,i,r,!1),R(e,e.line-s),i=r=e.position,o=!1),p(m)||(r=e.position+1),m=e.input.charCodeAt(++e.position)}return O(e,i,r,!1),!!e.result||(e.kind=c,e.result=d,!1)}(t,d,1===i)&&(A=!0,null===t.tag&&(t.tag="?")):(A=!0,null===t.tag&&null===t.anchor||k(t,"alias node should not have any properties")),null!==t.anchor&&S(t,t.anchor,t.result)}else 0===_&&(A=l&&F(t,y));if(null===t.tag)null!==t.anchor&&S(t,t.anchor,t.result);else if("?"===t.tag){null!==t.result&&"scalar"!==t.kind&&k(t,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+t.kind+'"');for(let e=0,n=t.implicitTypes.length;e<n;e+=1)if(c=t.implicitTypes[e],c.resolve(t.result)){t.result=c.construct(t.result),t.tag=c.tag,null!==t.anchor&&S(t,t.anchor,t.result);break}}else if("!"!==t.tag){if(r.call(t.typeMap[t.kind||"fallback"],t.tag))c=t.typeMap[t.kind||"fallback"][t.tag];else{c=null;const e=t.typeMap.multi[t.kind||"fallback"];for(let n=0,i=e.length;n<i;n+=1)if(t.tag.slice(0,e[n].tag.length)===e[n].tag){c=e[n];break}}c||k(t,"unknown tag !<"+t.tag+">"),null!==t.result&&c.kind!==t.kind&&k(t,"unacceptable node kind for !<"+t.tag+'> tag; it should be "'+c.kind+'", not "'+t.kind+'"'),c.resolve(t.result,t.tag)?(t.result=c.construct(t.result,t.tag),null!==t.anchor&&S(t,t.anchor,t.result)):k(t,"cannot resolve a node with !<"+t.tag+"> explicit tag")}return null!==t.listener&&t.listener("close",t),t.depth-=1,null!==t.tag||null!==t.anchor||A}function q(e){const t=e.position;let n,i=!1;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);0!==(n=e.input.charCodeAt(e.position))&&(D(e,!0,-1),n=e.input.charCodeAt(e.position),!(e.lineIndent>0||37!==n));){i=!0,n=e.input.charCodeAt(++e.position);let t=e.position;for(;0!==n&&!h(n);)n=e.input.charCodeAt(++e.position);const o=e.input.slice(t,e.position),s=[];for(o.length<1&&k(e,"directive name must not be less than one character in length");0!==n;){for(;p(n);)n=e.input.charCodeAt(++e.position);if(35===n){do{n=e.input.charCodeAt(++e.position)}while(0!==n&&!u(n));break}if(u(n))break;for(t=e.position;0!==n&&!h(n);)n=e.input.charCodeAt(++e.position);s.push(e.input.slice(t,e.position))}0!==n&&j(e),r.call(N,o)?N[o](e,o,s):C(e,'unknown document directive "'+o+'"')}D(e,!0,-1),0===e.lineIndent&&45===e.input.charCodeAt(e.position)&&45===e.input.charCodeAt(e.position+1)&&45===e.input.charCodeAt(e.position+2)?(e.position+=3,D(e,!0,-1)):i&&k(e,"directives end mark is expected"),B(e,e.lineIndent-1,4,!1,!0),D(e,!0,-1),e.checkLineBreaks&&s.test(e.input.slice(t,e.position))&&C(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&U(e)?46===e.input.charCodeAt(e.position)&&(e.position+=3,D(e,!0,-1)):e.position<e.length-1&&k(e,"end of the stream or a document separator is expected")}function W(e,t){t=t||{},0!==(e=String(e)).length&&(10!==e.charCodeAt(e.length-1)&&13!==e.charCodeAt(e.length-1)&&(e+="\n"),65279===e.charCodeAt(0)&&(e=e.slice(1)));const n=new w(e,t),i=e.indexOf("\0");for(-1!==i&&(n.position=i,k(n,"null byte is not allowed in input")),n.input+="\0";32===n.input.charCodeAt(n.position);)n.lineIndent+=1,n.position+=1;for(;n.position<n.length-1;)q(n);return n.documents}return gn.loadAll=function(e,t,n){null!==t&&"object"==typeof t&&void 0===n&&(n=t,t=null);const i=W(e,n);if("function"!=typeof t)return i;for(let e=0,n=i.length;e<n;e+=1)t(i[e])},gn.load=function(e,n){const i=W(e,n);if(0!==i.length){if(1===i.length)return i[0];throw new t("expected a single document in the stream, but found more")}},gn}var zn,Pn,Hn={};function Kn(){if(zn)return Hn;zn=1;const e=yn(),t=bn(),n=Rn(),i=Object.prototype.toString,r=Object.prototype.hasOwnProperty,o=65279,s={0:"\\0",7:"\\a",8:"\\b",9:"\\t",10:"\\n",11:"\\v",12:"\\f",13:"\\r",27:"\\e",34:'\\"',92:"\\\\",133:"\\N",160:"\\_",8232:"\\L",8233:"\\P"},a=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],l=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function c(n){let i,r;const o=n.toString(16).toUpperCase();if(n<=255)i="x",r=2;else if(n<=65535)i="u",r=4;else{if(!(n<=4294967295))throw new t("code point within a string may not be greater than 0xFFFFFFFF");i="U",r=8}return"\\"+i+e.repeat("0",r-o.length)+o}function d(t){this.schema=t.schema||n,this.indent=Math.max(1,t.indent||2),this.noArrayIndent=t.noArrayIndent||!1,this.skipInvalid=t.skipInvalid||!1,this.flowLevel=e.isNothing(t.flowLevel)?-1:t.flowLevel,this.styleMap=function(e,t){if(null===t)return{};const n={},i=Object.keys(t);for(let o=0,s=i.length;o<s;o+=1){let s=i[o],a=String(t[s]);"!!"===s.slice(0,2)&&(s="tag:yaml.org,2002:"+s.slice(2));const l=e.compiledTypeMap.fallback[s];l&&r.call(l.styleAliases,a)&&(a=l.styleAliases[a]),n[s]=a}return n}(this.schema,t.styles||null),this.sortKeys=t.sortKeys||!1,this.lineWidth=t.lineWidth||80,this.noRefs=t.noRefs||!1,this.noCompatMode=t.noCompatMode||!1,this.condenseFlow=t.condenseFlow||!1,this.quotingType='"'===t.quotingType?2:1,this.forceQuotes=t.forceQuotes||!1,this.replacer="function"==typeof t.replacer?t.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function u(t,n){const i=e.repeat(" ",n);let r=0,o="";const s=t.length;for(;r<s;){let e;const n=t.indexOf("\n",r);-1===n?(e=t.slice(r),r=s):(e=t.slice(r,n+1),r=n+1),e.length&&"\n"!==e&&(o+=i),o+=e}return o}function p(t,n){return"\n"+e.repeat(" ",t.indent*n)}function h(e){return 32===e||9===e}function f(e){return e>=32&&e<=126||e>=161&&e<=55295&&8232!==e&&8233!==e||e>=57344&&e<=65533&&e!==o||e>=65536&&e<=1114111}function m(e){return f(e)&&e!==o&&13!==e&&10!==e}function g(e,t,n){const i=m(e),r=i&&!h(e);return(n?i:i&&44!==e&&91!==e&&93!==e&&123!==e&&125!==e)&&35!==e&&!(58===t&&!r)||m(t)&&!h(t)&&35===e||58===t&&r}function v(e,t){const n=e.charCodeAt(t);let i;return n>=55296&&n<=56319&&t+1<e.length&&(i=e.charCodeAt(t+1),i>=56320&&i<=57343)?1024*(n-55296)+i-56320+65536:n}function y(e){return/^\n* /.test(e)}function b(e,t,n,i,r,s,a,l){let c,d=0,u=null,p=!1,m=!1;const b=-1!==i;let _=-1,$=function(e){return f(e)&&e!==o&&!h(e)&&45!==e&&63!==e&&58!==e&&44!==e&&91!==e&&93!==e&&123!==e&&125!==e&&35!==e&&38!==e&&42!==e&&33!==e&&124!==e&&61!==e&&62!==e&&39!==e&&34!==e&&37!==e&&64!==e&&96!==e}(v(e,0))&&function(e){return!h(e)&&58!==e}(v(e,e.length-1));if(t||a)for(c=0;c<e.length;d>=65536?c+=2:c++){if(d=v(e,c),!f(d))return 5;$=$&&g(d,u,l),u=d}else{for(c=0;c<e.length;d>=65536?c+=2:c++){if(d=v(e,c),10===d)p=!0,b&&(m=m||c-_-1>i&&" "!==e[_+1],_=c);else if(!f(d))return 5;$=$&&g(d,u,l),u=d}m=m||b&&c-_-1>i&&" "!==e[_+1]}return p||m?n>9&&y(e)?5:a?2===s?5:2:m?4:3:!$||a||r(e)?2===s?5:2:1}function _(e,n,i,r,o){e.dump=function(){if(0===n.length)return 2===e.quotingType?'""':"''";if(!e.noCompatMode&&(-1!==a.indexOf(n)||l.test(n)))return 2===e.quotingType?'"'+n+'"':"'"+n+"'";const d=e.indent*Math.max(1,i),p=-1===e.lineWidth?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-d),h=r||e.flowLevel>-1&&i>=e.flowLevel;switch(b(n,h,e.indent,p,function(t){return function(e,t){for(let n=0,i=e.implicitTypes.length;n<i;n+=1)if(e.implicitTypes[n].resolve(t))return!0;return!1}(e,t)},e.quotingType,e.forceQuotes&&!r,o)){case 1:return n;case 2:return"'"+n.replace(/'/g,"''")+"'";case 3:return"|"+$(n,e.indent)+x(u(n,d));case 4:return">"+$(n,e.indent)+x(u(function(e,t){const n=/(\n+)([^\n]*)/g;let i,r,o=function(){let i=e.indexOf("\n");return i=-1!==i?i:e.length,n.lastIndex=i,w(e.slice(0,i),t)}(),s="\n"===e[0]||" "===e[0];for(;r=n.exec(e);){const e=r[1],n=r[2];i=" "===n[0],o+=e+(s||i||""===n?"":"\n")+w(n,t),s=i}return o}(n,p),d));case 5:return'"'+function(e){let t="",n=0;for(let i=0;i<e.length;n>=65536?i+=2:i++){n=v(e,i);const r=s[n];!r&&f(n)?(t+=e[i],n>=65536&&(t+=e[i+1])):t+=r||c(n)}return t}(n)+'"';default:throw new t("impossible error: invalid scalar style")}}()}function $(e,t){const n=y(e)?String(t):"",i="\n"===e[e.length-1];return n+(i&&("\n"===e[e.length-2]||"\n"===e)?"+":i?"":"-")+"\n"}function x(e){return"\n"===e[e.length-1]?e.slice(0,-1):e}function w(e,t){if(""===e||" "===e[0])return e;const n=/ [^ ]/g;let i,r,o=0,s=0,a=0,l="";for(;i=n.exec(e);)a=i.index,a-o>t&&(r=s>o?s:a,l+="\n"+e.slice(o,r),o=r+1),s=a;return l+="\n",e.length-o>t&&s>o?l+=e.slice(o,s)+"\n"+e.slice(s+1):l+=e.slice(o),l.slice(1)}function A(e,t,n,i){let r="";const o=e.tag;for(let o=0,s=n.length;o<s;o+=1){let s=n[o];e.replacer&&(s=e.replacer.call(n,String(o),s)),(C(e,t+1,s,!0,!0,!1,!0)||void 0===s&&C(e,t+1,null,!0,!0,!1,!0))&&(i&&""===r||(r+=p(e,t)),e.dump&&10===e.dump.charCodeAt(0)?r+="-":r+="- ",r+=e.dump)}e.tag=o,e.dump=r||"[]"}function k(e,n,o){const s=o?e.explicitTypes:e.implicitTypes;for(let a=0,l=s.length;a<l;a+=1){const l=s[a];if((l.instanceOf||l.predicate)&&(!l.instanceOf||"object"==typeof n&&n instanceof l.instanceOf)&&(!l.predicate||l.predicate(n))){if(o?l.multi&&l.representName?e.tag=l.representName(n):e.tag=l.tag:e.tag="?",l.represent){const o=e.styleMap[l.tag]||l.defaultStyle;let s;if("[object Function]"===i.call(l.represent))s=l.represent(n,o);else{if(!r.call(l.represent,o))throw new t("!<"+l.tag+'> tag resolver accepts not "'+o+'" style');s=l.represent[o](n,o)}e.dump=s}return!0}}return!1}function C(e,n,r,o,s,a,l){e.tag=null,e.dump=r,k(e,r,!1)||k(e,r,!0);const c=i.call(e.dump),d=o;o&&(o=e.flowLevel<0||e.flowLevel>n);const u="[object Object]"===c||"[object Array]"===c;let h,f;if(u&&(h=e.duplicates.indexOf(r),f=-1!==h),(null!==e.tag&&"?"!==e.tag||f||2!==e.indent&&n>0)&&(s=!1),f&&e.usedDuplicates[h])e.dump="*ref_"+h;else{if(u&&f&&!e.usedDuplicates[h]&&(e.usedDuplicates[h]=!0),"[object Object]"===c)o&&0!==Object.keys(e.dump).length?(!function(e,n,i,r){let o="";const s=e.tag,a=Object.keys(i);if(!0===e.sortKeys)a.sort();else if("function"==typeof e.sortKeys)a.sort(e.sortKeys);else if(e.sortKeys)throw new t("sortKeys must be a boolean or a function");for(let t=0,s=a.length;t<s;t+=1){let s="";r&&""===o||(s+=p(e,n));const l=a[t];let c=i[l];if(e.replacer&&(c=e.replacer.call(i,l,c)),!C(e,n+1,l,!0,!0,!0))continue;const d=null!==e.tag&&"?"!==e.tag||e.dump&&e.dump.length>1024;d&&(e.dump&&10===e.dump.charCodeAt(0)?s+="?":s+="? "),s+=e.dump,d&&(s+=p(e,n)),C(e,n+1,c,!0,d)&&(e.dump&&10===e.dump.charCodeAt(0)?s+=":":s+=": ",s+=e.dump,o+=s)}e.tag=s,e.dump=o||"{}"}(e,n,e.dump,s),f&&(e.dump="&ref_"+h+e.dump)):(!function(e,t,n){let i="";const r=e.tag,o=Object.keys(n);for(let r=0,s=o.length;r<s;r+=1){let s="";""!==i&&(s+=", "),e.condenseFlow&&(s+='"');const a=o[r];let l=n[a];e.replacer&&(l=e.replacer.call(n,a,l)),C(e,t,a,!1,!1)&&(e.dump.length>1024&&(s+="? "),s+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),C(e,t,l,!1,!1)&&(s+=e.dump,i+=s))}e.tag=r,e.dump="{"+i+"}"}(e,n,e.dump),f&&(e.dump="&ref_"+h+" "+e.dump));else if("[object Array]"===c)o&&0!==e.dump.length?(e.noArrayIndent&&!l&&n>0?A(e,n-1,e.dump,s):A(e,n,e.dump,s),f&&(e.dump="&ref_"+h+e.dump)):(!function(e,t,n){let i="";const r=e.tag;for(let r=0,o=n.length;r<o;r+=1){let o=n[r];e.replacer&&(o=e.replacer.call(n,String(r),o)),(C(e,t,o,!1,!1)||void 0===o&&C(e,t,null,!1,!1))&&(""!==i&&(i+=","+(e.condenseFlow?"":" ")),i+=e.dump)}e.tag=r,e.dump="["+i+"]"}(e,n,e.dump),f&&(e.dump="&ref_"+h+" "+e.dump));else{if("[object String]"!==c){if("[object Undefined]"===c)return!1;if(e.skipInvalid)return!1;throw new t("unacceptable kind of an object to dump "+c)}"?"!==e.tag&&_(e,e.dump,n,a,d)}if(null!==e.tag&&"?"!==e.tag){let t=encodeURI("!"===e.tag[0]?e.tag.slice(1):e.tag).replace(/!/g,"%21");t="!"===e.tag[0]?"!"+t:"tag:yaml.org,2002:"===t.slice(0,18)?"!!"+t.slice(18):"!<"+t+">",e.dump=t+" "+e.dump}}return!0}function S(e,t){const n=[],i=[];E(e,n,i);const r=i.length;for(let e=0;e<r;e+=1)t.duplicates.push(n[i[e]]);t.usedDuplicates=new Array(r)}function E(e,t,n){if(null!==e&&"object"==typeof e){const i=t.indexOf(e);if(-1!==i)-1===n.indexOf(i)&&n.push(i);else if(t.push(e),Array.isArray(e))for(let i=0,r=e.length;i<r;i+=1)E(e[i],t,n);else{const i=Object.keys(e);for(let r=0,o=i.length;r<o;r+=1)E(e[i[r]],t,n)}}}return Hn.dump=function(e,t){const n=new d(t=t||{});n.noRefs||S(e,n);let i=e;return n.replacer&&(i=n.replacer.call({"":i},"",i)),C(n,0,i,!0,!0)?n.dump+"\n":""},Hn}const Bn=wt(function(){if(Pn)return mn;Pn=1;const e=Fn(),t=Kn();function n(e,t){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+t+" instead, which is now safe by default.")}}return mn.Type=_n(),mn.Schema=$n(),mn.FAILSAFE_SCHEMA=kn(),mn.JSON_SCHEMA=Nn(),mn.CORE_SCHEMA=On(),mn.DEFAULT_SCHEMA=Rn(),mn.load=e.load,mn.loadAll=e.loadAll,mn.dump=t.dump,mn.YAMLException=bn(),mn.types={binary:Ln(),float:Tn(),map:An(),null:Cn(),pairs:Dn(),set:Un(),timestamp:In(),bool:Sn(),int:En(),merge:Mn(),omap:jn(),seq:wn(),str:xn()},mn.safeLoad=n("safeLoad","load"),mn.safeLoadAll=n("safeLoadAll","loadAll"),mn.safeDump=n("safeDump","dump"),mn}()),{Type:qn,Schema:Wn,FAILSAFE_SCHEMA:Yn,JSON_SCHEMA:Jn,CORE_SCHEMA:Vn,DEFAULT_SCHEMA:Gn,load:Zn,loadAll:Xn,dump:Qn,YAMLException:ei,types:ti,safeLoad:ni,safeLoadAll:ii,safeDump:ri}=Bn;class oi extends Error{}const si=e=>"object"==typeof e&&null!==e&&!Array.isArray(e),ai=e=>{if(null==e||"object"==typeof e)return;return String(e).trim()||void 0},li=(e,t=!1)=>{if(null==e||""===e||"boolean"==typeof e)return;const n=Number(e);return Number.isFinite(n)?t?Math.trunc(n):n:void 0},ci=e=>{if(null!=e&&""!==e){if("number"==typeof e)return[Math.trunc(e)];if("string"==typeof e)return e.trim()||void 0;if(Array.isArray(e)){const t=e.map(e=>{if("number"==typeof e)return Math.trunc(e);const t=String(e).trim();return/^\d+$/.test(t)?Number(t):t}).filter(e=>""!==e);return t.length?t:void 0}}},di=e=>Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e)),ui=e=>{const t=si(e)?e:{};return di({channel:li(t.channel,!0)??1,name:ai(t.name)??"",friendly_name:ai(t.friendly_name),type:ai(t.type),transition:li(t.transition),output_correction:ai(t.output_correction),channel_size:ai(t.channel_size),channel_setup:ci(t.channel_setup),byte_order:ai(t.byte_order),min_temp:ai(t.min_temp),max_temp:ai(t.max_temp)})},pi=e=>{const t=si(e)?e:{};return di({host:ai(t.host)??"",host_override:ai(t.host_override),port:li(t.port,!0),port_override:li(t.port_override,!0),max_fps:li(t.max_fps,!0),refresh_every:li(t.refresh_every),node_type:ai(t.node_type),universes:Array.isArray(t.universes)?t.universes.map((e,t)=>((e,t)=>{const n=si(e)?e:{};return di({id:li(n.id,!0)??t,send_partial_universe:(i=n.send_partial_universe,"boolean"==typeof i?i:"true"===i||"false"!==i&&void 0),output_correction:ai(n.output_correction),devices:Array.isArray(n.devices)?n.devices.map(ui):[]});var i})(e,t)):[]})},hi=e=>{const t=e.universes,n=si(t)?Object.entries(t).map(([e,t])=>({...si(t)?t:{},id:e})):Array.isArray(t)?t:[];return pi({...e,universes:n})},fi=e=>Array.isArray(e)?e.filter(si).filter(e=>!e.platform||"artnet_led"===e.platform):si(e)?void 0!==e.platform||void 0!==e.universes?fi([e]):Object.entries(e).filter(([e])=>"light"===e||e.startsWith("light ")).flatMap(([,e])=>fi(Array.isArray(e)?e:[e])):[],mi=e=>{let t;try{t=Zn((e=>e.replace(/!(include\w*|secret|env_var|input)\b[^\n]*/g,"null"))(e))}catch(e){throw new oi(e.message)}const n=fi(t);if(!n.length)throw new oi("no artnet_led configuration found");return{title:"",nodes:n.map(hi)}},gi=e=>{let t;try{t=JSON.parse(e)}catch(e){throw new oi(e.message)}return(e=>{if(!si(e)||!Array.isArray(e.nodes))throw new oi("expected an object with a 'nodes' list");return{title:ai(e.title)??"",nodes:e.nodes.map(pi)}})(t)},vi="0.2.0",yi=e=>{history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))};class bi extends ae{constructor(){super(...arguments),this.narrow=!1,this.embedded=!1,this._savedJson="",this._history=[],this._future=[],this._issues=new ft,this._saving=!1,this._menuOpen=!1,this._importOpen=!1,this._importText="",this._loadStarted=!1,this._onBeforeUnload=e=>{this._dirty&&e.preventDefault()},this._onKeyDown=e=>{if(!e.ctrlKey&&!e.metaKey||!this.isConnected||!this._config)return;if(this._importOpen||this._deploy||this._confirm)return;const t=e.key.toLowerCase();if("s"===t)return e.preventDefault(),void this._save();const n=e.composedPath()[0];n&&["INPUT","TEXTAREA","SELECT"].includes(n.tagName)||("z"!==t||e.shiftKey?("z"===t&&e.shiftKey||"y"===t)&&(e.preventDefault(),this._redo()):(e.preventDefault(),this._undo()))}}get _t(){return t=this.hass,e=(t?.locale?.language??t?.language??navigator.language??"en").toLowerCase().startsWith("de")?"de":"en",(t,n)=>{const i=Te[e][t]??Ee[t]??t;return n?i.replace(/\{(\w+)\}/g,(e,t)=>t in n?String(n[t]):e):i};var e,t}get _dirty(){return void 0!==this._config&&JSON.stringify(this._config)!==this._savedJson}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKeyDown),window.addEventListener("beforeunload",this._onBeforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("beforeunload",this._onBeforeUnload),window.clearTimeout(this._toastTimer)}willUpdate(e){e.has("_config")&&this._config&&(this._issues=new ft(pt(this._config)))}updated(e){e.has("hass")&&this.hass&&!this._loadStarted&&(this._loadStarted=!0,this._load())}_setConfig(e){this._config&&(this._history=[...this._history,JSON.stringify(this._config)].slice(-100)),this._future=[],this._config=e}_undo(){this._history.length&&this._config&&(this._future=[JSON.stringify(this._config),...this._future],this._config=JSON.parse(this._history[this._history.length-1]),this._history=this._history.slice(0,-1))}_redo(){this._future.length&&this._config&&(this._history=[...this._history,JSON.stringify(this._config)],this._config=JSON.parse(this._future[0]),this._future=this._future.slice(1))}_showToast(e,t){this._toast={type:e,text:t},window.clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast=void 0,4e3)}_confirmIf(e,t,n){e?this._confirm={...t,action:n}:n()}_hasContent(){return Boolean(this._config?.nodes.length)}async _load(){if(this.hass){this._loadError=void 0;try{const[t,n]=await Promise.all([(e=this.hass,e.callWS({type:`${fe}/get`})),me(this.hass)]);this._config=t??{title:"",nodes:[]},this._savedJson=JSON.stringify(this._config),this._history=[],this._future=[],this._status=n}catch(e){this._loadError=ge(e)}var e}}async _refreshStatus(){if(this.hass)try{this._status=await me(this.hass)}catch{}}async _save(){if(this.hass&&this._config&&!this._saving){this._saving=!0;try{const n=await(e=this.hass,t=this._config,e.callWS({type:`${fe}/save`,config:t}));JSON.stringify(n.config)!==JSON.stringify(this._config)&&(this._config=n.config),this._savedJson=JSON.stringify(this._config),this._showToast("success",this._t("saved"))}catch(e){this._showToast("error",`${this._t("saveError")}: ${ge(e)}`)}finally{this._saving=!1}var e,t}}async _openDeploy(){if(this.hass&&this._config){this._deploy={busy:!0};try{this._deploy={busy:!1,preview:await(e=this.hass,t=this._config,e.callWS({type:`${fe}/preview`,config:t}))}}catch(e){this._deploy={busy:!1,error:ge(e)}}var e,t}}async _runDeploy(){if(!this.hass||!this._config||!this._deploy)return;const e=this._config;this._deploy={...this._deploy,busy:!0,error:void 0};try{const t=await((e,t)=>e.callWS({type:`${fe}/deploy`,config:t}))(this.hass,e);"invalid"!==t.status&&(this._savedJson=JSON.stringify(e)),this._deploy={...this._deploy,busy:!1,result:t},this._refreshStatus()}catch(e){this._deploy={...this._deploy,busy:!1,error:ge(e)}}}_menuAction(e){this._menuOpen=!1,e()}_replaceConfig(e){this._confirmIf(this._hasContent(),{title:"confirmImportTitle",text:"confirmImportText"},()=>this._setConfig(e))}_importYaml(){try{const e=mi(this._importText);this._importOpen=!1,this._importText="",this._importError=void 0,this._replaceConfig(e)}catch(e){this._importError=this._t("importFailed",{error:e instanceof oi?e.message:ge(e)})}}async _importExisting(){var e;if(this.hass)try{const t=await(e=this.hass,e.callWS({type:`${fe}/import_existing`}));if(!t.nodes.length)return void this._showToast("info",this._t("importNothing"));this._replaceConfig(t)}catch(e){this._showToast("error",this._t("importFailed",{error:ge(e)}))}}async _importFile(e){const t=e.target,n=t.files?.[0];if(t.value="",n)try{const e=await n.text(),t=n.name.endsWith(".json")?gi(e):mi(e);this._replaceConfig(t)}catch(e){this._showToast("error",this._t("importFailed",{error:ge(e)}))}}_exportJson(){if(!this._config)return;const e=new Blob([JSON.stringify(this._config,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),n=document.createElement("a");n.href=t,n.download="artnet-led-uiconfig.json",n.click(),URL.revokeObjectURL(t)}_renderBanners(){const e=this._t,t=this._status,n=[],i=this.panel?.config?.version??t?.version;return i&&i!==vi&&n.push(xe("warning",e("versionMismatch",{frontend:vi,backend:i}))),t?(t.artnet_led_installed||n.push(xe("warning",e("artnetMissing"))),t.included||n.push(xe("warning",K`${e("includeMissing",{path:t.path})}
            <pre class="include">${t.include_key}: !include ${t.path}</pre>
            <button @click=${()=>yi("/config/repairs")}>${e("openRepairs")}</button>`)),t.restart_required&&n.push(xe("info",K`${e("restartPending")}
            <button class="inline" @click=${()=>yi("/config/repairs")}>${e("openRepairs")}</button>`)),n):n}_renderToolbar(){const e=this._t,t=this._issues.issues.length;return K`
      <div class="toolbar">
        <button class="icon" title="${e("undo")} (Ctrl+Z)" aria-label=${e("undo")} ?disabled=${!this._history.length} @click=${this._undo}>
          ${$e("mdi:undo")}
        </button>
        <button class="icon" title="${e("redo")} (Ctrl+Shift+Z)" aria-label=${e("redo")} ?disabled=${!this._future.length} @click=${this._redo}>
          ${$e("mdi:redo")}
        </button>
        <button @click=${()=>this._setConfig({...this._config,nodes:[...this._config.nodes,at()]})}>
          ${$e("mdi:plus")} ${e("addNode")}
        </button>
        <div class="menu-wrap">
          <button aria-haspopup="menu" aria-expanded=${this._menuOpen} @click=${()=>this._menuOpen=!this._menuOpen}>
            ${$e("mdi:dots-vertical")} ${e("more")}
          </button>
          ${this._menuOpen?K`
                <div class="menu-backdrop" @click=${()=>this._menuOpen=!1}></div>
                <div class="menu" role="menu">
                  <button role="menuitem" @click=${()=>this._menuAction(()=>this._importOpen=!0)}>${e("importYaml")}</button>
                  <button role="menuitem" @click=${()=>this._menuAction(()=>{this._importExisting()})}>${e("importExisting")}</button>
                  <button role="menuitem" @click=${()=>this._menuAction(()=>this._fileInput?.click())}>${e("importJson")}</button>
                  <button role="menuitem" @click=${()=>this._menuAction(()=>this._exportJson())}>${e("exportJson")}</button>
                  <hr />
                  <button role="menuitem" @click=${()=>this._menuAction(()=>this._confirmIf(this._hasContent(),{title:"confirmExampleTitle",text:"confirmExampleText"},()=>this._setConfig({title:"",nodes:[{host:"192.168.0.10",max_fps:25,refresh_every:0,node_type:"artnet-direct",universes:[{id:0,send_partial_universe:!0,output_correction:"quadratic",devices:[{channel:1,name:"my_dimmer",type:"dimmer",transition:1,channel_size:"16bit"},{channel:3,name:"my_rgb_lamp",type:"rgb",transition:1,channel_size:"16bit",output_correction:"quadratic",channel_setup:"rbgw"},{channel:125,name:"my_color_temp_lamp",type:"color_temp",min_temp:"2500K",max_temp:"6500K",channel_setup:"ch"},{channel:41,name:"my_rgbww_lamp",type:"rgbww",transition:10},{channel:50,name:"sp4led_1_dimmer",type:"fixed",channel_setup:[255]}]}]}]})))}>${e("loadExample")}</button>
                  <button role="menuitem" class="danger" ?disabled=${!this._hasContent()} @click=${()=>this._menuAction(()=>this._confirmIf(!0,{title:"confirmClearTitle",text:"confirmClearText"},()=>this._setConfig({...this._config,nodes:[]})))}>${e("clearAll")}</button>
                  <button role="menuitem" @click=${()=>this._menuAction(()=>this._confirmIf(this._dirty,{title:"confirmReloadTitle",text:"confirmReloadText"},()=>{this._load()}))}>${e("reload")}</button>
                </div>
              `:q}
        </div>
        <input type="file" accept=".json,.yaml,.yml,application/json" hidden @change=${this._importFile} />
        <span class="spacer"></span>
        ${t?K`<span class="state error">${e("errorsCount",{count:t})}</span>`:q}
        ${this._dirty?K`<span class="state">${e("unsaved")}</span>`:q}
        <button ?disabled=${!this._dirty||this._saving} @click=${this._save}>
          ${this._saving?e("saving"):e("save")}
        </button>
        <button class="primary" title=${e(t?"deployBlocked":"deployHint")} ?disabled=${t>0} @click=${this._openDeploy}>
          ${e("deploy")}
        </button>
      </div>
      ${this._toast?K`<div class="toast">${xe(this._toast.type,this._toast.text)}</div>`:q}
    `}_renderIssues(e){return K`<ul class="issues">
      ${e.map(e=>K`<li><code>${e.path.join(".")}</code>: ${Oe(this._t,e)}</li>`)}
    </ul>`}_renderDiff(e){return K`<pre class="diff">${e.split("\n").map(e=>{const t=e.startsWith("+++")||e.startsWith("---")?"meta":e.startsWith("+")?"add":e.startsWith("-")?"del":e.startsWith("@@")?"hunk":"";return K`<span class=${t}>${e}\n</span>`})}</pre>`}_renderDeployDialog(){const e=this._deploy;if(!e)return q;const t=this._t,{preview:n,result:i}=e;let r=K`<p>${t("loading")}</p>`,o=!1;return i?r=K`
        ${"invalid"===i.status?K`${xe("error",t("deployInvalid"))}${this._renderIssues(i.errors??[])}`:xe("success",t("written"===i.status?"deployWritten":"deployUnchanged",{path:i.path}))}
        ${i.check_error?xe("error",K`${t("deployCheckError")}<pre>${i.check_error}</pre>`):q}
        ${"invalid"!==i.status&&!1===i.included?xe("warning",t("deployNotIncluded")):q}
        ${i.restart_required?xe("info",t("deployRestart")):q}
      `:n&&(o=!n.errors.length,r=K`
        <p class="muted">${t("deployTarget",{path:n.path})}</p>
        ${n.errors.length?K`${xe("error",t("deployInvalid"))}${this._renderIssues(n.errors)}`:n.changed?this._renderDiff(n.diff):xe("info",t("deployNoChanges"))}
      `),K`
      <artnetui-dialog
        open
        wide
        .heading=${t("deployTitle")}
        .closeLabel=${t("close")}
        @closed=${()=>!e.busy&&(this._deploy=void 0)}
      >
        ${e.error?xe("error",t("deployFailed",{error:e.error})):q}
        ${r}
        ${i?.restart_required||i&&!1===i.included?K`<button slot="actions" @click=${()=>{this._deploy=void 0,yi("/config/repairs")}}>${t("openRepairs")}</button>`:q}
        <button slot="actions" ?disabled=${e.busy} @click=${()=>this._deploy=void 0}>
          ${t(i?"close":"cancel")}
        </button>
        ${i?q:K`<button slot="actions" class="primary" ?disabled=${!o||e.busy} @click=${this._runDeploy}>
              ${e.busy&&n?t("deploying"):t("deployAction")}
            </button>`}
      </artnetui-dialog>
    `}_renderImportDialog(){if(!this._importOpen)return q;const e=this._t;return K`
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
        ${this._importError?xe("error",this._importError):q}
        <button slot="actions" @click=${()=>this._importOpen=!1}>${e("cancel")}</button>
        <button slot="actions" class="primary" ?disabled=${!this._importText.trim()} @click=${this._importYaml}>
          ${e("importAction")}
        </button>
      </artnetui-dialog>
    `}_renderConfirmDialog(){const e=this._confirm;if(!e)return q;const t=this._t;return K`
      <artnetui-dialog open .heading=${t(e.title)} .closeLabel=${t("close")} @closed=${()=>this._confirm=void 0}>
        <p>${t(e.text)}</p>
        <button slot="actions" @click=${()=>this._confirm=void 0}>${t("cancel")}</button>
        <button slot="actions" class="primary" @click=${()=>{this._confirm=void 0,e.action()}}>${t("confirm")}</button>
      </artnetui-dialog>
    `}_renderHeader(){return this.embedded?q:K`
      <div class="header">
        ${ye("ha-menu-button")?K`<ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>`:q}
        <div class="title">${this._t("title")}</div>
        <span class="version">v${vi}</span>
      </div>
    `}render(){const e=this._t;let t;return t=this._loadError?K`${xe("error",`${e("loadError")}: ${this._loadError}`)}
        <div class="row"><button @click=${this._load}>${e("reload")}</button></div>`:this._config?K`
        ${this._renderBanners()} ${this._renderToolbar()}
        <artnetui-editor
          .config=${this._config}
          .issues=${this._issues}
          .t=${e}
          @config-changed=${e=>this._setConfig(e.detail.config)}
        ></artnetui-editor>
      `:K`<p class="muted">${e("loading")}</p>`,K`
      ${this._renderHeader()}
      <div class="content">${t}</div>
      ${this._renderDeployDialog()} ${this._renderImportDialog()} ${this._renderConfirmDialog()}
    `}static{this.styles=[be,s`
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
    `]}}e([ue({attribute:!1})],bi.prototype,"hass",void 0),e([ue({type:Boolean,reflect:!0})],bi.prototype,"narrow",void 0),e([ue({attribute:!1})],bi.prototype,"panel",void 0),e([ue({type:Boolean,reflect:!0})],bi.prototype,"embedded",void 0),e([pe()],bi.prototype,"_config",void 0),e([pe()],bi.prototype,"_savedJson",void 0),e([pe()],bi.prototype,"_history",void 0),e([pe()],bi.prototype,"_future",void 0),e([pe()],bi.prototype,"_issues",void 0),e([pe()],bi.prototype,"_status",void 0),e([pe()],bi.prototype,"_loadError",void 0),e([pe()],bi.prototype,"_saving",void 0),e([pe()],bi.prototype,"_toast",void 0),e([pe()],bi.prototype,"_menuOpen",void 0),e([pe()],bi.prototype,"_confirm",void 0),e([pe()],bi.prototype,"_importOpen",void 0),e([pe()],bi.prototype,"_importText",void 0),e([pe()],bi.prototype,"_importError",void 0),e([pe()],bi.prototype,"_deploy",void 0),e([he("input[type=file]")],bi.prototype,"_fileInput",void 0),ve("ha-artnet-led-uiconfig-panel",bi);const _i="ha-artnet-led-uiconfig";class $i extends ae{setConfig(e){}getCardSize(){return 12}getGridOptions(){return{columns:"full",min_columns:6}}static getStubConfig(){return{}}render(){return K`<ha-card>
      <ha-artnet-led-uiconfig-panel embedded .hass=${this.hass}></ha-artnet-led-uiconfig-panel>
    </ha-card>`}static{this.styles=s`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
  `}}e([ue({attribute:!1})],$i.prototype,"hass",void 0),ve(_i,$i);const xi=window;xi.customCards=xi.customCards??[],xi.customCards.some(e=>e.type===_i)||xi.customCards.push({type:_i,name:"Art-Net LED UI Config",description:"Visual editor for ha-artnet-led lights (admin only)."});
//# sourceMappingURL=ha-artnet-led-uiconfig.js.map
