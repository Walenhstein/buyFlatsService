import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const app = express();
const api_key = process.env.api_key;
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({ origin: [
        'http://localhost:5173',
        'https://buyflatsservice-8zy7d759t-vadyatere-25zk.onreza.app/'
    ] }));
app.get('/', async (req, res) => {
    res.status(200).send('Server is alive yet');
});
app.get('/api/:type', async (req, res) => {
    try {
        const { page = 1, sort = 'desc', roomQuantity, 'room[min]': roomMin, 'room[max]': roomMax } = req.query;
        const limit = 20;
        const { type } = req.params;
        const orderedBy = 'id';
        const isActive = true;
        let url = new URL(`https://krasnodar.yucrm.ru/api/v1/${api_key}/realty.objects.${type}/list`);
        url.searchParams.append('page', String(page));
        url.searchParams.append('limit', String(limit));
        url.searchParams.append('order_dir', String(sort));
        url.searchParams.append('order_by', String(orderedBy));
        url.searchParams.append('is_active', String(isActive));
        if (roomQuantity) {
            switch (roomQuantity) {
                case 'studio':
                    url.searchParams.append('is_studio', 'true');
                    break;
                case 'room':
                    url.searchParams.append('is_room', 'true');
                    break;
                default:
                    url.searchParams.append('rooms', String(roomQuantity));
                    break;
            }
        }
        else {
            url.searchParams.append('rooms[max]', String(roomMax));
            url.searchParams.append('rooms[min]', String(roomMin));
        }
        // const filters: Record<string, string> = {'is_active': 'false'}
        // switch (roomQuantity) {
        //     case 'studio':
        //         filters['is_studio'] = 'true';
        //         break;
        //     case 'room':
        //         filters['is_room'] = 'true';
        //         break
        //     default:
        //         break;
        // }
        const data = await fetch(url);
        if (!data.ok)
            return res.status(500).json({ error: 'Ошибка получения данных внешнего API' });
        const clearData = await data.json();
        return res.status(200).json(clearData);
    }
    catch (e) {
        if (e instanceof Error)
            return res.status(500).json({ error: 'Ошибка внутреннего сервера' });
        return res.status(500).json({ error: 'Неизвестная ошибка' });
    }
});
app.get('/api/:type/:id', async (req, res) => {
    try {
        const data = await fetch(`https://krasnodar.yucrm.ru/api/v1/${api_key}/realty.objects.${req.params.type}/get/${req.params.id}`);
        if (!data.ok)
            return res.status(500).json({ error: `Внешний API всёкэлэмэнэ, накрылсамэнэ` });
        const clearData = await data.json();
        return res.status(200).json(clearData);
    }
    catch (e) {
        if (e instanceof Error)
            return res.status(500).json({ error: 'Ошибка внутреннего сервера' });
        return res.status(500).json({ error: 'Неизвестная ошибка' });
    }
});
app.listen(PORT, '0.0.0.0', () => {
    console.log('Сервер успешно запущен');
});
//# sourceMappingURL=server.js.map