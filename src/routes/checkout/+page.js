import { browser } from '$app/environment';
export async function load({ fetch } ) {
    if(browser) {
      const lineItems = localStorage.getItem('lineitems');
      const response = await fetch('/medusa', { method: 'POST', body: JSON.stringify({lineItems})});
      const responseData = await response.json();
      console.log("response:", responseData);      
      return responseData;
    }

    return {};
}