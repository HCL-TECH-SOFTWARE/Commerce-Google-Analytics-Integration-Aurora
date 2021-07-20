/*
	*==================================================
	Copyright [2021] [HCL Technologies]
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
	    http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
	*==================================================
 */

window.dataLayer = window.dataLayer || [];
const PAGE_LOAD = "pageLoad";
const NAVIGATION_CLICK = "navigationClick";
const FORM_COMPLETION = "formCompletion";
const PRODUCT_IMPRESSION = "productImpression";
const PRODUCT_CLICK = "productClick";
const PRODUCT_DETAIL = "productDetail";
const ADD_TO_CART = "addToCart";
const REMOVE_FROM_CART = "removeFromCart";
const PROMO_VIEW = "promoView";
const PROMOTION_CLICK = "promotionClick";
const PURCHASE = "purchase";
const CHECK_OUT = "checkout";
const CHECK_OUT_OPTION = "checkoutOption";
const HOME = "Home";
const ONSITE_SEARCH = "Onsite Search";
const LISTER = "Lister";
const PDP = "PDP";
const CHECKOUT = "Checkout";
const CONTENT = "Content";

const GTMDLService = {

    initailizeGTM(userData) {
        var gtmID = userData['google.tag.manager.container.id'];
        var gtmAuthID = userData['google.tag.manager.auth'];
        var preview_id = userData['google.tag.manager.preview'];

        var newScript = document.createElement("script");
        var inlineScript = document.createTextNode("(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=" + gtmAuthID + "&gtm_preview=" + preview_id + "&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" + gtmID + "');");
        newScript.appendChild(inlineScript);
        document.getElementsByTagName('head')[0].appendChild(newScript);

        var bodyScript = document.createElement("noscript");
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", "https://www.googletagmanager.com/ns.html?id=" + gtmID + "&gtm_auth=" + gtmAuthID + "&gtm_preview=" + preview_id + "&gtm_cookies_win=x");
        iframe.setAttribute("height", "0");
        iframe.setAttribute("width", "0");
        iframe.setAttribute("style", "display:none;visibility:hidden");
        bodyScript.appendChild(iframe);
        document.body.insertBefore(bodyScript, document.body.firstChild);
    },
    /**
     * Measure Page View of the pages user visits
     * `@method`
     * `@name GTM#measurePageView`
     *
     * `@param {any} pageObj`  object and have following properties:
     ** `@property {string} login (required)` login status i.e logged In / Logged Out.
     ** `@property {string} userID (required)`The unique Id assigned to User.
     ** `@property {string} pageTitle ` The title of the page.
     ** `@property {string} pagePath ` The path of the Page.
     ** `@property {string} pageCategory ` The category to which the page belongs.
     ** `@property {string} pageSubcategory ` The subCategory of the page.
     ** `@property {string} onsiteSearch ` The status of the search whether successful search or zero result.
     ** `@property { string} searchTerm `  The search Text.
     ** `@property {number} productResults ` The total count of the products on search page .
     ** `@property { number} listerResults `  The total count of the products on lister page.
     **
     **/
    measurePageView(pageObj) {
        const dataLayer = {
            event: PAGE_LOAD,
            login: pageObj.login,
            userID: pageObj.userID || 0,
            pageTitle: pageObj.pageTitle,
            pagePath: pageObj.pagePath,
            pageCategory: pageObj.pageCategory || "",
            pageSubCategory: pageObj.pageSubCategory || "",
            onsiteSearch: pageObj.onsiteSearch || "",
            searchTerm: pageObj.searchTerm || "",
            productResults: pageObj.productResults >= 0 ? pageObj.productResults : "",
            listerResults: pageObj.listerResults || "",
        };
        console.log("pageView --", dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     * Measure click event on MenuItems as part of Navigation
     * `@method`
     * `@name GTM#measureNavigationClick`
     *
     * `@param {string} eventAction` navigationHeader      e.g. Main, Living Room,Bath etc
     * `@param {any} eventLabel` Click menu Text e.g. Furniture
     **
     **/
    measureNavigationClick(eventAction, eventLabel) {
        const dataLayer = {
            event: NAVIGATION_CLICK,
            eventAction,
            eventLabel,
        }

        console.log("Navigation Click --", dataLayer);
        window.dataLayer.push(dataLayer);
    },

    /**
     * Measure  successful completion of Forms
     * `@method`
     * `@name GTM#measureFormCompletion`
     *
     * `@param {string} eventAction` Form name   e.g. Signup,Account registration etc.
     **/
    measureFormCompletion(eventAction) {
        const dataLayer = {
            event: FORM_COMPLETION,
            eventAction,
        }
        //   console.log("Form Completion --",dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     * Measure product impressions by using the impression action and one or more impressionFieldObjects
     * `@method`
     * `@name GTM#measureProductImpression`
     *
     * `@param {string} currencyCode` Currency e.g ('EUR')
     *
     * `@param {any} productArr` array of object and have following properties:
     ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
     ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
     ** `@property {string} list ` The list or collection to which the product belongs (e.g. Search Results).
     ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
     ** `@property {string} category ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
     ** `@property {string} variant ` The variant of the product (e.g. Black).
     ** `@property {number} position ` The product's position in a list or collection (e.g. 2).
     ** `@property { number} price `  The price of a product (e.g. 29.20).
     **/
    measureProductImpression(productArr, currencyCode) {
        let impressions = [];

        productArr.forEach((product) => {
            const impressionObj = {
                name: product.name,
                id: product.id,
                ...(product.price && { price: product.price }),
                ...(product.brand && { brand: product.brand }),
                ...(product.category && { category: product.category }),
                ...(product.variant && { variant: product.variant }),
                ...(product.list && { list: product.list }),
                ...(product.position && { position: product.position }),
            };
            impressions.push(impressionObj);
        });
        const dataLayer = {
            event: PRODUCT_IMPRESSION,
            ecommerce: {
                currencyCode: currencyCode || "",
                impressions,
            }
        }

        console.log("Product Impression --", dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     * Measure clicks on product links by pushing a click action to the data layer, along with a productFieldObject to represent the clicked product.
     * `@method`
     * `@name GTM#measureProductClick`
     *
     *
     * `@param {any} productObj`  object and have following properties:
     ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
     ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
     ** `@property {string} list ` The list or collection to which the product belongs (e.g. Search Results).
     ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
     ** `@property {string} cat ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
     ** `@property {string} variant ` The variant of the product (e.g. Black).
     ** `@property {number} position ` The product's position in a list or collection (e.g. 2).
     ** `@property { number} price `  The price of a product (e.g. 29.20).
     **/
    measureProductClick(productObj) {
        const dataLayer = {
            event: PRODUCT_CLICK,
            ecommerce: {
                click: {
                    actionField: { list: productObj.list || "Search result" },
                    products: [
                        {
                            name: productObj.name,
                            id: productObj.id,
                            ...(productObj.price && { price: productObj.price }),
                            ...(productObj.brand && { brand: productObj.brand }),
                            ...(productObj.category && { category: productObj.category }),
                            ...(productObj.variant && { variant: productObj.variant }),
                            ...(productObj.position && { position: productObj.position }),
                        },
                    ],
                },
            },
        };

        console.log("Product click --", dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     * Measure a view of product details by pushing a detail action to the data layer, along with one or more productFieldObjects representing the products being viewed.
     * `@method`
     * `@name GTM#measureViewOfProductDetail`
     *
     *
     * `@param {any} productObj`  object and have following properties:
     ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
     ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
     ** `@property {string} list ` The list or collection to which the product belongs (e.g. Search Results).
     ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
     ** `@property {string} category ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
     ** `@property {string} variant ` The variant of the product (e.g. Black).
     ** `@property { number} price `  The price of a product (e.g. 29.20).
     **/
    measureViewOfProductDetail(productObj) {
        const dataLayer = {
            event: PRODUCT_DETAIL,
            ecommerce: {
                detail: {
                    actionField: { list: productObj.list || "" },
                    products: [
                        {
                            name: productObj.name,
                            id: productObj.id,
                            ...(productObj.price && { price: productObj.price }),
                            ...(productObj.brand && { brand: productObj.brand }),
                            ...(productObj.category && { category: productObj.category }),
                            ...(productObj.variant && { variant: productObj.variant }),
                        },
                    ],
                },
            },
        };
        console.log("Product Detail Page Event --", dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     *  Measure adding a product to a shopping cart by using an 'add' actionFieldObject and a list of productFieldObjects.
     * `@method`
     * `@name GTM#measureAddToCart`
     *
     *
     * `@param {any} productObj`  object and have following properties:
     ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
     ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
     ** `@property {string} currency ` Currency e.g EUR
     ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
     ** `@property {string} cat ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
     ** `@property {string} variant ` The variant of the product (e.g. Black).
     ** `@property { number} price `  The price of a product (e.g. 29.20).
     ** `@property { number} quantity `  The quantity of a product (e.g. 2).
     **/
    measureAddToCart(productObj) {
        if (productObj && productObj.length > 0) {
            productObj.forEach((product) => {
                const dataLayer = {
                    event: ADD_TO_CART,
                    ecommerce: {
                        ...(product.currency && { currencyCode: product.currency }),
                        add: {
                            products: [
                                {
                                    name: product.name,
                                    id: product.id,
                                    ...(product.price && { price: product.price }),
                                    ...(product.brand && { brand: product.brand }),
                                    ...(product.category && { category: product.category }),
                                    ...(product.variant && { variant: product.variant }),
                                    ...(product.quantity && { quantity: product.quantity }),
                                },
                            ],
                        },
                    },
                };
                console.log("Add to Cart--", dataLayer);
                window.dataLayer.push(dataLayer);
            });
        }
    },
    /**
     *  Measure the removal of a product from a shopping cart by using an 'remove' actionFieldObject.
     * `@method`
     * `@name GTM#measureRemoveFromCart`
     *
     *
     * `@param {any} productObj`  object and have following properties:
     ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
     ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
     ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
     ** `@property {string} cat ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
     ** `@property {string} variant ` The variant of the product (e.g. Black).
     ** `@property { number} price `  The price of a product (e.g. 29.20).
     ** `@property { number} quantity `  The quantity of a product (e.g. 2).
     **/
    measureRemoveFromCart(productObj) {
        const dataLayer = {
            event: REMOVE_FROM_CART,
            ecommerce: {
                remove: {
                    products: [
                        {
                            name: productObj.name,
                            id: productObj.id,
                            ...(productObj.price && { price: productObj.price }),
                            ...(productObj.brand && { brand: productObj.brand }),
                            ...(productObj.cat && { category: productObj.cat }),
                            ...(productObj.variant && { variant: productObj.variant }),
                            ...(productObj.quantity && { quantity: productObj.quantity }),
                        },
                    ],
                },
            },
        };
        console.log("Remove from CART --", dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     *  Measure a promotion impression,
     * set the promoView key in your ecommerce data layer var to a promoFieldObject that describes the promotions displayed to users on the page.
     * `@method`
     * `@name GTM#measurePromotionImpressions`
     *
     *
     * `@param {any} PromoArr`  object Array and Promo object have following properties:
     ** `@property {string} id (required)` The promotion ID (e.g. PROMO_1234).
     ** `@property {string} name (required)` The name of the promotion (e.g. Summer Sale).
     ** `@property {string} creative ` The creative associated with the promotion (e.g. summer_banner2).
     ** `@property {string} position `  The position of the creative (e.g. banner_slot_1).
     **/
    measurePromotionImpressions(PromoArr) {
        let promotions = [];
        PromoArr.forEach((promo) => {
            const impressionObj = {
                name: promo.name,
                id: promo.id,
                ...(promo.creative && { creative: promo.creative }),
                ...(promo.position && { brand: promo.position }),
            };
            promotions.push(impressionObj);
        });
        const dataLayer = {
            event: PROMO_VIEW,
            ecommerce: {
                promoView: {
                    promotions,
                },
            },
        };
        console.log("Promotion Impressions--", dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     *  To measure a click on a promotion, push the promoClick action to the data layer with an array containing a promoFieldObject describing the clicked promotion
     * `@method`
     * `@name GTM#measurePromotionClick`
     *
     *
     * `@param {any} promoObj`  Promo object have following properties:
     ** `@property {string} id (required)` The promotion ID (e.g. PROMO_1234).
     ** `@property {string} name (required)` The name of the promotion (e.g. Summer Sale).
     ** `@property {string} creative ` The creative associated with the promotion (e.g. summer_banner2).
     ** `@property {string} position `  The position of the creative (e.g. banner_slot_1).
     **/
    measurePromotionClick(promoObj) {
        const dataLayer = {
            event: PROMOTION_CLICK,
            ecommerce: {
                promoClick: {
                    promotions: [
                        {
                            name: promoObj.name,
                            id: promoObj.id,
                            ...(promoObj.creative && { creative: promoObj.creative }),
                            ...(promoObj.position && { brand: promoObj.position }),
                        },
                    ],
                },
            },
        };
        console.log("Promotion click --", dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     *  Measure transaction details into the Data Layer using the purchase action.
     * `@method`
     * `@name GTM#measuringPurchases`
     *
     *
     * `@param {any} purchaseObj`  object and have following properties:
     * `@property {string} purchaseId (required)` The transaction ID (e.g. T1234).
     * `@property {string} affiliation `The store or affiliation from which this transaction occurred (e.g. Emerald Store).
     * `@property {number} totalcost ` the total revenue or grand total associated with the transaction (e.g. 11.99).
     *  This value may include shipping, tax costs, or other adjustments to total revenue that you want to include as part of your revenue calculations.
     * `@property {number} tax ` The total tax associated with the transaction.
     * `@property {number} shippingcost ` The shipping cost associated with the transaction.
     * `@property {string} discount `he transaction coupon redeemed with the transaction.
     *
     * * `@property {any} productArr ` arry of product obj and object have following properties:
     ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
     ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
     ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
     ** `@property {string} category ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
     ** `@property {string} variant ` The variant of the product (e.g. Black).
     ** `@property { number} price `  The price of a product (e.g. 29.20).
     ** `@property { number} quantity `  The quantity of a product (e.g. 2).
     **/
    measuringPurchases(purchaseObj) {
        let products = [];
        purchaseObj.cartItemsArr.forEach((product) => {
            const productObj = {
                name: product.name,
                id: product.id,
                ...(product.price && { price: product.price }),
                ...(product.brand && { brand: product.brand }),
                ...(product.category && { category: product.category }),
                ...(product.variant && { variant: product.variant }),
                ...(product.quantity && { quantity: product.quantity }),
                ...(product.coupon && { coupon: product.coupon }),
            };
            products.push(productObj);
        });
        const dataLayer = {
            event: PURCHASE,
            ecommerce: {
                ...(purchaseObj.currency && { currencyCode: purchaseObj.currency }),
                purchase: {
                    actionField: {
                        id: purchaseObj.purchaseId,
                        affiliation: purchaseObj.affiliation || "Online Store",
                        revenue: purchaseObj.totalcost || 0,
                        tax: purchaseObj.tax || 0,
                        shipping: purchaseObj.shippingcost || 0,
                        coupon: purchaseObj.discount || ""
                    },
                    products,
                },
            },
        };
        console.log("Purchase Event --", dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     *  Measure checkout process into the Data Layer using the checkout action.
     * `@method`
     * `@name GTM#measureCheckout`   *
     *
     * `@param {any} orderObj`  object and have following properties:
     * `@property {number} step (required)` The checkout step number .
     * `@property {string} value (required)`The name of the checkout step (e.g. Shipping and Billing).
     *
     * * `@property {any} productArr ` arry of product obj and object have following properties:
     ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
     ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
     ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
     ** `@property {string} category ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
     ** `@property {string} variant ` The variant of the product (e.g. Black).
     ** `@property { number} price `  The price of a product (e.g. 29.20).
     ** `@property { number} quantity `  The quantity of a product (e.g. 2).
     **/
    measureCheckout(orderObj) {
        let products = [];

        orderObj.productArr.forEach((product) => {
            const productObj = {
                name: product.name,
                id: product.id,
                ...(product.price && { price: product.price }),
                ...(product.brand && { brand: product.brand }),
                ...(product.category && { category: product.category }),
                ...(product.variant && { variant: product.variant }),
                ...(product.quantity && { quantity: product.quantity }),
            };
            products.push(productObj);
        });
        const dataLayer = {
            event: CHECK_OUT,
            ecommerce: {
                checkout: {
                    actionField: { step: orderObj.step, option: orderObj.value },
                    products,
                },
            },
        };
        console.log("Checkout Event --", dataLayer);
        window.dataLayer.push(dataLayer);
    },
    /**
     *  Measure checkout Option .
     * The checkout option is useful in cases where you've already measured a checkout step
     * but you want to capture additional information about the same checkout step
     * `@method`
     * `@name GTM#measureCheckout`   *
     *
     * `@param {string} step`  checkout step number
     * `@param {string} checkoutOption `additional information about the same checkout step e.g VISA
     **/
    measureCheckoutOption(step, checkoutOption) {
        const dataLayer = {
            event: CHECK_OUT_OPTION,
            ecommerce: {
                checkout_option: {
                    actionField: { step: step, option: checkoutOption },
                },
            },
        };
        console.log("Checkout Extra Info --", dataLayer);
        window.dataLayer.push(dataLayer);
    }
};

