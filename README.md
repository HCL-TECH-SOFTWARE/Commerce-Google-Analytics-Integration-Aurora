# GA-Integration-Aurora-POC

**The Proof of concept to provide the capability tracking the Aurora Application using Google Analytics .**


**DISCLAIMER: This Proof of Concept asset is being provided as-is to help accelerate your projects. As such, we are unable to provide official support for this asset. We have provided documentation as well as any needed code artifacts for your use.**

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
 
   

      




 
