"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const l=require("react");class A{constructor({appId:t,apiKey:n,customerApiToken:s,apiUrl:r="https://appapi.heymantle.com/v1"}){if(!t)throw new Error("MantleClient appId is required");if(typeof window<"u"&&n)throw new Error("MantleClient apiKey should never be used in the browser");this.appId=t,this.apiKey=n,this.customerApiToken=s,this.apiUrl=r}async mantleRequest({path:t,method:n="GET",body:s}){try{const r=`${this.apiUrl}${t.startsWith("/")?"":"/"}${t}${s&&n==="GET"?`?${new URLSearchParams(s)}`:""}`;return await(await fetch(r,{method:n,headers:{"Content-Type":"application/json",Accept:"application/json","X-Mantle-App-Id":this.appId,...this.apiKey?{"X-Mantle-App-Api-Key":this.apiKey}:{},...this.customerApiToken?{"X-Mantle-Customer-Api-Token":this.customerApiToken}:{}},...s&&n!=="GET"&&{body:JSON.stringify(s)}})).json()}catch(r){throw console.error(`[mantleRequest] ${t} error: ${r.message}`),r}}async identify({platformId:t,myshopifyDomain:n,platform:s="shopify",accessToken:r,name:a,email:c,customFields:m,createdAt:d}){return await this.mantleRequest({path:"identify",method:"POST",body:{platformId:t,myshopifyDomain:n,platform:s,accessToken:r,name:a,email:c,customFields:m,createdAt:d}})}async getCustomer(t){return(await this.mantleRequest({path:"customer",...t?{body:{id:t}}:{}})).customer}async subscribe({planId:t,planIds:n,discountId:s,returnUrl:r,billingProvider:a}){return await this.mantleRequest({path:"subscriptions",method:"POST",body:{planId:t,planIds:n,discountId:s,returnUrl:r,billingProvider:a}})}async cancelSubscription({cancelReason:t}={}){return await this.mantleRequest({path:"subscriptions",method:"DELETE",...t&&{body:{cancelReason:t}}})}async updateSubscription({id:t,cappedAmount:n}){return await this.mantleRequest({path:"subscriptions",method:"PUT",body:{id:t,cappedAmount:n}})}async sendUsageEvent({eventId:t,eventName:n,customerId:s,properties:r={}}){return await this.mantleRequest({path:"usage_events",method:"POST",body:{eventId:t,eventName:n,...s?{customerId:s}:{},properties:r}})}async sendUsageEvents({events:t}){return await this.mantleRequest({path:"usage_events",method:"POST",body:{events:t}})}async addPaymentMethod({returnUrl:t}){return await this.mantleRequest({path:"payment_methods",method:"POST",...t&&{body:{returnUrl:t}}})}async getUsageMetricReport({id:t,period:n}){return await this.mantleRequest({path:`usage_events/${t}/report`,...n&&{body:{period:n}}})}}var x={MantleClient:A};const h=l.createContext(),D=({feature:e,count:t=0})=>(e==null?void 0:e.type)==="boolean"?e.value:(e==null?void 0:e.type)==="limit"?t<e.value||e.value===-1:!1,U=({appId:e,customerApiToken:t,apiUrl:n="https://appapi.heymantle.com/v1",children:s})=>{const r=new x.MantleClient({appId:e,customerApiToken:t,apiUrl:n}),[a,c]=l.useState(null),[m,d]=l.useState(!0),p=async()=>{try{d(!0);const o=await r.getCustomer();c(o)}catch(o){console.error("[MantleProvider] Error fetching customer: ",o)}finally{d(!1)}},P=async o=>{await r.sendUsageEvent(o)},S=async({usageId:o,period:u})=>await r.getUsageMetricReport({id:o,period:u}),f=async({planId:o,planIds:u,discountId:T,billingProvider:L,returnUrl:R})=>await r.subscribe({planId:o,planIds:u,discountId:T,billingProvider:L,returnUrl:R}),w=async()=>await r.cancelSubscription(),E=async({returnUrl:o})=>await r.addPaymentMethod({returnUrl:o});l.useEffect(()=>{t&&p()},[t]);const M=(a==null?void 0:a.plans)||[],C=a==null?void 0:a.subscription;return l.createElement(h.Provider,{value:{customer:a,subscription:C,plans:M,loading:m,sendUsageEvent:P,getUsageReport:S,subscribe:f,cancelSubscription:w,addPaymentMethod:E,isFeatureEnabled:({featureKey:o,count:u=0})=>a!=null&&a.features[o]?D({feature:a.features[o],count:u}):!1,limitForFeature:({featureKey:o})=>a!=null&&a.features[o]&&currentPlan.features[o].type==="limit"?a.features[o].value:-1,refetch:async()=>{await p()}}},s)},q=()=>{const e=l.useContext(h);if(e===void 0)throw new Error("useMantle must be used within a MantleProvider");return e},y=e=>e.type==="boolean"&&e.value==!0||e.type==="limit"&&e.value!==0,F=(e,t)=>y(t)-y(e)||e.name.localeCompare(t.name),$=(e="USD")=>new Intl.NumberFormat("en-US",{style:"currency",currency:e,notation:"standard"}),O=(e,t="USD",n=!0)=>{let s=$(t).format(e);return n&&(s=s.replace(/\.00$/,"")),s},i={Annual:"ANNUAL",Every30Days:"EVERY_30_DAYS"},Y={Public:"public",CustomerTag:"customerTag",ShopifyPlan:"shopifyPlan",Customer:"customer",Hidden:"hidden"},b={Back:"Back",CurrentPlan:"Current plan",CustomPlans:"Custom plans",CustomPlansDescription:"Plans tailored to your specific needs",FreeTrialLength:"{{ trialDays }}-day free trial",Features:"Features",Month:"month",MonthShort:"mo",Monthly:"Monthly",Year:"year",YearShort:"yr",Yearly:"Yearly",MostPopular:"Most popular",Per:"/",Plans:"Plans",SelectPlan:"Select plan",SubscribeSuccessTitle:"Subscription successful",SubscribeSuccessBody:"Thanks for subscribing to our app!"},v=(e=i.Every30Days)=>{switch(e){case i.Annual:return"year";case i.Every30Days:default:return"month"}},g=(e=i.Every30Days)=>{switch(e){case i.Annual:return"yr";case i.Every30Days:default:return"mo"}},_=({interval:e=i.Every30Days,useShortFormPlanIntervals:t=!0})=>t?g(e):v(e),k=({plan:e,customFieldKey:t="recommended"})=>{var n;return!!((n=e.customFields)!=null&&n[t])},B=({plan:e,customFieldKey:t="buttonLabel"})=>{var n;return((n=e.customFields)==null?void 0:n[t])||b.SelectPlan},I=({plan:e})=>{var t;return((t=e.discounts)==null?void 0:t.length)>0?e.discounts.reduce((n,s)=>n.discountedAmount<s.discountedAmount?n:s):void 0},j=(e=4)=>e%4===0?{xs:6,sm:6,md:2,lg:3,xl:3}:e%3===0?{xs:6,sm:6,md:2,lg:4,xl:4}:e%2===0?{xs:6,sm:6,md:3,lg:6,xl:6}:e===1?{xs:6,sm:6,md:6,lg:12,xl:12}:{xs:6,sm:6,md:2,lg:4,xl:4},N=(e=4)=>e%4===0?4:e%3===0?3:e%2===0?2:e===1?1:4;exports.Labels=b;exports.MantleProvider=U;exports.PlanAvailability=Y;exports.PlanInterval=i;exports.columnCount=N;exports.columnSpan=j;exports.customButtonLabel=B;exports.featureEnabled=y;exports.featureSort=F;exports.highestDiscount=I;exports.intervalLabel=_;exports.intervalLabelLong=v;exports.intervalLabelShort=g;exports.isRecommendedPlan=k;exports.money=O;exports.useMantle=q;
