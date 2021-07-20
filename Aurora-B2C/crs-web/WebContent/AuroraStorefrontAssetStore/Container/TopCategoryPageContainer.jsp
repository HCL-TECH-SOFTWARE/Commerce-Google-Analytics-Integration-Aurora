<%--
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
--%>

<!-- BEGIN TopCategoryPageContainer.jsp -->

<%@include file="../Common/EnvironmentSetup.jspf"%>
<%@taglib uri="http://commerce.ibm.com/pagelayout" prefix="wcpgl"%>
<script>
// GA Integration started
// Send Promotion impression event
$('document').ready(()=>{
	let promotionsElements = $('#container_${pageDesign.layoutId} div[id*="HeaderBanner_Content"]');
    	let promoArr =[];
	promotionsElements.each((index,element)=>{
		let id =element.id.substr(9,4);
		let name= $(element).find('div')[1].innerText;
		let promo={
			id,
			name
		};
		promoArr.push(promo);		
	});
	gaDataService.sendPromotionImpression(promoArr);
});
// GA Integration ended
</script>

<div class="rowContainer" id="container_${pageDesign.layoutId}">
	<div class="row margin-true">
		<div class="col12" data-slot-id="1"><wcpgl:widgetImport slotId="1"/></div>
	</div>
	<div class="row">
		<div class="col6 acol12" data-slot-id="2"><wcpgl:widgetImport slotId="2"/></div>
		<div class="col6 acol12" data-slot-id="3"><wcpgl:widgetImport slotId="3"/></div>
	</div>
	<div class="row margin-true">
		<div class="col8 acol12 ccol9 right" data-slot-id="4"><wcpgl:widgetImport slotId="4"/></div>
		<div class="col4 acol12 ccol3" data-slot-id="5"><wcpgl:widgetImport slotId="5"/></div>
		<div class="col8 acol12 ccol9 right">
			<div class="row margin-true">
				<div class="col6 acol12" data-slot-id="6"><wcpgl:widgetImport slotId="6"/></div>
				<div class="col6 acol12" data-slot-id="7"><wcpgl:widgetImport slotId="7"/></div>
			</div>
		</div>
		<div class="col8 acol12 ccol9 right" data-slot-id="8"><wcpgl:widgetImport slotId="8"/></div>
	</div>
</div>

<!-- END TopCategoryPageContainer.jsp -->
