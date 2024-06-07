import MapView, { Polygon } from "react-native-maps";
import { StyleSheet } from "react-native";

export default function MapPoints({ points }) {
  const southest = points.reduce((acc, point) => {
    if (point.latitude < acc.latitude) {
      return point;
    }
    return acc;
  });

  const northest = points.reduce((acc, point) => {
    if (point.latitude > acc.latitude) {
      return point;
    }
    return acc;
  });

  const westest = points.reduce((acc, point) => {
    if (point.longitude < acc.longitude) {
      return point;
    }
    return acc;
  });

  const eastest = points.reduce((acc, point) => {
    if (point.longitude > acc.longitude) {
      return point;
    }
    return acc;
  });

  const center = {
    latitude: (southest.latitude + northest.latitude) / 2,
    longitude: (westest.longitude + eastest.longitude) / 2,
  };

  const startingRegion = {
    latitude: center.latitude,
    longitude: center.longitude,
    latitudeDelta: Math.abs(northest.latitude - southest.latitude),
    longitudeDelta: Math.abs(eastest.longitude - westest.longitude),
  };

  return (
    <MapView style={styles.map} region={startingRegion}>
      <Polygon
        coordinates={points.map((point) => ({
          latitude: point.latitude,
          longitude: point.longitude,
        }))}
        strokeWidth={2}
        strokeColor={"red"}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 300,
  },
});
