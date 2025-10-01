import { useEffect, useRef, useState } from "react";
import { Map, Polygon, useYMaps, ZoomControl } from "@pbe/react-yandex-maps";
import { Icon } from "../../shared";

interface ObjectMapProps {
  coords: number[][][];
  setCoords?: React.Dispatch<React.SetStateAction<number[][][]>>;
  readOnly?: boolean;
  activePolygonIndex?: number | null;
  onActivePolygonChange?: (index: number | null) => void;
  onCityChange?: (city: string) => void;
}

interface IMapClickEvent {
  get: (key: string) => Array<number>;
}

interface YMapsGeocodeResult {
  geoObjects: {
    get: (index: number) => {
      getLocalities: () => string[];
      getAdministrativeAreas: () => string[];
    };
  };
}

interface YMaps {
  geocode: (coords: [number, number]) => Promise<YMapsGeocodeResult>;
}

export const ObjectMap = ({
  coords,
  setCoords,
  readOnly = false,
  activePolygonIndex: controlledIndex,
  onActivePolygonChange,
  onCityChange,
}: ObjectMapProps) => {
  const [uncontrolledIndex, setUncontrolledIndex] = useState<number | null>(
    null
  );
  const [isInteractive, setIsInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => setUserLocation(null)
    );
  }, []);

  const activePolygonIndex = controlledIndex ?? uncontrolledIndex;
  const setActivePolygonIndex = (index: number | null) =>
    onActivePolygonChange?.(index) ?? setUncontrolledIndex(index);

  const ymaps = useYMaps(["geocode"]) as YMaps | null;

  const getCityFromCoords = async (
    ymaps: YMaps,
    coords: [number, number]
  ): Promise<string | null> => {
    const res = await ymaps.geocode([coords[1], coords[0]]);
    const firstGeoObject = res.geoObjects.get(0);
    if (!firstGeoObject) return null;

    return (
      firstGeoObject.getLocalities()?.[0] ||
      firstGeoObject.getAdministrativeAreas()?.[0] ||
      null
    );
  };

  const polygonCenter = (polygon: number[][]): [number, number] => {
    const lng = polygon.reduce((s, [l]) => s + l, 0) / polygon.length;
    const lat = polygon.reduce((s, [, la]) => s + la, 0) / polygon.length;
    return [lng, lat];
  };

  useEffect(() => {
    if (!ymaps || !coords[0]?.length) return;
    getCityFromCoords(ymaps, polygonCenter(coords[0])).then(
      (city) => city && onCityChange?.(city)
    );
  }, [ymaps, coords, onCityChange]);

  useEffect(() => {
    if (!isInteractive) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !containerRef.current?.contains(target) &&
        !target.closest("#delete-btn")
      ) {
        setIsInteractive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isInteractive]);

  const handleMapClick = (e: IMapClickEvent) => {
    if (!setCoords || readOnly || !isInteractive || activePolygonIndex === null)
      return;
    const [lng, lat] = e.get("coords");
    setCoords((prev) => {
      const newPolygons = [...prev];
      const poly = newPolygons[activePolygonIndex] ?? [];
      if (poly.length >= 12) return newPolygons;
      newPolygons[activePolygonIndex] = [...poly, [lat, lng]];
      return newPolygons;
    });
  };

  const handleInteractiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInteractive(true);
    if (!setCoords || activePolygonIndex !== null) return;
    setCoords((prev) => [...prev, []]);
    setActivePolygonIndex(coords.length);
  };

  const handleAddPolygon = () => {
    if (
      !setCoords ||
      (activePolygonIndex !== null && coords[activePolygonIndex]?.length < 3)
    )
      return;
    setCoords((prev) => [...prev, []]);
    setActivePolygonIndex(coords.length);
    setIsInteractive(true);
  };

  const center: [number, number] = coords[0]?.[0]
    ? [coords[0][0][1], coords[0][0][0]]
    : userLocation ?? [55.7558, 37.6173];
  const isAddDisabled =
    !isInteractive ||
    (activePolygonIndex !== null && coords[activePolygonIndex]?.length < 3);

  return (
    <div
      ref={containerRef}
      className={`relative ${
        isInteractive ? "h-[600px]" : "h-[320px]"
      } rounded-[20px] transition-all duration-300 overflow-hidden`}
      onClick={handleInteractiveClick}
    >
      <Map
        defaultState={{ center, zoom: 10 }}
        className="w-full h-[600px]"
        options={{
          suppressMapOpenBlock: true,
          copyrightUaVisible: false,
          copyrightLogoVisible: false,
          copyrightProvidersVisible: false,
          yandexMapDisablePoiInteractivity: true,
        }}
        onClick={handleMapClick}
      >
        <ZoomControl
          options={{ size: "small", position: { bottom: 30, left: 30 } }}
        />
        {coords.map((polygon, idx) => (
          <Polygon
            key={idx}
            geometry={[polygon.map(([lng, lat]) => [lat, lng])]}
            options={{
              fillColor: readOnly
                ? "#007aff55"
                : idx === activePolygonIndex
                ? "#007aff55"
                : "#F3453C55",
              strokeColor: readOnly
                ? "#007aff"
                : idx === activePolygonIndex
                ? "#007aff"
                : "#F3453C",
            }}
          />
        ))}
      </Map>

      {!isInteractive && (
        <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center cursor-pointer">
          <div className="flex items-center gap-[14px] z-20">
            <span className="font-[700] text-[20px] leading-[30px] tracking-[-0.4px] text-white pointer-events-none select-none">
              Нажмите для взаимодействия
            </span>
            <Icon name="Click" />
          </div>
        </div>
      )}

      {!readOnly && (
        <button
          className={`bg-white rounded-[10px] flex items-center gap-[10px] text-[20px] font-[700] leading-[30px] px-[14px] py-[8px] absolute bottom-[30px] right-[30px] z-20 ${
            isAddDisabled
              ? "opacity-50 cursor-default pointer-events-none"
              : "cursor-pointer"
          }`}
          onClick={handleAddPolygon}
          disabled={isAddDisabled}
        >
          Новый полигон <Icon name="Map" />
        </button>
      )}

      <span className="font-[700] text-[20px] leading-[30px] tracking-[-0.4px] bg-white px-[12px] py-[6px] rounded-[10px] absolute top-[30px] left-[30px] z-20 select-none pointer-events-none">
        Карта объекта
      </span>
    </div>
  );
};
