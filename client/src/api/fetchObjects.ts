
const api_link = '';



export async function fetchAll(type: string, page: string, sort: string, roomQuantity: string[]) {
    try {
        const link = new URL(`${api_link}/api/${type}`)
        link.searchParams.append('page', page);
        link.searchParams.append('sort', sort);
        //if (roomQuantity) link.searchParams.append('roomQuantity', String(roomQuantity));
        if (roomQuantity && roomQuantity.length > 0) {
            if (roomQuantity.includes('studio')) {
                link.searchParams.append('roomQuantity', String(roomQuantity));
            } else if (roomQuantity.length > 1) {
                
                const roomNumber = roomQuantity.map((v) => Number(v))
                const min = Math.min(...roomNumber);
                const max = Math.max(...roomNumber);
                link.searchParams.append('rooms[max]', String(max));
                link.searchParams.append('rooms[min]', String(min));
            }  else {
                link.searchParams.append('roomQuantity', String(roomQuantity));
            }
        }
        const res = await fetch(link);

        if (res.ok) {
            const data = await res.json();
            return data
        } else throw Error('Прокладка между сервером сифонит')
    } catch(e) {
        console.error((e as Error).message + ' Вот такие пироги. С котятами')
        throw e;
    }

}

export async function fetchAllMap(type: string, page: string, sort: string, roomQuantity: string[]) {
    try {
        const link = new URL(`${api_link}/api/${type}/map`, window.location.origin)
        link.searchParams.append('page', page);
        link.searchParams.append('sort', sort);
        //if (roomQuantity) link.searchParams.append('roomQuantity', String(roomQuantity));
        if (roomQuantity && roomQuantity.length > 0) {
            if (roomQuantity.includes('studio')) {
                link.searchParams.append('roomQuantity', String(roomQuantity));
            } else if (roomQuantity.length > 1) {
                
                const roomNumber = roomQuantity.map((v) => Number(v))
                const min = Math.min(...roomNumber);
                const max = Math.max(...roomNumber);
                link.searchParams.append('rooms[max]', String(max));
                link.searchParams.append('rooms[min]', String(min));
            }  else {
                link.searchParams.append('roomQuantity', String(roomQuantity));
            }
        }
        const res = await fetch(link);

        if (res.ok) {
            const data = await res.json();
            return data
        } else throw Error('Прокладка между сервером сифонит')
    } catch(e) {
        console.error((e as Error).message + ' Вот такие пироги. С котятами')
        throw e;
    }

}

export async function fetchId(id: number, type: string) {
    try{
        const link = new URL(`${api_link}/api/${type}/${id}`) 
        const res = await fetch(link);
        if (!res.ok) return {error: `Прокладка между сервером сифонит`};
        return res.json();
    } catch(e) {
        console.error((e as Error).message + ' Вот такие пироги. С котятами. А ты думал?')
    }
}

export async function postOrder(id: number, name: string, phone: string) {

    try{
        const link = new URL(`${api_link}/api/post_order`);
        const res = await fetch(link, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({id, name, phone})
        });
        if (!res.ok) return {error: `Прокладка между сервером сифонит, проверь`}
        return res.json();
    } catch(e) {
        console.error((e as Error).message + `Вот такие вот котята в пирожках`);
    }
}