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
var logonState = 0;
var userID = -1002;
var breadcrumbArr = {};
var purchaseArr = {};
var cartItemsArr = [];

const gaDataService = {

    setBreadCrumbArr(arr, lastcategory) {
        breadcrumbArr = {
            category: Object.keys(arr),
            subcategory: lastcategory
        }
    },

    getBreadCrumbArr() {
        return breadcrumbArr.category;
    },

    getBreadCrumblastElem() {
        return breadcrumbArr.subcategory;
    },

    setUserDetail(logonStatus, userId) {
        logonState = logonStatus;
        userID = userId;
    },

    getUserDetail() {
        return {
            login: parseInt(logonState) === 1 ? "logged In" : "logged Out",
            userID: userID
        };
    },

    setPurchaseDetails(order) {
        purchaseArr = {
            affiliation: order.channel.channelIdentifer.channelName,
            coupon: order.adjustment[0].code,
            id: order.orderId,
            revenue: order.grandTotal,
            shipping: order.totalShippingCharge,
            tax: order.totalSalesTax,
            currency: order.grandTotalCurrency
        };
    },

    getPurchaseDetails() {
        return purchaseArr;
    },

    sendDataItems(pgorder, itemdetails) {
        cartItemsArr = pgorder.map((order) => {
            return {
                id: order.partNumber,
                name: itemdetails[order.productId]["name"],
                price: order.unitPrice,
                quantity: order.unitQuantity
            }
        });
    },

    getPageDetail() {
        return {
            pagePath: window.location.pathname,
            pageTitle: document.title
        }
    },

    sendHomePageViewEvent() {
        const obj = {
            pageCategory: "Home",
            pageSubCategory: "Home",
            ...this.getUserDetail(),
            ...this.getPageDetail()
        };
        GTMDLService.measurePageView(obj);
    },

    sendMyAccountPageViewEvent() {
        const obj = {
            pageCategory: this.getBreadCrumblastElem(),
            pageSubCategory: this.getBreadCrumblastElem(),
            ...this.getUserDetail(),
            ...this.getPageDetail()
        };
        GTMDLService.measurePageView(obj);
    },

    sendSearchPageViewEvent(productListTotal, searchTerm) {
        const obj = {
            pageCategory: "Onsite Search",
            onsiteSearch: productListTotal > 0 ? "Successful Search" : "Zero Search",
            searchTerm,
            productResults: productListTotal,
            ...this.getUserDetail(),
            pageTitle: this.getPageDetail().pageTitle,
            pagePath: this.getPageDetail().pagePath + "?searchTerm=" + searchTerm
        };
        GTMDLService.measurePageView(obj);
    },

    sendListerPageViewEvent(productListTotal) {
        const obj = {
            pageCategory: "Lister",
            pageSubCategory: this.getBreadCrumbArr().join("/"),
            listerResults: productListTotal,
            ...this.getUserDetail(),
            ...this.getPageDetail()
        };
        GTMDLService.measurePageView(obj);
    },

    sendPDPPageViewEvent() {
        const obj = {
            pageCategory: "PDP",
            pageSubCategory: this.getBreadCrumbArr().join("/"),
            ...this.getUserDetail(),
            ...this.getPageDetail()
        };
        GTMDLService.measurePageView(obj);
    },

    sendCheckoutPageViewEvent(pageSubCategory) {
        const obj = {
            pageCategory: "Checkout",
            pageSubCategory,
            ...this.getUserDetail(),
            ...this.getPageDetail()
        };
        GTMDLService.measurePageView(obj);
    },

    sendCartPageViewEvent() {
        const obj = {
            pageCategory: "Cart",
            pageSubCategory: "Cart",
            ...this.getUserDetail(),
            ...this.getPageDetail()
        };
        GTMDLService.measurePageView(obj);
    },

    sendFormCompletionEvent(eventAction) {
        GTMDLService.measureFormCompletion(eventAction);
    },

    sendProductImpressionEvent(productList, listerFlag) {
        let currency = "";
        const productarr = productList.map((product, index) => {
            currency = this.getProductPrice(product.price).currency;
            return {
                name: product.name,
                id: product.partNumber,
                price: this.getProductPrice(product.price).price,
                category: listerFlag ? this.getBreadCrumbArr().join("/") : "",
                list: listerFlag ? this.getBreadCrumblastElem() : "Search Results",
                position: index + 1,
            };
        });
        GTMDLService.measureProductImpression(productarr, currency);
    },

    sendProductClickEvent(product, index, listerFlag) {
        const obj = {
            id: product.partNumber,
            name: product.name,
            price: this.getProductPrice(product.price).price,
            category: listerFlag ? this.getBreadCrumbArr().join("/") : "",
            list: listerFlag ? this.getBreadCrumblastElem() : "Search Results",
        };
        GTMDLService.measureProductClick(obj);
    },

    sendPDPDetailViewEvent(currentProdSelect) {
        const obj = {
            id: currentProdSelect.sku,
            name: this.getBreadCrumblastElem(),
            price: currentProdSelect.price,
            category: this.getBreadCrumbArr().join("/"),
            variant: "",
            list: this.getBreadCrumbArr()[this.getBreadCrumbArr().length - 1],
        };
        GTMDLService.measureViewOfProductDetail(obj);
    },

    sendPromotionImpression(promoArr) {
        GTMDLService.measurePromotionImpressions(promoArr);
    },

    sendPromotionClick(promo) {
        const { contentId, contentName } = promo;
        const promoObj = {
            id: contentId,
            name: contentName,
        };

        GTMDLService.measurePromotionClick(promoObj);
    },

    sendAddToCartEvent(currentProdSelect) {
        const { partNumber, productQty, productPrice } = currentProdSelect[0];
        const productObj = [];
        const obj = {
            id: partNumber,
            name: this.getBreadCrumblastElem(),
            price: productPrice,
            quantity: productQty,
            category: this.getBreadCrumbArr().join("/"),
            // variant: currentProdSelect["selectedAttributes"]["Color"]
            // || "",
            // currency: this.getProductPrice(price).currency,	
        };
        productObj.push(obj);
        GTMDLService.measureAddToCart(productObj);
    },

    sendRemoveFromCartEvent(partNumber, orderItemPrice, quantity, itemName) {
        const obj = {
            id: partNumber,
            name: itemName,
            price: parseFloat(orderItemPrice),
            quantity: parseInt(quantity),
        };
        GTMDLService.measureRemoveFromCart(obj);
    },

    sendCheckoutEvent(step, value) {
        var productArr = cartItemsArr;
        GTMDLService.measureCheckout({ step, value, productArr });
    },

    sendPurchaseEvent() {
        const {
            id,
            revenue,
            tax,
            shipping,
            coupon,
            currency
        } = purchaseArr;
        const obj = {
            purchaseId: id,
            totalcost: revenue,
            tax: tax,
            shippingcost: shipping,
            discount: coupon,
            currency: currency,
            cartItemsArr,
        };
        GTMDLService.measuringPurchases(obj);
    },

    /**
     * get the product offer price and display price
     * 
     * @param priceArray
     */
    getProductPrice(priceArray) {
        let productOfferPrice = 0;
        let prodDisplayPrice = 0;
        let currency = "";
        if (priceArray) {
            for (const price of priceArray) {
                if (price.usage === "Offer" && price.value !== "") {
                    productOfferPrice = parseFloat(price.value);
                    currency = price.currency;
                } else if (price.usage === "Display" && price.value !== "") {
                    prodDisplayPrice = parseFloat(price.value);
                    currency = price.currency;
                }
            }
        }
        const price =
            productOfferPrice > 0
                ? productOfferPrice
                : prodDisplayPrice > 0
                    ? prodDisplayPrice
                    : 0;
        return { price, currency };
    },
};
