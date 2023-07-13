import { getCollections } from "$lib/store";

export async function load() {
    const res = await getCollections()
    if (res.response.status === 200) {
        // console.log(res.collections)
        return {
            collections: res.collections
        }
        throw error(404)
    } else {
        throw error("No Page Data ...")
    }
}