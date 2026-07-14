

export default async function initMap(
    container: HTMLDivElement | null,
) {
    if (!container) return null;

    if (typeof(window as any).ymaps3 === 'undefined' && !document.getElementById('ymaps-script')) {
        const script = document.createElement('script');
        script.id = 'ymaps-script';
        script.src = 'https://api-maps.yandex.ru/v3/?apikey=d6a02117-88b1-4de6-8555-bcf8b3ab3afd&lang=ru_RU&import=YMapDefaultMarker';
        document.head.appendChild(script);
    }

    while (typeof(window as any).ymaps3 === 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    const ymaps = (window as any).ymaps3;

    await ymaps.ready
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = ymaps;
    const map = new YMap(container, {
        location: {
            center: [38.975313, 45.03547],
            zoom: 13
        }
    });
    map.addChild(new YMapDefaultSchemeLayer({}));

    map.addChild(new YMapDefaultFeaturesLayer({}));

    // try{
    //     const markersPackage = await ymaps.import('@yandex/ymaps3-markers@0.0.1');
    //     (window as any).YMapDefaultMarker = markersPackage.YMapDefaultMarker;
    //     window.dispatchEvent(new Event('ymaps3-markers-ready'));
    // } catch(e) {
    //     console.error("Не удалось динамически загрузить маркеры Яндекса:", e);
    // } 

    return map;
}
