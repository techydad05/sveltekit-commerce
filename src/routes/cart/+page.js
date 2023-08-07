import Medusa from "@medusajs/medusa-js";

export async function load() {
    let baseUrl = "http://192.168.1.42:9002";

    const medusa = new Medusa({ baseUrl: baseUrl, maxRetries: 3 });

    let usRegionId = "";

    // let regions = await medusa.regions.list();
    // regions.regions.forEach((ele) => {
    //     ele.countries.forEach((val) => {
    //         if (val.iso_2 == "us") {
    //             usRegionId = ele.id;
    //         }
    //     });
    // });
    return { medusa: medusa };
}