import { browser } from '$app/environment';
export async function load({ fetch } ) {
    if(browser) {
      const userId = 'ejfsoeifj19ifw0e9fi93u093uf';
      const lineItems = localStorage.getItem('lineitems');
      const response = await fetch('/medusa', { method: 'POST', body: JSON.stringify({userId, lineItems})});
      const responseData = await response.json();
      console.log("response:", responseData);      
      return responseData;
    }

    return {};
}