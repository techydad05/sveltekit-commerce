// import { browser } from "$app/environment";
import { getCollections } from "$lib/store";

export async function load() {
    const res = await getCollections();
    if (res.response.status === 200) {
        return {
            collections: res.collections
        }
    } else {
        throw error("No Page Data ...")
    }
}