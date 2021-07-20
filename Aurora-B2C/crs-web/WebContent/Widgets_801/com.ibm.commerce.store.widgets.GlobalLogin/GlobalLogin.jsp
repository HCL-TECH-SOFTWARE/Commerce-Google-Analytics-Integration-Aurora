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

<!-- BEGIN GlobalLogin.jsp -->

<%@ include file= "/Widgets_801/Common/EnvironmentSetup.jspf" %>
<%@ include file= "/Widgets_801/Common/ErrorMessageSetup.jspf" %>

<%@ include file="ext/GlobalLogin_Data.jspf" %>
<c:if test = "${param.custom_data ne 'true'}">
    <%@ include file="GlobalLogin_Data.jspf" %>
</c:if>

<c:if test="${empty includedGlobalLoginJS}">
	<c:set var="includedGlobalLoginJS" value="includedGlobalLoginJS" scope="request"/>
	<script type="text/javascript">
		// GA Integration started
		$(document).ready(function() {
			GlobalLoginJS.setCommonParameters('<c:out value="${langId}"/>','<c:out value="${WCParam.storeId}"/>','<c:out value="${WCParam.catalogId}"/>');
			GlobalLoginShopOnBehalfJS.setBuyerSearchURL('<c:out value="${GlobalLoginShopOnBehalf_buyerSearchURL}"/>');
			gaDataService.setUserDetail("${userLogonState}","${userId}");
		});
		// GA Integration ended
	</script>
</c:if>
<script type="text/javascript">
    $(document).ready(function() {
        GlobalLoginJS.registerWidget('<c:out value="${widgetId}"/>');
        GlobalLoginShopOnBehalfJS.registerShopOnBehalfPanel('${shopOnBehalfPanelId}', '${shopForSelfPanelId}');
    });
</script>

<%@ include file="ext/GlobalLoginSignIn_UI.jspf" %>
<c:if test = "${userLogonState == '0'}">
    <%@ include file="GlobalLoginSignIn_UI.jspf" %>
</c:if>

<%@ include file="ext/GlobalLoginSignOut_UI.jspf" %>
<c:if test = "${userLogonState == '1'}">
    <%@ include file="GlobalLoginSignOut_UI.jspf" %>
</c:if>

<!-- END GlobalLogin.jsp -->
