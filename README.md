# GA-Integration-Aurora-POC

## WARRANTY & SUPPORT 
HCL Software provides HCL Commerce open source assets “as-is” without obligation to support them nor warranties or any kind, either express or implied, including the warranty of title, non-infringement or non-interference, and the implied warranties and conditions of merchantability and fitness for a particular purpose. HCL Commerce open source assets are not covered under the HCL Commerce master license nor Support contracts.

If you have questions or encounter problems with an HCL Commerce open source asset, please open an issue in the asset's GitHub repository. For more information about [GitHub issues](https://docs.github.com/en/issues), including creating an issue, please refer to [GitHub Docs](https://docs.github.com/en). The HCL Commerce Innovation Factory Team, who develops HCL Commerce open source assets, monitors GitHub issues and will do their best to address them. 

## HCLC GA-Aurora Integration Asset

**The Proof of concept to provide the capability tracking the Aurora Application using Google Analytics .**

**Prerequisites: HCL Commerce V9.1.2 and prior / HCL Commerce Aurora Storefront**

    
**The Implementation includes below Component**

 1. Google Analytics Account
 
 2. Google Tag Manager Account
 
 3. Aurora Storefront Changes(B2B and B2C)
 
 4. DB Changes
    
**Below are the DB Script that need to be run on the DB**

Aurora B2C and B2B
  
     INSERT INTO STORECONF (STOREENT_ID, NAME, VALUE, OPTCOUNTER) VALUES (<STORE_ID>, 'google.tag.manager.container.id', '<GTM_ID>', 0);

     INSERT INTO STORECONF (STOREENT_ID, NAME, VALUE, OPTCOUNTER) VALUES (<STORE_ID>, 'google.tag.manager.auth', '<GTM_AUTH_ID>', 0);

     INSERT INTO STORECONF (STOREENT_ID, NAME, VALUE, OPTCOUNTER) VALUES (<STORE_ID>, 'google.tag.manager.preview','<GTM_PREVIEW>', 0);

    
    
    
**Aurora Storefront Changes**    
  
  **Aurora B2C** - Please refer the document placed inside folder(GA-Integration-Aurora-POC/Aurora-B2C/ImplementationGuide_GA360Integration_AuroraB2C.docx) for the implemenatation details
  
     
 **Aurora B2B** - Please refer the document placed inside folder(GA-Integration-Aurora-POC/AuroraB2B/ImplementationGuide_GA360Integration_AuroraB2B.docx) for the implemenatation details
 
   

      




 
