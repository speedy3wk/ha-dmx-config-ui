function e(e,t,i,r){var s,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(i,e,r)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:u,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",v=m.reactiveElementPolyfillSupport,_=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!d(e,t),y={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const n=r?.call(this);s?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...u(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=r;const n=s.fromAttribute(t,e.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const n=this.constructor;if(!1===r&&(s=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??b)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,v?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=e=>e,S=w.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+E,N=`<${D}>`,O=document,M=()=>O.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,P="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,L=/>/g,z=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,H=/"/g,B=/^(?:script|style|textarea|title)$/i,K=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),q=new WeakMap,J=O.createTreeWalker(O,129);function G(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const X=(e,t)=>{const i=e.length-1,r=[];let s,n=2===t?"<svg>":3===t?"<math>":"",o=F;for(let t=0;t<i;t++){const i=e[t];let a,d,l=-1,c=0;for(;c<i.length&&(o.lastIndex=c,d=o.exec(i),null!==d);)c=o.lastIndex,o===F?"!--"===d[1]?o=R:void 0!==d[1]?o=L:void 0!==d[2]?(B.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=z):void 0!==d[3]&&(o=z):o===z?">"===d[0]?(o=s??F,l=-1):void 0===d[1]?l=-2:(l=o.lastIndex-d[2].length,a=d[1],o=void 0===d[3]?z:'"'===d[3]?H:I):o===H||o===I?o=z:o===R||o===L?o=F:(o=z,s=void 0);const u=o===z&&e[t+1].startsWith("/>")?" ":"";n+=o===F?i+N:l>=0?(r.push(a),i.slice(0,l)+C+i.slice(l)+E+u):i+E+(-2===l?t:u)}return[G(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class V{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,n=0;const o=e.length-1,a=this.parts,[d,l]=X(e,t);if(this.el=V.createElement(d,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=J.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(C)){const t=l[n++],i=r.getAttribute(e).split(E),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(E)&&(a.push({type:6,index:s}),r.removeAttribute(e));if(B.test(r.tagName)){const e=r.textContent.split(E),t=e.length-1;if(t>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],M()),J.nextNode(),a.push({type:2,index:++s});r.append(e[t],M())}}}else if(8===r.nodeType)if(r.data===D)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(E,e+1));)a.push({type:7,index:s}),e+=E.length-1}s++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,r){if(t===W)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const n=U(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=Z(e,s._$AS(e,t.values),s,r)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??O).importNode(t,!0);J.currentNode=r;let s=J.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new Q(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new se(s,this,e)),this._$AV.push(t),a=i[++o]}n!==a?.index&&(s=J.nextNode(),n++)}return J.currentNode=O,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),U(e)?e===j||null==e||""===e?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==j&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=V.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Y(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new V(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}_$AI(e,t=this,i,r){const s=this.strings;let n=!1;if(void 0===s)e=Z(this,e,t,0),n=!U(e)||e!==this._$AH&&e!==W,n&&(this._$AH=e);else{const r=e;let o,a;for(e=s[0],o=0;o<s.length-1;o++)a=Z(this,r[i+o],t,o),a===W&&(a=this._$AH[o]),n||=!U(a)||a!==this._$AH[o],a===j?e=j:e!==j&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!r&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==j)}}class re extends ee{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??j)===W)return;const i=this._$AH,r=e===j&&i!==j||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==j&&(i===j||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=w.litHtmlPolyfillSupport;ne?.(V,Q),(w.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;class ae extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new Q(t.insertBefore(M(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ae._$litElement$=!0,ae.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ae});const de=oe.litElementPolyfillSupport;de?.({LitElement:ae}),(oe.litElementVersions??=[]).push("4.2.2");const le={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:b},ce=(e=le,t,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function ue(e){return(t,i)=>"object"==typeof i?ce(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function he(e){return ue({...e,state:!0,attribute:!1})}function pe(e,t){return(t,i,r)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}const me="dmx_config_ui",fe=(e,t)=>e.callWS({type:`${me}/preview`,config:t}),ge=e=>e.callWS({type:`${me}/status`}),ve=e=>String(e&&"object"==typeof e&&"message"in e?e.message:e),_e=(e,t)=>{customElements.get(e)||customElements.define(e,t)},xe=e=>void 0!==customElements.get(e),be=o`
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
`,ye={"mdi:arrow-up":"↑","mdi:arrow-down":"↓","mdi:delete-outline":"✕","mdi:content-copy":"⧉","mdi:pencil":"✎","mdi:plus":"+","mdi:undo":"↶","mdi:redo":"↷","mdi:dots-vertical":"⋮","mdi:close":"✕","mdi:drag":"⋮⋮","mdi:magnify":"⌕","mdi:download":"↓","mdi:upload":"↑","mdi:bookshelf":"▤","mdi:swap-horizontal":"⇄","mdi:spotlight-beam":"◮","mdi:lightbulb":"●"},$e=e=>xe("ha-icon")?K`<ha-icon .icon=${e}></ha-icon>`:K`<span class="glyph" aria-hidden="true">${ye[e]??"•"}</span>`,we=(e,t)=>xe("ha-alert")?K`<ha-alert alert-type=${e}>${t}</ha-alert>`:K`<div class="alert ${e}" role="alert">${t}</div>`,ke=(e,t)=>K`
  <label class="field ${e.errors?.length?"invalid":""}">
    <span class="label">${e.label}${e.required?" *":""}</span>
    ${t}
    ${e.errors?.length?e.errors.map(e=>K`<span class="error">${e}</span>`):e.warnings?.length?e.warnings.map(e=>K`<span class="warn">${e}</span>`):e.helper?K`<span class="helper">${e.helper}</span>`:j}
  </label>
`,Se=e=>ke(e,K`<input
      type="text"
      .value=${e.value??""}
      placeholder=${e.placeholder??""}
      aria-invalid=${e.errors?.length?"true":"false"}
      @change=${t=>{const i=t.target.value.trim();e.onChange(i||void 0)}}
    />`),Ae=e=>ke(e,K`<input
      type="number"
      inputmode="decimal"
      .value=${void 0===e.value||null===e.value?"":String(e.value)}
      min=${e.min??""}
      max=${e.max??""}
      step=${e.step??1}
      placeholder=${e.placeholder??""}
      aria-invalid=${e.errors?.length?"true":"false"}
      @change=${t=>{const i=t.target.value,r=""===i?void 0:Number(i);e.onChange(void 0===r||Number.isNaN(r)?void 0:r)}}
    />`),Ce=e=>ke(e,K`<select
      aria-invalid=${e.errors?.length?"true":"false"}
      @change=${t=>e.onChange(t.target.value||void 0)}
    >
      ${void 0!==e.emptyLabel?K`<option value="" ?selected=${!e.value}>${e.emptyLabel}</option>`:j}
      ${e.options.map(t=>{const i="string"==typeof t?t:t.value,r="string"==typeof t?t:t.label;return K`<option value=${i} ?selected=${e.value===i}>${r}</option>`})}
      ${e.value&&!e.options.some(t=>("string"==typeof t?t:t.value)===e.value)?K`<option value=${e.value} selected>${e.value}</option>`:j}
    </select>`),Ee=e=>K`
  <label class="check">
    <input
      type="checkbox"
      .checked=${Boolean(e.value)}
      @change=${t=>e.onChange(t.target.checked)}
    />
    <span>${e.label}</span>
  </label>
`;class De extends ae{constructor(){super(...arguments),this.open=!1,this.heading="",this.subtitle="",this.closeLabel="Close",this.wide=!1}updated(e){e.has("open")&&this._dialog&&(this.open&&!this._dialog.open?this._dialog.showModal():!this.open&&this._dialog.open&&this._dialog.close())}_dismiss(){this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}_onCancel(e){e.preventDefault(),this._dismiss()}_onClick(e){e.target===this._dialog&&this._dismiss()}render(){return K`
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
              ${this.subtitle?K`<p class="muted">${this.subtitle}</p>`:j}
            </div>
            <button class="icon" title=${this.closeLabel} aria-label=${this.closeLabel} @click=${this._dismiss}>
              ${$e("mdi:close")}
            </button>
          </header>
          <div class="content"><slot></slot></div>
          <footer><slot name="actions"></slot></footer>
        </div>
      </dialog>
    `}static{this.styles=[be,o`
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
    `]}}e([ue({type:Boolean,reflect:!0})],De.prototype,"open",void 0),e([ue()],De.prototype,"heading",void 0),e([ue()],De.prototype,"subtitle",void 0),e([ue()],De.prototype,"closeLabel",void 0),e([ue({type:Boolean})],De.prototype,"wide",void 0),e([pe("dialog")],De.prototype,"_dialog",void 0),_e("artnetui-dialog",De);const Ne={title:"DMX Config UI",loading:"Loading…",loadError:"Failed to load configuration",save:"Save",saving:"Saving…",saved:"Saved",saveError:"Failed to save",deploy:"Deploy",deployHint:"Write the YAML file used by ha-artnet-led",deployBlocked:"Fix the validation errors before deploying",undo:"Undo",redo:"Redo",more:"More",importExisting:"Import from configuration.yaml",importJson:"Import JSON file…",exportJson:"Export JSON",loadExample:"Load example",clearAll:"Clear all",reload:"Reload from server",unsaved:"Unsaved changes",errorsCount:"{count} validation error(s)",includeMissing:"{path} is not yet included in your configuration.yaml. Add this line or use the repair:",openRepairs:"Open repairs",restartPending:"A Home Assistant restart is required to apply the deployed configuration.",versionMismatch:"The editor ({frontend}) and the integration ({backend}) versions differ. Reload the page / clear the browser cache.",confirm:"Confirm",cancel:"Cancel",close:"Close",confirmExampleTitle:"Load example?",confirmExampleText:"The current configuration will be replaced by an example. You can undo this.",confirmClearTitle:"Clear everything?",confirmClearText:"All nodes, universes and lights will be removed. You can undo this.",confirmReloadTitle:"Discard changes?",confirmReloadText:"You have unsaved changes. Reloading discards them.",confirmImportTitle:"Replace configuration?",confirmImportText:"The imported configuration replaces the current one. You can undo this.",importFailed:"Import failed: {error}",deployTitle:"Deploy configuration",deployTarget:"Target file: {path}",deployNoChanges:"The file is already up to date.",deployInvalid:"The configuration has errors and cannot be deployed:",deployAction:"Write file",deploying:"Writing…",deployFailed:"Deploy failed: {error}",deployWritten:"{path} has been written.",deployUnchanged:"{path} is already up to date.",deployRestart:"Restart Home Assistant to apply the changes – a repair with a restart button has been created.",deployCheckError:"Home Assistant reports a configuration problem:",deployNotIncluded:"The file is not included yet, see the repair in Settings → Repairs.",noNodes:"No nodes yet. Use “Add node”, import an existing configuration or load the example.",node:"Node",host:"Host / IP",hostOverride:"Host override",port:"Port",portOverride:"Port override",nodeType:"Node type",maxFps:"Max FPS",refresh:"Refresh every (s)",advanced:"Advanced",universes:"Universes",universe:"Universe",universeId:"Universe ID",outputCorrection:"Output correction",sendPartial:"Send partial universe",addUniverse:"Add universe",addLight:"Add light",noUniverses:"No universes yet.",noLights:"No lights in this universe.",remove:"Remove",duplicate:"Duplicate",edit:"Edit",moveUp:"Move up",moveDown:"Move down",channelMap:"DMX channel map",channelsUsed:"{used} / 512 channels used",overlap:"Overlap",free:"free",default:"Default",editLight:"Edit light",newLight:"New light",name:"Name",nameHelper:"Entity: light.{slug}",friendlyName:"Friendly name",channel:"Start channel",channelHelper:"Occupies {start}–{end} ({width} channel(s))",type:"Type",transition:"Transition (s)",channelSize:"Channel size",byteOrder:"Byte order",minTemp:"Min temperature",maxTemp:"Max temperature",targetUniverse:"Universe",nextFree:"Next free channel",apply:"Apply",channelSetup:"Channel setup",channelSetupHint:"Order of the DMX channels of this light. Click a block to append it, drag or use the arrows to reorder.",channelSetupDefault:"Empty = default ({value})",palette:"Blocks",staticValue:"Static value (0–255)",staticToken:"Static value {value}",add:"Add",resetDefault:"Reset to default",noChannels:"No channels – the default is used.",ch_d:"Dimmer",ch_c:"Cold white (scaled)",ch_C:"Cold white",ch_h:"Warm white (scaled)",ch_H:"Warm white",ch_t:"Temperature (0 warm → 255 cold)",ch_T:"Temperature (255 warm → 0 cold)",ch_r:"Red (scaled)",ch_R:"Red",ch_g:"Green (scaled)",ch_G:"Green",ch_b:"Blue (scaled)",ch_B:"Blue",ch_w:"White (scaled)",ch_W:"White",ch_u:"Hue",ch_U:"Saturation",ch_x:"X (CIE xy)",ch_y:"Y (CIE xy)",dmxMissing:"The DMX integration does not seem to be installed. You can prepare the configuration now; it is used as soon as DMX is installed.",dmxForeignBlock:"configuration.yaml already contains a dmx: block. The repair replaces it with the include (a backup is created).",dmxFixtureErrors:"Some fixture files could not be read:",importNothingDmx:"No dmx configuration found in configuration.yaml.",warningsCount:"{count} warning(s)",deployWarnings:"Warnings (deploy is still possible):",deployFixturesInstalled:"Copied fixtures to the fixtures folder: {files}",dmxGeneral:"General",dmxLibrary:"Fixture library",dmxFolder:"Fixtures folder",dmxFolderHelper:"Relative to the config folder · {count} fixture(s) available",dmxArtnet:"Art-Net",dmxSacn:"sACN (E1.31)",dmxUniverseCount:"{count} universe(s)",dmxProtocolSettings:"Protocol settings",dmxRateLimit:"Rate limit (s)",dmxSourceName:"Source name",dmxPriority:"Priority",dmxInterfaceIp:"Interface IP",dmxSyncAddress:"Sync address",dmxTtl:"Multicast TTL",dmxPreviewData:"Send preview data",dmxAddArtnetUniverse:"Add Art-Net universe",dmxAddSacnUniverse:"Add sACN universe",dmxNet:"Net",dmxSubnet:"Subnet",dmxCompatibility:"Compatibility (unicast targets)",dmxManualNodes:"Manual nodes (for nodes without ArtPoll discovery)",dmxUnicast:"Unicast addresses (instead of multicast)",dmxAddHost:"Add host",dmxNoDevices:"No fixtures in this universe yet.",dmxAddDevice:"Add fixture",dmxNewDevice:"New fixture",dmxEditDevice:"Edit fixture",dmxFixture:"Fixture",dmxChooseFixture:"choose fixture",dmxBundled:"bundled",dmxBundledHint:"Bundled fixture – it is copied into the fixtures folder on deploy.",dmxMode:"Mode",dmxStartAddress:"Start address",dmxFootprint:"Uses channels {start}–{end} ({width} ch)",dmxPrefix:"Entity ID prefix",dmxPrefixHelper:"Optional · entities like number.{prefix}_<channel>_…",dmxCurve:"Curve",dmxMin:"Min (0–1)",dmxMax:"Max (0–1)",dmxChannels:"Channels of this mode ({count})",dmxEntityPreview:"Creates {light} light, {number} number and {select} select entities",dmxAddress:"DMX",dmxChannel:"Channel",dmxKind:"Entity",kind_number:"number",kind_select:"select",kind_fine:"fine",kind_switching:"switching",kind_empty:"unused",kind_unknown:"unknown",dmxLibrarySubtitle:"Fixtures in the Open Fixture Library format, stored in /config/{folder}",dmxFixtureAdded:"{name} was saved as {file}.",dmxOflError:"Open Fixture Library: {error}",dmxUploadError:"Upload failed: {error}",dmxInstalled:"installed",dmxFolderMissing:"The folder /config/{folder} does not exist yet. It is created on the first download/deploy.",dmxOflTitle:"Add fixtures",dmxOflHint:"Search the Open Fixture Library or upload an OFL JSON file.",dmxOflPlaceholder:"e.g. Hydrabeam, Stairville, ADJ …",dmxSearch:"Search",dmxUpload:"Upload JSON…",dmxDownload:"Download",dmxOflNoResults:"No fixtures found.",dmxAvailable:"Available fixtures ({count})",dmxFilter:"Filter…",dmxBundledExplain:'"bundled" fixtures ship with this integration (generic faders) and are copied into the folder when used.',err_required:"Required",err_range:"Must be between {low} and {high}",err_choice:"Must be one of: {choices}",err_temp:"Must look like 2700K",err_setup_char:"'{token}' is not allowed for type {type}",err_setup_value:"Static values must be 0–255",err_overflow:"Ends at channel {end} (> 512)",err_overlap:"Channels {start}–{end} overlap with '{other}' ({otherStart}–{otherEnd})",err_duplicate:"Duplicate",err_folder:"Must be a relative folder inside the config folder",err_prefix:"Use lowercase letters, digits and _",err_min_max:"Min must be below max",err_length:"Max. 63 characters",err_fixture_unknown:"Fixture '{fixture}' is not in the fixtures folder",err_mode_unknown:"Must be one of: {choices}",err_width_estimated:"The channel count of this mode could only be estimated"},Oe={en:Ne,de:{title:"DMX Config UI",loading:"Lade…",loadError:"Konfiguration konnte nicht geladen werden",save:"Speichern",saving:"Speichere…",saved:"Gespeichert",saveError:"Speichern fehlgeschlagen",deploy:"Deploy",deployHint:"YAML-Datei für ha-artnet-led schreiben",deployBlocked:"Behebe zuerst die Validierungsfehler",undo:"Rückgängig",redo:"Wiederholen",more:"Mehr",importExisting:"Aus configuration.yaml importieren",importJson:"JSON-Datei importieren…",exportJson:"Als JSON exportieren",loadExample:"Beispiel laden",clearAll:"Alles leeren",reload:"Vom Server neu laden",unsaved:"Ungespeicherte Änderungen",errorsCount:"{count} Validierungsfehler",includeMissing:"{path} ist noch nicht in deiner configuration.yaml eingebunden. Füge diese Zeile hinzu oder nutze die Reparatur:",openRepairs:"Reparaturen öffnen",restartPending:"Ein Neustart von Home Assistant ist nötig, um die Konfiguration zu übernehmen.",versionMismatch:"Editor ({frontend}) und Integration ({backend}) haben unterschiedliche Versionen. Seite neu laden / Browser-Cache leeren.",confirm:"Bestätigen",cancel:"Abbrechen",close:"Schließen",confirmExampleTitle:"Beispiel laden?",confirmExampleText:"Die aktuelle Konfiguration wird durch ein Beispiel ersetzt. Das lässt sich rückgängig machen.",confirmClearTitle:"Alles leeren?",confirmClearText:"Alle Nodes, Universes und Lampen werden entfernt. Das lässt sich rückgängig machen.",confirmReloadTitle:"Änderungen verwerfen?",confirmReloadText:"Es gibt ungespeicherte Änderungen. Neu laden verwirft sie.",confirmImportTitle:"Konfiguration ersetzen?",confirmImportText:"Die importierte Konfiguration ersetzt die aktuelle. Das lässt sich rückgängig machen.",importFailed:"Import fehlgeschlagen: {error}",deployTitle:"Konfiguration deployen",deployTarget:"Zieldatei: {path}",deployNoChanges:"Die Datei ist bereits aktuell.",deployInvalid:"Die Konfiguration enthält Fehler und kann nicht geschrieben werden:",deployAction:"Datei schreiben",deploying:"Schreibe…",deployFailed:"Deploy fehlgeschlagen: {error}",deployWritten:"{path} wurde geschrieben.",deployUnchanged:"{path} ist bereits aktuell.",deployRestart:"Starte Home Assistant neu, um die Änderungen zu übernehmen – eine Reparatur mit Neustart-Button wurde angelegt.",deployCheckError:"Home Assistant meldet ein Konfigurationsproblem:",deployNotIncluded:"Die Datei ist noch nicht eingebunden, siehe Reparatur unter Einstellungen → Reparaturen.",noNodes:"Noch keine Nodes. Nutze „Node hinzufügen“, importiere eine bestehende Konfiguration oder lade das Beispiel.",node:"Node",host:"Host / IP",hostOverride:"Host-Override",port:"Port",portOverride:"Port-Override",nodeType:"Node-Typ",maxFps:"Max FPS",refresh:"Refresh alle (s)",advanced:"Erweitert",universes:"Universes",universe:"Universe",universeId:"Universe-ID",outputCorrection:"Output-Korrektur",sendPartial:"Teil-Universe senden",addUniverse:"Universe hinzufügen",addLight:"Lampe hinzufügen",noUniverses:"Noch keine Universes.",noLights:"Keine Lampen in diesem Universe.",remove:"Entfernen",duplicate:"Duplizieren",edit:"Bearbeiten",moveUp:"Nach oben",moveDown:"Nach unten",channelMap:"DMX-Kanalbelegung",channelsUsed:"{used} / 512 Kanäle belegt",overlap:"Überlappung",free:"frei",default:"Standard",editLight:"Lampe bearbeiten",newLight:"Neue Lampe",name:"Name",nameHelper:"Entität: light.{slug}",friendlyName:"Anzeigename",channel:"Startkanal",channelHelper:"Belegt {start}–{end} ({width} Kanal/Kanäle)",type:"Typ",transition:"Übergang (s)",channelSize:"Kanalgröße",byteOrder:"Byte-Reihenfolge",minTemp:"Min. Temperatur",maxTemp:"Max. Temperatur",targetUniverse:"Universe",nextFree:"Nächster freier Kanal",apply:"Übernehmen",channelSetup:"Kanal-Setup",channelSetupHint:"Reihenfolge der DMX-Kanäle dieser Lampe. Baustein anklicken zum Anhängen, per Drag & Drop oder Pfeilen sortieren.",channelSetupDefault:"Leer = Standard ({value})",palette:"Bausteine",staticValue:"Statischer Wert (0–255)",staticToken:"Statischer Wert {value}",add:"Hinzufügen",resetDefault:"Auf Standard zurücksetzen",noChannels:"Keine Kanäle – der Standard wird verwendet.",ch_d:"Dimmer",ch_c:"Kaltweiß (skaliert)",ch_C:"Kaltweiß",ch_h:"Warmweiß (skaliert)",ch_H:"Warmweiß",ch_t:"Temperatur (0 warm → 255 kalt)",ch_T:"Temperatur (255 warm → 0 kalt)",ch_r:"Rot (skaliert)",ch_R:"Rot",ch_g:"Grün (skaliert)",ch_G:"Grün",ch_b:"Blau (skaliert)",ch_B:"Blau",ch_w:"Weiß (skaliert)",ch_W:"Weiß",ch_u:"Farbton",ch_U:"Sättigung",ch_x:"X (CIE xy)",ch_y:"Y (CIE xy)",dmxMissing:"Die DMX-Integration scheint nicht installiert zu sein. Du kannst die Konfiguration schon vorbereiten; sie wird genutzt, sobald DMX installiert ist.",dmxForeignBlock:"configuration.yaml enthält bereits einen dmx:-Block. Die Reparatur ersetzt ihn durch das Include (ein Backup wird angelegt).",dmxFixtureErrors:"Einige Fixture-Dateien konnten nicht gelesen werden:",importNothingDmx:"Keine dmx-Konfiguration in der configuration.yaml gefunden.",warningsCount:"{count} Warnung(en)",deployWarnings:"Warnungen (Deploy ist trotzdem möglich):",deployFixturesInstalled:"In den Fixtures-Ordner kopiert: {files}",dmxGeneral:"Allgemein",dmxLibrary:"Fixture-Bibliothek",dmxFolder:"Fixtures-Ordner",dmxFolderHelper:"Relativ zum Config-Ordner · {count} Fixture(s) verfügbar",dmxArtnet:"Art-Net",dmxSacn:"sACN (E1.31)",dmxUniverseCount:"{count} Universe(s)",dmxProtocolSettings:"Protokoll-Einstellungen",dmxRateLimit:"Rate-Limit (s)",dmxSourceName:"Quellname",dmxPriority:"Priorität",dmxInterfaceIp:"Interface-IP",dmxSyncAddress:"Sync-Adresse",dmxTtl:"Multicast-TTL",dmxPreviewData:"Preview-Daten senden",dmxAddArtnetUniverse:"Art-Net-Universe hinzufügen",dmxAddSacnUniverse:"sACN-Universe hinzufügen",dmxNet:"Net",dmxSubnet:"Subnet",dmxCompatibility:"Kompatibilität (Unicast-Ziele)",dmxManualNodes:"Manuelle Nodes (für Nodes ohne ArtPoll-Erkennung)",dmxUnicast:"Unicast-Adressen (statt Multicast)",dmxAddHost:"Host hinzufügen",dmxNoDevices:"Noch keine Fixtures in diesem Universe.",dmxAddDevice:"Fixture hinzufügen",dmxNewDevice:"Neues Fixture",dmxEditDevice:"Fixture bearbeiten",dmxFixture:"Fixture",dmxChooseFixture:"Fixture wählen",dmxBundled:"mitgeliefert",dmxBundledHint:"Mitgeliefertes Fixture – es wird beim Deploy in den Fixtures-Ordner kopiert.",dmxMode:"Modus",dmxStartAddress:"Startadresse",dmxFootprint:"Belegt Kanäle {start}–{end} ({width} Kanäle)",dmxPrefix:"Entity-ID-Präfix",dmxPrefixHelper:"Optional · Entitäten wie number.{prefix}_<kanal>_…",dmxCurve:"Kurve",dmxMin:"Min (0–1)",dmxMax:"Max (0–1)",dmxChannels:"Kanäle dieses Modus ({count})",dmxEntityPreview:"Erzeugt {light} Light-, {number} Number- und {select} Select-Entitäten",dmxAddress:"DMX",dmxChannel:"Kanal",dmxKind:"Entität",kind_number:"number",kind_select:"select",kind_fine:"fein",kind_switching:"umschaltend",kind_empty:"ungenutzt",kind_unknown:"unbekannt",dmxLibrarySubtitle:"Fixtures im Open-Fixture-Library-Format, gespeichert in /config/{folder}",dmxFixtureAdded:"{name} wurde als {file} gespeichert.",dmxOflError:"Open Fixture Library: {error}",dmxUploadError:"Upload fehlgeschlagen: {error}",dmxInstalled:"installiert",dmxFolderMissing:"Der Ordner /config/{folder} existiert noch nicht. Er wird beim ersten Download/Deploy angelegt.",dmxOflTitle:"Fixtures hinzufügen",dmxOflHint:"Durchsuche die Open Fixture Library oder lade eine OFL-JSON-Datei hoch.",dmxOflPlaceholder:"z. B. Hydrabeam, Stairville, ADJ …",dmxSearch:"Suchen",dmxUpload:"JSON hochladen…",dmxDownload:"Herunterladen",dmxOflNoResults:"Keine Fixtures gefunden.",dmxAvailable:"Verfügbare Fixtures ({count})",dmxFilter:"Filtern…",dmxBundledExplain:"„Mitgeliefert“ sind generische Fader dieser Integration; sie werden bei Verwendung in den Ordner kopiert.",err_required:"Pflichtfeld",err_range:"Muss zwischen {low} und {high} liegen",err_choice:"Erlaubt: {choices}",err_temp:"Format wie 2700K",err_setup_char:"'{token}' ist für Typ {type} nicht erlaubt",err_setup_value:"Statische Werte müssen 0–255 sein",err_overflow:"Endet bei Kanal {end} (> 512)",err_overlap:"Kanäle {start}–{end} überlappen mit „{other}“ ({otherStart}–{otherEnd})",err_duplicate:"Doppelt vergeben",err_folder:"Muss ein relativer Ordner innerhalb des Config-Ordners sein",err_prefix:"Nur Kleinbuchstaben, Ziffern und _",err_min_max:"Min muss kleiner als Max sein",err_length:"Max. 63 Zeichen",err_fixture_unknown:"Fixture '{fixture}' ist nicht im Fixtures-Ordner",err_mode_unknown:"Muss einer von diesen sein: {choices}",err_width_estimated:"Die Kanalanzahl dieses Modus konnte nur geschätzt werden"}},Me=new Set(["range","choice","setup_char","overflow","overlap","fixture_unknown","mode_unknown"]),Ue=(e,t)=>{const i=`err_${t.code}`;return i in Ne?Me.has(t.code)&&!t.params?t.message:e(i,t.params):t.message},Te=e=>JSON.stringify(e);class Pe{constructor(e=[]){this.issues=e,this.exact=new Map,this.nested=new Map;for(const t of e){const e=Te(t.path);this.exact.set(e,[...this.exact.get(e)??[],t]);for(let e=0;e<=t.path.length;e++){const i=Te(t.path.slice(0,e));this.nested.set(i,[...this.nested.get(i)??[],t])}}}at(e){return this.exact.get(Te(e))??[]}within(e){return this.nested.get(Te(e))??[]}}const Fe=["linear","quadratic","cubic","quartic","sine"],Re="fixtures",Le=512,ze=511,Ie=/^[a-z0-9_]+$/,He=["artnet","sacn"],Be=30,Ke=.8,We=.5,je="HA sACN Controller",qe=100,Je=0,Ge=64,Xe=(e,t)=>e?.find(e=>e.aliases.includes(t)),Ve=(e,t)=>t?e.modes.find(e=>(e.key??e.name)===t):e.modes[0],Ze=(e,t)=>{const i=Xe(t,String(e.fixture??""));if(i)return Ve(i,e.mode)?.width},Ye=(e,t)=>{if("sacn"===t)return String(e.universe);const{net:i=0,subnet:r=0}=e;return i||r?`${i}/${r}/${e.universe}`:String(e.universe)},Qe=e=>He.flatMap(t=>((e,t)=>e[t].universes)(e,t).flatMap(e=>e.devices)),et=(e,t,i,r=-1)=>{const s=new Array(514).fill(!1);e.devices.forEach((e,i)=>{if(i===r)return;const n=Ze(e,t)??1;for(let t=e.start_address;t<e.start_address+n;t++)t>=1&&t<=Le&&(s[t]=!0)});for(let e=1;e+i-1<=Le&&e<=ze;e++){let t=!0;for(let r=e;r<e+i;r++)if(s[r]){t=!1,e=r;break}if(t)return e}return 1},tt=(e,t)=>{if(!t.includes(e))return e;const i=e.replace(/\s+\d+$/,"");let r=2;for(;t.includes(`${i} ${r}`);)r++;return`${i} ${r}`},it=e=>"object"==typeof e&&null!==e&&!Array.isArray(e),rt=(e,t)=>{const i=it(e._extra)?{...e._extra}:{};for(const[r,s]of Object.entries(e))"_extra"===r||t.includes(r)||(i[r]=s);return Object.keys(i).length?i:void 0},st=e=>Array.isArray(e)?e:[],nt=e=>{if(null==e||""===e)return;const t="number"==typeof e?e:Number(e);return Number.isFinite(t)?t:void 0},ot=e=>{if(null==e)return;return String(e).trim()||void 0},at=e=>{for(const t of Object.keys(e))void 0===e[t]&&delete e[t];return e},dt=e=>st(e).filter(it).map(e=>at({host:ot(e.host)??"",port:nt(e.port),_extra:rt(e,["host","port"])})),lt=e=>{const t=it(e)?e:{};let i;return"string"==typeof t.output_correction&&t.output_correction.trim()?i={curve:t.output_correction.trim()}:it(t.output_correction)&&(i=at({curve:ot(t.output_correction.curve),min:nt(t.output_correction.min),max:nt(t.output_correction.max),_extra:rt(t.output_correction,["curve","min","max"])}),Object.keys(i).length||(i=void 0)),at({name:ot(t.name)??"",start_address:nt(t.start_address)??1,fixture:ot(t.fixture)??"",mode:ot(t.mode),entity_id_prefix:ot(t.entity_id_prefix),output_correction:i,_extra:rt(t,["name","start_address","fixture","mode","entity_id_prefix","output_correction"])})},ct=e=>Boolean(e&&(e.artnet.universes.length||e.sacn.universes.length)),ut=e=>structuredClone(e),ht=(e,t,i)=>{if(i<0||i>=e.length)return;const[r]=e.splice(t,1);e.splice(i,0,r)},pt=e=>`hsl(${137.508*e%360} 65% 55%)`;class mt extends ae{render(){const e=this.occupancy??new Map,t=[];for(let i=1;i<=Le;i++){const r=e.get(i)??[],s=r.length>1,n=r[0],o=r.length?`${i}: ${r.map(e=>`${e.name||"?"} (${e.start}–${e.end})`).join(", ")}${s?` – ${this.t("overlap")}`:""}`:`${i}: ${this.t("free")}`,a=n&&!s?`background:${pt(n.index)}`:"";t.push(K`<div
        class="cell ${n?"used":""} ${s?"overlap":""} ${n?.start===i?"start":""}"
        style=${a}
        title=${o}
        @click=${()=>n&&this.dispatchEvent(new CustomEvent("device-click",{detail:{index:n.index}}))}
      ></div>`)}return K`
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
  `}}e([ue({attribute:!1})],mt.prototype,"occupancy",void 0),e([ue({attribute:!1})],mt.prototype,"t",void 0),_e("artnetui-channel-map",mt);const ft=(e,t,i,r,s="error")=>({path:e,code:t,message:i,severity:s,...r?{params:r}:{}}),gt=e=>"number"==typeof e&&Number.isFinite(e),vt=(e,t,i,r,s)=>null==t||(!(!gt(t)||t<r||t>s)||(e.push(ft(i,"range",`must be between ${r} and ${s}`,{low:r,high:s})),!1)),_t=(e,t,i)=>{(t??[]).forEach((t,r)=>{String(t.host??"").trim()||e.push(ft([...i,r,"host"],"required","host is required")),vt(e,t.port,[...i,r,"port"],1,65535)})},xt=(e,t,i,r)=>{String(t.name??"").trim()||e.push(ft([...i,"name"],"required","name is required"));const s=vt(e,t.start_address,[...i,"start_address"],1,ze),n=t.entity_id_prefix;null==n||Ie.test(String(n))||e.push(ft([...i,"entity_id_prefix"],"prefix","use lowercase letters, digits and _"));const o=t.output_correction;if(o&&Object.keys(o).length){const t=o.curve;null==t||Fe.includes(t)||e.push(ft([...i,"output_correction","curve"],"choice",`must be one of: ${Fe.join(", ")}`,{choices:Fe.join(", ")}));const r=vt(e,o.min,[...i,"output_correction","min"],0,1),s=vt(e,o.max,[...i,"output_correction","max"],0,1),{min:n,max:a}=o;r&&s&&gt(n)&&gt(a)&&n>=a&&e.push(ft([...i,"output_correction","min"],"min_max","min must be below max"))}const a=String(t.fixture??"").trim();if(!a)return void e.push(ft([...i,"fixture"],"required","fixture is required"));if(!r)return;const d=Xe(r,a);if(!d)return void e.push(ft([...i,"fixture"],"fixture_unknown",`fixture '${a}' is not in the fixtures folder`,{fixture:a},"warning"));const l=Ve(d,t.mode);if(!l){const t=d.modes.map(e=>e.key??e.name).join(", ");return void e.push(ft([...i,"mode"],"mode_unknown",`must be one of: ${t}`,{choices:t}))}!1===l.exact&&e.push(ft([...i,"mode"],"width_estimated","channel count of this mode could only be estimated",void 0,"warning"));const c=l.width,u=t.start_address;if(s&&Number.isInteger(u)&&u+c-1>Le){const t=u+c-1;e.push(ft([...i,"start_address"],"overflow",`device ends at channel ${t} (> 512)`,{end:t}))}return c},bt=(e,t)=>{const i=[];String(e.fixtures_folder??"").trim()?(e=>{const t=e.trim().replace(/\\/g,"/");return!(!t||t.startsWith("/")||/^[A-Za-z]:/.test(t)||t.split("/").includes(".."))})(String(e.fixtures_folder))||i.push(ft(["fixtures_folder"],"folder","must stay inside the config folder")):i.push(ft(["fixtures_folder"],"required","folder is required")),vt(i,e.max_fps,["max_fps"],1,43);for(const t of He){const r=e[t]??{};vt(i,r.refresh_every,[t,"refresh_every"],0,9999),vt(i,r.rate_limit,[t,"rate_limit"],0,9999)}const r=e.sacn??{};vt(i,r.priority,["sacn","priority"],0,200),vt(i,r.multicast_ttl,["sacn","multicast_ttl"],1,255),vt(i,r.sync_address,["sacn","sync_address"],0,63999),String(r.source_name??"").length>63&&i.push(ft(["sacn","source_name"],"length","max. 63 characters"));const s=new Set,n=new Set;for(const r of He){const o=new Set;(e[r]?.universes??[]).forEach((e,a)=>{const d=[r,"universes",a];let l,c;if("artnet"===r){const t=e;l=[vt(i,t.net,[...d,"net"],0,15),vt(i,t.subnet,[...d,"subnet"],0,15),vt(i,t.universe,[...d,"universe"],0,511)].every(Boolean),c=`${t.net??0}/${t.subnet??0}/${t.universe}`,_t(i,t.manual_nodes,[...d,"manual_nodes"])}else{const t=e;l=vt(i,t.universe,[...d,"universe"],1,63999),c=String(t.universe),_t(i,t.unicast_addresses,[...d,"unicast_addresses"])}l&&o.has(c)&&i.push(ft([...d,"universe"],"duplicate","duplicate universe")),o.add(c);const u=[];(e.devices??[]).forEach((e,r)=>{const o=[...d,"devices",r],a=xt(i,e,o,t),l=String(e.name??"").trim();l&&(s.has(l)&&i.push(ft([...o,"name"],"duplicate","duplicate name")),s.add(l));const c=e.entity_id_prefix;c&&(n.has(c)&&i.push(ft([...o,"entity_id_prefix"],"duplicate","duplicate prefix")),n.add(c));const h=e.start_address;if(a&&Number.isInteger(h)&&h>=1&&h<=ze){const e=h+a-1;for(const[t,r,s]of u)if(h<=r&&t<=e){i.push(ft([...o,"start_address"],"overlap",`channels ${h}-${e} overlap with '${s}' (${t}-${r})`,{start:h,end:e,other:s,otherStart:t,otherEnd:r}));break}u.push([h,e,l])}})})}return i},yt=e=>e.filter(e=>"error"===(e.severity??"error")),$t={number:"kind_number",select:"kind_select",fine:"kind_fine",switching:"kind_switching",empty:"kind_empty",unknown:"kind_unknown"};class wt extends ae{constructor(){super(...arguments),this._target="artnet:0"}willUpdate(e){(e.has("device")||e.has("location"))&&(this._draft=structuredClone(this.device),this._target=`${this.location.protocol}:${this.location.universe}`)}get _targetLoc(){const[e,t]=this._target.split(":");return{protocol:e,universe:Number(t)}}_issues(){const e=structuredClone(this.config),{protocol:t,universe:i,device:r}=this.location;r>=0&&e[t].universes[i].devices.splice(r,1);const s=this._targetLoc,n=e[s.protocol].universes[s.universe].devices,o=s.protocol===t&&s.universe===i&&r>=0?r:n.length;return n.splice(o,0,this._draft),{index:new Pe(bt(e,this.fixtures)),path:[s.protocol,"universes",s.universe,"devices",o]}}_set(e,t){const i={...this._draft};void 0===t?delete i[e]:i[e]=t,this._draft=i}_setCorrection(e,t){const i={...this._draft.output_correction??{}};void 0===t?delete i[e]:i[e]=t,this._set("output_correction",Object.keys(i).length?i:void 0)}_setFixture(e){const t={...this._draft,fixture:e??""},i=Xe(this.fixtures,t.fixture);i&&t.mode&&Ve(i,t.mode)||delete t.mode,this._draft=t}_width(){const e=Xe(this.fixtures,this._draft.fixture);return e&&Ve(e,this._draft.mode)?.width||1}_nextFree(){const{protocol:e,universe:t,device:i}=this.location,r=this._targetLoc,s=r.protocol===e&&r.universe===t?i:-1,n=this.config[r.protocol].universes[r.universe];this._set("start_address",et(n,this.fixtures,this._width(),s))}_save(){this.dispatchEvent(new CustomEvent("device-save",{detail:{device:this._draft,from:this.location,to:this._targetLoc}}))}_renderChannels(e,t){const i=this.t,r=e.channels??[];if(!r.length)return j;const s=e.entities;return K`
      <details class="channels" open>
        <summary>${i("dmxChannels",{count:e.width})}</summary>
        ${s?K`<p class="muted">
              ${i("dmxEntityPreview",{light:s.light,number:s.number,select:s.select})}
            </p>`:j}
        <table>
          <thead>
            <tr><th>${i("dmxAddress")}</th><th>${i("dmxChannel")}</th><th>${i("dmxKind")}</th></tr>
          </thead>
          <tbody>
            ${r.map((e,r)=>K`<tr class=${e.kind}>
                <td>${Number.isInteger(t)?t+r:r+1}</td>
                <td>${e.name??"—"}${e.type?K` <span class="muted">(${e.type})</span>`:j}</td>
                <td><span class="kind ${e.kind}">${i($t[e.kind]??"kind_unknown")}</span></td>
              </tr>`)}
          </tbody>
        </table>
      </details>
    `}render(){if(!this._draft)return j;const e=this.t,t=this._draft,{index:i,path:r}=this._issues(),s=(t,s)=>i.at([...r,t]).filter(e=>(e.severity??"error")===s).map(t=>Ue(e,t)),n=e=>s(e,"error"),o=e=>s(e,"warning"),a=t.output_correction??{},d=Xe(this.fixtures,t.fixture),l=d?Ve(d,t.mode):void 0,c=l?.width,u=t.start_address,h=(t.name||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/ß/g,"ss").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");const p=(this.fixtures??[]).map(t=>({value:t.key,label:`${t.name}${t.key!==t.name?` (${t.key})`:""}${t.installed?"":` – ${e("dmxBundled")}`}`})),m=["artnet","sacn"].flatMap(t=>this.config[t].universes.map((i,r)=>({value:`${t}:${r}`,label:`${e("artnet"===t?"dmxArtnet":"dmxSacn")} · ${e("universe")} ${Ye(i,t)}`})));return K`
      <artnetui-dialog
        open
        wide
        .heading=${this.location.device<0?e("dmxNewDevice"):e("dmxEditDevice")}
        .closeLabel=${e("close")}
      >
        <div class="grid">
          ${Se({label:e("name"),required:!0,value:t.name,errors:n("name"),onChange:e=>this._set("name",e??"")})}
          ${m.length>1?Ce({label:e("universe"),value:this._target,options:m,onChange:e=>e&&(this._target=e)}):j}
        </div>
        <div class="fixture-row">
          ${Ce({label:e("dmxFixture"),required:!0,value:t.fixture||void 0,options:p,emptyLabel:t.fixture?void 0:`— ${e("dmxChooseFixture")} —`,errors:n("fixture"),warnings:o("fixture"),helper:d&&!d.installed?e("dmxBundledHint"):void 0,onChange:e=>this._setFixture(e)})}
          <button @click=${()=>this.dispatchEvent(new CustomEvent("open-library"))}>
            ${$e("mdi:bookshelf")} ${e("dmxLibrary")}
          </button>
        </div>
        <div class="grid">
          ${d?Ce({label:e("dmxMode"),value:t.mode,options:d.modes.map(e=>({value:e.key??e.name,label:`${e.name} (${e.width} ch)`})),emptyLabel:`${e("default")} (${d.modes[0]?.name??"—"})`,errors:n("mode"),warnings:o("mode"),onChange:e=>this._set("mode",e)}):j}
          <div class="with-button">
            ${Ae({label:e("dmxStartAddress"),required:!0,value:t.start_address,min:1,max:ze,errors:n("start_address"),helper:c?e("dmxFootprint",{start:u,end:Number.isInteger(u)?Math.min(u+c-1,Le):"?",width:c}):void 0,onChange:e=>this._set("start_address",e??1)})}
            <button class="small" @click=${this._nextFree}>${e("nextFree")}</button>
          </div>
          ${Se({label:e("dmxPrefix"),value:t.entity_id_prefix,placeholder:h,errors:n("entity_id_prefix"),helper:e("dmxPrefixHelper",{prefix:t.entity_id_prefix||h||"…"}),onChange:e=>this._set("entity_id_prefix",e)})}
        </div>
        <details ?open=${Boolean(t.output_correction)}>
          <summary>${e("outputCorrection")}</summary>
          <div class="grid">
            ${Ce({label:e("dmxCurve"),value:a.curve,options:Fe,emptyLabel:`${e("default")} (linear)`,errors:n("output_correction.curve"),onChange:e=>this._setCorrection("curve",e)})}
            ${Ae({label:e("dmxMin"),value:a.min,min:0,max:1,step:"any",placeholder:"0",errors:i.at([...r,"output_correction","min"]).map(t=>Ue(e,t)),onChange:e=>this._setCorrection("min",e)})}
            ${Ae({label:e("dmxMax"),value:a.max,min:0,max:1,step:"any",placeholder:"1",errors:i.at([...r,"output_correction","max"]).map(t=>Ue(e,t)),onChange:e=>this._setCorrection("max",e)})}
          </div>
        </details>
        ${l?this._renderChannels(l,u):j}
        <button slot="actions" @click=${()=>this.dispatchEvent(new CustomEvent("closed"))}>${e("cancel")}</button>
        <button slot="actions" class="primary" @click=${this._save}>${e("apply")}</button>
      </artnetui-dialog>
    `}static{this.styles=[be,o`
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
    `]}}e([ue({attribute:!1})],wt.prototype,"t",void 0),e([ue({attribute:!1})],wt.prototype,"config",void 0),e([ue({attribute:!1})],wt.prototype,"fixtures",void 0),e([ue({attribute:!1})],wt.prototype,"location",void 0),e([ue({attribute:!1})],wt.prototype,"device",void 0),e([he()],wt.prototype,"_draft",void 0),e([he()],wt.prototype,"_target",void 0),_e("artnetui-dmx-device-dialog",wt);const kt=e=>"error"===(e.severity??"error");class St extends ae{constructor(){super(...arguments),this.issues=new Pe}_commit(e){const t=ut(this.config);e(t),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_errors(e){return this.issues.at(e).filter(kt).map(e=>Ue(this.t,e))}_warnings(e){return this.issues.at(e).filter(e=>!kt(e)).map(e=>Ue(this.t,e))}_openLibrary(){this.dispatchEvent(new CustomEvent("open-library"))}_newDevice(e){const t=e.devices[e.devices.length-1],i=(t&&Xe(this.fixtures,t.fixture))??Xe(this.fixtures,"RGB")??this.fixtures?.[0],r=t&&i===Xe(this.fixtures,t.fixture)?t.mode:void 0,s=i&&Ve(i,r)?.width||1,n=Qe(this.config).map(e=>e.name);return{name:tt(i?.name??"Fixture",n),start_address:et(e,this.fixtures,s),fixture:i?.key??"",...r?{mode:r}:{}}}_openDevice(e){const t=this.config[e.protocol].universes[e.universe],i=e.device>=0?ut(t.devices[e.device]):this._newDevice(t);this._editing={location:e,device:i}}_saveDevice(e){const{device:t,from:i,to:r}=e.detail;this._commit(e=>{const s=e[i.protocol].universes[i.universe].devices,n=e[r.protocol].universes[r.universe].devices;i.device<0?n.push(t):i.protocol===r.protocol&&i.universe===r.universe?s[i.device]=t:(s.splice(i.device,1),n.push(t))}),this._editing=void 0}_duplicateDevice(e,t){const i=Ze(t,this.fixtures)??1,r=Qe(this.config).map(e=>e.name),s={...ut(t),name:tt(t.name||"Fixture",r),start_address:et(e,this.fixtures,i)};return delete s.entity_id_prefix,s}_renderDevice(e,t,i,r,s){const n=this.t,o=[e,"universes",t,"devices",i],a=this.issues.within(o),d=a.filter(kt),l=a.filter(e=>!kt(e)),c=Xe(this.fixtures,r.fixture),u=c?Ve(c,r.mode):void 0,h=u?.width,p=r.start_address,m=h&&h>1?`${p}–${p+h-1}`:`${p}`,f=this.config[e].universes[t],g=u?.entities;return K`
      <li class="device ${d.length?"invalid":l.length?"warning":""}">
        <span class="swatch" style="background:${pt(i)}"></span>
        <button class="device-main" @click=${()=>this._openDevice({protocol:e,universe:t,device:i})} title=${n("edit")}>
          ${$e(g&&(g.select||g.number>4)?"mdi:spotlight-beam":"mdi:lightbulb")}
          <span class="device-text">
            <span class="device-name">${r.name||"—"}</span>
            <span class="device-meta">
              ${c?.name??r.fixture??"?"}${u?` · ${u.name}`:""} · ${m}
              ${h?`(${h} ch)`:j}
              ${r.entity_id_prefix?K` · <code>${r.entity_id_prefix}</code>`:j}
            </span>
            ${d.map(e=>K`<span class="device-error">${Ue(n,e)}</span>`)}
            ${l.map(e=>K`<span class="device-warning">${Ue(n,e)}</span>`)}
          </span>
        </button>
        <span class="device-actions">
          <button class="icon" title=${n("moveUp")} aria-label=${n("moveUp")} ?disabled=${0===i}
            @click=${()=>this._commit(r=>ht(r[e].universes[t].devices,i,i-1))}>
            ${$e("mdi:arrow-up")}
          </button>
          <button class="icon" title=${n("moveDown")} aria-label=${n("moveDown")} ?disabled=${i===s-1}
            @click=${()=>this._commit(r=>ht(r[e].universes[t].devices,i,i+1))}>
            ${$e("mdi:arrow-down")}
          </button>
          <button class="icon" title=${n("duplicate")} aria-label=${n("duplicate")}
            @click=${()=>this._commit(s=>s[e].universes[t].devices.splice(i+1,0,this._duplicateDevice(f,r)))}>
            ${$e("mdi:content-copy")}
          </button>
          <button class="icon danger" title=${n("remove")} aria-label=${n("remove")}
            @click=${()=>this._commit(r=>r[e].universes[t].devices.splice(i,1))}>
            ${$e("mdi:delete-outline")}
          </button>
        </span>
      </li>
    `}_setUniverse(e,t,i,r){this._commit(s=>{const n=s[e].universes[t];void 0===r?delete n[i]:n[i]=r})}_renderHosts(e,t,i,r,s){const n=this.t,o=[e,"universes",t,i],a=r=>this._commit(s=>{const n=s[e].universes[t];n[i]=n[i]??[],r(n[i])});return K`
      <div class="hosts">
        <span class="label">${n("manual_nodes"===i?"dmxManualNodes":"dmxUnicast")}</span>
        ${r.map((e,t)=>K`<div class="host-row">
            ${Se({label:n("host"),required:!0,value:e.host,placeholder:"192.168.0.10",errors:this._errors([...o,t,"host"]),onChange:e=>a(i=>i[t].host=e??"")})}
            ${Ae({label:n("port"),value:e.port,min:1,max:65535,placeholder:String(s),errors:this._errors([...o,t,"port"]),onChange:e=>a(i=>{void 0===e?delete i[t].port:i[t].port=e})})}
            <button class="icon danger" title=${n("remove")} aria-label=${n("remove")}
              @click=${()=>a(e=>e.splice(t,1))}>
              ${$e("mdi:delete-outline")}
            </button>
          </div>`)}
        <div><button class="small" @click=${()=>a(e=>e.push({host:""}))}>${$e("mdi:plus")} ${n("dmxAddHost")}</button></div>
      </div>
    `}_renderUniverse(e,t,i){const r=this.t,s=[e,"universes",i],n=this.issues.within(s).filter(kt).length,o=((e,t)=>{const i=new Map;return e.devices.forEach((e,r)=>{const s=Ze(e,t)??1,n=e.start_address;if(!Number.isInteger(n)||n<1)return;const o=n+s-1;for(let t=n;t<=Math.min(o,Le);t++){const s=i.get(t)??[];s.push({index:r,name:e.name,start:n,end:o}),i.set(t,s)}}),i})(t,this.fixtures),a="artnet"===e?t:void 0,d="sacn"===e?t:void 0;return K`
      <section class="universe">
        <header>
          <h3>${r("universe")} ${Ye(t,e)}</h3>
          ${n?K`<span class="badge">${n}</span>`:j}
          <span class="spacer"></span>
          <button class="icon danger" title=${r("remove")} aria-label=${r("remove")}
            @click=${()=>this._commit(t=>t[e].universes.splice(i,1))}>
            ${$e("mdi:delete-outline")}
          </button>
        </header>
        <div class="grid">
          ${a?K`
                ${Ae({label:r("dmxNet"),value:a.net??0,min:0,max:15,errors:this._errors([...s,"net"]),onChange:t=>this._setUniverse(e,i,"net",t??0)})}
                ${Ae({label:r("dmxSubnet"),value:a.subnet??0,min:0,max:15,errors:this._errors([...s,"subnet"]),onChange:t=>this._setUniverse(e,i,"subnet",t??0)})}
                ${Ae({label:r("universe"),required:!0,value:a.universe,min:0,max:511,errors:this._errors([...s,"universe"]),onChange:t=>this._setUniverse(e,i,"universe",t??0)})}
                ${Ee({label:r("sendPartial"),value:a.send_partial_universe??!0,onChange:t=>this._setUniverse(e,i,"send_partial_universe",!!t&&void 0)})}
              `:Ae({label:r("universe"),required:!0,value:t.universe,min:1,max:63999,errors:this._errors([...s,"universe"]),onChange:t=>this._setUniverse(e,i,"universe",t??1)})}
        </div>
        <details ?open=${Boolean((a?.manual_nodes??d?.unicast_addresses??[]).length)}>
          <summary>${r("dmxCompatibility")}</summary>
          ${a?this._renderHosts(e,i,"manual_nodes",a.manual_nodes??[],6454):this._renderHosts(e,i,"unicast_addresses",d?.unicast_addresses??[],5568)}
        </details>
        ${t.devices.length?K`
              <details class="map">
                <summary>${r("channelMap")}</summary>
                <artnetui-channel-map
                  .occupancy=${o}
                  .t=${r}
                  @device-click=${t=>this._openDevice({protocol:e,universe:i,device:t.detail.index})}
                ></artnetui-channel-map>
              </details>
              <ul class="devices">
                ${t.devices.map((r,s)=>this._renderDevice(e,i,s,r,t.devices.length))}
              </ul>
            `:K`<div class="empty">${r("dmxNoDevices")}</div>`}
        <div class="row">
          <button @click=${()=>this._openDevice({protocol:e,universe:i,device:-1})}>
            ${$e("mdi:plus")} ${r("dmxAddDevice")}
          </button>
        </div>
      </section>
    `}_setProtocol(e,t,i){this._commit(r=>{const s=r[e];void 0===i?delete s[t]:s[t]=i})}_renderProtocol(e){const t=this.t,i=this.config[e],r=t=>this._errors([e,t]),s=K`
      ${Ae({label:t("refresh"),value:i.refresh_every,min:0,max:9999,step:"any",placeholder:String(Ke),errors:r("refresh_every"),onChange:t=>this._setProtocol(e,"refresh_every",t)})}
      ${Ae({label:t("dmxRateLimit"),value:i.rate_limit,min:0,max:9999,step:"any",placeholder:String(We),errors:r("rate_limit"),onChange:t=>this._setProtocol(e,"rate_limit",t)})}
    `,n="sacn"===e?this.config.sacn:void 0,o=this.issues.within([e]).filter(kt).length;return K`
      <section class="protocol">
        <header>
          <h2>${t("artnet"===e?"dmxArtnet":"dmxSacn")}</h2>
          ${o?K`<span class="badge">${o}</span>`:j}
          <span class="spacer"></span>
          <span class="muted">${t("dmxUniverseCount",{count:i.universes.length})}</span>
        </header>
        <details ?open=${this.issues.within([e]).some(e=>2===e.path.length)}>
          <summary>${t("dmxProtocolSettings")}</summary>
          <div class="grid">
            ${n?K`
                  ${Se({label:t("dmxSourceName"),value:n.source_name,placeholder:je,errors:r("source_name"),onChange:t=>this._setProtocol(e,"source_name",t)})}
                  ${Ae({label:t("dmxPriority"),value:n.priority,min:0,max:200,placeholder:String(qe),errors:r("priority"),onChange:t=>this._setProtocol(e,"priority",t)})}
                  ${Se({label:t("dmxInterfaceIp"),value:n.interface_ip,placeholder:"0.0.0.0",errors:r("interface_ip"),onChange:t=>this._setProtocol(e,"interface_ip",t)})}
                  ${Ae({label:t("dmxSyncAddress"),value:n.sync_address,min:0,max:63999,placeholder:String(Je),errors:r("sync_address"),onChange:t=>this._setProtocol(e,"sync_address",t)})}
                  ${Ae({label:t("dmxTtl"),value:n.multicast_ttl,min:1,max:255,placeholder:String(Ge),errors:r("multicast_ttl"),onChange:t=>this._setProtocol(e,"multicast_ttl",t)})}
                `:j}
            ${s}
            ${n?Ee({label:t("dmxPreviewData"),value:n.enable_preview_data,onChange:t=>this._setProtocol(e,"enable_preview_data",t||void 0)}):j}
          </div>
        </details>
        <div class="universes">
          ${i.universes.map((t,i)=>this._renderUniverse(e,t,i))}
        </div>
        <div class="row">
          <button
            @click=${()=>this._commit(t=>"artnet"===e?t.artnet.universes.push((e=>{const t=new Set(e.artnet.universes.map(e=>`${e.net??0}/${e.subnet??0}/${e.universe}`));let i=0;for(;t.has(`0/0/${i}`)&&i<511;)i++;return{net:0,subnet:0,universe:i,manual_nodes:[],devices:[]}})(t)):t.sacn.universes.push((e=>{const t=new Set(e.sacn.universes.map(e=>e.universe));let i=1;for(;t.has(i)&&i<63999;)i++;return{universe:i,unicast_addresses:[],devices:[]}})(t)))}
          >
            ${$e("mdi:plus")} ${t("artnet"===e?"dmxAddArtnetUniverse":"dmxAddSacnUniverse")}
          </button>
        </div>
      </section>
    `}_renderGeneral(){const e=this.t;return K`
      <section>
        <header>
          <h2>${e("dmxGeneral")}</h2>
        </header>
        <div class="grid">
          ${Se({label:e("dmxFolder"),required:!0,value:this.config.fixtures_folder,placeholder:Re,errors:this._errors(["fixtures_folder"]),warnings:this._warnings(["fixtures_folder"]),helper:e("dmxFolderHelper",{count:this.fixtures?.length??0}),onChange:e=>this._commit(t=>t.fixtures_folder=e??Re)})}
          ${Ae({label:e("maxFps"),value:this.config.max_fps,min:1,max:43,placeholder:String(Be),errors:this._errors(["max_fps"]),onChange:e=>this._commit(t=>{void 0===e?delete t.max_fps:t.max_fps=e})})}
        </div>
      </section>
    `}render(){const e=this.t;return K`
      ${this._renderGeneral()} ${this._renderProtocol("artnet")} ${this._renderProtocol("sacn")}
      ${this._editing?K`<artnetui-dmx-device-dialog
            .t=${e}
            .config=${this.config}
            .fixtures=${this.fixtures}
            .location=${this._editing.location}
            .device=${this._editing.device}
            @device-save=${this._saveDevice}
            @open-library=${this._openLibrary}
            @closed=${()=>this._editing=void 0}
          ></artnetui-dmx-device-dialog>`:j}
    `}static{this.styles=[be,o`
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
    `]}}e([ue({attribute:!1})],St.prototype,"config",void 0),e([ue({attribute:!1})],St.prototype,"fixtures",void 0),e([ue({attribute:!1})],St.prototype,"issues",void 0),e([ue({attribute:!1})],St.prototype,"t",void 0),e([he()],St.prototype,"_editing",void 0),_e("artnetui-dmx-editor",St);class At extends ae{constructor(){super(...arguments),this._filter="",this._query=""}_installedKeys(){return new Set((this.library?.fixtures??[]).filter(e=>e.installed&&e.manufacturer_key&&e.fixture_key).map(e=>`${e.manufacturer_key}/${e.fixture_key}`))}_changed(e){this._message={type:"success",text:this.t("dmxFixtureAdded",{name:e.name,file:e.file??""})},this.dispatchEvent(new CustomEvent("fixtures-changed",{detail:{fixture:e}}))}async _search(e){e?.preventDefault();const t=this._query.trim();if(t){this._busy="search",this._message=void 0;try{this._results=await((e,t)=>e.callWS({type:`${me}/ofl/search`,query:t}))(this.hass,t)}catch(e){this._results=void 0,this._message={type:"error",text:this.t("dmxOflError",{error:ve(e)})}}finally{this._busy=void 0}}}async _download(e){this._busy=e,this._message=void 0;try{this._changed(await((e,t)=>e.callWS({type:`${me}/ofl/download`,key:t}))(this.hass,e))}catch(e){this._message={type:"error",text:this.t("dmxOflError",{error:ve(e)})}}finally{this._busy=void 0}}async _upload(e){const t=e.target,i=t.files?.[0];if(t.value="",i){this._busy="upload",this._message=void 0;try{this._changed(await(r=this.hass,s=i.name,n=await i.text(),r.callWS({type:`${me}/fixtures/upload`,file_name:s,content:n})))}catch(e){this._message={type:"error",text:this.t("dmxUploadError",{error:ve(e)})}}finally{this._busy=void 0}var r,s,n}}_renderFixture(e){const t=this.t,i=e.modes.map(e=>`${e.name} (${e.width})`).join(", ");return K`<li>
      <div class="name">
        ${e.name}
        ${e.key!==e.name?K`<code>${e.key}</code>`:j}
        <span class="badge ${e.installed?"installed":"bundled"}">
          ${e.installed?t("dmxInstalled"):t("dmxBundled")}
        </span>
      </div>
      <div class="muted">${i}${e.file?K` · ${e.file}`:j}</div>
    </li>`}render(){const e=this.t,t=this.library,i=this._filter.trim().toLowerCase(),r=(t?.fixtures??[]).filter(e=>!i||[e.name,...e.aliases,e.manufacturer_key??""].some(e=>e.toLowerCase().includes(i))),s=this._installedKeys();return K`
      <artnetui-dialog open wide .heading=${e("dmxLibrary")} .subtitle=${e("dmxLibrarySubtitle",{folder:t?.folder??"fixtures"})} .closeLabel=${e("close")}>
        ${this._message?we(this._message.type,this._message.text):j}
        ${t&&!t.folder_exists?we("info",e("dmxFolderMissing",{folder:t.folder??"fixtures"})):j}
        ${(t?.errors??[]).map(e=>we("warning",K`<code>${e.file}</code>: ${e.error}`))}

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
              ${$e("mdi:magnify")} ${"search"===this._busy?e("loading"):e("dmxSearch")}
            </button>
            <button type="button" ?disabled=${void 0!==this._busy} @click=${()=>this._fileInput?.click()}>
              ${$e("mdi:upload")} ${"upload"===this._busy?e("loading"):e("dmxUpload")}
            </button>
            <input type="file" accept=".json,application/json" hidden @change=${this._upload} />
          </form>
          ${this._results?this._results.length?K`<ul class="results">
                  ${this._results.map(t=>{const i=s.has(t.key);return K`<li>
                      <div>
                        <div class="name">${t.name}</div>
                        <div class="muted"><code>${t.key}</code></div>
                      </div>
                      <button ?disabled=${i||void 0!==this._busy} @click=${()=>this._download(t.key)}>
                        ${$e("mdi:download")}
                        ${i?e("dmxInstalled"):this._busy===t.key?e("loading"):e("dmxDownload")}
                      </button>
                    </li>`})}
                </ul>`:K`<p class="muted">${e("dmxOflNoResults")}</p>`:j}
        </section>

        <section>
          <h3>${e("dmxAvailable",{count:t?.fixtures.length??0})}</h3>
          <input
            type="search"
            placeholder=${e("dmxFilter")}
            .value=${this._filter}
            @input=${e=>this._filter=e.target.value}
          />
          ${t?K`<ul class="fixtures">${r.map(e=>this._renderFixture(e))}</ul>`:K`<p class="muted">${e("loading")}</p>`}
          <p class="muted">${e("dmxBundledExplain")}</p>
        </section>

        <button slot="actions" class="primary" @click=${()=>this.dispatchEvent(new CustomEvent("closed"))}>${e("close")}</button>
      </artnetui-dialog>
    `}static{this.styles=[be,o`
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
    `]}}e([ue({attribute:!1})],At.prototype,"hass",void 0),e([ue({attribute:!1})],At.prototype,"t",void 0),e([ue({attribute:!1})],At.prototype,"library",void 0),e([he()],At.prototype,"_filter",void 0),e([he()],At.prototype,"_query",void 0),e([he()],At.prototype,"_results",void 0),e([he()],At.prototype,"_busy",void 0),e([he()],At.prototype,"_message",void 0),e([pe("input[type=file]")],At.prototype,"_fileInput",void 0),_e("artnetui-fixture-library",At);const Ct="0.4.0",Et=e=>"error"===(e.severity??"error"),Dt=e=>{history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))};class Nt extends ae{constructor(){super(...arguments),this.narrow=!1,this.embedded=!1,this._doc={saved:"",history:[],future:[]},this._issues=new Pe,this._saving=!1,this._menuOpen=!1,this._libraryOpen=!1,this._loadStarted=!1,this._onBeforeUnload=e=>{this._dirty&&e.preventDefault()},this._onKeyDown=e=>{if(!e.ctrlKey&&!e.metaKey||!this.isConnected||!this._config)return;if(this._modalOpen)return;const t=e.key.toLowerCase();if("s"===t)return e.preventDefault(),void this._save();const i=e.composedPath()[0];i&&["INPUT","TEXTAREA","SELECT"].includes(i.tagName)||("z"!==t||e.shiftKey?("z"===t&&e.shiftKey||"y"===t)&&(e.preventDefault(),this._redo()):(e.preventDefault(),this._undo()))}}get _t(){return t=this.hass,e=(t?.locale?.language??t?.language??navigator.language??"en").toLowerCase().startsWith("de")?"de":"en",(t,i)=>{const r=Oe[e][t]??Ne[t]??t;return i?r.replace(/\{(\w+)\}/g,(e,t)=>t in i?String(i[t]):e):r};var e,t}get _config(){return this._doc.config}get _dmx(){return this._doc.config}get _dirty(){return void 0!==this._doc.config&&JSON.stringify(this._doc.config)!==this._doc.saved}get _modalOpen(){return Boolean(this._deploy||this._confirm)||this._libraryOpen}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._onKeyDown),window.addEventListener("beforeunload",this._onBeforeUnload)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("beforeunload",this._onBeforeUnload),window.clearTimeout(this._toastTimer)}willUpdate(e){if(["_doc","_fixtures"].some(t=>e.has(t))){const e=this._config;this._issues=e?new Pe(bt(e,this._fixtures?.fixtures)):new Pe}}updated(e){e.has("hass")&&this.hass&&!this._loadStarted&&(this._loadStarted=!0,this._load());const t=this._dmx?.fixtures_folder;void 0!==t&&t!==this._fixturesFolder&&(this._fixturesFolder=t,this._loadFixtures())}_patchDoc(e){this._doc={...this._doc,...e}}_setConfig(e){this._patchDoc({config:e,history:this._doc.config?[...this._doc.history,JSON.stringify(this._doc.config)].slice(-100):this._doc.history,future:[]})}_undo(){const e=this._doc;e.history.length&&e.config&&this._patchDoc({future:[JSON.stringify(e.config),...e.future],config:JSON.parse(e.history[e.history.length-1]),history:e.history.slice(0,-1)})}_redo(){const e=this._doc;e.future.length&&e.config&&this._patchDoc({history:[...e.history,JSON.stringify(e.config)],config:JSON.parse(e.future[0]),future:e.future.slice(1)})}_showToast(e,t){this._toast={type:e,text:t},window.clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>this._toast=void 0,4e3)}_confirmIf(e,t,i){e?this._confirm={...t,action:i}:i()}_hasContent(){return ct(this._dmx)}async _load(){if(this.hass){this._loadError=void 0;try{const[i,r]=await Promise.all([(t=this.hass,t.callWS({type:`${me}/get`})),ge(this.hass)]);this._doc={config:e=i??{fixtures_folder:"fixtures",artnet:{universes:[]},sacn:{universes:[]}},saved:JSON.stringify(e),history:[],future:[]},this._status=r,this._fixturesFolder=void 0}catch(e){this._loadError=ve(e)}var e,t}}async _refreshStatus(){if(this.hass)try{this._status=await ge(this.hass)}catch{}}async _loadFixtures(){const e=this._dmx?.fixtures_folder;var t,i;if(this.hass&&void 0!==e)try{this._fixtures=await(t=this.hass,i={fixtures_folder:"fixtures",artnet:{universes:[]},sacn:{universes:[]},fixtures_folder:e},t.callWS({type:`${me}/fixtures`,...i?{config:i}:{}}))}catch(e){this._showToast("error",ve(e))}}async _save(){const e=this._config;if(this.hass&&e&&!this._saving){this._saving=!0;try{const t=await((e,t)=>e.callWS({type:`${me}/save`,config:t}))(this.hass,e);JSON.stringify(t.config)!==JSON.stringify(e)&&this._patchDoc({config:t.config}),this._patchDoc({saved:JSON.stringify(this._doc.config)}),this._showToast("success",this._t("saved"))}catch(e){this._showToast("error",`${this._t("saveError")}: ${ve(e)}`)}finally{this._saving=!1}}}async _openDeploy(){const e=this._config;if(this.hass&&e){this._deploy={busy:!0};try{this._deploy={busy:!1,preview:await fe(this.hass,e)}}catch(e){this._deploy={busy:!1,error:ve(e)}}}}async _runDeploy(){const e=this._deploy,t=this._config;if(this.hass&&e&&t){this._deploy={...e,busy:!0,error:void 0};try{const i=await((e,t)=>e.callWS({type:`${me}/deploy`,config:t}))(this.hass,t);"invalid"!==i.status&&this._patchDoc({saved:JSON.stringify(t)}),this._deploy={...e,busy:!1,result:i},this._refreshStatus(),i.installed_fixtures?.length&&this._loadFixtures()}catch(t){this._deploy={...e,busy:!1,error:ve(t)}}}}_menuAction(e){this._menuOpen=!1,e()}_replaceConfig(e){this._confirmIf(this._hasContent(),{title:"confirmImportTitle",text:"confirmImportText"},()=>this._setConfig(e))}async _importExisting(){var e;if(this.hass)try{const t=await(e=this.hass,e.callWS({type:`${me}/import_existing`}));if(!ct(t))return void this._showToast("info",this._t("importNothingDmx"));this._replaceConfig(t)}catch(e){this._showToast("error",this._t("importFailed",{error:ve(e)}))}}async _importFile(e){const t=e.target,i=t.files?.[0];if(t.value="",i)try{const e=await i.text();this._replaceConfig((e=>{if(!it(e))return{fixtures_folder:"fixtures",artnet:{universes:[]},sacn:{universes:[]}};const t=it(e.artnet)?e.artnet:{},i=it(e.sacn)?e.sacn:{},r=(e,t)=>at(Object.fromEntries(t.map(t=>[t,"source_name"===t||"interface_ip"===t?ot(e[t]):"enable_preview_data"===t?"boolean"==typeof e[t]?e[t]:void 0:nt(e[t])]))),s=(e,t)=>at({...r(e,t),_extra:rt(e,[...t,"universes"])});return at({fixtures_folder:ot(e.fixtures_folder)??Re,max_fps:nt(e.max_fps),_extra:rt(e,["fixtures_folder","max_fps","fixtures_extra","animation_extra","artnet","sacn"]),fixtures_extra:it(e.fixtures_extra)?e.fixtures_extra:void 0,animation_extra:it(e.animation_extra)?e.animation_extra:void 0,artnet:{...s(t,["refresh_every","rate_limit"]),universes:st(t.universes).filter(it).map(e=>at({net:nt(e.net)??0,subnet:nt(e.subnet)??0,universe:nt(e.universe)??0,send_partial_universe:"boolean"==typeof e.send_partial_universe?e.send_partial_universe:void 0,manual_nodes:dt(e.manual_nodes),devices:st(e.devices).map(lt),_extra:rt(e,["net","subnet","universe","send_partial_universe","manual_nodes","devices","_compatibility_extra"]),_compatibility_extra:it(e._compatibility_extra)?e._compatibility_extra:void 0}))},sacn:{...s(i,["source_name","priority","interface_ip","sync_address","multicast_ttl","enable_preview_data","refresh_every","rate_limit"]),universes:st(i.universes).filter(it).map(e=>({universe:nt(e.universe)??1,unicast_addresses:dt(e.unicast_addresses),devices:st(e.devices).map(lt),_extra:rt(e,["universe","unicast_addresses","devices","_compatibility_extra"]),_compatibility_extra:it(e._compatibility_extra)?e._compatibility_extra:void 0}))}})})(JSON.parse(e)))}catch(e){this._showToast("error",this._t("importFailed",{error:ve(e)}))}}_exportJson(){if(!this._config)return;const e=new Blob([JSON.stringify(this._config,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download="dmx-uiconfig.json",i.click(),URL.revokeObjectURL(t)}_emptied(){const e=this._dmx;return{...e,artnet:{...e.artnet,universes:[]},sacn:{...e.sacn,universes:[]}}}_openRepairsButton(e=""){return K`<button class=${e} @click=${()=>Dt("/config/repairs")}>${this._t("openRepairs")}</button>`}_renderBanners(){const e=this._t,t=this._status,i=[],r=this.panel?.config?.version??t?.version;if(r&&r!==Ct&&i.push(we("warning",e("versionMismatch",{frontend:Ct,backend:r}))),!t)return i;const s=t.dmx;t.backends.dmx.installed||i.push(we("warning",e("dmxMissing"))),s.included||!s.file_exists&&!this._hasContent()||i.push(we("warning",K`${e("includeMissing",{path:s.path})}
            <pre class="include">dmx: !include ${s.path}</pre>
            ${s.foreign_block?K`<p>${e("dmxForeignBlock")}</p>`:j}
            ${this._openRepairsButton()}`));const n=this._fixtures?.errors??[];return n.length&&i.push(we("warning",K`${e("dmxFixtureErrors")}
            <ul class="issues">
              ${n.map(e=>K`<li><code>${e.file}</code>: ${e.error}</li>`)}
            </ul>`)),t.restart_required&&i.push(we("info",K`${e("restartPending")} ${this._openRepairsButton("inline")}`)),i}_renderMenu(){const e=this._t,t=(e,t,i={})=>K`<button role="menuitem" class=${i.danger?"danger":""} ?disabled=${i.disabled} @click=${()=>this._menuAction(t)}>${e}</button>`;return K`
      <div class="menu-backdrop" @click=${()=>this._menuOpen=!1}></div>
      <div class="menu" role="menu">
        ${t(e("dmxLibrary"),()=>this._libraryOpen=!0)}
        <hr />
        ${t(e("importExisting"),()=>{this._importExisting()})}
        ${t(e("importJson"),()=>this._fileInput?.click())}
        ${t(e("exportJson"),()=>this._exportJson())}
        <hr />
        ${t(e("loadExample"),()=>this._confirmIf(this._hasContent(),{title:"confirmExampleTitle",text:"confirmExampleText"},()=>this._setConfig({fixtures_folder:"fixtures",max_fps:30,artnet:{universes:[{net:0,subnet:0,universe:0,devices:[{name:"Living room dimmer",start_address:1,fixture:"DeskCh",mode:"16bit"},{name:"Kitchen strip",start_address:3,fixture:"RGBW",mode:"8bit",entity_id_prefix:"kitchen_strip"},{name:"Bar RGB",start_address:7,fixture:"RGB",mode:"16bit",output_correction:{curve:"quadratic"}}]}]},sacn:{universes:[]}})))}
        ${t(e("clearAll"),()=>this._confirmIf(!0,{title:"confirmClearTitle",text:"confirmClearText"},()=>this._setConfig(this._emptied())),{danger:!0,disabled:!this._hasContent()})}
        ${t(e("reload"),()=>this._confirmIf(this._dirty,{title:"confirmReloadTitle",text:"confirmReloadText"},()=>{this._load()}))}
      </div>
    `}_renderToolbar(){const e=this._t,t=this._issues.issues,i=t.filter(Et).length,r=t.length-i,s=this._doc;return K`
      <div class="toolbar">
        <button class="icon" title="${e("undo")} (Ctrl+Z)" aria-label=${e("undo")} ?disabled=${!s.history.length} @click=${this._undo}>
          ${$e("mdi:undo")}
        </button>
        <button class="icon" title="${e("redo")} (Ctrl+Shift+Z)" aria-label=${e("redo")} ?disabled=${!s.future.length} @click=${this._redo}>
          ${$e("mdi:redo")}
        </button>
        <button @click=${()=>this._libraryOpen=!0}>${$e("mdi:bookshelf")} ${e("dmxLibrary")}</button>
        <div class="menu-wrap">
          <button aria-haspopup="menu" aria-expanded=${this._menuOpen} @click=${()=>this._menuOpen=!this._menuOpen}>
            ${$e("mdi:dots-vertical")} ${e("more")}
          </button>
          ${this._menuOpen?this._renderMenu():j}
        </div>
        <input
          type="file"
          accept=".json,application/json"
          hidden
          @change=${this._importFile}
        />
        <span class="spacer"></span>
        ${i?K`<span class="state error">${e("errorsCount",{count:i})}</span>`:j}
        ${r?K`<span class="state warning">${e("warningsCount",{count:r})}</span>`:j}
        ${this._dirty?K`<span class="state">${e("unsaved")}</span>`:j}
        <button ?disabled=${!this._dirty||this._saving} @click=${this._save}>
          ${this._saving?e("saving"):e("save")}
        </button>
        <button class="primary" title=${e(i?"deployBlocked":"deployHint")} ?disabled=${i>0} @click=${this._openDeploy}>
          ${e("deploy")}
        </button>
      </div>
      ${this._toast?K`<div class="toast">${we(this._toast.type,this._toast.text)}</div>`:j}
    `}_renderIssues(e){return K`<ul class="issues">
      ${e.map(e=>K`<li><code>${e.path.join(".")}</code>: ${Ue(this._t,e)}</li>`)}
    </ul>`}_renderDiff(e){return K`<pre class="diff">${e.split("\n").map(e=>{const t=e.startsWith("+++")||e.startsWith("---")?"meta":e.startsWith("+")?"add":e.startsWith("-")?"del":e.startsWith("@@")?"hunk":"";return K`<span class=${t}>${e}\n</span>`})}</pre>`}_renderWarnings(e){const t=e.filter(e=>!Et(e));return t.length?we("warning",K`${this._t("deployWarnings")}${this._renderIssues(t)}`):j}_renderDeployDialog(){const e=this._deploy;if(!e)return j;const t=this._t,{preview:i,result:r}=e;let s=K`<p>${t("loading")}</p>`,n=!1;if(r)s=K`
        ${"invalid"===r.status?K`${we("error",t("deployInvalid"))}${this._renderIssues(yt(r.errors??[]))}`:we("success",t("written"===r.status?"deployWritten":"deployUnchanged",{path:r.path}))}
        ${r.installed_fixtures?.length?we("info",t("deployFixturesInstalled",{files:r.installed_fixtures.join(", ")})):j}
        ${this._renderWarnings(r.warnings??[])}
        ${r.check_error?we("error",K`${t("deployCheckError")}<pre>${r.check_error}</pre>`):j}
        ${"invalid"!==r.status&&!1===r.included?we("warning",t("deployNotIncluded")):j}
        ${r.restart_required?we("info",t("deployRestart")):j}
      `;else if(i){const e=yt(i.errors);n=!e.length,s=K`
        <p class="muted">${t("deployTarget",{path:i.path})}</p>
        ${e.length?K`${we("error",t("deployInvalid"))}${this._renderIssues(e)}`:K`${this._renderWarnings(i.errors)}
            ${i.changed?this._renderDiff(i.diff):we("info",t("deployNoChanges"))}`}
      `}return K`
      <artnetui-dialog
        open
        wide
        .heading=${t("deployTitle")}
        .closeLabel=${t("close")}
        @closed=${()=>!e.busy&&(this._deploy=void 0)}
      >
        ${e.error?we("error",t("deployFailed",{error:e.error})):j}
        ${s}
        ${r?.restart_required||r&&!1===r.included?K`<button slot="actions" @click=${()=>{this._deploy=void 0,Dt("/config/repairs")}}>${t("openRepairs")}</button>`:j}
        <button slot="actions" ?disabled=${e.busy} @click=${()=>this._deploy=void 0}>
          ${t(r?"close":"cancel")}
        </button>
        ${r?j:K`<button slot="actions" class="primary" ?disabled=${!n||e.busy} @click=${this._runDeploy}>
              ${e.busy&&i?t("deploying"):t("deployAction")}
            </button>`}
      </artnetui-dialog>
    `}_renderConfirmDialog(){const e=this._confirm;if(!e)return j;const t=this._t;return K`
      <artnetui-dialog open .heading=${t(e.title)} .closeLabel=${t("close")} @closed=${()=>this._confirm=void 0}>
        <p>${t(e.text)}</p>
        <button slot="actions" @click=${()=>this._confirm=void 0}>${t("cancel")}</button>
        <button slot="actions" class="primary" @click=${()=>{this._confirm=void 0,e.action()}}>${t("confirm")}</button>
      </artnetui-dialog>
    `}_renderLibrary(){return this._libraryOpen&&this.hass?K`
      <artnetui-fixture-library
        .hass=${this.hass}
        .t=${this._t}
        .library=${this._fixtures}
        @fixtures-changed=${()=>{this._loadFixtures()}}
        @closed=${()=>this._libraryOpen=!1}
      ></artnetui-fixture-library>
    `:j}_renderHeader(){return this.embedded?j:K`
      <div class="header">
        ${xe("ha-menu-button")?K`<ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>`:j}
        <div class="title">${this._t("title")}</div>
        <span class="version">v${Ct}</span>
      </div>
    `}_renderEditor(){return K`
      <artnetui-dmx-editor
        .config=${this._dmx}
        .fixtures=${this._fixtures?.fixtures}
        .issues=${this._issues}
        .t=${this._t}
        @config-changed=${e=>this._setConfig(e.detail.config)}
        @open-library=${()=>this._libraryOpen=!0}
      ></artnetui-dmx-editor>
    `}render(){const e=this._t;let t;return t=this._loadError?K`${we("error",`${e("loadError")}: ${this._loadError}`)}
        <div class="row"><button @click=${this._load}>${e("reload")}</button></div>`:this._config?K`${this._renderBanners()} ${this._renderToolbar()} ${this._renderEditor()}`:K`<p class="muted">${e("loading")}</p>`,K`
      ${this._renderHeader()}
      <div class="content">${t}</div>
      ${this._renderDeployDialog()} ${this._renderLibrary()} ${this._renderConfirmDialog()}
    `}static{this.styles=[be,o`
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
    `]}}e([ue({attribute:!1})],Nt.prototype,"hass",void 0),e([ue({type:Boolean,reflect:!0})],Nt.prototype,"narrow",void 0),e([ue({attribute:!1})],Nt.prototype,"panel",void 0),e([ue({type:Boolean,reflect:!0})],Nt.prototype,"embedded",void 0),e([he()],Nt.prototype,"_doc",void 0),e([he()],Nt.prototype,"_issues",void 0),e([he()],Nt.prototype,"_status",void 0),e([he()],Nt.prototype,"_fixtures",void 0),e([he()],Nt.prototype,"_loadError",void 0),e([he()],Nt.prototype,"_saving",void 0),e([he()],Nt.prototype,"_toast",void 0),e([he()],Nt.prototype,"_menuOpen",void 0),e([he()],Nt.prototype,"_confirm",void 0),e([he()],Nt.prototype,"_deploy",void 0),e([he()],Nt.prototype,"_libraryOpen",void 0),e([pe("input[type=file]")],Nt.prototype,"_fileInput",void 0),_e("dmx-config-ui-panel",Nt);const Ot="dmx-config-ui";class Mt extends ae{setConfig(e){}getCardSize(){return 12}getGridOptions(){return{columns:"full",min_columns:6}}static getStubConfig(){return{}}render(){return K`<ha-card>
      <dmx-config-ui-panel embedded .hass=${this.hass}></dmx-config-ui-panel>
    </ha-card>`}static{this.styles=o`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
  `}}e([ue({attribute:!1})],Mt.prototype,"hass",void 0),_e(Ot,Mt);const Ut=window;Ut.customCards=Ut.customCards??[],Ut.customCards.some(e=>e.type===Ot)||Ut.customCards.push({type:Ot,name:"DMX Config UI",description:"Visual editor for ha-artnet-led Art-Net and DMX configurations (admin only)."});
//# sourceMappingURL=dmx-config-ui.js.map
